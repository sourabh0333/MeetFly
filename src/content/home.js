// Homepage copy. Every product claim here comes from the app's README or its code.
// The hero video is a real recording of the app, labelled with how it was made.

// The main menu. Shaped like similar products' menus (Product and Use cases dropdowns), but only
// with what MeetFly really has: no Log in (no accounts), no Pricing (not decided), no Blog yet.
// Links jump to homepage sections for now; point them at the new pages as those are built.
export const nav = {
  links: [
    {
      label: "Features",
      href: "/features",
      menu: {
        groups: [
          {
            title: "During the call",
            items: [
              { label: "Instant replies", text: "Answers in your style, the moment they stop", href: "/features#during-live-replies" },
              { label: "Floating panel", text: "Stays over any meeting, one key away", href: "/features#during-floating-panel" },
              { label: "Live translation", text: "Their captions in 14 languages", href: "/features#during-live-translation" },
            ],
          },
          {
            title: "Before and after",
            items: [
              { label: "Call prep", text: "Call types, goals and practice", href: "/features#before-call-prep" },
              { label: "Note templates", text: "Notes shaped by the call you had", href: "/features#templates" },
              { label: "Meeting library", text: "Search and ask across every call", href: "/features#after" },
            ],
          },
        ],
        featured: { label: "All features", text: "Everything MeetFly does, in one place", href: "/features" },
      },
    },
    {
      label: "Use cases",
      href: "/use-cases",
      menu: {
        groups: [
          {
            title: "Built for",
            items: [
              { label: "Sales", href: "/use-cases#sales" },
              { label: "Support", href: "/use-cases#support" },
              { label: "Founders", href: "/use-cases#founders" },
              { label: "Hiring", href: "/use-cases#hiring" },
              { label: "Job seekers", href: "/use-cases#job-seekers" },
              { label: "Multilingual teams", href: "/use-cases#multilingual-teams" },
              { label: "More calls it fits", href: "/use-cases#more-roles" },
            ],
          },
        ],
        featured: { label: "All use cases", text: "Six roles, one copilot", href: "/use-cases" },
      },
    },
    { label: "Privacy", href: "/#privacy" },
    { label: "FAQ", href: "/#faq" },
  ],
  download: { label: "Download", href: "/#download" },
  live: "Live",
  menu: "Menu",
  close: "Close menu",
};

export const hero = {
  eyebrow: { tag: "Live", text: "AI copilot for every call" },
  title: {
    top: "Always know what to say",
    prefix: "in your next",
    // The app's own call types (Prepare call → type).
    words: ["sales call.", "interview.", "support call.", "negotiation.", "team meeting."],
    // What screen readers hear: the sentence once, without the rotation.
    label: "Always know what to say in your next call.",
  },
  lead: "MeetFly listens to your call, writes down both sides as you talk, and suggests your reply the moment the other person stops speaking.",
  primary: { label: "Download MeetFly", href: "/#download" },
  secondary: { label: "Watch it work", href: "/#demo" },
  trust: ["macOS and Windows", "No bot joins your call", "Notes stay on your computer"],
};

