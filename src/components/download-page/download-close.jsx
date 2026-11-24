"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { downloadClose, downloadPage } from "@/content/download";
import { siteConfig } from "@/config/site";
import { useSeen } from "@/components/use-seen";
import styles from "./download-close.module.css";

// The Download page's close. Left: "Your next call / starts here." with both download buttons
// (the visitor's system first and lit) and a link to the FAQ. Right: a big "download" ring that
// fills as you scroll towards it, counting up to 100%, then turns into a tick: "Ready to install".
// Under it, four quick answers across the grid, each with a rule that draws in.
function detect() {
  const ua = (navigator.userAgentData?.platform || navigator.platform || navigator.userAgent || "").toLowerCase();
  if (ua.includes("mac")) return "mac";
  if (ua.includes("win")) return "windows";
  return null;
}

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
const LOGO = { mac: <Apple />, windows: <Windows /> };
const TICKS = 60;

function Button({ p, mine }) {
  const href = siteConfig.downloads[p.id];
  const inner = (
    <>
      {LOGO[p.id]}
      <span>
        {p.button}
        {!href && <small>{downloadPage.soon}</small>}
      </span>
      <svg className={styles.arrow} viewBox="0 0 16 16" aria-hidden="true">
        <path d="M8 2.5v8M4.5 7l3.5 3.5L11.5 7M3 13.5h10" />
      </svg>
    </>
  );
  return href ? (
    <a className={styles.btn} data-mine={mine || undefined} href={href}>
      {inner}
    </a>
  ) : (
    <button type="button" className={styles.btn} data-mine={mine || undefined} aria-disabled="true">
      {inner}
    </button>
  );
}

export function DownloadClose() {
  const ref = useRef(null);
  const ringRef = useRef(null);
  const pctRef = useRef(null);
  const answersRef = useRef(null);
  const answersIn = useSeen(answersRef, 0.3);
  const [mine, setMine] = useState(null);
  const [done, setDone] = useState(false);
  const c = downloadClose;

  useEffect(() => setMine(detect()), []);

  // The ring fills as it rises into view: 0% when its top meets the bottom of the screen,
  // 100% once its middle is a little above the screen's middle.
  useEffect(() => {
    const ring = ringRef.current;
    const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let last = -1;
    const paint = () => {
      raf = 0;
      const r = ring.getBoundingClientRect();
      const vh = innerHeight;
      const p = still ? 1 : Math.min(1, Math.max(0, (vh - r.top) / (vh * 0.55 + r.height * 0.5)));
      const n = Math.round(p * 100);
      if (n === last) return;
      last = n;
      ring.style.setProperty("--p", (n / 100).toFixed(2));
      if (pctRef.current) pctRef.current.textContent = `${n}%`;
      setDone(n >= 100);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(paint);
    };
    paint();
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", onScroll);
    return () => {
      removeEventListener("scroll", onScroll);
      removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const order = mine === "windows" ? [...downloadPage.platforms].reverse() : downloadPage.platforms;

  return (
    <section ref={ref} id="download-end" className={styles.section} data-done={done || undefined} aria-labelledby="dl-end-title">
      <div className={styles.wrap}>
        <div className={styles.top}>
          <div className={styles.copy}>
            <p className={styles.eyebrow}>
              <i aria-hidden="true" />
              {c.eyebrow}
            </p>
            <h2 id="dl-end-title" className={styles.title}>
              <span>{c.title.top}</span>
              <span className={styles.mark}>{c.title.mark}</span>
            </h2>
            <p className={styles.lead}>{c.lead}</p>
            <div className={styles.buttons}>
              {order.map((p) => (
                <Button key={p.id} p={p} mine={mine === p.id} />
              ))}
            </div>
            <p className={styles.meta}>
              <span>v{downloadPage.version}</span>
              <span>{c.needs}</span>
              <Link href={c.faq.href}>
                {c.faq.label}
                <svg viewBox="0 0 16 16" aria-hidden="true">
                  <path d="M3 8h10M9 4l4 4-4 4" />
                </svg>
              </Link>
            </p>
          </div>

          <div ref={ringRef} className={styles.ring} data-done={done || undefined} aria-hidden="true">
            <svg className={styles.ticks} viewBox="0 0 200 200">
              {Array.from({ length: TICKS }, (_, k) => (
                <line key={k} x1="100" y1="4" x2="100" y2={k % 5 ? 9 : 13} transform={`rotate(${k * 6} 100 100)`} />
              ))}
            </svg>
            <svg className={styles.arc} viewBox="0 0 200 200">
              <defs>
                <linearGradient id="dl-end-grad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="#5b2eff" />
                  <stop offset="1" stopColor="#a3cf1f" />
                </linearGradient>
              </defs>
              <circle className={styles.track} cx="100" cy="100" r="82" />
              <circle className={styles.fill} cx="100" cy="100" r="82" pathLength="100" stroke="url(#dl-end-grad)" />
            </svg>
            <div className={styles.core}>
              <img src="/brand/icon.svg" alt="" width="64" height="64" />
              <b>
                {c.ring.name} {downloadPage.version}
              </b>
              <span className={styles.state}>
                <span className={styles.busy}>
                  {c.ring.busy} <em ref={pctRef}>0%</em>
                </span>
                <span className={styles.ready}>
                  <svg viewBox="0 0 16 16">
                    <path d="M3.5 8.5l3 3 6-7" />
                  </svg>
                  {c.ring.done}
                </span>
              </span>
            </div>
          </div>
        </div>

        <div ref={answersRef} className={styles.answers} data-in={answersIn || undefined}>
          <h3 className={styles.answersTitle}>{c.answersTitle}</h3>
          <ol>
            {c.answers.map((x, i) => (
              <li key={x.q} style={{ "--i": i }}>
                <span className={styles.n}>{String(i + 1).padStart(2, "0")}</span>
                <h4>{x.q}</h4>
                <p>{x.a}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
