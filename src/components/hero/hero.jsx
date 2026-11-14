import { hero } from "@/content/home";
import { HeroFx } from "./hero-fx";
import { MagneticLink } from "./magnetic-link";
import { HeroStage } from "./hero-stage";
import { DecodeText } from "./decode-text";
import { RotatingWord } from "./rotating-word";
import styles from "./hero.module.css";

export function Hero() {
  return (
    <HeroFx className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.bg} aria-hidden="true">
        <span className={styles.glowA} />
        <span className={styles.glowB} />
        <span className={styles.grid} />
        <span className={styles.spot} />
      </div>

      <div className={styles.inner}>
        <p className={styles.eyebrow}>
          <span className={styles.tag}>
            <i aria-hidden="true" />
            {hero.eyebrow.tag}
          </span>
          {hero.eyebrow.text}
        </p>

        <h1 id="hero-title" className={styles.title}>
          <span className={styles.sr}>{hero.title.label}</span>
          <span aria-hidden="true" className={styles.top}>
            <DecodeText text={hero.title.top} />
          </span>
          <span aria-hidden="true" className={styles.bottom}>
            {hero.title.prefix} <RotatingWord words={hero.title.words} />
          </span>
        </h1>

        <p className={styles.lead}>{hero.lead}</p>

        <div className={styles.actions}>
          <MagneticLink className={styles.primary} href={hero.primary.href}>
            <span>{hero.primary.label}</span>
            <svg viewBox="0 0 16 16" aria-hidden="true">
              <path d="M8 2.5v8M4.5 7l3.5 3.5L11.5 7M3 13.5h10" />
            </svg>
          </MagneticLink>
          <a className={styles.secondary} href={hero.secondary.href}>
            <span className={styles.play} aria-hidden="true">
              <svg viewBox="0 0 16 16">
                <path d="M6 4.5v7l5.5-3.5z" />
              </svg>
            </span>
            {hero.secondary.label}
          </a>
        </div>

        <ul className={styles.trust}>
          {hero.trust.map((item) => (
            <li key={item}>
              <svg viewBox="0 0 16 16" aria-hidden="true">
                <path d="M3.5 8.5l3 3 6-7" />
              </svg>
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div id="demo" className={styles.stageWrap}>
        <HeroStage />
      </div>
    </HeroFx>
  );
}
