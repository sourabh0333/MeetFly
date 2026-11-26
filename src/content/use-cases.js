// The Use cases page. Each role shows one moment from its kind of call as video: the other person
// (a Mixkit stock clip, free licence, none from the homepage's shoots, with a voice made by the app's own speech service) and
// MeetFly's floating panel, a real, unedited recording of the app answering that line in a
// practice call (recorded 2026-11-20; files in public/video/use-cases). `them` is what the app
// heard, `reply` is the first paragraph of the answer it wrote, word for word. `video` times are in
// seconds of the panel video: talk = when they speak, replyAt = when the answer starts. Every
// feature named is one the app has. The Interview call type and template are written for the
// candidate, so Hiring uses Team meeting.

export const useCasesPage = {
  eyebrow: { tag: "6 roles", text: "One copilot, many kinds of calls" },
  title: { top: "Made for people", prefix: "who talk for a", mark: "living." },
  lead: "Sales calls, support calls, pitches, interviews on either side of the table, and calls in another language. See how MeetFly helps in each.",
  primary: { label: "Download MeetFly", href: "/download" },
  secondary: { label: "See all features", href: "/features" },
  example: "Example moment",
  them: "Them",
  meetfly: "MeetFly suggests",
  usesLabel: "Uses",
  typeLabel: "Call type",
  takes: "Six calls, one recording. Pick a take.",
  goalLabel: "Goal",
  cols: { them: "They say", rail: "What MeetFly does", panel: "MeetFly’s panel" },
  real: "Real recording",
  drag: "Drag me",
  panelName: "MeetFly",
  panelHint: "MeetFly’s panel. Drag it, or focus it and use the arrow keys, to move it around the call.",
  speaking: "Speaking",
  listening: "Listening",
  steps: [
    { key: "hears", title: "Hears them", text: "Captions every word as it’s said. No bot joins the call." },
    { key: "turn", title: "Waits for the turn to end", text: "Reads the question with your call type, goal and notes." },
    { key: "reply", title: "Suggests a reply", text: "In a small panel beside your call, ready to say." },
    { key: "points", title: "Adds the key points", text: "Short bullets under it, and one click to copy." },
  ],
  sound: { on: "Sound on", off: "Sound off" },
  replay: "Replay",
  note: "MeetFly’s panel is a real, unedited recording of the app in a practice call; the answer is what it wrote. The other person is a stock clip with a generated voice.",
};

