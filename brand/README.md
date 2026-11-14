# MeetFly brand kit

Version 2, 2026-11-11. The logo is the name **MeetFly** with a pair of headphones over the two e's, as approved from `explorations/directions-14.html`.

Open `index.html` for the visual guide.

## The idea

- **The name is the logo.** There is no separate symbol.
- **The headphones** sit over the two e's: MeetFly is the one listening in on your call.
- **Colours:** dark surfaces, white letters and one lime accent. The headphones are always the accent colour.

## Files

| Folder | What | Use |
|---|---|---|
| `logo/meetfly-on-dark.svg` | White letters, lime headphones | The default logo, on dark |
| `logo/meetfly-on-light.svg` | Ink letters, violet headphones | On white or off-white |
| `logo/meetfly-on-lime.svg` | Ink letters, violet headphones | On the lime brand colour |
| `logo/meetfly-mono-white.svg`, `meetfly-mono-ink.svg` | One colour | Print in one colour, watermarks, photos |
| `icon/app-icon.svg` | The two e's with headphones, dark tile | Desktop app, stores |
| `icon/app-icon-lime.svg` | The same on a lime tile | Where a dark icon would disappear |
| `icon/favicon.svg`, `favicon.ico` | Favicon | Website |
| `png/` | Exports of the above | Where SVG is not accepted |
| `tokens.css` | Colours, type and shape as CSS variables | Website and app |
| `source/build.py` | The script that generates every logo file | Regenerate, never edit the files by hand |
| `source/Outfit-Bold.woff2` | The typeface file the logo is drawn from | Needed by the build script |

The letters in the logo files are outlines, so the logo needs no font installed.

## How the logo is built

Measured in em (1em = the type size), exactly as in the approved sketch:

- **Letters:** Outfit Bold, letter-spacing 0.02em.
- **Headband:** starts 0.03em after the first e begins, 1.04em wide, 0.075em thick, with a half-circle top. It runs from 0.2em to 0.92em above the baseline.
- **Ear cups:** 0.13em wide and 0.36em tall, fully rounded, one at each end of the band.

## Logo rules

- **Clear space:** keep at least the height of the letter e free on every side.
- **Smallest size:** 96px wide for the full logo. Below that, use the icon.
- **Colours:** on dark, white letters with lime headphones. On light, ink letters with violet headphones (lime cannot be seen on light backgrounds). On photos or busy colours, a one-colour version.
- **Do not** recolour the letters, move or resize the headphones, stretch or rotate the logo, add shadows or glows, or retype the name in another font.

## Colours

| Token | Hex | Use | Contrast |
|---|---|---|---|
| Ink | `#0B0A14` | Page on dark; text on light and on lime | |
| Panel | `#171622` | Cards on Ink | |
| Line | `#262536` | Hairlines on Ink | decorative |
| White | `#FFFFFF` | Text on Ink | 19.7:1 |
| Mist | `#A9A7BD` | Secondary text on Ink | 8.4:1 |
| Dim | `#807E96` | Captions on Ink, 14px and up | 5.0:1 |
| Lime | `#D4FF3A` | The accent on dark: headphones, primary buttons, live states | 17.0:1 on Ink |
| Paper | `#F4F4F0` | Page on light | |
| Violet | `#5B2EFF` | The accent on light | 5.8:1 on Paper |
| Stone | `#5A586B` | Secondary text on light | 6.3:1 on Paper |

- Lime is rare: one primary action per view, the headphones, and things that are live.
- Text on Lime is Ink (17.0:1).
- Status colours (`--ok`, `--warn`, `--error`) are separate.

## Type

- **Outfit** for everything: 700 for headings (it is the logo's typeface), 400 to 500 for text.
- **JetBrains Mono** for small labels and timecodes, uppercase with 0.08em tracking.

Both are under the SIL Open Font License (`source/OFL-Outfit.txt`). Self-host them on the website.

## Regenerating

```bash
python -m pip install fonttools brotli resvg-py
```

```bash
python -I source/build.py source/Outfit-Bold.woff2 .
```

## Not done yet

- A trademark check on the name and the logo.
- Motion and tone of voice.
- The app's own theme and icon still use the earlier sample; they should move to this kit.

Earlier directions, including the first kit, are kept in `explorations/`.
