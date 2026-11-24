"use client";

import { useEffect, useRef, useState } from "react";
import { compare as c, pass, plans } from "@/content/pricing";
import { featureGroups } from "@/content/features";
import { SectionHead } from "@/components/section-head/section-head";
import { MagneticLink } from "@/components/hero/magnetic-link";
import { useOnScreen, useSeen } from "@/components/use-seen";
import { useCurrency } from "./use-currency";
import styles from "./pricing-compare.module.css";

// "Compare plans": any two plans head to head. Two plan pickers face each other across a centre
// spine (a round "vs" button swaps them with a spin). Each row is mirrored: the first plan's bar grows left from
// the spine, the second plan's grows right, on one shared scale per row; the spine carries the row's
// name and the difference ("+8 h", "+₹1,500", or "Same"), nudged toward the side that has more.
// Rows: price, listening, accent voice, price per listening hour, people, billing. The spine then
// runs down into a dark "Same on both" knot over an index of every feature (the Features page's
// list, one ruled line per group). While on screen it steps through a few useful pairs by itself
// until someone picks. Prices follow the hero's USD / INR switch.
const options = [...plans, pass];
const byId = Object.fromEntries(options.map((p) => [p.id, p]));
const groups = [...featureGroups].sort((a, b) => a.n.localeCompare(b.n));
const total = groups.reduce((n, g) => n + g.items.length, 0);
const PAIRS = [
  ["pro", "pro_voice"],
  ["free", "pro"],
  ["pro", "team"],
  ["pro_voice", "interview_pass"],
];
const STEP = 4600;

const money = (n, cur, digits = 0) =>
  cur === "inr"
    ? `₹${Math.round(n).toLocaleString("en-IN")}`
    : `$${n.toLocaleString("en-US", { minimumFractionDigits: digits, maximumFractionDigits: digits })}`;
const amount = (p, cur) => (cur === "inr" ? p.inr : p.usd);
const hrs = (min) => (min >= 60 ? `${+(min / 60).toFixed(1)} h` : `${min} min`);
const per = (p) => (p.id === "interview_pass" ? c.per.pass : p.id === "team" ? c.per.team : c.per.month);
const hourly = (p, cur) => amount(p, cur) / (p.minutes / 60);
const maxOf = (fn) => Math.max(...options.map(fn));

// Every row: how to read a plan's number (for the bar and the difference) and how to show it.
const ROWS = [
  {
    key: "price",
    num: (p, cur) => amount(p, cur),
    max: (cur) => maxOf((p) => amount(p, cur)),
    show: (p, cur) => ({ big: money(amount(p, cur), cur), small: p.period }),
    diff: (d, cur) => money(d, cur),
  },
  {
    key: "listen",
    num: (p) => p.minutes,
    max: () => maxOf((p) => p.minutes),
    show: (p) => ({ big: hrs(p.minutes), small: per(p) }),
    diff: (d) => hrs(d),
  },
  {
    key: "voice",
    num: (p) => p.voice,
    max: () => maxOf((p) => p.voice),
    show: (p) => (p.voice ? { big: hrs(p.voice), small: per(p) } : { none: c.notIncluded }),
    diff: (d) => hrs(d),
  },
  {
    key: "perHour",
    num: (p, cur) => hourly(p, cur),
    max: (cur) => maxOf((p) => hourly(p, cur)),
    show: (p, cur) =>
      amount(p, cur) === 0 ? { big: c.free } : { big: `≈ ${money(hourly(p, cur), cur, 2)}`, small: p.id === "team" ? c.each : "" },
    diff: (d, cur) => money(d, cur, 2),
  },
  { key: "people", text: (p) => (p.id === "team" ? c.perPerson : c.you) },
  { key: "billing", text: (p) => p.billing },
];

const Arrow = () => (
  <svg viewBox="0 0 16 16" aria-hidden="true">
    <path d="M3 8h9M8.5 4.5L12 8l-3.5 3.5" />
  </svg>
);

function Picker({ label, value, other, onPick, side }) {
  const ref = useRef(null);
  // On phones the picker scrolls sideways: keep the picked plan in view.
  useEffect(() => {
    const box = ref.current;
    const on = box?.querySelector("[aria-checked=true]");
    if (box && on && box.scrollWidth > box.clientWidth) {
      box.scrollTo({ left: on.offsetLeft - (box.clientWidth - on.offsetWidth) / 2, behavior: "smooth" });
    }
  }, [value]);
  return (
    <div ref={ref} className={styles.picker} role="radiogroup" aria-label={label} data-side={side}>
      {options.map((p) => (
        <button
          key={p.id}
          type="button"
          role="radio"
          aria-checked={value === p.id}
          disabled={other === p.id}
          onClick={() => onPick(p.id)}
        >
          {p.name}
        </button>
      ))}
    </div>
  );
}

