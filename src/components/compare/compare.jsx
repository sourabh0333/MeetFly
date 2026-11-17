"use client";

import { useEffect, useRef, useState } from "react";
import { compare } from "@/content/home";
import styles from "./compare.module.css";

// "Note-taker vs copilot" (no competitor named): a switchable constellation. A glass switch flips
// between Note-taker and MeetFly. In the middle sits the call; around it eight capability tiles,
// wired to it with curved lines. As MeetFly, every tile lights and the wires flow; as a
// note-taker, the MeetFly-only tiles dim and their wires go dark, and the call just waits for a
// summary. It flips by itself every few seconds until someone uses the switch, and only while on
// screen. With reduced motion it rests on MeetFly and doesn't flip. On phones: no wires.
const icons = {
  target: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM12 12h.01",
  lines: "M5 7h14M5 12h14M5 17h9",
  spark: "M12 3.5l1.7 5.1 5.1 1.7-5.1 1.7L12 17.1l-1.7-5.1-5.1-1.7 5.1-1.7z",
  screen: "M3.5 5h17v11h-17zM9 20h6M12 16v4",
  rec: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z",
  check: "M5 12.5l4.5 4.5L19 7.5",
  globe: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM3.5 12h17M12 3c2.5 2.6 3.6 5.6 3.6 9s-1.1 6.4-3.6 9c-2.5-2.6-3.6-5.6-3.6-9S9.5 5.6 12 3Z",
  doc: "M7 3.5h7l4 4v13H7zM14 3.5v4h4M9.5 12h5M9.5 15.5h5",
  clock: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM12 7v5l3 2",
};
const Icon = ({ name }) => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d={icons[name]} />
  </svg>
);

const tiles = compare.tiles;
const total = tiles.length;
const shared = tiles.filter((t) => t.both).length;

