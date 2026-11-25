"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { accent as a } from "@/content/home";
import { SectionHead } from "@/components/section-head/section-head";
import { useOnScreen, useSeen } from "@/components/use-seen";
import styles from "./accent.module.css";

// "Accent voice": a two-track studio. A ruler of seconds (0–6 s) over two tracks on one timeline:
// "You say" (your microphone; a grey waveform with your words under it) and "They hear" (MeetFly
// Microphone; the same words in a violet → lime waveform, shifted right to show the real delay,
// with a bracket "about 1–1.5 s behind"). A playhead sweeps both tracks in real time, lighting the
// waveforms as it passes. Over the tracks, the readout: the accent (big), voice (Feminine /
// Masculine) and tone. Each pass moves to the next accent in the bank of 17 (click to pick; that
// stops the cycling). Under it three facts: set up once, timing, plans. All of it is what the app does.
const PASS_MS = 6000; // one sweep = the 6 s on the ruler
const GAP_MS = 900;
const BARS = 96;

// A steady pseudo-random waveform (the same on server and client).
const wave = (seed) =>
  Array.from({ length: BARS }, (_, i) => {
    const x = Math.sin(i * 12.9898 + seed * 78.233) * 43758.5453;
    const r = x - Math.floor(x);
    const env = Math.sin((Math.PI * (i + 0.5)) / BARS); // louder in the middle of the sentence
    // Rounded so the server and the browser print the same number.
    return Math.round((0.18 + 0.82 * env * (0.35 + 0.65 * r)) * 100) / 100;
  });
const youWave = wave(1);
const theyWave = wave(2);

// Words share the speech span by length.
const total = a.sentence.reduce((n, w) => n + w.length + 1, 0);

function Track({ bars, kind }) {
  return (
    <div className={styles.wave} data-kind={kind} aria-hidden="true">
      {[0, 1].map((layer) => (
        <span key={layer} className={layer ? styles.lit : styles.dim}>
          {bars.map((h, i) => (
            <i key={i} style={{ "--h": h }} />
          ))}
        </span>
      ))}
    </div>
  );
}

function Words({ kind }) {
  return (
    <p className={styles.words} data-kind={kind}>
      {[0, 1].map((layer) => (
        <span key={layer} className={layer ? styles.lit : styles.dim} aria-hidden={layer ? "true" : undefined}>
          {a.sentence.map((w, i) => (
            <span key={i} style={{ flexGrow: w.length + 1 }}>
              {w}
            </span>
          ))}
        </span>
      ))}
    </p>
  );
}

export function Accent() {
  const ref = useRef(null);
  const seen = useSeen(ref, 0.2);
  const on = useOnScreen(ref, 0.2);
  const [pick, setPick] = useState(1); // British first
  const [voice, setVoice] = useState(0);
  const [tone, setTone] = useState(0);
  const [auto, setAuto] = useState(true);
  const [pass, setPass] = useState(0); // restarts the sweep
  const [still, setStill] = useState(false);

  useEffect(() => setStill(window.matchMedia("(prefers-reduced-motion: reduce)").matches), []);

  // After each sweep, the next accent (and a new voice now and then).
  useEffect(() => {
    if (!seen || !on || still) return undefined;
    const id = setTimeout(() => {
      if (auto) {
        setPick((p) => (p + 1) % a.accents.length);
        setVoice((v) => (pass % 2 ? 1 - v : v));
      }
      setPass((n) => n + 1);
    }, PASS_MS + GAP_MS);
    return () => clearTimeout(id);
  }, [seen, on, still, auto, pass]);

  const choose = (i) => {
    setAuto(false);
    setPick(i);
    setPass((n) => n + 1);
  };

  return (
    <section
      id="accent"
      ref={ref}
      className={styles.section}
      data-in={seen || undefined}
      data-paused={!on || undefined}
      aria-labelledby="accent-title"
    >
      <SectionHead id="accent-title" eyebrow={a.eyebrow} title={a.title} lead={a.lead} />

      <div className={styles.studio} style={{ "--pass": `${PASS_MS}ms` }}>
        {/* Readout */}
        <div className={styles.readout}>
          <div className={styles.now}>
            <span className={styles.label}>{a.accentLabel}</span>
            <b key={pick} aria-live="polite">
              {a.accents[pick]}
            </b>
          </div>
          <div className={styles.control}>
            <span className={styles.label}>{a.voiceLabel}</span>
            <div className={styles.seg} role="radiogroup" aria-label={a.voiceLabel}>
              {a.voices.map((v, i) => (
                <button
                  key={v}
                  type="button"
                  role="radio"
                  aria-checked={voice === i}
                  onClick={() => {
                    setAuto(false);
                    setVoice(i);
                  }}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>
          <div className={styles.control}>
            <span className={styles.label}>{a.toneLabel}</span>
            <div className={styles.seg} role="radiogroup" aria-label={a.toneLabel}>
              {a.tones.map((t, i) => (
                <button
                  key={t}
                  type="button"
                  role="radio"
                  aria-checked={tone === i}
                  onClick={() => {
                    setAuto(false);
                    setTone(i);
                  }}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className={styles.timeline} key={pass} data-play={(seen && !still) || undefined}>
          <div className={styles.ruler} aria-hidden="true">
            <span className={styles.rulerHead} />
            <div className={styles.ticks}>
              {Array.from({ length: 7 }, (_, s) => (
                <span key={s} style={{ "--x": s / 6 }}>
                  {s} s
                </span>
              ))}
            </div>
          </div>

          <div className={styles.track} data-kind="you">
            <div className={styles.trackHead}>
              <b>{a.you.title}</b>
              <span>{a.you.hint}</span>
            </div>
            <div className={styles.lane}>
              <div className={styles.clip} data-kind="you">
                <Track bars={youWave} kind="you" />
                <Words kind="you" />
              </div>
            </div>
          </div>

          <div className={styles.track} data-kind="they">
            <div className={styles.trackHead}>
              <b>{a.they.title}</b>
              <span>{a.they.hint}</span>
              <em key={`${pick}-${voice}-${tone}`}>
                {a.accents[pick]} · {a.voices[voice]} · {a.tones[tone]}
              </em>
            </div>
            <div className={styles.lane}>
              <span className={styles.lag} aria-hidden="true">
                <i />
                {a.lag}
              </span>
              <div className={styles.clip} data-kind="they">
                <Track bars={theyWave} kind="they" />
                <Words kind="they" />
              </div>
            </div>
          </div>

          {/* The playhead over both lanes */}
          <span className={styles.playhead} aria-hidden="true" />
        </div>

        {/* The accent bank */}
        <div className={styles.bank}>
          <span className={styles.label}>{a.bankLabel}</span>
          <div className={styles.chips} role="radiogroup" aria-label={a.accentLabel}>
            {a.accents.map((name, i) => (
              <button key={name} type="button" role="radio" aria-checked={pick === i} onClick={() => choose(i)}>
                {name}
              </button>
            ))}
          </div>
        </div>
      </div>

      <ul className={styles.facts}>
        {a.facts.map((f, i) => (
          <li key={f.title} style={{ "--i": i }}>
            <span className={styles.factNum}>{String(i + 1).padStart(2, "0")}</span>
            <b>{f.title}</b>
            <p>{f.text}</p>
            {f.link && (
              <Link href={f.link.href} className={styles.factLink}>
                {f.link.label} →
              </Link>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
