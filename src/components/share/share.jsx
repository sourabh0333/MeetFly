"use client";

import { useEffect, useRef, useState } from "react";
import { share as s } from "@/content/home";
import { SectionHead } from "@/components/section-head/section-head";
import { useOnScreen, useSeen } from "@/components/use-seen";
import styles from "./share.module.css";

// "Where your notes go": a 3D card carousel. Every destination the app has (Copy: summary,
// Markdown, rich text, for Slack · Save: PDF, Word, Markdown file · Send: follow-up email, webhook,
// Slack webhook) is a card showing the same pilot-call notes in that format. The picked card faces
// front; its neighbours fan back on either side (rotateY, scale, fade), so the row reads as one
// note turning into ten formats. Under it, one ruled index: the three groups with their
// destinations as pills, ← → buttons and a counter. It keeps turning by itself while on screen;
// picking a card (pill, arrow or a side card) restarts the wait from there.
// Three ruled facts under it. Everything is what the app does.
const STEP_MS = 3600;
const all = s.groups.flatMap((g) => g.items.map((it) => ({ ...it, group: g.label, groupId: g.id })));

const Chevron = ({ dir }) => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d={dir === "prev" ? "M19 12H6M11 6l-6 6 6 6" : "M5 12h13M13 6l6 6-6 6"} />
  </svg>
);

const Icon = ({ group }) => (
  <svg viewBox="0 0 20 20" aria-hidden="true">
    {group === "copy" && <path d="M7 7h9v10H7zM4 13V3h9" />}
    {group === "save" && <path d="M10 3v10M6 9l4 4 4-4M4 16h12" />}
    {group === "send" && <path d="M3 10l14-6-5 13-2.5-5.5z" />}
  </svg>
);

function Markdown() {
  return (
    <pre className={styles.code} data-kind="md">
      <span className={styles.mdH}># {s.meeting.title}</span>
      {"\n"}
      <span className={styles.mdB}>**{s.meeting.meta}**</span>
      {"\n\n"}
      <span className={styles.mdH}>## Summary</span>
      {"\n"}
      {s.summary}
      {"\n\n"}
      <span className={styles.mdH}>## Action items</span>
      {s.actions.map((a) => (
        <span key={a.task}>
          {"\n"}
          <span className={styles.mdB}>- [ ]</span> {a.task} ({a.owner}
          {a.due ? `, ${a.due}` : ""})
        </span>
      ))}
    </pre>
  );
}

