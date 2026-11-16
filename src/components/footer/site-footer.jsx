import { footer } from "@/content/home";
import { siteConfig } from "@/config/site";
import styles from "./site-footer.module.css";

// The footer (light): brand and tagline,
// links to the page's sections, and a huge MeetFly wordmark glowing faintly at the very bottom.
// Only real links (sections on this page).
export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className={styles.footer}>
      <div className={styles.wrap}>
        <div className={styles.top}>
          <div className={styles.brand}>
            <img src="/brand/meetfly-on-light.svg" alt={siteConfig.name} width="150" height="34" />
            <p>{footer.tagline}</p>
          </div>
          <nav className={styles.groups} aria-label="Footer">
            {footer.groups.map((g) => (
              <div key={g.title}>
                <p className={styles.groupTitle}>{g.title}</p>
                <ul>
                  {g.links.map((l) => (
                    <li key={l.href}>
                      <a href={l.href}>{l.label}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className={styles.bottom}>
          <p>
            © {year} {siteConfig.name}. {footer.note}
          </p>
          <a href="#main" className={styles.top2}>
            Back to top ↑
          </a>
        </div>
      </div>

      <div className={styles.giant} aria-hidden="true">
        <img src="/brand/meetfly-on-light.svg" alt="" />
      </div>
    </footer>
  );
}
