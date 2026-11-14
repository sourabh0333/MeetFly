# MeetFly app review

Read 2026-11-10 from `github.com/anupam-pradhan/MeetFly` (private, `main` at f6790b8, version 1.0.0). The README's claims were checked against the code for stealth mode, translation languages, note templates, answer styles, meeting hosts, usage limits and exports. The app was not run (it needs API keys), so nothing here is tested behaviour.

## What MeetFly is

A desktop app (Electron; Mac `.dmg`, Windows `.exe`; also runs in Chrome or Edge from a local server) that sits beside any call and helps **while the call is happening**. README line: "Your AI copilot for every call."

It uses Cartesia for speech (Ink-2 speech-to-text, Sonic 3.6 voices) and Google Gemini for the AI. The user pastes their own Cartesia and Gemini keys in Settings.

## Features confirmed in the code

**During the call**
- Live transcript of both sides, labelled Me and Them.
- Reply suggestions the moment the other person stops talking (starts on the early end-of-turn signal).
- Quick actions: What should I say?, Follow-up questions, Recap, Fact-check, Read my screen (Gemini looks at the shared screen).
- Ask box: any question, answered from the transcript plus your context.
- Answer styles: Balanced, Short, Bullets, Script.
- Live notes: rolling summary, action items and open questions, refreshed every 30 seconds.
- Live caption translation of the other side into 14 languages (English, Hindi, Spanish, French, German, Portuguese, Italian, Japanese, Korean, Chinese, Arabic, Russian, Tamil, Bengali).
- Bookmarks on key moments.
- Voice and accent changer: speak through a library voice or your own cloned voice, sent into the meeting through a virtual microphone.
- Overlay mode: a compact always-on-top panel. Stealth mode hides it from screen share and recordings (`setContentProtection`).
- Global shortcuts that work from any app.

**Before the call**
- Prepare call: title, call type (sales, interview, support, meeting, negotiation), goal, background, attached documents, saved context profiles.
- Practice mode: the mic plays the other person, for rehearsal.
- Join a meeting inside MeetFly from a Google Meet, Zoom, Teams, Webex or Whereby link; sign in once to Google, Microsoft or Zoom.

**After the call**
- Structured notes from a template per call type, ending in a ready-to-send follow-up email.
- Full recording of both sides, with playback and download.
- Call stats: duration, turns, talk-time share, AI assists.
- History with search, Ask across all your calls, Rewrite notes as another template.
- Notes copy as Markdown.

**Voice studio**
- Browse and preview voices by accent and type; clone your voice from a 10–20 second sample; choose speed, tone, accent, language and output device.

**Settings**
- Usage meter with optional monthly limits (transcription minutes, voice characters, AI requests).
- Light and dark themes; a four-step setup guide.

## MeetFly against Meetily

| | MeetFly | Meetily |
|---|---|---|
| Core idea | Live copilot: helps you speak during the call | Private note-taker: records and summarises |
| Live reply suggestions | Yes | No |
| Read my screen, fact-check, ask box | Yes | No (chat with meetings "coming soon") |
| Voice and accent changer, voice cloning | Yes | No |
| Live translation | Yes, 14 languages | No |
| Overlay and stealth mode | Yes | No |
| Call prep and practice mode | Yes | No |
| Notes templates by call type, follow-up email | Yes | Templates in Pro |
| Ask across all calls | Yes | "Coming soon" |
| Join meetings inside the app | Yes | No |
| No bot joins the call | Yes | Yes |
| Where audio is processed | Cloud (Cartesia, Gemini) | On the device |
| Works offline | No | Yes |
| Speakers named individually | No (Me / Them) | Yes, in Pro |
| Import an audio file | No | Yes |
| Exports | Markdown copy, recording download | PDF, DOCX, Markdown |
| MCP, CLI, webhooks | No | Yes, in Pro |
| Open source | No (private repo, no licence) | Yes, MIT core |
| Accounts, pricing, payment | None in the code | Licence keys, $10 a month |

## What this means for the website

1. **MeetFly is not the same product as Meetily.** Meetily sells privacy; MeetFly's strength is real-time help and voice. The site should lead with that, not with "privacy-first".
2. **Do not claim "100% local" or "audio never leaves your device".** Audio and transcript text go to Cartesia and Gemini. What is true: notes, transcripts and recordings are stored on the user's computer, and no bot joins the call.
3. **The site has a lot to show.** Almost every feature is visual and live (suggestions appearing, translation, the overlay, the voice changer), which suits working demos far better than Meetily's icon cards.

## Open questions before the site can be written

- **How do people get it?** Today the user needs their own Cartesia and Gemini keys and builds from source. Is there a plan for MeetFly accounts and included AI, or does it stay bring-your-own-key?
- **Pricing and plans:** nothing in the code. Free, paid, trial?
- **Downloads:** no signed installers yet. Windows also needs a signed virtual audio driver; until then the accent changer relies on VB-Cable.
- **Licensing:** the repo has no licence, and the Mac microphone driver is built from BlackHole, which is GPL-3.0. Worth checking before distributing a closed-source app with it.
- **Who is it for?** Sales, support, interviews, non-native speakers? This decides the headline and the use-case pages.
- **How stealth mode, interview help and voice cloning are presented.** Hiding an assistant from the other side in interviews or exams breaks many companies' and platforms' rules, and voice cloning needs consent. The site should present these honestly (the README already asks users to be open about the voice changer). The team should decide the wording.
- **Brand:** is there a logo, colours and a domain? The app uses indigo (#4f46e5) with Inter and Instrument Serif. Meetily's site is also built on a serif-and-Inter pairing, so the website's type should differ.