function Page() {
  return (
    <div className={styles.page}>
      <p className={styles.pageTitle}>{s.meeting.title}</p>
      <p className={styles.pageMeta}>{s.meeting.meta}</p>
      <p className={styles.pageH}>Summary</p>
      <p className={styles.pageP}>{s.summary}</p>
      <p className={styles.pageH}>Action items</p>
      <ul>
        {s.actions.map((a) => (
          <li key={a.task}>
            <i aria-hidden="true" />
            {a.task}
            <em>
              {a.owner}
              {a.due ? ` · ${a.due}` : ""}
            </em>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Slack() {
  return (
    <div className={styles.slack}>
      <span className={styles.slackAv} aria-hidden="true">
        M
      </span>
      <div>
        <p className={styles.slackWho}>
          <b>MeetFly</b> <span>today</span>
        </p>
        <p>
          <b>{s.meeting.title}</b> · {s.meeting.meta}
        </p>
        <p>{s.summary}</p>
        <p>
          <b>Action items</b>
        </p>
        {s.actions.map((a) => (
          <p key={a.task}>
            • {a.task} — {a.owner}
            {a.due ? `, ${a.due}` : ""}
          </p>
        ))}
      </div>
    </div>
  );
}

function Email() {
  return (
    <div className={styles.email}>
      <p className={styles.emailRow}>
        <span>To</span>
        {s.email.to}
      </p>
      <p className={styles.emailRow}>
        <span>Subject</span>
        <b>{s.email.subject}</b>
      </p>
      <p className={styles.emailBody}>{s.email.body}</p>
      {s.actions.map((a) => (
        <p key={a.task} className={styles.emailItem}>
          • {a.task}
        </p>
      ))}
    </div>
  );
}

function Json() {
  const K = ({ children }) => <span className={styles.jk}>&quot;{children}&quot;</span>;
  const V = ({ children }) => <span className={styles.jv}>&quot;{children}&quot;</span>;
  const N = ({ children }) => <span className={styles.jn}>{children}</span>;
  return (
    <pre className={styles.code} data-kind="json">
      {"{\n  "}
      <K>event</K>: <V>meeting.shared</V>
      {",\n  "}
      <K>source</K>: <V>MeetFly</V>
      {",\n  "}
      <K>meeting</K>
      {": {\n    "}
      <K>title</K>: <V>{s.meeting.title}</V>
      {",\n    "}
      <K>durationSec</K>: <N>1440</N>
      {",\n    "}
      <K>summary</K>: <V>They like the proposal…</V>
      {",\n    "}
      <K>actionItems</K>
      {": [\n      { "}
      <K>task</K>: <V>Send pricing…</V>
      {", "}
      <K>done</K>: <N>false</N>
      {" }\n    ],\n    "}
      <K>notesMarkdown</K>: <V># Pilot call…</V>
      {"\n  }\n}"}
    </pre>
  );
}

const body = (it) => {
  if (it.view === "summary") return <p className={styles.plain}>{s.summary}</p>;
  if (it.view === "markdown") return <Markdown />;
  if (it.view === "page") return <Page />;
  if (it.view === "slack") return <Slack />;
  if (it.view === "email") return <Email />;
  return <Json />;
};

export function Share() {
  const ref = useRef(null);
  const seen = useSeen(ref, 0.08);
  const on = useOnScreen(ref, 0.08);
  const [i, setI] = useState(0);
  const [still, setStill] = useState(false);

  useEffect(() => setStill(window.matchMedia("(prefers-reduced-motion: reduce)").matches), []);

  useEffect(() => {
    // Keeps turning while on screen; picking a card just restarts the wait from it.
    if (!seen || !on || still) return undefined;
    const id = setTimeout(() => setI((k) => (k + 1) % all.length), STEP_MS);
    return () => clearTimeout(id);
  }, [seen, on, still, i]);

  const go = (k) => setI((k + all.length) % all.length);
  const it = all[i];

  return (
    <section id="share" ref={ref} className={styles.section} data-in={seen || undefined} aria-labelledby="share-title">
      <SectionHead id="share-title" eyebrow={s.eyebrow} title={s.title} lead={s.lead} />

      <div>
        {/* The carousel */}
        <div className={styles.stage} aria-roledescription="carousel" aria-label={s.eyebrow}>
          {all.map((d, k) => {
            // Shortest way round, so the row wraps from the last card to the first.
            let off = k - i;
            if (off > all.length / 2) off -= all.length;
            if (off < -all.length / 2) off += all.length;
            const far = Math.abs(off) > 2;
            return (
              <article
                key={d.id}
                className={styles.card}
                data-front={off === 0 || undefined}
                data-far={far || undefined}
                data-view={d.view}
                style={{ "--off": off, "--abs": Math.abs(off) }}
                aria-hidden={off !== 0 || undefined}
                onClick={() => off !== 0 && !far && go(k)}
              >
                <header className={styles.cardHead}>
                  <span className={styles.cardGroup}>
                    <Icon group={d.groupId} />
                    {d.group}
                  </span>
                  <b>{d.label}</b>
                  <span className={styles.cardTarget}>{d.target || d.file || d.hint}</span>
                </header>
                <div className={styles.cardBody}>{body(d)}</div>
              </article>
            );
          })}
        </div>

        {/* The index */}
        <div className={styles.index}>
          <button type="button" className={styles.arrow} data-dir="prev" onClick={() => go(i - 1)} aria-label="Previous format">
            <Chevron dir="prev" />
          </button>
          <div className={styles.groups} role="radiogroup" aria-label={s.eyebrow}>
            {s.groups.map((g) => (
              <div key={g.id} className={styles.group} data-active={it.groupId === g.id || undefined}>
                <span className={styles.groupLabel}>
                  <Icon group={g.id} />
                  {g.label}
                </span>
                <div className={styles.pills}>
                  {g.items.map((d) => {
                    const k = all.findIndex((x) => x.id === d.id);
                    return (
                      <button key={d.id} type="button" role="radio" aria-checked={k === i} onClick={() => go(k)}>
                        {d.label}
                        {k === i && seen && !still && (
                          <i key={i} className={styles.timer} style={{ "--step": `${STEP_MS}ms` }} aria-hidden="true" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
          <button type="button" className={styles.arrow} data-dir="next" onClick={() => go(i + 1)} aria-label="Next format">
            <Chevron dir="next" />
          </button>
        </div>
        <p className={styles.counter} aria-live="polite">
          <b>{String(i + 1).padStart(2, "0")}</b> / {String(all.length).padStart(2, "0")} · {it.group} · {it.label}
        </p>
      </div>

      <ul className={styles.facts}>
        {s.facts.map((f, k) => (
          <li key={f.title} style={{ "--k": k }}>
            <span>{String(k + 1).padStart(2, "0")}</span>
            <b>{f.title}</b>
            <p>{f.text}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
