"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { roles, tools } from "@/content/use-cases";
import { SectionHead } from "@/components/section-head/section-head";
import { useOnScreen, useSeen } from "@/components/use-seen";
import styles from "./uc-tools.module.css";

// "From your calendar to wherever your notes go": a switchboard. Left, every source the app
// supports as a port (Calendars · Call apps · On your own); right, every destination (Share ·
// Files · Automate by webhook); in the middle a dark MeetFly hub that holds the role switcher
// (‹ 01 / 06 Sales ›, cycling by itself), the call type and what MeetFly hands back. Faint cables
// join every port to the hub; the picked role's ports light up and their cables turn into bright
// violet-to-lime lines with a flow running source → hub → destination. Cables are drawn in SVG from
// measured positions and redrawn on resize. Under 900px it stacks (no cables). Reduced motion: no
// flow, no cycling.
const STEP = 4200; // ms per role while it plays

const curve = (x1, y1, x2, y2) => {
  const dx = Math.max(24, (x2 - x1) * 0.55);
  return `M${x1.toFixed(1)} ${y1.toFixed(1)} C${(x1 + dx).toFixed(1)} ${y1.toFixed(1)} ${(x2 - dx).toFixed(1)} ${y2.toFixed(1)} ${x2.toFixed(1)} ${y2.toFixed(1)}`;
};

