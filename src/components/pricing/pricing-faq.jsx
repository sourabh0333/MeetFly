"use client";

import { useRef } from "react";
import { pricingFaq as f } from "@/content/pricing";
import { SectionHead } from "@/components/section-head/section-head";
import { MagneticLink } from "@/components/hero/magnetic-link";
import { useSeen } from "@/components/use-seen";
import styles from "./pricing-faq.module.css";

// "Quick answers": the pricing questions as one ruled table on a single grid. Columns: Topic ·
// Question · Short answer · The detail. Each topic (Plans · Hours · Trial and paying) labels its
// group of rows from the left (number, name, line, count); every row carries the question, its
// answer at a glance as a pill ("No" ink, "Yes" lime, short values violet) and the full answer,
// all visible, so nothing moves. Rows and groups share one set of columns (CSS subgrid), so every
// edge lines up. Rows rise in as the table is seen, the pills flip in and a lime highlighter sweeps
// over each answer's key phrase; hovering a row lights it. A closing row on the same grid: "Still
// deciding?" + Start free trial and All other questions. Answers are the app's own.
const Arrow = () => (
  <svg viewBox="0 0 16 16" aria-hidden="true">
    <path d="M3 8h9M8.5 4.5L12 8l-3.5 3.5" />
  </svg>
);

// "**phrase**" → a highlighted phrase.
const marked = (text) =>
  text.split("**").map((part, i) =>
    i % 2 ? (
      <mark key={i} className={styles.mark}>
        {part}
      </mark>
    ) : (
      part
    ),
  );

export function PricingFaq() {
  const ref = useRef(null);
  const seen = useSeen(ref, 0.1);
  let n = 0;

  return (
    <section id="pricing-faq" ref={ref} className={styles.section} data-in={seen || undefined} aria-labelledby="pricing-faq-title">
      <SectionHead id="pricing-faq-title" eyebrow={f.eyebrow} title={f.title} lead={f.lead} />

      <div className={styles.table} role="table" aria-label={f.eyebrow}>
        <div className={styles.headRow} role="row">
          {Object.values(f.columns).map((c) => (
            <span key={c} role="columnheader">
              {c}
            </span>
          ))}
        </div>

        {f.topics.map((t, g) => {
          const items = f.items.filter((it) => it.topic === t.id);
          return (
            <div key={t.id} className={styles.group} role="rowgroup" style={{ "--g": g }}>
              <div className={styles.topic} style={{ gridRow: `1 / span ${items.length}` }}>
                <span className={styles.topicNum}>{String(g + 1).padStart(2, "0")}</span>
                <b>{t.label}</b>
                <span className={styles.topicLine}>{t.line}</span>
                <em>
                  {items.length} {items.length === 1 ? "question" : "questions"}
                </em>
              </div>

              {items.map((it) => {
                const k = n++;
                return (
                  <div key={it.id} className={styles.row} role="row" style={{ "--k": k }}>
                    <span className={styles.rowTopic} role="cell">
                      {t.label}
                    </span>
                    <h3 className={styles.q} role="rowheader">
                      <span className={styles.num}>{String(k + 1).padStart(2, "0")}</span>
                      {it.q}
                    </h3>
                    <span role="cell" className={styles.quickCell}>
                      <span className={styles.quick} data-tone={it.tone}>
                        {it.tone === "yes" && <i aria-hidden="true">✓</i>}
                        {it.tone === "no" && <i aria-hidden="true">✕</i>}
                        {it.quick}
                      </span>
                    </span>
                    <p className={styles.a} role="cell">
                      {marked(it.a)}
                    </p>
                  </div>
                );
              })}
            </div>
          );
        })}

        <div className={styles.close}>
          <p className={styles.closeTitle}>{f.aside.title}</p>
          <p className={styles.closeText}>{f.aside.text}</p>
          <div className={styles.closeActions}>
            <a className={styles.more} href={f.aside.more.href}>
              {f.aside.more.label}
              <Arrow />
            </a>
            <MagneticLink className={styles.cta} href={f.aside.cta.href}>
              <span>{f.aside.cta.label}</span>
              <Arrow />
            </MagneticLink>
          </div>
        </div>
      </div>
    </section>
  );
}
