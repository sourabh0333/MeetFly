"use client";

import { useEffect, useRef, useState } from "react";
import { afterCall, featureGroups } from "@/content/features";
import { SectionHead } from "@/components/section-head/section-head";
import { DecodeText } from "@/components/hero/decode-text";
import { useOnScreen, useSeen } from "@/components/use-seen";
import styles from "./after-call.module.css";

// "After the call", counting up from the moment you hang up (the mirror of Before, which counts
// down). A line along the top fills left to right as you scroll, from a red "You hang up" dot, over
// three ruled columns: +0 min (when you hang up), +2 min (before your next call), +1 week (whenever
// you need it). Each column's time rolls up like the Before numerals and lists its three features.
// The features step through by themselves (hover / focus / tap picks one); under the columns, one
// full-width line shows the picked one: its time, name and text | a small live example.
const group = featureGroups.find((g) => g.id === "after");
const byId = Object.fromEntries(group.items.map((f) => [f.id, f]));

function Typed({ text, live, delay = 0, speed = 30 }) {
  const [n, setN] = useState(text.length);
  useEffect(() => {
    if (!live || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    let k = 0;
    let id = 0;
    setN(0);
    const start = setTimeout(() => {
      id = setInterval(() => {
        k += 1;
        setN(k);
        if (k >= text.length) clearInterval(id);
      }, speed);
    }, delay);
    return () => {
      clearTimeout(start);
      clearInterval(id);
    };
  }, [live, text, delay, speed]);
  return (
    <>
      {text.slice(0, n)}
      {live && n < text.length && <i className={styles.caret} />}
    </>
  );
}

const Icon = ({ d }) => (
  <svg viewBox="0 0 16 16" aria-hidden="true">
    <path d={d} />
  </svg>
);
const SEARCH = "M7 12A5 5 0 1 0 7 2a5 5 0 0 0 0 10zM14 14l-3.5-3.5";
const CHECK = "M3.5 8.5l3 3 6-7";
const MAIL = "M2.5 4h11v8h-11zM2.5 4.5L8 9l5.5-4.5";
const PEN = "M10.5 2.5l3 3L6 13H3v-3z";

// "**word**" → a highlighted word.
const Marked = ({ text }) =>
  text.split(/\*\*(.+?)\*\*/).map((t, i) => (i % 2 ? <mark key={i}>{t}</mark> : <span key={i}>{t}</span>));

function Templates({ p, live }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (!live || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    const id = setInterval(() => setI((x) => (x + 1) % p.templates.length), 2400);
    return () => clearInterval(id);
  }, [live, p.templates.length]);
  return (
    <span className={styles.template}>
      <span className={styles.mono}>Rewrite as</span>
      <b key={i}>{p.templates[i]}</b>
      <svg viewBox="0 0 16 16" aria-hidden="true">
        <path d="M4 6l4 4 4-4" />
      </svg>
    </span>
  );
}

