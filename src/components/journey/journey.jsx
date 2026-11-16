"use client";

import { useEffect, useRef, useState } from "react";
import { journey } from "@/content/home";
import { SectionHead } from "@/components/section-head/section-head";
import styles from "./journey.module.css";

// "Before · During · After". On wide screens a pinned scroll story: as you scroll through it, it
// stays on screen and moves through the three steps (a rail fills, a huge number fills with colour,
// the text slides, and the live demo wipes to the next one, floating in a glow with small pieces of
// the app drifting round it). On narrow screens, and with reduced motion, the steps simply follow
// one another. With reduced motion every demo rests on its finished state.

// A looping clock (seconds) that runs only while `ref` is on screen and `active`, starting from
// zero each time it becomes active.
function useLoop(ref, seconds, active = true) {
  const [t, setT] = useState(0);
  const [still, setStill] = useState(false);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setStill(true);
      setT(seconds - 0.01);
      return undefined;
    }
    if (!active) return undefined;
    let frame = 0;
    let last = 0;
    let time = 0;
    let shown = -1;
    setT(0);
    const loop = (now) => {
      time = (time + (last ? Math.min(0.1, (now - last) / 1000) : 0)) % seconds;
      last = now;
      if (Math.abs(time - shown) >= 1 / 30) {
        shown = time;
        setT(time);
      }
      frame = requestAnimationFrame(loop);
    };
    const io = new IntersectionObserver(([e]) => {
      cancelAnimationFrame(frame);
      frame = 0;
      last = 0;
      if (e.isIntersecting) frame = requestAnimationFrame(loop);
    });
    io.observe(ref.current);
    return () => {
      io.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [ref, seconds, active]);
  return [t, still];
}

const typed = (text, from, t, cps = 26) => text.slice(0, Math.max(0, Math.floor((t - from) * cps)));
// Fade the whole demo out at the end of each loop, so the restart is soft.
const fade = (t, seconds) => (t > seconds - 0.6 ? Math.max(0, (seconds - t) / 0.6) : Math.min(1, t / 0.4));

const Check = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M5 12.5l4.5 4.5L19 7.5" />
  </svg>
);

function BeforeDemo({ d, active }) {
  const ref = useRef(null);
  const S = 8;
  const [t, still] = useLoop(ref, S, active);
  return (
    <div ref={ref} className={styles.panel} style={{ opacity: still ? 1 : fade(t, S) }}>
      <p className={styles.panelHead}>{d.heading}</p>
      <p className={styles.fieldLabel}>{d.typeLabel}</p>
      <div className={styles.chips}>
        {d.types.map((type, i) => (
          <span key={type} data-on={(i === 0 && t > 0.6) || undefined}>
            {type}
          </span>
        ))}
      </div>
      <p className={styles.fieldLabel}>{d.goalLabel}</p>
      <div className={styles.input}>
        {typed(d.goal, 1.2, t)}
        {t > 1.2 && t < 1.2 + d.goal.length / 26 + 0.3 && <i className={styles.caret} />}
      </div>
      <p className={styles.fieldLabel}>{d.docLabel}</p>
      <div className={styles.docRow}>
        <span className={styles.doc} data-on={t > 2.7 || undefined}>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M7 3.5h7l4 4v13H7zM14 3.5v4h4" />
          </svg>
          {d.doc}
        </span>
      </div>
      <div className={styles.prepFoot}>
        <span className={styles.toggle} data-on={t > 3.8 || undefined}>
          <i />
          {d.practice}
        </span>
        <span className={styles.startBtn} data-on={t > 4.6 || undefined}>
          {d.start}
        </span>
      </div>
    </div>
  );
}

