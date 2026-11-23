// Site-wide settings. Anything not decided yet is null, and the page shows nothing for it.
export const siteConfig = {
  name: "MeetFly",
  // From the app's README. Replace when the team writes its own.
  description:
    "MeetFly is an AI copilot for your calls. It transcribes both sides live, suggests what to say next, writes the notes and records the call.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3200",

  // Not decided yet: there are no public installers. While these are null,
  // download buttons point to the #download anchor instead of a file.
  downloads: { mac: null, windows: null },

  // The full legal privacy policy and a contact. The app's backend serves the policy at /privacy
  // (backend/src/legal); set its public address and the contact (LEGAL_CONTACT_EMAIL) once known.
  // While null, the site shows only the policy's date, no link and no address.
  legal: { privacyUrl: null, contactEmail: null, policyUpdated: "2026-11-16" },
};
