"use client";

import { useEffect, useRef, useState } from "react";
import { make as m } from "@/content/home";
import { SectionHead } from "@/components/section-head/section-head";
import { useOnScreen, useSeen } from "@/components/use-seen";
import styles from "./make.module.css";

// "Make it mid-call": a drafting table. Left (5fr), three requests from the homepage's pilot call
// (a flowchart said aloud, a doc typed as /doc, slides said aloud), each a numbered row with its
// kind and how it was asked; the active one types itself out and carries a progress line. Right
// (7fr), an open canvas on a dot grid where the result builds itself: a status line ("Working on
// it…" → "Saved with the meeting" with Copy / Export .md), then the flowchart drawing its nodes and
// arrows in, the doc streaming line by line, or three slides sliding in. Plays one request after
// another while on screen (pauses under the pointer); clicking a request stops that. Three ruled
// points under it. All of it is what the app does.
const STEP_MS = 7200;

// The request types itself out, one character after another.
function Typed({ text, play }) {
  return (
    <span className={styles.typed} data-play={play || undefined} aria-label={text}>
      {[...text].map((ch, i) => (
        <span key={i} aria-hidden="true" style={{ "--c": i }}>
          {ch}
        </span>
      ))}
    </span>
  );
}

function Diagram({ nodes }) {
  // Kickoff → Seats → Pilot → Did it work? → (yes) Yearly plan / (no) Extend the pilot
  const box = (x, y, w, label, i, kind = "box") => (
    <g key={label} className={styles.node} style={{ "--k": i }} data-kind={kind}>
      {kind === "diamond" ? (
        <path d={`M${x + w / 2} ${y - 6} L${x + w + 8} ${y + 22} L${x + w / 2} ${y + 50} L${x - 8} ${y + 22} Z`} />
      ) : (
        <rect x={x} y={y} width={w} height="44" rx="12" />
      )}
      <text x={x + w / 2} y={y + 27} textAnchor="middle">
        {label}
      </text>
    </g>
  );
  const edge = (d, i, label) => (
    <g key={d} className={styles.edge} style={{ "--k": i }}>
      <path d={d} pathLength="1" />
      {label && (
        <text x={label[0]} y={label[1]} textAnchor="middle">
          {label[2]}
        </text>
      )}
    </g>
  );
  return (
    <svg className={styles.diagram} viewBox="0 0 640 250" role="img" aria-label={nodes.join(", ")}>
      <defs>
        <marker id="mk-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0 0L10 5L0 10z" />
        </marker>
      </defs>
      {edge("M136 52 H176", 0.5)}
      {edge("M316 52 H356", 1.5)}
      {edge("M426 74 V112", 2.5)}
      {edge("M372 140 H300 V196", 3.5, [336, 132, "yes"])}
      {edge("M480 140 H530 V196", 3.5, [506, 132, "no"])}
      {box(16, 30, 120, nodes[0], 0)}
      {box(176, 30, 140, nodes[1], 1)}
      {box(356, 30, 140, nodes[2], 2)}
      {box(376, 118, 100, nodes[3], 3, "diamond")}
      {box(236, 196, 128, nodes[4], 4, "end")}
      {box(456, 196, 150, nodes[5], 4)}
    </svg>
  );
}

function Doc({ blocks, title }) {
  return (
    <div className={styles.doc}>
      <p className={styles.docTitle} style={{ "--k": 0 }}>
        {title}
      </p>
      {blocks.map((b, i) =>
        b.h ? (
          <p key={i} className={styles.docH} style={{ "--k": i + 1 }}>
            {b.h}
          </p>
        ) : b.li ? (
          <p key={i} className={styles.docLi} style={{ "--k": i + 1 }}>
            <i aria-hidden="true" />
            {b.li}
          </p>
        ) : (
          <p key={i} className={styles.docP} style={{ "--k": i + 1 }}>
            {b.p}
          </p>
        ),
      )}
    </div>
  );
}

function Slides({ slides }) {
  return (
    <ol className={styles.slides}>
      {slides.map((s, i) => (
        <li key={s.t} style={{ "--k": i }} data-first={i === 0 || undefined}>
          <span className={styles.slideNum}>{i + 1}</span>
          <b>{s.t}</b>
          <span>{s.s}</span>
          <i aria-hidden="true" />
        </li>
      ))}
    </ol>
  );
}

