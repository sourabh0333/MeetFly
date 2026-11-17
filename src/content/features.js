// The Features page. Every feature and label here was checked against the app's code (its screens,
// not only the README) on 2026-11-17, e.g. answer lengths and call types use the app's own words.
// Voice changer, voice cloning and stealth mode are deliberately left out for now.

export const featuresPage = {
  eyebrow: { tag: "29 features", text: "One app for the whole call" },
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
      { id: "calendar", icon: "calendar", name: "Your calendar", text: "Connect Google Calendar, Outlook or iCloud. Today’s and tomorrow’s meetings show up with Join and Prepare." },
      { id: "call-prep", icon: "target", name: "Call prep", text: "Pick the call type, set your goal, add notes for the AI (who you’re meeting, agenda, prices, key facts) and attach documents.", chips: ["Team meeting", "Sales", "Interview", "Customer support", "Negotiation", "Other"] },
      { id: "profiles", icon: "user", name: "Context profiles", text: "Save what you reuse, like your resume, product facts or pricing, and add it to any call." },
      { id: "practice", icon: "mic", name: "Practice mode", text: "Your mic plays the other person, so you can rehearse before the real thing." },
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
      { id: "follow-up", icon: "mail", name: "Follow-up email", text: "A ready-to-send follow-up email at the end of your notes, opened in your mail app in one click." },
      { id: "recording", icon: "rec", name: "Recording", text: "Record the full call, both sides, to play back or download. You choose whether to record." },
      { id: "stats", icon: "chart", name: "Call stats", text: "Duration, turns, your share of the talking and how often MeetFly helped." },
      { id: "library", icon: "search", name: "Search every meeting", text: "Full-text search across titles, notes, your notes and transcripts, with the matching excerpt. Organise with tags and folders." },
      { id: "ask-across", icon: "ask", name: "Ask across meetings", text: "Ask a question and get an answer drawn from all your past calls." },
      { id: "rewrite", icon: "redo", name: "Rewrite notes", text: "Turn any meeting’s notes into another template." },
      { id: "export", icon: "export", name: "Export and share", text: "Copy a share-ready summary, or save as a file.", chips: ["PDF", "Word", "Markdown"] },
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
      { id: "desktop", icon: "laptop", name: "Mac and Windows", text: "A desktop app with light and dark themes and a short setup guide." },
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
  lead: "Everything MeetFly does in the fifteen minutes before a call.",
  window: "MeetFly",
  steps: [
    {
      id: "calendar",
      t: "T–15 min",
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
      screen: "Practice mode",
      chip: "Rehearsing",
      demo: {
        label: "Your mic plays the client",
        lines: ["“Our main worry is the price.”", "“It is higher than the tool we use right now.”"],
        reply: "Suggested reply ready",
      },
    },
    {
      id: "join",
      t: "T–0",
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
