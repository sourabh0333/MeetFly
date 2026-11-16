import styles from "./section-head.module.css";

// The shared section header: a pill eyebrow, the title and a lead, centred. Rises in when the
// parent section has data-in (the parent sets it when first seen).
export function SectionHead({ id, eyebrow, title, lead }) {
  return (
    <header className={styles.head}>
      <p className={styles.eyebrow}>{eyebrow}</p>
      <h2 id={id} className={styles.title}>
        {title}
      </h2>
      {lead && <p className={styles.lead}>{lead}</p>}
    </header>
  );
}
