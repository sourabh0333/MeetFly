"use client";

import { useEffect, useRef, useState } from "react";
import { privacyClose, promises } from "@/content/privacy";
import { siteConfig } from "@/config/site";
import { useSeen } from "@/components/use-seen";
import styles from "@/components/features/features-end.module.css";

// The close of the Privacy page: the bookend to the hero, in the same styles as the other closes.
// "Your meetings. / Stay with you." while the six promises flash past underneath, then it settles
// on one line. Mac / Windows buttons ("Coming soon" while siteConfig.downloads has no links) and
// See your controls. Then a ruled row of links back to the five parts of this page, and a line
// for the full policy (its date; the link and contact once siteConfig.legal has them).
const names = promises.items.map((p) => p.promise);

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

// Seven links: two rows (4 + 3).
const two = privacyClose.jumps.length > 6;
const cols = two ? Math.ceil(privacyClose.jumps.length / 2) : privacyClose.jumps.length;

export function PrivacyClose() {
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
    }, 260);
    return () => clearInterval(id);
  }, [seen]);

  const { mac, windows } = siteConfig.downloads;
  const legal = siteConfig.legal;
  const updated = new Date(`${legal.policyUpdated}T00:00:00Z`).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

  return (
    <section ref={ref} id="privacy-end" className={styles.section} data-in={seen || undefined} aria-labelledby="privacy-end-title">
      <div className={styles.bg} aria-hidden="true">
        <span className={styles.glowA} />
        <span className={styles.glowB} />
      </div>

      <p className={styles.eyebrow}>{privacyClose.eyebrow}</p>
      <h2 id="privacy-end-title" className={styles.title}>
        <span className={styles.line1}>{privacyClose.before}</span>
        {" "}
        <span className={styles.line2}>{privacyClose.after}</span>
      </h2>

      <p className={styles.ticker} aria-hidden="true">
        {name ? (
          <span className={styles.flash} key={name}>
            {name}
          </span>
        ) : (
          <span className={styles.settled}>{privacyClose.lead}</span>
        )}
      </p>

      <div className={styles.actions}>
        <OsButton href={mac} label={privacyClose.mac} soon={privacyClose.soon} icon={<Apple />} primary />
        <OsButton href={windows} label={privacyClose.windows} soon={privacyClose.soon} icon={<Windows />} />
        <a className={styles.watch} href={privacyClose.controls.href}>
          <span aria-hidden="true">
            <svg viewBox="0 0 16 16">
              <path d="M4 8h8M8.5 4.5L12 8l-3.5 3.5" />
            </svg>
          </span>
          {privacyClose.controls.label}
        </a>
      </div>

      <nav className={styles.jumps} aria-label={privacyClose.jumpLabel}>
        <p className={styles.jumpLabel}>{privacyClose.jumpLabel}</p>
        <ul data-two={two || undefined} style={{ "--cols": cols }}>
          {privacyClose.jumps.map((j, i) => (
            <li key={j.href} data-top={(two && i < cols) || undefined} data-start={(two && i % cols === 0) || undefined} style={{ "--tone": "var(--violet)", "--i": i }}>
              <a href={j.href}>
                <span className={styles.jn}>{String(i + 1).padStart(2, "0")}</span>
                <span className={styles.jl}>{j.label}</span>
                <svg viewBox="0 0 16 16" aria-hidden="true">
                  <path d="M8 13V3M4 7l4-4 4 4" />
                </svg>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* The full policy: its date always; the link and contact only once they exist. */}
      <p className={styles.policy}>
        <span>{privacyClose.policy.label}</span>
        <span>
          {privacyClose.policy.updated} {updated}
        </span>
        {legal.privacyUrl && <a href={legal.privacyUrl}>{privacyClose.policy.read}</a>}
        {legal.contactEmail && (
          <a href={`mailto:${legal.contactEmail}`}>
            {privacyClose.policy.contact} {legal.contactEmail}
          </a>
        )}
      </p>
    </section>
  );
}
