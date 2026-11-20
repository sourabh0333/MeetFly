"use client";

import { useEffect, useRef, useState } from "react";
import { duringCall, featureGroups } from "@/content/features";
import { SectionHead } from "@/components/section-head/section-head";
import { DecodeText } from "@/components/hero/decode-text";
import { useOnScreen, useSeen } from "@/components/use-seen";
import styles from "./during-call.module.css";

// "During the call", told as one call with notes in the margin. The call reads down the page like
// a live transcript (time | what was said | the feature that helped). As you scroll, a progress line
// fills down the timestamps, each line's words light up one by one, a connector draws out to its
// margin note, and MeetFly's replies decode into place. Answer length swaps the reply's shape;
// Ask types itself. All scroll effects are CSS scroll-driven animations (no pinning); browsers
// without them show everything in place.
const group = featureGroups.find((g) => g.id === "during");
const byId = Object.fromEntries(group.items.map((f) => [f.id, f]));
let count = 0;
const events = duringCall.events.map((e) => (e.note ? { ...e, n: ++count } : e));
const panelN = ++count;

const Words = ({ text }) =>
  text.split(" ").map((w, i) => (
    <span key={i} className={styles.word} style={{ "--w": i }}>
      {w}{" "}
    </span>
  ));

function Note({ id, n }) {
  const f = byId[id];
  return (
    <aside className={styles.note}>
      <span className={styles.link} aria-hidden="true" />
      <p className={styles.noteHead}>
        <span>{String(n).padStart(2, "0")}</span>
        <b>{f.name}</b>
      </p>
      <p className={styles.noteText}>{f.text}</p>
    </aside>
  );
}

