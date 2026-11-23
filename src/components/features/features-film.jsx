"use client";

import { useEffect, useRef, useState } from "react";
import { film } from "@/content/features";
import styles from "./features-film.module.css";

// The Features hero's film: a real screen recording of MeetFly in a practice call, cropped to the
// meeting area, in a window frame that tilts back and flattens as you scroll it in. Four steps sit
// around it (two each side on wide screens, a row under it on narrow ones) and light up as the
// video reaches them, each with a thin progress line. Plays muted, only while on screen.
const SRC = "/video/hero/app.mp4";
const POSTER = "/video/hero/app.jpg";

export function FeaturesFilm() {
  const ref = useRef(null);
  const videoRef = useRef(null);
  const [t, setT] = useState(0);
  const [dur, setDur] = useState(51);

  useEffect(() => {
    const v = videoRef.current;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !reduce) v.play().catch(() => {});
      else v.pause();
    }, { threshold: 0.25 });
    io.observe(ref.current);
    let frame = 0;
    let last = -1;
    const tick = () => {
      // About ten updates a second is plenty for the step bars.
      if (Math.abs(v.currentTime - last) > 0.1) {
        last = v.currentTime;
        setT(v.currentTime);
      }
      frame = requestAnimationFrame(tick);
    };
    const onPlay = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(tick);
    };
    const onPause = () => cancelAnimationFrame(frame);
    const onMeta = () => setDur(v.duration || 51);
    v.addEventListener("play", onPlay);
    v.addEventListener("pause", onPause);
    v.addEventListener("loadedmetadata", onMeta);
    return () => {
      io.disconnect();
      cancelAnimationFrame(frame);
      v.removeEventListener("play", onPlay);
      v.removeEventListener("pause", onPause);
      v.removeEventListener("loadedmetadata", onMeta);
    };
  }, []);

  const steps = film.steps;
  const activeIdx = steps.reduce((a, s, i) => (t >= s.from ? i : a), 0);
  const progress = (i) => {
    const start = steps[i].from;
    const end = steps[i + 1]?.from ?? dur;
    return Math.min(1, Math.max(0, (t - start) / Math.max(0.1, end - start)));
  };
  const seek = (i) => {
    const v = videoRef.current;
    v.currentTime = steps[i].from + 0.05;
    v.play().catch(() => {});
  };

  const step = (s, i) => (
    <li key={s.key} data-on={i === activeIdx || undefined} data-done={i < activeIdx || undefined}>
      <button type="button" onClick={() => seek(i)}>
        <span className={styles.n}>{String(i + 1).padStart(2, "0")}</span>
        <span className={styles.stepText}>
          <b>{s.title}</b>
          <small>{s.text}</small>
        </span>
        <span className={styles.bar} aria-hidden="true">
          <i style={{ transform: `scaleX(${i < activeIdx ? 1 : i === activeIdx ? progress(i) : 0})` }} />
        </span>
      </button>
    </li>
  );

  return (
    <div ref={ref} className={styles.film}>
      <ol className={`${styles.steps} ${styles.left}`}>
        {steps.slice(0, 2).map((s, i) => step(s, i))}
      </ol>

      <div className={styles.stage}>
        <div className={styles.window}>
          <p className={styles.titlebar}>
            <span className={styles.lights} aria-hidden="true">
              <i />
              <i />
              <i />
            </span>
            <img src="/brand/icon.svg" alt="" width="18" height="18" />
            <b>{film.title}</b>
            <span className={styles.meta}>{film.meta}</span>
            <span className={styles.real}>
              <i aria-hidden="true" />
              {film.real}
            </span>
          </p>
          <div className={styles.screen}>
            <video ref={videoRef} src={SRC} poster={POSTER} muted loop playsInline preload="metadata" aria-label={film.note} />
          </div>
        </div>
      </div>

      <ol className={`${styles.steps} ${styles.right}`} start={3}>
        {steps.slice(2).map((s, i) => step(s, i + 2))}
      </ol>
      <p className={styles.note}>{film.note}</p>
    </div>
  );
}
