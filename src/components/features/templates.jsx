"use client";

import { useEffect, useRef, useState } from "react";
import { templates } from "@/content/features";
import { SectionHead } from "@/components/section-head/section-head";
import { useOnScreen, useSeen } from "@/components/use-seen";
import styles from "./templates.module.css";

// Note templates as a matrix. The five call types stand side by side as ruled columns. What every
// template shares runs as ribbons straight across all five (Summary, Action items, the email
// draft); between them each column lists only its own sections. Ribbons draw left to right, cells
// drop in column by column, and a soft lens slides from column to column (it cycles on its own;
// hover or tap a column to pick it). Phones: chips pick a call type and one column shows.
const SHARED = new Set(["Summary", "Action items", "Follow-up email draft", "Thank-you email draft"]);
const types = templates.types.map((t) => ({ ...t, own: t.sections.filter(([n]) => !SHARED.has(n)) }));
const N = types.length;
const ribbon = (name) => templates.types[0].sections.find(([n]) => n === name);

function Ribbon({ name, hint, note, row }) {
  return (
  <div className={styles.ribbon} style={{ "--r": row }}>
    <span className={styles.ribbonLine} aria-hidden="true" />
    <p className={styles.ribbonName}>
      <i aria-hidden="true" />
      {name}
      {hint && <small>{hint}</small>}
    </p>
    <p className={styles.ribbonNote}>{note}</p>
  </div>
  );
}

export function Templates() {
  const ref = useRef(null);
  const gridRef = useRef(null);
  const seen = useSeen(ref);
  const gridSeen = useSeen(gridRef, 0.25);
  const on = useOnScreen(gridRef, 0.3);
  const [active, setActive] = useState(0);
  const touched = useRef(false);

  useEffect(() => {
    if (!on || touched.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    const id = setInterval(() => !touched.current && setActive((a) => (a + 1) % N), 3200);
    return () => clearInterval(id);
  }, [on]);

  const pick = (i) => {
    touched.current = true;
    setActive(i);
  };
  const hover = (i) => (e) => e.pointerType === "mouse" && pick(i);

  return (
    <section ref={ref} id="templates" className={styles.section} data-in={seen || undefined} aria-labelledby="templates-title">
      <SectionHead id="templates-title" eyebrow={templates.eyebrow} title={templates.title} lead={templates.lead} />

      {/* Phones: pick a call type. */}
      <p className={styles.chips} role="tablist" aria-label={templates.eyebrow}>
        {types.map((t, i) => (
          <button key={t.id} type="button" role="tab" aria-selected={i === active} onClick={() => pick(i)}>
            {t.label}
          </button>
        ))}
      </p>

      <div ref={gridRef} className={styles.matrix} data-on={gridSeen || undefined} style={{ "--a": active, "--n": N }}>
        <span className={styles.lens} aria-hidden="true" />

        {/* Column heads. */}
        {types.map((t, i) => (
          <button
            key={`h-${t.id}`}
            type="button"
            className={styles.head}
            style={{ "--c": i }}
            data-active={i === active || undefined}
            onPointerEnter={hover(i)}
            onFocus={() => pick(i)}
            onClick={() => pick(i)}
          >
            <span className={styles.headN}>{String(i + 1).padStart(2, "0")}</span>
            <span className={styles.headName}>
              {t.label}
              {t.also && <small>{t.also}</small>}
            </span>
            <span className={styles.headCount}>{t.sections.length} sections</span>
          </button>
        ))}

        <Ribbon name={ribbon("Summary")[0]} hint={ribbon("Summary")[1]} note={templates.shared} row={0} />

        {/* Each type's own sections. */}
        {types.map((t, i) => (
          <ul key={`c-${t.id}`} className={styles.cell} style={{ "--c": i }} data-active={i === active || undefined} onPointerEnter={hover(i)}>
            {t.own.map(([name, hint], k) => (
              <li key={name} style={{ "--k": k }}>
                <b>{name}</b>
                {hint && <small>{hint}</small>}
              </li>
            ))}
            <li className={styles.blurb}>{t.blurb}</li>
          </ul>
        ))}

        <Ribbon name={ribbon("Action items")[0]} hint={ribbon("Action items")[1]} note={templates.shared} row={1} />
        <Ribbon name="Email draft" hint="short, ready to send" note="A thank-you email for interviews" row={2} />
      </div>
    </section>
  );
}