// The hero's interactive demo: MeetFly's interface, drawn in code, beside a video call.
// The client's lines, the suggested reply and the recap are word for word from a real MeetFly
// practice call recorded on 2026-11-14 (scratchpad rec/app-log.json); "your" line is written for
// the demo. The four people are Mixkit stock footage (clips 4833, 4844, 10446 and 10441, Mixkit
// Stock Video Free License, checked 2026-11-14), labelled by role only.
export const stage = {
  title: "Your reply is ready before the pause ends",
  window: "MeetFly",
  label: "Animated demo of MeetFly during a sales call: it listens, writes down what the client says, suggests a reply, then writes a recap.",
  meeting: { title: "Pilot call", meta: "Sales · Practice call" },
  // Each tab is one step of the demo; `seconds` is how long it plays before moving on.
  tabs: [
    { key: "listen", label: "Hears the call", icon: "headphones", seconds: 5 },
    { key: "transcript", label: "Writes it live", icon: "captions", seconds: 11 },
    { key: "reply", label: "Answers fast", icon: "bolt", seconds: 10 },
    { key: "recap", label: "Sums it up", icon: "clipboard", seconds: 11 },
  ],
  listening: { title: "Listening for the other person…", sub: "MeetFly hears both sides of the call. No bot joins." },
  // Who's speaking: "them" lights the client's tile, "you" lights yours.
  lines: [
    { who: "them", at: 0.3, stamp: "0:03", text: "Thanks for making time today." },
    { who: "them", at: 1.6, stamp: "0:06", text: "My team has looked at your proposal, and we like it." },
    { who: "you", at: 3.7, stamp: "0:11", text: "Great to hear. What stood out for your team?" },
    { who: "them", at: 5.6, stamp: "0:16", text: "Our main worry is the price. It is higher than the tool we use right now." },
  ],
  them: "Them",
  you: "You",
  reply: {
    label: "Suggested reply",
    auto: "Auto",
    quote: "“It is higher than the tool we use right now.”",
    text: "I completely understand where you are coming from on cost. How about we run a two-week free pilot for up to 10 seats so your team can test the value firsthand before making any decision?",
    tips: ["Offer the two-week free pilot for up to 10 seats", "Remind them setup takes just one day"],
    actions: ["What should I say?", "Follow-ups", "Recap", "Fact-check"],
  },
  recap: {
    working: "Writing your recap…",
    steps: ["Reading the transcript", "Finding what was agreed", "Listing open questions"],
    title: "Recap so far",
    meta: "Written from the live transcript",
    items: [
      ["Discussed", "Proposal reviewed and liked; price is the main worry compared to their current tool"],
      ["Agreed", "Nothing yet"],
      ["Open", "Pilot start date and seat count"],
      ["Open", "Addressing the price objection"],
    ],
    copy: "Copy",
    again: "Regenerate",
  },
  controls: { mic: "Mic", audio: "Meeting audio", end: "End" },
  people: [
    { key: "client", name: "Client", who: "them", src: "/video/hero/client.mp4", poster: "/video/hero/client.jpg" },
    { key: "guest", name: "Client team", src: "/video/hero/guest.mp4", poster: "/video/hero/guest.jpg" },
    { key: "teammate", name: "Your teammate", src: "/video/hero/teammate.mp4", poster: "/video/hero/teammate.jpg" },
    { key: "you", name: "You", who: "you", src: "/video/hero/you.mp4", poster: "/video/hero/you.jpg" },
  ],
  worksWith: "Works with",
  // Meeting apps from the app's README, as colour tiles with their initial (not their logos).
  apps: [
    { name: "Zoom", short: "Z", bg: "#0b5cff" },
    { name: "Microsoft Teams", short: "T", bg: "#5b5fc7" },
    { name: "Google Meet", short: "M", bg: "#00897b" },
    { name: "Slack huddles", short: "S", bg: "#4a154b" },
    { name: "Webex", short: "W", bg: "#07c160" },
    { name: "Whereby", short: "W", bg: "#ff5c39" },
  ],
  more: "…and any other call",
  pause: "Pause demo",
  play: "Play demo",
};

// Meeting apps named in the app's README and its meeting-link code.
export const platforms = {
  label: "Works with",
  items: ["Zoom", "Google Meet", "Microsoft Teams", "Webex", "Slack huddles", "Whereby", "Any other call"],
};

