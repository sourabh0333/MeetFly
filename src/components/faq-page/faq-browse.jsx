"use client";

import { useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { browse, faqs, topics } from "@/content/faq";
import { SectionHead } from "@/components/section-head/section-head";
import { useSeen } from "@/components/use-seen";
import styles from "./faq-browse.module.css";

// "Every answer, by topic" as an answer wall. Topic tabs in big type on one line with counts and a
// sliding underline. Under them a ruled three-column grid of question cells. Clicking a cell opens
// its answer in a full-width row right under that row (a pointer marks the cell, order never changes); switching topic filters the wall. Both changes run in a
// View Transition so the cells glide to their new places (browsers without it just reflow).
// /faq#topic-<id> picks that topic.
const all = faqs.map((f, i) => ({ ...f, i }));

function withTransition(update) {
  if (typeof document !== "undefined" && document.startViewTransition && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    document.startViewTransition(() => flushSync(update));
  } else update();
}

export function FaqBrowse() {
  const ref = useRef(null);
  const tabsRef = useRef(null);
  const seen = useSeen(ref);
  const [topic, setTopic] = useState("all");
  const [open, setOpen] = useState(null);
  const [bar, setBar] = useState({ x: 0, w: 0 });
  const [cols, setCols] = useState(3);

  // How many columns the wall has (matches the CSS), so an answer opens under its row.
  useEffect(() => {
    const m2 = window.matchMedia("(max-width: 900px)");
    const m1 = window.matchMedia("(max-width: 600px)");
    const set = () => setCols(m1.matches ? 1 : m2.matches ? 2 : 3);
    set();
    m1.addEventListener("change", set);
    m2.addEventListener("change", set);
    return () => {
      m1.removeEventListener("change", set);
      m2.removeEventListener("change", set);
    };
  }, []);

  // The underline under the active tab.
  useEffect(() => {
    const place = () => {
      const el = tabsRef.current?.querySelector('[aria-selected="true"]');
      if (el) setBar({ x: el.offsetLeft, w: el.offsetWidth });
    };
    place();
    window.addEventListener("resize", place);
    return () => window.removeEventListener("resize", place);
  }, [topic]);

  // /faq#topic-<id> picks that topic.
  useEffect(() => {
    const fromHash = () => {
      const m = window.location.hash.match(/^#topic-(.+)$/);
      if (m && topics.some((t) => t.id === m[1])) {
        setTopic(m[1]);
        ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };
    fromHash();
    window.addEventListener("hashchange", fromHash);
    return () => window.removeEventListener("hashchange", fromHash);
  }, []);

  const pickTopic = (id) =>
    withTransition(() => {
      setTopic(id);
      setOpen(null);
    });
  const toggle = (i) => withTransition(() => setOpen((o) => (o === i ? null : i)));

  const shown = all.filter((f) => topic === "all" || f.topic === topic);
  const count = (id) => (id === "all" ? all.length : all.filter((f) => f.topic === id).length);
  const label = (id) => topics.find((t) => t.id === id)?.label;

  return (
    <section ref={ref} id="browse" className={styles.section} data-in={seen || undefined} aria-labelledby="browse-title">
      <SectionHead id="browse-title" eyebrow={browse.eyebrow} title={browse.title} lead={browse.lead} />

      <div className={styles.wrap}>
        {/* Topic tabs. */}
        <div ref={tabsRef} className={styles.tabs} role="tablist" aria-label={browse.title}>
          {[{ id: "all", label: "All" }, ...topics].map((t) => (
            <button key={t.id} id={`topic-${t.id}`} type="button" role="tab" aria-selected={topic === t.id} onClick={() => pickTopic(t.id)}>
              {t.label}
              <sup>{count(t.id)}</sup>
            </button>
          ))}
          <span className={styles.bar} style={{ transform: `translateX(${bar.x}px)`, width: bar.w }} aria-hidden="true" />
        </div>

        {/* The wall. */}
        <ul className={styles.wall}>
          {shown.flatMap((f, idx) => {
            const isOpen = open === f.i;
            const cell = (
              <li key={f.i} className={styles.cell} data-open={isOpen || undefined} style={{ viewTransitionName: `faq-${f.i}` }}>
                <button type="button" aria-expanded={isOpen} onClick={() => toggle(f.i)}>
                  <span className={styles.meta}>
                    <span className={styles.n}>{String(f.i + 1).padStart(2, "0")}</span>
                    <span className={styles.topic}>{label(f.topic)}</span>
                  </span>
                  <span className={styles.q}>{f.q}</span>
                  <span className={styles.plus} aria-hidden="true" />
                </button>
              </li>
            );
            // After the last cell of the open cell's row, the answer as its own full row.
            const openIdx = shown.findIndex((x) => x.i === open);
            const rowEnd = openIdx < 0 ? -1 : Math.min(shown.length - 1, Math.floor(openIdx / cols) * cols + cols - 1);
            if (idx !== rowEnd) return [cell];
            const o = shown[openIdx];
            return [
              cell,
              <li key={`a-${o.i}`} className={styles.answerRow} style={{ viewTransitionName: "faq-answer", "--col": openIdx % cols, "--cols": cols }}>
                <span className={styles.pointer} aria-hidden="true" />
                <p className={styles.aq}>{o.q}</p>
                <p className={styles.a}>{o.a}</p>
              </li>,
            ];
          })}
        </ul>
      </div>
    </section>
  );
}
