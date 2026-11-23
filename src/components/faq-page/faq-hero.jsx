"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { faqPage, faqs, topics } from "@/content/faq";
import { DecodeText } from "@/components/hero/decode-text";
import head from "@/components/features/features-hero.module.css";
import styles from "./faq-hero.module.css";

// The FAQ hero. The same centred headline as the other page heroes (shared styles), then a big
// search bar that types example questions by itself until you click into it. Typing filters every
// answer live (matches highlighted); topic chips with counts narrow it. Under it MeetFly answers the
// best match like the app's Ask box: the question, then the answer (decoding in while the bar
// plays examples, highlighted when you type), and an "Also asked" row of the next three matches.
// Common words that would light up everywhere; they are left out of matching.
const STOP = new Set("a an and are at be can do does for from how i if in is it its me my of on or the to what when where which who why will with you your".split(" "));
const norm = (s) => s.toLowerCase().normalize("NFKD").replace(/[^\p{L}\p{N}\s]/gu, " ");

function Marked({ text, words }) {
  if (!words.length) return text;
  const re = new RegExp(`(${words.map((w) => w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`, "gi");
  return text.split(re).map((part, i) => (i % 2 ? <mark key={i}>{part}</mark> : <span key={i}>{part}</span>));
}

export function FaqHero() {
  const inputRef = useRef(null);
  const [query, setQuery] = useState("");
  const [topic, setTopic] = useState("all");
  const [demo, setDemo] = useState("");
  const [typing, setTyping] = useState(false);
  const touched = useRef(false);

  // The search bar types example questions until someone uses it.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    const ex = faqPage.search.examples;
    let e = 0;
    let k = 0;
    let dir = 1;
    let wait = 0;
    const id = setInterval(() => {
      if (touched.current) return clearInterval(id);
      if (wait > 0) {
        wait -= 1;
        return undefined;
      }
      const t = ex[e];
      k += dir;
      setDemo(t.slice(0, k));
      if (dir === 1 && k >= t.length) {
        dir = -1;
        wait = 28;
      } else if (dir === -1 && k <= 0) {
        dir = 1;
        e = (e + 1) % ex.length;
        wait = 6;
      }
      return undefined;
    }, 55);
    return () => clearInterval(id);
  }, []);

  const effective = touched.current || typing ? query : demo;
  const words = useMemo(() => norm(effective).split(/\s+/).filter((w) => w.length > 1 && !STOP.has(w)), [effective]);

  const results = useMemo(() => {
    const pool = faqs.filter((f) => topic === "all" || f.topic === topic);
    if (!words.length) return pool;
    return pool
      .map((f) => {
        const hay = norm(`${f.q} ${f.a}`);
        const qn = norm(f.q);
        const score = words.reduce((s, w) => s + (qn.includes(w) ? 3 : 0) + (hay.includes(w) ? 1 : 0), 0);
        return { f, score };
      })
      .filter((x) => x.score > 0)
      .sort((a, b) => b.score - a.score)
      .map((x) => x.f);
  }, [words, topic]);

  const counts = useMemo(() => Object.fromEntries(topics.map((t) => [t.id, faqs.filter((f) => f.topic === t.id).length])), []);
  const [pickedQ, setPickedQ] = useState(null);
  useEffect(() => setPickedQ(null), [effective, topic]);
  const best = results.find((f) => f.q === pickedQ) || results[0];
  const list = results.slice(0, 6);
  // Related: other questions in the best match's topic; next: the next match in the list.
  const related = best ? faqs.filter((f) => f.topic === best.topic && f.q !== best.q).slice(0, 2) : [];
  const nextQ = best && results.length > 1 ? results[(results.indexOf(best) + 1) % results.length] : null;

  const start = () => {
    if (!touched.current) {
      touched.current = true;
      setQuery("");
      setDemo("");
    }
    setTyping(true);
  };

  return (
    <section id="faq-top" className={head.hero} aria-labelledby="faq-title">
      <div className={head.bg} aria-hidden="true">
        <span className={head.glowA} />
        <span className={head.glowB} />
      </div>

      <div className={head.head}>
        <p className={head.eyebrow}>
          <span className={head.tag}>
            <i aria-hidden="true" />
            {faqPage.eyebrow.tag}
          </span>
          {faqPage.eyebrow.text}
        </p>
        <h1 id="faq-title" className={head.title}>
          <span className={head.sr}>
            {faqPage.title.top} {faqPage.title.prefix} {faqPage.title.mark}
          </span>
          <span aria-hidden="true" className={head.line1}>
            <DecodeText text={faqPage.title.top} />
          </span>
          <span aria-hidden="true" className={head.line2}>
            {faqPage.title.prefix}{" "}
            <span className={head.mark}>
              {faqPage.title.mark}
              <svg viewBox="0 0 300 24" preserveAspectRatio="none" aria-hidden="true">
                <path pathLength="1" d="M4 16 C 60 6, 120 20, 180 11 S 270 8, 296 12" />
              </svg>
            </span>
          </span>
        </h1>
        <p className={head.lead}>{faqPage.lead}</p>
      </div>

      <div className={styles.wrap}>
        {/* The search bar. */}
        <label className={styles.search} data-live={!touched.current || undefined}>
          <span className={styles.sr}>{faqPage.search.label}</span>
          <svg className={styles.icon} viewBox="0 0 16 16" aria-hidden="true">
            <path d="M7 12A5 5 0 1 0 7 2a5 5 0 0 0 0 10zM14 14l-3.5-3.5" />
          </svg>
          <input
            ref={inputRef}
            type="search"
            value={touched.current ? query : demo}
            placeholder={faqPage.search.label}
            onFocus={start}
            onPointerDown={start}
            onChange={(e) => {
              start();
              setQuery(e.target.value);
            }}
            autoComplete="off"
            spellCheck="false"
          />
          {!touched.current && <i className={styles.caret} aria-hidden="true" />}
          {touched.current && query && (
            <button
              type="button"
              className={styles.clear}
              onClick={() => {
                setQuery("");
                inputRef.current?.focus();
              }}
            >
              {faqPage.search.clear}
            </button>
          )}
        </label>

        {/* Topics (left) and the answer count (right), on the bar's edges. */}
        <div className={styles.filters}>
          <p className={styles.topics} role="tablist" aria-label="Topics">
            {[{ id: "all", label: faqPage.search.all }, ...topics].map((t) => (
              <button key={t.id} type="button" role="tab" aria-selected={topic === t.id} onClick={() => setTopic(t.id)}>
                {t.label}
                <small>{t.id === "all" ? faqs.length : counts[t.id]}</small>
              </button>
            ))}
          </p>
          <p className={styles.count}>
            <b>{results.length}</b> {results.length === 1 ? faqPage.search.result : faqPage.search.results}
          </p>
        </div>

        {/* Matches (left) | MeetFly's answer (right). */}
        <div className={styles.split}>
          <p className={styles.colHead}>{faqPage.search.matches}</p>
          <p className={`${styles.colHead} ${styles.colHeadRight}`}>
            <img src="/brand/icon.svg" alt="" width="18" height="18" />
            {faqPage.search.answers}
            {best && <span>{topics.find((t) => t.id === best.topic).label}</span>}
          </p>
          <div className={styles.matches}>
            <ol>
              {list.map((f) => (
                <li key={f.q} data-on={f === best || undefined}>
                  <button type="button" onClick={() => setPickedQ(f.q)}>
                    <span className={styles.mTopic}>{topics.find((t) => t.id === f.topic).label}</span>
                    <span className={styles.mQ}>
                      <Marked text={f.q} words={words} />
                    </span>
                  </button>
                </li>
              ))}
            </ol>
            <a className={styles.browse} href="#browse">
              {faqPage.search.browse}
              <svg viewBox="0 0 16 16" aria-hidden="true">
                <path d="M8 3v10M4 9l4 4 4-4" />
              </svg>
            </a>
          </div>

          <div className={styles.answer} aria-live="polite">
            {best ? (
              <div className={styles.answerBody} key={best.q}>
                <h2 className={styles.q}>
                  <Marked text={best.q} words={words} />
                </h2>
                <p className={styles.a}>{words.length ? <Marked text={best.a} words={words} /> : <DecodeText text={best.a} delay={150} duration={900} />}</p>
              </div>
            ) : (
              <p className={styles.none}>{faqPage.search.none}</p>
            )}

            {/* Pinned to the bottom, so both columns end together. */}
            {best && (
              <div className={styles.answerFoot}>
                <div className={styles.related}>
                  <p className={styles.relatedLabel}>
                    {faqPage.search.more} {topics.find((t) => t.id === best.topic).label.toLowerCase()}
                  </p>
                  {related.map((f) => (
                    <button key={f.q} type="button" onClick={() => setPickedQ(f.q)}>
                      {f.q}
                    </button>
                  ))}
                </div>
                {nextQ && (
                  <button type="button" className={styles.next} onClick={() => setPickedQ(nextQ.q)}>
                    {faqPage.search.next}
                    <svg viewBox="0 0 16 16" aria-hidden="true">
                      <path d="M3 8h10M9 4l4 4-4 4" />
                    </svg>
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