export const roles = [
  {
    id: "sales",
    at: "12:04",
    role: "Sales",
    line: "Handle objections and close the next step.",
    goal: "Agree a two-week pilot",
    type: "Sales",
    them: "Can you do a better price if we sign this quarter?",
    reply: "We can't change the monthly rate, but if you sign annually, you get 15% off. The best way to lock in end-of-quarter terms is to start a free two-week pilot next Monday so your team can test it out.",
    uses: ["Instant replies", "Fact-check", "Follow-up email"],
    call: "Pilot call · Northwind",
    who: "Client · Northwind",
    video: { length: 10.64, talk: [0.85, 2.59], replyAt: 4.14 },
  },
  {
    id: "support",
    at: "03:41",
    role: "Support",
    line: "Solve it on the first call, calmly.",
    goal: "Get the customer's export working today",
    type: "Customer support",
    them: "The export keeps failing on large files. It just stops at 90%.",
    reply: "I am so sorry about that frustration—it looks like you are hitting a known limit with our large Excel exports right now. A permanent fix is coming next Tuesday, but we can definitely get your data out today using a quick workaround.",
    uses: ["Ask box", "Read my screen", "Customer sentiment in notes"],
    call: "Export issue · Ticket 4182",
    who: "Customer · Ticket 4182",
    video: { length: 12.81, talk: [0.85, 4.98], replyAt: 6.31 },
  },
  {
    id: "founders",
    at: "18:27",
    role: "Founders",
    line: "Pitch, negotiate and remember every promise.",
    goal: "Get a second meeting with the partners",
    type: "Negotiation",
    them: "What happens if a bigger company copies this?",
    reply: "They could try, but those EHR integrations took us a full year to build and secure. Plus, big software companies rarely build for small clinics because the workflows are too niche, while we iterate with our users every single week.",
    uses: ["Call prep", "Make it mid-call", "Ask across meetings"],
    call: "Seed round · Harbor Ventures",
    who: "Investor · Harbor Ventures",
    video: { length: 10.21, talk: [0.85, 2.61], replyAt: 3.71 },
  },
  {
    id: "hiring",
    at: "09:15",
    role: "Hiring",
    line: "Stay present in interviews, not buried in notes.",
    goal: "Decide if the candidate goes to the final round",
    type: "Team meeting",
    them: "In my last role, I cut new customer onboarding time in half.",
    reply: "That's a huge improvement. Could you walk me through specifically what you owned in that project and how you measured the results?",
    uses: ["Live transcript", "Follow-ups", "Search every meeting"],
    call: "Interview · Senior product designer",
    who: "Candidate · Product designer",
    video: { length: 12.5, talk: [0.85, 4.44], replyAt: 6.0 },
  },
  {
    id: "job-seekers",
    at: "06:52",
    role: "Job seekers",
    line: "Rehearse until the real interview feels easy.",
    goal: "Land the customer success manager role",
    type: "Interview",
    them: "Tell me about a time you handled a difficult customer.",
    reply: "At Brightdesk, a key account had a major data import failure just two days before launch, and they were understandably furious. I got on a call with their team immediately, coordinated with engineering to resolve the issue in two hours, and kept them updated daily through launch. Because of how we handled the crisis, they ended up renewing their contract for two more years.",
    uses: ["Practice mode", "Answer length", "How I answered in notes"],
    call: "Practice · Customer success interview",
    who: "Interviewer · Practice round",
    video: { length: 10.72, talk: [0.85, 3.15], replyAt: 4.22 },
  },
  {
    id: "multilingual-teams",
    at: "21:33",
    role: "Multilingual teams",
    short: "Multilingual",
    line: "Follow every word and answer with confidence.",
    goal: "Agree the new delivery date",
    type: "Team meeting",
    them: "Hola, ¿podemos mover la entrega al viernes?",
    lang: "es",
    reply: "Hola, we can move it to Friday as long as testing is fully wrapped up by Wednesday evening and we notify the client today. Does that timeline work for your team?",
    uses: ["Live translation", "Accent voice", "Short answers"],
    call: "Weekly sync · Madrid team",
    who: "Madrid team · Weekly sync",
    video: { length: 9.93, talk: [0.85, 2.37], replyAt: 3.43 },
  },
];

// "Set up for your kind of call": how each role fills in MeetFly's New meeting form (the fields are
// the app's own: call type, goal, notes for the AI, documents, record, practice; answer length is
// picked in the panel; translation is a setting) and the notes template that call type produces
// (sections word for word from the app's NOTE_TEMPLATES, see templates in content/features.js).
// The goals and notes match the practice calls recorded for the hero.
export const setup = {
  eyebrow: "How each role uses it",
  title: "One call, set up for your role",
  lead: "Tell MeetFly what the call is for, and it answers and writes your notes in that shape. Save it as a profile and it’s one click next time.",
  types: ["Team meeting", "Sales", "Interview", "Customer support", "Negotiation", "Other"],
  lengths: ["Short", "Normal", "Bullets", "Script"],
  stages: [
    { n: "01", when: "Before", title: "You set it up", note: "In the New meeting form" },
    { n: "02", when: "During", title: "MeetFly helps", note: "In the floating panel" },
    { n: "03", when: "After", title: "You get back", note: "In your meeting notes" },
  ],
  labels: {
    type: "Call type",
    goal: "Goal",
    notes: "Notes for the AI",
    files: "Documents",
    length: "Answer length",
    reply: "Its answer",
    options: "Switched on",
    template: "Notes template",
    sectionsLabel: "Sections",
    profile: "Next time",
  },
  sections: "sections",
  replyNote: "From the recording above",
  saved: "Saved as a profile",
  roles: {
    sales: {
      title: "Pilot call · Northwind",
      notes: "We sell Acme Analytics. Pilot: two weeks, free, up to 10 seats. $12 a seat a month, 15% off yearly.",
      files: ["pricing.pdf", "case-study.pdf"],
      length: "Short",
      extras: [["Record the meeting", true], ["Practice", false]],
      template: ["Summary", "Customer needs and pain points", "Budget, authority, need and timeline", "Objections and how they were handled", "Action items", "Next steps", "Follow-up email draft"],
    },
    support: {
      title: "Export issue · Ticket 4182",
      notes: "Known issue: exports over 50,000 rows time out. Workaround: one week at a time, or CSV. Fix ships Tuesday.",
      files: ["export-guide.md", "known-issues.csv"],
      length: "Bullets",
      extras: [["Record the meeting", true], ["Practice", false]],
      template: ["Summary", "Issue reported", "Troubleshooting steps taken", "Resolution", "Action items", "Customer sentiment", "Follow-up email draft"],
    },
    founders: {
      title: "Seed round · Harbor Ventures",
      notes: "140 clinics pay us, 18% growth a month, churn under 2%. Six record-system integrations took a year.",
      files: ["deck.pdf", "metrics.csv"],
      length: "Normal",
      extras: [["Record the meeting", true], ["Practice", false]],
      template: ["Summary", "Positions of each side", "Concessions offered", "Agreed terms", "Open issues", "Action items", "Follow-up email draft"],
    },
    hiring: {
      title: "Interview · Senior product designer",
      notes: "I’m the hiring manager. Look for evidence: what they owned, how they measured it, what they learned.",
      files: ["job-description.pdf", "candidate-cv.pdf"],
      length: "Short",
      extras: [["Record the meeting", true], ["Practice", false]],
      template: ["Summary", "Key points", "Decisions", "Action items", "Open questions", "Follow-up email draft"],
    },
    "job-seekers": {
      title: "Practice · Customer success interview",
      notes: "Applying to Lumen. My story: a failed import two days before a client’s launch, fixed in two hours.",
      files: ["my-cv.pdf", "job-post.txt"],
      length: "Script",
      extras: [["Record the meeting", true], ["Practice", true]],
      template: ["Summary", "Questions asked", "How I answered", "What to improve next time", "Action items", "Thank-you email draft"],
    },
    "multilingual-teams": {
      title: "Weekly sync · Madrid team",
      notes: "Release due Wednesday. Friday works if testing is confirmed by Wednesday evening. Reply in English.",
      files: ["release-plan.md"],
      length: "Short",
      extras: [["Record the meeting", true], ["Translate their words to English", true], ["Turn my accent on", true]],
      template: ["Summary", "Key points", "Decisions", "Action items", "Open questions", "Follow-up email draft"],
    },
  },
};

