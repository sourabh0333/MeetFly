// The Features page. Every feature and label here was checked against the app's code (its screens,
// not only the README) on 2026-11-17, e.g. answer lengths and call types use the app's own words.
// Voice changer, voice cloning and stealth mode are deliberately left out for now.

export const featuresPage = {
  eyebrow: { tag: "features", text: "One app for the whole call" },
  title: { top: "Everything MeetFly does,", prefix: "from hello to", mark: "follow-up." },
  lead: "A prep desk before you start, a live copilot while you talk, and notes that write themselves when you hang up.",
  primary: { label: "Download MeetFly", href: "/#download" },
  secondary: { label: "Watch it work", href: "/#demo" },
  stageLabel: "A call from start to finish. Each feature sits where it helps; hover or tap one to read what it does.",
  railLabel: "Everywhere",
  hint: "Hover any feature",
};

// Each group: an id (for links), a tone, and its features. Each feature has an id so menus can
// link straight to it (/features#live-replies).
export const featureGroups = [
  {
    id: "during",
    n: "02",
    title: "During the call",
    line: "Help on every turn, the moment you need it.",
    tone: "#8f74ff",
    items: [
      { id: "live-transcript", icon: "lines", name: "Live transcript", text: "Both sides of the call written down as you talk, labelled You and Them." },
      { id: "live-replies", icon: "spark", name: "Instant replies", text: "A suggested reply the moment the other person stops talking, about a second in our own test call. Copy it, or turn automatic answers off." },
      { id: "answer-styles", icon: "styles", name: "Answer length", text: "Get replies the way you need them.", chips: ["Short", "Normal", "Bullets", "Script"] },
      { id: "quick-actions", icon: "bolt", name: "Quick actions", text: "One tap for the help you need right now.", chips: ["What should I say?", "Follow-ups", "Recap", "Fact-check"] },
      { id: "read-my-screen", icon: "screen", name: "Read my screen", text: "MeetFly looks at what’s shared: questions, slides, even coding problems." },
      { id: "ask-box", icon: "ask", name: "Ask box", text: "Type any question. Answers use the call so far and the context you gave it." },
      { id: "voice-commands", icon: "mic", name: "“MeetFly, …” commands", text: "Say or type “MeetFly, …” to ask something privately, make something, or pause and resume listening." },
      { id: "created", icon: "doc", name: "Make it mid-call", text: "Ask for a document, a diagram or a slide outline and it is made from the call, saved with the meeting, ready to copy or export.", chips: ["Doc", "Diagram", "Slides"] },
      { id: "live-translation", icon: "globe", name: "Live translation", text: "The other side’s captions, translated live into any of 14 languages." },
      { id: "live-notes", icon: "notes", name: "Live notes", text: "A rolling summary, action items and open questions, refreshed every 30 seconds." },
      { id: "bookmarks", icon: "bookmark", name: "Bookmarks", text: "Press B to mark a key moment. It’s highlighted in your notes." },
      { id: "floating-panel", icon: "panel", name: "Floating panel", text: "A small see-through panel over your meeting. It stays above full screen, remembers where you put it, and has an opacity slider and a full-window button." },
    ],
  },
  {
    id: "before",
    n: "01",
    title: "Before the call",
    line: "Walk in prepared, or rehearse first.",
    tone: "#b9e639",
    items: [
      { id: "calendar", icon: "calendar", name: "Your calendar", text: "Paste your calendar’s private link from Google Calendar, Outlook or iCloud. Today’s and tomorrow’s meetings show up with Join and Prepare." },
      { id: "call-prep", icon: "target", name: "Call prep", text: "Pick the call type, set your goal, add notes for the AI (who you’re meeting, agenda, prices, key facts) and attach documents.", chips: ["Team meeting", "Sales", "Interview", "Customer support", "Negotiation", "Other"] },
      { id: "profiles", icon: "user", name: "Context profiles", text: "Save what you reuse, like your resume, product facts or pricing, and add it to any call." },
      { id: "practice", icon: "mic", name: "Practice mode", text: "Your mic plays the other person, so you can rehearse before the real thing." },
      { id: "reminders", icon: "bell", name: "Meeting reminders", text: "A reminder a minute before each meeting and when it starts, with Join and Take notes. MeetFly can take notes on its own for all meetings, or all but one-on-ones." },
      { id: "join", icon: "link", name: "Join from MeetFly", text: "Paste a Meet, Zoom, Teams, Webex or Whereby link and the meeting opens inside MeetFly. Sign in once to Google, Microsoft or Zoom." },
    ],
  },
  {
    id: "after",
    n: "03",
    title: "After the call",
    line: "Notes, recording and follow-up, done when you hang up.",
    tone: "#ffad84",
    items: [
      { id: "notes", icon: "doc", name: "Structured notes", text: "Notes from a template for the call type: summary, key points, decisions, action items and open questions." },
      { id: "my-notes", icon: "pen", name: "My notes", text: "Jot rough notes during the call. When you press End, MeetFly turns them into full notes and keeps every point you wrote." },
      { id: "follow-up", icon: "mail", name: "Follow-up email", text: "A recap email with the summary, decisions and action items with owners, addressed to the people invited. Open it in your mail app or copy it." },
      { id: "recording", icon: "rec", name: "Recording", text: "Record the full call, both sides, to play back or download. You choose whether to record." },
      { id: "stats", icon: "chart", name: "Call stats", text: "Duration, turns, your share of the talking and how often MeetFly helped." },
      { id: "library", icon: "search", name: "Search every meeting", text: "Full-text search across titles, notes, your notes and transcripts, with the matching excerpt. Organise with tags and folders." },
      { id: "ask-across", icon: "ask", name: "Ask across meetings", text: "Ask a question and get an answer drawn from all your past calls." },
      { id: "rewrite", icon: "redo", name: "Rewrite notes", text: "Turn any meeting’s notes into another template." },
      { id: "export", icon: "export", name: "Export and share", text: "Copy it as Markdown, rich text or for Slack, save it as a file, or send it to Zapier, Make or n8n with a webhook.", chips: ["PDF", "Word", "Markdown", "Slack", "Webhook"] },
    ],
  },
  {
    id: "everywhere",
    n: "04",
    title: "Everywhere",
    line: "Fast to reach, easy to trust.",
    tone: "#5b2eff",
    items: [
      { id: "shortcuts", icon: "keys", name: "Keyboard shortcuts", text: "Every action is one key away, and some work from any app.", chips: ["⌘ Enter", "⌘ ⇧ S", "B", "M", "⌘ ⇧ O", "⌘ K"] },
      { id: "command-bar", icon: "command", name: "⌘K command bar", text: "Jump anywhere, run any action, paste a meeting link to join, or search every meeting." },
      { id: "privacy", icon: "lock", name: "Stored on your computer", text: "Notes, transcripts and recordings are saved on your machine. No bot joins your call. Audio and transcript text go to the speech and AI services MeetFly uses." },
      { id: "usage", icon: "gauge", name: "Usage and limits", text: "See this month’s usage and set monthly limits on transcription minutes and AI requests." },
      { id: "desktop", icon: "laptop", name: "Mac and Windows", text: "A desktop app with light, dark and system themes. It can start when you log in and wait in the menu bar, with your next meeting one click away." },
    ],
  },
];

