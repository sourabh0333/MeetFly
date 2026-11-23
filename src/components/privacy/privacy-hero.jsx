"use client";

import { useEffect, useRef, useState } from "react";
import { orbit, privacyPage } from "@/content/privacy";
import { DecodeText } from "@/components/hero/decode-text";
import { MagneticLink } from "@/components/hero/magnetic-link";
import { useOnScreen } from "@/components/use-seen";
import head from "@/components/features/features-hero.module.css";
import styles from "./privacy-hero.module.css";

// The Privacy hero. The same centred headline as the other page heroes (shared styles), then one
// visual: your computer as a glowing circle with your meetings inside a dashed ring (its edge), and
// the only three places anything goes outside it: the speech service on one side, MeetFly's server
// and then the AI service on the other. Particles travel out along curved paths: audio straight to
// the speech service; words through the server to the AI; account and error reports to the server.
// Four chips under it pick a flow (they cycle on their own): the picked path lights, others dim.
// Two layouts of the same map: wide, and tall for phones.
const LAYOUTS = {
  wide: { w: 1200, h: 470, c: [600, 235], r: [96, 150, 190], chips: [-118, -62, 62, 118], speech: [190, 235], server: [880, 110], ai: [985, 360], label: { speech: "left", server: "right", ai: "right" } },
  tall: { w: 400, h: 700, c: [200, 190], r: [70, 112, 140], chips: [-150, -30, 30, 150], speech: [95, 430], server: [305, 430], ai: [200, 610], label: { speech: "below", server: "below", ai: "below" } },
};
const STEP_MS = 3400;

// A point on the edge ring towards a target.
const towards = (L, [tx, ty]) => {
  const [cx, cy] = L.c;
  const a = Math.atan2(ty - cy, tx - cx);
  return [cx + Math.cos(a) * L.r[2], cy + Math.sin(a) * L.r[2]];
};
const curve = ([x0, y0], [x1, y1], bend = 0.18) => {
  const mx = (x0 + x1) / 2;
  const my = (y0 + y1) / 2;
  const dx = x1 - x0;
  const dy = y1 - y0;
  return `M ${x0.toFixed(1)} ${y0.toFixed(1)} Q ${(mx - dy * bend).toFixed(1)} ${(my + dx * bend).toFixed(1)} ${x1.toFixed(1)} ${y1.toFixed(1)}`;
};

function Map({ L, focus, id }) {
  const a = towards(L, L.speech);
  const s = towards(L, L.server);
  const m = towards(L, [L.server[0] - 30, L.server[1] + 40]);
  const paths = {
    audio: curve(a, L.speech, -0.12),
    words1: curve(s, L.server, 0.14),
    words2: curve(L.server, L.ai, 0.22),
    meta: curve(m, L.server, -0.1),
  };
  const [cx, cy] = L.c;
  const chipAngles = L.chips;
  const place = (k, at) => {
    const p = orbit.places[k];
    const side = L.label[k];
    const tx = side === "left" ? at[0] - 22 : side === "right" ? at[0] + 22 : at[0];
    const ty = side === "below" ? at[1] + 34 : at[1] - 12;
    const anchor = side === "left" ? "end" : side === "right" ? "start" : "middle";
    return (
      <g key={k} className={styles.place} data-place={k}>
        <circle className={styles.halo} cx={at[0]} cy={at[1]} r="22" />
        <circle className={styles.dot} cx={at[0]} cy={at[1]} r="9" />
        <text x={tx} y={ty} textAnchor={anchor}>
          <tspan className={styles.pName}>{p.name}</tspan>
          <tspan className={styles.pBy} x={tx} dy="22">
            {p.by}
          </tspan>
          <tspan className={styles.pStatus} x={tx} dy="22">
            {p.status}
          </tspan>
        </text>
      </g>
    );
  };
  const flow = (fid, d, kind, n = 3, dur = 2.6) => (
    <g key={`${fid}-${kind}`} className={styles.flow} data-flow={fid} data-kind={kind}>
      <path id={`${id}-${fid}-${kind}`} className={styles.path} d={d} />
      {Array.from({ length: n }, (_, k) => (
        <circle key={k} className={styles.particle} r="4.5">
          <animateMotion dur={`${dur}s`} begin={`${(k * dur) / n}s`} repeatCount="indefinite" rotate="auto">
            <mpath href={`#${id}-${fid}-${kind}`} />
          </animateMotion>
        </circle>
      ))}
    </g>
  );
  return (
    <svg className={styles.svg} viewBox={`0 0 ${L.w} ${L.h}`} data-layout={L.w < 600 ? "tall" : "wide"} data-focus={focus} role="img" aria-label={orbit.flows.map((f) => `${f.label}: ${f.line}`).join(". ")}>
      <defs>
        <radialGradient id={`${id}-core`}>
          <stop offset="0" stopColor="#8f74ff" stopOpacity="0.35" />
          <stop offset="1" stopColor="#5b2eff" stopOpacity="0.06" />
        </radialGradient>
      </defs>

      {/* The flows out of your computer. */}
      {flow("audio", paths.audio, "send")}
      {flow("words", paths.words1, "pass", 3, 2.2)}
      {flow("words", paths.words2, "send", 2, 2)}
      {flow("meta", paths.meta, "keep", 2, 3.2)}

      {/* Your computer. */}
      <g className={styles.core} data-flow="meetings">
        <circle className={styles.edgeRing} cx={cx} cy={cy} r={L.r[2]} />
        <circle className={styles.innerRing} cx={cx} cy={cy} r={L.r[1]} />
        <circle cx={cx} cy={cy} r={L.r[0]} fill={`url(#${id}-core)`} />
        <circle className={styles.coreDot} cx={cx} cy={cy} r={L.r[0] * 0.86} />
        <text x={cx} y={cy - 4} textAnchor="middle" className={styles.coreName}>
          {orbit.computer}
        </text>
        <text x={cx} y={cy + 18} textAnchor="middle" className={styles.coreSub}>
          {orbit.inside}
        </text>
        {orbit.items.map((t, k) => {
          const ang = (chipAngles[k] * Math.PI) / 180;
          const x = cx + Math.cos(ang) * L.r[1];
          const y = cy + Math.sin(ang) * L.r[1];
          return (
            <g key={t} className={styles.item} style={{ "--k": k }}>
              <rect x={x - (t.length * 4.1 + 14)} y={y - 13} width={t.length * 8.2 + 28} height="26" rx="13" />
              <text x={x} y={y + 4.5} textAnchor="middle">
                {t}
              </text>
            </g>
          );
        })}
        <text className={styles.edgeLabel} textAnchor="middle">
          <textPath href={`#${id}-edge`} startOffset="25%">
            {orbit.edge}
          </textPath>
        </text>
        <path id={`${id}-edge`} d={`M ${cx - L.r[2] - 14} ${cy} A ${L.r[2] + 14} ${L.r[2] + 14} 0 0 1 ${cx + L.r[2] + 14} ${cy}`} fill="none" />
      </g>

      {place("speech", L.speech)}
      {place("server", L.server)}
      {place("ai", L.ai)}
    </svg>
  );
}

