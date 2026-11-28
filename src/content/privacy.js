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
  lead: "An AI meeting assistant with no bot in your calls and your meetings saved on your computer. MeetFly sends only what it needs to the services that do the work. Here is exactly where each thing goes.",
  primary: { label: "Download MeetFly", href: "/download" },
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
      id: "accent",
      what: "Your accent voice",
      sub: "Only when you turn it on",
      cells: {
        computer: ["none", ""],
        server: ["none", ""],
        speech: ["send", "Your words as text, back as speech"],
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
      id: "accent",
      what: "Your accent voice",
      sub: "Only when you turn it on",
      here: null,
      to: { kind: "send", title: "Speech service", by: "Cartesia", text: "Your words go as text and come back as speech." },
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
    speech: { name: "Speech service", by: "Cartesia", status: "Speech to text, and accent voice" },
    server: { name: "MeetFly’s server", by: "Google Cloud", status: "Passes text on, keeps none of it" },
    ai: { name: "AI service", by: "Google Gemini", status: "Writes answers and notes" },
  },
  flows: [
    { id: "meetings", label: "Your meetings", line: "Never leave your computer" },
    { id: "audio", label: "Audio", line: "Straight to the speech service, never through our server. With accent voice, your words go as text and come back as speech" },
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

// "What our server knows about you": the server's record (cloned voices left out, as everywhere on the site), from the policy's "What our
// servers keep" (voice cloning left out: not on the site), as four groups. `never` lists what is
// not in it (it stays on your computer or never reaches MeetFly at all).
export const record = {
  eyebrow: "What we keep",
  title: "What our server knows about you",
  lead: "Here is what it keeps, line by line from our privacy policy. Your meetings are not in it, and never were.",
  cols: { what: "What we keep", fields: "Exactly what’s in it", why: "Why, and for how long" },
  groups: [
    { id: "install", what: "Your copy of the app", fields: ["A random ID", "First and last seen", "System", "App version", "Scrambled IP address"], why: "To run the app and limit abuse.", when: "Always" },
    { id: "account", what: "Your account", fields: ["Email", "Name and picture, from Google", "Plan", "Sign-in times"], why: "Only if you sign in. Ask us and we delete it.", when: "While your account exists" },
    { id: "usage", what: "Usage", fields: ["AI requests per day", "Speech sessions per day", "Transcription minutes per month", "Accent voice minutes per month"], why: "Numbers only, for limits and plans.", when: "While your account exists" },
    { id: "signin", what: "Sign-in requests", fields: ["Your email", "The sign-in link request"], why: "Your email is removed from the request once you finish signing in. A request you never finish stays until we delete it.", when: "Until you sign in" },
    { id: "waitlist", what: "The waitlist", fields: ["Your email", "The plan you asked about"], why: "Only if you tap “Notify me” for a plan.", when: "Only if you ask" },
    { id: "logs", what: "Logs", fields: ["What happened", "How long it took", "A short app ID", "Each request’s time, address and IP, recorded by our host"], why: "Never your transcripts, questions or answers.", when: "For a limited time" },
  ],
  neverTitle: "Never on our server",
  never: ["Transcripts", "Audio recordings", "Notes and summaries", "Your questions and its answers", "Documents it made for you", "Screenshots", "Typed notes and bookmarks", "Calendar links", "Invitees’ names and emails", "Passwords"],
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
    { href: "#processors", label: "Who handles it" },
    { href: "#consent", label: "Consent" },
    { href: "#your-rights", label: "Your rights" },
    { href: "#privacy-questions", label: "Questions" },
  ],
};