export function Compare() {
  const ref = useRef(null);
  const stage = useRef(null);
  const hub = useRef(null);
  const tileRefs = useRef([]);
  const [seen, setSeen] = useState(false);
  const [fly, setFly] = useState(true);
  const [wires, setWires] = useState([]);
  const touched = useRef(false);

  // Rise in when first seen; flip modes by itself while on screen, until the switch is used.
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let timer = 0;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setSeen(true);
        clearInterval(timer);
        if (e.isIntersecting && !reduce && !touched.current) {
          timer = setInterval(() => !touched.current && setFly((f) => !f), 3800);
        }
      },
      { threshold: 0.3 },
    );
    io.observe(ref.current);
    return () => {
      io.disconnect();
      clearInterval(timer);
    };
  }, []);

  // Draw the wires from the call to each tile, whenever the layout changes.
  useEffect(() => {
    const measure = () => {
      if (!stage.current || !hub.current) return; // the section has left the page
      const s = stage.current.getBoundingClientRect();
      const h = hub.current.getBoundingClientRect();
      if (!window.matchMedia("(min-width: 1081px)").matches) {
        setWires([]); // stacked (tablet, phone): no wires
        return;
      }
      setWires(
        tileRefs.current.map((el, i) => {
          const r = el.getBoundingClientRect();
          const left = tiles[i].side === "left";
          const y = r.top + r.height / 2 - s.top;
          const x0 = (left ? r.right : r.left) - s.left;
          const x1 = (left ? h.left : h.right) - s.left;
          const y1 = Math.min(h.bottom - s.top - 40, Math.max(h.top - s.top + 40, y));
          const mid = (x0 + x1) / 2;
          return `M${x0.toFixed(1)} ${y.toFixed(1)} C${mid.toFixed(1)} ${y.toFixed(1)} ${mid.toFixed(1)} ${y1.toFixed(1)} ${x1.toFixed(1)} ${y1.toFixed(1)}`;
        }),
      );
    };
    const ro = new ResizeObserver(measure);
    ro.observe(stage.current);
    measure();
    // Measure again once the tiles have finished rising in.
    const late = setTimeout(measure, 1600);
    return () => {
      ro.disconnect();
      clearTimeout(late);
    };
  }, [seen]);

  const choose = (value) => {
    touched.current = true;
    setFly(value);
  };
  const lit = fly ? total : shared;

  return (
    <section
      ref={ref}
      id="compare"
      className={styles.section}
      data-in={seen || undefined}
      data-mode={fly ? "fly" : "notes"}
      aria-labelledby="compare-title"
    >
      <header className={styles.head}>
        <p className={styles.eyebrow}>{compare.eyebrow}</p>
        <h2 id="compare-title" className={styles.title}>
          {compare.title}
        </h2>
        <p className={styles.lead}>{compare.lead}</p>
      </header>

      {/* The switch, and how many of the eight each one covers. */}
      <div className={styles.controls}>
        <div className={styles.switch} role="radiogroup" aria-label="Compare">
          <span className={styles.thumb} aria-hidden="true" />
          <button type="button" role="radio" aria-checked={!fly} onClick={() => choose(false)}>
            <Icon name="clock" />
            {compare.modes.notes}
          </button>
          <button type="button" role="radio" aria-checked={fly} onClick={() => choose(true)}>
            <img src="/brand/icon.svg" alt="" width="20" height="20" />
            {compare.modes.fly}
          </button>
        </div>
        <p className={styles.count} aria-live="polite">
          <b key={lit}>{lit}</b> {compare.covers}
        </p>
      </div>

      <div ref={stage} className={styles.stage}>
        <svg className={styles.wires} aria-hidden="true">
          {wires.map((d, i) => (
            <path key={i} d={d} data-on={(fly || tiles[i].both) || undefined} />
          ))}
        </svg>

        <ul className={styles.col} data-side="left">
          {tiles
            .map((t, i) => ({ ...t, i }))
            .filter((t) => t.side === "left")
            .map((t) => (
              <Tile key={t.key} t={t} on={fly || t.both} refFn={(el) => (tileRefs.current[t.i] = el)} />
            ))}
        </ul>

        {/* The call in the middle. */}
        <div ref={hub} className={styles.hub}>
          <span className={styles.glow} aria-hidden="true" />
          <div className={styles.call}>
            <p className={styles.callBar}>
              <span>
                <i />
                <i />
                <i />
              </span>
              {compare.hub.title}
              <em>REC</em>
            </p>
            <ol className={styles.lines}>
              {compare.hub.lines.map((l) => (
                <li key={l.text}>
                  <b>{l.who}</b>
                  {l.text}
                </li>
              ))}
            </ol>
            <div className={styles.answer}>
              <div className={styles.reply} aria-hidden={!fly}>
                <p>
                  <Icon name="spark" />
                  {compare.hub.reply.label}
                </p>
                {compare.hub.reply.text}
              </div>
              <div className={styles.later} aria-hidden={fly}>
                <Icon name="clock" />
                {compare.hub.later}
              </div>
            </div>
          </div>
        </div>

        <ul className={styles.col} data-side="right">
          {tiles
            .map((t, i) => ({ ...t, i }))
            .filter((t) => t.side === "right")
            .map((t) => (
              <Tile key={t.key} t={t} on={fly || t.both} refFn={(el) => (tileRefs.current[t.i] = el)} />
            ))}
        </ul>
      </div>
    </section>
  );
}

function Tile({ t, on, refFn }) {
  return (
    <li ref={refFn} className={styles.tile} data-on={on || undefined} style={{ "--i": t.i }}>
      <span className={styles.tileIcon}>
        <Icon name={t.icon} />
      </span>
      <span className={styles.tileText}>
        <b>{t.title}</b>
        <small>{t.detail}</small>
      </span>
      <span className={styles.tag} data-both={t.both || undefined}>
        {t.both ? compare.bothTag : compare.onlyTag}
      </span>
    </li>
  );
}
