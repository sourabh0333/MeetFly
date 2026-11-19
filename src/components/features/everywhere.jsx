"use client";

import { useEffect, useRef, useState } from "react";
import { everywhere, featureGroups } from "@/content/features";
import { SectionHead } from "@/components/section-head/section-head";
import { useOnScreen, useSeen } from "@/components/use-seen";
import styles from "./everywhere.module.css";

// "Everywhere": the five app-wide features on a ruled magazine grid (hairlines, no filled cards).
// Row 1: Keyboard shortcuts (wide) | ⌘K command bar. Row 2: Stored on your computer | Usage and
// limits | Mac and Windows. Each cell: number, name, text, and a live example at its foot: keys
// that press themselves (and light up when you press B or ⌘K for real), a command search that
// types and lists results, where your data lives vs what is sent out, monthly meters filling up,
// and a light / dark switch. A soft violet spotlight follows the cursor across the grid.
const group = featureGroups.find((g) => g.id === "everywhere");
const byId = Object.fromEntries(group.items.map((f) => [f.id, f]));
const ORDER = ["shortcuts", "command-bar", "privacy", "usage", "desktop"];
const KEYS = byId.shortcuts.chips; // e.g. "⌘ Enter", "B", "⌘ K"

const Icon = ({ d }) => (
  <svg viewBox="0 0 16 16" aria-hidden="true">
    <path d={d} />
  </svg>
);
const PATHS = {
  search: "M7 12A5 5 0 1 0 7 2a5 5 0 0 0 0 10zM14 14l-3.5-3.5",
  link: "M6.5 9.5l3-3M5 7.5L3.8 8.7a2.5 2.5 0 0 0 3.5 3.5L8.5 11M11 8.5l1.2-1.2a2.5 2.5 0 0 0-3.5-3.5L7.5 5",
  target: "M8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12zM8 10.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z",
  lock: "M4.5 7.5h7v6h-7zM6 7.5V5.5a2 2 0 0 1 4 0v2",
  out: "M3 8h10M9 4l4 4-4 4",
  check: "M3.5 8.5l3 3 6-7",
};

function Keys({ live }) {
  const [down, setDown] = useState(-1);
  useEffect(() => {
    if (!live) return undefined;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let k = 0;
    const id = reduce ? 0 : setInterval(() => setDown((k++) % KEYS.length), 1300);
    // Real key presses light the matching key (nothing is blocked).
    const onKey = (e) => {
      const key = e.key.length === 1 ? e.key.toUpperCase() : e.key;
      const combo = (e.metaKey || e.ctrlKey ? "⌘ " : "") + key;
      const i = KEYS.findIndex((x) => x === combo || x === key);
      if (i >= 0) setDown(i);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      clearInterval(id);
      window.removeEventListener("keydown", onKey);
    };
  }, [live]);
  return (
    <>
      <ul className={styles.keys}>
        {KEYS.map((combo, i) => (
          <li key={combo} data-down={i === down || undefined}>
            {combo.split(" ").map((k) => (
              <kbd key={k}>{k}</kbd>
            ))}
          </li>
        ))}
      </ul>
      <p className={styles.small}>{everywhere.keysHint}</p>
    </>
  );
}

