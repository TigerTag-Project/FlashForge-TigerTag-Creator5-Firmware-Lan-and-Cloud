#!/usr/bin/env python3
"""Build and verify the Creator 5 Pro MCU timeout fix without running firmware."""
import argparse
import hashlib
import io
import json
import os
import tarfile
from pathlib import Path

from cryptography.hazmat.decrepit.ciphers.algorithms import TripleDES
from cryptography.hazmat.primitives.ciphers import Cipher, modes

SOURCE_NAME = "Creator5Pro-2.0.0-1.3.1-20260920.tgz"
SOURCE_SHA256 = "9165396f9e2e90d1206524b99a2ccb851f73550f1d7c3d38155f586fcc92dc35"
ISP_SHA256 = "51a8f582b4651499746e12f636b5d7bea608d3c9059d7692ee64f09c099cf136"
PATCHED_ISP_SHA256 = "3c4a1606880344b3d6344f3904151852cd99d9234e1d87b831a400a91073e03f"
OUTPUT_NAME = "Creator5Pro-2.0.0-1.3.1-20260920-mcu-timeout20.tgz"
CONTROL = "./control-1.3.1.tar.xz"
PATCH_OFFSET = 0x18F0
OLD = bytes.fromhex("05001224")  # addiu $s2, $zero, 5 at VA 0x4018f0
NEW = bytes.fromhex("14001224")  # addiu $s2, $zero, 20, as in stock 1.9.9
# Publicly documented FlashForge unTar format; see the investigation document.
PASSWORD = b"FFP0331&*%root"


def sha256(data):
    return hashlib.sha256(data).hexdigest()


def require(condition, message):
    if not condition:
        raise ValueError(message)


def cipher(salt):
    material = previous = b""
    while len(material) < 32:
        previous = hashlib.md5(previous + PASSWORD + salt).digest()
        material += previous
    return Cipher(TripleDES(material[:24]), modes.CBC(material[24:32]))


def decrypt(data):
    require(len(data) >= 24 and data[:8] == b"Salted__", "Invalid encrypted package header")
    require((len(data) - 16) % 8 == 0, "Invalid encrypted package length")
    context = cipher(data[8:16]).decryptor()
    plain = context.update(data[16:]) + context.finalize()
    pad = plain[-1]
    require(1 <= pad <= 8 and plain[-pad:] == bytes([pad]) * pad, "Invalid package padding")
    return plain[:-pad]


def encrypt(plain):
    salt = os.urandom(8)
    context = cipher(salt).encryptor()
    pad = 8 - len(plain) % 8
    return b"Salted__" + salt + context.update(plain + bytes([pad]) * pad) + context.finalize()


def members(data):
    """Read regular tar members in memory. Never extract paths onto the host."""
    result = {}
    seen = set()
    # These release components are plain tar despite their .tar.xz suffixes.
    with tarfile.open(fileobj=io.BytesIO(data), mode="r:") as archive:
        for entry in archive:
            require(entry.name not in seen, "Duplicate tar member: " + entry.name)
            seen.add(entry.name)
            if entry.isdir():
                continue
            require(entry.isfile(), "Unexpected non-file tar member: " + entry.name)
            result[entry.name] = (entry, archive.extractfile(entry).read())
    return result


def replace_member(data, name, replacement):
    entry, original = members(data)[name]
    require(len(original) == len(replacement), "Tar member length changed: " + name)
    output = bytearray(data)
    output[entry.offset_data:entry.offset_data + entry.size] = replacement
    return bytes(output)


def patch_isp(image):
    require(sha256(image) == ISP_SHA256, "Unsupported ISPCommand; refusing to patch")
    require(image[PATCH_OFFSET:PATCH_OFFSET + 4] == OLD, "Unexpected MIPS instruction")
    patched = image[:PATCH_OFFSET] + NEW + image[PATCH_OFFSET + 4:]
    require(sha256(patched) == PATCHED_ISP_SHA256, "Unexpected patched ISPCommand digest")
    return patched


