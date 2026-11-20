"use client";

import { useEffect, useRef, useState } from "react";
import { roles, useCasesPage } from "@/content/use-cases";
import { DecodeText } from "@/components/hero/decode-text";
import { MagneticLink } from "@/components/hero/magnetic-link";
import { useOnScreen } from "@/components/use-seen";
import head from "@/components/features/features-hero.module.css";
import styles from "./uc-hero.module.css";

// The Use cases hero. The same centred headline as the Features hero (shared styles). Under it the
// six roles as one call recording: a full-width voice waveform cut into six takes, one per role.
// Under the waveform, the picked take: a big call window (the other person, a stock clip, with the
// meeting's captions typing their words, a speaking ring and a REC clock) with MeetFly's floating
// panel inside it, a real recording of the app answering that line. The panel can be dragged (mouse,
// touch, or arrow keys) anywhere inside the call but never out of it. On the right, What MeetFly
// does: four steps on a rail whose times come from the recording, filling as the take plays. A foot
// line carries the role, call type, goal, sound and replay. The panel video is the clock: the
// waveform's playhead, the captions and the rail follow it, and when it ends the next take plays.
// Picking a take holds it (with Replay). Sound is off until asked for. Videos only play while on
// screen; reduced motion shows the finished frame.
const PER_TAKE = 34;
const src = (id, part) => `/video/use-cases/${id}-${part}`;
const clamp01 = (n) => Math.max(0, Math.min(1, n));
const HEAD = 38; // the floating panel's title bar
const PAD = 14; // its smallest gap to the call's edge
const stamp = (sec) => `0:${sec.toFixed(1).padStart(4, "0")}`;

// Bar heights for each take, the same on server and client (no random): bursts of speech.
const BARS = Array.from({ length: 6 }, (_, t) =>
  Array.from({ length: PER_TAKE }, (_, j) => {
    const x = j / (PER_TAKE - 1);
    const env = Math.sin(Math.PI * x) ** 0.6;
    const v = Math.abs(Math.sin(j * 0.9 + t * 1.7) * Math.cos(j * 0.37 + t)) * 0.75 + 0.25 * Math.abs(Math.sin(j * 2.3 + t * 0.5));
    return (0.14 + 0.86 * env * v).toFixed(3);
  }),
);

const clock = (start, plus) => {
  const [m, s] = start.split(":").map(Number);
  const all = m * 60 + s + Math.floor(plus);
  return `${String(Math.floor(all / 60)).padStart(2, "0")}:${String(all % 60).padStart(2, "0")}`;
};

