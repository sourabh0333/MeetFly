import { featureGroups, featuresPage } from "@/content/features";
import { DecodeText } from "@/components/hero/decode-text";
import { MagneticLink } from "@/components/hero/magnetic-link";
import { FeatureReels } from "./feature-reels";
import styles from "./features-hero.module.css";

// The Features page hero: a big centred headline, then the feature reels (feature-reels.jsx).
export function FeaturesHero() {
  return (
    <section id="features-top" className={styles.hero} aria-labelledby="features-title">
      <div className={styles.bg} aria-hidden="true">
        <span className={styles.glowA} />
        <span className={styles.glowB} />
      </div>

      {/* The centred headline. */}
      <div className={styles.head}>
        <p className={styles.eyebrow}>
          <span className={styles.tag}>
            <i aria-hidden="true" />
            {featureGroups.reduce((n, g) => n + g.items.length, 0)} {featuresPage.eyebrow.tag}
          </span>
          {featuresPage.eyebrow.text}
        </p>
        <h1 id="features-title" className={styles.title}>
          <span className={styles.sr}>
            {featuresPage.title.top} {featuresPage.title.prefix} {featuresPage.title.mark}
          </span>
          <span aria-hidden="true" className={styles.line1}>
            <DecodeText text={featuresPage.title.top} />
          </span>
          <span aria-hidden="true" className={styles.line2}>
            {featuresPage.title.prefix}{" "}
            <span className={styles.mark}>
              {featuresPage.title.mark}
              <svg viewBox="0 0 300 24" preserveAspectRatio="none" aria-hidden="true">
                <path pathLength="1" d="M4 16 C 60 6, 120 20, 180 11 S 270 8, 296 12" />
              </svg>
            </span>
          </span>
        </h1>
        <p className={styles.lead}>{featuresPage.lead}</p>
        <div className={styles.actions}>
          <MagneticLink className={styles.primary} href={featuresPage.primary.href}>
            <span>{featuresPage.primary.label}</span>
            <svg viewBox="0 0 16 16" aria-hidden="true">
              <path d="M8 2.5v8M4.5 7l3.5 3.5L11.5 7M3 13.5h10" />
            </svg>
          </MagneticLink>
          <a className={styles.secondary} href={featuresPage.secondary.href}>
            <span className={styles.play} aria-hidden="true">
              <svg viewBox="0 0 16 16">
                <path d="M6 4.5v7l5.5-3.5z" />
              </svg>
            </span>
            {featuresPage.secondary.label}
          </a>
        </div>
      </div>

      <div className={styles.reels}>
        <FeatureReels />
      </div>
    </section>
  );
}
