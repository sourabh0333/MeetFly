"use client";

import { useEffect, useRef, useState } from "react";
import { panel, stage } from "@/content/home";
import { SectionHead } from "@/components/section-head/section-head";
import { DecodeText } from "@/components/hero/decode-text";
import { useOnScreen, useSeen } from "@/components/use-seen";
import styles from "./panel.module.css";

// "A small panel that floats over any meeting". No pinning (two sections above already pin).
// 1. A meeting window that tips back and flattens as it scrolls into view (scroll-linked CSS),
//    with depth parallax on mouse move: the call shifts a little, MeetFly's panel more. The panel
//    can be dragged (mouse, touch, arrow keys); a glass opacity pill inside the window works.
// 2. The four facts in one open row.
// 3. The shortcuts as a 3D keyboard deck: keycaps on a tilted plane, a big readout of the active
//    one. It plays through by itself; pressing the real keys lights them up.
const people = stage.people.slice(0, 4);
const factPaths = {
  layers: "M12 3 3 8l9 5 9-5-9-5ZM3 13l9 5 9-5",
  pin: "M12 21s-6-5.3-6-11a6 6 0 0 1 12 0c0 5.7-6 11-6 11Zm0-8.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z",
  browser: "M3.5 5h17v14h-17zM3.5 9h17M7 7h.01M9.5 7h.01",
  eye: "M2.5 12s3.5-6.5 9.5-6.5 9.5 6.5 9.5 6.5-3.5 6.5-9.5 6.5S2.5 12 2.5 12Zm9.5 3a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z",
};

