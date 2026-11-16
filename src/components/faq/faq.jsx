"use client";

import { useRef, useState } from "react";
import { faq } from "@/content/home";
import { SectionHead } from "@/components/section-head/section-head";
import { DecodeText } from "@/components/hero/decode-text";
import { useSeen } from "@/components/use-seen";
import styles from "./faq.module.css";

// FAQ as a large editorial accordion. No pinning, no boxes, full width. Each question is a big
// row (number, question, plus); a lime underline sweeps across on hover; opening it expands the
// row smoothly, turns the plus into a cross and decodes the answer in, set to the right with
// MeetFly's icon. One open at a time; the first starts open. Every answer is in the HTML.
export function Faq() {
  const ref = useRef(null);
  const seen = useSeen(ref);
  const [open, setOpen] = useState(0);

  return (
    <section ref={ref} id="faq" className={styles.section} data-in={seen || undefined} aria-labelledby="faq-title">
      <SectionHead id="faq-title" eyebrow={faq.eyebrow} title={faq.title} lead={faq.lead} />

      <ol className={styles.list}>
        {faq.items.map((it, i) => {
          const isOpen = i === open;
          return (
            <li key={it.q} className={styles.row} data-open={isOpen || undefined} style={{ "--i": i }}>
              <h3>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`faq-a-${i}`}
                  id={`faq-q-${i}`}
                  onClick={() => setOpen(isOpen ? -1 : i)}
                >
                  <span className={styles.n}>{String(i + 1).padStart(2, "0")}</span>
                  <span className={styles.q}>{it.q}</span>
                  <span className={styles.plus} aria-hidden="true">
                    <i />
                    <i />
                  </span>
                </button>
              </h3>
              <div id={`faq-a-${i}`} className={styles.panel} role="region" aria-labelledby={`faq-q-${i}`}>
                <div className={styles.inner}>
                  <p className={styles.a}>
                    <img src="/brand/icon.svg" alt="" width="28" height="28" />
                    <span>{isOpen ? <DecodeText text={it.a} delay={120} duration={900} /> : it.a}</span>
                  </p>
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
