"use client";

import { useEffect, useRef, useState } from "react";
import { pass, plans, pricingPage } from "@/content/pricing";
import { DecodeText } from "@/components/hero/decode-text";
import { MagneticLink } from "@/components/hero/magnetic-link";
import { useOnScreen, useSeen } from "@/components/use-seen";
import { useCurrency } from "./use-currency";
import head from "@/components/features/features-hero.module.css";
import styles from "./pricing-hero.module.css";

// The Pricing hero. The shared centred headline (Features / Use cases styles) with a USD / INR
// switch (INR first for visitors in India). Under it one hero showpiece, a dark plan stage:
// a segmented switcher of all five options (a lime thumb slides; Pro + Voice, the trial plan, is
// picked first); a main row of three ruled columns: the plan (name, who it's for, a rolling price,
// buttons) | concentric hour rings (outer: listening hours, inner: accent voice) that sweep to the
// picked plan, with the hours in the centre | a ruled spec list (listening, accent voice,
// features, billing); and a "Not sure? Find my plan" strip (hours slider, accent voice, people)
// that switches the stage to the plan that fits. While on screen the tabs move on by themselves
// every 4.2s (paused under the pointer) until a tab is clicked or the finder is used. Plans, prices and allowances are the app's own.
const f = pricingPage.finder;
const st = pricingPage.stage;
const options = [...plans, pass];
const MAX = Math.max(...options.map((p) => p.minutes)); // the rings' shared scale (minutes)
const PLAN_H = MAX / 60;
const CYCLE_MS = 4200; // how long each tab shows while the stage plays by itself

const money = (n, cur) => (cur === "inr" ? `₹${n.toLocaleString("en-IN")}` : `$${n.toLocaleString("en-US")}`);
const amount = (plan, cur) => (cur === "inr" ? plan.inr : plan.usd);
const hrs = (min) => (min >= 60 ? `${min / 60} h` : `${min} min`);
const fill = (s, o) => Object.entries(o).reduce((t, [k, v]) => t.replace(`{${k}}`, v), s);

// The plan that fits: several people → Team; the accent voice → Pro + Voice; up to 3 h → Free.
const fitFor = (h, voice, people) => (people > 1 ? "team" : voice ? "pro_voice" : h <= 3 ? "free" : "pro");

function Rolling({ text, className }) {
  return (
    <span className={className} key={text} aria-label={text}>
      {[...text].map((ch, i) => (
        <span key={i} aria-hidden="true" style={{ "--d": `${i * 40}ms` }}>
          {ch}
        </span>
      ))}
    </span>
  );
}

const Arrow = () => (
  <svg viewBox="0 0 16 16" aria-hidden="true">
    <path d="M3 8h9M8.5 4.5L12 8l-3.5 3.5" />
  </svg>
);

