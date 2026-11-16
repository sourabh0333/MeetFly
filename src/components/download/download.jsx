"use client";

import { useEffect, useRef, useState } from "react";
import { download } from "@/content/home";
import { siteConfig } from "@/config/site";
import styles from "./download.module.css";

// The closing download section, on the light page: giant MeetFly headphones whose headband draws
// itself when seen, ear cups sliding in and sound rings pulsing out, with the headline inside the
// arch. Magnetic Mac / Windows buttons below. While siteConfig.downloads has no URL a button reads
// "Coming soon" and is disabled (no fake links).

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

// A button that leans toward the mouse, then springs back.
function OsButton({ href, label, soon, icon, primary }) {
  const ref = useRef(null);
  const onMove = (e) => {
    if (e.pointerType !== "mouse" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = ref.current.getBoundingClientRect();
    ref.current.style.translate = `${((e.clientX - r.left - r.width / 2) * 0.25).toFixed(1)}px ${((e.clientY - r.top - r.height / 2) * 0.3).toFixed(1)}px`;
  };
  const onLeave = () => ref.current && (ref.current.style.translate = "");
  const inner = (
    <>
      {icon}
      <span>
        {label}
        {!href && <small>{soon}</small>}
      </span>
    </>
  );
  const common = { ref, className: styles.btn, "data-primary": primary || undefined, onPointerMove: onMove, onPointerLeave: onLeave };
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

export function Download() {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setSeen(true), { threshold: 0.25 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  const { mac, windows } = siteConfig.downloads;

  return (
    <section ref={ref} id="download" className={styles.section} data-in={seen || undefined} aria-labelledby="download-title">
      <div className={styles.phones}>
        {/* Giant headphones: the headband draws itself, the cups slide in, sound rings pulse out. */}
        <svg className={styles.art} viewBox="0 0 1000 560" aria-hidden="true">
          <defs>
            <linearGradient id="dlBand" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="#8f74ff" />
              <stop offset="0.5" stopColor="#5b2eff" />
              <stop offset="1" stopColor="#b9e639" />
            </linearGradient>
          </defs>
          {[0, 1, 2].map((k) => (
            <g key={k} className={styles.rings} style={{ "--k": k }}>
              <circle cx="110" cy="470" r="70" />
              <circle cx="890" cy="470" r="70" />
            </g>
          ))}
          <path className={styles.band} d="M120 450 A380 380 0 0 1 880 450" pathLength="1" />
          <rect className={styles.cup} data-side="l" x="62" y="380" width="104" height="170" rx="44" />
          <rect className={styles.cup} data-side="r" x="834" y="380" width="104" height="170" rx="44" />
        </svg>

        <div className={styles.inside}>
          <p className={styles.eyebrow}>{download.eyebrow}</p>
          <h2 id="download-title" className={styles.title}>
            Walk into your next call with <span>MeetFly</span>
          </h2>
        </div>
      </div>

      <div className={styles.under}>
        <p className={styles.lead}>{download.lead}</p>
        <div className={styles.buttons}>
          <OsButton href={mac} label={download.mac} soon={download.soon} icon={<Apple />} primary />
          <OsButton href={windows} label={download.windows} soon={download.soon} icon={<Windows />} />
        </div>
        <ul className={styles.points}>
          {download.points.map((p) => (
            <li key={p}>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M5 12.5l4.5 4.5L19 7.5" />
              </svg>
              {p}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