export function PrivacyHero() {
  const mapRef = useRef(null);
  const on = useOnScreen(mapRef, 0.2);
  const [active, setActive] = useState(0);
  const touched = useRef(false);

  useEffect(() => {
    if (!on || touched.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    const t = setInterval(() => !touched.current && setActive((a) => (a + 1) % orbit.flows.length), STEP_MS);
    return () => clearInterval(t);
  }, [on]);

  const pick = (i) => {
    touched.current = true;
    setActive(i);
  };
  const focus = orbit.flows[active].id;

  return (
    <section id="privacy-top" className={head.hero} aria-labelledby="privacy-title">
      <div className={head.bg} aria-hidden="true">
        <span className={head.glowA} />
        <span className={head.glowB} />
      </div>

      <div className={head.head}>
        <p className={head.eyebrow}>
          <span className={head.tag}>
            <i aria-hidden="true" />
            {privacyPage.eyebrow.tag}
          </span>
          {privacyPage.eyebrow.text}
        </p>
        <h1 id="privacy-title" className={head.title}>
          <span className={head.sr}>
            {privacyPage.title.top} {privacyPage.title.prefix} {privacyPage.title.mark}
          </span>
          <span aria-hidden="true" className={head.line1}>
            <DecodeText text={privacyPage.title.top} />
          </span>
          <span aria-hidden="true" className={head.line2}>
            {privacyPage.title.prefix}{" "}
            <span className={head.mark}>
              {privacyPage.title.mark}
              <svg viewBox="0 0 300 24" preserveAspectRatio="none" aria-hidden="true">
                <path pathLength="1" d="M4 16 C 60 6, 120 20, 180 11 S 270 8, 296 12" />
              </svg>
            </span>
          </span>
        </h1>
        <p className={head.lead}>{privacyPage.lead}</p>
        <div className={head.actions}>
          <MagneticLink className={head.primary} href={privacyPage.primary.href}>
            <span>{privacyPage.primary.label}</span>
            <svg viewBox="0 0 16 16" aria-hidden="true">
              <path d="M8 2.5v8M4.5 7l3.5 3.5L11.5 7M3 13.5h10" />
            </svg>
          </MagneticLink>
          <a className={head.secondary} href={privacyPage.secondary.href}>
            <span className={head.play} aria-hidden="true">
              <svg viewBox="0 0 16 16">
                <path d="M4 8h8M8.5 4.5L12 8l-3.5 3.5" />
              </svg>
            </span>
            {privacyPage.secondary.label}
          </a>
        </div>
      </div>

      {/* The map. */}
      <div ref={mapRef} className={styles.wrap}>
        <div className={styles.stage}>
          <div className={styles.wide}>
            <Map L={LAYOUTS.wide} focus={focus} id="pvw" />
          </div>
          <div className={styles.tall}>
            <Map L={LAYOUTS.tall} focus={focus} id="pvt" />
          </div>
        </div>

        <ul className={styles.chips} role="tablist" aria-label={privacyPage.mapLabel}>
          {orbit.flows.map((f, i) => (
            <li key={f.id}>
              <button
                type="button"
                role="tab"
                aria-selected={i === active}
                data-flow={f.id}
                onPointerEnter={(e) => e.pointerType === "mouse" && pick(i)}
                onFocus={() => pick(i)}
                onClick={() => pick(i)}
              >
                <i aria-hidden="true" />
                <b>{f.label}</b>
                <span>{f.line}</span>
              </button>
            </li>
          ))}
        </ul>
        <p className={styles.note}>{privacyPage.note}</p>
      </div>
    </section>
  );
}
