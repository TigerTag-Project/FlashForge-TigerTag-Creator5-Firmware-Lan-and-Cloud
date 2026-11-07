"""Regression tests using the hash-pinned public Pro release as the fixture."""
import os
import tempfile
import unittest
from pathlib import Path

from mcu_timeout_emulator import serial_read
from mcu_timeout_fix import (
    CONTROL, NEW, OLD, OUTPUT_NAME, PATCH_OFFSET, PATCHED_ISP_SHA256,
    SOURCE_NAME, build, decrypt, encrypt, members, patch_isp,
    replace_member, sha256, validate_output, verified_source,
)


class TimeoutFixTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        default = Path(__file__).resolve().parents[1] / "inputs" / SOURCE_NAME
        cls.source = Path(os.environ.get("CREATOR5PRO_FIRMWARE", default))
        if not cls.source.is_file():
            raise RuntimeError("Download the public Pro release to inputs/ or set CREATOR5PRO_FIRMWARE")
        cls.raw = cls.source.read_bytes()
        cls.plain = verified_source(cls.raw)
        cls.original = members(members(cls.plain)[CONTROL][1])["./ISPCommand"][1]
        cls.patched = patch_isp(cls.original)
        cls.temporary = tempfile.TemporaryDirectory()
        cls.addClassCleanup(cls.temporary.cleanup)
        cls.output_dir = Path(cls.temporary.name)
        cls.report = build(cls.source, cls.output_dir)
        cls.output = (cls.output_dir / OUTPUT_NAME).read_bytes()

    def test_delayed_erase_ack_no_longer_times_out(self):
        self.assertEqual(serial_read(self.original, 8)["result"], -2)
        result = serial_read(self.patched, 8)
        self.assertEqual(result["result"], 0)
        self.assertEqual(result["select_seconds"], [20])
        self.assertEqual(result["byte"], "79")

    def test_fast_reply_still_works(self):
        for image in (self.original, self.patched):
            self.assertEqual(serial_read(image, 0.1)["result"], 0)

    def test_timeout_remains_bounded(self):
        self.assertEqual(serial_read(self.patched, 21)["result"], -2)

    def test_late_reply_within_stock_timeout_works(self):
        self.assertEqual(serial_read(self.patched, 19)["result"], 0)

    def test_patch_changes_exactly_the_timeout_byte(self):
        self.assertEqual(len(self.original), len(self.patched))
        differences = [i for i, (a, b) in enumerate(zip(self.original, self.patched)) if a != b]
        self.assertEqual(differences, [PATCH_OFFSET])
        self.assertEqual(self.original[PATCH_OFFSET:PATCH_OFFSET + 4], OLD)
        self.assertEqual(self.patched[PATCH_OFFSET:PATCH_OFFSET + 4], NEW)
        self.assertEqual(sha256(self.patched), PATCHED_ISP_SHA256)

    def test_unknown_isp_is_rejected(self):
        changed = bytearray(self.original)
        changed[100] ^= 1
        with self.assertRaisesRegex(ValueError, "Unsupported ISPCommand"):
            patch_isp(bytes(changed))

    def test_creator5_and_other_packages_are_rejected_before_writing(self):
        with tempfile.TemporaryDirectory() as temp:
            source = Path(temp) / "Creator5-other.tgz"
            source.write_bytes(b"unsupported package")
            destination = Path(temp) / "output"
            with self.assertRaisesRegex(ValueError, "Creator5 and other versions are unsupported"):
                build(source, destination)
            self.assertFalse(destination.exists())

    def test_full_package_passes_all_component_checksums(self):
        report = validate_output(self.raw, self.output)
        self.assertEqual(report["internal_md5_entries_validated"], 53)
        self.assertFalse(report["creator5_supported"])
        self.assertTrue(report["tar_headers_and_other_payloads_preserved"])

    def test_software_kernel_library_and_install_script_are_unchanged(self):
        before, after = members(self.plain), members(decrypt(self.output))
        self.assertEqual(list(before), list(after))
        for name, (entry, data) in before.items():
            self.assertEqual(entry.get_info(), after[name][0].get_info())
            if name != CONTROL:
                self.assertEqual(data, after[name][1], name)

    def test_modified_output_cannot_pass_verification(self):
        plain = decrypt(self.output)
        outer = members(plain)
        installer = outer["./runFirmwareExe.sh"][1]
        changed = replace_member(plain, "./runFirmwareExe.sh", installer.replace(b"0029", b"0028"))
        with self.assertRaisesRegex(ValueError, "differs from the exact timeout patch"):
            validate_output(self.raw, encrypt(changed))

    def test_existing_output_is_not_overwritten(self):
        original = (self.output_dir / OUTPUT_NAME).read_bytes()
        with self.assertRaisesRegex(ValueError, "already exists"):
            build(self.source, self.output_dir)
        self.assertEqual((self.output_dir / OUTPUT_NAME).read_bytes(), original)

    def test_independent_plaintext_must_match(self):
        plain = decrypt(self.output)
        self.assertTrue(validate_output(self.raw, self.output, plain)["independent_openssl_decryption"])
        with self.assertRaisesRegex(ValueError, "Independent OpenSSL decryption differs"):
            validate_output(self.raw, self.output, b"wrong plaintext")


if __name__ == "__main__":
    unittest.main()