// "Before · During · After": the whole call. Every feature named here is in the app's code
// (research/meetfly-app-review.md). The little demos use sample content; the numbers in the
// "after" card (24 min, 42%, 6 assists) are an example, not a measurement.
export const journey = {
  eyebrow: "Before · During · After",
  title: "One copilot for the whole call",
  lead: "MeetFly doesn’t stop at the reply. It gets you ready before the call, keeps you sharp while you talk, and writes it all up when you hang up.",
  steps: [
    {
      key: "before",
      n: "01",
      when: "Before the call",
      title: "Walk in prepared",
      text: "Tell MeetFly the call type, your goal and the background. Attach documents, save it as a profile, and rehearse first.",
      points: ["Sales, interview, customer support, team meeting, negotiation or other", "Attach documents and reuse saved profiles", "Practice mode: your mic plays the other person"],
      // Small pieces of the app that float around the demo.
      floats: [
        { icon: "doc", text: "pricing-2026.pdf" },
        { icon: "target", text: "Goal: agree a pilot" },
        { icon: "mic", text: "Practice mode on" },
      ],
      demo: {
        heading: "Prepare call",
        typeLabel: "Call type",
        types: ["Sales", "Interview", "Customer support", "Team meeting", "Negotiation"],
        goalLabel: "Goal",
        goal: "Agree a two-week pilot",
        docLabel: "Background",
        doc: "pricing-2026.pdf",
        practice: "Practice mode",
        start: "Start meeting",
      },
    },
    {
      key: "during",
      n: "02",
      when: "During the call",
      title: "Help on every turn",
      text: "Both sides written down live, a reply the moment they stop, and quick actions whenever you need more.",
      points: ["Quick actions: what to say, follow-ups, recap, fact-check", "Read my screen: it looks at what’s shared", "Their captions translated into 14 languages"],
      floats: [
        { icon: "globe", text: "14 languages" },
        { icon: "check", text: "Fact-check" },
        { icon: "screen", text: "Read my screen" },
      ],
      demo: {
        heading: "Live captions",
        into: "into English",
        them: "Them",
        // The same question in three languages (checked translations), and the English it becomes.
        lines: [
          { code: "ES", lang: "Spanish", text: "¿Cuándo podemos empezar el piloto?" },
          { code: "HI", lang: "Hindi", text: "हम पायलट कब शुरू कर सकते हैं?" },
          { code: "JA", lang: "Japanese", text: "試験導入はいつ始められますか？" },
        ],
        english: "When can we start the pilot?",
        actions: ["What should I say?", "Follow-ups", "Fact-check", "Read my screen"],
      },
    },
    {
      key: "after",
      n: "03",
      when: "After the call",
      title: "Notes that write themselves",
      text: "Structured notes from a template for the call type, ending in a follow-up email that’s ready to send.",
      points: ["Recording of both sides to play back or download", "Call stats: duration, talk time, AI assists", "Search and ask across all your calls"],
      floats: [
        { icon: "mail", text: "Follow-up drafted" },
        { icon: "play", text: "Recording saved" },
        { icon: "search", text: "Ask across all calls" },
      ],
      demo: {
        heading: "Call notes",
        template: "Sales template",
        items: ["Pilot: two weeks, up to 10 seats", "Send pricing for yearly plan", "Book kickoff for Monday"],
        stats: [
          ["24 min", "Duration"],
          ["6", "AI assists"],
        ],
        talk: { you: 42, label: "Talk time", youLabel: "You", themLabel: "Them" },
        email: "Follow-up email",
        draft: "Hi, thanks for your time today. As promised, here’s the plan for the two-week pilot…",
      },
    },
  ],
};

// "Note-taker vs copilot". No competitor is named (the owner's decision, 2026-11-16): MeetFly is
// set against what a note-taker does in general. Every MeetFly feature named is in the app's code.
export const compare = {
  eyebrow: "Note-taker vs copilot",
  title: "Most tools take notes. MeetFly helps you talk.",
  lead: "A note-taker writes down the call and hands you a summary later. MeetFly does that too, and it helps you while the call is still happening.",
  modes: { notes: "Note-taker", fly: "MeetFly" },
  covers: "of these 8",
  // The call in the middle.
  hub: {
    title: "Pilot call",
    lines: [
      { who: "Them", text: "Our main worry is the price." },
      { who: "Them", text: "When could we start the pilot?" },
    ],
    reply: { label: "Suggested reply", text: "We can start next Monday, and the pilot is free for two weeks." },
    later: "Summary after the call",
  },
  // Eight things around the call, four a side. `both`: a note-taker does it too.
  tiles: [
    { key: "prep", side: "left", icon: "target", title: "Prep & practice", detail: "Before the call" },
    { key: "transcript", side: "left", icon: "lines", title: "Live transcript", detail: "Both sides", both: true },
    { key: "reply", side: "left", icon: "spark", title: "Instant reply", detail: "When they stop talking" },
    { key: "screen", side: "left", icon: "screen", title: "Read my screen", detail: "Looks at what’s shared" },
    { key: "recording", side: "right", icon: "rec", title: "Recording", detail: "Play back or download", both: true },
    { key: "fact", side: "right", icon: "check", title: "Fact-check", detail: "One tap, mid-call" },
    { key: "translate", side: "right", icon: "globe", title: "Live translation", detail: "14 languages" },
    { key: "notes", side: "right", icon: "doc", title: "Notes after", detail: "Summary and notes", both: true },
  ],
  bothTag: "Both",
  onlyTag: "MeetFly",
};