def patch_plain(plain):
    outer = members(plain)
    installer = outer["./runFirmwareExe.sh"][1]
    require(b"MACHINE=Creator5Pro\n" in installer and b"PID=0029\n" in installer,
            "Package is not for Creator5Pro / PID 0029")
    control = outer[CONTROL][1]
    contents = members(control)
    image = contents["./ISPCommand"][1]
    patched = patch_isp(image)
    checksums = contents["./md5sum.list"][1]
    before = hashlib.md5(image).hexdigest().encode() + b"  ./ISPCommand"
    after = hashlib.md5(patched).hexdigest().encode() + b"  ./ISPCommand"
    require(checksums.count(before) == 1, "ISPCommand checksum entry missing or ambiguous")
    control = replace_member(control, "./ISPCommand", patched)
    control = replace_member(control, "./md5sum.list", checksums.replace(before, after))
    return replace_member(plain, CONTROL, control)


def verified_source(raw):
    require(sha256(raw) == SOURCE_SHA256,
            "Expected the pinned Creator5Pro release; Creator5 and other versions are unsupported")
    return decrypt(raw)


def validate_output(source, output, openssl_plaintext=None):
    original = verified_source(source)
    patched = decrypt(output)
    expected = patch_plain(original)
    require(patched == expected, "Output differs from the exact timeout patch and MD5 update")
    require(len(source) == len(output), "Encrypted package length changed")
    if openssl_plaintext is not None:
        require(openssl_plaintext == patched, "Independent OpenSSL decryption differs")
    outer = members(patched)
    validated = 0
    for name, (_, data) in outer.items():
        if ".tar." not in name:
            continue
        component = members(data)
        for line in component["./md5sum.list"][1].decode("ascii").splitlines():
            digest, path = line.split(None, 1)
            contents = component[path.strip().lstrip("*")][1]
            require(hashlib.md5(contents).hexdigest() == digest,
                    "Component checksum failed: " + name + "/" + path)
            validated += 1
    require(validated == 53, "Unexpected number of component checksum entries")
    return {
        "model": "Creator5Pro", "pid": "0029", "creator5_supported": False,
        "source_sha256": SOURCE_SHA256, "output_sha256": sha256(output),
        "output_bytes": len(output), "isp_sha256": PATCHED_ISP_SHA256,
        "isp_changed_byte_offset": hex(PATCH_OFFSET),
        "timeout_seconds_before": 5, "timeout_seconds_after": 20,
        "internal_md5_entries_validated": validated,
        "tar_headers_and_other_payloads_preserved": True,
        "independent_openssl_decryption": openssl_plaintext is not None,
    }


def build(source, output_dir):
    raw = source.read_bytes()
    plain = verified_source(raw)
    output = encrypt(patch_plain(plain))
    report = validate_output(raw, output)
    output_dir.mkdir(parents=True, exist_ok=True)
    target = output_dir / OUTPUT_NAME
    require(not target.exists(), "Output already exists; choose a new output directory")
    # Exclusive creation prevents replacing an existing firmware artifact.
    with target.open("xb") as stream:
        stream.write(output)
    (output_dir / "timeout-fix-manifest.json").write_text(
        json.dumps(report, indent=2) + "\n", encoding="utf-8")
    (output_dir / "SHA256SUMS").write_text(
        report["output_sha256"] + "  " + OUTPUT_NAME + "\n", encoding="ascii")
    return report


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--source", required=True, type=Path, help="Unmodified pinned Pro release")
    parser.add_argument("--output-dir", type=Path, default=Path("dist/mcu-timeout20"))
    parser.add_argument("--verify", type=Path, help="Verify this existing output instead of building")
    parser.add_argument("--openssl-plaintext", type=Path,
                        help="Optional independently decrypted tar for --verify")
    args = parser.parse_args()
    if args.openssl_plaintext and not args.verify:
        parser.error("--openssl-plaintext requires --verify")
    try:
        if args.verify:
            plain = args.openssl_plaintext.read_bytes() if args.openssl_plaintext else None
            report = validate_output(args.source.read_bytes(), args.verify.read_bytes(), plain)
        else:
            report = build(args.source, args.output_dir)
    except (OSError, ValueError, KeyError, tarfile.TarError) as error:
        parser.exit(1, "Error: " + str(error) + "\n")
    print(json.dumps(report, indent=2))


if __name__ == "__main__":
    main()
