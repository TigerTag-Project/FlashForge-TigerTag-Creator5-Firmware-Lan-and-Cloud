"""Run only ISPCommand's serialRead in Unicorn with simulated libc/UART.

No printer, OS syscalls, flash operations, or full program startup are run.
The select/read stubs model one delayed reply byte. Times are simulated.
"""
import io
import struct
from pathlib import Path

from elftools.elf.elffile import ELFFile
from unicorn import Uc, UC_ARCH_MIPS, UC_MODE_MIPS32, UC_MODE_LITTLE_ENDIAN, UC_HOOK_CODE
from unicorn.mips_const import UC_MIPS_REG_A0, UC_MIPS_REG_A1, UC_MIPS_REG_A2, UC_MIPS_REG_V0, UC_MIPS_REG_SP, UC_MIPS_REG_RA, UC_MIPS_REG_PC

def serial_read(image, reply_after_seconds, profile='tigertag'):
    elf=ELFFile(io.BytesIO(image))
    sym=next(s for s in elf.get_section_by_name('.symtab').iter_symbols() if s.name=='serialRead')
    layout={
        'tigertag': {'memset':0x405600,'select':0x405530,'read':0x405480,'puts':0x405580},
        'stock': {'memset':0x4045f0,'select':0x404530,'read':0x404480,'puts':0x404570},
    }[profile]
    calls={v:k for k,v in layout.items()}
    machine=Uc(UC_ARCH_MIPS, UC_MODE_MIPS32 | UC_MODE_LITTLE_ENDIAN)
    machine.mem_map(0x400000,0x20000)
    for seg in elf.iter_segments():
        if seg['p_type']=='PT_LOAD': machine.mem_write(seg['p_vaddr'],seg.data())
    stack,buffer,end=0x70000000,0x3000000,0x1000000
    machine.mem_map(stack,0x20000)
    machine.mem_map(buffer,0x1000)
    machine.mem_map(end,0x1000)
    initial_sp=stack+0x10000
    machine.reg_write(UC_MIPS_REG_SP,initial_sp)
    machine.reg_write(UC_MIPS_REG_RA,end)
    machine.reg_write(UC_MIPS_REG_A0,3)
    machine.reg_write(UC_MIPS_REG_A1,buffer)
    machine.reg_write(UC_MIPS_REG_A2,1)
    budgets=[]
    messages=[]
    def hook(uc,address,size,user):
        name=calls.get(address)
        if name is None: return
        a0=uc.reg_read(UC_MIPS_REG_A0)
        a1=uc.reg_read(UC_MIPS_REG_A1)
        a2=uc.reg_read(UC_MIPS_REG_A2)
        if name=='memset':
            uc.mem_write(a0,bytes([a1&255])*a2)
            result=a0
        elif name=='select':
            sp=uc.reg_read(UC_MIPS_REG_SP)
            timeval=struct.unpack('<I',uc.mem_read(sp+16,4))[0]
            seconds,micros=struct.unpack('<ii',uc.mem_read(timeval,8))
            budget=seconds+micros/1000000
            budgets.append(budget)
            result=1 if reply_after_seconds<=budget else 0
        elif name=='read':
            assert a0==3 and a2==1
            uc.mem_write(a1,b'\x79')
            result=1
        else:
            raw=bytes(uc.mem_read(a0,100)).split(b'\0',1)[0]
            messages.append(raw.decode('ascii',errors='replace'))
            result=0
        uc.reg_write(UC_MIPS_REG_V0,result)
        uc.reg_write(UC_MIPS_REG_PC,uc.reg_read(UC_MIPS_REG_RA))
    machine.hook_add(UC_HOOK_CODE,hook)
    machine.emu_start(sym['st_value'],end,count=100000)
    assert machine.reg_read(UC_MIPS_REG_PC)==end,'serialRead did not return'
    assert machine.reg_read(UC_MIPS_REG_SP)==initial_sp,'stack was not restored'
    value=machine.reg_read(UC_MIPS_REG_V0)
    if value&0x80000000: value-=0x100000000
    return {'result':value,'select_seconds':budgets,'byte':bytes(machine.mem_read(buffer,1)).hex(),'messages':messages}
