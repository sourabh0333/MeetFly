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

## Before · During · After section (third design, 2026-11-16: horizontal scroll story)
- `src/components/journey/`, content `journey` in `src/content/home.js`, after the numbers band. Id `#journey`. Uses the shared SectionHead.
- Wide screens (960px+, motion allowed): the track is `n × 110vh` tall; its sticky inner part pins and the chapter strip slides **sideways** (`translateX` from the scroll progress `--p`), with soft faded edges. Each chapter: a giant outlined word (BEFORE / DURING / AFTER) drifting behind at its own speed (parallax), the step label, title, a sentence whose words light up as the chapter arrives, three points that slide in, and the live app demo in its colour glow with floating pills (demos only run on the active chapter). A **call timeline** along the foot (−10 min · 0:00–24:00 · +1 min) with a gradient fill and a lime playhead tracks the scroll; clicking a zone scrolls to it.
- Narrow screens / reduced motion: no pin; the chapters stack.

## Note-taker vs copilot section (2026-11-16, third design)
- `src/components/compare/`, content `compare` in `src/content/home.js`, after "Before · During · After". Id `#compare`.
- **No competitor is named anywhere on the site** (the owner's decision). MeetFly is set against what "a note-taker" does in general.
- The owner wants each section to **match the family** (1240px width, centred pill eyebrow + h2 + lead, Outfit / Inter, violet and lime, glass pills, soft glows, the page wave showing through) **but have its own layout pattern**: don't reuse another section's layout. (Earlier tries: a table with a dark column, a drag slider, and a copy of the Journey layout were all rejected.)
- Pattern here: a **switchable constellation**. A glass switch "Note-taker | MeetFly" (ink thumb on MeetFly, grey on Note-taker) with a counter "8 / 3 of these 8". Below, the call ("Pilot call") in the middle in a breathing glow, and eight capability tiles, four a side in gentle arcs, each wired to the call with a curved dashed line (SVG, measured from the layout). As MeetFly every tile lights, the wires flow violet and the call shows a suggested reply; as a note-taker the five MeetFly-only tiles dim and go grey (rippling one after another), their wires go faint, the glow fades and the call shows "Summary after the call". Tiles carry a tag: "MeetFly" (ink / lime) or "Both" (grey).
- It flips by itself every 3.8s while on screen until someone uses the switch; with reduced motion it rests on MeetFly. Wires only on screens wider than 1080px; below that the call sits on top and the tiles fall into two columns (one on phones).

## Call types section, "Tuned to the call you're on" (2026-11-16)
- `src/components/calls/`, content `calls` in `src/content/home.js`, after the comparison. Id `#calls`.
- Pattern (redesigned 2026-11-16, no pinning, no boxes): a **full-width radio band**. The five call types as big words along a tuning scale of 81 ticks; a glowing needle that can be dragged (mouse, touch) or moved with arrow keys and springs to the nearest station; ticks near the needle rise and turn violet. Auto-tunes every 4.6s while on screen until touched. Under it a 5fr / 7fr spread: "They say" serif quote (blur-in) | "MeetFly suggests" reply decoding in (hero DecodeText) with Goal / Notes under lime rules. On phones the station labels alternate up and down.
- Auto-tunes every 4.6s while on screen until a station is clicked; still with reduced motion. Inline style numbers are rounded (toFixed) to avoid hydration mismatches.
- The lines and replies are written examples. Interviews are shown as **practice** (Practice mode) until the owner decides how live interview help is presented.

## Privacy section, "Where your call goes" (2026-11-16)
- `src/components/privacy/`, content `privacy` in `src/content/home.js`, after the call types. Id `#privacy`.
- Pattern: an **orbit diagram**. A dark "Your computer" disc with the MeetFly icon; on a solid inner orbit Notes, Transcripts, Recordings and Call profiles circle slowly (counter-rotated to stay upright); on a dashed outer orbit two dark stations, "Speech to text" and "AI replies", with violet dots travelling out to them along beams. Text either side: "Stays on your computer" (left, right-aligned) and "Goes out to be processed" (right). Under it, three facts: no bot joins, monthly usage limits, delete any call (all in the app's code).
- Honest by design: says audio and transcript text are sent to the speech and AI services; never "100% local". The providers (Cartesia, Gemini) are not named on the page; the owner may want to name them on a privacy page later.
- Below 1080px the orbits go on top and the two texts sit side by side (stacked on phones, diagram 340px).

## FAQ, "Ask us anything" (2026-11-16)
- `src/components/faq/`, content `faq` in `src/content/home.js`, after Privacy. Id `#faq`.
- Pattern (final, 2026-11-16, no pinning, no boxes): a **large editorial accordion** across the full width. Each question is a big row (number, Outfit question, round + button); a lime line sweeps across the row on hover and the question nudges right; opening expands the row smoothly (grid-rows 0fr→1fr), turns the + into a dark × with lime strokes, and decodes the answer in (hero DecodeText) with the MeetFly icon, indented under the question. One open at a time; the first starts open. All answers are in the HTML.
- Eight answers, all from the app's code or our test call: no bot, call apps and in-app links, reply speed ("about a second in our own test call"), 14-language translation, where data is kept (honest about the speech and AI services), Practice mode, usage limits, Mac and Windows. No pricing, nothing on stealth.

## Download band and footer (2026-11-16)
- `src/components/download/` (id `#download`, the target of every Download button) and `src/components/footer/` (in `src/app/layout.jsx`, so on every page). Content `download` and `footer` in `src/content/home.js`.
- Download (current, 2026-11-16; a dark wave-edged ending was rejected): on the light page, **giant MeetFly headphones** (SVG) — the violet-to-lime headband draws itself when seen, the ink ear cups with lime rims slide in, violet and lime sound rings pulse out of both cups — with the eyebrow and headline ("Walk into your next call with MeetFly", MeetFly highlighted lime) inside the arch; under it the lead, magnetic Mac / Windows buttons (ink primary, white secondary) and three checks. On phones the headline sits under the headphones. **While `siteConfig.downloads.mac / windows` are null the buttons read "Coming soon" (aria-disabled)**. Footer: light again (on-light logo, violet group titles, lime underline on hover, Back to top, giant faded wordmark where the page wave ends).
- Footer: logo and tagline, two link groups (only this page's sections), copyright line, and a giant faded MeetFly wordmark along the bottom where the page wave ends. A wash keeps the wave faint under the links.
- The homepage now runs: Hero (demo) · Works with · Before/During/After · Note-taker vs copilot · Call types dial · Privacy orbits · FAQ · Download · Footer.

## Six more sections (2026-11-16, owner asked for a bigger page from real features)
- Research: ten similar products' homepages (11–20 sections each). Skipped what we can't back up: customer logos, testimonials, ratings, user counts, compliance badges, pricing.
- Page order now: Hero · Works with · **Numbers** · Before/During/After · **Answers** · **Panel** · **Notes** · Note-taker vs copilot · Call types · **Library** · **Start** · Privacy · FAQ · Download · Footer.
- Shared pieces: `components/section-head/` (pill eyebrow + h2 + lead; rises in when its parent section has `data-in`) and `components/use-seen.js` (`useSeen`, `useOnScreen`).
- `numbers/`: redesigned 2026-11-16 as a glass **signal console**: one strip with a violet-to-lime gradient edge and a glow; five cells (14 languages, ~1s reply in our test, 5 call types, 8 shortcuts, 0 bots), each with a number that counts up and a small live visual borrowed from other sections (flipping language codes, a voice then a bar filling to a reply dot, a mini tuning dial, keycaps pressing, a crossed-out bot); a dashed sound wave flows along the foot; cells lift on hover. Two columns on narrow screens, with the last fact on one line.
- `answers/` (#answers): current design (2026-11-16, after the owner asked for trending effects): **scroll-driven**. On wide screens the top part pins (track n × 75vh) and a 3D wheel picker of the four styles (rotateX drum, masked top and bottom) turns continuously with the scroll (`--pos`), with a lime highlighter under the active word and its note below; the reply opposite **decodes into place** (reuses the hero's DecodeText) in a shape that fits the style, with four progress segments under it. A violet spotlight follows the cursor. After the pin: "Or just ask" typing onto an underline | the answer in italic serif, then a **marquee** of the quick actions as huge outlined words, one filling in at a time (pauses on hover). Narrow screens / reduced motion: no pin, styles are tappable and cycle on a timer.
- `panel/` (#panel): redesigned 2026-11-16, **no pinning** (the owner: two pinned sections in a row is enough). A full-width meeting window that tips back and flattens as it scrolls into view (CSS animation-timeline: view()); mouse depth parallax (the call grid shifts a little, MeetFly's panel more); the panel is draggable (mouse, touch, arrow keys) and its opacity is set by a working glass pill inside the window. Then the four facts as an open row under thin rules. Then "Everything is one key away": a big readout (combo → action, decoding in) above a 3D keyboard deck (thick keycaps on a tilted grid plane that lays down as it scrolls in); it plays through by itself and **real key presses** (B, M, ⌘K…) light the matching key (nothing is blocked).
- `notes/` (#notes): redesigned 2026-11-16, no pinning, no boxes. A full-width live strip between rules (REC "Live notes", a 30s refresh ring, the latest live note typing, a lime bookmark chip); then a **rewrite sheet**: rows pairing your rough note (serif italic) with what it becomes in the full notes (tag + bold line). Each row converts as it scrolls into view (IntersectionObserver): a lime scan sweeps across, the rough note is struck through in violet, the arrow lights, the full note slides in from blur. The last two rows are "Added from the transcript" (open question, follow-up email). Then four numbered points under rules.
- `library/` (#library): redesigned 2026-11-16, no pinning, no boxes. A giant search line ("pilot pricing" types itself in huge type on a thick underline, ⌘K keycap); results as a full-width index (date · title + tag · excerpt · arrow) whose matches get lime highlighter strokes that sweep in; hovering a row (mouse only) floats a notes preview after the cursor (each result has a `preview` in content). Then "Ask across all meetings": serif question | answer decoding in. Then three open columns under rules: Tags and folders, Share and export, ⌘K command bar.
- `start/` (#start): redesigned 2026-11-16, no pinning, no boxes. An open day timeline across the page (big "Today", calendar sources inline; meetings as bars that grow along one line with names above; the next meeting bigger with a gradient bar and pulsing Join / Prepare; a red Now line drifting toward it; an hour ruler at the foot; swipes sideways on phones). Then three steps as giant outlined numbers that fill with violet, joined by a curve that draws itself with scroll (CSS animation-timeline: view(), not pinned).
- Every section's background wash must stay inside a section with `overflow-x: clip`, or phones scroll sideways.
- Footer links now include the new sections.

## Page order (re-arranged 2026-11-16)
Hero · Works with · Numbers · Note-taker vs copilot · Before/During/After (pinned) · Call types · Answers your way (pinned) · Floating panel · Live translation · Notes · Library · Built for · Privacy · Getting started · FAQ · Download · Footer.
Why: the comparison (the main reason to pick MeetFly) comes early; the rest follows before → during → after; the non-pinned call types sit between the two pinned sections so they're never back to back; Getting started sits right before the FAQ and download. Footer links follow the same order.

## Live translation section (2026-11-16)
- `src/components/languages/`, content `languages` in `src/content/home.js`, after the Floating panel (a "during" feature). Id `#languages`. No pinning, no boxes.
- One shared grid between top and bottom rules (5fr / 7fr, three rows so both columns align: labels · the two lines sitting on the same foot line · voice bars | language name + "03 / 14"): "They say · EN" (serif quote) | "You read · XX" with "Translating live" at the far right, with the line in huge type in the chosen language (words blur in one by one; whole words, not letters, so Arabic / Hindi / Tamil / Bengali stay joined; Arabic right-to-left). Under it the app's 14 languages as a two-row strip (code + name), a gradient bar under the chosen one; auto-cycles every 2.8s until clicked.
- Accurate to the app: the other side's captions are translated **into your language**. The sample translations were written for the site; have native speakers check them before launch.


## Join from MeetFly (2026-11-16, replaces the old Works-with strip)
- `src/components/join/`, content `join` in `src/content/home.js`, right after the hero. Keeps the id `#platforms` so the header's "Works with" link still lands here. The old `components/platforms/` was removed.
- "Paste a link. MeetFly joins the call." A full-width link conveyor between rules: example meeting links (pills, mono) flow in from the left, through a pulsing MeetFly node, and out on the right as the joined app's name (big type, green dot). Nothing else under it (the owner asked for less content): the short lead says "Meet, Zoom, Teams, Webex and Whereby open right inside MeetFly. Any other call works too."

## Built for (2026-11-16)
- `src/components/roles/`, content `roles`, after the Library. Id `#roles`. Six roles (Sales, Support, Founders, Hiring, Job seekers, Multilingual teams) as tall columns across the full width split by thin rules; hovering (mouse) or clicking widens a column (flex-grow) and shows a short line and three real features that role uses, with a lime glow at its foot; on phones they become compact rows that open the same way. Roles only, never customers; interviews framed as practice.
