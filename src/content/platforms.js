// The "works with" pages: /works-with/zoom, /works-with/google-meet, /works-with/microsoft-teams.
// Every fact is from the app's code (2026-11-28): shared/meeting-links.ts (platforms and their join
// tips), features/join/join.ts (Google Meet always opens in the browser, because Google refuses
// sign-in inside apps; MeetFly then floats over the meeting), PreJoinDialog.tsx (in a MeetFly window
// "MeetFly is the meeting's microphone, so your accent works with nothing else to set up"),
// MeetingAccountsSection.tsx (Microsoft and Zoom sign-ins; Google isn't listed), shared/virtual-mic.ts
// (MeetFly Microphone on Mac, "CABLE Output (VB-Audio Virtual Cable)" on Windows),
// electron/permissions.ts (Screen & System Audio Recording on Mac). No bot, never "100% local".

const common = {
  // What MeetFly does on the call: the same app on every platform (content/features.js).
  does: [
    { name: "Live transcript", text: "Both sides of the call written down as you talk, labelled You and Them." },
    { name: "Instant replies", text: "A suggested reply the moment the other person stops talking, with key points under it." },
    { name: "Read my screen", text: "MeetFly looks at what’s shared in the meeting, like slides, a form or a coding problem, and helps with it." },
    { name: "Live translation", text: "The other side’s captions, translated live into any of 14 languages." },
    { name: "Floating panel", text: "A small see-through panel over the meeting. It stays above full screen and remembers where you put it." },
    { name: "Notes and follow-up", text: "Structured notes from a template for your call type, and a recap email addressed to the people invited." },
  ],
};

