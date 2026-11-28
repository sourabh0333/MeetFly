"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { moreRoles, roles, ucClose } from "@/content/use-cases";
import { siteConfig } from "@/config/site";
import { useSeen } from "@/components/use-seen";
import styles from "@/components/features/features-end.module.css";

// The close of the Use cases page: the bookend to the hero, in the same styles as the Features
// close. "Your calls. / Your copilot." while every role this page covers flashes past underneath,
// then it settles on one line. Mac / Windows buttons ("Coming soon" while siteConfig.downloads has
// no links) and See every feature. Then a ruled row of links back to each of the six roles (the
// hero's role tabs carry those ids and pick the role).
const names = [...roles.map((r) => r.role), ...moreRoles.items.map((r) => r.role)];

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

export function UseCasesClose() {
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
    }, 140);
    return () => clearInterval(id);
  }, [seen]);

  const { mac, windows } = siteConfig.downloads;

  return (
    <section ref={ref} id="use-cases-end" className={styles.section} data-in={seen || undefined} aria-labelledby="uc-end-title">
      <div className={styles.bg} aria-hidden="true">
        <span className={styles.glowA} />
        <span className={styles.glowB} />
      </div>

      <p className={styles.eyebrow}>{ucClose.eyebrow}</p>
      <h2 id="uc-end-title" className={styles.title}>
        <span className={styles.line1}>{ucClose.before}</span>
        {" "}
        <span className={styles.line2}>{ucClose.after}</span>
      </h2>

      <p className={styles.ticker} aria-hidden="true">
        {name ? (
          <span className={styles.flash} key={name}>
            {name}
          </span>
        ) : (
          <span className={styles.settled}>{ucClose.lead}</span>
        )}
      </p>

      {ucClose.trial && (
        <p className={styles.trial}>
          <b>{ucClose.trial.tag}</b>
          <span>{ucClose.trial.text}</span>
          <Link href={ucClose.trial.link.href}>
            {ucClose.trial.link.label}
            <svg viewBox="0 0 16 16" aria-hidden="true">
              <path d="M3 8h9M8.5 4.5L12 8l-3.5 3.5" />
            </svg>
          </Link>
        </p>
      )}

      <div className={styles.actions}>
        <OsButton href={mac} label={ucClose.mac} soon={ucClose.soon} icon={<Apple />} primary />
        <OsButton href={windows} label={ucClose.windows} soon={ucClose.soon} icon={<Windows />} />
        <a className={styles.watch} href={ucClose.features.href}>
          <span aria-hidden="true">
            <svg viewBox="0 0 16 16">
              <path d="M4 8h8M8.5 4.5L12 8l-3.5 3.5" />
            </svg>
          </span>
          {ucClose.features.label}
        </a>
      </div>

      <nav className={styles.jumps} aria-label={ucClose.jumpLabel}>
        <p className={styles.jumpLabel}>{ucClose.jumpLabel}</p>
        <ul style={{ "--cols": roles.length }}>
          {roles.map((r, i) => (
            <li key={r.id} style={{ "--tone": "var(--violet)", "--i": i }}>
              <a href={`#${r.id}`}>
                <span className={styles.jn}>{String(i + 1).padStart(2, "0")}</span>
                <span className={styles.jl}>{r.short || r.role}</span>
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
