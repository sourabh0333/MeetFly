// Site-wide settings. Anything not decided yet is null, and the page shows nothing for it.
export const siteConfig = {
  name: "MeetFly",
  // From the app's README. Replace when the team writes its own.
  description:
    "MeetFly is an AI copilot for your calls. It transcribes both sides live, suggests what to say next, writes the notes and records the call.",
  // The public address. Set NEXT_PUBLIC_SITE_URL (e.g. https://meetfly.com) in the hosting
  // settings once the domain is bought; until then the site runs on localhost.
  url: (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3200").replace(/\/+$/, ""),
  // Search engines may list the site only once a real public address is set. While it's unset (or
  // localhost / a preview), every page says "noindex" and robots.txt blocks crawling, so the
  // unfinished site can't end up in Google by accident. Nothing to remove on launch day.
  isLive: /^https:\/\/(?!localhost)/.test(process.env.NEXT_PUBLIC_SITE_URL || ""),

  // Not decided yet: there are no public installers. While these are null,
  // download buttons point to the #download anchor instead of a file.
  downloads: { mac: null, windows: null },

  // The full legal privacy policy and a contact. The app's backend serves the policy at /privacy
  // (backend/src/legal); set its public address and the contact (LEGAL_CONTACT_EMAIL) once known.
  // While null, the site shows only the policy's date, no link and no address.
  legal: { privacyUrl: null, contactEmail: null, policyUpdated: "2026-11-16" },
};