// "During the call", told as one call with notes in the margin. The first four lines and the
// suggested reply, its tips and the recap items are word for word from a real MeetFly practice call
// (2026-11-14, same as the homepage demo). The later lines are written to show each feature.
export const duringCall = {
  eyebrow: "02 · During the call",
  title: "Help on every turn, the moment you need it",
  lead: "Follow one sales call from hello to the pilot question. Each note in the margin is a MeetFly feature, right where it helps.",
  meeting: "Pilot call · Sales",
  note: "The first lines and the suggested reply are from a real MeetFly practice call. The rest is written to show each feature.",
  them: "Them",
  you: "You",
  meetfly: "MeetFly",
  events: [
    { stamp: "0:03", who: "them", text: "Thanks for making time today.", note: "live-transcript" },
    { stamp: "0:06", who: "them", text: "My team has looked at your proposal, and we like it." },
    { stamp: "0:11", who: "you", text: "Great to hear. What stood out for your team?" },
    { stamp: "0:16", who: "them", text: "Our main worry is the price. It is higher than the tool we use right now.", mark: "Bookmarked · B", note: "bookmarks" },
    {
      stamp: "0:17",
      who: "meetfly",
      kind: "reply",
      label: "Suggested reply",
      text: "I completely understand where you are coming from on cost. How about we run a two-week free pilot for up to 10 seats so your team can test the value firsthand before making any decision?",
      note: "live-replies",
    },
    {
      stamp: "0:19",
      who: "meetfly",
      kind: "shapes",
      label: "Answer length",
      shapes: [
        { key: "short", label: "Short", text: "How about a two-week free pilot for up to 10 seats?" },
        { key: "normal", label: "Normal", text: "I completely understand where you are coming from on cost. How about we run a two-week free pilot for up to 10 seats so your team can test the value firsthand?" },
        { key: "bullets", label: "Bullets", bullets: ["Offer the two-week free pilot for up to 10 seats", "Remind them setup takes just one day"] },
        { key: "script", label: "Script", text: "“That’s fair. Let’s make it easy to judge: a two-week free pilot for up to 10 seats, set up in a day. If it doesn’t prove its value, you’ve lost nothing.”" },
      ],
      note: "answer-styles",
    },
    {
      stamp: "0:24",
      who: "meetfly",
      kind: "action",
      label: "Follow-ups",
      bullets: ["Which date suits you to start the pilot?", "How many seats would your team need?"],
      note: "quick-actions",
    },
    {
      stamp: "0:41",
      who: "them",
      kind: "screen",
      screen: "Shared screen · Security checklist · 3. Where is call data stored?",
      text: "Could you look at point three on our checklist?",
      answer: "Notes, transcripts and recordings are saved on your computer. No bot joins the call.",
      note: "read-my-screen",
    },
    {
      stamp: "0:58",
      who: "them",
      kind: "translate",
      lang: "Spanish",
      text: "¿Cuándo podríamos empezar la prueba?",
      translated: "When could we start the pilot?",
      note: "live-translation",
    },
    {
      stamp: "1:04",
      who: "you",
      kind: "ask",
      typed: "What did they say about the budget?",
      answer: "They said the price is higher than their current tool, and they want to see the value first.",
      note: "ask-box",
    },
    { stamp: "1:12", who: "you", text: "MeetFly, make a slide outline for the pilot plan.", mark: "Voice command", note: "voice-commands" },
    {
      stamp: "1:14",
      who: "meetfly",
      kind: "created",
      label: "Created · Slide outline",
      bullets: ["1 · Why a pilot", "2 · Two weeks, up to 10 seats", "3 · Set up in one day", "4 · What we will measure"],
      note: "created",
    },
    {
      stamp: "1:30",
      who: "meetfly",
      kind: "notes",
      label: "Live notes · updated 1:30",
      items: [
        ["Discussed", "Proposal reviewed and liked; price is the main worry"],
        ["Open", "Pilot start date and seat count"],
      ],
      note: "live-notes",
    },
  ],
  panel: {
    note: "floating-panel",
    title: "All of it in one small panel",
    opacity: "Opacity",
  },
};

