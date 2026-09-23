<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="assets/flashforge-mark-dark.svg">
    <img src="assets/flashforge-mark-light.svg" alt="FlashForge" height="84">
  </picture>
  &nbsp;&nbsp;&nbsp;
  <img src="assets/x.svg" alt="×" height="30">
  &nbsp;&nbsp;&nbsp;
  <img src="assets/tiger-head-square.svg" alt="TigerSystem" height="84">
</p>

<h1 align="center">FlashForge × TigerSystem</h1>

<p align="center">
  <strong>Official Creator 5 / Creator 5 Pro firmware — FlashForge Cloud and LAN, at the same time.</strong><br>
  Built by FlashForge, together with TigerTag.
</p>

<p align="center">
  <a href="../../releases/latest"><img src="https://img.shields.io/github/v/release/TigerTag-Project/FlashForge-TigerTag-Creator5-Firmware-Lan-and-Cloud?label=latest&color=1f6feb" alt="Latest release"></a>
  <a href="../../releases"><img src="https://img.shields.io/github/downloads/TigerTag-Project/FlashForge-TigerTag-Creator5-Firmware-Lan-and-Cloud/total?color=2da44e" alt="Downloads"></a>
  <img src="https://img.shields.io/badge/printers-Creator%205%20%C2%B7%20Creator%205%20Pro-555" alt="Printers">
  <img src="https://img.shields.io/badge/install-USB%20drive-555" alt="Install by USB">
</p>

<p align="center">
  <a href="../../releases/latest"><strong>Download</strong></a>
  &nbsp;·&nbsp;
  <a href="#install">Install</a>
  &nbsp;·&nbsp;
  <a href="#what-it-changes">What it changes</a>
  &nbsp;·&nbsp;
  <a href="#staying-up-to-date">Staying up to date</a>
</p>

---

## Thank you, FlashForge

This firmware exists because **FlashForge** said yes.

It was developed by FlashForge's own engineering team, at TigerTag's request and in close
collaboration with us, so that their printers could join the TigerTag ecosystem without giving
anything up. It is an **official FlashForge firmware** — not a community fork, not a patch — and it
is published here with their agreement.

We are grateful to the FlashForge team for their openness, their time and their trust. Opening a
printer to an ecosystem that is not your own is a rare decision, and every maker who owns one
benefits from it.

---

## What it changes

|  | Stock firmware | **FlashForge × TigerSystem** |
|---|:---:|:---:|
| FlashForge Cloud (app, remote access) | ✓ | ✓ |
| LAN access (local tools on your network) | ✓ | ✓ |
| **Both at the same time** | — | **✓** |
| Tiger Studio Manager, Tiger NFC Connect and TigerSpool with Cloud on | — | **✓** |

Out of the box, a Creator 5 makes you choose between **Cloud** and **LAN**. With this firmware you
keep FlashForge Cloud, and the TigerTag apps and devices reach the printer on your network at the
same time — on the desktop, on your phone, and at the printer's side.

### RFID on a printer that has no reader

The Creator 5 and Creator 5 Pro ship without an RFID reader. Through the
**[TigerSystem](https://tigersystem.io)**, they now read one:

- **[Tiger Studio Manager](https://github.com/TigerTag-Project/TigerTag-Studio-Manager)** — the
  desktop app — follows the printer live and knows what is loaded in each slot.
- **[Tiger NFC Connect](https://github.com/TigerTag-Project/TigerSystem-Docs/blob/main/docs/products/tigertag-connect.md)**
  — the iOS and Android app — reads a spool's chip with your phone and reaches the printer on the
  same network.
- **[TigerSpool](https://github.com/TigerTag-Project/TigerSpool-RFID)** — a small reader box beside
  the printer — reads a spool's chip and writes the filament into the slot you pick: material,
  brand, colour and temperatures.

A FlashForge printer can now read the chip of **any filament brand that uses TigerTag** — and of the
spools **makers tag themselves at home**, on filament that never shipped with a chip.

> [!NOTE]
> The firmware is designed to connect the printer to the TigerTag ecosystem, but it is **free for
> anyone to use**, with or without TigerTag hardware.

---

## Supported printers

| Printer | File to download |
|---|---|
| **FlashForge Creator 5** | `Creator5-<version>.tgz` |
| **FlashForge Creator 5 Pro** | `Creator5Pro-<version>.tgz` |

> [!IMPORTANT]
> **Use the file that matches your printer.** The two files are not interchangeable.

The Adventurer 5M, 5M Pro, AD5X and A5 are not concerned: they already work with the TigerTag
ecosystem on their stock firmware.

---

## Install

Every version is a **[GitHub Release](../../releases)**; the newest is always at
**[releases/latest](../../releases/latest)**, with both files attached and their SHA-256 checksums.

1. **Format a USB drive** as **FAT32** (FAT / FAT16 also work; MBR partition table).
2. **Copy the `.tgz` for your model to the root of the drive** — not inside a folder.
   Keep it exactly as downloaded: don't rename it, don't unpack it — it is a sealed FlashForge
   package the printer opens itself. Put only **one** firmware file on the drive.
3. **Switch the printer off.**
4. **Plug the drive** into the printer's USB port.
5. **Switch the printer on.** It finds the file and installs it. Let it finish — don't cut the
   power while it works.
6. **Remove the drive** once the printer has restarted on the new version.

This is FlashForge's standard USB update, the one shown in their official video
**[Upgrade firmware via USB](https://www.youtube.com/watch?v=qaaGUUdZaHQ)** (Flashforge Support).

> [!WARNING]
> **Don't accept the printer's own online update (OTA).** When the printer offers an update on its
> screen, or under **Tools → Firmware**, it installs FlashForge's **standard** firmware — and Cloud +
> LAN is gone. Tap **<** to skip it and update from this page instead.
> Already accepted one? Reinstall the latest release here, by USB.

---

## Staying up to date

You don't need to watch this page. **Tiger Studio Manager checks it for you**: it reads the latest
release here, tells you on the printer's info page whether its firmware is current, offers the right
file for your model, and notifies you when a new version is out.

<details>
<summary><strong>For maintainers</strong> — how a release must be published</summary>

<br>

Tiger Studio Manager reads
`GET https://api.github.com/repos/TigerTag-Project/FlashForge-TigerTag-Creator5-Firmware-Lan-and-Cloud/releases/latest`
and picks the file by name. Every release must:

- be a **published** GitHub Release — not a draft, not a pre-release (only those count as *latest*);
- carry **both** files, named `Creator5-<version>.tgz` and `Creator5Pro-<version>.tgz`, exactly as
  FlashForge delivered them;
- be tagged `v<version>` — e.g. `v2.0.0-1.3.1-20260920` for `Creator5-2.0.0-1.3.1-20260920.tgz`;
- list the SHA-256 of each file in its notes.

The firmware files live **only** in the releases, never in the repository itself.

</details>

---

<p align="center">
  <sub>
    <strong>FlashForge × TigerSystem</strong> ·
    Firmware © <a href="https://www.flashforge.com">FlashForge</a>, redistributed with their permission ·
    Part of the <a href="https://tigersystem.io">TigerSystem</a> by
    <a href="https://github.com/TigerTag-Project">TigerTag</a>
  </sub>
</p>