// "From your calendar to wherever your notes go": a switchboard. Every source and destination the
// app really supports is a port (checked 2026-11-17/20 against its code): calendars by private link
// (Google, Outlook, iCloud); joining Meet, Zoom, Teams, Webex, Whereby and Slack huddles inside MeetFly, or a
// pasted link, or Practice mode; export as PDF, Word, Markdown, rich text, copy for Slack, "Open in
// mail app" for the follow-up email, and a webhook to Zapier, Make or n8n. Each role lights a
// typical set of ports; `makes` are sections from that call type's real notes template (or a live
// feature). Typical setups, not requirements. Names only, no brand logos.
export const tools = {
  eyebrow: "Works with your tools",
  title: "From your calendar to wherever your notes go",
  lead: "MeetFly sits between the tools you already use. Pick a role to see how it’s usually wired.",
  sourcesTitle: "Calls come from",
  destsTitle: "Notes go to",
  sources: [
    { group: "Calendars", note: "by private link", items: ["Google Calendar", "Outlook", "iCloud"] },
    { group: "Call apps", note: "joined inside MeetFly", items: ["Meet", "Zoom", "Teams", "Webex", "Whereby", "Slack huddle"] },
    { group: "On your own", note: "", items: ["Pasted link", "Practice mode"] },
  ],
  dests: [
    { group: "Share", note: "", items: ["Open in mail app", "Slack", "Rich text"] },
    { group: "Files", note: "", items: ["PDF", "Word", "Markdown"] },
    { group: "Automate", note: "by webhook", items: ["Zapier", "Make", "n8n"] },
  ],
  hub: { makes: "Hands you", type: "Call type", prev: "Previous role", next: "Next role" },
  rows: {
    sales: { from: ["Google Calendar", "Zoom"], makes: ["Objections and how they were handled", "Next steps", "Follow-up email draft"], to: ["Open in mail app", "Slack", "Zapier"] },
    support: { from: ["Outlook", "Teams"], makes: ["Troubleshooting steps taken", "Resolution", "Customer sentiment"], to: ["Markdown", "n8n"] },
    founders: { from: ["Google Calendar", "Meet"], makes: ["Agreed terms", "Slide outline, made mid-call", "Follow-up email draft"], to: ["PDF", "Word", "Slack"] },
    hiring: { from: ["Outlook", "Teams"], makes: ["Key points", "Decisions", "Open questions"], to: ["PDF", "Slack", "Make"] },
    "job-seekers": { from: ["Pasted link", "Practice mode"], makes: ["Questions asked", "How I answered", "What to improve next time"], to: ["Word", "Markdown", "Open in mail app"] },
    "multilingual-teams": { from: ["iCloud", "Webex", "Whereby"], makes: ["Captions in English, live", "Decisions", "Action items"], to: ["Rich text", "Slack", "Markdown"] },
  },
  facts: [
    "Calendars connect with a private link",
    "Sign in once to Google, Microsoft or Zoom",
    "Webhooks only send when you ask",
  ],
  note: "Typical setups. Every role can use every tool.",
};

