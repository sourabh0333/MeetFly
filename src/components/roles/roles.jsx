"use client";

import { useEffect, useRef, useState } from "react";
import { roles } from "@/content/home";
import { SectionHead } from "@/components/section-head/section-head";
import { useSeen } from "@/components/use-seen";
import styles from "./roles.module.css";

// "Built for": six roles as tall columns across the full width, split by thin rules (no boxes).
// Hovering or tapping a column widens it and shows the features that role uses most; the others
// narrow. On phones the columns become rows that open the same way.
const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-");

export function Roles() {
  const ref = useRef(null);
  const seen = useSeen(ref);
  const [open, setOpen] = useState(0);

  // Menu links like /#role-sales open that role.
  useEffect(() => {
    const fromHash = () => {
      const i = roles.items.findIndex((r) => `#role-${slug(r.role)}` === window.location.hash);
      if (i >= 0) setOpen(i);
    };
    fromHash();
    window.addEventListener("hashchange", fromHash);
    return () => window.removeEventListener("hashchange", fromHash);
  }, []);

  return (
    <section ref={ref} id="roles" className={styles.section} data-in={seen || undefined} aria-labelledby="roles-title">
      <SectionHead id="roles-title" eyebrow={roles.eyebrow} title={roles.title} lead={roles.lead} />

      <ul className={styles.cols}>
        {roles.items.map((r, i) => (
          <li
            key={r.role}
            id={`role-${slug(r.role)}`}
            className={styles.col}
            data-open={i === open || undefined}
            style={{ "--i": i }}
            onPointerEnter={(e) => e.pointerType === "mouse" && setOpen(i)}
          >
            <button type="button" aria-expanded={i === open} onClick={() => setOpen(i)}>
              <span className={styles.n}>{String(i + 1).padStart(2, "0")}</span>
              <span className={styles.role}>{r.role}</span>
              <span className={styles.line}>{r.line}</span>
              <span className={styles.uses}>
                {r.uses.map((u) => (
                  <span key={u}>
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M5 12.5l4.5 4.5L19 7.5" />
                    </svg>
                    {u}
                  </span>
                ))}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
