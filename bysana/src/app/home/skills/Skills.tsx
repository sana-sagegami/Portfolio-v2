
import React from "react";
import styles from './Skills.module.scss';

export interface Skill {
  name: string;
  icon: string;
  image?: string; // アイコン画像のパス（オプション）
}

interface SkillsProps {
  skills: Skill[];
}

const Skills: React.FC<SkillsProps> = ({ skills }) => {
  return (
    <section className={styles.skillsSection}>
      <h2 className={styles.skillsTitle}>Skills</h2>
      <div className={styles.logoGlow} />

      <div className={styles.skillsContainer}>
        <div className={styles.skillsGrid}>
          {skills.map((skill, i) => (
            <div key={i} className={styles.skillItem}>
              {skill.image ? (
                <img
                  src={skill.image}
                  alt={skill.name}
                  className={styles.skillIcon}
                />
              ) : (
                <span className={styles.skillIcon}>{skill.icon}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
