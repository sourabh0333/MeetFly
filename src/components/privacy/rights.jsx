"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import { rights as c } from "@/content/privacy";
import { siteConfig } from "@/config/site";
import { SectionHead } from "@/components/section-head/section-head";
import { useOnScreen, useSeen } from "@/components/use-seen";
import styles from "./rights.module.css";

// "Your rights": one sentence, large, whose verbs are buttons (delete · choose · transcripts only ·
// switch off · sign out · ask us). The lit verb gets a lime highlighter, and the line under the
// sentence shows how to do it: the path in the app as a breadcrumb that steps in (Settings ›
// Privacy › Delete all meetings), what happens, who does it and when. The verbs take turns while on
// screen until someone picks one. Two ruled footnotes close it (children, policy changes). The
// contact address shows only once siteConfig.legal.contactEmail is set. All from the policy.
const STEP_MS = 4200;
const verbs = c.sentence.filter((p) => typeof p !== "string").map((p) => p.id);

export function Rights() {
  const ref = useRef(null);
  const seen = useSeen(ref, 0.15);
  const on = useOnScreen(ref, 0.15);
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(true);
  const [still, setStill] = useState(false);
  const email = siteConfig.legal?.contactEmail;

  useEffect(() => setStill(window.matchMedia("(prefers-reduced-motion: reduce)").matches), []);

  useEffect(() => {
    if (!seen || !on || !auto || still) return undefined;
    const id = setTimeout(() => setI((k) => (k + 1) % verbs.length), STEP_MS);
    return () => clearTimeout(id);
  }, [seen, on, auto, still, i]);

  const pick = (id) => {
    setAuto(false);
    setI(verbs.indexOf(id));
  };
  const id = verbs[i];
  const it = c.items[id];

  return (
    <section id="your-rights" ref={ref} className={styles.section} data-in={seen || undefined} aria-labelledby="rights-title">
      <SectionHead id="rights-title" eyebrow={c.eyebrow} title={c.title} lead={c.lead} />

      <p className={styles.sentence}>
        {c.sentence.map((p, k) =>
          typeof p === "string" ? (
            <Fragment key={k}>{p}</Fragment>
          ) : (
            <button
              key={p.id}
              type="button"
              className={styles.verb}
              aria-pressed={p.id === id}
              aria-controls="rights-how"
              data-ask={p.id === "ask" || undefined}
              onClick={() => pick(p.id)}
            >
              {p.verb}
            </button>
          ),
        )}
      </p>

      <div id="rights-how" className={styles.how} aria-live="polite">
        <div key={id} className={styles.howIn}>
          <div className={styles.col}>
            <span className={styles.label}>{c.whereLabel}</span>
            <ol className={styles.path}>
              {it.where.map((w, k) => (
                <li key={w} style={{ "--k": k }} data-last={k === it.where.length - 1 || undefined}>
                  {w}
                </li>
              ))}
            </ol>
          </div>
          <div className={styles.col}>
            <p className={styles.text}>{it.text}</p>
            {id === "ask" && email && (
              <a className={styles.mail} href={`mailto:${email}`}>
                {c.contact} {email}
              </a>
            )}
          </div>
          <dl className={styles.facts}>
            <div>
              <dt>{c.whoLabel}</dt>
              <dd data-us={id === "ask" || undefined}>{it.who}</dd>
            </div>
            <div>
              <dt>{c.whenLabel}</dt>
              <dd>{it.when}</dd>
            </div>
          </dl>
        </div>
        <span className={styles.timer} aria-hidden="true">
          {auto && seen && !still && <i key={i} style={{ "--step": `${STEP_MS}ms` }} />}
        </span>
      </div>

      <ul className={styles.foot}>
        {c.footnotes.map((f) => (
          <li key={f.title}>
            <b>{f.title}</b>
            <p>{f.text}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