// "Tuned to the call you're on": the five call types from the app's Prepare call screen. The
// lines and replies are written examples, not recordings. Interviews are shown as practice
// (Practice mode) until the owner decides how live interview help is presented.
export const calls = {
  eyebrow: "Every kind of call",
  title: "Tuned to the call you’re on",
  lead: "Pick the call type and your goal before you start. MeetFly shapes its replies, and your notes afterwards, to fit.",
  them: "They say",
  you: "MeetFly suggests",
  goalLabel: "Goal",
  notesLabel: "Notes",
  types: [
    {
      key: "sales",
      label: "Sales",
      them: "Can you do anything on the price?",
      reply: "Let’s start with the free two-week pilot, so your team sees the value before we talk numbers.",
      goal: "Agree a two-week pilot",
      notes: "Sales template",
    },
    {
      key: "interview",
      label: "Interview practice",
      them: "Tell me about a time you handled a tough deadline.",
      reply: "Set the scene in a sentence, say what you did, then end on the result and what you learned.",
      goal: "Rehearse for Friday",
      notes: "Interview template",
    },
    {
      key: "support",
      label: "Customer support",
      them: "The export keeps failing on my account.",
      reply: "Sorry about that. Which browser are you on? While we check, here’s a quick way to get your file.",
      goal: "Solve it on the first call",
      notes: "Support template",
    },
    {
      key: "negotiation",
      label: "Negotiation",
      them: "That timeline doesn’t work for us.",
      reply: "What would make it work? If we move the start date, can we agree the scope today?",
      goal: "Agree scope and dates",
      notes: "Negotiation template",
    },
    {
      key: "meeting",
      label: "Team meeting",
      them: "So who’s taking the launch checklist?",
      reply: "I can take it. I’ll share a first draft by Thursday.",
      goal: "Leave with clear owners",
      notes: "Meeting template",
    },
  ],
  example: "Example lines",
};

// "Where your call goes": privacy, told honestly. From the app's code: notes, transcripts,
// recordings and call profiles are stored on the user's computer; audio and transcript text are
// sent to the speech-to-text and AI services MeetFly uses, to transcribe and write replies. Never
// claim "100% local" or that audio never leaves the device.
export const privacy = {
  eyebrow: "Privacy",
  title: "Where your call goes",
  lead: "Your call history lives on your computer. Only what MeetFly needs to hear and answer goes out, to the services that do the work.",
  centre: "Your computer",
  local: {
    title: "Stays on your computer",
    text: "Everything MeetFly keeps is saved on your own machine, not on a MeetFly server.",
    items: [
      { icon: "doc", label: "Notes" },
      { icon: "lines", label: "Transcripts" },
      { icon: "rec", label: "Recordings" },
      { icon: "user", label: "Call profiles" },
    ],
  },
  out: {
    title: "Goes out to be processed",
    text: "While you talk, audio and transcript text are sent to the speech and AI services MeetFly uses, so it can write down the call and suggest replies.",
    items: [
      { icon: "wave", label: "Speech to text" },
      { icon: "spark", label: "AI replies" },
    ],
  },
  facts: [
    { icon: "bot", title: "No bot joins your call", text: "Nobody sees an extra guest." },
    { icon: "gauge", title: "Limits you set", text: "Monthly caps on minutes and AI use." },
    { icon: "trash", title: "Delete any call", text: "Its notes and recording go with it." },
  ],
};

// FAQ, told as a chat. Every answer is from the app's code or our own test call (2026-11-14).
// No pricing (not decided yet) and nothing on stealth mode.
export const faq = {
  eyebrow: "Questions",
  title: "Ask us anything",
  lead: "The things people ask first, answered by MeetFly itself.",
  window: "Ask MeetFly",
  next: "Next question",
  you: "You",
  name: "MeetFly",
  items: [
    {
      q: "Does a bot join my call?",
      a: "No. MeetFly listens on your own computer, so nobody sees an extra guest in the meeting.",
    },
    {
      q: "Which call apps does it work with?",
      a: "Zoom, Google Meet, Microsoft Teams, Webex, Slack huddles, Whereby, and any other call your computer can hear. You can also open Meet, Zoom, Teams, Webex and Whereby links right inside MeetFly.",
    },
    {
      q: "How fast is a suggested reply?",
      a: "It starts writing the moment the other person stops talking. In our own test call, replies appeared in about a second.",
    },
    {
      q: "Can it help when they speak another language?",
      a: "Yes. Their captions can be translated live into 14 languages, including Spanish, Hindi, French, German, Japanese, Chinese and Arabic.",
    },
    {
      q: "Where are my notes and recordings kept?",
      a: "On your computer. While you talk, audio and transcript text are sent to the speech and AI services MeetFly uses, so it can write down the call and suggest replies.",
    },
    {
      q: "Can I practise before a real call?",
      a: "Yes. Turn on Practice mode and your microphone plays the other person, so you can rehearse your answers first.",
    },
    {
      q: "Can I keep an eye on how much it uses?",
      a: "Yes. Settings show your usage, and you can set monthly limits on transcription minutes and AI requests.",
    },
    {
      q: "Which computers does it run on?",
      a: "MeetFly is a desktop app for Mac and Windows.",
    },
  ],
};

