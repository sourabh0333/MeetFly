# MeetFly website: project context

Last updated: 2026-11-11. Update this file whenever a lasting decision changes.

## Product (from the app's repository, read 2026-11-10)

MeetFly is a desktop app for macOS and Windows: an AI copilot for calls. It transcribes both sides live, suggests what to say next, writes notes, records the call, translates captions, and can change your voice or accent. Full notes: `research/meetfly-app-review.md`. Competitor review: `research/meetily-review.md`.

- **Only write claims the app really does.** Audio goes to cloud AI providers (Cartesia, Gemini), so never say "100% local". True: no bot joins the call, and notes, transcripts and recordings are stored on the user's computer.
- **Not decided yet (parked by the owner):** pricing, how people get the app (no public installers yet), the target audience, and how stealth mode, interview help and voice cloning are presented. Until then, download buttons point to `#download` and the page says nothing about price.

## Brand (settled 2026-11-11)

The kit is in `brand/` (open `brand/index.html`; rules in `brand/README.md`).

- **Logo:** the name MeetFly in Outfit Bold with headphones over the two e's. Use the files in `brand/logo/` unchanged; web copies are in `public/brand/`.
- **Colours:** Ink `#0B0A14`, white, one Lime accent `#D4FF3A`. On light backgrounds Violet `#5B2EFF` replaces lime as text; lime stays as a fill or highlighter.
- **Type:** Outfit for headings and text, JetBrains Mono for small labels.
- Earlier logo rounds are in `brand/explorations/`.

## Technical baseline

- Next.js 16 (App Router), React 19, JavaScript and JSX only, pnpm.
- Plain CSS: tokens and element defaults in `src/app/globals.css`, component styles in a CSS Module beside each component.
- Fonts load through `next/font/google` (self-hosted at build).
- Copy lives in `src/content/`, settings in `src/config/site.js`.
- The site is `noindex` until it is ready to launch.
- Run with `pnpm dev` (port 3200 in `.claude/launch.json`).

## Built so far

- **Light theme (decided 2026-11-14 with the owner):** the app itself is white, so its real footage sits naturally on a light page. Background `#FBFBF8`, ink text, ink primary buttons, violet for links and checks. Lime is a highlighter and a fill only, never text on white.
- **Header** (`src/components/header/`, redesigned again 2026-11-14): at the top of the page a wide white glass bar (light logo, two links, ink Download). After 80px of scroll it morphs, with a soft spring, into a small black "island" like a call indicator: the app icon, a moving lime voice meter with "Live", the links, and a lime Download.
- **Hero** (`src/components/hero/`, full first screen):
  - **Voice waves:** (history) were in the hero, then a divider; both replaced by the page wave below.
  - **Headline:** "Always know what to say" decodes like live transcription (`decode-text.jsx`: each letter cycles through random letters, then settles left to right, keeping its real width so nothing shifts). The second line, "in your next …", rotates through the app's own call types (sales call, interview, support call, negotiation, team meeting) every 2.4s (`rotating-word.jsx`): the old word lifts away out of a blur, the new one rises in, and the box and its lime highlighter ease to the new word's width. Screen readers get the sentence once.
  - **Buttons:** ink primary with a lime icon that spins on hover, a light sweep and a magnetic pull; a white secondary with a violet play button and a pulsing ring.
  - Drifting violet and lime glows, a faint square grid, a pointer spotlight, a trust line, and a "Scroll to watch it work" hint with an animated mouse.
