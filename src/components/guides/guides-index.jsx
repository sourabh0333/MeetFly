import Link from "next/link";
import { guides, guidesPage as c, readingMinutes } from "@/content/guides";
import { DecodeText } from "@/components/hero/decode-text";
import head from "@/components/features/features-hero.module.css";
import styles from "./guides.module.css";

// /guides: the shared centred hero, then the guides as an editorial index: ruled rows of number |
// topic and reading time | the title in large type and its lead | a round arrow. The whole row is
// the link; on hover the title shifts and the arrow fills. Server-rendered.
const date = (iso) => new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

export function GuidesIndex() {
  return (
    <>
      <section id="guides-top" className={head.hero} aria-labelledby="guides-title">
        <div className={head.bg} aria-hidden="true">
          <span className={head.glowA} />
          <span className={head.glowB} />
        </div>
        <div className={head.head}>
          <p className={head.eyebrow}>
            <span className={head.tag}>
              <i aria-hidden="true" />
              {c.eyebrow.tag}
            </span>
            {c.eyebrow.text}
          </p>
          <h1 id="guides-title" className={head.title}>
            <span className={head.sr}>
              {c.title.top} {c.title.prefix} {c.title.mark}
            </span>
            <span aria-hidden="true" className={head.line1}>
              <DecodeText text={c.title.top} />
            </span>
            <span aria-hidden="true" className={head.line2}>
              {c.title.prefix}{" "}
              <span className={head.mark}>
                {c.title.mark}
                <svg viewBox="0 0 300 24" preserveAspectRatio="none" aria-hidden="true">
                  <path pathLength="1" d="M4 16 C 60 6, 120 20, 180 11 S 270 8, 296 12" />
                </svg>
              </span>
            </span>
          </h1>
          <p className={head.lead}>{c.lead}</p>
        </div>
      </section>

      <section className={styles.index} aria-label={c.eyebrow.tag}>
        <ol>
          {guides.map((g, i) => (
            <li key={g.slug}>
              <Link href={`/guides/${g.slug}`} className={styles.row}>
                <span className={styles.n}>{String(i + 1).padStart(2, "0")}</span>
                <span className={styles.meta}>
                  <b>{g.tag}</b>
                  <span>
                    {readingMinutes(g)} {c.readLabel}
                  </span>
                  <span>
                    {c.updatedLabel} {date(g.updated)}
                  </span>
                </span>
                <span className={styles.text}>
                  <h2>{g.title}</h2>
                  <p>{g.lead}</p>
                </span>
                <span className={styles.go} aria-hidden="true">
                  <svg viewBox="0 0 16 16">
                    <path d="M3 8h9M8.5 4.5L12 8l-3.5 3.5" />
                  </svg>
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </section>
    </>
  );
}
