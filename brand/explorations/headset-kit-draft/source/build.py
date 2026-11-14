"""Builds the MeetFly logo files. Usage: python -I source/build.py <Outfit[wght].ttf> <brand dir>

The logo is the name set in Outfit Bold with the headset icon over the two e's.
All measurements are in the font's own units (1000 per em), with y measured up from the baseline."""
import sys, os, struct
from fontTools.ttLib import TTFont
from fontTools.varLib import instancer
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
import resvg_py

font_path, out = sys.argv[1], sys.argv[2]
INK, WHITE, LIME, VIOLET, PAPER = '#0B0A14', '#FFFFFF', '#D4FF3A', '#5B2EFF', '#F4F4F0'
LS = -15                                    # letter-spacing, -0.015em

f = instancer.instantiateVariableFont(TTFont(font_path), {'wght': 700})
gs, cmap = f.getGlyphSet(), f.getBestCmap()
fmt = lambda v: f'{v:.1f}'.rstrip('0').rstrip('.')

def text_path(text, x0, base):
    """Outlines `text` starting at x0 with its baseline at svg y = base. Returns (path, {index: origin x}, end x)."""
    x, parts, origins = x0, [], {}
    for i, ch in enumerate(text):
        g = gs[cmap[ord(ch)]]; pen = SVGPathPen(gs, ntos=fmt)
        g.draw(TransformPen(pen, (1, 0, 0, -1, x, base)))
        parts.append(pen.getCommands()); origins[i] = x; x += g.width + LS
    return ''.join(parts), origins, x - LS

def icon(e1, base, color):
    """The headset, placed from the origin of the first e. Geometry is the approved draft's, unchanged:
    a loop 560 wide and 85 thick from y=400 to y=860, a hook under the second e, and a small capsule."""
    X = lambda v: fmt(e1 + v); Y = lambda v: fmt(base - v)
    loop = f'M{X(304.5)} {Y(400)}V{Y(580)}A237.5 237.5 0 0 1 {X(779.5)} {Y(580)}V{Y(400)}'
    hook = f'M{X(1110)} {Y(80)}A170 170 0 0 1 {X(940)} {Y(-90)}H{X(900)}'
    return (f'<path d="{loop}" fill="none" stroke="{color}" stroke-width="85"/>'
            f'<path d="{hook}" fill="none" stroke="{color}" stroke-width="60"/>'
            f'<rect x="{X(800)}" y="{Y(-60)}" width="140" height="110" rx="55" fill="{color}"/>')

# --- Full logo -----------------------------------------------------------------------------------
PAD, TOP, BOTTOM = 120, 860, 219             # margin; the loop's top; the y's depth below the baseline
BASE = PAD + TOP
word, origins, end = text_path('MeetFly', PAD - 62, BASE)       # 62 = the M's left side bearing, so ink starts at PAD
E1 = origins[1]
W, H = round(end - 3 + PAD), BASE + BOTTOM + PAD                # 3 = the y's right side bearing
def logo(text_color, icon_color, bg=None):
    back = f'<rect width="{W}" height="{H}" fill="{bg}"/>' if bg else ''
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" width="{W/10:.0f}" height="{H/10:.0f}" role="img" aria-label="MeetFly">'
            f'{back}<path d="{word}" fill="{text_color}"/>{icon(E1, BASE, icon_color)}</svg>\n')

# --- Symbol: the two e's with the headset ------------------------------------------------------
SP = 150
ee, eo, _ = text_path('ee', SP + 70, SP + TOP)                  # extra 70 on the left balances the hook on the right
SW, SH = SP + 70 + 1140 + SP, SP + TOP + 170 + SP
def symbol_body(text_color, icon_color): return f'<path d="{ee}" fill="{text_color}"/>{icon(eo[0], SP + TOP, icon_color)}'
def symbol(text_color, icon_color):
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {SW} {SH}" width="{SW/10:.0f}" height="{SH/10:.0f}" role="img" aria-label="MeetFly">'
            f'{symbol_body(text_color, icon_color)}</svg>\n')
def app_icon(bg, text_color, icon_color, size=1024, radius=230, scale=0.56):
    k = size * scale / max(SW - 2 * SP, SH - 2 * SP); w, h = (SW - 2 * SP) * k, (SH - 2 * SP) * k
    tx, ty = (size - w) / 2 - SP * k, (size - h) / 2 - SP * k
    edge = f'<rect x="3" y="3" width="{size-6}" height="{size-6}" rx="{radius-3}" fill="none" stroke="#FFFFFF" stroke-opacity=".1" stroke-width="6"/>' if bg == INK else ''
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {size} {size}" width="{size}" height="{size}" role="img" aria-label="MeetFly">'
            f'<rect width="{size}" height="{size}" rx="{radius}" fill="{bg}"/>{edge}'
            f'<g transform="translate({tx:.1f} {ty:.1f}) scale({k:.5f})">{symbol_body(text_color, icon_color)}</g></svg>\n')

files = {
  'logo/logo-on-dark.svg':   logo(WHITE, LIME),
  'logo/logo-on-light.svg':  logo(INK, VIOLET),
  'logo/logo-on-lime.svg':   logo(INK, VIOLET),
  'logo/logo-mono-white.svg': logo(WHITE, WHITE),
  'logo/logo-mono-ink.svg':  logo(INK, INK),
  'logo/symbol-on-dark.svg': symbol(WHITE, LIME),
  'logo/symbol-on-light.svg': symbol(INK, VIOLET),
  'icon/app-icon.svg':       app_icon(INK, WHITE, LIME),
  'icon/app-icon-lime.svg':  app_icon(LIME, INK, VIOLET),
  'icon/favicon.svg':        app_icon(INK, WHITE, LIME, size=64, radius=14, scale=0.7),
}
for name, data in files.items():
    p = os.path.join(out, name); os.makedirs(os.path.dirname(p), exist_ok=True)
    open(p, 'w', encoding='utf-8', newline='\n').write(data)

def png(src, dst, width, bg=None):
    kw = dict(svg_path=os.path.join(out, src), width=width)
    if bg: kw['background'] = bg
    data = bytes(resvg_py.svg_to_bytes(**kw))
    p = os.path.join(out, dst); os.makedirs(os.path.dirname(p), exist_ok=True); open(p, 'wb').write(data); return data
for name in ('logo-on-dark', 'logo-on-light', 'logo-mono-white', 'logo-mono-ink'): png(f'logo/{name}.svg', f'png/{name}.png', 1600)
png('logo/logo-on-dark.svg', 'png/logo-on-dark-with-background.png', 1600, INK)
png('logo/logo-on-light.svg', 'png/logo-on-light-with-background.png', 1600, PAPER)
for w in (1024, 512, 256, 128): png('icon/app-icon.svg', f'png/app-icon-{w}.png', w)
png('icon/app-icon-lime.svg', 'png/app-icon-lime-512.png', 512)
png('icon/app-icon.svg', 'png/apple-touch-icon-180.png', 180)
ico = [(s, png('icon/favicon.svg', f'png/favicon-{s}.png', s)) for s in (16, 32, 48)]
head = struct.pack('<HHH', 0, 1, len(ico)); off = 6 + 16 * len(ico); entries = blob = b''
for s, d in ico:
    entries += struct.pack('<BBBBHHII', s, s, 0, 0, 1, 32, len(d), off + len(blob)); blob += d
open(os.path.join(out, 'icon/favicon.ico'), 'wb').write(head + entries + blob)
print(f'logo {W} x {H}; baseline {BASE}; first e at {E1}; symbol {SW} x {SH}; {len(files)} svg files')
