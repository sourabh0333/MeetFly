import { hoursText, planById, priceText, trialLine } from "./pricing";

// Homepage copy. Every product claim here comes from the app's README or its code.
// The hero video is a real recording of the app, labelled with how it was made.

// The main menu. Shaped like similar products' menus (Product and Use cases dropdowns), but only
// with what MeetFly really has: no Log in (no accounts), no Blog yet. Pricing (added 2026-11-24)
// shows the app's own plans and prices.
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
    { label: "Use cases", href: "/use-cases" },
    { label: "Pricing", href: "/pricing" },
    { label: "Privacy", href: "/privacy" },
    { label: "FAQ", href: "/faq" },
  ],
  download: { label: "Download", href: "/download" },
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
  lead: "MeetFly is an AI meeting assistant for Mac and Windows. It writes down both sides as you talk and suggests your reply the moment the other person stops, with no bot in the call.",
  primary: { label: "Download MeetFly", href: "/download" },
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
// Nothing on stealth mode. The price answer (added 2026-11-25) uses the plans in
// src/content/pricing.js: keep the numbers in step if those change. An item may carry a `link`.
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
      a: "Zoom, Google Meet, Microsoft Teams, Webex, Slack huddles, Whereby, and any other call your computer can hear. Zoom, Teams, Webex, Whereby and Slack huddle links open right inside MeetFly; Google Meet opens in your browser, with MeetFly floating over it.",
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
      a: "Yes. Settings → Usage shows this month’s transcription minutes, accent voice and AI requests, and you can set your own monthly limit on each.",
    },
    {
      q: "How much does it cost?",
      a: `There’s a Free plan with every feature: ${hoursText(planById.free.minutes)} of listening and ${hoursText(planById.free.voice)} of accent voice a month. Paid plans start at ${priceText("pro")} a month for ${hoursText(planById.pro.minutes)}. Every account starts with 7 days of Pro + Voice, no card needed.`,
      link: { label: "See all plans", href: "/pricing" },
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
  // Keep in step with the trial in src/content/pricing.js.
  trial: trialLine,
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
        { label: "Use cases", href: "/use-cases" },
        { label: "Pricing", href: "/pricing" },
        { label: "Privacy", href: "/privacy" },
        { label: "FAQ", href: "/faq" },
        { label: "Guides", href: "/guides" },
        { label: "Live notes", href: "/#notes" },
        { label: "Meeting library", href: "/#library" },
        { label: "Getting started", href: "/#start" },
        { label: "Download", href: "/download" },
      ],
    },
    {
      // The "works with" pages (content/platforms.js), linked from every page so search engines find them.
      title: "Works with",
      links: [
        { label: "Zoom", href: "/works-with/zoom" },
        { label: "Google Meet", href: "/works-with/google-meet" },
        { label: "Microsoft Teams", href: "/works-with/microsoft-teams" },
        { label: "Any other call", href: "/features#works-with" },
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
// the app (shared/meeting-links.ts, features/join/join.ts): paste a Zoom, Teams, Webex, Whereby or
// Slack huddle link (or click Join on a calendar meeting) and the meeting opens inside MeetFly;
// sign in once to Microsoft or Zoom. Google Meet always opens in your browser (Google refuses
// sign-in inside apps), with MeetFly floating over it. Any other call works alongside, because
// MeetFly hears the call on your computer. The links below are made-up examples.
export const join = {
  eyebrow: "Works with",
  title: "Paste a link. MeetFly joins the call.",
  lead: "Zoom, Teams, Webex, Whereby and Slack huddles open right inside MeetFly. Google Meet opens in your browser, with MeetFly over it, and any other call works too.",
  flow: [
    { link: "zoom.us/j/8812345678", app: "Zoom" },
    { link: "teams.microsoft.com/l/meetup-join/…", app: "Microsoft Teams" },
    { link: "acme.webex.com/meet/pilot", app: "Webex" },
    { link: "whereby.com/pilot-call", app: "Whereby" },
    { link: "app.slack.com/huddle/T0ACME/C0PILOT", app: "Slack huddle" },
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

// Pricing teaser on the homepage (2026-11-25), after "Built for". The plans, prices and hours come
// from src/content/pricing.js (the app's own defaults); only the words live here.
export const pricingTeaser = {
  eyebrow: "Pricing",
  title: "Every feature, on every plan.",
  lead: "Plans differ only in how many hours MeetFly listens each month, and whether the accent voice is included.",
  points: ["7 days of Pro + Voice free", "No card needed", "Change or cancel any time"],
  primary: { label: "See all plans", href: "/pricing" },
  secondary: { label: "Start free trial", href: "/download" },
  chartLabel: "Hours a month on each plan",
  listen: "Listening",
  voice: "Accent voice",
  calls: "about {n} one-hour calls",
  pass: "in 7 days",
  perPerson: "per person",
};

// "Accent voice" (2026-11-25), after Live translation. Every line is from the app: the accent page
// and docs (MeetFly-App: src/renderer/features/voice/*, docs/HOW-MEETFLY-WORKS.md). The voices are
// native to each accent (17 presets, feminine and masculine); the words go to "MeetFly Microphone",
// which the meeting app uses as its microphone; about 1–1.5 s behind; it says what speech
// recognition heard. Nothing about copying your own voice ("My voice" is left out on purpose).
export const accent = {
  eyebrow: "Accent voice",
  title: "Your words, in the accent you choose.",
  lead: "Turn it on and the people on your call hear what you say, spoken by a voice native to the accent you picked.",
  sentence: ["Thanks", "for", "joining.", "Let", "me", "walk", "you", "through", "the", "plan."],
  you: { title: "You say", hint: "your microphone" },
  they: { title: "They hear", hint: "MeetFly Microphone" },
  lag: "about 1–1.5 s behind",
  accentLabel: "Accent",
  voiceLabel: "Voice",
  voices: ["Feminine", "Masculine"],
  toneLabel: "Tone",
  tones: ["Natural", "Calm", "Warm", "Neutral", "Soft", "Firm"],
  bankLabel: "Up to 17 English accents",
  accents: [
    "American",
    "British",
    "Australian",
    "Indian",
    "Canadian",
    "Irish",
    "Scottish",
    "New Zealand",
    "South African",
    "Southern US",
    "New York",
    "Californian",
    "Midwestern US",
    "African American",
    "Singaporean",
    "Filipino",
    "Arabic English",
  ],
  facts: [
    {
      title: "Set up once",
      text: "On Mac, MeetFly installs MeetFly Microphone: pick it as the microphone in Meet, Zoom or Teams. On Windows, meetings that open inside MeetFly hear it with nothing to set up.",
    },
    {
      title: "Honest about timing",
      text: "The voice runs about 1 to 1.5 seconds behind you, and says what speech recognition heard.",
    },
    {
      title: "On Pro + Voice and the Pass",
      text: `${hoursText(planById.pro_voice.voice)} a month on Pro + Voice, ${hoursText(planById.interview_pass.voice)} in the Interview Pass’s 7 days. Free has ${hoursText(planById.free.voice)} to try it.`,
      link: { label: "See plans", href: "/pricing" },
    },
  ],
};

// "Make it mid-call" (2026-11-25), after the Floating panel. From the app (MeetFly-App
// src/server/session/commands.ts, meeting-tools.ts, src/renderer/features/live/CreatedTab.tsx):
// say "MeetFly, …" into your microphone or type it in the Ask box (or /doc, /diagram, /slides);
// it is made from the conversation so far, streams in as it is written and is saved with the
// meeting (Created tab: Copy, Export .md, Delete). The examples follow the homepage's pilot call.
export const make = {
  eyebrow: "Make it mid-call",
  title: "Ask for a doc, a diagram or slides. Get it before the call ends.",
  lead: "Say “MeetFly, …” or type it, and MeetFly makes it from the conversation so far.",
  requestsLabel: "Ask for",
  working: "Working on it from the conversation so far…",
  saved: "Saved with the meeting",
  actions: ["Copy", "Export .md"],
  items: [
    {
      kind: "diagram",
      tag: "Diagram",
      how: "Said",
      ask: "MeetFly, make a flowchart of the pilot rollout.",
      title: "Pilot rollout",
      nodes: ["Kickoff Monday", "Set up 10 seats", "Two-week pilot", "Did it work?", "Yearly plan", "Extend the pilot"],
    },
    {
      kind: "doc",
      tag: "Doc",
      how: "Typed",
      ask: "/doc follow-up plan",
      title: "Pilot follow-up plan",
      blocks: [
        { h: "Goal" },
        { p: "Prove the value in two weeks, with 10 seats." },
        { h: "Next steps" },
        { li: "Send pricing for the yearly plan" },
        { li: "Book the kickoff for Monday" },
        { li: "Share the setup guide before the pilot" },
        { h: "Open question" },
        { p: "Who signs off on the yearly plan?" },
      ],
    },
    {
      kind: "slides",
      tag: "Slides",
      how: "Said",
      ask: "MeetFly, draft slides for Monday’s kickoff.",
      title: "Pilot kickoff",
      slides: [
        { t: "Pilot kickoff", s: "Two weeks · 10 seats" },
        { t: "How the two weeks run", s: "Setup · daily use · review" },
        { t: "What success looks like", s: "Agreed before we start" },
      ],
    },
  ],
  points: [
    { title: "Say it or type it", text: "“MeetFly, …” into your microphone, the Ask box, or /doc, /diagram and /slides." },
    { title: "From the call so far", text: "Plans, summaries, emails, agendas, flowcharts, mind maps, timelines, slide outlines." },
    { title: "Saved with the meeting", text: "Find it in Created after the call. Copy it, or export it as Markdown." },
  ],
};

// "Where your notes go" (2026-11-25), after the Library. From the app (MeetFly-App
// src/renderer/features/meetings/ExportMenu.tsx, src/renderer/lib/export.ts,
// src/server/services/webhook.ts): copy (summary, Markdown, rich text, for Slack), email the
// follow-up in your mail app, save as PDF / Word (.docx) / Markdown (.md), send to a webhook
// (Zapier, Make, n8n, or a Slack incoming webhook) as JSON. The webhook's field names are the
// app's own; the transcript only if you choose; the call's private context is never sent.
export const share = {
  eyebrow: "Share and export",
  title: "Your notes, wherever your team works.",
  lead: "Copy them, save them as a file, email the follow-up, or send them on to Zapier, Make, n8n or Slack.",
  meeting: { title: "Pilot call", meta: "Today · 24 min · Sales" },
  summary: "They like the proposal; price is the main worry. We agreed a two-week pilot for 10 seats.",
  actions: [
    { task: "Send pricing for the yearly plan", owner: "You", due: "Friday" },
    { task: "Book the kickoff for Monday", owner: "You", due: "" },
  ],
  email: {
    to: "Everyone invited",
    subject: "Follow-up: Pilot call",
    body: "Hi, thanks for your time today. As promised, here’s the plan for the two-week pilot…",
  },
  groups: [
    {
      id: "copy",
      label: "Copy",
      items: [
        { id: "summary", label: "Summary", hint: "plain text", view: "summary" },
        { id: "markdown", label: "Markdown", hint: "for docs and wikis", view: "markdown" },
        { id: "rich", label: "Rich text", hint: "keeps the formatting", view: "page" },
        { id: "slack", label: "For Slack", hint: "paste into a channel", view: "slack" },
      ],
    },
    {
      id: "save",
      label: "Save",
      items: [
        { id: "pdf", label: "PDF", hint: "pilot-call.pdf", view: "page", file: "pilot-call.pdf" },
        { id: "word", label: "Word", hint: "pilot-call.docx", view: "page", file: "pilot-call.docx" },
        { id: "md", label: "Markdown file", hint: "pilot-call.md", view: "markdown", file: "pilot-call.md" },
      ],
    },
    {
      id: "send",
      label: "Send",
      items: [
        { id: "email", label: "Follow-up email", hint: "opens in your mail app", view: "email" },
        { id: "webhook", label: "Webhook", hint: "Zapier · Make · n8n", view: "json", target: "POST https://hooks.zapier.com/…" },
        { id: "slack-hook", label: "Slack webhook", hint: "straight to a channel", view: "slack", target: "POST https://hooks.slack.com/…" },
      ],
    },
  ],
  previewLabel: "What lands",
  facts: [
    { title: "Your context stays private", text: "The notes you gave MeetFly before the call are never sent with a webhook." },
    { title: "Transcript only if you choose", text: "A webhook sends the notes; add the full transcript with one switch." },
    { title: "Set it once", text: "Save a default webhook in Settings, then send any meeting in one click." },
  ],
};
