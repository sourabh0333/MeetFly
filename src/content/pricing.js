// The Pricing page. Plans, prices and monthly allowances are the app's own defaults, read from its
// code on 2026-11-24 (MeetFly-App/MeetFly backend/src/remote-config.ts: DEFAULT_PLANS,
// DEFAULT_PLAN_LIMITS, trial). The live values live in Firestore `config/app` and can change without
// a release: if they do, change them here too. Plans differ only in monthly minutes (listening and
// accent voice); every feature is on every plan (nothing else is gated in the code). The trial
// wording is the app's own (src/shared/trial.ts). No "most popular" badges: we have no data for it.

export const pricingPage = {
  eyebrow: { tag: "Pricing", text: "7 days free · No card needed" },
  title: { top: "Every feature, every plan.", prefix: "Pay for the", mark: "hours.", suffix: "" },
  lead: "Plans differ only in how many hours MeetFly listens each month and whether the accent voice is included. Start with 7 days of Pro + Voice, free.",
  currency: { label: "Prices in", usd: "USD", inr: "INR" },
  scaleNote: "Hours a month MeetFly listens to your calls",
  voiceLabel: "Accent voice",
  listenLabel: "Listening",
  equals: "about {n} one-hour calls",
  included: "Every feature",
  trialBadge: "Free for 7 days",
  footnote: "Allowances reset each month and don’t roll over. Team is priced per person.",
  // The plan stage under the headline.
  stage: {
    tabsLabel: "Plans",
    hoursCentre: "a month",
    voicePlus: "+ {v} accent voice",
    noVoice: "no accent voice",
    rows: { listen: "Listening", voice: "Accent voice", features: "Features", billing: "Billing" },
    notIncluded: "Not included",
    everyFeature: "Every feature",
    compare: "Compare all plans",
    findTitle: "Not sure?",
    findLead: "Find my plan",
    fits: "Fits your answers",
    trial: "7 days of Pro + Voice free when you sign up",
  },
  // The plan finder: it only picks among the plans above and does the sums.
  finder: {
    hoursLabel: "Your call hours a month",
    hoursUnit: "hours",
    calls: "about {n} one-hour calls",
    optionsLabel: "Options",
    voice: "Accent voice",
    voiceHint: "Speak in another accent",
    people: "People",
    fitLabel: "Fits you",
    perHour: "≈ {v} per call hour",
    free: "Free, every month",
    times: "{p} × {n} people",
    over: "Plans include up to 20 h a month each.",
    teamVoice: "Team has no accent voice: anyone who needs it can take Pro + Voice.",
    marks: [
      { at: 3, label: "Free" },
      { at: 20, label: "Pro" },
    ],
    max: 30,
    covers: "Covers your {h} h",
    short: "{d} h short of your {h} h",
    eachCovers: "Covers your {h} h each",
  },
};

const HOUR = 60;

// In display order. `minutes`: monthly allowance; `voice`: accent-voice minutes (0 = not included).
export const plans = [
  {
    id: "free",
    billing: "Free forever",
    name: "Free",
    who: "Try it on real calls.",
    usd: 0,
    inr: 0,
    period: "forever",
    minutes: 3 * HOUR,
    voice: 10,
    cta: { label: "Download free", href: "/download" },
    points: ["Every feature", "3 hours of listening a month", "10 minutes of accent voice"],
  },
  {
    id: "pro",
    billing: "Monthly · change or cancel any time",
    name: "Pro",
    who: "For people on calls every day.",
    usd: 29,
    inr: 1999,
    period: "a month",
    minutes: 20 * HOUR,
    voice: 0,
    cta: { label: "Start free trial", href: "/download" },
    points: ["Every feature", "20 hours of listening a month", "No accent voice"],
  },
  {
    id: "pro_voice",
    billing: "Monthly · change or cancel any time",
    name: "Pro + Voice",
    who: "Pro, plus your words in another accent.",
    usd: 49,
    inr: 3499,
    period: "a month",
    minutes: 20 * HOUR,
    voice: 8 * HOUR,
    trial: true,
    cta: { label: "Start free trial", href: "/download" },
    points: ["Every feature", "20 hours of listening a month", "8 hours of accent voice"],
  },
  {
    id: "team",
    billing: "Per person, monthly",
    name: "Team",
    who: "Pro for everyone on your team.",
    usd: 39,
    inr: 2799,
    period: "person a month",
    minutes: 20 * HOUR,
    voice: 0,
    cta: { label: "Start free trial", href: "/download" },
    points: ["Every feature", "20 hours each, a month", "Billed per person"],
  },
];

