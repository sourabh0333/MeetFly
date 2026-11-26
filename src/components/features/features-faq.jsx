"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { featuresFaq as f } from "@/content/features";
import { SectionHead } from "@/components/section-head/section-head";
import { useOnScreen, useSeen } from "@/components/use-seen";
import styles from "./features-faq.module.css";

// Feature questions: an index and a reading stage. Left (5fr), the six questions as numbered
// lines on a ruled list; the open one turns ink with a violet bar and a timer line under it. Right
// (7fr), the answer, large, with its key phrase swept by a lime highlighter, then "See it on this
// page" links that jump to the section showing it. It steps through the questions while on screen
// until someone picks one. Phones: no stage; the answer opens under its question. "All questions"
// → /faq. Everything is what the app does.
const STEP_MS = 6500;

// The answer with its key phrase marked.
function Answer({ it }) {
  const at = it.key ? it.a.indexOf(it.key) : -1;
  if (at < 0) return it.a;
  return (
    <>
      {it.a.slice(0, at)}
      <mark>{it.key}</mark>
      {it.a.slice(at + it.key.length)}
    </>
  );
}

function Links({ it }) {
  return (
    <p className={styles.links}>
      <span>{f.linksLabel}</span>
      {it.links.map((l) =>
        l.href.startsWith("/") ? (
          <Link key={l.href} href={l.href}>
            {l.label}
            <i aria-hidden="true">→</i>
          </Link>
        ) : (
          <a key={l.href} href={l.href}>
            {l.label}
            <i aria-hidden="true">↑</i>
          </a>
        ),
      )}
    </p>
  );
}

export function FeaturesFaq() {
  const ref = useRef(null);
  const seen = useSeen(ref, 0.15);
  const on = useOnScreen(ref, 0.15);
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(true);
  const [still, setStill] = useState(false);

  useEffect(() => setStill(window.matchMedia("(prefers-reduced-motion: reduce)").matches), []);

  useEffect(() => {
    if (!seen || !on || !auto || still) return undefined;
    const id = setTimeout(() => setI((k) => (k + 1) % f.items.length), STEP_MS);
    return () => clearTimeout(id);
  }, [seen, on, auto, still, i]);

  const pick = (k) => {
    setAuto(false);
    setI(k);
  };
  const it = f.items[i];
  const num = (k) => String(k + 1).padStart(2, "0");

  return (
    <section id="features-faq" ref={ref} className={styles.section} data-in={seen || undefined} data-paused={!on || undefined} aria-labelledby="features-faq-title">
      <SectionHead id="features-faq-title" eyebrow={f.eyebrow} title={f.title} lead={f.lead} />

      <div className={styles.layout}>
        {/* The index */}
        <div className={styles.index}>
          <ol className={styles.list} aria-label={f.label}>
            {f.items.map((q, k) => (
              <li key={q.q} data-open={k === i || undefined} style={{ "--k": k }}>
                <button type="button" aria-expanded={k === i} aria-controls={`ff-a-${k}`} onClick={() => pick(k)}>
                  <span className={styles.num}>{num(k)}</span>
                  <span className={styles.q}>{q.q}</span>
                  <svg viewBox="0 0 16 16" aria-hidden="true">
                    <path d="M3 8h9M8.5 4.5L12 8l-3.5 3.5" />
                  </svg>
                </button>
                <span className={styles.timer} aria-hidden="true">
                  {k === i && auto && seen && !still && <i key={i} style={{ "--step": `${STEP_MS}ms` }} />}
                </span>
                {/* Phones: the answer opens right here. */}
                <div className={styles.inline} id={`ff-a-${k}`}>
                  <div>
                    <p className={styles.inlineA}>
                      <Answer it={q} />
                    </p>
                    <Links it={q} />
                  </div>
                </div>
              </li>
            ))}
          </ol>
          <Link href={f.more.href} className={styles.more}>
            {f.more.label}
            <svg viewBox="0 0 16 16" aria-hidden="true">
              <path d="M3 8h9M8.5 4.5L12 8l-3.5 3.5" />
            </svg>
          </Link>
        </div>

        {/* The stage */}
        <div className={styles.stage} aria-live="polite">
          <div key={i} className={styles.read}>
            <p className={styles.meta}>
              <b>Q {num(i)}</b> / {num(f.items.length - 1)}
            </p>
            <p className={styles.stageQ}>{it.q}</p>
            <p className={styles.stageA}>
              <span className={styles.aMark} aria-hidden="true">
                A.
              </span>
              <Answer it={it} />
            </p>
            <Links it={it} />
          </div>
        </div>
      </div>
    </section>
  );
}