- **Demo stage, inside the hero** (`hero-stage.jsx`, `#demo`, rebuilt 2026-11-14 after the owner found the full-app recording wrong for the hero): a dark, cinematic panel under the trust line showing **a video call with MeetFly's real floating panel beside it**, as it's actually used.
  - **Current layout (2026-11-14, third pass; owner asked for the same structure and motion as meetily.ai's hero demo, with our own art, content and videos):** a card with our own SVG "soundscape" (demo-scenery.jsx, redrawn on the owner's request: lavender sky with a dot grid, sound ripples spreading from behind the app, hills shaped like sound waves, violet equaliser bars on the ridges, rising motes, grain; memoised so it never re-renders), masked to fade into the page at the bottom. Serif headline (Source Serif 4), a 4-tab pill bar (Listening, Live transcript, Suggested reply, Recap) whose active tab fills as it plays, a mac-style window drawing MeetFly's interface in code (Inter, the app's own colours) laid out as rail | header row (meeting name + REC) / content / dock row, all content on one left edge (--pad), a call column exactly as tall as the window (2x2 grid of Mixkit clips filling it, speaking ring; Works with card at its foot) that folds away on the Recap step, then a caption, two buttons and an honesty note on the faded part. Everything rises in when first seen; the demo only runs while on screen. Client lines, reply and recap are word for word from the real practice-call recording (rec/app-log.json). public/video/hero/app.* and panel.* are older recordings, now unused. Everything below about older layouts is history.
  - **The call:** the client (Mixkit clip 4833, a woman at her desk) in the main tile with a speaking ring and level meter, and the meeting's own live captions typing her words as she "speaks"; you (Mixkit clip 10441) in a small self-view corner; a REC badge, the call's name and timer, and a control bar. Both clips are under the Mixkit Stock Video Free License (commercial use, no attribution; checked 2026-11-14), cut into seamless loops (`public/video/hero/client.mp4`, `you.mp4`, 0.3 MB each).
  - **MeetFly's floating panel:** `public/video/hero/panel.mp4` (54s, 840 × 1280, 1.6 MB), a **real, unedited recording** of the app's floating panel (the app's own Ctrl+Shift+O view, recorded at the desktop panel's size, 420 × 640 at 2×) in a practice sales call: the client's three questions were spoken by Windows' voice through a fake microphone, and MeetFly captioned them and wrote its replies live (each about a second after the question). It floats beside the call, turned slightly towards you (flat on hover), never over a face, with a lime glow once a reply has landed.
  - **The panel recording is the clock:** the three tabs ("We like it", "The price", "When can we start?") fill with it and jump it when clicked; the client's speaking ring and captions follow `talk` windows, and the panel glow follows `replyAt` (`stage.turns` in `src/content/home.js`, read from a text log taken every half second during the recording). Everything plays muted, only on screen; one Pause button; reduced motion shows the posters at the end of the call.
  - **Below 760px** the panel goes under the call at full width.
  - **To re-record:** run the app (`PORT=3300 node out/server/cli.js`), then `record-panel.mjs` (scratchpad): it starts a practice Sales call, switches to the floating panel, sets the window to 420 × 640, records the screencast and logs the panel's text; then read the new times and quotes from the log into `stage.turns`. The AI writes slightly different replies each run.
- **Page wave** (`src/components/page-wave/`, 2026-11-14, the owner asked for the wave line to run through the whole page like a snake): one fixed, screen-sized canvas behind all content (z-index -1). Five violet and lime strands wave around one smooth S-curve path that starts behind the hero demo (`#demo`) and winds left and right down to the foot of the page; it re-plans itself whenever the page height changes, so new sections extend it. It draws itself as you scroll (head at 78% of the screen, reaching the end at the bottom) with a glowing lime head. Only the on-screen part is drawn; paused in hidden tabs; drawn whole and still with reduced motion. Sections must stay see-through for it to show between them. The old divider was removed. Preview a long page with scratchpad rec/wave-check.mjs long.
- **Works with** (`src/components/platforms/`, `#platforms`): a large marquee of the meeting apps named in the app, text only with lime dots, pausing on hover, still with reduced motion.
- **Testing note:** the in-app browser pane often stops producing frames (its animation clock stays at 0), so animations look frozen there. Check with a real headless Chrome instead (puppeteer-core with the installed Chrome; `check-site.mjs` in the scratchpad takes desktop, scroll, phone and reduced-motion shots).

## Rules

- Build one section at a time and agree it before the next.
- Do not copy Meetily's layout, wording or artwork.
- Never invent customers, testimonials, numbers or pricing.
- Check every visible change in the browser at desktop and phone widths.

## Before · During · After section (2026-11-14)
- `src/components/journey/`, content `journey` in `src/content/home.js`, placed after "Works with". Id `#journey`.
- Centred header (eyebrow pill, h2 "One copilot for the whole call", lead), then three equal cards in one row (one column under 1080px). Each card: a tinted stage of fixed height (340px, so all three line up) with a small live demo in MeetFly's interface style, then step number + when, title, text, and three ticked points pinned to the card foot.
- Demos (each loops only while on screen; finished state with reduced motion): Before = Prepare call form filling in (call type, goal typing, attached doc, Practice mode on, Start meeting). During = live captions translated into English (Spanish, Hindi, Japanese, same question) with quick actions lighting in turn. After = call notes from the Sales template ticking in, duration / AI assists / talk-time bar, follow-up email typing.
- Every feature named is in the app's code. The numbers in the After demo (24 min, 6 assists, 42%) are sample values. Stealth mode and voice cloning are deliberately left out until the owner decides how to present them.
- Cards are white on a see-through section, so the page wave shows in the gaps.