export function UseCasesHero() {
  const rowRef = useRef(null);
  const panelRef = useRef(null);
  const personRef = useRef(null);
  const voiceRef = useRef(null);
  const on = useOnScreen(rowRef, 0.2);
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);
  const [still, setStill] = useState(false);
  const [t, setT] = useState(0);
  const [ended, setEnded] = useState(false);
  const [sound, setSound] = useState(false);
  const boxRef = useRef(null);
  const drag = useRef(null);
  const [box, setBox] = useState({ w: 0, h: 0 });
  const [pos, setPos] = useState({ x: 1, y: 0 }); // the panel's place, as fractions of the free space
  const [moved, setMoved] = useState(false);
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    setStill(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    const fromHash = () => {
      const i = roles.findIndex((r) => `#${r.id}` === window.location.hash);
      if (i >= 0) {
        setAuto(false);
        setActive(i);
      }
    };
    fromHash();
    window.addEventListener("hashchange", fromHash);
    return () => window.removeEventListener("hashchange", fromHash);
  }, []);

  // The call window's size, so the floating panel always fits and stays inside it.
  useEffect(() => {
    const el = boxRef.current;
    if (!el) return undefined;
    const ro = new ResizeObserver(([e]) => setBox({ w: e.contentRect.width, h: e.contentRect.height }));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // A new take starts from the top.
  useEffect(() => {
    setT(0);
    setEnded(false);
  }, [active]);

  // Play while on screen; the voice follows the panel when sound is on.
  useEffect(() => {
    if (still) return;
    const panel = panelRef.current;
    const person = personRef.current;
    const voice = voiceRef.current;
    if (on) {
      person?.play().catch(() => {});
      if (!ended) panel?.play().catch(() => {});
      if (voice) {
        if (sound && !ended && panel) {
          voice.currentTime = panel.currentTime;
          voice.play().catch(() => setSound(false));
        } else voice.pause();
      }
    } else {
      panel?.pause();
      person?.pause();
      voice?.pause();
    }
  }, [on, still, active, ended, sound]);

  // The clock: read the panel video's time while it plays.
  useEffect(() => {
    if (still || !on || ended) return undefined;
    let frame = 0;
    let shown = -1;
    const loop = () => {
      const now = panelRef.current?.currentTime ?? 0;
      if (Math.abs(now - shown) >= 1 / 30) {
        shown = now;
        setT(now);
      }
      frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frame);
  }, [still, on, ended, active]);

  const pick = (i) => {
    setAuto(false);
    if (i === active) replay();
    else setActive(i);
  };
  const next = () => {
    if (auto) setActive((a) => (a + 1) % roles.length);
    else {
      setEnded(true);
      setT(roles[active].video.length);
      voiceRef.current?.pause();
    }
  };
  const replay = () => {
    if (panelRef.current) panelRef.current.currentTime = 0;
    if (voiceRef.current) voiceRef.current.currentTime = 0;
    setT(0);
    setEnded(false);
  };
  const onDown = (e) => {
    if (e.button !== 0) return;
    drag.current = { sx: e.clientX, sy: e.clientY, x: pos.x, y: pos.y };
    e.currentTarget.setPointerCapture(e.pointerId);
    setDragging(true);
  };
  const onMove = (e) => {
    const d = drag.current;
    if (!d) return;
    setMoved(true);
    setPos({ x: clamp01(d.x + (e.clientX - d.sx) / (freeX || 1)), y: clamp01(d.y + (e.clientY - d.sy) / (freeY || 1)) });
  };
  const onUp = () => {
    drag.current = null;
    setDragging(false);
  };
  const onKey = (e) => {
    const step = e.shiftKey ? 0.25 : 0.08;
    const move = { ArrowLeft: [-step, 0], ArrowRight: [step, 0], ArrowUp: [0, -step], ArrowDown: [0, step] }[e.key];
    if (!move) return;
    e.preventDefault();
    setMoved(true);
    setPos((p) => ({ x: clamp01(p.x + move[0]), y: clamp01(p.y + move[1]) }));
  };
  const toggleSound = () => {
    const voice = voiceRef.current;
    if (!sound && voice && panelRef.current) {
      // Start it inside the click, so the browser allows sound.
      voice.currentTime = panelRef.current.currentTime;
      voice.play().catch(() => setSound(false));
    } else voice?.pause();
    setSound(!sound);
  };

  const r = roles[active];
  const v = r.video;
  // The floating panel's size: as tall as the call allows (shorter on phones), its width from the
  // recording's shape. Its position is a fraction of the free space, so it can never leave the call.
  const small = box.w < 560;
  const panelH = Math.max(0, Math.round(small ? box.h * 0.62 : Math.min(box.h * 0.86, 440)));
  const panelW = Math.round((panelH - HEAD) * (840 / 1100));
  const freeX = Math.max(0, box.w - panelW - PAD * 2);
  const freeY = Math.max(0, box.h - panelH - PAD * 2);
  const px = PAD + pos.x * freeX;
  const py = PAD + pos.y * freeY;
  // Captions sit on the side the panel isn't on (under it on phones, where the panel is shorter).
  const panelOnRight = px + panelW / 2 > box.w / 2;
  const captionSide = !box.w
    ? { left: 16, right: 16 }
    : small
      ? py + panelH / 2 > box.h / 2
        ? { left: 16, right: 16, top: 16, bottom: "auto" }
        : { left: 16, right: 16 }
    : panelOnRight
      ? { left: 18, right: Math.round(box.w - px + 18) }
      : { left: Math.round(px + panelW + 18), right: 18 };
  const time = still ? v.length : t;
  const progress = Math.min(1, time / v.length);
  const words = r.them.split(" ");
  const said = Math.max(0, Math.min(words.length, Math.ceil(((time - v.talk[0]) / (v.talk[1] - v.talk[0])) * words.length)));
  const speaking = !still && time >= v.talk[0] && time < v.talk[1] + 0.3;
  const captions = still || time >= v.talk[0] - 0.1;
  const replied = still || time >= v.replyAt;
  // The rail's four steps, at the moments they happen in the recording.
  const at = { hears: v.talk[0], turn: v.talk[1], reply: v.replyAt, points: v.replyAt + 1.6 };
  const steps = useCasesPage.steps.map((st) => ({ ...st, at: at[st.key] }));
  const current = steps.reduce((c, st, i) => (time >= st.at ? i : c), -1);
  const railFill = still ? 1 : Math.max(0, Math.min(1, (time - steps[0].at) / (steps[3].at - steps[0].at)));

  return (
    <section id="use-cases-top" className={head.hero} aria-labelledby="uc-title">
      <div className={head.bg} aria-hidden="true">
        <span className={head.glowA} />
        <span className={head.glowB} />
      </div>

      <div className={head.head}>
        <p className={head.eyebrow}>
          <span className={head.tag}>
            <i aria-hidden="true" />
            {useCasesPage.eyebrow.tag}
          </span>
          {useCasesPage.eyebrow.text}
        </p>
        <h1 id="uc-title" className={head.title}>
          <span className={head.sr}>
            {useCasesPage.title.top} {useCasesPage.title.prefix} {useCasesPage.title.mark}
          </span>
          <span aria-hidden="true" className={head.line1}>
            <DecodeText text={useCasesPage.title.top} />
          </span>
          <span aria-hidden="true" className={head.line2}>
            {useCasesPage.title.prefix}{" "}
            <span className={head.mark}>
              {useCasesPage.title.mark}
              <svg viewBox="0 0 300 24" preserveAspectRatio="none" aria-hidden="true">
                <path pathLength="1" d="M4 16 C 60 6, 120 20, 180 11 S 270 8, 296 12" />
              </svg>
            </span>
          </span>
        </h1>
        <p className={head.lead}>{useCasesPage.lead}</p>
        <div className={head.actions}>
          <MagneticLink className={head.primary} href={useCasesPage.primary.href}>
            <span>{useCasesPage.primary.label}</span>
            <svg viewBox="0 0 16 16" aria-hidden="true">
              <path d="M8 2.5v8M4.5 7l3.5 3.5L11.5 7M3 13.5h10" />
            </svg>
          </MagneticLink>
          <a className={head.secondary} href={useCasesPage.secondary.href}>
            <span className={head.play} aria-hidden="true">
              <svg viewBox="0 0 16 16">
                <path d="M4 8h8M8.5 4.5L12 8l-3.5 3.5" />
              </svg>
            </span>
            {useCasesPage.secondary.label}
          </a>
        </div>
      </div>

      <div ref={rowRef} className={styles.wrap}>
        {/* The six calls as one recording: a take per role, the playhead follows the take's video. */}
        <p className={styles.takesNote}>
          <span className={styles.rec} aria-hidden="true" />
          {useCasesPage.takes}
        </p>
        <div className={styles.takes} role="tablist" aria-label="Roles">
          {roles.map((x, i) => {
            const state = i < active ? "past" : i === active ? "now" : "next";
            return (
              <button
                key={x.id}
                id={x.id}
                type="button"
                role="tab"
                aria-selected={i === active}
                aria-controls="uc-call"
                aria-label={x.role}
                data-state={state}
                className={styles.take}
                onClick={() => pick(i)}
                style={state === "now" ? { "--p": progress.toFixed(4) } : undefined}
              >
                <span className={styles.wave} aria-hidden="true">
                  {BARS[i].map((h, j) => (
                    <i key={j} style={{ "--h": h }} />
                  ))}
                  <span className={styles.fill}>
                    {BARS[i].map((h, j) => (
                      <i key={j} style={{ "--h": h }} />
                    ))}
                  </span>
                  {state === "now" && <span className={styles.head} />}
                </span>
                <span className={styles.label}>
                  <span className={styles.n}>{String(i + 1).padStart(2, "0")}</span>
                  <span className={styles.name}>{x.short || x.role}</span>
                </span>
              </button>
            );
          })}
        </div>

        <p className={styles.nowRole} aria-hidden="true">
          <span>{String(active + 1).padStart(2, "0")}</span>
          {r.role}
        </p>

        {/* The take: a big call window with MeetFly's panel floating inside it (drag it anywhere in
            the window), and on the right what MeetFly does, step by step. */}
        <div id="uc-call" className={styles.sheet} role="tabpanel" aria-label={`${r.role}: ${r.type} call`}>
          <p className={styles.sr}>
            {r.who}: “{r.them}” MeetFly suggested: “{r.reply}”
          </p>

          <div className={styles.window}>
            <div className={styles.bar} aria-hidden="true">
              <span className={styles.dots}>
                <i />
                <i />
                <i />
              </span>
              <span className={styles.barTitle}>{r.call}</span>
              <span className={styles.barRec}>
                <span className={styles.recDot} />
                REC {clock(r.at, time)}
              </span>
            </div>

            <div ref={boxRef} className={styles.call} data-speaking={speaking || undefined}>
              <div aria-hidden="true">
                {still ? (
                  <img className={styles.person} src={src(r.id, "person.jpg")} alt="" />
                ) : (
                  <video
                    key={`p-${r.id}`}
                    ref={personRef}
                    className={styles.person}
                    src={src(r.id, "person.mp4")}
                    poster={src(r.id, "person.jpg")}
                    muted
                    loop
                    playsInline
                    preload="auto"
                  />
                )}
                <span className={styles.shade} />
                <span className={styles.nameTag}>
                  <span className={styles.level}>
                    <i />
                    <i />
                    <i />
                  </span>
                  {r.who}
                </span>
                <p
                  className={styles.caption}
                  data-on={captions || undefined}
                  lang={r.lang}
                  style={captionSide}
                >
                  {words.map((w, i) => (
                    <span key={i} className={styles.cw} data-said={still || i < said || undefined}>
                      {w}{" "}
                    </span>
                  ))}
                </p>
              </div>

              {/* MeetFly's floating panel: a real recording, draggable inside the call. */}
              <div
                className={styles.float}
                data-ready={box.w > 0 || undefined}
                data-replied={replied || undefined}
                data-dragging={dragging || undefined}
                style={{ width: panelW, height: panelH, transform: `translate(${Math.round(px)}px, ${Math.round(py)}px)` }}
                role="group"
                tabIndex={0}
                aria-label={useCasesPage.panelHint}
                onPointerDown={onDown}
                onPointerMove={onMove}
                onPointerUp={onUp}
                onPointerCancel={onUp}
                onKeyDown={onKey}
              >
                <div className={styles.floatHead} aria-hidden="true">
                  <span className={styles.grip}>
                    <i />
                    <i />
                    <i />
                    <i />
                    <i />
                    <i />
                  </span>
                  <img src="/brand/icon.svg" alt="" width="18" height="18" />
                  <strong>{useCasesPage.panelName}</strong>
                  <span className={styles.real}>{moved ? useCasesPage.real : useCasesPage.drag}</span>
                </div>
                <div className={styles.floatBody} aria-hidden="true">
                  {still ? (
                    <img src={src(r.id, "panel.jpg")} alt="" draggable="false" />
                  ) : (
                    <video
                      key={`m-${r.id}`}
                      ref={panelRef}
                      src={src(r.id, "panel.mp4")}
                      poster={src(r.id, "panel-start.jpg")}
                      muted
                      playsInline
                      preload="auto"
                      onEnded={next}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
          {!still && <audio key={`v-${r.id}`} ref={voiceRef} src={src(r.id, "voice.m4a")} preload="none" />}

          {/* What MeetFly does: four steps on a rail, timed to the real recording. */}
          <div className={styles.side} aria-hidden="true">
            <div className={styles.sideHead}>
              <p className={styles.colHead}>{useCasesPage.cols.rail}</p>
              <span className={styles.timer}>
                {stamp(Math.min(time, v.length))}
                <i>/ {stamp(v.length)}</i>
              </span>
            </div>
            <ol className={styles.rail} style={{ "--fill": railFill.toFixed(4) }}>
              {steps.map((st, i) => (
                <li key={st.key} data-state={time >= st.at ? (i === current ? "now" : "done") : "next"}>
                  <span className={styles.stepDot}>{String(i + 1).padStart(2, "0")}</span>
                  <span className={styles.stepBody}>
                    <strong>{st.title}</strong>
                    <span>{st.text}</span>
                  </span>
                  <span className={styles.stepTime}>{stamp(st.at)}</span>
                </li>
              ))}
            </ol>
            <div className={styles.uses}>
              <span className={styles.metaLabel}>{useCasesPage.usesLabel}</span>
              <span className={styles.useList}>
                {r.uses.map((u) => (
                  <span key={u} className={styles.use}>
                    {u}
                  </span>
                ))}
              </span>
            </div>
          </div>

          {/* The foot: the role, its call type and goal, sound and replay. */}
          <div className={styles.foot} key={`f-${r.id}`}>
            <p className={styles.roleLine}>
              <strong>{r.role}</strong>
              <span>{r.line}</span>
            </p>
            <p className={styles.setup}>
              <span className={styles.metaLabel}>{useCasesPage.typeLabel}</span>
              <span className={styles.type}>{r.type}</span>
              <span className={styles.metaLabel}>{useCasesPage.goalLabel}</span>
              <span className={styles.goal}>{r.goal}</span>
            </p>
            {!still && (
              <div className={styles.buttons}>
                <button type="button" className={styles.ctl} aria-pressed={sound} onClick={toggleSound}>
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z" />
                    {sound ? <path d="M15.5 9a4 4 0 0 1 0 6M18 6.5a7.5 7.5 0 0 1 0 11" /> : <path d="M16 9.5l5 5M21 9.5l-5 5" />}
                  </svg>
                  {sound ? useCasesPage.sound.on : useCasesPage.sound.off}
                </button>
                <button type="button" className={styles.ctl} onClick={replay}>
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M4.5 12a7.5 7.5 0 1 0 2.2-5.3M4.5 4.5v4h4" />
                  </svg>
                  {useCasesPage.replay}
                </button>
              </div>
            )}
          </div>
        </div>
        <p className={styles.note}>{useCasesPage.note}</p>
      </div>
    </section>
  );
}
