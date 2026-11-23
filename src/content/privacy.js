// The Privacy page. Every fact here is from the app's own privacy policy and code
// (MeetFly-App/MeetFly/backend/src/legal/privacy.ts, checked 2026-11-23): meetings are stored on
// your computer; audio goes straight to Cartesia (speech); text goes through MeetFly's server to
// Google Gemini (AI), which passes it on and does not store or log it; the servers keep the install,
// the account if you sign in and usage counts; error reports (on by default) carry no meeting
// content. Never "100% local", no certification badges, no claim about AI training or encryption
// at rest (not stated in the policy). Providers are named because the policy names them.

export const privacyPage = {
  eyebrow: { tag: "Privacy", text: "Where every part of your call goes" },
  title: { top: "Your calls live", prefix: "on your", mark: "computer." },
  lead: "MeetFly sends only what it needs to write down the call and answer, to the services that do that work. Here is exactly where each thing goes.",
  primary: { label: "Download MeetFly", href: "/#download" },
  secondary: { label: "See your controls", href: "/features#privacy-controls" },
  mapLabel: "Where it goes",
  from: "From your call",
  places: [
    { id: "computer", name: "Your computer", note: "MeetFly’s data folder" },
    { id: "server", name: "MeetFly’s server", note: "On Google Cloud" },
    { id: "speech", name: "Speech service", note: "Cartesia" },
    { id: "ai", name: "AI service", note: "Google Gemini" },
  ],
  legend: { keep: "Kept here", pass: "Passes through, not kept", send: "Processed here", none: "Never goes here" },
  rows: [
    {
      id: "audio",
      what: "Audio",
      sub: "Your mic and your computer’s sound",
      cells: {
        computer: ["keep", "A recording, if you choose to keep one"],
        server: ["none", "Never passes through it"],
        speech: ["send", "Turned into text, live"],
        ai: ["none", ""],
      },
    },
    {
      id: "words",
      what: "Words from the call",
      sub: "The transcript, and screenshots for Read my screen",
      cells: {
        computer: ["keep", "The transcript"],
        server: ["pass", "Passed on, not stored or logged"],
        speech: ["none", ""],
        ai: ["send", "Writes answers, notes and translations"],
      },
    },
    {
      id: "meetings",
      what: "Your meetings",
      sub: "Notes, transcripts, recordings, call profiles",
      cells: {
        computer: ["keep", "Only here. We can’t see them"],
        server: ["none", ""],
        speech: ["none", ""],
        ai: ["none", ""],
      },
    },
    {
      id: "account",
      what: "Account and usage",
      sub: "Only what runs the app",
      cells: {
        computer: ["none", ""],
        server: ["keep", "Your copy of the app, your account if you sign in, how much you used"],
        speech: ["none", ""],
        ai: ["none", ""],
      },
    },
    {
      id: "errors",
      what: "Error reports",
      sub: "On by default, one switch to turn off",
      cells: {
        computer: ["none", ""],
        server: ["keep", "The error, the app version and your system. Never your meetings"],
        speech: ["none", ""],
        ai: ["none", ""],
      },
    },
  ],
  note: "From MeetFly’s privacy policy. Everything sent travels over encrypted connections. If our server can’t be reached, the app sends the same text straight to Google so your call keeps going.",
};

// The hero's ledger: a strict grid. Columns: what leaves your call | on your computer | the edge
// of your computer | goes to | then. Every cell is { kind, title, by?, text } or null (a dash).
export const border = {
  cols: { what: "From your call", here: "On your computer", to: "Goes to", then: "Then" },
  edge: "Your computer’s edge",
  kinds: { keep: "Kept", pass: "Passes through", send: "Processed", none: "Never leaves" },
  items: [
    {
      id: "meetings",
      what: "Your meetings",
      sub: "Notes, transcripts, recordings, call profiles",
      here: { kind: "keep", title: "All of it", text: "We can’t see it, and have no copy." },
      to: { kind: "none", title: "Nothing", text: "It never crosses." },
      then: null,
    },
    {
      id: "audio",
      what: "Audio",
      sub: "Your mic and your computer’s sound",
      here: { kind: "keep", title: "A recording", text: "Only if you choose to keep one." },
      to: { kind: "send", title: "Speech service", by: "Cartesia", text: "Turned into text, live. Never through our server." },
      then: null,
    },
    {
      id: "words",
      what: "Words from the call",
      sub: "The transcript, and screenshots for Read my screen",
      here: { kind: "keep", title: "The transcript", text: "Saved with the meeting." },
      to: { kind: "pass", title: "MeetFly’s server", by: "Google Cloud", text: "Passed on. Not stored, not logged." },
      then: { kind: "send", title: "AI service", by: "Google Gemini", text: "Writes answers, notes and translations." },
    },
    {
      id: "account",
      what: "Account and usage",
      sub: "Only what runs the app",
      here: null,
      to: { kind: "keep", title: "MeetFly’s server", by: "Google Cloud", text: "Your copy of the app, your account if you sign in, how much you used." },
      then: null,
    },
    {
      id: "errors",
      what: "Error reports",
      sub: "On by default, one switch to turn off",
      here: null,
      to: { kind: "keep", title: "MeetFly’s server", by: "Google Cloud", text: "The error, the app version and your system. Never your meetings." },
      then: null,
    },
  ],
};

