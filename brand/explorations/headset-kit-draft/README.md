# MeetFly brand kit

Version 2, 2026-11-11. The logo is the one approved from `explorations/directions-14.html` (the "headset" draft), unchanged. Open `index.html` for the visual guide.

The first kit ("Lift", round 1) was replaced and is kept in `explorations/round-1-kit/`.

## The logo

- **The name is the logo:** "MeetFly" set in Outfit Bold, tracked at −0.015em.
- **The icon:** a thin lime loop over the two e's, with a small hook and capsule under the second e. Together with the e's it reads as a headset: MeetFly is the one listening in on the call.
- **Colour:** white letters with a lime icon on dark. On light and on lime the icon is violet, because lime cannot be seen on light backgrounds.

The icon's shape, size and position are fixed. They are written into `source/build.py` and must not be redrawn.

## Files

| Folder | What | Use |
|---|---|---|
| `logo/logo-on-dark.svg` | White letters, lime icon | The default logo |
| `logo/logo-on-light.svg`, `logo-on-lime.svg` | Ink letters, violet icon | Light backgrounds, lime backgrounds |
| `logo/logo-mono-white.svg`, `logo-mono-ink.svg` | One colour | Photos, print in one colour |
| `logo/symbol-on-dark.svg`, `symbol-on-light.svg` | The two e's with the headset | Small spaces, avatars |
| `icon/app-icon.svg`, `app-icon-lime.svg` | App icon on ink, and on lime | Desktop app, stores |
| `icon/favicon.svg`, `favicon.ico` | Favicon | Website |
| `png/` | Exports of the above | Where SVG is not accepted |
| `tokens.css` | Colours, type and shape as CSS variables | Website and app |
| `source/build.py` | Generates every logo file | Regenerate; never edit the files by hand |

The letters in the logo files are outlines, so no font needs to be installed.

## Logo rules

- **Clear space:** keep the height of the letter e free on every side.
- **Smallest sizes:** full logo 96px wide. Below that use the symbol; below 24px use the favicon.
- **Do not** change the icon's shape or position, recolour it outside the pairs above, stretch or rotate the logo, add effects, or retype the name in another typeface.

## Colours

| Token | Hex | Use | Contrast |
|---|---|---|---|
| Ink | `#0B0A14` | Page on dark; text on light | |
| Panel | `#16151F` | Cards on Ink | |
| Raised | `#1F1E2B` | Hover, menus, inputs | |
| Line | `#2B2A3A` | Hairlines on Ink | decorative |
| White | `#FFFFFF` | Text on Ink | 19.7:1 |
| Mist | `#A9A7BD` | Secondary text on Ink | 8.4:1 |
| Dim | `#7E7C93` | Captions on Ink, 14px and up | 4.9:1 |
| Lime | `#D4FF3A` | The accent on dark: the icon, primary button, live states | 17:1 on Ink |
| Lime ink | `#141A00` | Text on Lime | 15.4:1 |
| Paper | `#F4F4F0` | Page on light | |
| Violet | `#5B2EFF` | The accent on light and on Lime | 5.8:1 on Paper |
| Stone | `#5A5870` | Secondary text on Paper | 6.2:1 |

- Lime is rare: the icon, one primary action per view, and things that are live.
- Lime is never used on a light background.
- Status colours (`--ok`, `--warn`, `--error`) are separate from the accent.

## Type

- **Outfit** for headings (600–700) and for text (400–500). It is the logo's own typeface.
- **JetBrains Mono** for small labels and timecodes, uppercase with 0.08em tracking.

Both are under the SIL Open Font License (Outfit's licence is in `source/OFL-Outfit.txt`). Self-host them on the website.

## Regenerating

```bash
python -m pip install fonttools resvg-py
```

Download `Outfit[wght].ttf` from the Google Fonts repository (`ofl/outfit`), then:

```bash
python -I source/build.py path/to/Outfit.ttf .
```

## Not done yet

- A trademark check on the name and the logo.
- Motion and tone of voice.
- The app still uses its earlier sample icon and colours; it should move to this kit.