// Sold for a fixed week rather than a month.
export const pass = {
  id: "interview_pass",
  billing: "One payment, 7 days, no subscription",
  name: "Interview Pass",
  who: "A big week coming? Everything in Pro + Voice for 7 days. No subscription.",
  usd: 29,
  inr: 1999,
  period: "for 7 days",
  minutes: 20 * HOUR,
  voice: 8 * HOUR,
  days: 7,
  cta: { label: "Get the pass", href: "/download" },
};

// "Compare plans", the section under the hero: any two plans head to head. Only the allowances
// and the price differ between plans (the app gates nothing else), so the rows are those, and the
// spine ends in the list of everything that's the same on both (the Features page's `featureGroups`).
export const compare = {
  eyebrow: "Compare plans",
  title: "Put any two plans side by side.",
  lead: "Pick two. Only the price and the hours move; everything MeetFly does is the same on both.",
  pickA: "First plan",
  pickB: "Second plan",
  vs: "vs",
  swap: "Swap the two plans",
  rows: {
    price: "Price",
    listen: "Listening",
    voice: "Accent voice",
    perHour: "Per listening hour",
    people: "People",
    billing: "Billing",
  },
  per: { month: "a month", pass: "in 7 days", team: "each a month" },
  notIncluded: "Not included",
  free: "Free",
  each: "each",
  you: "Just you",
  perPerson: "Any team size, per person",
  same: "Same",
  differs: "Differs",
  trialChip: "Free for 7 days",
  sameTitle: "Same on both",
  sameNote: "and on every plan · {n} features",
  close: {
    text: "Every account starts with 7 days of Pro + Voice. No card needed.",
    label: "Start free trial",
    href: "/download",
  },
};