function Part({ p, seen, live }) {
  switch (p.kind) {
    case "search":
      return (
        <>
          <p className={styles.search}>
            <Icon d={SEARCH} />
            <span>
              <Typed text={p.query} live={seen} delay={200} speed={70} />
            </span>
          </p>
          <p className={styles.hit}>
            <b>{p.hit}</b>
            <span>
              <Marked text={p.excerpt} />
            </span>
          </p>
        </>
      );
    case "ask":
      return (
        <>
          <p className={styles.question}>{p.question}</p>
          <p className={styles.answer}>
            <img src="/brand/icon.svg" alt="" width="18" height="18" />
            <span>{seen ? <DecodeText text={p.answer} delay={250} duration={1100} /> : p.answer}</span>
          </p>
        </>
      );
    case "title":
      return (
        <>
          <h3 className={styles.docTitle}>{p.title}</h3>
          <p className={styles.metaRow}>
            {p.meta.map((m) => (
              <span key={m}>{m}</span>
            ))}
            <Templates p={p} live={live} />
          </p>
        </>
      );
    case "player":
      return (
        <p className={styles.player}>
          <span className={styles.play} aria-hidden="true">
            <svg viewBox="0 0 16 16">
              <path d="M5.5 4v8l6.5-4z" />
            </svg>
          </span>
          <span className={styles.wave} aria-hidden="true">
            {Array.from({ length: 56 }, (_, k) => (
              <i key={k} style={{ "--h": (0.18 + 0.82 * Math.abs(Math.sin(k * 1.3) * Math.cos(k * 0.29))).toFixed(3) }} />
            ))}
            <span className={styles.head} />
          </span>
          <span className={styles.mono}>{p.length}</span>
          <span className={styles.recLabel}>
            <i />
            {p.label}
          </span>
        </p>
      );
    case "stats":
      return (
        <>
          <p className={styles.talk} style={{ "--you": `${p.you}%` }}>
            <span className={styles.talkBar} aria-hidden="true">
              <i />
            </span>
            <span className={styles.talkLabels}>
              <span>
                {p.youLabel} {p.you}%
              </span>
              <span>
                {p.themLabel} {100 - p.you}%
              </span>
            </span>
          </p>
          <dl className={styles.statList}>
            {p.items.map(([k, v]) => (
              <div key={k}>
                <dt>{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
        </>
      );
    case "notes":
      return (
        <>
          <p className={styles.mono}>{p.summaryLabel}</p>
          <p className={styles.summary}>{p.summary}</p>
          {p.groups.map(([label, items], g) => (
            <div key={label} className={styles.group}>
              <p className={styles.mono}>{label}</p>
              <ul className={styles.ticks}>
                {items.map((it, k) => (
                  <li key={it} style={{ "--k": g * 2 + k }}>
                    <span aria-hidden="true">
                      <Icon d={CHECK} />
                    </span>
                    {it}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </>
      );
    case "mine":
      return (
        <>
          <p className={`${styles.mono} ${styles.mineLabel}`}>
            <Icon d={PEN} />
            {p.label}
          </p>
          <ul className={styles.mine}>
            {p.items.map((it) => (
              <li key={it}>{it}</li>
            ))}
          </ul>
        </>
      );
    case "email":
      return (
        <>
          <p className={styles.subject}>
            <Icon d={MAIL} />
            {p.subject}
          </p>
          <p className={styles.body}>
            <Typed text={p.body} live={seen} delay={300} speed={18} />
          </p>
          <p>
            <span className={styles.ink}>{p.open}</span>
          </p>
        </>
      );
    default:
      return (
        <p className={styles.exportRow}>
          <span className={styles.ink}>{p.copy}</span>
          {p.formats.map((f) => (
            <span key={f}>{f}</span>
          ))}
        </p>
      );
  }
}

const parts = Object.fromEntries(afterCall.parts.map((p) => [p.id, p]));
const order = afterCall.times.flatMap((t) => t.features.map((id) => ({ id, time: t })));
const DIGITS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

// One rolling digit (like the Before section's numerals), counting up when `on`.
const Roll = ({ value, on }) => (
  <span className={styles.roll}>
    <span className={styles.strip} style={{ "--d": on ? value : 0 }}>
      {DIGITS.map((x) => (
        <span key={x}>{x}</span>
      ))}
    </span>
  </span>
);

export function AfterCall() {
  const ref = useRef(null);
  const gridRef = useRef(null);
  const detailRef = useRef(null);
  const seen = useSeen(ref);
  const gridSeen = useSeen(gridRef, 0.3);
  const on = useOnScreen(gridRef, 0.2);
  const [active, setActive] = useState(0);
  const touched = useRef(false);

  // Scroll fills the timeline along the top, left to right.
  useEffect(() => {
    const el = gridRef.current;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.style.setProperty("--p", 1);
      return undefined;
    }
    let frame = 0;
    const update = () => {
      frame = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = (vh * 0.85 - r.top) / (vh * 0.55);
      el.style.setProperty("--p", Math.min(1, Math.max(0, p)).toFixed(4));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Step through the features while on screen, until one is picked.
  useEffect(() => {
    if (!on || touched.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    const id = setInterval(() => !touched.current && setActive((a) => (a + 1) % order.length), 4200);
    return () => clearInterval(id);
  }, [on]);

  const pick = (i) => {
    touched.current = true;
    setActive(i);
  };
  const cur = order[active];
  const f = byId[cur.id];

  return (
    <section ref={ref} id="after" className={styles.section} data-in={seen || undefined} style={{ "--tone": group.tone }} aria-labelledby="after-title">
      <SectionHead id="after-title" eyebrow={afterCall.eyebrow} title={afterCall.title} lead={afterCall.lead} />

      <div ref={gridRef} className={styles.board} data-on={gridSeen || undefined}>
        {/* The timeline along the top, from the moment you hang up. */}
        <p className={styles.timeline} aria-hidden="true">
          <span className={styles.start}>
            <i />
            {afterCall.start}
          </span>
        </p>

        <div className={styles.cols}>
          <span className={styles.fillLine} aria-hidden="true">
            <i />
          </span>
          {afterCall.times.map((t, ti) => (
            <div key={t.id} className={styles.col} style={{ "--c": ti }} data-on={cur.time.id === t.id || undefined}>
              <span className={styles.tick} aria-hidden="true" />
              <p className={styles.time}>
                <span className={styles.plus}>+</span>
                <Roll value={t.plus} on={gridSeen} />
                <span className={styles.unit}>{t.unit}</span>
              </p>
              <p className={styles.timeLabel}>{t.label}</p>
              <ul className={styles.list}>
                {t.features.map((id) => {
                  const i = order.findIndex((o) => o.id === id);
                  return (
                    <li key={id} id={`after-${id}`}>
                      <button
                        type="button"
                        aria-pressed={i === active}
                        onPointerEnter={(e) => e.pointerType === "mouse" && pick(i)}
                        onFocus={() => pick(i)}
                        onClick={() => {
                          pick(i);
                          // Phones: the detail sits under all the columns, so bring it into view.
                          if (window.innerWidth <= 900) detailRef.current.scrollIntoView({ block: "center", behavior: "smooth" });
                        }}
                      >
                        <span className={styles.num}>{String(i + 1).padStart(2, "0")}</span>
                        <span className={styles.fname}>{byId[id].name}</span>
                        <span className={styles.arrow} aria-hidden="true">
                          <svg viewBox="0 0 16 16">
                            <path d="M3 8h10M9 4l4 4-4 4" />
                          </svg>
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        {/* The picked feature: what it is | a live example. */}
        <div ref={detailRef} className={styles.detail} aria-live="polite">
          <div className={styles.what} key={`w-${cur.id}`}>
            <p className={styles.whereTag}>
              <span>
                +{cur.time.plus} {cur.time.unit}
              </span>
              {cur.time.label}
            </p>
            <h3>{f.name}</h3>
            <p className={styles.whatText}>{f.text}</p>
            <p className={styles.hint}>
              {String(active + 1).padStart(2, "0")} / {String(order.length).padStart(2, "0")} · {afterCall.hint}
            </p>
          </div>
          <div className={styles.example} key={`e-${cur.id}`}>
            <Part p={parts[cur.id]} seen live={on} />
          </div>
        </div>
      </div>
      <p className={styles.fine}>{afterCall.example}</p>
    </section>
  );
}
