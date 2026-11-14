"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import styles from "./rotating-word.module.css";

// A word that changes every few seconds. The old word lifts away out of a blur, the new one rises
// in, and the lime highlighter under it stretches to the new word's width. It holds while off
// screen and stays on the first word with reduced motion.
export function RotatingWord({ words, interval = 2400, startDelay = 2200 }) {
  const [index, setIndex] = useState(0);
  const [width, setWidth] = useState(null);
  const root = useRef(null);
  const items = useRef([]);

  useLayoutEffect(() => {
    const el = items.current[index];
    if (el) setWidth(el.offsetWidth);
  }, [index]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    let visible = true;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    if (root.current) io.observe(root.current);
    let timer;
    const step = () => {
      if (visible && !document.hidden) setIndex((i) => (i + 1) % words.length);
      timer = setTimeout(step, interval);
    };
    timer = setTimeout(step, startDelay);
    const onResize = () => {
      const el = items.current[index];
      if (el) setWidth(el.offsetWidth);
    };
    window.addEventListener("resize", onResize);
    return () => {
      clearTimeout(timer);
      io.disconnect();
      window.removeEventListener("resize", onResize);
    };
  }, [words.length, interval, startDelay, index]);

  return (
    <span ref={root} className={styles.root} style={width ? { width } : undefined} aria-hidden="true">
      {words.map((word, i) => (
        <span
          key={word}
          ref={(el) => (items.current[i] = el)}
          className={styles.word}
          data-state={i === index ? "on" : i === (index - 1 + words.length) % words.length ? "off" : "next"}
        >
          {word}
        </span>
      ))}
    </span>
  );
}
