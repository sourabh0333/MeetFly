"use client";

import { useEffect, useRef, useState } from "react";
import { privacy } from "@/content/home";
import styles from "./privacy.module.css";

// "Where your call goes": orbits round "Your computer". What stays local circles slowly on the
// inner orbit; the two services the call is sent to sit on the outer orbit, with small data dots
// travelling out to them. Text either side says plainly which is which, and three facts follow.
// Everything is CSS animation; with reduced motion it stands still.
const icons = {
  doc: "M7 3.5h7l4 4v13H7zM14 3.5v4h4M9.5 12h5M9.5 15.5h5",
  lines: "M5 7h14M5 12h14M5 17h9",
  rec: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z",
  user: "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM4.5 20.5c1.2-3.6 4-5.5 7.5-5.5s6.3 1.9 7.5 5.5",
  wave: "M3 12h2M7 8v8M11 5v14M15 9v6M19 7v10M21 12h0",
  spark: "M12 3.5l1.7 5.1 5.1 1.7-5.1 1.7L12 17.1l-1.7-5.1-5.1-1.7 5.1-1.7z",
  bot: "M6 9h12v9H6zM12 5v4M9.5 13h.01M14.5 13h.01M3 3l18 18",
  gauge: "M4.5 17a8 8 0 1 1 15 0M12 13l4-4",
  trash: "M5 7h14M10 7V4.5h4V7M7 7l1 13h8l1-13",
  home: "M4 11 12 4l8 7v9h-5v-6H9v6H4z",
  out: "M7 17 17 7M9 7h8v8",
};
const Icon = ({ name }) => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d={icons[name]} />
  </svg>
);

const { local, out } = privacy;
const OUT_ANGLES = [-28, 28];

export function Privacy() {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={ref} id="privacy" className={styles.section} data-in={seen || undefined} aria-labelledby="privacy-title">
      <header className={styles.head}>
        <p className={styles.eyebrow}>{privacy.eyebrow}</p>
        <h2 id="privacy-title" className={styles.title}>
          {privacy.title}
        </h2>
        <p className={styles.lead}>{privacy.lead}</p>
      </header>

      <div className={styles.body}>
        <div className={styles.side} data-local>
          <p className={styles.sideTitle}>
            <span>
              <Icon name="home" />
            </span>
            {local.title}
          </p>
          <p className={styles.sideText}>{local.text}</p>
          <ul>
            {local.items.map((it) => (
              <li key={it.label}>{it.label}</li>
            ))}
          </ul>
        </div>

        {/* The orbits. */}
        <div className={styles.orbits} aria-hidden="true">
          <span className={styles.glow} />
          <span className={styles.ring} data-outer />
          <span className={styles.ring} data-inner />

          {/* Data dots travelling out to the two services. */}
          {OUT_ANGLES.map((a, i) => (
            <span key={a} className={styles.beam} style={{ "--a": `${a}deg` }}>
              <i style={{ animationDelay: `${i * 0.6}s` }} />
              <i style={{ animationDelay: `${i * 0.6 + 0.9}s` }} />
            </span>
          ))}

          <div className={styles.spin}>
            {local.items.map((it, i) => (
              <span key={it.label} className={styles.sat} style={{ "--a": `${i * 90 + 45}deg` }}>
                <span className={styles.upright}>
                  <span className={styles.chip}>
                    <Icon name={it.icon} />
                    {it.label}
                  </span>
                </span>
              </span>
            ))}
          </div>

          {out.items.map((it, i) => (
            <span key={it.label} className={styles.station} style={{ "--a": `${OUT_ANGLES[i]}deg` }}>
              <span className={styles.chip} data-out>
                <Icon name={it.icon} />
                {it.label}
              </span>
            </span>
          ))}

          <div className={styles.centre}>
            <img src="/brand/icon.svg" alt="" width="40" height="40" />
            <span>{privacy.centre}</span>
          </div>
        </div>

        <div className={styles.side} data-out>
          <p className={styles.sideTitle}>
            <span>
              <Icon name="out" />
            </span>
            {out.title}
          </p>
          <p className={styles.sideText}>{out.text}</p>
          <ul>
            {out.items.map((it) => (
              <li key={it.label}>{it.label}</li>
            ))}
          </ul>
        </div>
      </div>

      <ul className={styles.facts}>
        {privacy.facts.map((f, i) => (
          <li key={f.title} style={{ "--i": i }}>
            <span className={styles.factIcon}>
              <Icon name={f.icon} />
            </span>
            <span>
              <b>{f.title}</b>
              {f.text}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
