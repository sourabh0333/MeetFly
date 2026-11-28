// The FAQ page. Every answer is from the app's code and its privacy policy (checked 2026-11-17 to
// 2026-11-26), or from our own test call where it says so. Nothing on voice cloning or stealth mode.
// `topic` is one of the ids in `topics`; an optional `link` shows under the answer. Plans and prices
// come from src/content/pricing.js, so they follow it.
import { hoursText as hrs, pass, planById as byId, priceText as price } from "./pricing";

export const faqPage = {
  eyebrow: { tag: "FAQ", text: "Straight answers, from the app itself" },
  title: { top: "Every question you have,", prefix: "answered by", mark: "MeetFly." },
  lead: "Everything people ask about MeetFly, the AI meeting assistant: bots, call apps, pricing, privacy and setup, answered from what the app actually does.",
  search: {
    label: "Search every answer",
    examples: ["Does a bot join my call?", "Zoom", "free trial", "translate", "where are my notes kept", "practice"],
    clear: "Clear",
    results: "answers",
    result: "answer",
    none: "Nothing matches yet. Try a shorter word, like “notes” or “Zoom”.",
    all: "All",
    answers: "MeetFly answers",
    also: "Also asked",
    matches: "Matching questions",
    more: "More on",
    next: "Next question",
    browse: "Browse every answer",
  },
};

export const browse = {
  eyebrow: "Browse",
  title: "Every answer, by topic",
  lead: "All the questions in one place. Open any of them.",
  questions: "questions",
};

export const topics = [
  { id: "start", line: "What MeetFly is and how to begin.", label: "Getting started" },
  { id: "plans", line: "What it costs, the trial and billing.", label: "Plans and pricing" },
  { id: "calls", line: "Help while you talk.", label: "During calls" },
  { id: "after", line: "Notes, search and sharing.", label: "Notes and after" },
  { id: "privacy", line: "Where your calls go.", label: "Privacy" },
  { id: "setup", line: "Computers, mics and calendars.", label: "Setup and devices" },
];

