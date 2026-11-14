import { platforms } from "@/content/home";
import styles from "./platforms.module.css";

// The meeting apps MeetFly works with, as text (no logos), sliding past in an endless strip.
export function Platforms() {
  return (
    <section id="platforms" className={styles.section} aria-labelledby="platforms-title">
      <h2 id="platforms-title" className={styles.label}>
        {platforms.label}
      </h2>
      <div className={styles.marquee}>
        {/* Two copies, moved by half, so the loop has no seam. The second is hidden from screen readers. */}
        {[0, 1].map((copy) => (
          <ul key={copy} className={styles.track} aria-hidden={copy === 1 || undefined}>
            {platforms.items.map((item) => (
              <li key={item}>
                <i aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        ))}
      </div>
    </section>
  );
}