function Shapes({ e, live }) {
  const [i, setI] = useState(1);
  const touched = useRef(false);
  useEffect(() => {
    if (!live || touched.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    const id = setInterval(() => !touched.current && setI((x) => (x + 1) % e.shapes.length), 3200);
    return () => clearInterval(id);
  }, [live, e.shapes.length]);
  const s = e.shapes[i];
  return (
    <>
      <p className={styles.chips} role="radiogroup" aria-label={e.label}>
        {e.shapes.map((x, k) => (
          <button
            key={x.key}
            type="button"
            role="radio"
            aria-checked={k === i}
            onClick={() => {
              touched.current = true;
              setI(k);
            }}
          >
            {x.label}
          </button>
        ))}
      </p>
      <div className={styles.shape} key={s.key} aria-live="polite">
        {s.bullets ? (
          <ul>
            {s.bullets.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        ) : (
          <p>{s.text}</p>
        )}
      </div>
    </>
  );
}

function Typed({ text, live }) {
  const [n, setN] = useState(text.length);
  useEffect(() => {
    if (!live || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    let k = 0;
    setN(0);
    const id = setInterval(() => {
      k += 1;
      setN(k);
      if (k >= text.length) clearInterval(id);
    }, 45);
    return () => clearInterval(id);
  }, [live, text]);
  return (
    <>
      {text.slice(0, n)}
      {n < text.length && <i className={styles.caret} />}
    </>
  );
}

function Event({ e }) {
  const ref = useRef(null);
  const seen = useSeen(ref, 0.5);
  const on = useOnScreen(ref, 0.4);
  const who = e.who === "meetfly" ? duringCall.meetfly : e.who === "you" ? duringCall.you : duringCall.them;

  let body;
  if (e.kind === "reply") {
    body = <p className={styles.reply}>{seen ? <DecodeText text={e.text} delay={80} duration={1300} /> : e.text}</p>;
  } else if (e.kind === "shapes") {
    body = <Shapes e={e} live={on} />;
  } else if (e.kind === "action" || e.kind === "created") {
    body = (
      <ul className={styles.list}>
        {e.bullets.map((b) => (
          <li key={b}>{b}</li>
        ))}
      </ul>
    );
  } else if (e.kind === "screen") {
    body = (
      <>
        <p className={styles.screen}>
          <svg viewBox="0 0 16 16" aria-hidden="true">
            <path d="M2 3h12v8H2zM6 14h4M8 11v3" />
          </svg>
          {e.screen}
        </p>
        <p className={styles.line}>
          <Words text={e.text} />
        </p>
        <p className={styles.answer}>
          <img src="/brand/icon.svg" alt="" width="18" height="18" />
          {seen ? <DecodeText text={e.answer} delay={500} duration={1100} /> : e.answer}
        </p>
      </>
    );
  } else if (e.kind === "translate") {
    body = (
      <>
        <p className={`${styles.line} ${styles.foreign}`} lang="es">
          <Words text={e.text} />
        </p>
        <p className={styles.answer}>
          <span className={styles.lang}>{e.lang} → English</span>
          {seen ? <DecodeText text={e.translated} delay={400} duration={900} /> : e.translated}
        </p>
      </>
    );
  } else if (e.kind === "ask") {
    body = (
      <>
        <p className={styles.ask}>
          <Typed text={e.typed} live={seen} />
        </p>
        <p className={styles.answer}>
          <img src="/brand/icon.svg" alt="" width="18" height="18" />
          {seen ? <DecodeText text={e.answer} delay={e.typed.length * 45 + 300} duration={1000} /> : e.answer}
        </p>
      </>
    );
  } else if (e.kind === "notes") {
    body = (
      <dl className={styles.notes}>
        {e.items.map(([k, v]) => (
          <div key={k}>
            <dt>{k}</dt>
            <dd>{v}</dd>
          </div>
        ))}
      </dl>
    );
  } else {
    body = (
      <p className={styles.line}>
        <Words text={e.text} />
      </p>
    );
  }

  return (
    <li ref={ref} id={e.note ? `during-${e.note}` : undefined} className={styles.event} data-who={e.who} data-kind={e.kind || "line"} data-seen={seen || undefined}>
      <span className={styles.stamp}>{e.stamp}</span>
      <div className={styles.body}>
        <p className={styles.who}>
          {who}
          {e.label && <span>· {e.label}</span>}
          {e.kind === "action" && <span className={styles.tap}>Quick action</span>}
          {e.mark && <span className={styles.mark}>{e.mark}</span>}
        </p>
        {body}
      </div>
      {e.note && <Note id={e.note} n={e.n} />}
    </li>
  );
}

export function DuringCall() {
  const ref = useRef(null);
  const seen = useSeen(ref);
  const panelRef = useRef(null);
  const panelOn = useOnScreen(panelRef, 0.4);

  return (
    <section ref={ref} id="during" className={styles.section} data-in={seen || undefined} style={{ "--tone": group.tone }} aria-labelledby="during-title">
      <SectionHead id="during-title" eyebrow={duringCall.eyebrow} title={duringCall.title} lead={duringCall.lead} />

      <div className={styles.call}>
        <p className={styles.bar}>
          <span className={styles.live}>
            <i aria-hidden="true" />
            Live
          </span>
          {duringCall.meeting}
          <b>
            {group.items.length} {featuresLabel(group.items.length)}
          </b>
        </p>

        <div className={styles.timeline}>
        <span className={styles.rail} aria-hidden="true" />
        <ol>
          {events.map((e) => (
            <Event key={e.stamp + e.who} e={e} />
          ))}

          {/* The close: all of it lives in the floating panel. */}
          <li ref={panelRef} id={`during-${duringCall.panel.note}`} className={`${styles.event} ${styles.end}`} data-on={panelOn || undefined}>
            <span className={styles.stamp}>
              <svg viewBox="0 0 16 16" aria-hidden="true">
                <path d="M2.5 3.5h11v9h-11zM2.5 6h11" />
              </svg>
            </span>
            <div className={styles.body}>
              <p className={styles.endTitle}>{duringCall.panel.title}</p>
              <p className={styles.slider} aria-hidden="true">
                <span>{duringCall.panel.opacity}</span>
                <i>
                  <b />
                </i>
              </p>
            </div>
            <Note id={duringCall.panel.note} n={panelN} />
          </li>
        </ol>
        </div>
        <p className={styles.fine}>{duringCall.note}</p>
      </div>
    </section>
  );
}

function featuresLabel(n) {
  return n === 1 ? "feature" : "features in this call";
}
