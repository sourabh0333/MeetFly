# MeetFly brand kit

Version 1, 2026-11-10. Direction: **Lift + Night flight**, chosen from the options in `explorations/directions.html`.

Open `index.html` for the visual guide.

## The idea

- **The symbol, "Lift":** a speech bubble that is also a wing. The square corner at the bottom left is the bubble's tail, pointing to the speaker. The sharp tip at the top right is the wing, pointing up and away.
- **The dot:** the live light. It is always Ember, and it is the one warm colour on screen.
- **The look, "Night flight":** dark surfaces, chalk text and a single orange accent.

## Files

| Folder | What | Use |
|---|---|---|
| `logo/lockup.svg`, `lockup-on-dark.svg` | Symbol + wordmark | The default logo, on light and on dark |
| `logo/symbol.svg`, `symbol-on-dark.svg` | Symbol alone | Small spaces, avatars |
| `logo/*-mono-ink.svg`, `*-mono-white.svg` | One colour, the dot cut out | Print in one colour, stamps, watermarks |
| `logo/wordmark.svg` | The word alone | Only beside the symbol used elsewhere on the same surface |
| `icon/app-icon.svg` | App icon, night tile | Desktop app, stores |
| `icon/app-icon-ember.svg` | App icon, ember tile | An alternative where a dark icon would disappear |
| `icon/favicon.svg`, `favicon.ico` | Favicon | Website |
| `png/` | Exports of the above | Where SVG is not accepted |
| `tokens.css` | Colours, type and shape as CSS variables | Website and app |
| `source/build.py` | The script that generates every logo file | Regenerate, never edit the files by hand |

## Logo rules

- **Clear space:** keep at least half the symbol's height free on every side.
- **Smallest sizes:** symbol 16px; lockup 88px wide. Below 24px use the favicon, which has its own tile.
- **Colour pairs:** Night symbol on Chalk or white; Chalk symbol on Night. The dot stays Ember in both. On photos or mid-tone colours use a mono version.
- **Do not** recolour the dot, stretch or rotate the logo, add shadows or glows, retype the wordmark in another font, or move the symbol relative to the word.

## Colours

| Token | Hex | Use | Contrast |
|---|---|---|---|
| Night | `#0D0D12` | Page on dark; ink on light | |
| Panel | `#17171F` | Cards on Night | |
| Raised | `#20202B` | Hover, menus, inputs | |
| Line | `#2C2C38` | Hairlines on Night | decorative |
| Chalk | `#F4F3EF` | Text on Night; page on light | 17.5:1 on Night |
| Haze | `#A3A2AD` | Secondary text on Night | 7.7:1 |
| Dim | `#7C7B87` | Captions on Night, 14px and up | 4.7:1 |
| Ember | `#FF8A4C` | The accent: primary button, the dot, live states | 8.3:1 on Night |
| Ember soft | `#FFA574` | Ember on hover | |
| Ember ink | `#1C0D04` | Text on Ember | 8.1:1 |
| Ember deep | `#B4430C` | Accent as text on light | 5.1:1 on Chalk |
| Stone | `#5E5D68` | Secondary text on light | 5.8:1 on Chalk |

- Ember is rare: one primary action per view, the dot, and things that are live.
- Ember itself is never text on a light background (2.1:1). Use Ember deep there.
- Status colours (`--ok`, `--warn`, `--error`) are separate, so "live" and "careful" never look alike.

## Type

- **Sora** (600–700) for headings and the wordmark, tracked tight (−0.045em at display size).
- **Manrope** (400–600) for text and interface.
- **JetBrains Mono** for small labels and timecodes, uppercase with 0.08em tracking.

All three are under the SIL Open Font License; Sora's licence is in `source/OFL-Sora.txt`. The wordmark in the logo files is outlined, so the logo needs no font. Self-host the fonts on the website.

## Regenerating

```bash
python -m pip install fonttools resvg-py
```

Download `Sora[wght].ttf` from the Google Fonts repository (`ofl/sora`), then:

```bash
python -I source/build.py path/to/Sora.ttf .
```

## Not done yet

- A trademark check on the name and the symbol.
- Motion (how the dot and the symbol animate) and tone of voice. Both wait for the product decisions.
- The app's own theme and icon still use the earlier sample; they should move to this kit.
