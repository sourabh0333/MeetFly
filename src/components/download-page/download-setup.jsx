"use client";

import { useEffect, useRef, useState } from "react";
import { setup } from "@/content/download";
import { SectionHead } from "@/components/section-head/section-head";
import { useOnScreen } from "@/components/use-seen";
import styles from "./download-setup.module.css";

// "From download to your first call": a guided walkthrough of the app's first run.
// Top: a ruled meta line (about a minute · a progress meter per step · "n of 6 done") and a
// Mac / Windows switch (preset to the visitor's system). Middle: the step on the left (a giant
// gradient numeral that rolls, title, text, a tip, back / next) and on the right a live mock of
// the app's own setup screen for that step (the .dmg drag or the Windows installer, Test mic with
// a level meter, the sign-in screen with its trial offer, the sound permission + "MeetFly can hear
// it.", the optional accent, how every meeting works). Bottom: a full-width track, one station per step; the line fills towards the next station while you watch,
// then moves on by itself (a timer, so it also runs with reduced motion). It waits only while off
// screen; stations, arrows and keys jump.
const STEP_MS = 6500;

function detect() {
  const ua = (navigator.userAgentData?.platform || navigator.platform || navigator.userAgent || "").toLowerCase();
  return ua.includes("mac") ? "mac" : "windows";
}

const Check = () => (
  <svg viewBox="0 0 16 16" aria-hidden="true">
    <path d="M3.5 8.5l3 3 6-7" />
  </svg>
);

const Icon = () => <img src="/brand/icon.svg" alt="" width="56" height="56" />;

