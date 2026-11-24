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
        ["Installer", ".dmg or .pkg"],
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

// "From download to your first call": the app's own first-run setup (renderer/features/onboarding,
// electron/permissions.ts), with the installer step from the build settings. Mac and Windows
// differ in steps 1 and 3. The accent step in the app's onboarding is left out (voice features
// are not on the site). "About a minute" and the headphones tip are the app's own words.
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
        mac: "Open the .dmg and drag MeetFly into Applications, or run the .pkg installer.",
        windows: "Run the installer. It sets MeetFly up for you in one click and opens it when it’s done.",
      },
      tip: { mac: "One app for Apple silicon and Intel.", windows: "No admin rights needed." },
      mock: {
        mac: { app: "MeetFly", folder: "Applications", hint: "Drag to install" },
        windows: { title: "Installing MeetFly", done: "Open MeetFly when finished" },
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

// The page's close: a big "ready" ring that fills as you scroll to it, the download buttons for
// both systems (yours first), and four quick answers taken from the FAQ and the build settings.
export const downloadClose = {
  eyebrow: "Ready when you are",
  title: { top: "Your next call", mark: "starts here." },
  lead: "Download MeetFly, take about a minute to set it up, and walk into your next call with help on screen.",
  ring: { busy: "Downloading", done: "Ready to install", name: "MeetFly" },
  needs: "macOS 12+ · Windows 10+",
  faq: { label: "Read all FAQs", href: "/faq" },
  answersTitle: "Quick answers before you install",
  answers: [
    {
      q: "Do I need admin rights?",
      a: "Not on Windows: the installer sets MeetFly up just for you. On a Mac, drag it into Applications or run the .pkg.",
    },
    {
      q: "Does a bot join my call?",
      a: "No. MeetFly listens on your own computer, so nobody sees an extra guest in the meeting.",
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
