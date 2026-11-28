import { hoursText, planById, trialLine } from "./pricing";

// The Download page. Facts from the app (MeetFly-App/MeetFly, checked 2026-11-24): version 1.4.0
// (package.json); the Mac build is one universal app for Apple silicon and Intel, as .dmg and .pkg;
// the Windows build is a one-click installer for x64 and ARM64 that installs for you without admin
// rights and adds desktop and Start menu shortcuts (build.mac / build.win / build.nsis). Minimum OS
// versions follow from Electron 45, which the app is built on (macOS 12+, Windows 10+): confirm
// before launch. Download links come from siteConfig.downloads ("Coming soon" while null).

export const downloadPage = {
  eyebrow: { tag: "v1.4.0", text: "The desktop app for your calls" },
  title: { top: "Get MeetFly", prefix: "on your", mark: "desktop." },
  lead: "One app for Mac and Windows. It sits beside any call app, hears both sides and helps from the first word.",
  version: "1.4.0",
  versionLabel: "Version",
  soon: "Coming soon",
  forYou: "For this computer",
  or: "or",
  platforms: [
    {
      id: "mac",
      name: "macOS",
      button: "Download for Mac",
      line: "One universal app for every Mac.",
      specs: [
        ["Runs on", "Apple silicon and Intel"],
        ["Installer", ".dmg, or .pkg with MeetFly Microphone"],
        ["Installs to", "Applications"],
        ["Needs", "macOS 12 or later"],
      ],
    },
    {
      id: "windows",
      name: "Windows",
      button: "Download for Windows",
      line: "Installs for you, no admin rights needed.",
      specs: [
        ["Runs on", "x64 and ARM64 PCs"],
        ["Installer", "One click, .exe"],
        ["Adds", "Desktop and Start menu shortcuts"],
        ["Needs", "Windows 10 or later"],
      ],
    },
  ],
  facts: ["Works with any call app", "No bot joins your call", "Notes stay on your computer"],
};