// The closing download band. While siteConfig.downloads has no links, the buttons say "Coming
// soon" and do nothing; add a URL there and they become real download links.
export const download = {
  eyebrow: "Ready when you are",
  title: "Walk into your next call with MeetFly",
  lead: "A desktop app for Mac and Windows. It sits beside any call app and helps from the first word.",
  mac: "Download for Mac",
  windows: "Download for Windows",
  soon: "Coming soon",
  points: ["No bot joins your call", "Works with any call app", "Notes stay on your computer"],
};

export const footer = {
  tagline: "Your AI copilot for every call.",
  groups: [
    {
      title: "Product",
      links: [
        { label: "All features", href: "/features" },
        { label: "Watch it work", href: "/#demo" },
        { label: "Note-taker vs copilot", href: "/#compare" },
        { label: "Before, during, after", href: "/#journey" },
        { label: "Every kind of call", href: "/#calls" },
        { label: "Answers your way", href: "/#answers" },
        { label: "Floating panel", href: "/#panel" },
        { label: "Live translation", href: "/#languages" },
      ],
    },
    {
      title: "More",
      links: [
        { label: "Live notes", href: "/#notes" },
        { label: "Meeting library", href: "/#library" },
        { label: "Use cases", href: "/use-cases" },
        { label: "Where your call goes", href: "/#privacy" },
        { label: "Getting started", href: "/#start" },
        { label: "Questions", href: "/#faq" },
        { label: "Download", href: "/#download" },
      ],
    },
  ],
  note: "Made for people who talk for a living.",
};

// ---------------------------------------------------------------------------------------------
// More sections (2026-11-16). Every feature named below is in the app's README and code.
// Voice changer, voice cloning and stealth mode are deliberately left out for now.
// ---------------------------------------------------------------------------------------------

// Product facts as numbers. No user counts. The reply time is from our own test call.
export const numbers = {
  label: "MeetFly in numbers",
  langs: ["ES", "HI", "JA", "FR", "DE", "ZH", "AR"],
  items: [
    { value: 14, label: "Languages for live translated captions", visual: "langs" },
    { value: 1, prefix: "~", suffix: "s", label: "To a suggested reply in our test call", visual: "speed" },
    { value: 5, label: "Call types with their own notes template, plus Other", visual: "dial" },
    { value: 8, label: "Keyboard shortcuts, some from any app", visual: "keys" },
    { value: 0, label: "Bots joining your call", visual: "nobot" },
  ],
};