// "How billing works", the third section: four short stories told on a timeline. Every line is
// what the app does, read from its code on 2026-11-24 (MeetFly-App: backend/src/trial.ts,
// backend/src/routes/billing.ts, backend/src/billing.ts, src/shared/trial.ts,
// src/renderer/features/settings/plans/QuotaNotice.tsx and AccountSection.tsx). Not said on
// purpose: refunds, proration, taxes, payment methods (nothing in the code decides them).
export const billing = {
  eyebrow: "How billing works",
  title: "No surprises, from sign-up to the 1st.",
  lead: "What happens with the trial, your hours and your plan, exactly as the app does it.",
  storiesLabel: "Billing stories",
  // The rows every story is told in, so the four line up step by step.
  phases: [
    { title: "It starts", hint: "day one" },
    { title: "Along the way", hint: "while it runs" },
    { title: "The turn", hint: "when something changes" },
    { title: "After", hint: "what’s next" },
  ],
  stories: [
    {
      id: "trial",
      title: "Your free trial",
      line: "7 days of everything, then Free.",
      band: [
        { to: 0.75, label: "Pro + Voice · trial", tone: "lime" },
        { to: 1, label: "Free", tone: "muted" },
      ],
      stops: [
        { at: "Day 1", title: "Sign up", text: "Every feature, 20 h of listening and 8 h of accent voice. No card needed." },
        { at: "Day 6", title: "A heads-up", text: "MeetFly tells you when 2 days are left, and again on the last day." },
        { at: "Day 8", title: "Free plan", text: "The trial ends by itself and you move to Free. Nothing is charged." },
        { at: "Any time", title: "Keep everything", text: "Upgrade from Settings → Account whenever you like." },
      ],
      note: "One trial per person, and one per copy of the app.",
    },
    {
      id: "hours",
      title: "Your monthly hours",
      line: "A warning at 80 %, a pause at 100 %.",
      band: [
        { to: 0.8, label: "Hours in hand", tone: "violet" },
        { to: 1, label: "Last 20 %", tone: "amber" },
      ],
      stops: [
        { at: "The 1st", title: "A fresh allowance", text: "Listening and accent voice start again from zero used." },
        { at: "80 %", title: "A banner", text: "“You’ve used 80 % of this month’s transcription.” Close it, or see plans." },
        { at: "100 %", title: "A pause, not a loss", text: "New transcription pauses. Your notes and past meetings all stay." },
        { at: "Next 1st", title: "It resets", text: "Hours come back on their own. Unused hours don’t carry over." },
      ],
      note: "If only the accent voice runs out, just the voice pauses: transcription, answers and notes keep working.",
    },
    {
      id: "change",
      title: "Change or cancel",
      line: "In the app, any time.",
      band: [
        { to: 0.25, label: "Free", tone: "muted" },
        { to: 0.75, label: "Your plan", tone: "violet" },
        { to: 1, label: "Free", tone: "muted" },
      ],
      stops: [
        { at: "Upgrade", title: "Stripe checkout", text: "MeetFly opens Stripe’s page in your browser. Your card never passes through MeetFly." },
        { at: "Paid", title: "Plan on", text: "Your plan is active straight away. It can take a minute to show in the app." },
        { at: "Any time", title: "Switch or cancel", text: "Settings → Account → Change plan → Change or cancel opens Stripe’s page, e.g. Pro to Pro + Voice." },
        { at: "When it ends", title: "Back to Free", text: "You keep the Free plan and every note already on your computer." },
      ],
      note: "Sign in first, so the plan belongs to your account.",
    },
    {
      id: "pass",
      title: "Interview Pass",
      line: "Pay once. It ends by itself.",
      band: [
        { to: 0.8, label: "Pro + Voice · 7 days", tone: "lime" },
        { to: 1, label: "Free", tone: "muted" },
      ],
      stops: [
        { at: "Day 1", title: "Pay once", text: "One Stripe checkout. Nothing renews." },
        { at: "Days 1–7", title: "Everything", text: "Every feature, 20 h of listening and 8 h of accent voice." },
        { at: "Day 8", title: "It ends", text: "The pass runs out by itself. You’re back on Free." },
        { at: "Next time", title: "Buy again", text: "Another big week? Get another pass, or a monthly plan." },
      ],
      note: "Good for an interview week or a launch, when one month would be more than you need.",
    },
  ],
  facts: [
    { icon: "lock", title: "Paid through Stripe", text: "Card details stay on Stripe’s pages." },
    { icon: "coin", title: "USD or INR", text: "Every plan is priced in both." },
    { icon: "user", title: "Tied to your account", text: "Sign in to buy; the plan is yours." },
    { icon: "gauge", title: "Usage in the app", text: "Settings → Account shows this month’s meters." },
  ],
};

