# Creator 5 Pro MCU log collector

**For Creator 5 Pro / PID 0029 only. Not compatible with Creator 5.**

`runFirmwareExe.sh` copies existing `UPDATA*.log` and `control_run*.log` files
from `/usr/data/logs` to a USB drive. It does not flash firmware, access serial
ports, change services, or write to the printer's storage. The affected owner
used it successfully to retrieve the update failure logs.

1. Use a FAT32 USB drive containing no firmware `.tgz` or other startup script.
2. Copy `runFirmwareExe.sh` directly to the root of the drive, keeping its name
   and Unix LF line endings.
3. Turn the idle printer off, insert the drive, then turn it on.
4. Wait for the normal home screen and remove the drive.
5. On your computer, look for `creator5pro-diagnostic-.../DONE.txt` and the logs.
6. Remove the script from the drive after collection.

If no directory appears, or `summary.txt` reports no saved update logs, stop
and report that result. A later firmware installation may have replaced logs.

The directory timestamp uses the printer's clock, so a `19700101` prefix is
possible before its clock is set. It is not a real-world collection date.

Inspect collected files before sharing them. Keep printer serial numbers and
other private information out of public issues or pull requests.

The stock 1.9.9 startup script invokes `/mnt/runFirmwareExe.sh` with
`Creator5Pro` and `0029`. The collector deliberately returns **1**, which makes
that caller continue normal startup. Returning 0 would make it sleep for a
long time instead.
