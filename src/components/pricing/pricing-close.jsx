"use client";

import { useEffect, useRef, useState } from "react";
import { pass, plans, pricingClose as c } from "@/content/pricing";
import { useCurrency } from "@/components/pricing/use-currency";
import { siteConfig } from "@/config/site";
import { useSeen } from "@/components/use-seen";
import styles from "@/components/features/features-end.module.css";

// The close of the Pricing page: the bookend to the hero, in the same styles as the other closes
// (features-end.module.css). "Try everything free. / Pick a plan later." while every plan and its
// price (in the page's currency) flashes past underneath, then the lead settles. Mac / Windows
// buttons ("Coming soon" while siteConfig.downloads has no links) and Watch it work. A ruled row
// of four links back up the page (Plans, Compare plans, How billing works, Quick answers).
const options = [...plans, pass];
const money = (p, cur) => (cur === "inr" ? `₹${p.inr.toLocaleString("en-IN")}` : `$${p.usd}`);

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

export function PricingClose() {
  const [cur] = useCurrency();
  const names = options.map((p) => `${p.name} · ${money(p, cur)} ${p.id === "team" ? "per " : ""}${p.period}`);
  const ref = useRef(null);
  const seen = useSeen(ref, 0.3);
  const [name, setName] = useState(null);

  useEffect(() => {
    if (!seen || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    let k = 0;
    const id = setInterval(() => {
      if (k >= names.length) {
        clearInterval(id);
        setName(null);
        return;
      }
      setName(names[k]);
      k += 1;
    }, 120);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seen]);

  const { mac, windows } = siteConfig.downloads;

  return (
    <section ref={ref} id="pricing-end" className={styles.section} data-in={seen || undefined} aria-labelledby="pricing-end-title">
      <div className={styles.bg} aria-hidden="true">
        <span className={styles.glowA} />
        <span className={styles.glowB} />
      </div>

      <p className={styles.eyebrow}>{c.eyebrow}</p>
      <h2 id="pricing-end-title" className={styles.title}>
        <span className={styles.line1}>{c.before}</span>
        <span className={styles.line2}>{c.after}</span>
      </h2>

      <p className={styles.ticker} aria-hidden="true">
        {name ? (
          <span className={styles.flash} key={name}>
            {name}
          </span>
        ) : (
          <span className={styles.settled}>{c.lead}</span>
        )}
      </p>

      <div className={styles.actions}>
        <OsButton href={mac} label={c.mac} soon={c.soon} icon={<Apple />} primary />
        <OsButton href={windows} label={c.windows} soon={c.soon} icon={<Windows />} />
        <a className={styles.watch} href={c.watch.href}>
          <span aria-hidden="true">
            <svg viewBox="0 0 16 16">
              <path d="M6 4.5v7l5.5-3.5z" />
            </svg>
          </span>
          {c.watch.label}
        </a>
      </div>

      <nav className={styles.jumps} aria-label={c.jumpLabel}>
        <p className={styles.jumpLabel}>{c.jumpLabel}</p>
        <ul style={{ "--cols": c.jumps.length }}>
          {c.jumps.map((j, i) => (
            <li key={j.href} style={{ "--tone": "var(--violet)", "--i": i }}>
              <a href={j.href}>
                <span className={styles.jn}>{String(i + 1).padStart(2, "0")}</span>
                <span className={styles.jl}>{j.label}</span>
                <span className={styles.jc}>{j.count}</span>
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