export const platforms = [
  {
    slug: "zoom",
    name: "Zoom",
    meta: {
      title: "AI meeting assistant for Zoom · MeetFly",
      description:
        "MeetFly is an AI meeting assistant for Zoom calls on Mac and Windows: live transcript, instant replies, live translation and notes, with no bot joining your Zoom meeting.",
    },
    og: { top: "AI meeting assistant", mark: "for Zoom." },
    hero: {
      tag: "Works with Zoom",
      text: "Join as a guest or use the Zoom app",
      top: "AI meeting assistant",
      prefix: "for",
      mark: "Zoom.",
      lead: "MeetFly listens to your Zoom call on your computer, suggests what to say the moment the other person stops, and writes the notes when you hang up. No bot joins the meeting.",
    },
    pathsTitle: "Two ways to use MeetFly on Zoom",
    pathsLead: "Open the meeting inside MeetFly, or keep using the Zoom app you already have. Either way MeetFly hears both sides.",
    paths: [
      {
        title: "Join from MeetFly",
        tag: "Opens in a MeetFly window",
        steps: [
          "Paste a Zoom link in MeetFly, or click Join on a meeting from your calendar.",
          "The meeting opens in a MeetFly window. Join as a guest: type your name, and the passcode if the host set one.",
          "To join with your own Zoom account, sign in once under Settings → Meeting accounts. Guests can join without it.",
        ],
      },
      {
        title: "Use the Zoom app",
        tag: "Desktop app or browser",
        steps: [
          "Join from Zoom as usual, then start the meeting in MeetFly.",
          "The desktop app hears your computer’s sound, so MeetFly follows the call in any app.",
          "On a Mac, allow MeetFly under System Settings → Privacy & Security → Screen & System Audio Recording the first time.",
        ],
      },
    ],
    accent: {
      title: "Accent voice on Zoom",
      lead: "People on the call hear your words in the accent you pick, spoken by a native voice. How you set it up depends on where the meeting runs.",
      rows: [
        { where: "Joined from MeetFly", mac: "Nothing to set up. MeetFly is the meeting’s microphone.", windows: "Nothing to set up. MeetFly is the meeting’s microphone." },
        { where: "In the Zoom app", mac: "Pick MeetFly Microphone as the microphone in Zoom. It installs with MeetFly.", windows: "Pick “CABLE Output (VB-Audio Virtual Cable)” as the microphone in Zoom. MeetFly adds it the first time." },
      ],
    },
    faq: [
      { q: "Does a bot join my Zoom meeting?", a: "No. MeetFly listens on your own computer, through your microphone and your computer’s sound. Nobody sees an extra guest in the Zoom call." },
      { q: "Do I need a Zoom account?", a: "No. In a MeetFly window you can join Zoom as a guest with your name, and the passcode if the host set one. Sign in under Settings → Meeting accounts only if you want to join with your Zoom account." },
      { q: "Does it work with the Zoom desktop app?", a: "Yes. MeetFly hears your computer’s sound, so it follows calls in the Zoom app too. On a Mac, allow it under Screen & System Audio Recording the first time." },
      { q: "Can it help with what’s shared on screen in Zoom?", a: "Yes. Read my screen looks at what’s shared, like slides, a form or a coding problem, and answers with that in mind." },
      { q: "Should I tell people MeetFly is on?", a: "Yes, and where the law requires it, ask for their consent. MeetFly reminds you when each meeting starts, with a notice you can paste into the Zoom chat." },
    ],
  },
  {
    slug: "google-meet",
    name: "Google Meet",
    meta: {
      title: "AI meeting assistant for Google Meet · MeetFly",
      description:
        "MeetFly is an AI meeting assistant for Google Meet on Mac and Windows: it floats over Meet in your browser with live replies, translation and notes, and no bot joins the call.",
    },
    og: { top: "AI meeting assistant", mark: "for Google Meet." },
    hero: {
      tag: "Works with Google Meet",
      text: "In your browser, with MeetFly floating over it",
      top: "AI meeting assistant",
      prefix: "for",
      mark: "Google Meet.",
      lead: "Google Meet opens in your browser as usual, and MeetFly floats over the meeting: it hears both sides, suggests what to say and writes the notes. No bot joins the call.",
    },
    pathsTitle: "How MeetFly works with Google Meet",
    pathsLead: "Meet always runs in your own browser, where you’re already signed in to Google. MeetFly sits on top of it.",
    paths: [
      {
        title: "Meet opens in your browser",
        tag: "Signed in to Google as usual",
        steps: [
          "Paste a Meet link in MeetFly, or click Join on a meeting from your Google Calendar.",
          "Google Meet opens in your own browser. Google doesn’t allow signing in inside other apps, so this is where your Google account already works.",
          "There’s nothing to sign in to in MeetFly for Meet.",
        ],
      },
      {
        title: "MeetFly floats over it",
        tag: "The floating panel",
        steps: [
          "MeetFly’s floating panel opens over the meeting, with the answer first, then captions and quick actions.",
          "It hears both sides through your microphone and your computer’s sound.",
          "On a Mac, allow MeetFly under System Settings → Privacy & Security → Screen & System Audio Recording the first time.",
        ],
      },
    ],
    accent: {
      title: "Accent voice on Google Meet",
      lead: "People on the call hear your words in the accent you pick, spoken by a native voice. In Meet, choose MeetFly’s microphone once.",
      rows: [
        { where: "In Google Meet", mac: "Pick MeetFly Microphone as the microphone in Meet’s settings. It installs with MeetFly.", windows: "Pick “CABLE Output (VB-Audio Virtual Cable)” as the microphone in Meet. MeetFly adds it the first time." },
      ],
    },
    faq: [
      { q: "Does a bot join my Google Meet call?", a: "No. MeetFly listens on your own computer. Nobody sees an extra guest in the meeting." },
      { q: "Why does Google Meet open in my browser?", a: "Google doesn’t allow signing in to your Google account inside other apps. So Meet opens in your own browser, where you’re already signed in, and MeetFly floats over it." },
      { q: "Do I sign in to Google in MeetFly?", a: "Not for Meet. Your browser already has your Google account; MeetFly only needs to hear the call." },
      { q: "Does it work with Google Calendar?", a: "Yes. Paste your Google Calendar’s private link in MeetFly, and today’s and tomorrow’s meetings show up with Join and Prepare." },
      { q: "Can it help with a screen shared in Meet?", a: "Yes. Read my screen looks at what’s shared, like slides, a form or a coding problem, and answers with that in mind." },
    ],
  },
  {
    slug: "microsoft-teams",
    name: "Microsoft Teams",
    meta: {
      title: "AI meeting assistant for Microsoft Teams · MeetFly",
      description:
        "MeetFly is an AI meeting assistant for Microsoft Teams on Mac and Windows: live transcript, instant replies, live translation and notes, with no bot joining your Teams meeting.",
    },
    og: { top: "AI meeting assistant", mark: "for Microsoft Teams." },
    hero: {
      tag: "Works with Microsoft Teams",
      text: "As a guest, with your work account, or in the Teams app",
      top: "AI meeting assistant",
      prefix: "for",
      mark: "Microsoft Teams.",
      lead: "MeetFly listens to your Teams meeting on your computer, suggests what to say the moment the other person stops, and writes the notes when you hang up. No bot joins the meeting.",
    },
    pathsTitle: "Two ways to use MeetFly on Teams",
    pathsLead: "Open the meeting inside MeetFly, or keep using the Teams app. Either way MeetFly hears both sides.",
    paths: [
      {
        title: "Join from MeetFly",
        tag: "Opens in a MeetFly window",
        steps: [
          "Paste a Teams link in MeetFly, or click Join on a meeting from your Outlook calendar.",
          "The meeting opens in a MeetFly window. Pick “Continue on this browser”, then join as a guest with your name or sign in with your work account.",
          "Sign in once to Microsoft under Settings → Meeting accounts, and later Teams meetings open signed in.",
        ],
      },
      {
        title: "Use the Teams app",
        tag: "Desktop app or browser",
        steps: [
          "Join from Teams as usual, then start the meeting in MeetFly.",
          "The desktop app hears your computer’s sound, so MeetFly follows the call in any app.",
          "On a Mac, allow MeetFly under System Settings → Privacy & Security → Screen & System Audio Recording the first time.",
        ],
      },
    ],
    accent: {
      title: "Accent voice on Microsoft Teams",
      lead: "People on the call hear your words in the accent you pick, spoken by a native voice. How you set it up depends on where the meeting runs.",
      rows: [
        { where: "Joined from MeetFly", mac: "Nothing to set up. MeetFly is the meeting’s microphone.", windows: "Nothing to set up. MeetFly is the meeting’s microphone." },
        { where: "In the Teams app", mac: "Pick MeetFly Microphone as the microphone in Teams. It installs with MeetFly.", windows: "Pick “CABLE Output (VB-Audio Virtual Cable)” as the microphone in Teams. MeetFly adds it the first time." },
      ],
    },
    faq: [
      { q: "Does a bot join my Teams meeting?", a: "No. MeetFly listens on your own computer, through your microphone and your computer’s sound. Nobody sees an extra guest in the meeting." },
      { q: "Do I need a Microsoft account?", a: "No. In a MeetFly window you can join a Teams meeting as a guest with your name. Sign in with your work account if your organisation’s meetings need it." },
      { q: "Does it work with the Teams desktop app?", a: "Yes. MeetFly hears your computer’s sound, so it follows meetings in the Teams app too. On a Mac, allow it under Screen & System Audio Recording the first time." },
      { q: "Does it work with my Outlook calendar?", a: "Yes. Paste your Outlook calendar’s private link in MeetFly, and today’s and tomorrow’s meetings show up with Join and Prepare." },
      { q: "Should I tell people MeetFly is on?", a: "Yes, and where the law requires it, ask for their consent. MeetFly reminds you when each meeting starts, with a notice you can paste into the Teams chat." },
    ],
  },
].map((p) => ({ ...p, ...common }));

export const platformPage = {
  doesTitle: (name) => `What MeetFly does on a ${name} call`,
  doesLead: "The same copilot on every call: help while you talk, and notes when you hang up.",
  accentMac: "Mac",
  accentWindows: "Windows",
  faqTitle: (name) => `MeetFly and ${name}: questions`,
  primary: { label: "Download MeetFly", href: "/download" },
  secondary: { label: "See all features", href: "/features" },
  closeTitle: { top: "Your next call,", mark: "with help on screen." },
  alsoLabel: "Also works with",
  others: "Webex, Whereby, Slack huddles and any other call your computer can hear",
  othersLink: { label: "See everything it works with", href: "/features#works-with" },
};
