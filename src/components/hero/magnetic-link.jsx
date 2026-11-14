"use client";

import { useRef } from "react";

// A link that leans a little towards the pointer, then springs back. Fine pointers only.
export function MagneticLink({ children, className, href, strength = 0.28 }) {
  const ref = useRef(null);

  const onMove = (e) => {
    if (e.pointerType !== "mouse") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = ref.current;
    const r = el.getBoundingClientRect();
    const dx = (e.clientX - (r.left + r.width / 2)) * strength;
    const dy = (e.clientY - (r.top + r.height / 2)) * strength;
    el.style.translate = `${dx.toFixed(1)}px ${dy.toFixed(1)}px`;
  };
  const onLeave = () => {
    if (ref.current) ref.current.style.translate = "";
  };

  return (
    <a ref={ref} className={className} href={href} onPointerMove={onMove} onPointerLeave={onLeave}>
      {children}
    </a>
  );
}
