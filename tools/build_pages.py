#!/usr/bin/env python3
"""Generate the GitHub Pages site: the home model picker (index.html) and one
download page per model (download/<slug>/index.html).

The three pages share one template so they never drift apart. The HTML ships in
English; every translatable node carries data-i18n="<key>" and download/i18n.js
swaps it to the visitor's language (11 locales, same as Tiger Studio Manager).

    python3 tools/build_pages.py
"""
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
REPO = 'https://github.com/TigerTag-Project/FlashForge-TigerTag-Creator5-Firmware-Lan-and-Cloud'
DOCS = 'https://github.com/TigerTag-Project/TigerSystem-Docs/blob/main/docs'
ORG = 'https://github.com/TigerTag-Project'
SITE = 'https://tigertag-project.github.io/FlashForge-TigerTag-Creator5-Firmware-Lan-and-Cloud'
VIDEO = 'https://www.youtube.com/watch?v=qaaGUUdZaHQ'

MODELS = [
    # slug,        asset prefix,  display name,     picture,             other slug,   other name
    ('creator5',    'Creator5',    'Creator 5',      'creator-5.png',     'creator5pro', 'Creator 5 Pro'),
    ('creator5pro', 'Creator5Pro', 'Creator 5 Pro',  'creator-5-pro.png', 'creator5',    'Creator 5'),
]

IC = {
    'dl':   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3v13M6 11l6 6 6-6M4 21h16"/></svg>',
    'warn': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/><path d="M12 9v4M12 17h.01"/></svg>',
    'usb':  '<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="7" y="2" width="10" height="7" rx="1"/><path d="M5 9h14v8a5 5 0 0 1-5 5h-4a5 5 0 0 1-5-5z"/><path d="M10 5h.01M14 5h.01"/></svg>',
    'file': '<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M12 18v-6M9 15l3 3 3-3"/></svg>',
    'off':  '<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 2v10"/><path d="M18.4 6.6a9 9 0 1 1-12.8 0"/></svg>',
    'plug': '<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 2v6M15 2v6M6 8h12v4a6 6 0 0 1-12 0z"/><path d="M12 18v4"/></svg>',
    'on':   '<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12a9 9 0 1 1-3-6.7L21 8"/><path d="M21 3v5h-5"/></svg>',
    'ok':   '<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="m8 12 3 3 5-6"/></svg>',
    'globe': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/></svg>',
}


def head(title, desc, base, model_attrs):
    """base: relative path from the page to the site root ('' or '../../')."""
    A = f'{base}assets'
    return f'''<!doctype html>
<html lang="en"{model_attrs}>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{title}</title>
<meta name="description" content="{desc}">
<meta property="og:title" content="{title}">
<meta property="og:description" content="{desc}">
<meta property="og:image" content="{SITE}/assets/hero-tigersystem-ecosystem.png">
<link rel="icon" href="{A}/tigersystem-icon-framed.svg" type="image/svg+xml">
<link rel="stylesheet" href="{base}download/style.css">
</head>
<body>
<header class="topbar">
  <div class="wrap">
    <a class="brand" href="{base or './'}">
      <img class="ff-mark--light" src="{A}/flashforge-mark-light.svg" alt="FlashForge">
      <img class="ff-mark--dark" src="{A}/flashforge-mark-dark.svg" alt="FlashForge">
      <img class="x" src="{A}/x.svg" alt="×">
      <img src="{A}/tigersystem-icon-framed.svg" alt="TigerSystem">
      <span>FlashForge × TigerSystem</span>
    </a>
    <div class="topbar-right">
      <nav>
        <a href="#install" data-i18n="nav.install">Install</a>
        <a href="#tigersystem">TigerSystem</a>
        <a href="{REPO}">GitHub</a>
        <a href="https://tigersystem.io">tigersystem.io</a>
      </nav>
      <label class="lang">{IC['globe']}<select id="lang" aria-label="Language"><option value="en">English</option></select></label>
    </div>
  </div>
</header>
'''