// "From download to your first call": the app's own first run (2026-11-28 re-check): the installer
// (build settings), the sign-in screen with its trial offer (features/auth/SignInScreen.tsx,
// shared/trial.ts; sign-in is required by default), then the setup guide (features/onboarding:
// mic, meeting sound, the optional accent step, how a meeting works; electron/permissions.ts).
// Mac and Windows differ in the install, sound and accent steps. The accent step leaves out the
// app's mention of cloned voices. "About a minute", the headphones tip, "No password to remember"
// and "any time from Accent in the sidebar" are the app's own words.
export const setup = {
  eyebrow: "Setup",
  title: "From download to your first call",
  lead: "MeetFly walks you through this the first time it opens. Here is what to expect.",
  osLabel: "Show steps for",
  time: "About a minute",
  progress: (n, total) => `${n} of ${total} done`,
  back: "Previous step",
  next: "Next step",
  window: "MeetFly setup",
  steps: [
    {
      id: "install",
      short: "Install",
      title: "Install MeetFly",
      text: {
        mac: "Open the .dmg and drag MeetFly into Applications, or run the .pkg, which also installs MeetFly Microphone for accent voice.",
        windows: "Run the installer. It sets MeetFly up for you in one click and opens it when it’s done.",
      },
      tip: { mac: "One app for Apple silicon and Intel.", windows: "No admin rights needed." },
      mock: {
        mac: { app: "MeetFly", folder: "Applications", hint: "Drag to install" },
        windows: { title: "Installing MeetFly", done: "Open MeetFly when finished" },
      },
    },
    {
      id: "signin",
      short: "Sign in",
      title: "Sign in and start your trial",
      text: {
        mac: "Continue with Google, or get a sign-in link by email. The same link creates your account, and your 7 days of Pro + Voice start. No card needed.",
        windows: "Continue with Google, or get a sign-in link by email. The same link creates your account, and your 7 days of Pro + Voice start. No card needed.",
      },
      tip: { mac: "No password to remember.", windows: "No password to remember." },
      mock: {
        title: "Start your 7-day free trial",
        lead: "Everything in MeetFly, free for 7 days. No card needed.",
        google: "Continue with Google",
        or: "or",
        email: "you@company.com",
        button: "Email me a sign-in link",
      },
    },
    {
      id: "mic",
      short: "Microphone",
      title: "Test your microphone",
      text: { mac: "Click Test mic and say something. The bar should move.", windows: "Click Test mic and say something. The bar should move." },
      tip: {
        mac: "Use headphones in meetings so your mic does not pick up the other person.",
        windows: "Use headphones in meetings so your mic does not pick up the other person.",
      },
      mock: { device: "Microphone", value: "Default", button: "Test mic", done: "Your mic works." },
    },
    {
      id: "sound",
      short: "Meeting sound",
      title: "Let MeetFly hear the meeting",
      text: {
        mac: "Play any sound, then click Test. Allow MeetFly under System Settings → Privacy & Security → Screen & System Audio Recording.",
        windows: "Play any sound, like a video or your meeting, then click Test. MeetFly hears every meeting app on your computer.",
      },
      tip: { mac: "Works with any call app.", windows: "Works with any call app." },
      mock: { permission: "Screen & System Audio Recording", playing: "Playing a video", button: "Test", done: "MeetFly can hear it." },
    },
    {
      id: "accent",
      short: "Accent",
      optional: "Optional",
      title: "Set up your accent",
      text: {
        mac: "Pick an accent and a voice, then choose MeetFly Microphone as the microphone in Meet, Zoom or Teams. The .pkg installs it with MeetFly; with the .dmg, MeetFly offers to add it.",
        windows: "Pick an accent and a voice. Meetings that open inside MeetFly hear it straight away. For Google Meet and the Zoom or Teams desktop apps, MeetFly adds a virtual microphone; Windows asks for permission and a restart.",
      },
      tip: {
        mac: "Skip it if you like. You can set it up any time from Accent in the sidebar.",
        windows: "Skip it if you like. You can set it up any time from Accent in the sidebar.",
      },
      mock: {
        label: "People hear you as",
        accent: "British",
        voice: "Female voice · Warm",
        power: "Accent on",
        key: "V",
        done: { mac: "MeetFly Microphone is ready.", windows: "Ready in meetings that open in MeetFly." },
      },
    },
    {
      id: "meet",
      short: "First meeting",
      title: "Start your first meeting",
      text: { mac: "That’s it. Here is how every meeting works.", windows: "That’s it. Here is how every meeting works." },
      tip: { mac: "No bot joins your call.", windows: "No bot joins your call." },
      mock: {
        flow: [
          ["Join", "from Home, or in your usual app"],
          ["Type your own notes", "if you like"],
          ["Talk normally", "answers appear when they stop"],
          ["Press End", "notes and a follow-up email are ready"],
        ],
      },
    },
  ],
};

// The page's close: a big "ready" ring that fills as you scroll to it, the free-trial line, the
// download buttons for both systems (yours first), and four quick answers taken from the FAQ, the
// pricing page and the build settings. Trial and plan facts: keep in step with content/pricing.js
// (the app's sign-in screen offers the same 7 days, no card).
export const downloadClose = {
  eyebrow: "Ready when you are",
  title: { top: "Your next call", mark: "starts here." },
  lead: "Download MeetFly, take about a minute to set it up, and walk into your next call with help on screen.",
  ring: { busy: "Downloading", done: "Ready to install", name: "MeetFly" },
  needs: "macOS 12+ · Windows 10+",
  trial: trialLine,
  faq: { label: "Read all FAQs", href: "/faq" },
  answersTitle: "Quick answers before you install",
  answers: [
    {
      q: "Is it free to try?",
      a: `Yes. Sign up and you get 7 days of Pro + Voice, no card needed. After that you’re on the Free plan, with every feature and ${hoursText(planById.free.minutes)} a month, unless you choose a plan.`,
      link: { label: "See plans", href: "/pricing" },
    },
    {
      q: "Do I need admin rights?",
      a: "Not on Windows: the installer sets MeetFly up just for you. On a Mac, drag it into Applications or run the .pkg.",
    },
    {
      q: "Which call apps does it work with?",
      a: "Zoom, Google Meet, Microsoft Teams, Webex, Whereby and Slack huddles, and any other call your computer can hear.",
    },
    {
      q: "Where are my meetings kept?",
      a: "On your computer, in MeetFly’s data folder. Your meetings are not sent to our servers.",
    },
  ],
};