export function Panel() {
  const ref = useRef(null);
  const meeting = useRef(null);
  const card = useRef(null);
  const keysRef = useRef(null);
  const vids = useRef([]);
  const seen = useSeen(ref);
  const onScreen = useOnScreen(meeting, 0.25);
  const keysOn = useOnScreen(keysRef, 0.3);
  const [opacity, setOpacity] = useState(88);
  const [pos, setPos] = useState({ x: 60, y: 16 });
  const [dragging, setDragging] = useState(false);
  const [hint, setHint] = useState(true);
  const [key, setKey] = useState(0);
  const [pressed, setPressed] = useState(false);
  const userKey = useRef(0);
  const drag = useRef(null);

  // Play the call while on screen.
  useEffect(() => {
    vids.current.forEach((v) => {
      if (!v) return;
      if (onScreen && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) v.play().catch(() => {});
      else v.pause();
    });
  }, [onScreen]);

  // Depth parallax: layers follow the mouse at different strengths.
  useEffect(() => {
    const el = meeting.current;
    if (!window.matchMedia("(hover: hover) and (prefers-reduced-motion: no-preference)").matches) return undefined;
    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty("--dx", ((e.clientX - r.left) / r.width - 0.5).toFixed(3));
      el.style.setProperty("--dy", ((e.clientY - r.top) / r.height - 0.5).toFixed(3));
    };
    const onLeave = () => {
      el.style.setProperty("--dx", "0");
      el.style.setProperty("--dy", "0");
    };
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  // The keyboard deck plays through by itself, pausing a while after a real key press.
  useEffect(() => {
    if (!keysOn || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    const id = setInterval(() => {
      if (Date.now() - userKey.current < 4000) return;
      setKey((k) => (k + 1) % panel.shortcuts.length);
      setPressed(true);
      setTimeout(() => setPressed(false), 220);
    }, 1800);
    return () => clearInterval(id);
  }, [keysOn]);

  // Pressing the real keys lights them up (only while the deck is on screen; nothing is blocked).
  useEffect(() => {
    if (!keysOn) return undefined;
    const onKey = (e) => {
      const t = e.target;
      if (t && (t.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(t.tagName))) return;
      const meta = e.metaKey || e.ctrlKey;
      const i = panel.shortcuts.findIndex((s) => s.code === e.code && !!s.meta === meta && !!s.shift === e.shiftKey);
      if (i < 0) return;
      userKey.current = Date.now();
      setKey(i);
      setPressed(true);
      setTimeout(() => setPressed(false), 220);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [keysOn]);

  // Drag the panel, kept inside the window.
  const onDown = (e) => {
    const m = meeting.current.getBoundingClientRect();
    const c = card.current.getBoundingClientRect();
    drag.current = { dx: e.clientX - c.left, dy: e.clientY - c.top, m, w: c.width, h: c.height };
    e.currentTarget.setPointerCapture(e.pointerId);
    setDragging(true);
    setHint(false);
  };
  const onMove = (e) => {
    const d = drag.current;
    if (!d) return;
    const x = Math.min(d.m.width - d.w - 10, Math.max(10, e.clientX - d.m.left - d.dx));
    const y = Math.min(d.m.height - d.h - 70, Math.max(46, e.clientY - d.m.top - d.dy));
    setPos({ x: (x / d.m.width) * 100, y: (y / d.m.height) * 100 });
  };
  const onUp = () => {
    drag.current = null;
    setDragging(false);
  };
  const onArrow = (e) => {
    const moves = { ArrowLeft: [-3, 0], ArrowRight: [3, 0], ArrowUp: [0, -3], ArrowDown: [0, 3] };
    const m = moves[e.key];
    if (!m) return;
    e.preventDefault();
    setHint(false);
    setPos((p) => ({ x: Math.min(68, Math.max(1, p.x + m[0])), y: Math.min(52, Math.max(8, p.y + m[1])) }));
  };

  const active = panel.shortcuts[key];

  return (
    <section ref={ref} id="panel" className={styles.section} data-in={seen || undefined} aria-labelledby="panel-title">
      <SectionHead id="panel-title" eyebrow={panel.eyebrow} title={panel.title} lead={panel.lead} />

      {/* 1. The meeting window, with the floating panel on top. */}
      <div className={styles.stage}>
        <div ref={meeting} className={styles.meeting}>
          <div className={styles.bar} aria-hidden="true">
            <span className={styles.dots}>
              <i />
              <i />
              <i />
            </span>
            Pilot call
            <span className={styles.rec}>
              <i />
              REC
            </span>
          </div>
          <div className={styles.grid} aria-hidden="true">
            {people.map((p, i) => (
              <div key={p.key} className={styles.tile}>
                <video ref={(v) => (vids.current[i] = v)} src={p.src} poster={p.poster} muted loop playsInline preload="metadata" />
                <span>{p.name}</span>
              </div>
            ))}
          </div>

          <div
            ref={card}
            className={styles.float}
            data-dragging={dragging || undefined}
            style={{ left: `min(${pos.x.toFixed(2)}%, calc(100% - var(--w) - 10px))`, top: `${pos.y.toFixed(2)}%`, "--o": opacity / 100 }}
            role="group"
            aria-label={`${panel.drag}: MeetFly floating panel. Use the arrow keys to move it.`}
            tabIndex={0}
            onPointerDown={onDown}
            onPointerMove={onMove}
            onPointerUp={onUp}
            onPointerCancel={onUp}
            onKeyDown={onArrow}
          >
            <div className={styles.floatBar}>
              <span className={styles.grip} aria-hidden="true">
                <i />
                <i />
                <i />
                <i />
                <i />
                <i />
              </span>
              <img src="/brand/icon.svg" alt="" width="18" height="18" />
              MeetFly
            </div>
            <p className={styles.floatLabel}>{panel.answerLabel}</p>
            <p className={styles.floatAnswer}>{panel.answer}</p>
            <p className={styles.floatCaption}>
              <b>Them</b> {panel.caption}
            </p>
            {hint && (
              <span className={styles.hint} aria-hidden="true">
                {panel.drag}
              </span>
            )}
          </div>

          {/* The opacity control, as a glass pill inside the window. */}
          <label className={styles.opacity}>
            <span>{panel.opacity}</span>
            <input type="range" min="35" max="100" value={opacity} onChange={(e) => setOpacity(+e.target.value)} />
            <b>{opacity}%</b>
          </label>
        </div>
      </div>

      {/* 2. The facts, in one open row. */}
      <ul className={styles.facts}>
        {panel.facts.map((f, i) => (
          <li key={f} style={{ "--i": i }}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d={factPaths[panel.factIcons[i]]} />
            </svg>
            {f}
          </li>
        ))}
      </ul>

      {/* 3. The keyboard deck. */}
      <div ref={keysRef} className={styles.deckWrap}>
        <h3 className={styles.keysTitle}>{panel.shortcutsTitle}</h3>
        <p className={styles.readout} aria-live="polite">
          <span className={styles.combo}>{active.keys.join(" ")}</span>
          <span className={styles.arrow} aria-hidden="true">
            →
          </span>
          <span key={key}>
            <DecodeText text={active.label} delay={0} duration={600} />
          </span>
        </p>
        <div className={styles.deck}>
          <ul className={styles.plane}>
            {panel.shortcuts.map((s, i) => (
              <li key={s.label} data-on={i === key || undefined} data-pressed={(i === key && pressed) || undefined}>
                <button type="button" onClick={() => setKey(i)} aria-label={`${s.keys.join(" ")}: ${s.label}`}>
                  {s.keys.map((k, j) => (
                    <kbd key={j} data-wide={k.length > 1 || undefined}>
                      {k}
                    </kbd>
                  ))}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <p className={styles.try}>
          <span className={styles.tryKeys}>{panel.tryKeys} · </span>
          {panel.winNote}
        </p>
      </div>
    </section>
  );
}
