"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { nav } from "@/content/home";
import styles from "./site-header.module.css";

// At the top of the page the header is a wide white glass bar. Once you scroll it morphs into
// a small black "island", like a call indicator: the icon, a live voice meter, and Download.
export function SiteHeader() {
  const [island, setIsland] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsland(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={styles.header} data-island={island || undefined}>
      <div className={styles.bar}>
        <Link className={styles.brand} href="/" aria-label="MeetFly, home">
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
          {nav.links.map((link) => (
            <Link key={link.href} className={styles.link} href={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>

        <Link className={styles.download} href={nav.download.href}>
          <svg viewBox="0 0 16 16" aria-hidden="true">
            <path d="M8 2.5v8M4.5 7l3.5 3.5L11.5 7M3 13.5h10" />
          </svg>
          <span>{nav.download.label}</span>
        </Link>
      </div>
    </header>
  );
}