// "Before the call": five steps, each shown on a MeetFly screen drawn in code. Labels follow the
// app (call types, "Notes for the AI", Join / Prepare). The meetings and notes are examples.
export const beforeCall = {
  eyebrow: "01 · Before the call",
  title: "Walk in prepared, or rehearse first",
  lead: "Everything MeetFly does in the fifteen minutes before a call, minute by minute.",
  minLabel: "min to go",
  nowLabel: "now",
  window: "MeetFly",
  steps: [
    {
      id: "calendar",
      t: "T–15 min",
      min: 15,
      screen: "Today",
      chip: "3 meetings today",
      demo: {
        rows: [
          { time: "10:30", title: "Pilot call", meta: "Sales", hot: true },
          { time: "13:00", title: "Weekly sync", meta: "Team meeting" },
          { time: "16:15", title: "Renewal check-in", meta: "Customer support" },
        ],
        join: "Join",
        prepare: "Prepare",
        sources: ["Google Calendar", "Outlook", "iCloud"],
      },
    },
    {
      id: "call-prep",
      t: "T–12 min",
      min: 12,
      screen: "Prepare call",
      chip: "Ready to start",
      demo: {
        types: ["Team meeting", "Sales", "Interview", "Customer support", "Negotiation", "Other"],
        picked: "Sales",
        goalLabel: "Goal",
        goal: "Agree on a pilot start date",
        notesLabel: "Notes for the AI",
        notes: "40-person sales team. Price is their main worry. Offer the two-week pilot.",
        files: ["proposal.pdf", "pricing.pdf"],
      },
    },
    {
      id: "profiles",
      t: "T–8 min",
      min: 8,
      screen: "Context profiles",
      chip: "2 added to this call",
      demo: {
        items: [
          ["Product facts", "Features, setup, security answers", true],
          ["Pricing", "Plans and the pilot offer", true],
          ["My resume", "For interview practice", false],
        ],
      },
    },
    {
      id: "practice",
      t: "T–5 min",
      min: 5,
      screen: "Practice mode",
      chip: "Rehearsing",
      demo: {
        label: "Your mic plays the client",
        lines: ["“Our main worry is the price.”", "“It is higher than the tool we use right now.”"],
        reply: "Suggested reply ready",
      },
    },
    {
      id: "reminders",
      t: "T–1 min",
      min: 1,
      chip: "Reminder",
      demo: {
        note: "Pilot call starts in 1 minute",
        meta: "Sales · 3 people",
        join: "Join",
        notes: "Take notes",
        autoLabel: "Take notes automatically",
        auto: ["Off", "All meetings", "All except one-on-ones"],
        autoPicked: "All except one-on-ones",
      },
    },
    {
      id: "join",
      t: "T–0",
      min: 0,
      screen: "Join a meeting",
      chip: "Opened inside MeetFly",
      demo: {
        label: "Paste a meeting link",
        link: "https://zoom.us/j/8412 5530 917",
        apps: ["Meet", "Zoom", "Teams", "Webex", "Whereby"],
        people: ["Client", "You"],
      },
    },
  ],
};

