"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "@/app/not-found.module.css";

// The "call ended" window on the 404: a status bar (red "Call ended" and a short call timer that
// stops), the participant tile showing the address that was asked for "left the meeting", a
// waveform that collapses to a flat line, the headline, and call-control buttons.
const BARS = 28;
const bars = Array.from({ length: BARS }, (_, i) => {
  const x = Math.sin(i * 12.9898 + 3.3) * 43758.5453;
  const r = x - Math.floor(x);
  const env = Math.sin((Math.PI * (i + 0.5)) / BARS);
  return Math.round((0.25 + 0.75 * env * (0.4 + 0.6 * r)) * 100) / 100;
});

export function CallEnded() {
  const path = usePathname() || "/";
  const [secs, setSecs] = useState(0);

  // The call ran for a few seconds, then ended.
  useEffect(() => {
    let n = 0;
    const id = setInterval(() => {
      n += 1;
      setSecs(n);
      if (n >= 4) clearInterval(id);
    }, 260);
    return () => clearInterval(id);
  }, []);

  return (
    <div className={styles.window}>
      <div className={styles.bar}>
        <span className={styles.ended}>
          <i aria-hidden="true" />
          Call ended
        </span>
        <span className={styles.timer} aria-hidden="true">
          00:00:{String(secs).padStart(2, "0")}
        </span>
      </div>

      <div className={styles.tile}>
        <span className={styles.avatar} aria-hidden="true">
          <svg viewBox="0 0 24 24">
            <path d="M7 3.5h7l4 4v13H7z" />
            <path d="M14 3.5v4h4M10 13l4 4M14 13l-4 4" />
          </svg>
        </span>
        <span className={styles.who}>
          <code>{path.length > 34 ? `${path.slice(0, 33)}…` : path}</code>
          <span>left the meeting</span>
        </span>
        <span className={styles.flatline} aria-hidden="true">
          {bars.map((h, i) => (
            <i key={i} style={{ "--h": h, "--i": i }} />
          ))}
        </span>
      </div>

      <h1 id="nf-title" className={styles.title}>
        This page <mark>left the call.</mark>
      </h1>
      <p className={styles.lead}>It may have moved, or there’s a typo in the link. Let’s get you somewhere useful.</p>

      <div className={styles.controls}>
        <Link href="/" className={styles.rejoin}>
          <svg viewBox="0 0 16 16" aria-hidden="true">
            <path d="M2.5 7.5 8 3l5.5 4.5V13H9.8V9.8H6.2V13H2.5z" />
          </svg>
          Back to home
        </Link>
        <Link href="/download" className={styles.ctl}>
          <svg viewBox="0 0 16 16" aria-hidden="true">
            <path d="M8 2.5v8M4.5 7l3.5 3.5L11.5 7M3 13.5h10" />
          </svg>
          Download
        </Link>
        <Link href="/guides" className={styles.ctl}>
          <svg viewBox="0 0 16 16" aria-hidden="true">
            <path d="M3 4.5h10M3 8h10M3 11.5h6" />
          </svg>
          Guides
        </Link>
      </div>
    </div>
  );
}
