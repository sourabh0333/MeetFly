# Meetily.ai review (competitor)

Reviewed 2026-11-10 in Chrome at 1366 × 633, and at 375 × 812 (phone) in the built-in browser.
Purpose: understand how they built their site so MeetFly's can be clearly better. Nothing here is to be copied: no layouts, wording or artwork.

Pages read: home, `/pricing`, `/pro`, `/downloads`, `/vs/otter-ai`, `/use-cases/healthcare`, `/mcp`, `/about`, one blog post. The footer was used to map the rest.

## What the product is (their words)

A desktop app (Windows, macOS; Linux from source) that records, transcribes and summarises meetings on the user's own computer. No bot joins the call: it captures system audio. Open-source core (MIT), made by Zackriya Solutions.

- Community: free. Local transcription (Whisper / Parakeet), summaries with a local model or your own API key, audio import, retranscription.
- Pro: $10 a user a month, billed yearly at $120 (shown against a struck $25). Speaker identification, custom summary templates, PDF / DOCX exports, auto-detect meetings, MCP server, webhooks, CLI, priority email support. 14-day trial without a card, 30-day refund. One licence per device.
- Enterprise: custom. Admin dashboard, self-hosted AI server, compliance help, SLA.
- "Coming soon" on their own table: chat with your meetings, calendar integration, Obsidian, mobile apps.

## Site map

| Group | Pages |
|---|---|
| Product | `/downloads` (+ `/mac`, `/windows`), `/free`, `/pro`, `/enterprise`, `/pricing`, `/bot-free`, `/online-meeting-recorder`, `/speaker-diarization`, `/mcp`, `/workflows`, `/releases`, `/granola-for-linux` (waitlist) |
| Keyword pages | `/ai-meeting-assistant`, `/ai-note-taker`, `/ai-transcription`, `/voice-recorder`, `/hipaa-meeting-assistant`, `/open-source-ai-note-taker` |
| Industries | `/use-cases` + healthcare, legal, financial-services, government, technology |
| Comparisons | `/vs` + otter-ai, fireflies, granola, read-ai, zoom-ai, chatgpt-record-mode, meetly-vs-meetily |
| Resources | docs (subdomain), `/guides` (GDPR, HIPAA, enterprise deployment), `/meeting-templates`, `/llm-privacy`, `/privacy/data-sovereignty`, `/blog` (about 30 own posts + about 30 Dev.to posts) |
| Company | `/about`, `/open-source`, `/privacy`, `/privacy/pro-terms` |
| Languages | English, German, Spanish, French, Portuguese, Chinese |

## Homepage, top to bottom (9,216px on desktop, 12,409px on a phone)

1. Announcement bar linking to a blog post.
2. Floating pill navbar: wordmark, live GitHub star counter, Pricing, Use Cases (menu), Meetily Pro, Blog, Docs, language, black Download button.
3. Hero: a laurel badge ("#1 Privacy first AI Meeting Assistant", five stars, "771K+ users"), a large serif headline, one supporting sentence, three buttons (green Buy Now, Download Pro, Talk to Us), then four trust labels in small capitals.
4. Interactive demo: an app window over a painted landscape, with four tabs (Recording, Transcription, People, Summary) that play by themselves or on click, beside a mock video call and "works with" icons.
5. "Loved by teams worldwide": stars, downloads, forks, a G2 rating pill, then a sliding row of quote cards.
6. "Take Back Control of Your Meeting Data": three dark cards of ticked bullet points.
7. "Why Choose Meetily?": seven icon cards in a grid.
8. A pricing call-out on the painted landscape.
9. Blog carousel.
10. FAQ accordion, 24 questions.
11. "What We Stand For": three value cards, About and Contact buttons.
12. Footer: five link columns, languages, licence note.

## Design