export function PricingCompare() {
  const ref = useRef(null);
  const seen = useSeen(ref, 0.12);
  const on = useOnScreen(ref, 0.25);
  const [cur] = useCurrency();
  const [pair, setPair] = useState(PAIRS[0]);
  const [turns, setTurns] = useState(0); // spins the swap button
  const [auto, setAuto] = useState(true);
  const [still, setStill] = useState(false);

  useEffect(() => setStill(window.matchMedia("(prefers-reduced-motion: reduce)").matches), []);

  // Step through a few useful pairs until someone picks.
  useEffect(() => {
    if (!auto || !on || still) return undefined;
    const id = setInterval(() => {
      setPair((cp) => PAIRS[(PAIRS.findIndex((x) => x[0] === cp[0] && x[1] === cp[1]) + 1) % PAIRS.length]);
    }, STEP);
    return () => clearInterval(id);
  }, [auto, on, still]);

  const [a, b] = pair.map((id) => byId[id]);
  const pick = (side) => (id) => {
    setAuto(false);
    setPair((cp) => (side === 0 ? [id, cp[1]] : [cp[0], id]));
  };
  const swap = () => {
    setAuto(false);
    setTurns((t) => t + 1);
    setPair((cp) => [cp[1], cp[0]]);
  };

  // A plain function, not a component, so the bars keep their elements and slide between plans.
  const renderSide = (p, row, side) => {
    if (row.text) {
      return (
        <div className={styles.side} data-side={side}>
          <span className={styles.text}>{row.text(p)}</span>
        </div>
      );
    }
    const v = row.show(p, cur);
    const max = row.max(cur) || 1;
    const n = row.num(p, cur);
    return (
      <div className={styles.side} data-side={side}>
        {v.none ? (
          <span className={styles.none}>{v.none}</span>
        ) : (
          <span className={styles.value} key={v.big}>
            {v.big}
            {v.small && <small>{v.small}</small>}
          </span>
        )}
        <span className={styles.track} aria-hidden="true">
          <i style={{ "--v": n > 0 ? Math.max(n / max, 0.025) : 0 }} data-voice={row.key === "voice" || undefined} />
        </span>
      </div>
    );
  };

  const spine = (row) => {
    if (row.text) {
      const same = row.text(a) === row.text(b);
      return { tag: same ? c.same : c.differs, side: "", same };
    }
    const d = row.num(b, cur) - row.num(a, cur);
    if (Math.abs(d) < 0.005) return { tag: c.same, side: "", same: true };
    return { tag: `+${row.diff(Math.abs(d), cur)}`, side: d > 0 ? "b" : "a", same: false };
  };

  return (
    <section id="compare" ref={ref} className={styles.section} data-in={seen || undefined} aria-labelledby="compare-title">
      <SectionHead id="compare-title" eyebrow={c.eyebrow} title={c.title} lead={c.lead} />

      <div className={styles.duel}>
        {/* The spine behind everything */}
        <span className={styles.spineLine} aria-hidden="true" />

        {/* The two plans, face to face */}
        <div className={styles.head}>
          <div className={styles.plan} data-side="a">
            <Picker label={c.pickA} value={a.id} other={b.id} onPick={pick(0)} side="a" />
            <p className={styles.name} key={a.id}>
              {a.name}
              {a.trial && <span className={styles.chip}>{c.trialChip}</span>}
            </p>
            <p className={styles.who} key={`w${a.id}`}>{a.who}</p>
          </div>

          <div className={styles.vsCol}>
            <button type="button" className={styles.vs} onClick={swap} aria-label={c.swap} style={{ "--turn": `${turns * 360}deg` }}>
              <span>{c.vs}</span>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M7 7h11l-3-3M17 17H6l3 3" />
              </svg>
            </button>
          </div>

          <div className={styles.plan} data-side="b">
            <Picker label={c.pickB} value={b.id} other={a.id} onPick={pick(1)} side="b" />
            <p className={styles.name} key={b.id}>
              {b.name}
              {b.trial && <span className={styles.chip}>{c.trialChip}</span>}
            </p>
            <p className={styles.who} key={`w${b.id}`}>{b.who}</p>
          </div>
        </div>

        {/* The mirrored rows */}
        <div className={styles.rows} role="table" aria-label={`${a.name} ${c.vs} ${b.name}`}>
          <div role="row" className={styles.sr}>
            <span role="columnheader">{a.name}</span>
            <span role="columnheader">{c.eyebrow}</span>
            <span role="columnheader">{b.name}</span>
          </div>
          {ROWS.map((row, i) => {
            const s = spine(row);
            return (
              <div role="row" key={row.key} className={styles.row} style={{ "--r": i }}>
                <div role="cell">
                  {renderSide(a, row, "a")}
                </div>
                <div role="rowheader" className={styles.mid} data-lean={s.side || undefined}>
                  <span className={styles.rowName}>{c.rows[row.key]}</span>
                  <span className={styles.diff} data-same={s.same || undefined} key={s.tag + s.side}>
                    {s.side === "a" && <b aria-hidden="true">←</b>}
                    {s.tag}
                    {s.side === "b" && <b aria-hidden="true">→</b>}
                  </span>
                </div>
                <div role="cell">
                  {renderSide(b, row, "b")}
                </div>
              </div>
            );
          })}
        </div>

        {/* Where the spine ends: everything that's the same on both */}
        <div className={styles.knotWrap}>
          <p className={styles.knot}>
            <i aria-hidden="true" />
            {c.sameTitle}
            <span>{c.sameNote.replace("{n}", total)}</span>
          </p>
        </div>
      </div>

      <div className={styles.index}>
        {groups.map((g, gi) => (
          <div key={g.id} className={styles.line} style={{ "--g": gi }}>
            <p className={styles.gTitle}>
              <span>{g.n}</span>
              {g.title}
              <em>{g.items.length}</em>
            </p>
            <ul>
              {g.items.map((it) => (
                <li key={it.id}>{it.name}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className={styles.close}>
        <p>{c.close.text}</p>
        <MagneticLink className={styles.cta} href={c.close.href}>
          <span>{c.close.label}</span>
          <Arrow />
        </MagneticLink>
      </div>
    </section>
  );
}
