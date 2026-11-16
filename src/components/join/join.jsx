"use client";

import { useRef } from "react";
import { join } from "@/content/home";
import { SectionHead } from "@/components/section-head/section-head";
import { useSeen } from "@/components/use-seen";
import styles from "./join.module.css";

// "Paste a link. MeetFly joins the call." (replaces the plain Works-with strip; keeps #platforms).
// A link conveyor across the full width: meeting links flow in from the left into a pulsing
// MeetFly node and come out on the right as the joined app's name. No pinning, no boxes.
export function Join() {
  const ref = useRef(null);
  const seen = useSeen(ref);
  const links = [...join.flow, ...join.flow];

  return (
    <section ref={ref} id="platforms" className={styles.section} data-in={seen || undefined} aria-labelledby="join-title">
      <SectionHead id="join-title" eyebrow={join.eyebrow} title={join.title} lead={join.lead} />

      {/* The conveyor. */}
      <div className={styles.conveyor} aria-hidden="true">
        <div className={styles.lane} data-side="in">
          <span className={styles.laneLabel}>{join.pasted}</span>
          <ul className={styles.track}>
            {links.map((f, i) => (
              <li key={i}>
                <svg viewBox="0 0 24 24">
                  <path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1" />
                </svg>
                {f.link}
              </li>
            ))}
          </ul>
        </div>

        <span className={styles.node}>
          <span className={styles.ring} />
          <span className={styles.ring} data-two />
          <img src="/brand/icon.svg" alt="" width="44" height="44" />
        </span>

        <div className={styles.lane} data-side="out">
          <span className={styles.laneLabel}>{join.joined}</span>
          <ul className={styles.track}>
            {links.map((f, i) => (
              <li key={i}>
                <i />
                {f.app}
              </li>
            ))}
          </ul>
        </div>
      </div>

    </section>
  );
}
