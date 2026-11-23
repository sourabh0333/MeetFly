"use client";

import { useRef } from "react";
import { record } from "@/content/privacy";
import { SectionHead } from "@/components/section-head/section-head";
import { useSeen } from "@/components/use-seen";
import styles from "./record.module.css";

// "Everything our server knows about you" as an aligned ledger: one heading row, then four rows on
// the same grid (what we keep | exactly what's in it | why, and for how long). Each row's field
// chips pop in when it is reached. Under it, a full-width "Never on our server" band whose items
// are struck through one by one. Phones: each row stacks, labels stay.
function Row({ g, i }) {
  const ref = useRef(null);
  const seen = useSeen(ref, 0.5);
  return (
    <li ref={ref} className={styles.row} data-seen={seen || undefined}>
      <div className={styles.what}>
        <span className={styles.n}>{String(i + 1).padStart(2, "0")}</span>
        <b>{g.what}</b>
      </div>
      <ul className={styles.fields} aria-label={record.cols.fields}>
        {g.fields.map((f, k) => (
          <li key={f} style={{ "--k": k }}>
            {f}
          </li>
        ))}
      </ul>
      <div className={styles.why}>
        <p>{g.why}</p>
        <span className={styles.when}>{g.when}</span>
      </div>
    </li>
  );
}

export function Record() {
  const ref = useRef(null);
  const neverRef = useRef(null);
  const seen = useSeen(ref);
  const neverSeen = useSeen(neverRef, 0.5);

  return (
    <section ref={ref} id="server-record" className={styles.section} data-in={seen || undefined} aria-labelledby="record-title">
      <SectionHead id="record-title" eyebrow={record.eyebrow} title={record.title} lead={record.lead} />

      <div className={styles.wrap}>
        <div className={styles.heads} aria-hidden="true">
          <p>{record.cols.what}</p>
          <p>{record.cols.fields}</p>
          <p>{record.cols.why}</p>
        </div>
        <ol className={styles.rows}>
          {record.groups.map((g, i) => (
            <Row key={g.id} g={g} i={i} />
          ))}
        </ol>

        {/* Never on our server. */}
        <div ref={neverRef} className={styles.never} data-on={neverSeen || undefined}>
          <p className={styles.neverTitle}>
            <span className={styles.cross} aria-hidden="true" />
            {record.neverTitle}
          </p>
          <ul>
            {record.never.map((n, k) => (
              <li key={n} style={{ "--k": k }}>
                <span>{n}</span>
              </li>
            ))}
          </ul>
          <p className={styles.neverNote}>{record.neverNote}</p>
        </div>
      </div>
    </section>
  );
}