const Icon = ({ kind }) => (
  <svg viewBox="0 0 20 20" aria-hidden="true">
    {kind === "diagram" && <path d="M3 4h5v4H3zM12 12h5v4h-5zM5.5 8v4.5H12" />}
    {kind === "doc" && <path d="M5 2.5h7l3 3v12H5zM8 9h5M8 12h5M8 15h3" />}
    {kind === "slides" && <path d="M2.5 4h15v10h-15zM10 14v3M7 17h6" />}
  </svg>
);

export function Make() {
  const ref = useRef(null);
  const seen = useSeen(ref, 0.08); // low: on phones the section is much taller than the screen
  const on = useOnScreen(ref, 0.08);
  const [i, setI] = useState(0);
  const [run, setRun] = useState(0); // restarts the build
  const [auto, setAuto] = useState(true);
  const [hold, setHold] = useState(false);
  const [still, setStill] = useState(false);

  useEffect(() => setStill(window.matchMedia("(prefers-reduced-motion: reduce)").matches), []);

  useEffect(() => {
    if (!seen || !on || hold || still || !auto) return undefined;
    const id = setTimeout(() => {
      setI((k) => (k + 1) % m.items.length);
      setRun((n) => n + 1);
    }, STEP_MS);
    return () => clearTimeout(id);
  }, [seen, on, hold, still, auto, run]);

  const pick = (k) => {
    setAuto(false);
    setI(k);
    setRun((n) => n + 1);
  };

  const it = m.items[i];
  const play = seen && !still;

  return (
    <section
      id="make"
      ref={ref}
      className={styles.section}
      data-in={seen || undefined}
      data-paused={!on || hold || undefined}
      data-still={still || undefined}
      aria-labelledby="make-title"
    >
      <SectionHead id="make-title" eyebrow={m.eyebrow} title={m.title} lead={m.lead} />

      <div className={styles.layout} onMouseEnter={() => setHold(true)} onMouseLeave={() => setHold(false)}>
        {/* Requests */}
        <div className={styles.requests} role="tablist" aria-label={m.requestsLabel} aria-orientation="vertical">
          {m.items.map((r, k) => (
            <button
              key={r.kind}
              type="button"
              role="tab"
              aria-selected={k === i}
              aria-controls="make-canvas"
              className={styles.request}
              onClick={() => pick(k)}
            >
              <span className={styles.num}>{String(k + 1).padStart(2, "0")}</span>
              <span className={styles.reqBody}>
                <span className={styles.reqMeta}>
                  <span className={styles.kind}>
                    <Icon kind={r.kind} />
                    {r.tag}
                  </span>
                  <em>{r.how}</em>
                </span>
                <span className={styles.ask}>
                  {k === i ? <Typed key={run} text={r.ask} play={play} /> : r.ask}
                </span>
              </span>
              <span className={styles.progress} aria-hidden="true">
                {k === i && auto && play && <i key={run} style={{ "--step": `${STEP_MS}ms` }} />}
              </span>
            </button>
          ))}
        </div>

        {/* Canvas */}
        <div id="make-canvas" role="tabpanel" className={styles.canvas} key={run} data-play={play || undefined} data-kind={it.kind}>
          <div className={styles.status}>
            <span className={styles.statusKind}>
              <Icon kind={it.kind} />
              {it.tag} · {it.title}
            </span>
            <span className={styles.working}>
              <i aria-hidden="true" />
              <i aria-hidden="true" />
              <i aria-hidden="true" />
              {m.working}
            </span>
            <span className={styles.saved}>
              <b aria-hidden="true">✓</b>
              {m.saved}
              {m.actions.map((a) => (
                <em key={a}>{a}</em>
              ))}
            </span>
          </div>

          <div className={styles.stage}>
            {it.kind === "diagram" && <Diagram nodes={it.nodes} />}
            {it.kind === "doc" && <Doc blocks={it.blocks} title={it.title} />}
            {it.kind === "slides" && <Slides slides={it.slides} />}
          </div>
        </div>
      </div>

      <ul className={styles.points}>
        {m.points.map((p, k) => (
          <li key={p.title} style={{ "--k": k }}>
            <span>{String(k + 1).padStart(2, "0")}</span>
            <b>{p.title}</b>
            <p>{p.text}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
