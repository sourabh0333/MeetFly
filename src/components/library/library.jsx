"use client";

import { useEffect, useRef, useState } from "react";
import { library } from "@/content/home";
import { SectionHead } from "@/components/section-head/section-head";
import { DecodeText } from "@/components/hero/decode-text";
import { useOnScreen, useSeen } from "@/components/use-seen";
import styles from "./library.module.css";

// "Your whole call history, one search away". No pinning, no boxes, full width.
// A giant search line types itself; results appear as a full-width index whose matching words
// get lime highlighter strokes; hovering a result (desktop) floats a notes preview after the
// cursor. Then "Ask across all meetings" with the answer decoding in, and three open columns.
export function Library() {
  const ref = useRef(null);
  const searchRef = useRef(null);
  const listRef = useRef(null);
  const seen = useSeen(ref);
  const on = useOnScreen(searchRef, 0.2);
  const [typed, setTyped] = useState(999);
  const [hover, setHover] = useState(-1);
  const [still, setStill] = useState(false);
  const preview = useRef(null);

  useEffect(() => setStill(window.matchMedia("(prefers-reduced-motion: reduce)").matches), []);

  // Type the query once each time the search comes into view.
  useEffect(() => {
    if (!on || still) return undefined;
    let n = 0;
    setTyped(0);
    const id = setInterval(() => {
      n += 1;
      setTyped(n);
      if (n > library.query.length + 2) clearInterval(id);
    }, 55);
    return () => clearInterval(id);
  }, [on, still]);

  // The floating preview follows the cursor over the list.
  const onMove = (e) => {
    const el = preview.current;
    const r = listRef.current.getBoundingClientRect();
    if (el) el.style.transform = `translate(${e.clientX - r.left + 24}px, ${e.clientY - r.top - 40}px)`;
  };

  const q = library.query.slice(0, Math.min(typed, library.query.length));
  const done = typed >= library.query.length;
  const shown = hover >= 0 && seen ? library.results[hover] : null;

  return (
    <section ref={ref} id="library" className={styles.section} data-in={seen || undefined} aria-labelledby="library-title">
      <SectionHead id="library-title" eyebrow={library.eyebrow} title={library.title} lead={library.lead} />

      {/* The giant search line. */}
      <div ref={searchRef} className={styles.search}>
        <p className={styles.label}>{library.searchLabel}</p>
        <p className={styles.line}>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14ZM20.5 20.5 16 16" />
          </svg>
          <span className={styles.query}>
            {q}
            {!done && <i className={styles.caret} />}
          </span>
          <kbd>⌘K</kbd>
        </p>
        <p className={styles.meta}>
          <b>{library.found}</b>
          {library.searchIn}
          <span>· {library.sample}</span>
        </p>
      </div>

      {/* Results, as an index. */}
      <div ref={listRef} className={styles.listWrap} onPointerMove={onMove} onPointerLeave={() => setHover(-1)}>
        <ol className={styles.results} data-in={seen || undefined} data-on={done || undefined}>
          {library.results.map((r, i) => (
            <li key={r.title} style={{ "--i": i }} onPointerEnter={() => setHover(i)}>
              <span className={styles.date}>{r.date}</span>
              <span className={styles.title}>
                {r.title}
                <em>{r.tag}</em>
              </span>
              <span className={styles.excerpt}>
                {r.excerpt.map((part, k) => (k % 2 ? <mark key={k}>{part}</mark> : <span key={k}>{part}</span>))}
              </span>
              <svg className={styles.go} viewBox="0 0 24 24" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </li>
          ))}
        </ol>

        {/* The floating notes preview. */}
        <div ref={preview} className={styles.preview} data-on={shown ? true : undefined} aria-hidden="true">
          {shown && (
            <>
              <p className={styles.pvHead}>
                <img src="/brand/icon.svg" alt="" width="18" height="18" />
                {library.previewLabel}
                <span>{shown.preview.length}</span>
              </p>
              <p className={styles.pvTitle}>{shown.title}</p>
              <p className={styles.pvSummary}>{shown.preview.summary}</p>
              <ul>
                {shown.preview.items.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>

      {/* Ask across all meetings. */}
      <div className={styles.ask}>
        <div>
          <p className={styles.label}>{library.askLabel}</p>
          <p className={styles.askQ}>“{library.askQ}”</p>
        </div>
        <p className={styles.askA}>
          <img src="/brand/icon.svg" alt="" width="26" height="26" />
          <span>{seen ? <DecodeText text={library.askA} delay={600} duration={1300} /> : library.askA}</span>
        </p>
      </div>

      {/* Three open columns. */}
      <div className={styles.cols}>
        <div style={{ "--i": 0 }}>
          <h3>{library.organise.title}</h3>
          <ul className={styles.tags}>
            {library.organise.tags.map((t) => (
              <li key={t}>
                <i />
                {t}
              </li>
            ))}
          </ul>
          <p>{library.rewrite}</p>
        </div>
        <div style={{ "--i": 1 }}>
          <h3>{library.exports.title}</h3>
          <ul className={styles.files}>
            {library.exports.items.map((x) => (
              <li key={x} data-kind={x}>
                {x}
              </li>
            ))}
          </ul>
        </div>
        <div style={{ "--i": 2 }}>
          <h3>{library.palette.title}</h3>
          <ul className={styles.cmds}>
            {library.palette.items.map((x) => (
              <li key={x}>
                <span>↵</span>
                {x}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