function DuringDemo({ d, active }) {
  const ref = useRef(null);
  const per = 4.2;
  const S = per * d.lines.length;
  const [t, still] = useLoop(ref, S, active);
  const i = still ? 0 : Math.min(d.lines.length - 1, Math.floor(t / per));
  const local = still ? per : t - i * per;
  const line = d.lines[i];
  const action = still ? -1 : Math.floor(t / 1.6) % (d.actions.length + 1);
  return (
    <div ref={ref} className={styles.panel}>
      <div className={styles.capHead}>
        <p className={styles.panelHead}>{d.heading}</p>
        <span className={styles.lang}>
          <b key={line.code}>{line.code}</b>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
          EN
        </span>
      </div>
      <div className={styles.caption} key={i} style={{ opacity: still ? 1 : Math.min(1, local / 0.35, (per - local) / 0.35) }}>
        <span className={styles.who}>
          {d.them} · {line.lang}
        </span>
        <p className={styles.original} lang={line.code.toLowerCase()}>
          {line.text}
        </p>
        <p className={styles.english}>
          {still ? d.english : typed(d.english, 0.9, local, 30)}
          {!still && local > 0.9 && local < 0.9 + d.english.length / 30 + 0.2 && <i className={styles.caret} />}
        </p>
        <span className={styles.into}>{d.into}</span>
      </div>
      <div className={styles.actions}>
        {d.actions.map((a, k) => (
          <span key={a} data-on={k === action || undefined}>
            {a}
          </span>
        ))}
      </div>
    </div>
  );
}

function AfterDemo({ d, active }) {
  const ref = useRef(null);
  const S = 9;
  const [t, still] = useLoop(ref, S, active);
  const talk = Math.min(1, Math.max(0, (t - 2.4) / 0.9));
  return (
    <div ref={ref} className={styles.panel} style={{ opacity: still ? 1 : fade(t, S) }}>
      <div className={styles.capHead}>
        <p className={styles.panelHead}>{d.heading}</p>
        <span className={styles.tag}>{d.template}</span>
      </div>
      <ul className={styles.todo}>
        {d.items.map((item, k) => (
          <li key={item} data-on={t > 0.5 + k * 0.45 || undefined}>
            <span>
              <Check />
            </span>
            {item}
          </li>
        ))}
      </ul>
      <div className={styles.stats}>
        {d.stats.map(([v, l]) => (
          <p key={l}>
            <b>{v}</b>
            {l}
          </p>
        ))}
        <div className={styles.talk}>
          <p>
            {d.talk.label}
            <span>
              {d.talk.youLabel} {Math.round(d.talk.you * talk)}%
            </span>
          </p>
          <div className={styles.bar}>
            <i style={{ transform: `scaleX(${(d.talk.you / 100) * talk})` }} />
          </div>
        </div>
      </div>
      <div className={styles.email} data-on={t > 3.6 || undefined}>
        <span className={styles.emailHead}>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M3.5 6h17v12h-17zM3.5 6.5l8.5 6.5 8.5-6.5" />
          </svg>
          {d.email}
        </span>
        <p>
          {typed(d.draft, 4.1, t, 30)}
          {t > 4.1 && t < 4.1 + d.draft.length / 30 + 0.3 && <i className={styles.caret} />}
        </p>
      </div>
    </div>
  );
}

const demos = { before: BeforeDemo, during: DuringDemo, after: AfterDemo };

const icons = {
  doc: "M7 3.5h7l4 4v13H7zM14 3.5v4h4",
  target: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM12 12h.01",
  mic: "M12 3a3 3 0 0 0-3 3v6a3 3 0 0 0 6 0V6a3 3 0 0 0-3-3Zm-6 9a6 6 0 0 0 12 0M12 18v3",
  globe: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM3.5 12h17M12 3c2.5 2.6 3.6 5.6 3.6 9s-1.1 6.4-3.6 9c-2.5-2.6-3.6-5.6-3.6-9S9.5 5.6 12 3Z",
  check: "M5 12.5l4.5 4.5L19 7.5",
  screen: "M3.5 5h17v11h-17zM9 20h6M12 16v4",
  mail: "M3.5 6h17v12h-17zM3.5 6.5l8.5 6.5 8.5-6.5",
  play: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM10 8.5v7l6-3.5z",
  search: "M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14ZM20.5 20.5 16 16",
};
const Icon = ({ name }) => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d={icons[name]} />
  </svg>
);

