#!/bin/sh
# Creator 5 Pro: collect existing MCU update logs to USB only.
# The stock 1.9.9 app_startup.sh invokes /mnt/runFirmwareExe.sh with model/PID.
# Return 1 intentionally: return 0 makes that caller sleep for 100000 seconds.
# No flash commands, serial access, service changes, or writes to printer storage.

SOURCE=/usr/data/logs
USB=/mnt

if [ "$1" != "Creator5Pro" ] || [ "$2" != "0029" ]; then
    echo "Diagnostic collector: model/PID mismatch; nothing collected."
    exit 1
fi

OUT="$USB/creator5pro-diagnostic-$(date +%Y%m%d-%H%M%S)-$$"
umask 077
mkdir "$OUT" || exit 1
COUNT=0
ERRORS=0
for FILE in "$SOURCE"/UPDATA*.log "$SOURCE"/control_run*.log; do
    [ -f "$FILE" ] || continue
    NAME=${FILE##*/}
    if cp "$FILE" "$OUT/$NAME"; then
        COUNT=$((COUNT + 1))
    else
        ERRORS=$((ERRORS + 1))
    fi
done
{
    echo "Creator5Pro MCU diagnostic export"
    echo "Model: $1 / PID: $2"
    echo "Copied logs: $COUNT"
    echo "Copy errors: $ERRORS"
    echo "Kernel: $(uname -sr)"
    if [ "$COUNT" -eq 0 ]; then
        echo "No saved MCU update logs were found."
    fi
    echo "Only existing update logs were copied. No firmware was installed."
} > "$OUT/summary.txt"
if [ "$ERRORS" -eq 0 ]; then
    echo "Collection complete. Printer startup will continue." > "$OUT/DONE.txt"
else
    echo "Some logs could not be copied. See summary.txt." > "$OUT/ERROR.txt"
fi
sync
exit 1