def common(base):
    A = f'{base}assets'
    return f'''
<section class="wrap">
  <div class="warn" role="note">
    {IC['warn']}
    <div>
      <strong data-i18n="warn.title">Don't accept the printer's own online update.</strong>
      <p data-i18n="warn.body">When the printer offers an update on its screen (or under Tools → Firmware), it installs FlashForge's
      <b>standard</b> firmware — and Cloud + LAN is gone. Tap <b>&lt;</b> to skip it and update from here instead.
      Already accepted one? Just reinstall this file by USB.</p>
    </div>
  </div>
</section>

<section class="wrap" id="install">
  <h2 data-i18n="install.title">Install in six steps</h2>
  <p class="sub" data-i18n="install.sub">FlashForge's standard USB update — shown in their official video
    <a href="{VIDEO}">Upgrade firmware via USB</a>.</p>
  <ol class="steps">
    <li>{IC['usb']}<h3 data-i18n="s1.t">Format a USB drive</h3><p data-i18n="s1.d">FAT32 (FAT / FAT16 also work), MBR partition table.</p></li>
    <li>{IC['file']}<h3 data-i18n="s2.t">Copy the file to the root</h3><p data-i18n="s2.d">Not in a folder. Don't rename or unpack it — the printer opens it itself. One firmware file only.</p></li>
    <li>{IC['off']}<h3 data-i18n="s3.t">Switch the printer off</h3><p data-i18n="s3.d">Before plugging anything in.</p></li>
    <li>{IC['plug']}<h3 data-i18n="s4.t">Plug the drive in</h3><p data-i18n="s4.d">Into the printer's USB port.</p></li>
    <li>{IC['on']}<h3 data-i18n="s5.t">Switch it on</h3><p data-i18n="s5.d">It finds the file and installs it. Don't cut the power while it works.</p></li>
    <li>{IC['ok']}<h3 data-i18n="s6.t">Remove the drive</h3><p data-i18n="s6.d">Once the printer has restarted on the new version. Done.</p></li>
  </ol>
</section>

<section class="wrap">
  <h2 data-i18n="chg.title">What it changes</h2>
  <p class="sub" data-i18n="chg.sub">Out of the box, a Creator 5 makes you choose between Cloud and LAN. Not any more.</p>
  <table class="compare">
    <thead><tr><th></th><th class="c" data-i18n="chg.stock">Stock</th><th class="c">FlashForge × TigerSystem</th></tr></thead>
    <tbody>
      <tr><td data-i18n="chg.r1">FlashForge Cloud — app, remote access</td><td class="c yes">✓</td><td class="c yes">✓</td></tr>
      <tr><td data-i18n="chg.r2">LAN — local tools on your network</td><td class="c yes">✓</td><td class="c yes">✓</td></tr>
      <tr><td data-i18n="chg.r3"><b>Both at the same time</b></td><td class="c no">✕</td><td class="c yes">✓</td></tr>
      <tr><td data-i18n="chg.r4">Tiger Studio, Tiger NFC Connect and TigerSpool with Cloud on</td><td class="c no">✕</td><td class="c yes">✓</td></tr>
    </tbody>
  </table>
</section>

<section class="wrap" id="tigersystem">
  <div class="ts">
    <img class="ts-hero" src="{A}/hero-tigersystem-ecosystem.png" alt="The TigerSystem ecosystem: a TigerPOD reader, Tiger Studio Manager on a desktop and the Tiger NFC Connect app on a phone">
    <div class="ts-text">
      <img class="ts-logo" src="{A}/tigersystem-icon-framed.svg" alt="TigerSystem">
      <h2 data-i18n="ts.title">RFID for a printer that has no reader</h2>
      <blockquote data-i18n="ts.quote">The spool's identity belongs to its owner — not to a printer brand.</blockquote>
      <p data-i18n="ts.body">TigerSystem is the open ecosystem for 3D-printing filament. A TigerTag NFC chip carries each spool's full
      profile in an open format any device can read. With this firmware, your Creator 5 joins it: Tiger Studio,
      Tiger NFC Connect and TigerSpool read the chip of any TigerTag brand — or one you made at home — and put the
      filament in the right slot.</p>
      <div class="actions">
        <a class="btn btn-light" href="https://tigersystem.io" data-i18n="ts.cta">Discover TigerSystem →</a>
        <a class="btn btn-outline" href="{DOCS}/vision/why-tigersystem.md" data-i18n="ts.why">Why we built it</a>
      </div>
    </div>
  </div>
</section>

<section class="wrap">
  <h2 data-i18n="eco.title">The ecosystem — everything is open</h2>
  <p class="sub" data-i18n="eco.sub">Every piece is published, readable and free to build on.</p>
  <div class="eco">
    <a href="{ORG}/TigerTag-Studio-Manager"><b>Tiger Studio Manager</b><span data-i18n="eco.studio">Desktop app — inventory, racks, live printers across six brands.</span></a>
    <a href="{DOCS}/products/tigertag-connect.md"><b>Tiger NFC Connect</b><span data-i18n="eco.nfc">iOS and Android — tap to read, tap to write.</span></a>
    <a href="{ORG}/TigerSpool-RFID"><b>TigerSpool</b><span data-i18n="eco.spool">Reader box beside the printer — scan a spool, it lands in the right slot.</span></a>
    <a href="{ORG}/TigerTag-RFID-Guide"><b data-i18n="eco.proto.b">TigerTag protocol</b><span data-i18n="eco.proto">The open chip format — full spec and public registry.</span></a>
    <a href="{ORG}/Tiger-Scale-V3"><b>TigerScale V3</b><span data-i18n="eco.scale">Connected filament scale with dual NFC readers.</span></a>
    <a href="{ORG}/TigerSystem-Docs"><b>TigerSystem Docs</b><span data-i18n="eco.docs">The source of truth — for humans and AI.</span></a>
  </div>
</section>

<section class="wrap">
  <div class="thanks">
    <div class="logos">
      <img class="ff-mark--light" src="{A}/flashforge-mark-light.svg" alt="FlashForge">
      <img class="ff-mark--dark" src="{A}/flashforge-mark-dark.svg" alt="FlashForge">
      <img class="x" src="{A}/x.svg" alt="×">
      <img src="{A}/tigersystem-icon-framed.svg" alt="TigerSystem">
    </div>
    <p data-i18n="thanks"><strong>Thank you, FlashForge.</strong> This is an official FlashForge firmware, developed by their engineering
    team at TigerTag's request and in close collaboration with us, and published here with their agreement. Opening a
    printer to an ecosystem that is not your own is a rare decision — every maker who owns one benefits from it.</p>
  </div>
</section>

<footer>
  <div class="wrap">
    <span data-i18n="foot.copy">Firmware © <a href="https://www.flashforge.com">FlashForge</a>, redistributed with their permission.
      Part of <a href="https://tigersystem.io">TigerSystem</a> by <a href="{ORG}">TigerTag</a>.</span>
    <span><a href="{REPO}">GitHub</a> · <a href="{REPO}/releases" data-i18n="foot.releases">All releases</a> · <a href="https://tigersystem.io">tigersystem.io</a></span>
  </div>
</footer>
<script src="{base}download/i18n.js"></script>
<script src="{base}download/dl.js"></script>
</body>
</html>
'''