// "After the call", as the anatomy of one meeting's notes: each part of the notes carries the
// feature that made it. The summary, open items and the price worry come from the same real
// practice call as the homepage demo; the numbers, the email and the search are examples.
export const afterCall = {
  eyebrow: "03 · After the call",
  title: "Notes, recording and follow-up, done when you hang up",
  lead: "Counting up from the moment you press End: what is ready right away, what you send next, and what you come back to later.",
  start: "You hang up",
  // Counting up from the moment you hang up: three times, three features each.
  times: [
    { id: "now", plus: 0, unit: "min", label: "When you hang up", features: ["notes", "my-notes", "stats"] },
    { id: "soon", plus: 2, unit: "min", label: "Before your next call", features: ["recording", "follow-up", "export"] },
    { id: "later", plus: 1, unit: "week", label: "Whenever you need it", features: ["library", "ask-across", "rewrite"] },
  ],
  hint: "Hover or tap a feature",
  example: "Example notes. The summary and open items are from a real MeetFly practice call; the numbers and email are examples.",
  parts: [
    { id: "library", side: "right", kind: "search", query: "pilot price", hit: "Pilot call", excerpt: "…our main worry is the **price**. It is higher than the tool we use…" },
    {
      id: "ask-across",
      side: "left",
      kind: "ask",
      question: "What did clients say about price this month?",
      answer: "Two calls raised price. Both asked for a pilot before deciding.",
    },
    { id: "rewrite", side: "right", kind: "title", title: "Pilot call", meta: ["Nov 14", "18 min", "3 people"], template: "Sales", templates: ["Sales", "Team meeting", "Interview", "Customer support"] },
    { id: "recording", side: "left", kind: "player", length: "18:24", label: "Recording · both sides" },
    {
      id: "stats",
      side: "right",
      kind: "stats",
      you: 41,
      items: [
        ["Duration", "18:24"],
        ["Turns", "46"],
        ["MeetFly helped", "7 times"],
      ],
      youLabel: "You",
      themLabel: "Them",
    },
    {
      id: "notes",
      side: "left",
      kind: "notes",
      summaryLabel: "Summary",
      summary: "The client’s team reviewed the proposal and liked it. Price is the main worry compared with their current tool.",
      groups: [
        ["Decisions", ["Offer a two-week free pilot for up to 10 seats"]],
        ["Open questions", ["Pilot start date and seat count", "Addressing the price objection"]],
      ],
    },
    {
      id: "my-notes",
      side: "right",
      kind: "mine",
      label: "From your notes",
      items: ["They compare us with their current tool", "Setup in one day: mention it again"],
    },
    {
      id: "follow-up",
      side: "left",
      kind: "email",
      subject: "Next steps on the pilot",
      body: "Hi, thanks for your time today. As discussed, we can start a two-week free pilot for up to 10 seats. Which date suits your team?",
      open: "Open in mail app",
    },
    { id: "export", side: "right", kind: "export", copy: "Copy summary", formats: ["PDF", "Word", "Markdown", "Slack", "Webhook"] },
  ],
};