// The hero's map: your computer in the middle (your meetings inside the edge), and the only three
// places anything goes. `flows` say what travels where; facts from the app's privacy policy.
export const orbit = {
  computer: "Your computer",
  inside: "Your meetings stay here",
  items: ["Notes", "Transcripts", "Recordings", "Call profiles"],
  edge: "Your computer’s edge",
  places: {
    speech: { name: "Speech service", by: "Cartesia", status: "Turns audio into text" },
    server: { name: "MeetFly’s server", by: "Google Cloud", status: "Passes text on, keeps none of it" },
    ai: { name: "AI service", by: "Google Gemini", status: "Writes answers and notes" },
  },
  flows: [
    { id: "meetings", label: "Your meetings", line: "Never leave your computer" },
    { id: "audio", label: "Audio", line: "Straight to the speech service, never through our server" },
    { id: "words", label: "Words", line: "Through our server, not stored or logged, to the AI" },
    { id: "meta", label: "Account and errors", line: "Your account, usage and error reports, to our server" },
  ],
};

// "Six promises, with the receipts": each promise is backed by a sentence quoted word for word from
// the app's privacy policy (backend/src/legal/privacy.ts). `mark` is the phrase to highlight in it.
export const promises = {
  eyebrow: "Our promises",
  title: "Six promises, with the receipts",
  lead: "Each one is written into MeetFly’s privacy policy. Here is the line that backs it up.",
  seal: "In the policy",
  source: "MeetFly privacy policy",
  items: [
    {
      id: "no-bot",
      promise: "No bot joins your meetings.",
      quote: "MeetFly listens on your own computer, through your microphone and your computer’s sound.",
      mark: "on your own computer",
      where: "In short",
    },
    {
      id: "no-copy",
      promise: "We have no copy of your meetings.",
      quote: "They are not sent to our servers, and we cannot see them.",
      mark: "we cannot see them",
      where: "What stays on your computer",
    },
    {
      id: "audio",
      promise: "Your audio never touches our servers.",
      quote: "It goes straight from your computer to Cartesia and never passes through our servers.",
      mark: "never passes through our servers",
      where: "What MeetFly sends, and why",
    },
    {
      id: "words",
      promise: "Our server keeps none of your words.",
      quote: "It does not store the text, the screenshot or the answer, and does not write them to its logs.",
      mark: "does not store",
      where: "What MeetFly sends, and why",
    },
    {
      id: "password",
      promise: "We never see a password.",
      quote: "Signing in is done by Google: an emailed sign-in link through Google Identity Platform, or “Continue with Google”. We never receive a password.",
      mark: "We never receive a password.",
      where: "What our servers keep",
    },
    {
      id: "errors",
      promise: "Error reports can’t carry your meetings.",
      quote: "A report is made from the error itself, not from your meetings.",
      mark: "not from your meetings",
      where: "Error reports",
    },
  ],
};

// "Everything our server knows about you": the server's whole record, from the policy's "What our
// servers keep" (voice cloning left out: not on the site), as four groups. `never` lists what is
// not in it (it stays on your computer or never reaches MeetFly at all).
export const record = {
  eyebrow: "What we keep",
  title: "Everything our server knows about you",
  lead: "This is the whole record. Your meetings are not in it, and never were.",
  cols: { what: "What we keep", fields: "Exactly what’s in it", why: "Why, and for how long" },
  groups: [
    { id: "install", what: "Your copy of the app", fields: ["A random ID", "First and last seen", "System", "App version", "Scrambled IP address"], why: "To run the app and limit abuse.", when: "Always" },
    { id: "account", what: "Your account", fields: ["Email", "Name and picture, from Google", "Plan", "Sign-in times"], why: "Only if you sign in. Ask us and we delete it.", when: "While your account exists" },
    { id: "usage", what: "Usage", fields: ["AI requests per day", "Speech sessions per day", "Transcription minutes per month"], why: "Numbers only, for limits and plans.", when: "While your account exists" },
    { id: "logs", what: "Logs", fields: ["What happened", "How long it took", "A short app ID"], why: "Never your transcripts, questions or answers.", when: "For a limited time" },
  ],
  neverTitle: "Never on our server",
  never: ["Transcripts", "Audio recordings", "Notes and summaries", "Your questions and its answers", "Screenshots", "Typed notes and bookmarks", "Calendar links", "Passwords"],
  neverNote: "These stay on your computer, or never reach us at all.",
};

