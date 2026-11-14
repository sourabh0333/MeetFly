"""Builds the MeetFly logo files: the name in Outfit Bold with headphones over the two e's.

Usage: python -I build.py <Outfit Bold font file (.woff2 or .ttf, weight 700)> <brand folder>
Needs: pip install fonttools brotli resvg-py

Everything is in the font's own units (1000 per em), y measured up from the baseline.
The numbers below reproduce the approved sketch exactly:
  letters      Outfit Bold, 0.02em letter-spacing, positions as the browser laid them out
  headband     starts 0.03em after the first e begins, 1.04em wide, from 0.2em to 0.92em above the baseline,
               0.075em thick, with a half-circle top (radius 0.52em)
  ear cups     0.13em wide, 0.36em tall, 0.06em above the baseline, fully rounded, at each end of the band
"""
import sys, os, struct
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
import resvg_py

font_path, out = sys.argv[1], sys.argv[2]
INK, WHITE, LIME, VIOLET, PAPER = '#0B0A14', '#FFFFFF', '#D4FF3A', '#5B2EFF', '#F4F4F0'

# Letter positions measured from the browser layout (letter-spacing 0.02em, e-t kerning included).
LETTERS = [('M', 0), ('e', 878), ('e', 1446), ('t', 2004), ('F', 2423), ('l', 3033), ('y', 3314)]
E0 = 878                                     # where the first e starts
BAND = dict(x=E0 + 30, w=1040, y0=200, y1=920, t=75, r=520)
CUP = dict(w=130, h=360, y0=60, xs=(E0 - 20, E0 + 990))
INK_L, INK_R, TOP, DESC = 62, 3845, BAND['y1'], 219
PAD = 150
BASE = TOP + PAD                             # baseline's y in the lockup's SVG
VB_X, VB_W, VB_H = INK_L - PAD, (INK_R - INK_L) + 2 * PAD, TOP + DESC + 2 * PAD

f = TTFont(font_path); gs = f.getGlyphSet(); cmap = f.getBestCmap()
fmt = lambda v: f'{v:.1f}'.rstrip('0').rstrip('.')
def letters_path(items, dx=0, base=BASE, k=1.0):
    parts = []
    for ch, x in items:
        pen = SVGPathPen(gs, ntos=fmt)
        gs[cmap[ord(ch)]].draw(TransformPen(pen, (k, 0, 0, -k, (x + dx) * k, base)))
        parts.append(pen.getCommands())
    return ''.join(parts)

def band_path(dx=0, base=BASE, k=1.0):
    b = BAND; X = lambda v: fmt((v + dx) * k); Y = lambda v: fmt(base - v * k); R = lambda v: fmt(v * k)
    x0, x1, yc = b['x'], b['x'] + b['w'], b['y1'] - b['r']
    ri = b['r'] - b['t']
    return (f'M{X(x0)} {Y(b["y0"])}V{Y(yc)}A{R(b["r"])} {R(b["r"])} 0 0 1 {X(x1)} {Y(yc)}V{Y(b["y0"])}H{X(x1 - b["t"])}'
            f'V{Y(yc)}A{R(ri)} {R(ri)} 0 0 0 {X(x0 + b["t"])} {Y(yc)}V{Y(b["y0"])}Z')
def cups(fill, dx=0, base=BASE, k=1.0):
    c = CUP
    return ''.join(f'<rect x="{fmt((x + dx) * k)}" y="{fmt(base - (c["y0"] + c["h"]) * k)}" width="{fmt(c["w"] * k)}" height="{fmt(c["h"] * k)}" rx="{fmt(c["w"] * k / 2)}" fill="{fill}"/>' for x in c['xs'])

def svg(vb, w, h, body, label='MeetFly'):
    return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{vb}" width="{w}" height="{h}" role="img" aria-label="{label}">{body}</svg>\n'

def lockup(text, band, bg=None):
    body = (f'<rect x="{VB_X}" width="{VB_W}" height="{VB_H}" fill="{bg}"/>' if bg else '')
    body += f'<path d="{letters_path(LETTERS)}" fill="{text}"/><path d="{band_path()}" fill="{band}"/>{cups(band)}'
    return svg(f'{VB_X} 0 {VB_W} {VB_H}', round(VB_W / 10), round(VB_H / 10), body)