// "Questions each role asks": two per role, answered only with what the app does (checked against
// its code and content/features.js). `features` are ids in featureGroups; the tags link to
// /features#<id>. Nothing about stealth or screen-share hiding (parked by the owner) and never
// "100% local": audio and transcript text go to the speech and AI services.
export const ask = {
  eyebrow: "Questions by role",
  title: "Ask what your role would ask",
  lead: "The questions people ask before their first call, answered by what MeetFly actually does.",
  answerLabel: "MeetFly",
  related: "In the app",
  moreLinks: [
    { label: "All common questions", href: "/#faq" },
    { label: "See every feature", href: "/features" },
  ],
  items: [
    { role: "sales", q: "Can it use my real prices and terms?", a: "Yes. Before the call, add notes for the AI and attach documents (PDF, text, Markdown, CSV or JSON). Its replies use them, so it quotes your actual pilot, price and discount.", features: ["call-prep", "profiles"] },
    { role: "sales", q: "Will the client see a bot in the call?", a: "No. No bot joins your meeting. MeetFly listens on your computer and shows its help in a small panel you can move or make see-through.", features: ["floating-panel"] },
    { role: "support", q: "Can it help with what the customer is sharing?", a: "Yes. Read my screen looks at what’s shared, like an error message or a settings page, and answers with that in mind.", features: ["read-my-screen", "ask-box"] },
    { role: "support", q: "Where do the notes go after the call?", a: "They’re saved on your computer in the Customer support template: issue, steps taken, resolution, sentiment. Copy them as Markdown or for Slack, or send them to Zapier, Make or n8n with a webhook.", features: ["notes", "export"] },
    { role: "founders", q: "Can I ask about earlier calls with the same investor?", a: "Yes. Search every meeting by word, or ask a question and get an answer drawn from all your past calls.", features: ["library", "ask-across"] },
    { role: "founders", q: "Can it make slides or a doc while we talk?", a: "Yes. Say or type “MeetFly, make a slide outline for the pilot plan” and it builds one from the call, saved with the meeting and ready to copy or export. Docs and diagrams work the same way.", features: ["created", "voice-commands"] },
    { role: "founders", q: "Where is my call data kept?", a: "Notes, transcripts and recordings are saved on your computer. While you talk, audio and transcript text are sent to the speech and AI services MeetFly uses, so it can write down the call and answer.", features: ["privacy"] },
    { role: "hiring", q: "Should I tell the candidate MeetFly is on?", a: "MeetFly reminds you to ask for consent at the start, with a notice you can paste into the meeting chat. Recording is your choice, and you can turn it off.", features: ["recording"] },
    { role: "hiring", q: "Which template fits interviews I run?", a: "Use Team meeting: key points, decisions, open questions and a follow-up. The Interview template is written for the candidate’s side.", features: ["notes", "rewrite"] },
    { role: "job-seekers", q: "Can I practise without a real interviewer?", a: "Yes. In Practice mode your microphone plays the other person: read the question aloud and MeetFly answers as it would in the real interview.", features: ["practice", "answer-styles"] },
    { role: "job-seekers", q: "Will it tell me what to improve?", a: "The Interview notes list the questions asked, how you answered, and what to improve next time, plus a thank-you email draft.", features: ["notes", "follow-up"] },
    { role: "multilingual-teams", q: "Which languages can it translate?", a: "Fourteen: English, Hindi, Spanish, French, German, Portuguese, Italian, Japanese, Korean, Chinese, Arabic, Russian, Tamil and Bengali. Their words are translated into yours, live.", features: ["live-translation", "live-transcript"] },
    { role: "multilingual-teams", q: "Can people hear me in a different accent?", a: "Yes, with accent voice. After each sentence, the people on your call hear it spoken by a native voice in the accent you pick, about 1 to 1.5 seconds later. There are 17 English accents, on Pro + Voice and the Interview Pass.", features: ["accent", "live-translation"] },
    { role: "multilingual-teams", q: "Will its replies be in my language?", a: "Say so in the notes for the AI, like “Reply in English”, and it answers in that language even when the other side speaks another.", features: ["call-prep", "live-replies"] },
  ],
};