export function UseCasesTools() {
  const ref = useRef(null);
  const boardRef = useRef(null);
  const hubRef = useRef(null);
  const ports = useRef({});
  const seen = useSeen(ref);
  const on = useOnScreen(ref, 0.2);
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);
  const [still, setStill] = useState(false);
  const [cables, setCables] = useState({ w: 0, h: 0, left: [], right: [] });

  useEffect(() => setStill(window.matchMedia("(prefers-reduced-motion: reduce)").matches), []);

  useEffect(() => {
    if (still || !on || !auto) return undefined;
    const id = setInterval(() => setActive((a) => (a + 1) % roles.length), STEP);
    return () => clearInterval(id);
  }, [still, on, auto]);

  // Measure the ports and the hub, and lay a cable from each port to the hub's edge.
  const measure = useCallback(() => {
    const board = boardRef.current;
    const hub = hubRef.current;
    if (!board || !hub || getComputedStyle(board).getPropertyValue("--wired").trim() !== "1") {
      setCables((c) => (c.w ? { w: 0, h: 0, left: [], right: [] } : c));
      return;
    }
    const b = board.getBoundingClientRect();
    const h = hub.getBoundingClientRect();
    const list = (names, side) =>
      names.map((name, i) => {
        const el = ports.current[name];
        if (!el) return null;
        const r = el.getBoundingClientRect();
        const n = names.length;
        // Cables land on the hub's edge, spread over its middle half, in the ports' order.
        const y2 = h.top - b.top + h.height * (0.25 + (0.5 * (i + 0.5)) / n);
        return side === "left"
          ? { name, d: curve(r.right - b.left, r.top - b.top + r.height / 2, h.left - b.left, y2) }
          : { name, d: curve(h.right - b.left, y2, r.left - b.left, r.top - b.top + r.height / 2) };
      }).filter(Boolean);
    setCables({
      w: b.width,
      h: b.height,
      left: list(tools.sources.flatMap((g) => g.items), "left"),
      right: list(tools.dests.flatMap((g) => g.items), "right"),
    });
  }, []);

  useLayoutEffect(() => {
    measure();
    const ro = new ResizeObserver(measure);
    if (boardRef.current) ro.observe(boardRef.current);
    document.fonts?.ready.then(measure);
    return () => ro.disconnect();
  }, [measure]);

  // Measure again once the columns have slid into place.
  useEffect(() => {
    if (!seen) return undefined;
    const id = setTimeout(measure, 1100);
    return () => clearTimeout(id);
  }, [seen, measure]);

  const role = roles[active];
  const row = tools.rows[role.id];
  const from = new Set(row.from);
  const to = new Set(row.to);
  const go = (d) => {
    setAuto(false);
    setActive((a) => (a + d + roles.length) % roles.length);
  };

  const portList = (groups, side, lit) =>
    groups.map((g) => (
      <div key={g.group} className={styles.group}>
        <p className={styles.groupHead}>
          {g.group}
          {g.note && <em>{g.note}</em>}
        </p>
        <ul className={styles.ports}>
          {g.items.map((x, i) => (
            <li
              key={x}
              ref={(el) => {
                ports.current[x] = el;
              }}
              className={styles.port}
              data-side={side}
              data-on={lit.has(x) || undefined}
              style={{ "--d": `${i * 50}ms` }}
            >
              <span className={styles.portName}>{x}</span>
              <span className={styles.socket} aria-hidden="true" />
            </li>
          ))}
        </ul>
      </div>
    ));

  return (
    <section
      ref={ref}
      id="tools"
      className={styles.section}
      data-in={seen || undefined}
      data-play={(on && !still) || undefined}
      aria-labelledby="tools-title"
    >
      <SectionHead id="tools-title" eyebrow={tools.eyebrow} title={tools.title} lead={tools.lead} />

      <div ref={boardRef} className={styles.board}>
        {/* The cables. */}
        {cables.w > 0 && (
          <svg className={styles.cables} width={cables.w} height={cables.h} viewBox={`0 0 ${cables.w} ${cables.h}`} aria-hidden="true">
            <defs>
              <linearGradient id="cableIn" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2={cables.w / 2} y2="0">
                <stop offset="0" stopColor="#5b2eff" />
                <stop offset="1" stopColor="#8a5cff" />
              </linearGradient>
              <linearGradient id="cableOut" gradientUnits="userSpaceOnUse" x1={cables.w / 2} y1="0" x2={cables.w} y2="0">
                <stop offset="0" stopColor="#8a5cff" />
                <stop offset="1" stopColor="#b6e01c" />
              </linearGradient>
            </defs>
            {cables.left.map((c) => (
              <g key={c.name} data-on={from.has(c.name) || undefined}>
                <path className={styles.cableBase} d={c.d} />
                <path className={styles.cable} d={c.d} stroke="url(#cableIn)" />
                <path className={styles.cableFlow} d={c.d} />
              </g>
            ))}
            {cables.right.map((c) => (
              <g key={c.name} data-on={to.has(c.name) || undefined}>
                <path className={styles.cableBase} d={c.d} />
                <path className={styles.cable} d={c.d} stroke="url(#cableOut)" />
                <path className={styles.cableFlow} d={c.d} />
              </g>
            ))}
          </svg>
        )}

        {/* Sources */}
        <div className={`${styles.side} ${styles.sources}`}>
          <p className={styles.sideHead}>
            <span>In</span>
            {tools.sourcesTitle}
          </p>
          {portList(tools.sources, "left", from)}
        </div>

        {/* The hub */}
        <div className={styles.hubWrap}>
          <div ref={hubRef} className={styles.hub} aria-live="polite">
            <div className={styles.hubBar}>
              <img src="/brand/icon.svg" alt="" width="20" height="20" />
              <strong>MeetFly</strong>
              <span className={styles.live}>
                <i />
                Live
              </span>
            </div>

            <div className={styles.rolePick}>
              <button type="button" onClick={() => go(-1)} aria-label={tools.hub.prev}>
                <svg viewBox="0 0 16 16" aria-hidden="true">
                  <path d="M10 3.5L5.5 8l4.5 4.5" />
                </svg>
              </button>
              <div className={styles.roleNow} key={role.id}>
                <span className={styles.count}>
                  {String(active + 1).padStart(2, "0")} / {String(roles.length).padStart(2, "0")}
                </span>
                <span className={styles.roleName}>{role.role}</span>
              </div>
              <button type="button" onClick={() => go(1)} aria-label={tools.hub.next}>
                <svg viewBox="0 0 16 16" aria-hidden="true">
                  <path d="M6 3.5L10.5 8 6 12.5" />
                </svg>
              </button>
            </div>

            <div className={styles.dots} aria-hidden="true">
              {roles.map((x, i) => (
                <i key={x.id} data-on={i === active || undefined} />
              ))}
            </div>

            <div className={styles.hubBody} key={`b-${role.id}`}>
              <p className={styles.hubLabel}>
                {tools.hub.type}
                <span className={styles.typePill}>{role.type}</span>
              </p>
              <p className={styles.hubLabel}>{tools.hub.makes}</p>
              <ul className={styles.makes}>
                {row.makes.map((x, i) => (
                  <li key={x} style={{ "--d": `${120 + i * 90}ms` }}>
                    {x}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Destinations */}
        <div className={`${styles.side} ${styles.dests}`}>
          <p className={styles.sideHead}>
            <span>Out</span>
            {tools.destsTitle}
          </p>
          {portList(tools.dests, "right", to)}
        </div>
      </div>

      {/* The foot */}
      <div className={styles.foot}>
        <ul className={styles.facts}>
          {tools.facts.map((f) => (
            <li key={f}>
              <svg viewBox="0 0 16 16" aria-hidden="true">
                <path d="M3.5 8.5l3 3 6-7" />
              </svg>
              {f}
            </li>
          ))}
        </ul>
        <p className={styles.note}>{tools.note}</p>
      </div>
    </section>
  );
}