// Each mock is rendered fresh (keyed by step and system) so its little animation replays.
function mock(step, os) {
  const m = step.mock;
  if (step.id === "install" && os === "mac")
    return (
      <div className={styles.dmg}>
        <span className={styles.dmgApp}>
          <Icon />
          <b>{m.mac.app}</b>
        </span>
        <span className={styles.dmgArrow} aria-hidden="true">
          <i />
          <small>{m.mac.hint}</small>
        </span>
        <span className={styles.dmgFolder}>
          <svg viewBox="0 0 48 40" aria-hidden="true">
            <path d="M2 8a4 4 0 0 1 4-4h12l5 5h19a4 4 0 0 1 4 4v21a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4z" />
            <path d="M17 18h14l-7 11z" className={styles.dmgA} />
          </svg>
          <b>{m.mac.folder}</b>
        </span>
        <span className={styles.dmgGhost} aria-hidden="true">
          <Icon />
        </span>
      </div>
    );
  if (step.id === "install")
    return (
      <div className={styles.exe}>
        <Icon />
        <div>
          <b>{m.windows.title}</b>
          <span className={styles.exeBar}>
            <i />
          </span>
          <p className={styles.exeDone}>
            <span className={styles.box}>
              <Check />
            </span>
            {m.windows.done}
          </p>
        </div>
      </div>
    );
  if (step.id === "mic")
    return (
      <div className={styles.micMock}>
        <p className={styles.field}>
          <span>{m.device}</span>
          <b>
            {m.value}
            <svg viewBox="0 0 16 16" aria-hidden="true">
              <path d="M4 6l4 4 4-4" />
            </svg>
          </b>
        </p>
        <div className={styles.testRow}>
          <span className={styles.pressBtn}>{m.button}</span>
          <span className={styles.meter} aria-hidden="true">
            {Array.from({ length: 22 }, (_, k) => (
              <i key={k} style={{ "--k": k }} />
            ))}
          </span>
        </div>
        <p className={styles.ok}>
          <Check />
          {m.done}
        </p>
      </div>
    );
  if (step.id === "signin")
    return (
      <div className={styles.signin}>
        <b className={styles.signinTitle}>{m.title}</b>
        <p className={styles.signinLead}>{m.lead}</p>
        <span className={styles.google}>
          <svg viewBox="0 0 18 18" aria-hidden="true">
            <path fill="#4285F4" d="M17.6 9.2c0-.6-.1-1.2-.2-1.8H9v3.4h4.8a4.1 4.1 0 0 1-1.8 2.7v2.2h2.9c1.7-1.6 2.7-3.9 2.7-6.5z" />
            <path fill="#34A853" d="M9 18c2.4 0 4.5-.8 6-2.2l-2.9-2.2c-.8.5-1.8.9-3.1.9-2.4 0-4.4-1.6-5.1-3.8H.9v2.3A9 9 0 0 0 9 18z" />
            <path fill="#FBBC05" d="M3.9 10.7a5.4 5.4 0 0 1 0-3.4V5H.9a9 9 0 0 0 0 8z" />
            <path fill="#EA4335" d="M9 3.6c1.3 0 2.5.5 3.5 1.4l2.6-2.6A9 9 0 0 0 .9 5l3 2.3C4.6 5.2 6.6 3.6 9 3.6z" />
          </svg>
          {m.google}
        </span>
        <span className={styles.or}>{m.or}</span>
        <span className={styles.email}>
          <span className={styles.typed}>{m.email}</span>
        </span>
        <span className={styles.pressBtn} data-wide data-late>
          {m.button}
        </span>
      </div>
    );
  if (step.id === "accent")
    return (
      <div className={styles.accentMock}>
        <p className={styles.field}>
          <span>{m.power}</span>
          <span className={styles.keyCap} aria-hidden="true">
            {m.key}
          </span>
          <span className={styles.toggle} aria-hidden="true">
            <i />
          </span>
        </p>
        <div className={styles.hearAs}>
          <span>{m.label}</span>
          <b>{m.accent}</b>
          <small>{m.voice}</small>
        </div>
        <p className={styles.ok}>
          <Check />
          {m.done[os]}
        </p>
      </div>
    );
  if (step.id === "sound")
    return (
      <div className={styles.soundMock}>
        {os === "mac" ? (
          <p className={styles.field}>
            <span>{m.permission}</span>
            <span className={styles.toggle} aria-hidden="true">
              <i />
            </span>
          </p>
        ) : (
          <p className={styles.field}>
            <span className={styles.playing}>
              <svg viewBox="0 0 16 16" aria-hidden="true">
                <path d="M2.5 6h2.5l3.5-3v10L5 10H2.5zM11 5.5a3.5 3.5 0 0 1 0 5M12.8 3.6a6 6 0 0 1 0 8.8" />
              </svg>
              {m.playing}
            </span>
          </p>
        )}
        <div className={styles.testRow}>
          <span className={styles.pressBtn} data-late={os === "mac" || undefined}>
            {m.button}
          </span>
          <span className={styles.wave} aria-hidden="true">
            {Array.from({ length: 30 }, (_, k) => (
              <i key={k} style={{ "--k": k, "--h": (0.25 + 0.75 * Math.abs(Math.sin(k * 0.8) * Math.cos(k * 0.33))).toFixed(3) }} />
            ))}
          </span>
        </div>
        <p className={styles.ok}>
          <Check />
          {m.done}
        </p>
      </div>
    );
  return (
    <ol className={styles.flow}>
      {m.flow.map(([b, t], k) => (
        <li key={b} style={{ "--k": k }}>
          <span className={styles.box}>
            <Check />
          </span>
          <p>
            <b>{b}</b> {t}
          </p>
        </li>
      ))}
    </ol>
  );
}