- Built with Next.js and Tailwind. Server-rendered, fast: the headline is the largest paint and showed in about 0.3s on a repeat visit.
- Light theme only: warm off-white page (#FAF9F5), near-black text, one green for the buy button, black pills for other actions, dark navy cards once.
- Type: a tall, condensed serif for headings (80px H1, regular weight) with Inter for text. This pairing is the site's main visual identity.
- One distinctive picture: the hand-painted meadow and sky behind the demo. Everything else is cards, ticks and line icons.
- Motion: number counters that roll, the auto-playing demo, the sliding quote row, a faint dotted background on a canvas. Reduced-motion is respected. No video anywhere on the homepage.
- Phone: clean, no sideways scroll, hamburger menu. The three stacked hero buttons push the demo more than a screen down.

## What they do well

- **One message, repeated everywhere:** private, on your device, no bot. A visitor knows the position in five seconds.
- **The demo shows the product working** in four steps without a sign-up or a video file.
- **Open-source proof is live:** the star count sits in the navbar on every page.
- **Clear pricing:** one paid plan, a struck list price, a no-card trial, a refund promise, a four-column comparison table, a pricing FAQ.
- **Very large search footprint:** a page per competitor, per industry and per keyword, guides, about 60 posts, six languages, FAQ and app structured data. This is their strongest asset and the hardest to match quickly.
- **Useful reference content:** a comparison of 21 AI providers' data policies (`/llm-privacy`) earns links and trust.
- **Developer story:** MCP server, CLI and webhooks have their own page with setup steps.

## Where it is weak (MeetFly's openings)

1. **Numbers disagree.** "771K+ users" in the hero is the download count; elsewhere it says 739,000 downloads. Stars appear as 32.6K, 32.5K and 32,367 on one page.
2. **Thin proof.** The "testimonial" cards are mostly titles of their own Reddit and Dev.to posts, repeated twice in the row, dated February 2025. "Rated 5/5 on G2" gives no review count. No customer logos, no named customer, no case study on the homepage. "#1" is self-awarded.
3. **The homepage repeats itself.** "Why Choose Meetily?" appears twice, and the same benefits (private, open source, any platform) are told in three sections in a row. A "Why Choose Meetily Pro?" block is pasted onto the foot of nearly every page.
4. **Too long, low on substance at the end.** About 60 blog cards and 24 FAQ answers sit on the homepage.
5. **Generic middle.** After the demo, every section is an icon-card grid with ticks; the seven-card grid leaves one card alone on its row.
6. **The hero asks for money first.** "Buy Now" is the primary button before the product is shown, with three buttons competing. The demo starts below the first screen on a laptop.
7. **One demo reused.** The same transcript screenshot heads the comparison and industry pages, so those pages feel like templates.
8. **Features told, not shown.** Speaker naming, templates, exports, auto-detect, MCP: each is a paragraph, not a picture of it working.
9. **Contradictions in the FAQ.** System requirements list Node.js and Python (a leftover from an older build). The Pro page says Community lacks flexible summaries while its own table says it has them. "One licence per device" sits beside "per user".
10. **No dark theme**, though the app's users are often developers.
11. **Navigation mismatch.** The Use Cases menu lists Project Management and Mental Health; the footer lists different industries.
12. **Missing features they admit:** chat with meetings, calendar, mobile, native Linux.

## How MeetFly's site can beat it (direction, to confirm against the real app)

- Show each feature working in its own small interactive piece, not as an icon card.
- Lead with one primary action (try it free) and get the product on the first screen.
- Use only real, consistent numbers and real proof; if there is none yet, say less instead of padding.
- Say each thing once. A shorter page with more substance per section.
- A visual identity of our own: different type, colour and imagery from their serif-on-cream look.
- Put MeetFly's advantages where Meetily says "coming soon" or says nothing. To be listed once the app has been reviewed.
- Plan the search pages early (comparisons, industries, guides): that is where they are far ahead.

## Not yet checked

Docs subdomain, `/enterprise`, `/workflows`, `/free`, the other comparison and industry pages, the non-English versions, and first-visit load weight (the measured visit was cached).