// "Everywhere": the five features that work across the whole app, on a ruled grid. Shortcut keys
// are the app's (from featureGroups); privacy follows the homepage wording (never "100% local");
// the usage numbers are examples.
export const everywhere = {
  eyebrow: "04 · Everywhere",
  title: "Fast to reach, easy to trust",
  lead: "The things that work across the whole app, from the first shortcut to where your notes are kept.",
  keysHint: "Try B or ⌘K on your keyboard",
  command: {
    typed: "pilot",
    results: [
      { icon: "search", label: "Search meetings for “pilot”", meta: "2 calls" },
      { icon: "link", label: "Join a meeting from a link", meta: "Paste" },
      { icon: "target", label: "Prepare a call", meta: "Action" },
    ],
  },
  privacy: {
    local: { title: "On your computer", items: ["Notes", "Transcripts", "Recordings", "Call profiles"] },
    out: { title: "Sent to speech and AI services", items: ["Audio", "Transcript text"] },
    fact: "No bot joins your call",
  },
  usage: {
    month: "This month",
    meters: [
      { label: "Transcription", used: 312, limit: 600, unit: "min" },
      { label: "AI requests", used: 1240, limit: 3000, unit: "" },
    ],
    note: "Example numbers",
  },
  desktop: { systems: ["macOS", "Windows"], light: "Light", dark: "Dark", setup: "Short setup guide" },
};

// The closing section of the Features page: the bookend to the hero. Download buttons follow
// siteConfig.downloads ("Coming soon" while there are no links, as on the homepage).
export const featuresEnd = {
  eyebrow: "That’s everything",
  before: "features.",
  after: "One download.",
  settle: "All of it in one desktop app for Mac and Windows.",
  mac: "Download for Mac",
  windows: "Download for Windows",
  soon: "Coming soon",
  watch: { label: "Watch it work", href: "/#demo" },
  jumpLabel: "Jump back to",
  jumps: [
    { href: "#before", n: "01", label: "Before the call", group: "before" },
    { href: "#during", n: "02", label: "During the call", group: "during" },
    { href: "#after", n: "03", label: "After the call", group: "after" },
    { href: "#everywhere", n: "04", label: "Everywhere", group: "everywhere" },
  ],
};

