"""
Rebuild app/fonts/*.woff2 from the Google Fonts OFL sources.

Usage:
    pip install fonttools brotli
    python scripts/build-fonts.py <folder containing inter.ttf and mono.ttf>

Sources (download the variable TTFs and rename them):
    https://github.com/google/fonts/raw/main/ofl/inter/Inter%5Bopsz,wght%5D.ttf  -> inter.ttf
    https://github.com/google/fonts/raw/main/ofl/jetbrainsmono/JetBrainsMono%5Bwght%5D.ttf  -> mono.ttf
"""
import os
import sys

from fontTools import subset
from fontTools.ttLib import TTFont
from fontTools.varLib import instancer

# Google's "latin" range + the rupee sign (U+20B9) and arrows used in the copy.
UNICODES = (
    "U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,"
    "U+2000-206F,U+20AC,U+20B9,U+2122,U+2190-2193,U+2212,U+2215,U+FEFF,U+FFFD"
)
# (output name, source file, optical size or None, min weight, max weight) — only what the site uses.
# "inter-display" is Inter at its display optical size (opsz 32), i.e. Inter Display; 300 is the light
# contrast weight used for emphasised headline words. "mono" is JetBrains Mono for labels and numbers.
FONTS = [
    ("inter", "inter", 14, 400, 700),
    ("inter-display", "inter", 32, 300, 800),
    ("mono", "mono", None, 400, 500),
]

src = sys.argv[1]
out = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "app", "fonts")
for name, source, opsz, wmin, wmax in FONTS:
    font = TTFont(os.path.join(src, f"{source}.ttf"), lazy=False)
    opts = subset.Options()
    opts.layout_features = ["*"]
    opts.name_IDs = ["*"]
    opts.notdef_outline = True
    sub = subset.Subsetter(opts)
    sub.populate(unicodes=subset.parse_unicodes(UNICODES))
    sub.subset(font)
    # Pin optical size (text or display); keep a weight range.
    limits = {a.axisTag: a.defaultValue for a in font["fvar"].axes}
    if opsz is not None:
        limits["opsz"] = opsz
    limits["wght"] = (wmin, min(max(wmin, 400), wmax), wmax)
    font = instancer.instantiateVariableFont(font, limits)
    font.flavor = "woff2"
    path = os.path.join(out, f"{name}.woff2")
    font.save(path)
    print(f"{name}: {os.path.getsize(path) // 1024} KB")