// "Who handles your data" (2026-11-26, after the server record): the outside services the policy
// names (backend/src/legal/privacy.ts, "What MeetFly sends to other services" and "What our
// servers keep"), as a who-gets-what grid. Values: get = processes it to do the work, pass =
// passes it on and keeps none, keep = keeps it, no = never gets it. Cloned voices left out, as
// everywhere on the site. Payments (Stripe) wait until the policy names them.
export const processors = {
  eyebrow: "Who handles your data",
  title: "Four services, and exactly what each one gets",
  lead: "MeetFly can’t transcribe or answer on its own. These are the services it uses, straight from our privacy policy.",
  cols: [
    { id: "audio", label: "Audio", note: "Your mic and your computer’s sound" },
    { id: "words", label: "Your words", note: "Transcript parts, questions, typed notes, background" },
    { id: "screen", label: "A screenshot", note: "Only when you ask about your screen" },
    { id: "meetings", label: "Past meetings", note: "Only when you ask across them" },
    { id: "email", label: "Your email", note: "Only if you sign in" },
    { id: "usage", label: "Usage counts", note: "Numbers only" },
  ],
  rows: [
    {
      id: "cartesia",
      name: "Cartesia",
      role: "Speech",
      does: "Turns audio into text, and speaks your accent voice.",
      gets: {
        audio: ["get", "Streamed straight from your computer, never through our server."],
        words: ["get", "Only with accent voice: the words you say, to speak them."],
        screen: ["no"],
        meetings: ["no"],
        email: ["no"],
        usage: ["no"],
      },
    },
    {
      id: "gemini",
      name: "Google Gemini",
      by: "on Google Cloud’s Vertex AI",
      role: "AI",
      does: "Writes answers, notes, translations and documents.",
      gets: {
        audio: ["no"],
        words: ["get", "Parts of the transcript, your questions, typed notes, bookmarks and the background you gave."],
        screen: ["get", "One screenshot, sent with that question."],
        meetings: ["get", "Parts of past meetings, when you ask a question across them."],
        email: ["no"],
        usage: ["no"],
      },
    },
    {
      id: "server",
      name: "MeetFly’s server",
      by: "on Google Cloud",
      role: "Ours",
      does: "Passes text to the AI and keeps a small record.",
      gets: {
        audio: ["no", "Audio never passes through it."],
        words: ["pass", "Passed on to the AI. Not stored, not written to its logs."],
        screen: ["pass", "Passed on with your question. Not stored."],
        meetings: ["pass", "Passed on with your question. Not stored."],
        email: ["keep", "With your account, if you sign in."],
        usage: ["keep", "How much you used, as numbers."],
      },
    },
    {
      id: "identity",
      name: "Google Identity Platform",
      role: "Sign-in",
      does: "Emails your sign-in link, or signs you in with Google. We never receive a password.",
      gets: {
        audio: ["no"],
        words: ["no"],
        screen: ["no"],
        meetings: ["no"],
        email: ["get", "To send your sign-in link, or sign you in with Google."],
        usage: ["no"],
      },
    },
  ],
  legend: { get: "Gets it, to do the work", pass: "Passes it on, keeps none", keep: "Keeps it", no: "Never gets it" },
  nobody: "Gets none of it",
  notes: [
    "Your saved meetings live only on your computer. No service holds a copy.",
    "If our server can’t be reached, the app sends the same text straight to Google’s Gemini API, and asks Cartesia directly, so your call keeps going.",
    "Cartesia and Google handle what they receive under their own terms and privacy policies. Everything travels over encrypted connections.",
  ],
};

// "Your rights" (2026-11-26, after Consent): the policy's "Your choices", "How long things are
// kept", "Children" and "Changes to this policy", as one sentence whose verbs open how to do each.
// Settings paths are the app's own labels. The contact address shows only once
// siteConfig.legal.contactEmail is set.
export const rights = {
  eyebrow: "Your rights",
  title: "Yours to delete, keep or take back",
  lead: "Most of it you can do yourself, right now, in the app. For the rest, ask us.",
  sentence: [
    "You can ",
    { id: "delete", verb: "delete" },
    " any meeting or all of them, ",
    { id: "keep", verb: "choose" },
    " how long meetings stay, keep ",
    { id: "transcripts", verb: "transcripts only" },
    ", ",
    { id: "errors", verb: "switch off" },
    " error reports and ",
    { id: "signout", verb: "sign out" },
    " without losing a thing. Or ",
    { id: "ask", verb: "ask us" },
    " for a copy of your account record, to correct it, or to delete it.",
  ],
  whereLabel: "Where",
  whoLabel: "Who",
  whenLabel: "When",
  items: {
    delete: { where: ["Settings", "Privacy", "Delete all meetings"], text: "Every meeting, its notes and its recording, gone from this computer. Or delete a single meeting on its own.", who: "You, in the app", when: "Right away" },
    keep: { where: ["Settings", "Privacy", "Keep meetings for"], text: "7, 30 or 90 days, or forever. Older meetings are cleared once a day.", who: "You, in the app", when: "Once a day" },
    transcripts: { where: ["Settings", "Privacy", "Keep audio recordings"], text: "Switch it off and recordings are no longer saved, and the ones you have are deleted.", who: "You, in the app", when: "Right away" },
    errors: { where: ["Settings", "Privacy", "Send error reports"], text: "When it’s off, nothing is sent.", who: "You, in the app", when: "Right away" },
    signout: { where: ["Settings", "Account", "Sign out"], text: "Your meetings stay on your computer.", who: "You, in the app", when: "Right away" },
    ask: { where: ["Write to us"], text: "Ask for a copy of your account record, or to correct or delete it. Depending on where you live, the law may give you more rights over your personal data. Contact us and we will help.", who: "Us, on request", when: "When you ask" },
  },
  contact: "Write to",
  footnotes: [
    { title: "Made for adults", text: "MeetFly isn’t meant for children, and we don’t knowingly collect information from anyone under 16. If a child has given us information, contact us and we will delete it." },
    { title: "When the policy changes", text: "We update the policy and its date. If a change is important, we also say so in the app." },
  ],
};
