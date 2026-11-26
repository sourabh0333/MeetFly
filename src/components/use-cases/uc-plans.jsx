"use client";

import Link from "next/link";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { planByRole as c, roles } from "@/content/use-cases";
import { plans, pass } from "@/content/pricing";
import { SectionHead } from "@/components/section-head/section-head";
import { useCurrency } from "@/components/pricing/use-currency";
import { useOnScreen, useSeen } from "@/components/use-seen";
import styles from "./uc-plans.module.css";

// "Which plan fits your calls?": a matching diagram. Left, the six roles (and "Just trying it") as
// a ruled list; right, the five plans as price lines (name, price in the page's currency, hours,
// accent voice). Curves run from every role to its suggested plan, so you can see several roles
// meet at one plan; the picked role's curve draws in violet → lime and its plan lights. Under it,
// the verdict: role → plan, the price, why, and the plan's own button plus "Compare every plan".
// It steps through the roles while on screen until someone picks. Phones: no curves; pick a role
// and the verdict shows its plan. Plans, prices and hours come from content/pricing.js.
const STEP_MS = 4200;
const allPlans = [...plans, pass];
const byId = Object.fromEntries(allPlans.map((p) => [p.id, p]));
const roleName = Object.fromEntries(roles.map((r) => [r.id, r.role]));
const items = c.roles.map((r) => ({ ...r, name: r.label || roleName[r.id], p: byId[r.plan] }));

const hrs = (min) => (min >= 60 ? `${+(min / 60).toFixed(1)} h` : `${min} min`);
const money = (p, cur) => (p.usd === 0 ? (cur === "inr" ? "₹0" : "$0") : cur === "inr" ? `₹${p.inr.toLocaleString("en-IN")}` : `$${p.usd}`);

