// Homepage copy. Every product claim here comes from the app's README or its code.
// The hero video is a real recording of the app, labelled with how it was made.

export const nav = {
  links: [
    { label: "Watch it work", href: "/#demo" },
    { label: "Works with", href: "/#platforms" },
  ],
  download: { label: "Download", href: "/#download" },
  live: "Live",
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
      points: ["Sales, interview, support, meeting or negotiation", "Attach documents and reuse saved profiles", "Practice mode: your mic plays the other person"],
      demo: {
        heading: "Prepare call",
        typeLabel: "Call type",
        types: ["Sales", "Interview", "Support", "Meeting", "Negotiation"],
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