// "Answers your way": answer styles, the Ask box and quick actions.
export const answers = {
  eyebrow: "Answers your way",
  title: "The right answer, in the shape you need",
  lead: "Pick how replies look, ask anything in your own words, or tap a quick action. MeetFly answers from the call and the context you gave it.",
  question: "How is this different from what we use now?",
  them: "Them",
  stylesLabel: "Answer style",
  stylesHint: "Same question, four ways to answer",
  colStyles: "Answer styles",
  colAsk: "Ask MeetFly",
  orAsk: "Or just ask",
  replyLabel: "MeetFly suggests",
  colAskNote: "Type any question. Answers use the call and your context.",
  styleNotes: { balanced: "A clear, complete reply", short: "One line you can say now", bullets: "Points to glance at", script: "Word for word, ready to read" },
  styles: [
    {
      key: "balanced",
      label: "Normal",
      reply:
        "Your current tool records the call. MeetFly helps you during it: it suggests what to say the moment they stop, checks facts, and writes the notes and follow-up for you.",
    },
    { key: "short", label: "Short", reply: "It helps you during the call, not just after it." },
    {
      key: "bullets",
      label: "Bullets",
      bullets: ["Suggests replies the moment they stop", "Fact-checks and reads your screen mid-call", "Writes notes and the follow-up email"],
    },
    {
      key: "script",
      label: "Script",
      reply:
        "“Great question. Most tools record the meeting and send a summary later. MeetFly works while we’re talking: it suggests replies, checks facts on the spot, and has my notes and follow-up ready when we hang up. Want me to show you on our next call?”",
    },
  ],
  ask: {
    label: "Ask MeetFly",
    typed: "What did they say about the budget?",
    answer: "They said the price is higher than their current tool, and they want to see the value first.",
  },
  actionsLabel: "Quick actions",
  actions: [
    { icon: "spark", label: "What should I say?" },
    { icon: "list", label: "Follow-up questions" },
    { icon: "recap", label: "Recap" },
    { icon: "check", label: "Fact-check" },
    { icon: "screen", label: "Read my screen" },
  ],
  screenNote: "Read my screen looks at what’s shared: questions, slides, even coding problems.",
};

// The floating panel and keyboard shortcuts.
export const panel = {
  eyebrow: "Stays out of your way",
  title: "A small panel that floats over any meeting",
  lead: "Put MeetFly where you want it. The see-through panel sits above your call, even in full screen, and shows the answer first.",
  drag: "Drag the panel",
  opacity: "Opacity",
  facts: ["Stays above full-screen meetings", "Remembers where you put it", "Opens by itself when you join in your browser", "Opacity slider, so the call shows through"],
  answerLabel: "Suggested reply",
  answer: "We can start next Monday, and the pilot is free for two weeks.",
  caption: "When could we start the pilot?",
  shortcutsTitle: "Everything is one key away",
  tryKeys: "Try it: press B, M or ⌘K",
  factIcons: ["layers", "pin", "browser", "eye"],
  shortcuts: [
    { keys: ["⌘", "Enter"], label: "What should I say?", code: "Enter", meta: true },
    { keys: ["⌘", "⇧", "S"], label: "Read my screen", code: "KeyS", meta: true, shift: true },
    { keys: ["B"], label: "Bookmark this moment", code: "KeyB" },
    { keys: ["M"], label: "Mute or unmute your mic", code: "KeyM" },
    { keys: ["⌘", "⇧", "O"], label: "Floating panel on or off", code: "KeyO", meta: true, shift: true },
    { keys: ["⌘", "⇧", "Space"], label: "Show or hide MeetFly from anywhere", code: "Space", meta: true, shift: true },
    { keys: ["⌘", "⇧", "Enter"], label: "What should I say?, from any app", code: "Enter", meta: true, shift: true },
    { keys: ["⌘", "K"], label: "Search and commands", code: "KeyK", meta: true },
  ],
  winNote: "On Windows, use Ctrl for ⌘.",
};

// Live notes and My notes.
export const notes = {
  eyebrow: "Notes that keep up",
  title: "Your notes write themselves while you talk",
  lead: "Jot rough notes like you would on paper. MeetFly keeps live notes as the call goes, then turns everything into full notes when you press End.",
  mine: { label: "My notes", lines: ["pilot 2 wks?", "price = main worry", "start Monday??", "send pricing"] },
  end: "End",
  full: {
    label: "Full notes",
    template: "Sales template",
    summary: "They like the proposal; price is the main worry. A free two-week pilot was offered.",
    sections: [
      { title: "Decisions", items: ["Run a two-week pilot, up to 10 seats"] },
      { title: "Action items", items: ["Send pricing for the yearly plan", "Book kickoff for Monday"] },
      { title: "Open questions", items: ["How many seats after the pilot?"] },
    ],
    kept: "Every point you wrote is kept",
  },
  live: {
    label: "Live notes",
    refresh: "Refreshes every 30 seconds",
    columns: [
      { title: "Summary", items: ["Proposal reviewed and liked", "Price is the main worry"] },
      { title: "Action items", items: ["Send yearly pricing"] },
      { title: "Open questions", items: ["Pilot start date and seats"] },
    ],
    bookmark: "Bookmark · 12:04",
  },
  // The rewrite sheet: your rough note (or none) → what it becomes in the full notes.
  sheet: {
    mineLabel: "My notes · during the call",
    fullLabel: "Full notes · after you press End",
    added: "Added from the transcript",
    rows: [
      { rough: "pilot 2 wks?", tag: "Decision", full: "Run a two-week pilot, up to 10 seats" },
      { rough: "price = main worry", tag: "Summary", full: "They like the proposal; price is the main worry" },
      { rough: "start Monday??", tag: "Action item", full: "Book the kickoff for Monday" },
      { rough: "send pricing", tag: "Action item", full: "Send pricing for the yearly plan" },
      { rough: null, tag: "Open question", full: "How many seats after the pilot?" },
      { rough: null, tag: "Follow-up email", full: "Drafted and ready to send" },
    ],
  },
  liveLine: "Price is the main worry compared to their current tool",
  points: ["Live notes refresh every 30 seconds", "Press B to bookmark a moment", "Full notes follow your call type’s template", "A follow-up email, ready to send"],
};