export function PricingHero() {
  const stageRef = useRef(null);
  const seen = useSeen(stageRef, 0.15);
  const onScreen = useOnScreen(stageRef, 0.3);
  const [auto, setAuto] = useState(true); // cycles the tabs until someone picks
  const [hold, setHold] = useState(false); // pointer over the stage
  const [still, setStill] = useState(false);
  const [cur, setCur] = useCurrency(); // shared with the sections below
  const [sel, setSel] = useState("pro_voice");
  const [asked, setAsked] = useState(false); // has the finder been used?
  const [hours, setHours] = useState(12);
  const [voice, setVoice] = useState(false);
  const [people, setPeople] = useState(1);

  useEffect(() => setStill(window.matchMedia("(prefers-reduced-motion: reduce)").matches), []);

  // Move to the next tab every few seconds while the stage is on screen.
  useEffect(() => {
    if (!auto || !onScreen || hold || still) return undefined;
    const id = setInterval(() => {
      setSel((cur) => options[(options.findIndex((p) => p.id === cur) + 1) % options.length].id);
    }, CYCLE_MS);
    return () => clearInterval(id);
  }, [auto, onScreen, hold, still]);

  // Using the finder moves the stage to the plan that fits.
  const ask = (next) => {
    const h = next.hours ?? hours;
    const v = next.voice ?? voice;
    const p = next.people ?? people;
    if (next.hours !== undefined) setHours(h);
    if (next.voice !== undefined) setVoice(v);
    if (next.people !== undefined) setPeople(p);
    setAsked(true);
    setAuto(false);
    setSel(fitFor(h, v, p));
  };

  const index = options.findIndex((p) => p.id === sel);
  const plan = options[index];
  const fitId = fitFor(hours, voice, people);
  const isFit = asked && sel === fitId;
  const teamTotal = plan.id === "team" && people > 1 ? amount(plan, cur) * people : 0;
  const note = asked && people > 1 && voice ? f.teamVoice : asked && hours > PLAN_H ? f.over : "";
  const R1 = 92;
  const R2 = 70;

  return (
    <section id="pricing-top" className={head.hero} aria-labelledby="pricing-title">
      <div className={head.bg} aria-hidden="true">
        <span className={head.glowA} />
        <span className={head.glowB} />
      </div>

      <div className={head.head}>
        <p className={head.eyebrow}>
          <span className={head.tag}>
            <i aria-hidden="true" />
            {pricingPage.eyebrow.tag}
          </span>
          {pricingPage.eyebrow.text}
        </p>
        <h1 id="pricing-title" className={head.title}>
          <span className={head.sr}>
            {pricingPage.title.top} {pricingPage.title.prefix} {pricingPage.title.mark}
          </span>
          <span aria-hidden="true" className={head.line1}>
            <DecodeText text={pricingPage.title.top} />
          </span>
          <span aria-hidden="true" className={head.line2}>
            {pricingPage.title.prefix}{" "}
            <span className={head.mark}>
              {pricingPage.title.mark}
              <svg viewBox="0 0 300 24" preserveAspectRatio="none" aria-hidden="true">
                <path pathLength="1" d="M4 16 C 60 6, 120 20, 180 11 S 270 8, 296 12" />
              </svg>
            </span>
          </span>
        </h1>
        <p className={head.lead}>{pricingPage.lead}</p>

        <div className={styles.currency} role="radiogroup" aria-label={pricingPage.currency.label} data-cur={cur}>
          <span className={styles.curLabel}>{pricingPage.currency.label}</span>
          <span className={styles.curSwitch}>
            <i className={styles.curThumb} aria-hidden="true" />
            {["usd", "inr"].map((c) => (
              <button key={c} type="button" role="radio" aria-checked={cur === c} onClick={() => setCur(c)}>
                {c === "usd" ? "$ " : "₹ "}
                {pricingPage.currency[c]}
              </button>
            ))}
          </span>
        </div>
      </div>

      {/* ---------------- The plan stage ---------------- */}
      <div ref={stageRef} className={styles.stageWrap} data-in={seen || undefined}>
        <div className={styles.stage} onMouseEnter={() => setHold(true)} onMouseLeave={() => setHold(false)}>
          {/* The switcher */}
          <div className={styles.tabs} role="tablist" aria-label={st.tabsLabel} style={{ "--i": index, "--n": options.length }}>
            <i className={styles.thumb} aria-hidden="true" />
            {options.map((p) => (
              <button key={p.id} type="button" role="tab" aria-selected={p.id === sel} aria-controls="plan-panel" onClick={() => {
                  setAuto(false);
                  setSel(p.id);
                }}>
                {p.name}
              </button>
            ))}
          </div>

          <div id="plan-panel" className={styles.main} role="tabpanel" aria-label={plan.name} aria-live="polite">
            {/* The plan */}
            <div className={styles.planCol} key={`p-${plan.id}`}>
              <div className={styles.planTop}>
                <h2 className={styles.planName}>{plan.name}</h2>
                {isFit && <span className={styles.fitBadge}>{st.fits}</span>}
              </div>
              <p className={styles.who}>{plan.who}</p>
              <p className={styles.priceLine}>
                <Rolling text={money(amount(plan, cur), cur)} className={styles.price} />
                <span className={styles.period}>{plan.period}</span>
              </p>
              {teamTotal > 0 && <p className={styles.teamTotal}>{fill(f.times, { p: money(amount(plan, cur), cur), n: people })} = {money(teamTotal, cur)} a month</p>}
              <div className={styles.buttons}>
                <MagneticLink className={styles.ctaPrimary} href={plan.cta.href}>
                  <span>{plan.cta.label}</span>
                  <Arrow />
                </MagneticLink>
              </div>
              <p className={styles.trial}>{st.trial}</p>
            </div>

            {/* The rings */}
            <div className={styles.ringCol} aria-hidden="true">
              <svg className={styles.rings} viewBox="0 0 220 220">
                <defs>
                  <linearGradient id="ringA" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stopColor="#5b2eff" />
                    <stop offset="1" stopColor="#d4ff3a" />
                  </linearGradient>
                  <linearGradient id="ringB" x1="0" y1="1" x2="1" y2="0">
                    <stop offset="0" stopColor="#8a5cff" />
                    <stop offset="1" stopColor="#e2ff7a" />
                  </linearGradient>
                </defs>
                <circle className={styles.ringTrack} cx="110" cy="110" r={R1} />
                <circle className={styles.ringTrack} cx="110" cy="110" r={R2} />
                <circle className={styles.ring} cx="110" cy="110" r={R1} pathLength="1" stroke="url(#ringA)" style={{ "--v": seen ? plan.minutes / MAX : 0 }} />
                <circle className={`${styles.ring} ${styles.ringInner}`} cx="110" cy="110" r={R2} pathLength="1" stroke="url(#ringB)" style={{ "--v": seen ? plan.voice / MAX : 0 }} />
              </svg>
              <div className={styles.ringCentre} key={`r-${plan.id}`}>
                <b>{hrs(plan.minutes)}</b>
                <span>{plan.id === "interview_pass" ? plan.period : st.hoursCentre}</span>
                <em>{plan.voice ? fill(st.voicePlus, { v: hrs(plan.voice) }) : st.noVoice}</em>
              </div>
            </div>

            {/* The spec list */}
            <dl className={styles.specs} key={`s-${plan.id}`}>
              <div>
                <dt>
                  <i data-k="listen" />
                  {st.rows.listen}
                </dt>
                <dd>
                  {hrs(plan.minutes)} {plan.id === "team" ? "each" : ""}
                </dd>
              </div>
              <div>
                <dt>
                  <i data-k="voice" />
                  {st.rows.voice}
                </dt>
                <dd data-off={!plan.voice || undefined}>{plan.voice ? hrs(plan.voice) : st.notIncluded}</dd>
              </div>
              <div>
                <dt>{st.rows.features}</dt>
                <dd>{st.everyFeature}</dd>
              </div>
              <div>
                <dt>{st.rows.billing}</dt>
                <dd>{plan.billing}</dd>
              </div>
            </dl>
          </div>

          {/* Not sure? Find my plan */}
          <div className={styles.find}>
            <p className={styles.findHead}>
              <b>{st.findTitle}</b>
              {st.findLead}
            </p>

            <div className={styles.findHours}>
              <label htmlFor="hours" className={styles.findLabel}>
                {f.hoursLabel}
                <b>{hours} h</b>
              </label>
              <div className={styles.slider} style={{ "--v": ((hours - 1) / (f.max - 1)).toFixed(4) }}>
                <input
                  id="hours"
                  type="range"
                  min="1"
                  max={f.max}
                  step="1"
                  value={hours}
                  onChange={(e) => ask({ hours: Number(e.target.value) })}
                  aria-valuetext={`${hours} hours a month`}
                />
                <span className={styles.track} aria-hidden="true">
                  <i />
                </span>
                {f.marks.map((m) => (
                  <span key={m.at} className={styles.mark} style={{ "--at": ((m.at - 1) / (f.max - 1)).toFixed(4) }} aria-hidden="true" />
                ))}
              </div>
            </div>

            <button type="button" className={styles.toggleRow} role="switch" aria-checked={voice} onClick={() => ask({ voice: !voice })}>
              <span className={styles.toggle} aria-hidden="true" />
              {f.voice}
            </button>

            <div className={styles.stepRow}>
              <span>{f.people}</span>
              <span className={styles.stepper}>
                <button type="button" onClick={() => ask({ people: Math.max(1, people - 1) })} aria-label="Fewer people" disabled={people <= 1}>
                  −
                </button>
                <Rolling text={String(people)} className={styles.stepNum} />
                <button type="button" onClick={() => ask({ people: Math.min(50, people + 1) })} aria-label="More people">
                  +
                </button>
              </span>
            </div>
          </div>
          {note && <p className={styles.note}>{note}</p>}
        </div>

        <p className={styles.footnote}>{pricingPage.footnote}</p>
      </div>
    </section>
  );
}
