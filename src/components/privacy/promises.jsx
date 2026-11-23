"use client";

import { useRef } from "react";
import { promises } from "@/content/privacy";
import { SectionHead } from "@/components/section-head/section-head";
import { useSeen } from "@/components/use-seen";
import styles from "./promises.module.css";

// "Six promises, with the receipts": ruled rows on one grid (number | the promise in big type |
// the receipt: the sentence from MeetFly's privacy policy that backs it). As you scroll, each
// promise's words light up (CSS scroll-driven, with a plain fallback); when the row is reached a
// round "In the policy" seal stamps in and a highlighter draws over the key phrase of the quote.
const Words = ({ text }) =>
  text.split(" ").map((w, i) => (
    <span key={i} className={styles.word} style={{ "--w": i }}>
      {w}{" "}
    </span>
  ));

// The quote with its key phrase wrapped for the highlighter.
function Quote({ text, mark }) {
  const at = text.indexOf(mark);
  if (at < 0) return text;
  return (
    <>
      {text.slice(0, at)}
      <mark>{mark}</mark>
      {text.slice(at + mark.length)}
    </>
  );
}

function Row({ item, i }) {
  const ref = useRef(null);
  const seen = useSeen(ref, 0.45);
  return (
    <li ref={ref} id={`promise-${item.id}`} className={styles.row} data-seen={seen || undefined} style={{ "--i": i }}>
      <span className={styles.n}>{String(i + 1).padStart(2, "0")}</span>
      <p className={styles.promise}>
        <Words text={item.promise} />
      </p>
      <div className={styles.receipt}>
        <p className={styles.head}>
          <span className={styles.seal} aria-hidden="true">
            <svg viewBox="0 0 16 16">
              <path d="M3.5 8.5l3 3 6-7" />
            </svg>
          </span>
          <span className={styles.src}>
            {promises.seal}
            <small>{item.where}</small>
          </span>
        </p>
        <blockquote className={styles.quote} cite="/privacy">
          “<Quote text={item.quote} mark={item.mark} />”
        </blockquote>
      </div>
    </li>
  );
}

export function Promises() {
  const ref = useRef(null);
  const seen = useSeen(ref);
  return (
    <section ref={ref} id="promises" className={styles.section} data-in={seen || undefined} aria-labelledby="promises-title">
      <SectionHead id="promises-title" eyebrow={promises.eyebrow} title={promises.title} lead={promises.lead} />
      <ol className={styles.list}>
        {promises.items.map((item, i) => (
          <Row key={item.id} item={item} i={i} />
        ))}
      </ol>
    </section>
  );
}