export const faqs = [
  // Getting started
  { topic: "start", q: "What is MeetFly?", a: "A desktop copilot for your calls. It writes down both sides as you talk, suggests what to say the moment the other person stops, and turns the call into notes, a recording and a follow-up when you hang up." },
  { topic: "start", q: "Does a bot join my call?", a: "No. MeetFly listens on your own computer, through your microphone and your computer’s sound, so nobody sees an extra guest in the meeting." },
  { topic: "start", q: "Which call apps does it work with?", a: "Zoom, Google Meet, Microsoft Teams, Webex, Whereby and Slack huddles, and any other call your computer can hear. Paste a Zoom, Teams, Webex, Whereby or Slack huddle link and it opens right inside MeetFly; Google Meet opens in your browser, with MeetFly floating over it." },
  { topic: "start", q: "How do I get ready for a call?", a: "Click Prepare on a meeting, or start a new one. Pick the call type, set your goal, add notes for the AI and attach documents. Suggestions use all of it." },
  { topic: "start", q: "Do I need an account?", a: "Yes. Sign in with a link sent to your email, or with Continue with Google. We never receive a password. Signing up also starts your 7 days of Pro + Voice." },

  // Plans and pricing (2026-11-26; facts from src/content/pricing.js and its pricing FAQ)
  { topic: "plans", q: "How much does it cost?", a: `There’s a Free plan, and paid plans start at ${price("pro")} a month. Pro is ${price("pro")} a month, Pro + Voice ${price("pro_voice")}, and Team ${price("team")} per person. The Interview Pass is ${price("interview_pass")} for 7 days.`, link: { label: "See all plans", href: "/pricing" } },
  { topic: "plans", q: "Is anything locked on the Free plan?", a: `No. Every feature is on every plan, Free included. Plans differ only in hours: Free has ${hrs(byId.free.minutes)} of listening and ${hrs(byId.free.voice)} of accent voice a month.` },
  { topic: "plans", q: "How does the free trial work?", a: "Sign up and you get 7 days of Pro + Voice, no card needed. When it ends you move to the Free plan. Nothing is charged unless you choose a plan." },
  { topic: "plans", q: "What is the Interview Pass?", a: `One payment of ${price("interview_pass")} for 7 days of Pro + Voice: ${hrs(pass.minutes)} of listening and ${hrs(pass.voice)} of accent voice, for a big week of interview practice and prep. It ends by itself and nothing renews, so there’s nothing to cancel.` },
  { topic: "plans", q: "Can I change or cancel any time?", a: "Yes. In MeetFly, Settings → Account → Change plan → Change or cancel opens Stripe’s page, where you can move between plans or cancel. When a plan ends you’re back on Free, and your notes stay on your computer." },
  { topic: "plans", q: "What counts towards my hours?", a: "The time MeetFly transcribes your calls, to the second. The accent voice has its own allowance. A fresh allowance starts on the 1st of every month and unused hours don’t roll over. If you run out, new transcription pauses until the 1st, or you can upgrade; your notes and past meetings all stay.", link: { label: "Pricing questions", href: "/pricing#pricing-faq" } },

  // During calls
  { topic: "calls", q: "How fast is a suggested reply?", a: "It starts writing the moment the other person stops talking. In our own test call, replies appeared in about a second." },
  { topic: "calls", q: "Can I change how long the answers are?", a: "Yes. Pick Short, Normal, Bullets or Script, and turn automatic answers off if you only want help when you ask." },
  { topic: "calls", q: "Can it help when they speak another language?", a: "Yes. Their captions can be translated live into 14 languages: English, Hindi, Spanish, French, German, Portuguese, Italian, Japanese, Korean, Chinese, Arabic, Russian, Tamil and Bengali." },
  { topic: "calls", q: "Can people hear me in a different accent?", a: "Yes, with accent voice. After each sentence, the people on your call hear it spoken by a native voice in the accent you pick, about 1 to 1.5 seconds later. There are 17 English accents, a female or male voice and six tones. Turn it on with V, or the Accent button on the call bar.", link: { label: "See accent voice", href: "/features#accent-voice" } },
  { topic: "calls", q: "Can it see what’s shared on screen?", a: "Yes. Read my screen looks at what’s shared, like slides, a form or a coding problem, and helps with it in the context of the call." },
  { topic: "calls", q: "Can I ask it something mid-call?", a: "Yes. Type in the Ask box, or say “MeetFly, …”. It answers privately from the call and the context you gave it." },
  { topic: "calls", q: "Can it make a doc, diagram or slides during the call?", a: "Yes. Ask for one, out loud with “MeetFly, …” or by typing, and it’s made from the call so far: a document, a flowchart or a slide outline. It’s saved with the meeting, ready to copy or export.", link: { label: "See Make it mid-call", href: "/#make" } },
  { topic: "calls", q: "Can I practise before a real call?", a: "Yes. Turn on Practice mode and your microphone plays the other person, so you can rehearse your answers first." },

  // Notes and after
  { topic: "after", q: "What do I get when I hang up?", a: "Structured notes from a template for your call type, your own notes kept and cleaned up, a follow-up email draft, call stats, and the recording if you chose to keep one." },
  { topic: "after", q: "Can I search my past calls?", a: "Yes. Search every meeting by word across titles, notes and transcripts, or ask a question and get an answer drawn from all your past calls." },
  { topic: "after", q: "How do I share the notes?", a: "Copy them as Markdown, rich text or for Slack, save them as PDF, Word or Markdown, open the recap in your mail app, or send them to Zapier, Make or n8n with a webhook." },
  { topic: "after", q: "Is recording required?", a: "No. Recording is your choice, and you can keep the transcript only." },

  // Privacy
  { topic: "privacy", q: "Where are my notes and recordings kept?", a: "On your computer, in MeetFly’s data folder. While you talk, audio goes to the speech service and transcript text to the AI service, only so MeetFly can write down the call and answer." },
  { topic: "privacy", q: "Can MeetFly read my meetings?", a: "No. Your meetings are not sent to our servers, and we cannot see them." },
  { topic: "privacy", q: "Who else handles my data?", a: "Four services, each only for its part: Cartesia turns audio into text and speaks your accent voice; Google Gemini writes answers and notes; MeetFly’s server on Google Cloud passes text on and keeps a small record; Google Identity Platform signs you in.", link: { label: "Who gets what", href: "/privacy#processors" } },
  { topic: "privacy", q: "Should I tell people MeetFly is on?", a: "Yes, and where the law requires it, ask for their consent. MeetFly reminds you when each meeting starts, with a notice you can paste into the chat." },
  { topic: "privacy", q: "How long are meetings kept?", a: "As long as you like: forever, or 90, 30 or 7 days. You can delete any meeting, or all of them, any time." },
  { topic: "privacy", q: "How do I get a copy of my data, or delete it?", a: "Your meetings are on your computer: delete any of them, or all of them, in Settings → Privacy. For your account record on our server, ask us for a copy, a correction or to delete it.", link: { label: "Your rights", href: "/privacy#your-rights" } },

  // Setup and devices
  { topic: "setup", q: "Which computers does it run on?", a: "MeetFly is a desktop app for Mac and Windows, with light, dark and system themes." },
  { topic: "setup", q: "Can I choose my microphone?", a: "Yes. Pick it in Settings → General → Audio. The setup guide tests your mic and your computer’s sound before your first call." },
  { topic: "setup", q: "How do I set up accent voice?", a: "Once. On Mac, MeetFly Microphone installs with your password, and you pick it as the microphone in Meet, Zoom or Teams. On Windows it works straight away in meetings that open inside MeetFly; for Google Meet and the Zoom or Teams desktop apps, MeetFly adds a virtual microphone (Windows asks for permission and a restart)." },
  { topic: "setup", q: "Does it connect to my calendar?", a: "Yes. Paste your calendar’s private link from Google Calendar, Outlook or iCloud, and today’s and tomorrow’s meetings show up with Join and Prepare." },
  { topic: "setup", q: "Can I keep an eye on how much it uses?", a: "Yes. Settings → Usage shows this month’s transcription minutes, accent voice and AI requests, and you can set your own monthly limit on each." },
];

// The close of the FAQ page: the bookend to the hero (shared styles with the other closes).
export const faqClose = {
  eyebrow: "That’s the FAQ",
  before: "Still curious?",
  after: "See it on a call.",
  lead: "The quickest answer is a real call. Download MeetFly and try it on your next one.",
  mac: "Download for Mac",
  windows: "Download for Windows",
  soon: "Coming soon",
  watch: { label: "Watch it work", href: "/#demo" },
  contact: "Didn’t find it? Ask us directly:",
  jumpLabel: "Jump back to a topic",
};