// "More calls it fits": roles beyond the six above, each with one example line and the call type
// to pick (Other covers anything without its own template). Every feature named is in the app.
// Online calls only: MeetFly hears your microphone and your computer's audio.
export const moreRoles = {
  eyebrow: "And more",
  title: "More calls it fits",
  lead: "Any call where you need to listen, answer well and remember what was said. A few more we hear about:",
  typeLabel: "Call type",
  usesLabel: "Uses",
  them: "They say",
  templatesLink: { label: "See every notes template", href: "/features#templates" },
  items: [
    { id: "customer-success", role: "Customer success", short: "Customer success", call: "Renewal check-in", them: "We’re not sure the team uses it enough to renew.", type: "Sales", uses: ["Call prep", "Instant replies", "Ask across meetings"] },
    { id: "consultants", role: "Consultants and agencies", short: "Consultants", call: "Weekly client sync", them: "Remind me what we agreed on the timeline last week?", type: "Team meeting", uses: ["Ask across meetings", "Live notes", "Follow-up email"] },
    { id: "research", role: "Product and user research", short: "User research", call: "User interview", them: "Honestly, I just export it to a spreadsheet every Friday.", type: "Other", uses: ["Live transcript", "Follow-ups", "Search every meeting"] },
    { id: "managers", role: "Managers and 1:1s", short: "Managers", call: "Weekly one-on-one", them: "I’m not sure I’m ready to lead the next project.", type: "Team meeting", uses: ["Call prep", "Live notes", "Action items"] },
    { id: "education", role: "Teachers and students", short: "Teachers", call: "Online class or office hours", them: "Could you go over the last part again?", type: "Other", uses: ["Live transcript", "Live notes", "Ask box"] },
    { id: "presenters", role: "Presenters and trainers", short: "Presenters", call: "Live demo or workshop", them: "How is this different from what we use now?", type: "Other", uses: ["Read my screen", "Instant replies", "Answer length"] },
  ],
};

// "Which plan fits your calls?" (2026-11-26, after More calls it fits): a suggested plan for each
// role, labelled as a suggestion. Plans, prices and hours come from src/content/pricing.js; only
// the reasons live here. Every plan has every feature; plans differ in hours and accent voice.
// Interviews are framed as practice.
export const planByRole = {
  eyebrow: "Plans by role",
  title: "Which plan fits your calls?",
  lead: "Every plan has every feature, so pick by how much you talk and whether you want the accent voice. Every account starts with 7 days of Pro + Voice free.",
  rolesLabel: "Your calls",
  plansLabel: "A good place to start",
  listen: "listening",
  voice: "accent voice",
  noVoice: "no accent voice",
  why: "Why",
  more: { label: "Compare every plan", href: "/pricing" },
  roles: [
    { id: "sales", plan: "pro", why: "You’re on calls most days. 20 hours a month is about an hour of calls every working day." },
    { id: "support", plan: "pro", why: "Every feature for your own calls. If the whole support team uses it, Team gives each person their own 20 hours." },
    { id: "founders", plan: "pro", why: "Pitches, investor updates and customer calls, all searchable later, with 20 hours a month." },
    { id: "hiring", plan: "team", why: "Everyone on the hiring panel gets their own 20 hours a month, billed per person." },
    { id: "job-seekers", plan: "interview_pass", why: "A week of interview practice ahead? 20 hours over 7 days with accent voice included. One payment, no subscription." },
    { id: "multilingual-teams", plan: "pro_voice", why: "Live translation is on every plan. Pro + Voice adds 8 hours of accent voice a month, so people hear you in the accent you pick." },
    { id: "trying", label: "Just trying it", plan: "free", why: "3 hours of listening and 10 minutes of accent voice every month, with every feature. Free for good." },
  ],
};

// The close of the Use cases page: the bookend to the hero (shared styles with the Features close).
export const ucClose = {
  eyebrow: "Whatever you talk about",
  before: "Your calls.",
  after: "Your copilot.",
  lead: "Set it up for your kind of call once, and MeetFly helps from the first word to the follow-up.",
  mac: "Download for Mac",
  windows: "Download for Windows",
  soon: "Coming soon",
  features: { label: "See every feature", href: "/features" },
  // Keep in step with the trial in src/content/pricing.js.
  trial: { tag: "7 days free", text: "Every account starts with Pro + Voice. No card needed.", link: { label: "See plans", href: "#plans" } },
  jumpLabel: "Jump back to a role",
};
