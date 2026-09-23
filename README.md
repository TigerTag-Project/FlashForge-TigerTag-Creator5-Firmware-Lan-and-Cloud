<h1 align="center">FlashForge Creator 5 / 5 Pro — TigerTag firmware</h1>

<p align="center">
  <strong>Official FlashForge firmware, built with TigerTag, that lets a Creator 5 or Creator 5 Pro<br>
  stay on FlashForge Cloud <em>and</em> talk to the TigerTag ecosystem on your local network — at the same time.</strong>
</p>

<p align="center">
  <a href="../../releases/latest"><strong>⬇️ Download the latest release</strong></a>
</p>

---

## A thank-you to FlashForge

This firmware exists because **FlashForge** said yes.

It was built by FlashForge's own team, at our request and in close collaboration with us, so that
their printers could join the TigerTag ecosystem without giving anything up. It is an **official
FlashForge firmware** — not a community fork, not a patch — and it is published here with their
agreement.

Thank you to the FlashForge team for their openness, their time and their trust. Making a printer
open to an ecosystem that is not your own is a rare decision, and it is one that benefits every
maker who owns one.

---

## What it changes

Out of the box, a Creator 5 has to choose: **Cloud** (FlashForge's app and remote access) or
**LAN** (local tools on your network). Not both.

With this firmware, **Cloud and LAN run together.** You keep FlashForge Cloud, and local tools —
Tiger Studio Manager, a TigerSpool — can reach the printer on your network at the same time.

## Why it matters: RFID on a printer that has no reader

The Creator 5 and Creator 5 Pro have no RFID reader. Through the **TigerSystem**, they now have
one:

- **[Tiger Studio Manager](https://github.com/TigerTag-Project/TigerTag-Studio-Manager)** — the
  desktop app — sees the printer live and knows what is in each slot.
- **[TigerSpool](https://github.com/TigerTag-Project/TigerSpool-RFID)** — a small reader box that
  sits next to the printer — reads a spool's chip and writes the filament straight into the slot
  you pick: material, brand, colour, temperatures.

So a FlashForge printer can now read the chip of **any filament brand that uses TigerTag** — and
of the spools **makers tag themselves at home**, on filament that never shipped with a chip.

This firmware is designed to make the printer connectable to the TigerTag ecosystem, but it is
**free for anyone to use**, with or without TigerTag hardware.

---

## Supported printers

| Printer | File in each release |
|---|---|
| **FlashForge Creator 5** | `Creator5-<version>.tgz` |
| **FlashForge Creator 5 Pro** | `Creator5Pro-<version>.tgz` |

⚠️ **Use the file that matches your printer.** The two are not interchangeable.

No other FlashForge model is concerned: the Adventurer 5M, 5M Pro, AD5X and A5 already work with
the TigerTag ecosystem on their stock firmware.

## Download

Every version is published as a **[GitHub Release](../../releases)** — the latest one is always at
**[releases/latest](../../releases/latest)**. Each release carries both files.

## Install

Install the file the same way as any FlashForge firmware update for your printer. If in doubt,
follow FlashForge's own update guide for the Creator 5 series.

---

## Staying up to date

You don't have to watch this page. **Tiger Studio Manager checks it for you**: it reads the latest
release here, shows on your printer's page whether its firmware is current, and offers the right
file for your model.

<details>
<summary>For maintainers — how a release must be published</summary>

Tiger Studio Manager reads `GET /repos/TigerTag-Project/FlashForge-Creator5-Firmware/releases/latest`
and picks its file by name, so every release must:

- be a **published, non-draft, non-prerelease** GitHub Release (only those count as "latest");
- carry **both** assets, named `Creator5-<version>.tgz` and `Creator5Pro-<version>.tgz`;
- be tagged `v<version>` — e.g. `v2.0.0-1.3.1-20260920` for `Creator5-2.0.0-1.3.1-20260920.tgz`.

The firmware files live **only** in the releases, never in the repository itself.

</details>

---

<p align="center">
  <sub>Part of the <a href="https://tigersystem.io">TigerSystem</a> by
  <a href="https://github.com/TigerTag-Project">TigerTag</a>.
  Firmware © FlashForge, redistributed with their permission.</sub>
</p>
