"use client";

import { useEffect, useRef, useState } from "react";
import { languages } from "@/content/home";
import { SectionHead } from "@/components/section-head/section-head";
import { useOnScreen, useSeen } from "@/components/use-seen";
import styles from "./languages.module.css";

// "Speak any language": live caption translation. No pinning, no boxes, full width.
// A 5fr / 7fr spread: what they say (English, serif, with a live voice line under it) | what you
// read, in huge type, re-written in the chosen language (words blur in; right-to-left for
// Arabic). Under it, the 14 languages as a two-row strip across the page; it moves through them
// by itself until someone picks one.
const L = languages.langs;

export function Languages() {
  const ref = useRef(null);
  const stageRef = useRef(null);
  const seen = useSeen(ref);
  const on = useOnScreen(stageRef, 0.3);
  const [active, setActive] = useState(2);
  const touched = useRef(false);

  useEffect(() => {
    if (!on || touched.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    const id = setInterval(() => !touched.current && setActive((a) => (a + 1) % L.length), 2800);
    return () => clearInterval(id);
  }, [on]);

  const pick = (i) => {
    touched.current = true;
    setActive(i);
  };
  const lang = L[active];

  return (
    <section ref={ref} id="languages" className={styles.section} data-in={seen || undefined} aria-labelledby="languages-title">
      <SectionHead id="languages-title" eyebrow={languages.eyebrow} title={languages.title} lead={languages.lead} />

      {/* One shared grid: labels on row 1, the two lines on row 2, the details on row 3. */}
      <div ref={stageRef} className={styles.spread} aria-live="polite">
        <p className={styles.label} data-col="l">
          <b>EN</b>
          {languages.them}
        </p>
        <p className={styles.label} data-col="r">
          <b>{lang.code}</b>
          {languages.you}
          <span className={styles.live}>
            <span className={styles.dot} aria-hidden="true" />
            {languages.live}
          </span>
        </p>

        <p className={styles.original} data-col="l">
          “{languages.original}”
        </p>
        <p className={styles.translated} data-col="r" key={lang.code} lang={lang.code.toLowerCase()} dir={lang.rtl ? "rtl" : "ltr"}>
          {/* Whole words (not letters), so joined scripts like Arabic and Hindi stay intact. */}
          {lang.text.split(" ").map((w, i, all) => (
            <span key={i}>
              <span className={styles.w} style={{ "--i": i }}>
                {w}
              </span>
              {i < all.length - 1 ? " " : ""}
            </span>
          ))}
        </p>

        <div className={styles.voice} data-col="l" aria-hidden="true">
          {Array.from({ length: 28 }, (_, i) => (
            <i key={i} style={{ "--d": `${((i * 0.13) % 1.1).toFixed(2)}s`, "--h": (0.3 + ((i * 7) % 10) / 14).toFixed(2) }} />
          ))}
        </div>
        <p className={styles.langName} data-col="r" key={`n-${lang.code}`}>
          {lang.name}
          <span>
            {String(active + 1).padStart(2, "0")} / {L.length}
          </span>
        </p>
      </div>

      <div className={styles.pickWrap}>
        <p className={styles.label}>{languages.pick}</p>
        <div className={styles.strip} role="radiogroup" aria-label={languages.pick}>
          {L.map((l, i) => (
            <button key={l.code} type="button" role="radio" aria-checked={i === active} onClick={() => pick(i)} style={{ "--i": i }}>
              <b>{l.code}</b>
              <span>{l.name}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
