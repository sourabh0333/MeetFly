"use client";

import { useEffect, useRef, useState } from "react";
import { billing as b } from "@/content/pricing";
import { useOnScreen, useSeen } from "@/components/use-seen";
import styles from "./pricing-billing.module.css";

// "How billing works": a dark full-width band holding one matrix. Columns are the four stories
// (Your free trial · Your monthly hours · Change or cancel · Interview Pass), each headed by its
// number, title, line and a plan band (what you're on as time passes). Rows are the four shared
// phases (It starts · Along the way · The turn · After), labelled on the left, so every story's
// steps line up across the page; each column runs down a rail with a pin per step, and the
// column's note closes it. A lit row moves down the phases by itself (paused under the pointer);
// hovering a column lights its rail. Under the matrix, four plain facts. Under 960px the matrix
// becomes one story after another (each step then shows its phase). Every line is what the app does.
const ROW_MS = 2200;

const icons = {
  lock: <path d="M7 11V8a5 5 0 0 1 10 0v3M6 11h12v9H6z" />,
  coin: <path d="M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM14.5 9.2c-.5-.8-1.4-1.2-2.5-1.2-1.6 0-2.6.8-2.6 2s1 1.6 2.6 2 2.6.8 2.6 2-1 2-2.6 2c-1.1 0-2-.4-2.5-1.2M12 6.5V8M12 16v1.5" />,
  user: <path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4.5 20a7.5 7.5 0 0 1 15 0" />,
  gauge: <path d="M4 17a8 8 0 1 1 16 0M12 17l4-5M4 17h2M18 17h2" />,
};

export function PricingBilling() {
  const ref = useRef(null);
  const seen = useSeen(ref, 0.15);
  const on = useOnScreen(ref, 0.25);
  const [row, setRow] = useState(0);
  const [col, setCol] = useState(null);
  const [hold, setHold] = useState(false);
  const [still, setStill] = useState(false);

  useEffect(() => setStill(window.matchMedia("(prefers-reduced-motion: reduce)").matches), []);

  // The lit row moves down the phases while the band is on screen.
  useEffect(() => {
    if (!seen || !on || hold || still) return undefined;
    const id = setInterval(() => setRow((r) => (r + 1) % b.phases.length), ROW_MS);
    return () => clearInterval(id);
  }, [seen, on, hold, still]);

  const R = b.phases.length;
  // Grid rows: 1 header, 2 band, 3..3+R-1 phases, then the note.
  const at = (c, r) => ({ gridColumn: c + 2, gridRow: r });

  return (
    <section id="billing" ref={ref} className={styles.section} data-in={seen || undefined} aria-labelledby="billing-title">
      <div className={styles.bg} aria-hidden="true">
        <span className={styles.glowA} />
        <span className={styles.glowB} />
      </div>

      <div className={styles.inner}>
        <header className={styles.head}>
          <p className={styles.eyebrow}>
            <i aria-hidden="true" />
            {b.eyebrow}
          </p>
          <h2 id="billing-title" className={styles.title}>
            {b.title}
          </h2>
          <p className={styles.lead}>{b.lead}</p>
        </header>

        <div
          className={styles.matrix}
          data-col={col ?? undefined}
          onMouseEnter={() => setHold(true)}
          onMouseLeave={() => {
            setHold(false);
            setCol(null);
          }}
        >
          {/* Row washes: the lit phase glows across the whole matrix. */}
          {b.phases.map((p, r) => (
            <span
              key={`w${r}`}
              className={styles.wash}
              data-on={r === row || undefined}
              style={{ gridColumn: "1 / -1", gridRow: r + 3 }}
              aria-hidden="true"
            />
          ))}

          {/* Corner + phase labels */}
          <p className={styles.corner} style={{ gridColumn: 1, gridRow: "1 / 3" }}>
            {b.storiesLabel}
          </p>
          {b.phases.map((p, r) => (
            <p
              key={p.title}
              className={styles.phase}
              data-on={r === row || undefined}
              style={{ gridColumn: 1, gridRow: r + 3 }}
              onMouseEnter={() => setRow(r)}
            >
              <span>{String(r + 1).padStart(2, "0")}</span>
              <b>{p.title}</b>
              <em>{p.hint}</em>
            </p>
          ))}

          {b.stories.map((s, c) => {
            let from = 0;
            const lit = col === c;
            const props = (r, extra) => ({
              style: { ...at(c, r), "--c": c, "--o": c * 10 + r },
              "data-lit": lit || undefined,
              onMouseEnter: () => setCol(c),
              className: extra,
            });
            return [
              <div key={`h${c}`} {...props(1, styles.storyHead)} data-first={c === 0 || undefined}>
                <span className={styles.num}>{String(c + 1).padStart(2, "0")}</span>
                <h3>{s.title}</h3>
                <p>{s.line}</p>
              </div>,
              <div key={`b${c}`} {...props(2, styles.band)} aria-hidden="true">
                {s.band.map((seg, k) => {
                  const w = seg.to - from;
                  from = seg.to;
                  return (
                    <span key={k} className={styles.seg} data-tone={seg.tone} style={{ "--w": w, "--k": k }} title={seg.label}>
                      <i />
                    </span>
                  );
                })}
                <em>{s.band.map((seg) => seg.label).join("  →  ")}</em>
              </div>,
              ...s.stops.map((st, r) => (
                <div
                  key={`s${c}-${r}`}
                  {...props(r + 3, styles.stop)}
                  data-on={r === row || undefined}
                  data-first={r === 0 || undefined}
                  data-last={r === s.stops.length - 1 || undefined}
                  style={{ ...at(c, r + 3), "--c": c, "--r": r, "--o": c * 10 + r + 3 }}
                >
                  <span className={styles.pin} aria-hidden="true" />
                  <span className={styles.phaseInline}>{b.phases[r].title}</span>
                  <span className={styles.at}>{st.at}</span>
                  <b className={styles.stopTitle}>{st.title}</b>
                  <span className={styles.stopText}>{st.text}</span>
                </div>
              )),
              <p key={`n${c}`} {...props(R + 3, styles.note)}>
                <span aria-hidden="true">i</span>
                {s.note}
              </p>,
            ];
          })}
        </div>

        <ul className={styles.facts}>
          {b.facts.map((f, k) => (
            <li key={f.title} style={{ "--k": k }}>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                {icons[f.icon]}
              </svg>
              <span>
                <b>{f.title}</b>
                {f.text}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