function Command({ live }) {
  const c = everywhere.command;
  const [n, setN] = useState(c.typed.length);
  useEffect(() => {
    if (!live || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    let k = 0;
    setN(0);
    const id = setInterval(() => {
      k = k > c.typed.length + 40 ? 0 : k + 1;
      setN(k);
    }, 110);
    return () => clearInterval(id);
  }, [live, c.typed.length]);
  const typed = c.typed.slice(0, Math.min(n, c.typed.length));
  const shown = n >= c.typed.length;
  return (
    <>
      <p className={styles.bar}>
        <kbd>⌘K</kbd>
        <span>
          {typed}
          <i className={styles.caret} />
        </span>
      </p>
      <ul className={styles.results} data-on={shown || undefined}>
        {c.results.map((r, k) => (
          <li key={r.label} style={{ "--k": k }} data-first={k === 0 || undefined}>
            <Icon d={PATHS[r.icon]} />
            <span>{r.label}</span>
            <small>{r.meta}</small>
          </li>
        ))}
      </ul>
    </>
  );
}

function Privacy() {
  const p = everywhere.privacy;
  return (
    <>
      <div className={styles.flow}>
        <div>
          <p className={styles.flowHead}>
            <Icon d={PATHS.lock} />
            {p.local.title}
          </p>
          <ul>
            {p.local.items.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
        </div>
        <div>
          <p className={styles.flowHead}>
            <Icon d={PATHS.out} />
            {p.out.title}
          </p>
          <ul>
            {p.out.items.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
        </div>
      </div>
      <p className={styles.fact}>
        <Icon d={PATHS.check} />
        {p.fact}
      </p>
    </>
  );
}

function Count({ to, on }) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!on) return undefined;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setV(to);
      return undefined;
    }
    let frame = 0;
    const t0 = performance.now();
    const tick = (now) => {
      const p = Math.min(1, (now - t0) / 1400);
      setV(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [on, to]);
  return v.toLocaleString("en-US");
}

function Usage({ on }) {
  const u = everywhere.usage;
  return (
    <>
      <p className={styles.small}>{u.month}</p>
      {u.meters.map((m) => (
        <div key={m.label} className={styles.meter} style={{ "--f": `${(m.used / m.limit) * 100}%` }}>
          <p>
            <span>{m.label}</span>
            <b>
              <Count to={m.used} on={on} /> <small>/ {m.limit.toLocaleString("en-US")} {m.unit}</small>
            </b>
          </p>
          <span className={styles.track} aria-hidden="true">
            <i />
          </span>
        </div>
      ))}
      <p className={styles.small}>{u.note}</p>
    </>
  );
}

function Desktop({ live }) {
  const d = everywhere.desktop;
  const [dark, setDark] = useState(false);
  useEffect(() => {
    if (!live || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    const id = setInterval(() => setDark((x) => !x), 2600);
    return () => clearInterval(id);
  }, [live]);
  return (
    <>
      <p className={styles.systems}>
        {d.systems.map((s, k) => (
          <span key={s} data-on={(k === 1) === dark || undefined}>
            {s}
          </span>
        ))}
      </p>
      <p className={styles.theme} data-dark={dark || undefined}>
        <span>{d.light}</span>
        <i aria-hidden="true" />
        <span>{d.dark}</span>
      </p>
      <p className={styles.fact}>
        <Icon d={PATHS.check} />
        {d.setup}
      </p>
    </>
  );
}

export function Everywhere() {
  const ref = useRef(null);
  const gridRef = useRef(null);
  const seen = useSeen(ref);
  const gridSeen = useSeen(gridRef, 0.25);
  const live = useOnScreen(gridRef, 0.2);

  const onMove = (e) => {
    const r = gridRef.current.getBoundingClientRect();
    gridRef.current.style.setProperty("--mx", `${e.clientX - r.left}px`);
    gridRef.current.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  const demo = {
    shortcuts: <Keys live={live} />,
    "command-bar": <Command live={live} />,
    privacy: <Privacy />,
    usage: <Usage on={gridSeen} />,
    desktop: <Desktop live={live} />,
  };

  return (
    <section ref={ref} id="everywhere" className={styles.section} data-in={seen || undefined} style={{ "--tone": group.tone }} aria-labelledby="everywhere-title">
      <SectionHead id="everywhere-title" eyebrow={everywhere.eyebrow} title={everywhere.title} lead={everywhere.lead} />
      <div ref={gridRef} className={styles.grid} data-on={gridSeen || undefined} onPointerMove={onMove}>
        <span className={styles.spot} aria-hidden="true" />
        {ORDER.map((id, i) => {
          const f = byId[id];
          return (
            <article key={id} id={`everywhere-${id}`} className={styles.cell} data-id={id} style={{ "--i": i }}>
              <p className={styles.head}>
                <span>{String(i + 1).padStart(2, "0")}</span>
                {f.name}
              </p>
              <p className={styles.text}>{f.text}</p>
              <div className={styles.demo}>{demo[id]}</div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