// Note templates, word for word from the app (server/services/prompts.ts, NOTE_TEMPLATES). Team
// meeting and Other share one template. Every template starts with Summary and has Action items.
export const templates = {
  eyebrow: "Note templates",
  title: "Notes shaped by the call you had",
  lead: "Pick the call type before you start and the notes come back in the right shape. Rewrite them into another template any time.",
  docTitle: "Pilot call",
  shared: "In every template",
  types: [
    {
      id: "meeting",
      label: "Team meeting",
      also: "and Other",
      blurb: "For syncs, stand-ups and anything that isn’t one of the others.",
      sections: [["Summary", "3–5 sentences"], ["Key points"], ["Decisions"], ["Action items", "task · owner · due date"], ["Open questions"], ["Follow-up email draft", "short, ready to send"]],
    },
    {
      id: "sales",
      label: "Sales",
      blurb: "Built around the deal: what they need, whether they can buy, and what is in the way.",
      sections: [["Summary", "3–5 sentences"], ["Customer needs and pain points"], ["Budget, authority, need and timeline"], ["Objections and how they were handled"], ["Action items", "task · owner · due date"], ["Next steps"], ["Follow-up email draft", "short, ready to send"]],
    },
    {
      id: "interview",
      label: "Interview",
      blurb: "Written for you as the candidate, so the next interview goes better.",
      sections: [["Summary", "3–5 sentences"], ["Questions asked"], ["How I answered", "strong points"], ["What to improve next time"], ["Action items", "task · owner · due date"], ["Thank-you email draft", "short, ready to send"]],
    },
    {
      id: "support",
      label: "Customer support",
      blurb: "From the problem to the fix, with how the customer felt about it.",
      sections: [["Summary", "3–5 sentences"], ["Issue reported"], ["Troubleshooting steps taken"], ["Resolution"], ["Action items", "task · owner · due date"], ["Customer sentiment"], ["Follow-up email draft", "short, ready to send"]],
    },
    {
      id: "negotiation",
      label: "Negotiation",
      blurb: "Who wanted what, who gave what, and what is still open.",
      sections: [["Summary", "3–5 sentences"], ["Positions of each side"], ["Concessions offered"], ["Agreed terms"], ["Open issues"], ["Action items", "task · owner · due date"], ["Follow-up email draft", "short, ready to send"]],
    },
  ],
};

// "Your data, your rules": the app's privacy settings, from its code (store/retention.ts,
// DeleteAllMeetings.tsx, consent-store.ts, ErrorReportsSetting.tsx). Never "100% local": audio
// and transcript text go to the speech and AI services. No claim of encryption (not in the code).
export const control = {
  eyebrow: "Privacy",
  title: "Your data, your rules",
  lead: "Your call history lives on your computer, and you decide how long it stays.",
  statement: "Notes, transcripts and recordings are saved on your computer, not on a MeetFly server.",
  honest: "While you talk, audio and transcript text are sent to the speech and AI services MeetFly uses, so it can write down the call and answer.",
  settings: [
    { id: "keep", label: "Keep meetings for", text: "Older meetings are cleared once a day.", kind: "segments", options: ["Forever", "90 days", "30 days", "7 days"], from: 0, to: 2 },
    { id: "audio", label: "Keep audio recordings", text: "Switch it off to keep the transcript only. Recording is your choice.", kind: "toggle", on: true },
    { id: "consent", label: "Remind me to ask for consent", text: "At the start of a meeting, with a notice you can paste into the chat.", kind: "toggle", on: true },
    { id: "errors", label: "Send error reports", text: "On by default to help fix bugs. Turn it off any time.", kind: "toggle", on: true, flip: true },
    { id: "delete", label: "Delete all meetings", text: "Every meeting, its notes and its recording, from this computer.", kind: "button", button: "Delete all…" },
  ],
  facts: ["No bot joins your call", "Delete any single meeting", "Webhooks only send when you ask"],
};

// The film in the Features hero: a real, unedited screen recording of MeetFly in a practice sales
// call (public/video/hero/app.mp4, 51s, recorded 2026-11-14). It is cropped to the meeting area
// (no sidebar or call bar, which show voice features the site leaves out). `from` is when each step
// starts, in seconds of the video.
export const film = {
  title: "Pilot call",
  meta: "Sales · Practice call",
  real: "Real recording",
  note: "A real, unedited recording of MeetFly in a practice call.",
  sound: "Muted",
  steps: [
    { key: "hears", from: 0, title: "Hears the call", text: "Listens on your computer. No bot joins." },
    { key: "writes", from: 3, title: "Writes it down", text: "Every line of the other side, live." },
    { key: "reply", from: 9, title: "Suggests a reply", text: "The moment they stop, with key points." },
    { key: "recap", from: 44, title: "Sums it up", text: "Discussed, agreed and still open." },
  ],
};
