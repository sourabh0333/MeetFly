"use client";

import { useEffect, useRef, useState } from "react";
import { downloadPage } from "@/content/download";
import { siteConfig } from "@/config/site";
import { DecodeText } from "@/components/hero/decode-text";
import head from "@/components/features/features-hero.module.css";
import styles from "./download-hero.module.css";

// The Download page hero. The same centred headline as the other page heroes (shared styles), then
// the platform split: macOS | Windows across the full grid with a glowing vertical rule and an "or"
// between them. Each side fills its half: logo (tilting gently towards the pointer) + name + line,
// a ruled spec sheet (runs on, installer, needs, version) and a full-width download button
// ("Coming soon" while siteConfig.downloads has no link). The visitor's own system is detected and lit ("For this
// computer"). Under it, one ruled line of facts.
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

function detect() {
  const ua = (navigator.userAgentData?.platform || navigator.platform || navigator.userAgent || "").toLowerCase();
  if (ua.includes("mac")) return "mac";
  if (ua.includes("win")) return "windows";
  return null;
}

function Side({ p, mine }) {
  const ref = useRef(null);
  const href = siteConfig.downloads[p.id];
  const onMove = (e) => {
    if (e.pointerType !== "mouse") return;
    const r = ref.current.getBoundingClientRect();
    ref.current.style.setProperty("--rx", `${(((e.clientY - r.top) / r.height - 0.5) * -10).toFixed(2)}deg`);
    ref.current.style.setProperty("--ry", `${(((e.clientX - r.left) / r.width - 0.5) * 14).toFixed(2)}deg`);
  };
  const onLeave = () => {
    ref.current.style.setProperty("--rx", "0deg");
    ref.current.style.setProperty("--ry", "0deg");
  };
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
  return (
    <div ref={ref} className={styles.side} data-mine={mine || undefined} data-os={p.id} onPointerMove={onMove} onPointerLeave={onLeave}>
      <div className={styles.top}>
        <span className={styles.logo} aria-hidden="true">
          {LOGO[p.id]}
        </span>
        <div>
          <h2 className={styles.name}>{p.name}</h2>
          <p className={styles.line}>{p.line}</p>
        </div>
        {mine && (
          <span className={styles.forYou}>
            <i aria-hidden="true" />
            {downloadPage.forYou}
          </span>
        )}
      </div>
      <dl className={styles.specs}>
        {[...p.specs, [downloadPage.versionLabel, downloadPage.version]].map(([k, v], i) => (
          <div key={k} style={{ "--k": i }}>
            <dt>{k}</dt>
            <dd>{v}</dd>
          </div>
        ))}
      </dl>
      {href ? (
        <a className={styles.btn} href={href}>
          {inner}
        </a>
      ) : (
        <button type="button" className={styles.btn} aria-disabled="true">
          {inner}
        </button>
      )}
    </div>
  );
}

export function DownloadHero() {
  const [mine, setMine] = useState(null);
  useEffect(() => setMine(detect()), []);
  // The visitor's own system goes first.
  const order = mine === "windows" ? [...downloadPage.platforms].reverse() : downloadPage.platforms;

  return (
    <section id="download-top" className={head.hero} aria-labelledby="dl-title">
      <div className={head.bg} aria-hidden="true">
        <span className={head.glowA} />
        <span className={head.glowB} />
      </div>

      <div className={head.head}>
        <p className={head.eyebrow}>
          <span className={head.tag}>
            <i aria-hidden="true" />
            {downloadPage.eyebrow.tag}
          </span>
          {downloadPage.eyebrow.text}
        </p>
        <h1 id="dl-title" className={head.title}>
          <span className={head.sr}>
            {downloadPage.title.top} {downloadPage.title.prefix} {downloadPage.title.mark}
          </span>
          <span aria-hidden="true" className={head.line1}>
            <DecodeText text={downloadPage.title.top} />
          </span>
          <span aria-hidden="true" className={head.line2}>
            {downloadPage.title.prefix}{" "}
            <span className={head.mark}>
              {downloadPage.title.mark}
              <svg viewBox="0 0 300 24" preserveAspectRatio="none" aria-hidden="true">
                <path pathLength="1" d="M4 16 C 60 6, 120 20, 180 11 S 270 8, 296 12" />
              </svg>
            </span>
          </span>
        </h1>
        <p className={head.lead}>{downloadPage.lead}</p>
      </div>

      <div className={styles.wrap}>
        <div className={styles.split}>
          <Side p={order[0]} mine={mine === order[0].id} />
          <span className={styles.or} aria-hidden="true">
            {downloadPage.or}
          </span>
          <Side p={order[1]} mine={mine === order[1].id} />
        </div>
        <ul className={styles.facts}>
          {downloadPage.facts.map((f) => (
            <li key={f}>
              <svg viewBox="0 0 16 16" aria-hidden="true">
                <path d="M3.5 8.5l3 3 6-7" />
              </svg>
              {f}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
