"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { pricingTeaser as t } from "@/content/home";
import { pass, plans } from "@/content/pricing";
import { MagneticLink } from "@/components/hero/magnetic-link";
import { useCurrency } from "@/components/pricing/use-currency";
import { useSeen } from "@/components/use-seen";
import styles from "./pricing-teaser.module.css";

// The homepage's pricing teaser: an equalizer. Left (5fr), the pitch: eyebrow, "Every feature, on
// every plan.", lead, three ticks, See all plans / Start free trial. Right (7fr), the five plans as
// audio-meter bars on one shared hours scale (dashed gridlines at 0 · 5 · 10 · 15 · 20 h): each bar
// is LED segments, violet for listening hours with the accent voice lit lime from the foot, a lime
// peak marker that drops onto its top, and the plan's name and price (USD / INR, the page's
// currency) on the baseline under it. When the chart is first seen the bars bounce like a live
// equalizer, each on its own beat, then settle at the plan's real hours. Hovering a bar lights its
// column and says how many one-hour calls it covers. Every bar links to /pricing.
const options = [...plans, pass];
const MAX = Math.max(...options.map((p) => p.minutes));
const TICKS = [0, 5, 10, 15, 20];

const money = (p, cur) => (cur === "inr" ? `₹${p.inr.toLocaleString("en-IN")}` : `$${p.usd}`);
const hrs = (min) => (min >= 60 ? `${min / 60} h` : `${min} min`);

const Arrow = () => (
  <svg viewBox="0 0 16 16" aria-hidden="true">
    <path d="M3 8h9M8.5 4.5L12 8l-3.5 3.5" />
  </svg>
);

export function PricingTeaser() {
  const ref = useRef(null);
  const seen = useSeen(ref, 0.25);
  const [cur] = useCurrency();
  const [hot, setHot] = useState(null);

  return (
    <section id="pricing" ref={ref} className={styles.section} data-in={seen || undefined} aria-labelledby="pricing-teaser-title">
      <div className={styles.layout}>
        {/* The pitch */}
        <div className={styles.copy}>
          <p className={styles.eyebrow}>{t.eyebrow}</p>
          <h2 id="pricing-teaser-title" className={styles.title}>
            {t.title}
          </h2>
          <p className={styles.lead}>{t.lead}</p>
          <ul className={styles.points}>
            {t.points.map((p) => (
              <li key={p}>
                <span aria-hidden="true">✓</span>
                {p}
              </li>
            ))}
          </ul>
          <div className={styles.actions}>
            <MagneticLink className={styles.primary} href={t.primary.href}>
              <span>{t.primary.label}</span>
              <Arrow />
            </MagneticLink>
            <Link className={styles.secondary} href={t.secondary.href}>
              {t.secondary.label}
              <Arrow />
            </Link>
          </div>
        </div>

        {/* The equalizer */}
        <figure className={styles.chart} aria-label={t.chartLabel} onMouseLeave={() => setHot(null)}>
          <div className={styles.legend} aria-hidden="true">
            <span data-k="listen">{t.listen}</span>
            <span data-k="voice">{t.voice}</span>
          </div>

          <div className={styles.plot}>
            {/* Scale */}
            <div className={styles.grid} aria-hidden="true">
              {TICKS.map((h) => (
                <span key={h} style={{ "--y": h / (MAX / 60) }}>
                  <em>{h} h</em>
                </span>
              ))}
            </div>

            {/* Bars */}
            <ol className={styles.bars}>
              {options.map((p, i) => {
                const v = p.minutes / MAX;
                const vv = p.voice / MAX;
                const calls = Math.round(p.minutes / 60);
                const note = p.id === "interview_pass" ? t.pass : p.id === "team" ? t.perPerson : "";
                return (
                  <li
                    key={p.id}
                    className={styles.col}
                    data-hot={hot === i || undefined}
                    style={{ "--v": v, "--vv": vv, "--i": i }}
                    onMouseEnter={() => setHot(i)}
                  >
                    <Link href="/pricing" className={styles.link}>
                      <span className={styles.stack} aria-hidden="true">
                        <span className={styles.readout}>
                          <b>{hrs(p.minutes)}</b>
                          {p.voice > 0 && <i>+{hrs(p.voice)}</i>}
                        </span>
                        <span className={styles.peak} />
                        <span className={styles.bar}>
                          <span className={styles.voiceFill} />
                        </span>
                      </span>
                      <span className={styles.label}>
                        <b>{p.name}</b>
                        <span key={cur} className={styles.price}>
                          {money(p, cur)}
                          <small>{note || p.period}</small>
                        </span>
                        <em className={styles.calls}>{t.calls.replace("{n}", calls)}</em>
                      </span>
                      <span className={styles.sr}>
                        {p.name}: {money(p, cur)} {p.period}. {hrs(p.minutes)} of listening
                        {p.voice > 0 ? `, ${hrs(p.voice)} of accent voice` : ""}.
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ol>
          </div>
        </figure>
      </div>
    </section>
  );
}
