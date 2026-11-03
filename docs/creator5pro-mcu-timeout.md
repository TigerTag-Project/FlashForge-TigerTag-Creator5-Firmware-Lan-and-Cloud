# Creator 5 Pro: restore the MCU updater's serial timeout

**Tested and reported working on the FlashForge Creator 5 Pro only. This fix is
not compatible with the FlashForge Creator 5. Do not install the Pro package on
the Creator 5.** Hardware confirmation was supplied by the affected printer's
owner; the automated evidence below is a separate offline check.

This addresses the main-controller update failure reported in
[issue #2](https://github.com/TigerTag-Project/FlashForge-TigerTag-Creator5-Firmware-Lan-and-Cloud/issues/2).
It is limited to `Creator5Pro-2.0.0-1.3.1-20260920.tgz`. Other firmware versions
and models are rejected by SHA-256 before an output package is created.

## Failure and cause

The affected printer accepted the Linux-side installation, then displayed
`MCU upgrade failed!`. The saved main-controller update log showed a successful
bootloader connection followed by a timeout during global extended erase:

```text
Connected to board.
Bootloader version: 3.0
Command set-[ 00 01 02 11 21 22 31 44 63 73 82 92]
STM32-Erase: 31
serialRead Timeout
waitAck TimeOut
STM32-GlobalExErase: fail
STM32 Erase failed. Retry 1/3
```

The same failure recurred in attempts 2 and 3. The control script recorded
successful updates of the extruder, heater, and leveling boards; only the main
controller failed. A successful recovery log using the stock updater recorded
erase, write, verification, and `STM32isp finished successfully.`

Static comparison found that `ISPCommand`'s `serialRead` function waits **5
seconds** in this TigerTag release, while stock `1.9.9-1.3.0` waits **20 seconds**.
Restoring that timeout avoids aborting an erase that takes longer than five
seconds. The logs do not measure the exact erase duration. The eight-second
reply used in the regression test is a simulated case, not a printer timing
measurement.

All five MCU payload files in the compared stock and TigerTag Pro packages
are byte-identical. The patch therefore changes the host updater's timeout,
not the MCU firmware.

## Exact change

| Item | Before | After |
|---|---|---|
| Member | `control-1.3.1.tar.xz/ISPCommand` | Same |
| File offset / virtual address | `0x18f0` / `0x4018f0` | Same |
| MIPS instruction | `addiu $s2, $zero, 5` | `addiu $s2, $zero, 20` |
| Instruction bytes, little-endian | `05 00 12 24` | `14 00 12 24` |

Only one executable byte changes. Its existing entry in `control/md5sum.list`
is updated. All tar headers, padding, file order, modes, and sizes are retained.
The Linux software, kernel, library, MCU payloads, and existing success/error
checks remain byte-identical to the TigerTag input. Cloud + LAN functionality
is retained in the unchanged software component. The screen still reports
version `2.0.0 / 1.3.1`.

| Artifact | SHA-256 |
|---|---|
| Pinned TigerTag Pro input | `9165396f9e2e90d1206524b99a2ccb851f73550f1d7c3d38155f586fcc92dc35` |
| Original ISPCommand | `51a8f582b4651499746e12f636b5d7bea608d3c9059d7692ee64f09c099cf136` |
| Patched ISPCommand | `3c4a1606880344b3d6344f3904151852cd99d9234e1d87b831a400a91073e03f` |
| Compared stock Pro 1.9.9 package | `539c03aebc29b4f1a423b3cb63bc5e2d6c573637213eef29ff97138153e5b34f` |

The output package uses a fresh encryption salt, so its outer SHA-256 changes
on each build. The decrypted output and patched executable are reproducible.
Each build writes its own `SHA256SUMS` and `timeout-fix-manifest.json`.

## Build and check

Use Python 3.11 or newer. Run from the repository root, preferably in a virtual
environment:

```sh
python -m pip install -r tools/requirements-mcu-timeout.txt
mkdir -p inputs
curl -fL --output inputs/Creator5Pro-2.0.0-1.3.1-20260920.tgz \
  https://github.com/TigerTag-Project/FlashForge-TigerTag-Creator5-Firmware-Lan-and-Cloud/releases/download/v2.0.0-1.3.1-20260920/Creator5Pro-2.0.0-1.3.1-20260920.tgz
python tools/mcu_timeout_fix.py \
  --source inputs/Creator5Pro-2.0.0-1.3.1-20260920.tgz
python -m unittest discover -s tools -p 'test_mcu_timeout_fix.py' -v
```

Use `curl.exe` on Windows if PowerShell aliases `curl`. Python commands work
on Windows, Linux, and macOS. The download directory can also be created with
your file manager. Set `CREATOR5PRO_FIRMWARE` to use a different input path for
the tests.

The builder checks the pinned source and executable hashes, changes the
timeout, verifies the exact resulting plaintext and all **53 internal MD5
entries**, and then writes:

```text
dist/mcu-timeout20/Creator5Pro-2.0.0-1.3.1-20260920-mcu-timeout20.tgz
dist/mcu-timeout20/SHA256SUMS
dist/mcu-timeout20/timeout-fix-manifest.json
```

It refuses to overwrite an existing firmware output. Choose a new
`--output-dir` for another build. The builder never executes packaged firmware
or connects to a printer. Binaries remain local or in release assets, in line
with this repository's distribution policy.

For an independent OpenSSL format check:

```sh
openssl des3 -d -md md5 -pass 'pass:FFP0331&*%root' \
  -in dist/mcu-timeout20/Creator5Pro-2.0.0-1.3.1-20260920-mcu-timeout20.tgz \
  -out dist/mcu-timeout20/openssl-decoded.tar
python tools/mcu_timeout_fix.py \
  --source inputs/Creator5Pro-2.0.0-1.3.1-20260920.tgz \
  --verify dist/mcu-timeout20/Creator5Pro-2.0.0-1.3.1-20260920-mcu-timeout20.tgz \
  --openssl-plaintext dist/mcu-timeout20/openssl-decoded.tar
```

The legacy key derivation is required by the printer's existing package
format. Its public format reference is
[Reforge's unpacker](https://github.com/Klipper4FlashForge/firmware/blob/master/bin/unpack.sh)
and [configuration example](https://github.com/Klipper4FlashForge/firmware/blob/master/config.env.example).

## Regression evidence

Unicorn runs the actual MIPS `serialRead` function with simulated libc and
UART calls. No printer access or real erase/write operation occurs.

| Simulated reply | Unmodified updater | Patched updater |
|---|---|---|
| 0.1 seconds | Success | Success |
| 8 seconds | Timeout | Success |
| 19 seconds | Timeout | Success |
| 21 seconds | Timeout | Timeout |

Tests also verify exact byte changes, rejection of unsupported packages and
executables, preservation of other components and metadata, all internal
checksums, rejection of a modified output, and overwrite protection.

## Install on Creator 5 Pro

1. Finish any print and let the printer cool down. Keep the known-working
   stock firmware available for recovery.
2. Copy only the generated `.tgz` to the root of a FAT32 USB drive. Remove
   other firmware files and any `runFirmwareExe.sh` diagnostic script.
3. Keep the package's filename and contents unchanged.
4. Turn the printer off, insert the drive, and turn it on.
5. Wait for installation, the MCU update, and the normal restart. Keep power
   connected and the drive inserted throughout the update.
6. Remove the drive once the normal home screen appears. Complete any
   requested calibration before a supervised test print.

If another MCU error appears, collect the saved update logs before installing
stock firmware again where possible. The
[USB diagnostic collector](../tools/diagnostics/README.md) copies existing
update logs to a separate USB drive without installing firmware.

Only the short technical excerpts above are included. Raw printer logs,
diagnostic archives, screenshots, and serial numbers are not published.
