import React from "react";
import styles from './Details.module.scss';

export interface DetailItem {
  label: string;
  value: string;
}

interface DetailsProps {
  details: DetailItem[];
}

const Details: React.FC<DetailsProps> = ({ details }) => {
  return (
    <section className={styles.detailsSection}>
      <div className={styles.detailsGrid}>
        {details.map((item, i) => (
          <div key={i} className={styles.detailItem}>
            <span className={styles.detailLabel}>{item.label}</span>
            <span className={styles.detailValue}>{item.value}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Details;