def model_page(slug, prefix, name, img, oslug, oname):
    base = '../../'
    A = f'{base}assets'
    title = f'FlashForge {name} — Cloud + LAN firmware'
    desc = (f'Download the latest official FlashForge × TigerSystem firmware for the {name}: '
            'FlashForge Cloud and LAN at the same time.')
    attrs = f' data-model="{prefix}" data-name="{name}" data-other="{oname}"'
    switch = ''.join(
        f'<a class="model-tab{" is-active" if m[0] == slug else ""}" href="../{m[0]}/"'
        f'{" aria-current=\"page\"" if m[0] == slug else ""}>'
        f'<img src="{A}/{m[3]}" alt="">{m[2]}</a>'
        for m in MODELS)
    body = f'''
<main class="hero">
  <div class="wrap">
    <nav class="model-switch" aria-label="Printer model">{switch}</nav>
    <div class="hero-card">
      <div class="hero-media"><img src="{A}/{img}" alt="FlashForge {name}"></div>
      <div>
        <h1 data-i18n="hero.title">Cloud + LAN firmware</h1>
        <p class="lede" data-i18n="hero.lede">The official FlashForge × TigerSystem firmware for the {name}: keep FlashForge Cloud, and reach the
        printer on your network at the same time.</p>
        <div class="meta">
          <span class="chip"><span data-i18n="chip.version">Version</span> <b id="ver">…</b></span>
          <span class="chip" id="date"></span>
          <span class="chip" id="size"></span>
          <span class="chip chip--ok" data-i18n="chip.official">✓ Official FlashForge build</span>
        </div>
        <div class="actions">
          <a class="btn btn-primary" id="dl" href="{REPO}/releases/latest" aria-disabled="true">{IC['dl']}<span data-i18n="btn.download">Download for {name}</span></a>
        </div>
        <div class="status" id="status" role="status" data-i18n="status.finding">Finding the latest version…</div>
        <details class="sha" id="shaBox" hidden>
          <summary data-i18n="sha.summary">Verify the file — SHA-256</summary>
          <div class="sha-body"><code id="sha"></code><button class="btn btn-ghost copy" id="copy" type="button" data-i18n="sha.copy">Copy</button></div>
          <div class="sha-body"><small><span data-i18n="sha.file">File:</span> <code id="file"></code></small></div>
        </details>
      </div>
    </div>
  </div>
</main>
'''
    return head(title, desc, base, attrs) + body + common(base)