export function DownloadSetup() {
  const ref = useRef(null);
  const on = useOnScreen(ref, 0.35);
  const [os, setOs] = useState("mac");
  const [step, setStep] = useState(0);
  const total = setup.steps.length;
  const s = setup.steps[step];

  useEffect(() => {
    setOs(detect());
  }, []);

  const go = (i) => setStep((i + total) % total);
  const running = on;

  // A timer moves to the next step (looping) while the section is on screen. Any change of
  // step or system restarts it, so a click gets the full time too.
  useEffect(() => {
    if (!on) return;
    const t = setTimeout(() => setStep((x) => (x + 1) % total), STEP_MS);
    return () => clearTimeout(t);
  }, [on, step, os, total]);

  const onKey = (e) => {
    if (e.key === "ArrowRight") go(step + 1);
    else if (e.key === "ArrowLeft") go(step - 1);
    else return;
    e.preventDefault();
  };

  return (
    <section ref={ref} id="setup" className={styles.section} aria-labelledby="setup-title">
      <SectionHead id="setup-title" eyebrow={setup.eyebrow} title={setup.title} lead={setup.lead} />

      <div className={styles.wrap}>
        {/* Meta line: time, progress meter, system switch. */}
        <div className={styles.meta}>
          <p className={styles.time}>
            <svg viewBox="0 0 16 16" aria-hidden="true">
              <circle cx="8" cy="8" r="6.2" />
              <path d="M8 4.6V8l2.3 1.5" />
            </svg>
            {setup.time}
          </p>
          <p className={styles.meter4} aria-live="polite">
            <span aria-hidden="true">
              {setup.steps.map((x, i) => (
                <i key={x.id} data-done={i < step || undefined} data-now={i === step || undefined} />
              ))}
            </span>
            {setup.progress(step, total)}
          </p>
          <p className={styles.switch} role="radiogroup" aria-label={setup.osLabel} style={{ "--i": os === "mac" ? 0 : 1 }}>
            <span className={styles.thumb} aria-hidden="true" />
            <button type="button" role="radio" aria-checked={os === "mac"} onClick={() => setOs("mac")}>
              macOS
            </button>
            <button type="button" role="radio" aria-checked={os === "windows"} onClick={() => setOs("windows")}>
              Windows
            </button>
          </p>
        </div>

        {/* The step and the app's own screen for it. */}
        <div className={styles.stage} onKeyDown={onKey}>
          <div className={styles.copy}>
            <span className={styles.num} aria-hidden="true">
              <span key={step}>{String(step + 1).padStart(2, "0")}</span>
            </span>
            <div key={`${step}-${os}`} className={styles.words}>
              <h3>
                {s.title}
                {s.optional && <span className={styles.optional}>{s.optional}</span>}
              </h3>
              <p>{s.text[os]}</p>
              <p className={styles.tip}>
                <svg viewBox="0 0 16 16" aria-hidden="true">
                  <path d="M8 1.8a4.4 4.4 0 0 0-2.6 8V11h5.2V9.8A4.4 4.4 0 0 0 8 1.8zM6 13.4h4" />
                </svg>
                {s.tip[os]}
              </p>
            </div>
            <p className={styles.nav}>
              <button type="button" aria-label={setup.back} onClick={() => go(step - 1)}>
                <svg viewBox="0 0 16 16" aria-hidden="true">
                  <path d="M10 3.5 5.5 8l4.5 4.5" />
                </svg>
              </button>
              <button type="button" aria-label={setup.next} onClick={() => go(step + 1)}>
                <svg viewBox="0 0 16 16" aria-hidden="true">
                  <path d="M6 3.5 10.5 8 6 12.5" />
                </svg>
              </button>
            </p>
          </div>

          <figure className={styles.window} aria-label={`${setup.window}: ${s.title}`}>
            <div className={styles.bar}>
              <span className={styles.dots} aria-hidden="true">
                <i />
                <i />
                <i />
              </span>
              <span className={styles.wTitle}>{setup.window}</span>
              <span className={styles.wSteps} aria-hidden="true">
                {setup.steps.map((x, i) => (
                  <i key={x.id} data-done={i < step || undefined} data-now={i === step || undefined} />
                ))}
              </span>
            </div>
            <div className={styles.screen}>
              <p className={styles.screenHead}>
                <span>{String(step + 1).padStart(2, "0")}</span>
                {s.title}
              </p>
              <div key={`${step}-${os}`} className={styles.mock}>
                {mock(s, os)}
              </div>
            </div>
          </figure>
        </div>

        {/* The track: one station per step, the line fills towards the next one. */}
        <ol className={styles.track} data-run={running || undefined} style={{ "--n": total }}>
          {setup.steps.map((x, i) => (
            <li key={x.id} data-done={i < step || undefined} data-now={i === step || undefined}>
              <span className={styles.line} aria-hidden="true">
                <i key={i === step ? `${step}-${os}` : "x"} style={{ "--ms": `${STEP_MS}ms` }} />
              </span>
              <button type="button" aria-current={i === step ? "step" : undefined} onClick={() => go(i)}>
                <span className={styles.node} aria-hidden="true">
                  <span>{i + 1}</span>
                  <Check />
                </span>
                <span className={styles.label}>
                  <small>{String(i + 1).padStart(2, "0")}</small>
                  {x.short}
                </span>
              </button>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
