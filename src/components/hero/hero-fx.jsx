"use client";

import { useEffect, useRef } from "react";

// The hero's section element. On fine pointers it writes the pointer position as CSS variables:
// --mx / --my (px, for the spotlight) and --tx / --ty (-1 to 1, for the 3D tilt of the demo).
// One rAF per frame at most, and nothing at all with reduced motion or touch.
export function HeroFx({ children, ...props }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!fine.matches || reduce.matches) return undefined;

    let frame = 0;
    let x = 0;
    let y = 0;
    const apply = () => {
      frame = 0;
      const r = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${x - r.left}px`);
      el.style.setProperty("--my", `${y - r.top}px`);
      el.style.setProperty("--tx", ((x - r.left) / r.width - 0.5).toFixed(3) * 2);
      el.style.setProperty("--ty", ((y - r.top) / r.height - 0.5).toFixed(3) * 2);
    };
    const onMove = (e) => {
      x = e.clientX;
      y = e.clientY;
      el.dataset.pointer = "";
      if (!frame) frame = requestAnimationFrame(apply);
    };
    const onLeave = () => {
      delete el.dataset.pointer;
      el.style.setProperty("--tx", 0);
      el.style.setProperty("--ty", 0);
    };
    el.addEventListener("pointermove", onMove, { passive: true });
    el.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(frame);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <section ref={ref} {...props}>
      {children}
    </section>
  );
}
