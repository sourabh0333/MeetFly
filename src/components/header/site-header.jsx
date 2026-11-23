"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { nav } from "@/content/home";
import styles from "./site-header.module.css";

// At the top of the page the header is a wide white glass bar. Once you scroll it morphs into
// a small black "island", like a call indicator: the icon, a live voice meter, the menu and
// Download. Product and Use cases open dropdown panels (hover with a mouse, click or keyboard).
// On narrow screens a Menu button opens a sheet with every link.
export function SiteHeader() {
  const [island, setIsland] = useState(false);
  const [open, setOpen] = useState(-1); // which dropdown is open
  const [sheet, setSheet] = useState(false); // the phone menu
  const closeTimer = useRef(0);
  const barRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setIsland(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Escape or a click outside closes any open menu.
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") {
        setOpen(-1);
        setSheet(false);
      }
    };
    const onDown = (e) => {
      if (barRef.current && !barRef.current.contains(e.target)) setOpen(-1);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onDown);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onDown);
    };
  }, []);

  const enter = (i) => (e) => {
    if (e.pointerType !== "mouse") return;
    clearTimeout(closeTimer.current);
    setOpen(i);
  };
  const leave = (e) => {
    if (e.pointerType !== "mouse") return;
    closeTimer.current = setTimeout(() => setOpen(-1), 160);
  };
  const done = (e) => {
    setOpen(-1);
    setSheet(false);
    // Next.js links change the hash without a hashchange event, and a moment after the click.
    // Wait (up to 3s) until the address shows the new hash, then announce it so sections react.
    const target = e?.currentTarget?.hash;
    if (!target) return;
    const t0 = Date.now();
    const check = () => {
      if (window.location.hash === target) window.dispatchEvent(new Event("hashchange"));
      else if (Date.now() - t0 < 3000) setTimeout(check, 60);
    };
    check();
  };


  return (
    <header className={styles.header} data-island={island || undefined} data-sheet={sheet || undefined}>
      <div ref={barRef} className={styles.bar}>
        <Link className={styles.brand} href="/" aria-label="MeetFly, home" onClick={done}>
          {/* Brand kit files, unchanged: the full logo on light, the icon in the island. */}
          <img className={styles.wordmark} src="/brand/meetfly-on-light.svg" alt="" width="408" height="144" />
          <img className={styles.icon} src="/brand/icon.svg" alt="" width="64" height="64" />
        </Link>

        <span className={styles.live} aria-hidden="true">
          <span className={styles.meter}>
            <i />
            <i />
            <i />
            <i />
            <i />
          </span>
          {nav.live}
        </span>

        <nav className={styles.nav} aria-label="Main">
          {nav.links.map((link, i) =>
            link.menu ? (
              <div key={link.label} className={styles.item} onPointerEnter={enter(i)} onPointerLeave={leave}>
                {link.href ? (
                  // A menu with its own page: the word goes to the page, the arrow opens the menu.
                  <span className={styles.split} data-open={open === i || undefined}>
                    <Link className={styles.link} href={link.href} onClick={done}>
                      {link.label}
                    </Link>
                    <button
                      type="button"
                      className={styles.chev}
                      aria-expanded={open === i}
                      aria-controls={`menu-${i}`}
                      aria-label={`${link.label} menu`}
                      onClick={() => setOpen(open === i ? -1 : i)}
                    >
                      <svg viewBox="0 0 16 16" aria-hidden="true">
                        <path d="M4 6l4 4 4-4" />
                      </svg>
                    </button>
                  </span>
                ) : (
                  <button
                    type="button"
                    className={styles.link}
                    aria-expanded={open === i}
                    aria-controls={`menu-${i}`}
                    onClick={() => setOpen(open === i ? -1 : i)}
                  >
                    {link.label}
                    <svg viewBox="0 0 16 16" aria-hidden="true">
                      <path d="M4 6l4 4 4-4" />
                    </svg>
                  </button>
                )}
                <div id={`menu-${i}`} className={styles.panel} data-open={open === i || undefined}>
                  <div className={styles.groups}>
                    {link.menu.groups.map((g) => (
                      <div key={g.title} className={styles.group} data-wide={(g.items.length > 4 && !g.items[0].text) || undefined}>
                        <p className={styles.groupTitle}>{g.title}</p>
                        <ul>
                          {g.items.map((it) => (
                            <li key={it.href}>
                              <Link href={it.href} onClick={done} tabIndex={open === i ? 0 : -1}>
                                <b>{it.label}</b>
                                {it.text && <span>{it.text}</span>}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                  <Link className={styles.featured} href={link.menu.featured.href} onClick={done} tabIndex={open === i ? 0 : -1}>
                    <b>{link.menu.featured.label}</b>
                    <span>{link.menu.featured.text}</span>
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </Link>
                </div>
              </div>
            ) : (
              <Link key={link.href} className={styles.link} href={link.href} onClick={done}>
                {link.label}
              </Link>
            ),
          )}
        </nav>

        <Link className={styles.download} href={nav.download.href} onClick={done}>
          <svg viewBox="0 0 16 16" aria-hidden="true">
            <path d="M8 2.5v8M4.5 7l3.5 3.5L11.5 7M3 13.5h10" />
          </svg>
          <span>{nav.download.label}</span>
        </Link>

        <button
          type="button"
          className={styles.burger}
          aria-expanded={sheet}
          aria-controls="menu-sheet"
          aria-label={sheet ? nav.close : nav.menu}
          onClick={() => setSheet((s) => !s)}
        >
          <i />
          <i />
        </button>
      </div>

      {/* Phone menu: every link, grouped. */}
      <div id="menu-sheet" className={styles.sheet} data-open={sheet || undefined}>
        {nav.links.map((link) =>
          link.menu ? (
            <div key={link.label} className={styles.sheetGroup}>
              {link.href ? (
                <Link className={styles.sheetLink} href={link.href} onClick={done} tabIndex={sheet ? 0 : -1}>
                  {link.label}
                </Link>
              ) : (
                <p className={styles.groupTitle}>{link.label}</p>
              )}
              <ul>
                {link.menu.groups
                  .flatMap((g) => g.items)
                  .map((it) => (
                    <li key={it.href}>
                      <Link href={it.href} onClick={done} tabIndex={sheet ? 0 : -1}>
                        {it.label}
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
          ) : (
            <Link key={link.href} className={styles.sheetLink} href={link.href} onClick={done} tabIndex={sheet ? 0 : -1}>
              {link.label}
            </Link>
          ),
        )}
      </div>
    </header>
  );
}