// "The people in your meetings": consent. The reminder title, buttons and notice are word for word
// from the app (renderer/features/live/CallAlerts.tsx and consent-store.ts); the statement is from
// the privacy policy. The reply in the chat is an example.
export const consent = {
  eyebrow: "Consent",
  title: "The people in your meetings",
  lead: "MeetFly writes down everyone it can hear. So it helps you tell them, every time.",
  statement: "Telling people, and asking for their consent where the law requires it, is up to you. MeetFly makes it one click.",
  facts: [
    { t: "A reminder when every meeting starts", d: "On by default." },
    { t: "A notice ready to paste", d: "Into the meeting chat, in one click." },
    { t: "Recording is your choice", d: "Keep the transcript only, if you prefer." },
    { t: "Yours to switch off", d: "Settings, under Meetings: Consent reminder." },
  ],
  demo: {
    start: "Call starts",
    reminder: "Let people know MeetFly is taking notes.",
    buttons: ["Copy notice for meeting chat", "Done", "Don’t show again"],
    copied: "Copied",
    chat: "Meeting chat",
    you: "You",
    notice: "Heads up: I'm using MeetFly to take private notes of this call. Tell me if you'd prefer I didn't.",
    them: "Client",
    reply: "Thanks for telling us, that’s fine.",
    example: "Example reply",
    replay: "Replay",
  },
};

// "Privacy questions, answered": every answer is from the app's privacy policy (section in `src`)
// and, where it applies, the setting in the app (`app`).
export const questions = {
  eyebrow: "Questions",
  title: "Privacy questions, answered",
  lead: "The things people ask before they trust an app with their calls.",
  srcLabel: "Privacy policy",
  appLabel: "In the app",
  items: [
    {
      q: "Can anyone at MeetFly read my meetings?",
      a: "No. Your transcripts, notes, recordings and chats are saved on your computer, in MeetFly’s data folder. They are not sent to our servers, and we cannot see them.",
      src: "What stays on your computer",
    },
    {
      q: "What if I lose my computer?",
      a: "Your meetings live only there. We have no copy of them, so we can’t restore them if they’re lost.",
      src: "What stays on your computer",
    },
    {
      q: "Where is my data processed?",
      a: "Our servers, Cartesia and Google may process data in countries other than your own. Everything sent to them travels over encrypted connections.",
      src: "Where your data is processed",
    },
    {
      q: "What happens if MeetFly’s server is down?",
      a: "Your call keeps going. The app sends the same text straight to Google’s Gemini API, and asks Cartesia directly, using keys built into the app.",
      src: "What MeetFly sends, and why",
    },
    {
      q: "Does signing out delete my meetings?",
      a: "No. Sign out any time and your meetings stay on your computer.",
      src: "Your choices",
      app: "Settings → Account",
    },
    {
      q: "What does a webhook send, and when?",
      a: "Only when you send a meeting to it: the title, date, tags, attendees, notes, action items and your own notes. The transcript is included only if you choose.",
      src: "Things you can choose to send elsewhere",
      app: "Meeting → Export → Send to webhook",
    },
    {
      q: "Does MeetFly email people for me?",
      a: "No. A recap opens as a draft in your own mail app. You send it; MeetFly does not.",
      src: "Things you can choose to send elsewhere",
    },
    {
      q: "How do I delete everything?",
      a: "Delete any meeting, or all of them at once. For your account record on our servers, contact us and we delete it.",
      src: "Your choices",
      app: "Settings → Privacy → Delete all meetings",
    },
  ],
};

// The close of the Privacy page: the bookend to the hero (shared styles with the other closes).
export const privacyClose = {
  eyebrow: "Private by design",
  before: "Your meetings.",
  after: "Stay with you.",
  lead: "Everything MeetFly writes down is saved on your computer, and only what it needs leaves it.",
  mac: "Download for Mac",
  windows: "Download for Windows",
  soon: "Coming soon",
  controls: { label: "See your controls", href: "/features#privacy-controls" },
  policy: { label: "MeetFly privacy policy", updated: "Last updated", read: "Read it in full", contact: "Questions about privacy?" },
  jumpLabel: "Jump back to",
  jumps: [
    { href: "#privacy-top", label: "Where it goes" },
    { href: "#promises", label: "Six promises" },
    { href: "#server-record", label: "What we keep" },
    { href: "#consent", label: "Consent" },
    { href: "#privacy-questions", label: "Questions" },
  ],
};
