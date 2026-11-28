import Link from "next/link";
import { CallEnded } from "@/components/not-found/call-ended";
import styles from "./not-found.module.css";

// The branded 404, for any address that doesn't exist (and pages that call notFound()). The site's
// header and footer stay; Next.js adds "noindex" and the 404 status itself.
// "This page left the call": a huge outlined 404 behind everything with the site's violet and lime
// glows, a frosted-glass "call ended" window in front (status bar with a short timer, the address
// that was asked for as a participant who left, a waveform collapsing to a flat line, the
// headline, call-control buttons), and quick links as pills underneath.
export const metadata = {
  title: "Page not found · MeetFly",
  description: "This page doesn’t exist. Find MeetFly’s features, pricing, guides and downloads from here.",
};

const LINKS = [
  { href: "/features", label: "Features" },
  { href: "/pricing", label: "Pricing" },
  { href: "/use-cases", label: "Use cases" },
  { href: "/faq", label: "FAQ" },
  { href: "/privacy", label: "Privacy" },
  { href: "/works-with/zoom", label: "Zoom" },
  { href: "/works-with/google-meet", label: "Google Meet" },
  { href: "/works-with/microsoft-teams", label: "Microsoft Teams" },
];

export default function NotFound() {
  return (
    <section className={styles.page} aria-labelledby="nf-title">
      <div className={styles.glows} aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <p className={styles.giant} aria-hidden="true">
        404
      </p>

      <div className={styles.stage}>
        <CallEnded />

        <nav className={styles.jump} aria-label="Popular pages">
          <span>Or jump to</span>
          <ul>
            {LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href}>{l.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  );
}
