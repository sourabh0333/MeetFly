"use client";

import { useEffect, useRef, useState } from "react";
import { featureGroups, featuresEnd } from "@/content/features";
import { siteConfig } from "@/config/site";
import { useSeen } from "@/components/use-seen";
import styles from "./features-end.module.css";

// The close of the Features page, the bookend to the hero: centred, with the same soft glows.
// "29 features. One download." — the 29 rolls up from 00 like the Before numerals while the feature
// names flash past underneath like a slot machine, then it settles on one line. Mac / Windows
// buttons ("Coming soon" while siteConfig.downloads has no links, as on the homepage) and Watch it
// work. Then a ruled row of four links back to each part of the page, with their counts.
const all = featureGroups.flatMap((g) => g.items.map((f) => f.name));
const total = all.length;
const DIGITS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const counts = Object.fromEntries(featureGroups.map((g) => [g.id, { n: g.items.length, tone: g.tone }]));

const Apple = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M16.4 12.6c0-2.3 1.9-3.4 2-3.5-1.1-1.6-2.8-1.8-3.4-1.8-1.4-.1-2.8.9-3.5.9-.7 0-1.8-.8-3-.8-1.5 0-3 .9-3.8 2.3-1.6 2.8-.4 7 1.2 9.3.8 1.1 1.7 2.4 2.9 2.3 1.2 0 1.6-.7 3-.7s1.8.7 3 .7c1.3 0 2.1-1.1 2.8-2.3.9-1.3 1.3-2.6 1.3-2.6s-2.5-1-2.5-3.8ZM14.1 5.8c.6-.8 1.1-1.9 1-3-1 0-2.1.7-2.8 1.5-.6.7-1.1 1.8-1 2.9 1 .1 2.1-.6 2.8-1.4Z" />
  </svg>
);
const Windows = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M3 5.5 10.5 4.4v7.1H3zM11.5 4.3 21 3v8.5h-9.5zM3 12.5h7.5v7.1L3 18.5zM11.5 12.5H21V21l-9.5-1.3z" />
  </svg>
);

function OsButton({ href, label, soon, icon, primary }) {
  const inner = (
    <>
      {icon}
      <span>
        {label}
        {!href && <small>{soon}</small>}
      </span>
    </>
  );
  const common = { className: styles.btn, "data-primary": primary || undefined };
  return href ? (
    <a {...common} href={href}>
      {inner}
    </a>
  ) : (
    <button {...common} type="button" aria-disabled="true">
      {inner}
    </button>
  );
}

export function FeaturesEnd() {
  const ref = useRef(null);
  const seen = useSeen(ref, 0.3);
  const [name, setName] = useState(null); // the flashing feature name; null once settled

  // While the number rolls, flash the feature names, then settle.
  useEffect(() => {
    if (!seen || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    let k = 0;
    const id = setInterval(() => {
      if (k >= total) {
        clearInterval(id);
        setName(null);
        return;
      }
      setName(all[k]);
      k += 1;
    }, 62);
    return () => clearInterval(id);
  }, [seen]);

  const [a, b] = String(total).padStart(2, "0").split("").map(Number);
  const { mac, windows } = siteConfig.downloads;

  return (
    <section ref={ref} id="features-end" className={styles.section} data-in={seen || undefined} aria-labelledby="features-end-title">
      <div className={styles.bg} aria-hidden="true">
        <span className={styles.glowA} />
        <span className={styles.glowB} />
      </div>

      <p className={styles.eyebrow}>{featuresEnd.eyebrow}</p>
      <h2 id="features-end-title" className={styles.title}>
        <span className={styles.sr}>
          {total} {featuresEnd.before} {featuresEnd.after}
        </span>
        <span aria-hidden="true" className={styles.line1}>
          <span className={styles.odo}>
            {[a, b].map((d, k) => (
              <span key={k} className={styles.col}>
                <span className={styles.strip} style={{ "--d": seen ? d : 0, "--c": k }}>
                  {DIGITS.map((x) => (
                    <span key={x}>{x}</span>
                  ))}
                </span>
              </span>
            ))}
          </span>{" "}
          {featuresEnd.before}
        </span>
        <span aria-hidden="true" className={styles.line2}>
          {featuresEnd.after}
        </span>
      </h2>

      <p className={styles.ticker} aria-hidden="true">
        {name ? (
          <span className={styles.flash} key={name}>
            {name}
          </span>
        ) : (
          <span className={styles.settled}>{featuresEnd.settle}</span>
        )}
      </p>

      <div className={styles.actions}>
        <OsButton href={mac} label={featuresEnd.mac} soon={featuresEnd.soon} icon={<Apple />} primary />
        <OsButton href={windows} label={featuresEnd.windows} soon={featuresEnd.soon} icon={<Windows />} />
        <a className={styles.watch} href={featuresEnd.watch.href}>
          <span aria-hidden="true">
            <svg viewBox="0 0 16 16">
              <path d="M6 4.5v7l5.5-3.5z" />
            </svg>
          </span>
          {featuresEnd.watch.label}
        </a>
      </div>

      {/* Back to each part of the page. */}
      <nav className={styles.jumps} aria-label={featuresEnd.jumpLabel}>
        <p className={styles.jumpLabel}>{featuresEnd.jumpLabel}</p>
        <ul>
          {featuresEnd.jumps.map((j, i) => (
            <li key={j.href} style={{ "--tone": counts[j.group].tone, "--i": i }}>
              <a href={j.href}>
                <span className={styles.jn}>{j.n}</span>
                <span className={styles.jl}>{j.label}</span>
                <span className={styles.jc}>{counts[j.group].n}</span>
                <svg viewBox="0 0 16 16" aria-hidden="true">
                  <path d="M8 13V3M4 7l4-4 4 4" />
                </svg>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </section>
  );
}
