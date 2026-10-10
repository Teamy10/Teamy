"""
Rebuild app/fonts/*.woff2 from the Google Fonts OFL sources.

Usage:
    pip install fonttools brotli
    python scripts/build-fonts.py <folder containing inter.ttf and bricolage.ttf>

Sources (download the variable TTFs and rename them):
    https://github.com/google/fonts/raw/main/ofl/inter/Inter%5Bopsz,wght%5D.ttf  -> inter.ttf
    https://github.com/google/fonts/raw/main/ofl/bricolagegrotesque/BricolageGrotesque%5Bopsz,wdth,wght%5D.ttf  -> bricolage.ttf
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
# (file, min weight, max weight) — only the weights the site uses.
FONTS = [("inter", 400, 700), ("bricolage", 400, 800)]

src = sys.argv[1]
out = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "app", "fonts")
for name, wmin, wmax in FONTS:
    font = TTFont(os.path.join(src, f"{name}.ttf"), lazy=False)
    opts = subset.Options()
    opts.layout_features = ["*"]
    opts.name_IDs = ["*"]
    opts.notdef_outline = True
    sub = subset.Subsetter(opts)
    sub.populate(unicodes=subset.parse_unicodes(UNICODES))
    sub.subset(font)
    # Pin optical size / width to their defaults; keep a weight range.
    limits = {a.axisTag: a.defaultValue for a in font["fvar"].axes}
    limits["wght"] = (wmin, 400, wmax)
    font = instancer.instantiateVariableFont(font, limits)
    font.flavor = "woff2"
    path = os.path.join(out, f"{name}.woff2")
    font.save(path)
    print(f"{name}: {os.path.getsize(path) // 1024} KB")
