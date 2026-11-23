"use client";

import { useEffect, useRef, useState } from "react";
import { moreRoles } from "@/content/use-cases";
import { SectionHead } from "@/components/section-head/section-head";
import { useOnScreen, useSeen } from "@/components/use-seen";
import styles from "./uc-more.module.css";

// "More calls it fits" as a giant-type index. Six ruled rows: number | the role in very large
// type | the kind of call and an arrow. The playing row opens (grid rows 0fr → 1fr): its name
// fills with the violet → lime gradient in a sweep, what they say types in like a live caption,
// and the call type and the features it uses pop in one by one. A progress line runs along the
// playing row, then the next opens; hover, focus or tap a row to pick it (stops the play).
const STEP_MS = 5600;

function Caption({ text, live }) {
  const [n, setN] = useState(text.length);
  useEffect(() => {
    if (!live || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    let k = 0;
    setN(0);
    const id = setInterval(() => {
      k += 1;
      setN(k);
      if (k >= text.length) clearInterval(id);
    }, 32);
    return () => clearInterval(id);
  }, [live, text]);
  return (
    <>
      {text.slice(0, n)}
      {n < text.length && <i className={styles.caret} />}
    </>
  );
}

export function UseCasesMore() {
  const ref = useRef(null);
  const listRef = useRef(null);
  const seen = useSeen(ref);
  const on = useOnScreen(listRef, 0.25);
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);
  const items = moreRoles.items;

  const pick = (i) => {
    setAuto(false);
    setActive(i);
  };

  // /use-cases#<id> opens that row.
  useEffect(() => {
    const fromHash = () => {
      const i = items.findIndex((r) => `#${r.id}` === window.location.hash);
      if (i >= 0) pick(i);
    };
    fromHash();
    window.addEventListener("hashchange", fromHash);
    return () => window.removeEventListener("hashchange", fromHash);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const playing = auto && on;

  return (
    <section ref={ref} id="more-roles" className={styles.section} data-in={seen || undefined} aria-labelledby="more-title">
      <SectionHead id="more-title" eyebrow={moreRoles.eyebrow} title={moreRoles.title} lead={moreRoles.lead} />

      <ol ref={listRef} className={styles.list}>
        {items.map((r, i) => {
          const isOn = i === active;
          return (
            <li key={r.id} id={r.id} className={styles.row} data-on={isOn || undefined} style={{ "--i": i }}>
              <span className={styles.bar} aria-hidden="true">
                <i
                  key={isOn ? `on-${active}-${playing}` : "off"}
                  style={{ animationDuration: `${STEP_MS}ms`, animationPlayState: playing ? "running" : "paused" }}
                  onAnimationEnd={isOn ? () => playing && setActive((a) => (a + 1) % items.length) : undefined}
                />
              </span>
              <button
                type="button"
                className={styles.head}
                aria-expanded={isOn}
                onPointerEnter={(e) => e.pointerType === "mouse" && pick(i)}
                onFocus={() => pick(i)}
                onClick={() => pick(i)}
              >
                <span className={styles.n}>{String(i + 1).padStart(2, "0")}</span>
                <span className={styles.name} data-text={r.short}>
                  {r.short}
                </span>
                <span className={styles.call}>{r.call}</span>
                <span className={styles.arrow} aria-hidden="true">
                  <svg viewBox="0 0 16 16">
                    <path d="M4 12L12 4M6 4h6v6" />
                  </svg>
                </span>
              </button>

              <div className={styles.more}>
                <div>
                  <div className={styles.detail}>
                    <p className={styles.caption}>
                      <span className={styles.who}>
                        <i aria-hidden="true" />
                        {moreRoles.them}
                      </span>
                      <span className={styles.line}>
                        “<Caption text={r.them} live={isOn} />”
                      </span>
                    </p>
                    <div className={styles.side}>
                      <p className={styles.full}>{r.role}</p>
                      <p className={styles.type}>
                        <span>{moreRoles.typeLabel}</span>
                        <b>{r.type}</b>
                      </p>
                      <ul className={styles.uses} aria-label={moreRoles.usesLabel}>
                        {r.uses.map((u, k) => (
                          <li key={u} style={{ "--k": k }}>
                            {u}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ol>

      <p className={styles.foot}>
        <a href={moreRoles.templatesLink.href}>
          {moreRoles.templatesLink.label}
          <svg viewBox="0 0 16 16" aria-hidden="true">
            <path d="M3 8h10M9 4l4 4-4 4" />
          </svg>
        </a>
      </p>
    </section>
  );
}