# The icon: the two e's wearing the headphones, on a rounded tile.
EE = [('e', 878), ('e', 1446)]
def icon(tile, text, band, size=1024, radius=0.225, edge=True, scale=0.6):
    left, right = CUP['xs'][0], CUP['xs'][1] + CUP['w']           # 858 .. 1998
    k = scale * size / (right - left)
    dx = (size / k - (left + right)) / 2
    base = size / 2 + (TOP - 16) * k / 2                           # centre the e's + band vertically
    r = fmt(size * radius)
    grad = ''
    fill = tile
    if tile == INK:
        grad = '<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#211F30"/><stop offset="1" stop-color="#0B0A14"/></linearGradient></defs>'
        fill = 'url(#g)'
    body = grad + f'<rect width="{size}" height="{size}" rx="{r}" fill="{fill}"/>'
    if edge and tile == INK:
        s = size * 0.006
        body += f'<rect x="{fmt(s/2)}" y="{fmt(s/2)}" width="{fmt(size - s)}" height="{fmt(size - s)}" rx="{fmt(size * radius - s/2)}" fill="none" stroke="#FFFFFF" stroke-opacity=".1" stroke-width="{fmt(s)}"/>'
    body += f'<path d="{letters_path(EE, dx, base, k)}" fill="{text}"/><path d="{band_path(dx, base, k)}" fill="{band}"/>{cups(band, dx, base, k)}'
    return svg(f'0 0 {size} {size}', size, size, body, 'MeetFly icon')

files = {
  'logo/meetfly-on-dark.svg':    lockup(WHITE, LIME),
  'logo/meetfly-on-light.svg':   lockup(INK, VIOLET),
  'logo/meetfly-on-lime.svg':    lockup(INK, VIOLET),
  'logo/meetfly-mono-white.svg': lockup(WHITE, WHITE),
  'logo/meetfly-mono-ink.svg':   lockup(INK, INK),
  'icon/app-icon.svg':           icon(INK, WHITE, LIME),
  'icon/app-icon-lime.svg':      icon(LIME, INK, VIOLET),
  'icon/favicon.svg':            icon(INK, WHITE, LIME, size=64, radius=0.24, edge=False, scale=0.7),
}
for name, data in files.items():
    p = os.path.join(out, name); os.makedirs(os.path.dirname(p), exist_ok=True)
    open(p, 'w', encoding='utf-8', newline='\n').write(data)

def png(src, dst, width, bg=None):
    data = bytes(resvg_py.svg_to_bytes(svg_path=os.path.join(out, src), width=width, **({'background': bg} if bg else {})))
    p = os.path.join(out, dst); os.makedirs(os.path.dirname(p), exist_ok=True); open(p, 'wb').write(data); return data

for w in (1024, 512, 256, 128): png('icon/app-icon.svg', f'png/app-icon-{w}.png', w)
png('icon/app-icon-lime.svg', 'png/app-icon-lime-512.png', 512)
png('icon/app-icon.svg', 'png/apple-touch-icon-180.png', 180)
ico = [(s, png('icon/favicon.svg', f'png/favicon-{s}.png', s)) for s in (16, 32, 48)]
for name in ('meetfly-on-dark', 'meetfly-on-light'): png(f'logo/{name}.svg', f'png/{name}.png', 1600)
png('logo/meetfly-on-dark.svg', 'png/meetfly-on-dark-preview.png', 1600, INK)
png('logo/meetfly-on-light.svg', 'png/meetfly-on-light-preview.png', 1600, PAPER)
head = struct.pack('<HHH', 0, 1, len(ico)); off = 6 + 16 * len(ico); entries = b''; blob = b''
for s, d in ico:
    entries += struct.pack('<BBBBHHII', s, s, 0, 0, 1, 32, len(d), off + len(blob)); blob += d
open(os.path.join(out, 'icon/favicon.ico'), 'wb').write(head + entries + blob)
print('lockup', VB_W, 'x', VB_H, '| files', len(files))