export function UseCasesPlans() {
  const ref = useRef(null);
  const boardRef = useRef(null);
  const roleRefs = useRef([]);
  const planRefs = useRef({});
  const seen = useSeen(ref, 0.12);
  const on = useOnScreen(ref, 0.12);
  const [cur] = useCurrency();
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(true);
  const [still, setStill] = useState(false);
  const [geo, setGeo] = useState(null); // { w, h, paths: [d] }
  const measureRef = useRef(() => {});

  useEffect(() => setStill(window.matchMedia("(prefers-reduced-motion: reduce)").matches), []);

  useEffect(() => {
    if (!seen || !on || !auto || still) return undefined;
    const id = setTimeout(() => setI((k) => (k + 1) % items.length), STEP_MS);
    return () => clearTimeout(id);
  }, [seen, on, auto, still, i]);

  // Measure where each role ends and each plan starts, and draw a curve between them.
  useLayoutEffect(() => {
    const board = boardRef.current;
    if (!board) return undefined;
    const measure = () => {
      const b = board.getBoundingClientRect();
      if (window.innerWidth <= 860) return setGeo(null);
      const paths = items.map((it, k) => {
        const r = roleRefs.current[k]?.getBoundingClientRect();
        const p = planRefs.current[it.plan]?.getBoundingClientRect();
        if (!r || !p) return "";
        const x1 = r.right - b.left + 10;
        const y1 = r.top + r.height / 2 - b.top;
        const x2 = p.left - b.left - 10;
        const y2 = p.top + p.height / 2 - b.top;
        const mx = (x1 + x2) / 2;
        return `M${x1.toFixed(1)} ${y1.toFixed(1)} C${mx.toFixed(1)} ${y1.toFixed(1)} ${mx.toFixed(1)} ${y2.toFixed(1)} ${x2.toFixed(1)} ${y2.toFixed(1)}`;
      });
      setGeo({ w: b.width, h: b.height, paths });
    };
    measureRef.current = measure;
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(board);
    return () => ro.disconnect();
  }, []);

  // Measure again once the rows have slid into place (their reveal moves them sideways).
  useEffect(() => {
    if (!seen) return undefined;
    const id = setTimeout(() => measureRef.current(), 1300);
    return () => clearTimeout(id);
  }, [seen]);

  const pick = (k) => {
    setAuto(false);
    setI(k);
  };
  const it = items[i];
  const p = it.p;

  return (
    <section id="plans" ref={ref} className={styles.section} data-in={seen || undefined} data-paused={!on || undefined} aria-labelledby="plans-title">
      <SectionHead id="plans-title" eyebrow={c.eyebrow} title={c.title} lead={c.lead} />

      <div ref={boardRef} className={styles.board}>
        {/* The curves */}
        {geo && (
          <svg className={styles.wires} width={geo.w} height={geo.h} viewBox={`0 0 ${geo.w} ${geo.h}`} aria-hidden="true">
            <defs>
              <linearGradient id="ucPlanWire" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0" stopColor="#5b2eff" />
                <stop offset="1" stopColor="#9dc61f" />
              </linearGradient>
            </defs>
            {geo.paths.map((d, k) => (
              <path key={k} d={d} className={styles.wire} data-same={items[k].plan === it.plan || undefined} />
            ))}
            {geo.paths[i] && <path key={`on-${i}`} d={geo.paths[i]} pathLength="1" className={styles.wireOn} />}
          </svg>
        )}

        {/* Roles */}
        <div className={styles.roles}>
          <p className={styles.colLabel}>{c.rolesLabel}</p>
          <ol role="radiogroup" aria-label={c.rolesLabel}>
            {items.map((r, k) => (
              <li key={r.id} style={{ "--k": k }}>
                <button
                  ref={(el) => (roleRefs.current[k] = el)}
                  type="button"
                  role="radio"
                  aria-checked={k === i}
                  data-soft={r.id === "trying" || undefined}
                  onClick={() => pick(k)}
                  onPointerEnter={(e) => e.pointerType === "mouse" && pick(k)}
                >
                  <span className={styles.rNum}>{String(k + 1).padStart(2, "0")}</span>
                  <span className={styles.rName}>{r.name}</span>
                  <i className={styles.dot} aria-hidden="true" />
                </button>
              </li>
            ))}
          </ol>
        </div>

        {/* Plans */}
        <div className={styles.plans}>
          <p className={styles.colLabel}>{c.plansLabel}</p>
          <ul>
            {allPlans.map((pl, k) => {
              const count = items.filter((x) => x.plan === pl.id).length;
              return (
                <li
                  key={pl.id}
                  ref={(el) => (planRefs.current[pl.id] = el)}
                  className={styles.plan}
                  data-on={pl.id === it.plan || undefined}
                  style={{ "--k": k }}
                >
                  <i className={styles.dot} aria-hidden="true" />
                  <span className={styles.pName}>
                    {pl.name}
                    {count > 1 && <em>×{count}</em>}
                  </span>
                  <span className={styles.pPrice}>
                    <b>{money(pl, cur)}</b> {pl.period}
                  </span>
                  <span className={styles.pHours}>
                    {hrs(pl.minutes)} {c.listen} · {pl.voice ? `${hrs(pl.voice)} ${c.voice}` : c.noVoice}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      {/* The verdict */}
      <div className={styles.verdict} aria-live="polite">
        <div key={i} className={styles.vRead}>
          <p className={styles.vMatch}>
            <span>{it.name}</span>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M4 12h15M14 6l6 6-6 6" />
            </svg>
            <b>{p.name}</b>
            <em>
              {money(p, cur)} {p.period}
            </em>
          </p>
          <p className={styles.vWhy}>
            <span>{c.why}</span>
            {it.why}
          </p>
        </div>
        <div className={styles.vActions}>
          <Link href={p.cta.href} className={styles.primary}>
            {p.cta.label}
            <svg viewBox="0 0 16 16" aria-hidden="true">
              <path d="M3 8h9M8.5 4.5L12 8l-3.5 3.5" />
            </svg>
          </Link>
          <Link href={c.more.href} className={styles.secondary}>
            {c.more.label}
          </Link>
        </div>
      </div>
    </section>
  );
}
