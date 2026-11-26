"use client";

import { useEffect, useRef, useState } from "react";
import { processors as c } from "@/content/privacy";
import { SectionHead } from "@/components/section-head/section-head";
import { useOnScreen, useSeen } from "@/components/use-seen";
import styles from "./processors.module.css";

// "Who handles your data": a who-gets-what grid. Rows are the services the privacy policy names
// (Cartesia, Google Gemini, MeetFly's server, Google Identity Platform); columns are kinds of data
// (audio, your words, a screenshot, past meetings, your email, usage counts). Each cell is a mark:
// gets it (violet dot), passes it on and keeps none (dashed ring), keeps it (lime dot), never
// (a faint dash). A lit column sweeps across by itself; the reading line under the grid says, for
// that kind of data, who gets it and how (hover or focus a column head to pick it; that stops the
// sweep). Phones: the kinds of data become pills and the services list their mark for the picked
// one. Three ruled notes close it. All from the policy.
const STEP_MS = 3800;
const KINDS = ["get", "pass", "keep", "no"];

function Mark({ kind }) {
  return <i className={styles.mark} data-kind={kind} aria-hidden="true" />;
}

export function Processors() {
  const ref = useRef(null);
  const seen = useSeen(ref, 0.12);
  const on = useOnScreen(ref, 0.12);
  const [col, setCol] = useState(0);
  const [auto, setAuto] = useState(true);
  const [still, setStill] = useState(false);

  useEffect(() => setStill(window.matchMedia("(prefers-reduced-motion: reduce)").matches), []);

  useEffect(() => {
    if (!seen || !on || !auto || still) return undefined;
    const id = setTimeout(() => setCol((k) => (k + 1) % c.cols.length), STEP_MS);
    return () => clearTimeout(id);
  }, [seen, on, auto, still, col]);

  const pick = (k) => {
    setAuto(false);
    setCol(k);
  };
  const cur = c.cols[col];
  const who = c.rows.filter((r) => r.gets[cur.id][0] !== "no");
  const none = c.rows.filter((r) => r.gets[cur.id][0] === "no");

  return (
    <section id="processors" ref={ref} className={styles.section} data-in={seen || undefined} aria-labelledby="processors-title">
      <SectionHead id="processors-title" eyebrow={c.eyebrow} title={c.title} lead={c.lead} />

      {/* Phones: pick a kind of data. */}
      <p className={styles.pills} role="tablist" aria-label={c.eyebrow}>
        {c.cols.map((k, i) => (
          <button key={k.id} type="button" role="tab" aria-selected={i === col} onClick={() => pick(i)}>
            {k.label}
          </button>
        ))}
      </p>

      <div className={styles.grid} style={{ "--cols": c.cols.length }} role="table" aria-label={c.title}>
        {/* Column heads */}
        <div className={styles.headRow} role="row">
          <span className={styles.corner} role="columnheader" />
          {c.cols.map((k, i) => (
            <button
              key={k.id}
              type="button"
              role="columnheader"
              className={styles.colHead}
              data-on={i === col || undefined}
              onPointerEnter={(e) => e.pointerType === "mouse" && pick(i)}
              onFocus={() => pick(i)}
              onClick={() => pick(i)}
            >
              <b>{k.label}</b>
              <span>{k.note}</span>
            </button>
          ))}
        </div>

        {/* One row per service */}
        {c.rows.map((r, ri) => (
          <div key={r.id} className={styles.row} role="row" style={{ "--r": ri }} data-gets={r.gets[cur.id][0]}>
            <div className={styles.svc} role="rowheader">
              <span className={styles.role}>{r.role}</span>
              <b>{r.name}</b>
              {r.by && <span className={styles.by}>{r.by}</span>}
              <p>{r.does}</p>
            </div>
            {c.cols.map((k, i) => {
              const [kind, note] = r.gets[k.id];
              return (
                <div key={k.id} className={styles.cell} role="cell" data-on={i === col || undefined} title={note || c.legend[kind]}>
                  <Mark kind={kind} />
                  <span className={styles.sr}>{c.legend[kind]}</span>
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* Legend */}
      <p className={styles.legend}>
        {KINDS.map((k) => (
          <span key={k}>
            <Mark kind={k} />
            {c.legend[k]}
          </span>
        ))}
      </p>

      {/* The reading line for the lit column */}
      <div className={styles.reading} aria-live="polite">
        <div key={col} className={styles.readIn}>
          <p className={styles.readHead}>
            <b>{cur.label}</b>
            <span>{cur.note}</span>
          </p>
          <ul className={styles.readList}>
            {who.map((r) => {
              const [kind, note] = r.gets[cur.id];
              return (
                <li key={r.id} data-kind={kind}>
                  <Mark kind={kind} />
                  <b>{r.name}</b>
                  <span className={styles.readKind}>{c.legend[kind]}</span>
                  <span>{note}</span>
                </li>
              );
            })}
            {none.length > 0 && (
              <li data-kind="no">
                <Mark kind="no" />
                <b>{none.map((r) => r.name).join(", ")}</b>
                <span className={styles.readKind}>{c.nobody}</span>
              </li>
            )}
          </ul>
        </div>
      </div>

      <ul className={styles.notes}>
        {c.notes.map((n, i) => (
          <li key={i} style={{ "--k": i }}>
            <span>{String(i + 1).padStart(2, "0")}</span>
            {n}
          </li>
        ))}
      </ul>
    </section>
  );
}
