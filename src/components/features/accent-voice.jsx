"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { accentVoice as a } from "@/content/features";
import { accent as home } from "@/content/home";
import { SectionHead } from "@/components/section-head/section-head";
import { useOnScreen, useSeen } from "@/components/use-seen";
import styles from "./accent-voice.module.css";

// "Accent voice" on the Features page: a signal path, then a tuner. One sentence travels the
// app's real route across four stations on one rail (You speak → MeetFly writes it down → a native
// voice says it → your call hears it, through MeetFly Microphone); a violet → lime fill and a pulse
// run along the rail as each station lights, with "about 1–1.5 s, start to finish" ruled under it.
// Under the path, the accent bank as a radio dial: 17 English accents as stations on a scale, a
// needle gliding to the one in use (each pass tunes to the next; click a station to pick, which
// stops that). Then the app's other controls as one ruled strip: Voice, Tone, Speed, and Try it
// (Play sends the sentence down the path again). Three ruled facts close it. All from the app.
const AT = [0, 1700, 2900, 4100, 4700]; // when stations 1–4 light, then "arrived"
const PASS = 7600;
const N = home.accents.length;
const words = a.sentence.split(" ");
// A steady pseudo-random waveform (the same on server and client).
const bars = Array.from({ length: 28 }, (_, i) => {
  const x = Math.sin(i * 12.9898 + 4.2) * 43758.5453;
  return Math.round((0.25 + 0.75 * Math.sin((Math.PI * (i + 0.5)) / 28) * (0.4 + 0.6 * (x - Math.floor(x)))) * 100) / 100;
});

