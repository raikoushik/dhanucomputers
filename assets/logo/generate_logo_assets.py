"""Generate required PNG and ICO assets from SVG sources.
Run where playwright+firefox are available.
"""
from pathlib import Path
import struct
from playwright.sync_api import sync_playwright

root = Path(__file__).parent
logo_svg = (root / "dhanutech-logo.svg").read_text(encoding="utf-8")
sym_svg = (root / "dhanutech-symbol.svg").read_text(encoding="utf-8")

with sync_playwright() as p:
    browser = p.firefox.launch()
    page = browser.new_page()

    for s in (1024, 512):
        page.set_viewport_size({"width": s, "height": s})
        page.set_content(f"<html><body style='margin:0;background:transparent'>{logo_svg}</body></html>")
        page.locator("svg").first.screenshot(path=str(root / f"dhanutech-logo-{s}.png"))

    for s in (1024, 512, 180, 64, 48, 32, 16):
        page.set_viewport_size({"width": s, "height": s})
        page.set_content(f"<html><body style='margin:0;background:transparent'>{sym_svg}</body></html>")
        page.locator("svg").first.screenshot(path=str(root / f"dhanutech-symbol-{s}.png"))

    browser.close()

name_map = {
    16: "favicon-16x16.png",
    32: "favicon-32x32.png",
    48: "favicon-48x48.png",
    64: "favicon-64x64.png",
    180: "apple-touch-icon-180x180.png",
}
for s, out_name in name_map.items():
    (root / out_name).write_bytes((root / f"dhanutech-symbol-{s}.png").read_bytes())

imgs = [(s, (root / f"favicon-{s}x{s}.png").read_bytes()) for s in (16, 32, 48, 64)]
ico = bytearray(struct.pack("<HHH", 0, 1, len(imgs)))
offset = 6 + 16 * len(imgs)
for s, data in imgs:
    ico += struct.pack("<BBBBHHII", s, s, 0, 0, 1, 32, len(data), offset)
    offset += len(data)
for _, data in imgs:
    ico += data
(root / "favicon.ico").write_bytes(ico)

print("Generated all logo/favicons in", root)