// The meeting library: search, ask across meetings, organise, export.
export const library = {
  eyebrow: "Every call, findable",
  title: "Your whole call history, one search away",
  lead: "Every meeting is saved with its notes, transcript and recording. Search them all, ask questions across them, and share what matters.",
  query: "pilot pricing",
  results: [
    { title: "Pilot call", date: "Today", tag: "Sales", excerpt: ["…the ", "pilot", " is free for two weeks, then ", "pricing", " is per seat…"], preview: { summary: "They like the proposal; price is the main worry.", items: ["Run a two-week pilot", "Send yearly pricing"], length: "24 min" } },
    { title: "Kickoff prep", date: "Tue", tag: "Meeting", excerpt: ["…agree the ", "pilot", " scope before Monday…"], preview: { summary: "Scope and owners for the pilot kickoff.", items: ["Share the launch checklist", "Confirm Monday start"], length: "18 min" } },
    { title: "Renewal chat", date: "Last week", tag: "Negotiation", excerpt: ["…asked for yearly ", "pricing", " with a discount…"], preview: { summary: "Renewal terms; they want a yearly discount.", items: ["Send a yearly quote", "Follow up Friday"], length: "31 min" } },
  ],
  searchIn: "Searches titles, notes, your notes and transcripts",
  searchLabel: "Search every meeting",
  found: "3 meetings",
  previewLabel: "Notes preview",
  askLabel: "Ask across all meetings",
  askQ: "What did clients say about price this month?",
  askA: "Price came up in 3 calls. Two wanted to see the value first; one asked for a yearly discount.",
  sample: "Sample meetings",
  organise: { title: "Tags and folders", tags: ["Sales", "Hiring", "Support", "Clients", "Team"] },
  exports: { title: "Share and export", items: ["Copy summary", "Follow-up email", "PDF", "Word", "Markdown"] },
  rewrite: "Rewrite notes as another template",
  palette: { title: "⌘K command bar", items: ["Paste a meeting link to join", "Jump anywhere", "Run any action", "Search every meeting"] },
};

// Calendar and how it works.
export const start = {
  eyebrow: "Getting started",
  title: "From your calendar to a better call",
  lead: "Connect your calendar once. Today’s and tomorrow’s meetings show up in MeetFly with one-click Join and Prepare.",
  calendars: ["Google Calendar", "Outlook", "iCloud"],
  connectNote: "Connected with a private calendar link",
  today: "Today",
  hours: [9, 10, 11, 12, 13, 14, 15, 16, 17],
  meetings: [
    { from: 9.5, to: 10, title: "Team stand-up", type: "Meeting" },
    { from: 11, to: 12, title: "Pilot call", type: "Sales", next: true },
    { from: 14, to: 14.75, title: "Support check-in", type: "Support" },
    { from: 15.5, to: 16.5, title: "Renewal chat", type: "Negotiation" },
  ],
  join: "Join",
  prepare: "Prepare",
  now: "Now",
  nowAt: 10.6,
  steps: [
    { n: "01", title: "Prepare", text: "Click Join or Prepare. Add your goal, background and any documents. It takes a minute and makes every suggestion sharper." },
    { n: "02", title: "Talk", text: "Start the meeting. MeetFly hears both sides on your computer, writes the transcript and suggests replies as you go." },
    { n: "03", title: "Press End", text: "Your notes, transcript, recording and follow-up email are saved in Meetings, ready to search and share." },
  ],
};