export function AccentVoice() {
  const ref = useRef(null);
  const dialRef = useRef(null);
  const seen = useSeen(ref, 0.08); // low: on phones the section is much taller than the screen
  const on = useOnScreen(ref, 0.08);
  const [pick, setPick] = useState(1); // British, as in the During call
  const [auto, setAuto] = useState(true);
  const [voice, setVoice] = useState(0);
  const [tone, setTone] = useState(2);
  const [stage, setStage] = useState(0); // 0 waiting, 1–4 station lit, 5 arrived
  const [pass, setPass] = useState(0);
  const [still, setStill] = useState(false);

  useEffect(() => setStill(window.matchMedia("(prefers-reduced-motion: reduce)").matches), []);

  // One pass: light the stations in turn, then tune to the next accent and go again.
  useEffect(() => {
    if (!seen || !on || still) return undefined;
    const ids = AT.map((t, k) => setTimeout(() => setStage(k + 1), t));
    ids.push(
      setTimeout(() => {
        if (auto) setPick((p) => (p + 1) % N);
        setStage(0);
        setPass((n) => n + 1);
      }, PASS),
    );
    return () => ids.forEach(clearTimeout);
  }, [seen, on, still, auto, pass]);

  // Phones: keep the needle in view inside the dial's own scroller (never scrolls the page).
  useEffect(() => {
    const el = dialRef.current;
    if (!el || el.scrollWidth <= el.clientWidth) return;
    const x = ((pick + 0.5) / N) * el.scrollWidth - el.clientWidth / 2;
    el.scrollTo({ left: Math.max(0, x), behavior: still ? "auto" : "smooth" });
  }, [pick, still]);

  const tune = (k) => {
    setAuto(false);
    setPick(k);
    setStage(0);
    setPass((n) => n + 1);
  };
  const replay = () => {
    setStage(0);
    setPass((n) => n + 1);
  };

  const s = still ? 5 : stage;
  const progress = s <= 1 ? 0 : s >= 5 ? 1 : (s - 1) / 4;
  const name = home.accents[pick];
  const speed = a.speed;

  return (
    <section
      id="accent-voice"
      ref={ref}
      className={styles.section}
      data-in={seen || undefined}
      data-paused={!on || undefined}
      aria-labelledby="accent-voice-title"
    >
      <SectionHead id="accent-voice-title" eyebrow={a.eyebrow} title={a.title} lead={a.lead} />

      {/* The signal path */}
      <div className={styles.path} style={{ "--p": progress }}>
        <div className={styles.rail} aria-hidden="true">
          <span className={styles.fill} />
          <span className={styles.pulse} />
        </div>

        <ol className={styles.stations}>
          {a.stations.map((st, k) => (
            <li key={`${st.id}-${pass}`} className={styles.station} data-kind={st.id} data-on={s >= k + 1 || undefined} data-now={s === k + 1 || undefined}>
              <span className={styles.node} aria-hidden="true" />
              <span className={styles.num}>{String(k + 1).padStart(2, "0")}</span>
              <b className={styles.stTitle}>{st.title}</b>
              <span className={styles.stHint}>{st.hint}</span>

              <div className={styles.show}>
                {st.id === "speak" && (
                  <>
                    <span className={styles.meter} aria-hidden="true">
                      {[0, 1, 2, 3, 4].map((b) => (
                        <i key={b} style={{ "--b": b }} />
                      ))}
                    </span>
                    <p className={styles.said}>
                      {words.map((w, i) => (
                        <span key={i} style={{ "--w": i }}>
                          {w}{" "}
                        </span>
                      ))}
                    </p>
                  </>
                )}
                {st.id === "write" && (
                  <p className={styles.text} aria-label={a.sentence}>
                    {words.map((w, i) => (
                      <span key={i} style={{ "--w": i }} aria-hidden="true">
                        {w}{" "}
                      </span>
                    ))}
                  </p>
                )}
                {st.id === "voice" && (
                  <div className={styles.speaker}>
                    <b key={pick} aria-live="polite">
                      {name}
                    </b>
                    <span>
                      {a.voices[voice]} · {a.tones[tone]} · {speed.value.toFixed(2)}×
                    </span>
                  </div>
                )}
                {st.id === "call" && (
                  <div className={styles.call}>
                    <p className={styles.micRow}>
                      <span>{a.micLabel}</span>
                      <b>
                        {a.mic}
                        <i aria-hidden="true">✓</i>
                      </b>
                    </p>
                    <span className={styles.wave} aria-hidden="true">
                      {bars.map((h, i) => (
                        <i key={i} style={{ "--h": h, "--i": i }} />
                      ))}
                    </span>
                    <p className={styles.apps}>{a.apps.join(" · ")}</p>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ol>

        <p className={styles.lag}>
          <span>0 s</span>
          <i aria-hidden="true" />
          <span>{a.lag}</span>
        </p>
        <p className={styles.honest}>{a.honest}</p>
      </div>

      {/* The accent bank, as a radio dial */}
      <div className={styles.bank}>
        <p className={styles.bankHead}>
          <b>{a.dialLabel}</b>
          <span>{a.dialHint}</span>
        </p>
        <div ref={dialRef} className={styles.dialScroll}>
          <div className={styles.dial} role="radiogroup" aria-label={a.dialLabel} style={{ "--k": pick, "--n": N }}>
            <span className={styles.scale} aria-hidden="true" />
            <span className={styles.needle} aria-hidden="true" />
            {home.accents.map((acc, k) => (
              <button
                key={acc}
                type="button"
                role="radio"
                aria-checked={k === pick}
                className={styles.station2}
                data-up={k % 2 === 0 || undefined}
                style={{ "--x": (k + 0.5) / N }}
                onClick={() => tune(k)}
              >
                <span>{acc}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* The other controls */}
      <div className={styles.controls}>
        <div className={styles.ctl}>
          <span className={styles.ctlLabel}>{a.voiceLabel}</span>
          <div className={styles.keys} role="radiogroup" aria-label={a.voiceLabel}>
            {a.voices.map((v, i) => (
              <button key={v} type="button" role="radio" aria-checked={voice === i} onClick={() => setVoice(i)}>
                {v}
              </button>
            ))}
          </div>
        </div>
        <div className={styles.ctl}>
          <span className={styles.ctlLabel}>{a.toneLabel}</span>
          <div className={styles.keys} role="radiogroup" aria-label={a.toneLabel}>
            {a.tones.map((t, i) => (
              <button key={t} type="button" role="radio" aria-checked={tone === i} onClick={() => setTone(i)}>
                {t}
              </button>
            ))}
          </div>
        </div>
        <div className={styles.ctl}>
          <span className={styles.ctlLabel}>
            {a.speedLabel} <b>{speed.value.toFixed(2)}×</b>
          </span>
          <span className={styles.fader} style={{ "--v": (speed.value - speed.min) / (speed.max - speed.min) }} aria-hidden="true">
            <i />
          </span>
          <span className={styles.faderScale} aria-hidden="true">
            <span>{speed.min}×</span>
            <span>{speed.max}×</span>
          </span>
        </div>
        <div className={styles.ctl}>
          <span className={styles.ctlLabel}>{a.tryLabel}</span>
          <p className={styles.tryText}>{a.tryText}</p>
          <button type="button" className={styles.play} onClick={replay} disabled={still || undefined}>
            <svg viewBox="0 0 16 16" aria-hidden="true">
              <path d="M5 3.5v9l7-4.5z" />
            </svg>
            Play
          </button>
        </div>
      </div>

      <ul className={styles.facts}>
        {a.facts.map((f, k) => (
          <li key={f.title} style={{ "--k": k }}>
            <span>{String(k + 1).padStart(2, "0")}</span>
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