def home_page():
    base = ''
    title = 'FlashForge × TigerSystem — Creator 5 / 5 Pro Cloud + LAN firmware'
    desc = ('Official FlashForge firmware for the Creator 5 and Creator 5 Pro: FlashForge Cloud and LAN at the same '
            'time. Built by FlashForge with TigerTag.')
    cards = ''.join(f'''
      <a class="model" href="download/{slug}/">
        <span class="label">{name}</span>
        <div class="hero-media"><img src="assets/{img}" alt="FlashForge {name}"></div>
        <span class="btn btn-primary">{IC['dl']}<span data-i18n="home.download">Download</span></span>
      </a>''' for slug, _p, name, img, _o, _on in MODELS)
    body = f'''
<main class="hero">
  <div class="wrap">
    <div class="home-head">
      <h1 data-i18n="home.title">Cloud + LAN firmware for the Creator 5</h1>
      <p class="lede"><span data-i18n="home.lede">The official FlashForge × TigerSystem firmware — FlashForge Cloud and your
      local network, both on at once.</span><br><span data-i18n="home.latest">Latest version</span> <b id="ver">…</b> · <span id="date"></span></p>
    </div>
    <div class="picker">{cards}
    </div>
  </div>
</main>
'''
    return head(title, desc, base, ' data-model=""') + body + common(base)


def main():
    (ROOT / 'index.html').write_text(home_page(), encoding='utf-8')
    for m in MODELS:
        out = ROOT / 'download' / m[0] / 'index.html'
        out.parent.mkdir(parents=True, exist_ok=True)
        out.write_text(model_page(*m), encoding='utf-8')
    print('built: index.html,', ', '.join(f'download/{m[0]}/index.html' for m in MODELS))


if __name__ == '__main__':
    main()
