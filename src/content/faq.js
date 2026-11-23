// The FAQ page. Every answer is from the app's code and its privacy policy (checked 2026-11-17 to
// 2026-11-23), or from our own test call where it says so. No pricing (not decided yet), nothing on
// voice cloning or stealth mode. `topic` is one of the ids in `topics`.

export const faqPage = {
  eyebrow: { tag: "FAQ", text: "Straight answers, from the app itself" },
  title: { top: "Every question you have,", prefix: "answered by", mark: "MeetFly." },
  lead: "Everything people ask about MeetFly, answered from what the app actually does.",
  search: {
    label: "Search every answer",
    examples: ["Does a bot join my call?", "Zoom", "translate", "where are my notes kept", "practice"],
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
  { id: "calls", line: "Help while you talk.", label: "During calls" },
  { id: "after", line: "Notes, search and sharing.", label: "Notes and after" },
  { id: "privacy", line: "Where your calls go.", label: "Privacy" },
  { id: "setup", line: "Computers, mics and calendars.", label: "Setup and devices" },
];

export const faqs = [
  // Getting started
  { topic: "start", q: "What is MeetFly?", a: "A desktop copilot for your calls. It writes down both sides as you talk, suggests what to say the moment the other person stops, and turns the call into notes, a recording and a follow-up when you hang up." },
  { topic: "start", q: "Does a bot join my call?", a: "No. MeetFly listens on your own computer, through your microphone and your computer’s sound, so nobody sees an extra guest in the meeting." },
  { topic: "start", q: "Which call apps does it work with?", a: "Zoom, Google Meet, Microsoft Teams, Webex, Whereby and Slack huddles, and any other call your computer can hear. Paste a meeting link and supported calls open right inside MeetFly." },
  { topic: "start", q: "How do I get ready for a call?", a: "Click Prepare on a meeting, or start a new one. Pick the call type, set your goal, add notes for the AI and attach documents. Suggestions use all of it." },

  // During calls
  { topic: "calls", q: "How fast is a suggested reply?", a: "It starts writing the moment the other person stops talking. In our own test call, replies appeared in about a second." },
  { topic: "calls", q: "Can I change how long the answers are?", a: "Yes. Pick Short, Normal, Bullets or Script, and turn automatic answers off if you only want help when you ask." },
  { topic: "calls", q: "Can it help when they speak another language?", a: "Yes. Their captions can be translated live into 14 languages: English, Hindi, Spanish, French, German, Portuguese, Italian, Japanese, Korean, Chinese, Arabic, Russian, Tamil and Bengali." },
  { topic: "calls", q: "Can it see what’s shared on screen?", a: "Yes. Read my screen looks at what’s shared, like slides, a form or a coding problem, and helps with it in the context of the call." },
  { topic: "calls", q: "Can I ask it something mid-call?", a: "Yes. Type in the Ask box, or say “MeetFly, …”. It answers privately from the call and the context you gave it, and can make a document, diagram or slide outline." },
  { topic: "calls", q: "Can I practise before a real call?", a: "Yes. Turn on Practice mode and your microphone plays the other person, so you can rehearse your answers first." },

  // Notes and after
  { topic: "after", q: "What do I get when I hang up?", a: "Structured notes from a template for your call type, your own notes kept and cleaned up, a follow-up email draft, call stats, and the recording if you chose to keep one." },
  { topic: "after", q: "Can I search my past calls?", a: "Yes. Search every meeting by word across titles, notes and transcripts, or ask a question and get an answer drawn from all your past calls." },
  { topic: "after", q: "How do I share the notes?", a: "Copy them as Markdown, rich text or for Slack, save them as PDF, Word or Markdown, open the recap in your mail app, or send them to Zapier, Make or n8n with a webhook." },
  { topic: "after", q: "Is recording required?", a: "No. Recording is your choice, and you can keep the transcript only." },

  // Privacy
  { topic: "privacy", q: "Where are my notes and recordings kept?", a: "On your computer, in MeetFly’s data folder. While you talk, audio goes to the speech service and transcript text to the AI service, only so MeetFly can write down the call and answer." },
  { topic: "privacy", q: "Can MeetFly read my meetings?", a: "No. Your meetings are not sent to our servers, and we cannot see them." },
  { topic: "privacy", q: "Should I tell people MeetFly is on?", a: "Yes, and where the law requires it, ask for their consent. MeetFly reminds you when each meeting starts, with a notice you can paste into the chat." },
  { topic: "privacy", q: "How long are meetings kept?", a: "As long as you like: forever, or 90, 30 or 7 days. You can delete any meeting, or all of them, any time." },

  // Setup and devices
  { topic: "setup", q: "Which computers does it run on?", a: "MeetFly is a desktop app for Mac and Windows, with light, dark and system themes." },
  { topic: "setup", q: "Can I choose my microphone?", a: "Yes. Pick it in Settings → General → Audio. The setup guide tests your mic and your computer’s sound before your first call." },
  { topic: "setup", q: "Does it connect to my calendar?", a: "Yes. Paste your calendar’s private link from Google Calendar, Outlook or iCloud, and today’s and tomorrow’s meetings show up with Join and Prepare." },
  { topic: "setup", q: "Can I keep an eye on how much it uses?", a: "Yes. Settings show your usage, and you can set monthly limits on transcription minutes and AI requests." },
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