// "Quick answers", the fourth section: the pricing questions as one ruled table, each with a one-glance answer
// (`quick`, `tone`: yes / no / info) and the full answer. Every answer is from the app's code
// (as for `billing` above) or this file's plan numbers. `**…**` marks the phrase highlighted.
// Nothing on voice cloning, refunds, taxes or payment methods.
export const pricingFaq = {
  eyebrow: "Quick answers",
  title: "Pricing questions, answered at a glance.",
  lead: "Ten questions people ask before they pay, with the short answer first and the detail beside it.",
  columns: { topic: "Topic", q: "Question", quick: "Short answer", a: "The detail" },
  topics: [
    { id: "plans", label: "Plans", line: "What each plan gives you" },
    { id: "hours", label: "Hours", line: "How your time is counted" },
    { id: "paying", label: "Trial and paying", line: "Starting, changing, stopping" },
  ],
  items: [
    {
      id: "free-locked",
      topic: "plans",
      q: "Is anything locked on the Free plan?",
      quick: "No",
      tone: "no",
      a: "**Every feature is on every plan**, Free included. Plans differ only in hours: Free has 3 h of listening and 10 minutes of accent voice a month.",
    },
    {
      id: "accent-voice",
      topic: "plans",
      q: "What is the accent voice?",
      quick: "Pro + Voice, Pass",
      tone: "info",
      a: "MeetFly can say your words in another accent, such as British, American or Indian English, **with a voice native to that accent**. Pro + Voice and the Interview Pass include 8 h a month; Free has 10 minutes to try it.",
    },
    {
      id: "team",
      topic: "plans",
      q: "How does Team pricing work?",
      quick: "Per person",
      tone: "info",
      a: "Team is priced **per person, per month**, and each person gets their own 20 h of listening. Team has no accent voice: anyone who needs it can take Pro + Voice.",
    },
    {
      id: "what-counts",
      topic: "hours",
      q: "What counts towards my hours?",
      quick: "Transcription time",
      tone: "info",
      a: "Your listening hours count **the time MeetFly transcribes your calls**, to the second. The accent voice has its own allowance. Reading notes and past meetings doesn’t use your hours.",
    },
    {
      id: "rollover",
      topic: "hours",
      q: "Do unused hours roll over?",
      quick: "No",
      tone: "no",
      a: "**A fresh allowance starts on the 1st of every month**, and what’s left from the month before doesn’t carry over. The Interview Pass’s hours are for its 7 days.",
    },
    {
      id: "limit",
      topic: "hours",
      q: "What happens when I run out?",
      quick: "It pauses",
      tone: "info",
      a: "A banner tells you at 80 %. At 100 %, **new transcription pauses until the 1st**, or you can upgrade to keep going. Your notes and past meetings all stay. If only the accent voice runs out, just the voice pauses.",
    },
    {
      id: "card",
      topic: "paying",
      q: "Do I need a card for the free trial?",
      quick: "No",
      tone: "no",
      a: "Sign up and you get **7 days of Pro + Voice, no card needed**. When it ends you move to the Free plan; nothing is charged unless you choose a plan.",
    },
    {
      id: "cancel",
      topic: "paying",
      q: "Can I switch or cancel any time?",
      quick: "Yes",
      tone: "yes",
      a: "Yes. In MeetFly, **Settings → Account → Change plan → Change or cancel** opens Stripe’s page, where you can move between plans or cancel. When a plan ends you’re back on Free.",
    },
    {
      id: "pass",
      topic: "paying",
      q: "Is the Interview Pass a subscription?",
      quick: "No",
      tone: "no",
      a: "No. It’s **one payment for 7 days** of Pro + Voice. It ends by itself and nothing renews, so there’s nothing to cancel.",
    },
    {
      id: "notes-stay",
      topic: "paying",
      q: "Do I lose my notes if I go back to Free?",
      quick: "No",
      tone: "no",
      a: "No. Notes, transcripts and recordings are **saved on your computer**, so nothing is deleted when a plan or trial ends.",
    },
  ],
  aside: {
    title: "Still deciding?",
    text: "Try everything for 7 days. No card needed.",
    cta: { label: "Start free trial", href: "/download" },
    more: { label: "All other questions", href: "/faq" },
  },
};

// The close of the Pricing page, in the same styles as the other pages' closes.
export const pricingClose = {
  eyebrow: "7 days free · No card needed",
  before: "Try everything free.",
  after: "Pick a plan later.",
  lead: "Every account starts with 7 days of Pro + Voice. When it ends you’re on Free, unless you choose a plan.",
  mac: "Download for Mac",
  windows: "Download for Windows",
  soon: "Coming soon",
  watch: { label: "Watch it work", href: "/#demo" },
  jumpLabel: "Jump back to",
  jumps: [
    { href: "#pricing-top", label: "Plans", count: 5 },
    { href: "#compare", label: "Compare plans", count: 6 },
    { href: "#billing", label: "How billing works", count: 4 },
    { href: "#pricing-faq", label: "Quick answers", count: 10 },
  ],
};