// "Speak any language": live caption translation. From the app's code: the other side's captions
// can be translated live into 14 languages (the list below). The translations of the sample line
// were written for the site; have a native speaker check them before launch.
export const languages = {
  eyebrow: "Live translation",
  title: "Hear them in their language. Read it in yours.",
  lead: "MeetFly translates the other side’s live captions as they speak, into any of 14 languages. Pick yours and follow every word.",
  them: "They say",
  you: "You read",
  live: "Translating live",
  original: "When can we start the pilot?",
  pick: "Pick your language",
  langs: [
    { code: "EN", name: "English", text: "When can we start the pilot?" },
    { code: "HI", name: "Hindi", text: "हम पायलट कब शुरू कर सकते हैं?" },
    { code: "ES", name: "Spanish", text: "¿Cuándo podemos empezar el piloto?" },
    { code: "FR", name: "French", text: "Quand pouvons-nous commencer le pilote ?" },
    { code: "DE", name: "German", text: "Wann können wir mit dem Pilotprojekt beginnen?" },
    { code: "PT", name: "Portuguese", text: "Quando podemos começar o piloto?" },
    { code: "IT", name: "Italian", text: "Quando possiamo iniziare il progetto pilota?" },
    { code: "JA", name: "Japanese", text: "試験導入はいつ始められますか？" },
    { code: "KO", name: "Korean", text: "파일럿은 언제 시작할 수 있나요?" },
    { code: "ZH", name: "Chinese", text: "我们什么时候可以开始试点？" },
    { code: "AR", name: "Arabic", text: "متى يمكننا بدء المرحلة التجريبية؟", rtl: true },
    { code: "RU", name: "Russian", text: "Когда мы можем начать пилотный проект?" },
    { code: "TA", name: "Tamil", text: "பைலட்டை எப்போது தொடங்கலாம்?" },
    { code: "BN", name: "Bengali", text: "আমরা কখন পাইলট শুরু করতে পারি?" },
  ],
};

// "Join from MeetFly" (replaces the plain Works-with strip; keeps the #platforms anchor). From
// the app: paste a Meet, Zoom, Teams, Webex or Whereby link (or click Join on a calendar meeting)
// and the meeting opens inside MeetFly; sign in once to Google, Microsoft or Zoom. Any other call
// (Slack huddles and the rest) works alongside, because MeetFly hears the call on your computer.
// The links below are made-up examples.
export const join = {
  eyebrow: "Works with",
  title: "Paste a link. MeetFly joins the call.",
  lead: "Meet, Zoom, Teams, Webex and Whereby open right inside MeetFly. Any other call works too.",
  flow: [
    { link: "meet.google.com/abc-defg-hij", app: "Google Meet" },
    { link: "zoom.us/j/8812345678", app: "Zoom" },
    { link: "teams.microsoft.com/l/meetup-join/…", app: "Microsoft Teams" },
    { link: "acme.webex.com/meet/pilot", app: "Webex" },
    { link: "whereby.com/pilot-call", app: "Whereby" },
  ],
  pasted: "Paste a link",
  joined: "Joined",
};

// "Built for": who MeetFly is for, by role. Roles only, never customers. Each role lists real
// features from the app. Interviews are shown as practice.
export const roles = {
  eyebrow: "Built for",
  title: "Made for people who talk for a living",
  lead: "Whatever your calls are about, MeetFly fits the way you work.",
  items: [
    { role: "Sales", line: "Handle objections and close the next step.", uses: ["Instant replies", "Fact-check", "Follow-up email"] },
    { role: "Support", line: "Solve it on the first call, calmly.", uses: ["Ask box", "Read my screen", "Notes after"] },
    { role: "Founders", line: "Pitch, negotiate and remember every promise.", uses: ["Call prep", "Live notes", "Ask across calls"] },
    { role: "Hiring", line: "Stay present in interviews, not buried in notes.", uses: ["Live transcript", "Structured notes", "Search past calls"] },
    { role: "Job seekers", line: "Rehearse until the real interview feels easy.", uses: ["Practice mode", "Answer styles", "Notes after"] },
    { role: "Multilingual teams", line: "Follow every word and answer with confidence.", uses: ["Live translation", "Short answers", "Live transcript"] },
  ],
};
