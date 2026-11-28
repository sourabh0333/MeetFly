import Link from "next/link";
import { platformPage as c, platforms } from "@/content/platforms";
import { trialLine } from "@/content/pricing";
import { DecodeText } from "@/components/hero/decode-text";
import { MagneticLink } from "@/components/hero/magnetic-link";
import { SectionHead } from "@/components/section-head/section-head";
import head from "@/components/features/features-hero.module.css";
import styles from "./platform-page.module.css";

// A "works with" page (Zoom, Google Meet, Microsoft Teams), one design for all three, each with its
// own facts. Top to bottom: the shared centred hero ("AI meeting assistant / for Zoom."); how
// MeetFly works with that app as two ruled paths side by side with big step numbers (Zoom and Teams:
// join from MeetFly, or use your own app; Meet: it opens in your browser, and MeetFly floats over
// it); what MeetFly does on the call (a ruled 3 × 2 grid); accent voice set-up as a Where | Mac |
// Windows table; that app's questions, all visible (and as FAQ structured data on the page); and a
// close with the trial line, Download and links to the other two apps. Server-rendered, so every
// word is in the HTML.
const n2 = (i) => String(i + 1).padStart(2, "0");

export function PlatformPage({ p }) {
  const others = platforms.filter((x) => x.slug !== p.slug);
  const h = p.hero;

  return (
    <>
      {/* Hero */}
      <section id="platform-top" className={head.hero} aria-labelledby="platform-title">
        <div className={head.bg} aria-hidden="true">
          <span className={head.glowA} />
          <span className={head.glowB} />
        </div>
        <div className={head.head}>
          <p className={head.eyebrow}>
            <span className={head.tag}>
              <i aria-hidden="true" />
              {h.tag}
            </span>
            {h.text}
          </p>
          <h1 id="platform-title" className={head.title}>
            <span className={head.sr}>
              {h.top} {h.prefix} {h.mark}
            </span>
            <span aria-hidden="true" className={head.line1}>
              <DecodeText text={h.top} />
            </span>
            <span aria-hidden="true" className={head.line2}>
              {h.prefix}{" "}
              <span className={head.mark}>
                {h.mark}
                <svg viewBox="0 0 300 24" preserveAspectRatio="none" aria-hidden="true">
                  <path pathLength="1" d="M4 16 C 60 6, 120 20, 180 11 S 270 8, 296 12" />
                </svg>
              </span>
            </span>
          </h1>
          <p className={head.lead}>{h.lead}</p>
          <div className={head.actions}>
            <MagneticLink className={head.primary} href={c.primary.href}>
              <span>{c.primary.label}</span>
              <svg viewBox="0 0 16 16" aria-hidden="true">
                <path d="M8 2.5v8M4.5 7l3.5 3.5L11.5 7M3 13.5h10" />
              </svg>
            </MagneticLink>
            <Link className={head.secondary} href={c.secondary.href}>
              <span className={head.play} aria-hidden="true">
                <svg viewBox="0 0 16 16">
                  <path d="M6 4.5v7l5.5-3.5z" />
                </svg>
              </span>
              {c.secondary.label}
            </Link>
          </div>
        </div>
      </section>

      {/* How it works with this app */}
      <section id="how" className={styles.section} data-in aria-labelledby="how-title">
        <SectionHead id="how-title" eyebrow={p.name} title={p.pathsTitle} lead={p.pathsLead} />
        <div className={styles.paths}>
          {p.paths.map((path, k) => (
            <div key={path.title} className={styles.path}>
              <span className={styles.pathTag}>
                <i aria-hidden="true" />
                {path.tag}
              </span>
              <h3>{path.title}</h3>
              <ol>
                {path.steps.map((s, i) => (
                  <li key={i}>
                    <span className={styles.stepN} aria-hidden="true">
                      {n2(i)}
                    </span>
                    <p>{s}</p>
                  </li>
                ))}
              </ol>
              {k === 0 && (
                <span className={styles.join} aria-hidden="true">
                  {p.slug === "google-meet" ? "+" : "or"}
                </span>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* What it does on the call */}
      <section id="does" className={styles.section} data-in aria-labelledby="does-title">
        <SectionHead id="does-title" eyebrow="On the call" title={c.doesTitle(p.name)} lead={c.doesLead} />
        <ul className={styles.does}>
          {p.does.map((d, i) => (
            <li key={d.name}>
              <span className={styles.doesN}>{n2(i)}</span>
              <h3>{d.name}</h3>
              <p>{d.text}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* Accent voice set-up */}
      <section id="accent" className={styles.section} data-in aria-labelledby="accent-title">
        <SectionHead id="accent-title" eyebrow="Accent voice" title={p.accent.title} lead={p.accent.lead} />
        <div className={styles.table} role="table" aria-label={p.accent.title}>
          <div className={styles.tHead} role="row">
            <span role="columnheader" />
            <span role="columnheader">{c.accentMac}</span>
            <span role="columnheader">{c.accentWindows}</span>
          </div>
          {p.accent.rows.map((r) => (
            <div key={r.where} className={styles.tRow} role="row">
              <b role="rowheader">{r.where}</b>
              <p role="cell" data-os={c.accentMac}>
                {r.mac}
              </p>
              <p role="cell" data-os={c.accentWindows}>
                {r.windows}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Questions */}
      <section id="questions" className={styles.section} data-in aria-labelledby="questions-title">
        <SectionHead id="questions-title" eyebrow="Questions" title={c.faqTitle(p.name)} />
        <dl className={styles.faq}>
          {p.faq.map((f, i) => (
            <div key={f.q}>
              <dt>
                <span>{n2(i)}</span>
                {f.q}
              </dt>
              <dd>{f.a}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Close */}
      <section id="platform-end" className={styles.close} aria-labelledby="platform-end-title">
        <h2 id="platform-end-title" className={styles.closeTitle}>
          <span>{c.closeTitle.top}</span>{" "}
          <span className={styles.closeMark}>{c.closeTitle.mark}</span>
        </h2>
        <p className={styles.trial}>
          <b>{trialLine.tag}</b>
          <span>{trialLine.text}</span>
          <Link href={trialLine.link.href}>
            {trialLine.link.label}
            <svg viewBox="0 0 16 16" aria-hidden="true">
              <path d="M3 8h9M8.5 4.5L12 8l-3.5 3.5" />
            </svg>
          </Link>
        </p>
        <MagneticLink className={head.primary} href={c.primary.href}>
          <span>{c.primary.label}</span>
          <svg viewBox="0 0 16 16" aria-hidden="true">
            <path d="M8 2.5v8M4.5 7l3.5 3.5L11.5 7M3 13.5h10" />
          </svg>
        </MagneticLink>
        <nav className={styles.also} aria-label={c.alsoLabel}>
          <span>{c.alsoLabel}</span>
          {others.map((o) => (
            <Link key={o.slug} href={`/works-with/${o.slug}`}>
              {o.name}
            </Link>
          ))}
          <p>
            {c.others}. <Link href={c.othersLink.href}>{c.othersLink.label} →</Link>
          </p>
        </nav>
      </section>
    </>
  );
}
