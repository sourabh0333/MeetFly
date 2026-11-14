"use client";

import { useEffect, useState } from "react";
import styles from "./decode-text.module.css";

// Text that "decodes" like live transcription: each letter cycles through random letters, then
// settles, left to right. Every letter keeps its real width, so nothing shifts. The server renders
// the finished text; with reduced motion it stays finished.
const GLYPHS = "abcdefghijklmnopqrstuvwxyz";

export function DecodeText({ text, delay = 150, duration = 1100 }) {
  const [shown, setShown] = useState(null); // null = finished

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    const chars = [...text];
    let frame = 0;
    let startAt = 0;
    let lastSwap = 0;
    const settle = chars.map((_, i) => (i / chars.length) * 0.75 + Math.random() * 0.25);
    const tick = (now) => {
      if (!startAt) startAt = now + delay;
      const p = (now - startAt) / duration;
      if (p >= 1) {
        setShown(null);
        return;
      }
      if (now - lastSwap > 45) {
        lastSwap = now;
        setShown(
          chars.map((c, i) => (c === " " || p >= settle[i] ? null : GLYPHS[Math.floor(Math.random() * GLYPHS.length)])),
        );
      }
      frame = requestAnimationFrame(tick);
    };
    setShown(chars.map((c) => (c === " " ? null : GLYPHS[Math.floor(Math.random() * GLYPHS.length)])));
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [text, delay, duration]);

  let i = 0;
  return (
    <span className={styles.text}>
      {text.split(" ").map((word, w, all) => (
        <span key={w} className={styles.word}>
          {[...word].map((ch) => {
            const idx = i++;
            const glyph = shown?.[idx];
            return (
              <span key={idx} className={styles.ch} data-scrambled={glyph ? "" : undefined}>
                {ch}
                {glyph && <span className={styles.glyph}>{glyph}</span>}
              </span>
            );
          })}
          {w < all.length - 1 && <span className={styles.space}>{(i++, " ")}</span>}
        </span>
      ))}
    </span>
  );
}
