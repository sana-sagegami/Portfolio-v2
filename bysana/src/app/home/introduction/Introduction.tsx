import React from "react";
import styles from './Introduction.module.scss';

interface IntroductionProps {
  nameJp: string;
  nameEn: string;
  profileImage?: string;
}

const Introduction: React.FC<IntroductionProps> = ({
  nameJp,
  nameEn,
  profileImage,
}) => {
  return (
    <div className={styles.introductionSection}>
      <div className={styles.profileContainer}>
        <div className={styles.profileImageBg}>
          <div className={styles.profileImageWrapper}>
            {profileImage ? (
              <img
                src={profileImage}
                alt={nameJp}
                className={styles.profileImage}
              />
            ) : (
              <div className={styles.profilePlaceholder}>Profile Image</div>
            )}
          </div>
          <div className={styles.profileInfo}>
            <h2 className={styles.profileNameJp}>{nameJp}</h2>
            <h3 className={styles.profileNameEn}>{nameEn}</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Introduction;