export function Journey() {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);
  const [pinned, setPinned] = useState(false);
  const [step, setStep] = useState(0);
  const steps = journey.steps;
  const N = steps.length;

  useEffect(() => {
    const el = ref.current;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold: 0.05 },
    );
    io.observe(el);

    const mq = window.matchMedia("(min-width: 960px) and (prefers-reduced-motion: no-preference)");
    let frame = 0;
    let current = -1;
    // Scroll progress through the pinned track (0 to 1) drives the sideways slide.
    const update = () => {
      frame = 0;
      if (!mq.matches) return;
      const track = el.querySelector("[data-track]");
      const r = track.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, -r.top / Math.max(1, r.height - window.innerHeight)));
      el.style.setProperty("--p", p.toFixed(4));
      const s = Math.min(N - 1, Math.round(p * (N - 1)));
      if (s !== current) {
        current = s;
        setStep(s);
      }
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const onMode = () => {
      setPinned(mq.matches);
      update();
    };
    onMode();
    mq.addEventListener("change", onMode);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      io.disconnect();
      cancelAnimationFrame(frame);
      mq.removeEventListener("change", onMode);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [N]);

  // A zone on the timeline scrolls to its chapter.
  const goTo = (i) => {
    const track = ref.current.querySelector("[data-track]");
    const span = track.offsetHeight - window.innerHeight;
    window.scrollTo({ top: track.getBoundingClientRect().top + window.scrollY + (span * i) / (N - 1), behavior: "smooth" });
  };

  return (
    <section
      ref={ref}
      id="journey"
      className={styles.section}
      data-in={seen || undefined}
      data-pinned={pinned || undefined}
      data-at={steps[step].key}
      style={{ "--n": N }}
      aria-labelledby="journey-title"
    >
      <SectionHead id="journey-title" eyebrow={journey.eyebrow} title={journey.title} lead={journey.lead} />

      <div className={styles.track} data-track>
        <div className={styles.sticky}>
          <div className={styles.viewport}>
            <ol className={styles.strip}>
              {steps.map((s, i) => {
                const Demo = demos[s.key];
                const state = !pinned || i === step ? "now" : "off";
                return (
                  <li key={s.key} className={styles.chapter} data-key={s.key} data-state={state} style={{ "--i": i }}>
                    <span className={styles.giant} aria-hidden="true">
                      {s.when.split(" ")[0]}
                    </span>

                    <div className={styles.copy}>
                      <p className={styles.when}>
                        <span>{s.n}</span>
                        {s.when}
                      </p>
                      <h3 className={styles.stepTitle}>{s.title}</h3>
                      <p className={styles.text}>
                        {s.text.split(" ").map((w, k) => (
                          <span key={k}>
                            <span className={styles.w} style={{ "--k": k }}>
                              {w}
                            </span>{" "}
                          </span>
                        ))}
                      </p>
                      <ul className={styles.points}>
                        {s.points.map((p, k) => (
                          <li key={p} style={{ "--k": k }}>
                            <Icon name="check" />
                            {p}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className={styles.visual} aria-hidden="true">
                      <span className={styles.glow} />
                      <div className={styles.demo}>
                        <Demo d={s.demo} active={state === "now"} />
                      </div>
                      {s.floats.map((f, k) => (
                        <span key={f.text} className={styles.float} data-n={k}>
                          <Icon name={f.icon} />
                          {f.text}
                        </span>
                      ))}
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>

          {/* The call timeline: the scroll is the call. */}
          {pinned && (
            <div className={styles.timeline}>
              <div className={styles.rail}>
                <span className={styles.fill} aria-hidden="true" />
                <span className={styles.head} aria-hidden="true" />
              </div>
              <div className={styles.zones}>
                {steps.map((s, i) => (
                  <button key={s.key} type="button" data-on={i <= step || undefined} data-now={i === step || undefined} onClick={() => goTo(i)}>
                    <b>{s.n}</b>
                    {s.when}
                    <small>{["−10 min", "0:00 – 24:00", "+1 min"][i]}</small>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
