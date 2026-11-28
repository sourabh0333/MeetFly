import Link from "next/link";
import { guides, guidesPage as c, readingMinutes } from "@/content/guides";
import { trialLine } from "@/content/pricing";
import { MagneticLink } from "@/components/hero/magnetic-link";
import { Rich } from "./rich";
import head from "@/components/features/features-hero.module.css";
import styles from "./guides.module.css";

// One guide. An editorial article: breadcrumb (Guides / topic), the title, the lead and a meta line
// (reading time · updated); then two columns: "In this guide" (the section links, not pinned) and
// the article (h2 sections; paragraphs, lists, numbered steps, tips as a violet-ruled aside, tables
// as ruled grids). At the end, a ruled "Try it on your next call" band with the trial line and
// Download, then more guides. Server-rendered: every word is in the HTML.
const date = (iso) => new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

function Block({ b }) {
  if (b.p) return <p><Rich text={b.p} /></p>;
  if (b.ul)
    return (
      <ul>
        {b.ul.map((x, i) => (
          <li key={i}>
            <Rich text={x} />
          </li>
        ))}
      </ul>
    );
  if (b.ol)
    return (
      <ol className={styles.steps}>
        {b.ol.map((x, i) => (
          <li key={i}>
            <span className={styles.stepN} aria-hidden="true">
              {String(i + 1).padStart(2, "0")}
            </span>
            <p>
              <Rich text={x} />
            </p>
          </li>
        ))}
      </ol>
    );
  if (b.tip)
    return (
      <aside className={styles.tip}>
        <b>Tip</b>
        <p>
          <Rich text={b.tip} />
        </p>
      </aside>
    );
  if (b.table)
    return (
      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              {b.table.head.map((h, i) => (
                <th key={i} scope="col">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {b.table.rows.map((r) => (
              <tr key={r[0]}>
                {r.map((cell, i) =>
                  i === 0 ? (
                    <th key={i} scope="row">
                      {cell}
                    </th>
                  ) : (
                    <td key={i}>{cell}</td>
                  ),
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  return null;
}

export function GuideArticle({ g }) {
  const related = g.related.map((s) => guides.find((x) => x.slug === s)).filter(Boolean);
  return (
    <article className={styles.article} aria-labelledby="guide-title">
      <header className={styles.head}>
        <nav className={styles.crumbs} aria-label="Breadcrumb">
          <Link href="/guides">{c.eyebrow.tag}</Link>
          <span aria-hidden="true">/</span>
          <span>{g.tag}</span>
        </nav>
        <h1 id="guide-title">{g.title}</h1>
        <p className={styles.lead}>{g.lead}</p>
        <p className={styles.metaLine}>
          <span>
            {readingMinutes(g)} {c.readLabel}
          </span>
          <span>
            {c.updatedLabel} <time dateTime={g.updated}>{date(g.updated)}</time>
          </span>
        </p>
      </header>

      <div className={styles.layout}>
        <nav className={styles.toc} aria-label={c.contentsLabel}>
          <p>{c.contentsLabel}</p>
          <ol>
            {g.sections.map((s, i) => (
              <li key={s.id}>
                <a href={`#${s.id}`}>
                  <span>{String(i + 1).padStart(2, "0")}</span>
                  {s.h}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className={styles.body}>
          {g.sections.map((s) => (
            <section key={s.id} id={s.id} aria-labelledby={`${s.id}-h`}>
              <h2 id={`${s.id}-h`}>{s.h}</h2>
              {s.blocks.map((b, i) => (
                <Block key={i} b={b} />
              ))}
            </section>
          ))}

          <aside className={styles.try} aria-label={c.tryTitle}>
            <h2>{c.tryTitle}</h2>
            <p>{c.tryText}</p>
            <p className={styles.trial}>
              <b>{trialLine.tag}</b>
              <span>{trialLine.text}</span>
              <Link href={trialLine.link.href}>{trialLine.link.label} →</Link>
            </p>
            <MagneticLink className={head.primary} href="/download">
              <span>Download MeetFly</span>
              <svg viewBox="0 0 16 16" aria-hidden="true">
                <path d="M8 2.5v8M4.5 7l3.5 3.5L11.5 7M3 13.5h10" />
              </svg>
            </MagneticLink>
          </aside>
        </div>
      </div>

      {related.length > 0 && (
        <nav className={styles.related} aria-label={c.relatedLabel}>
          <p>
            {c.relatedLabel}
            <Link href="/guides">{c.allLabel} →</Link>
          </p>
          <ul>
            {related.map((r) => (
              <li key={r.slug}>
                <Link href={`/guides/${r.slug}`}>
                  <span>{r.tag}</span>
                  <b>{r.title}</b>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </article>
  );
}
