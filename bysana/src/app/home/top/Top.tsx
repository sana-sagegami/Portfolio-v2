"use client";

import React, { useState, useEffect } from "react";
import styles from "./Top.module.scss";

interface TopProps {
  nameJp: string;
  nameEn: string;
  profileImage?: string;
}

const Top: React.FC<TopProps> = ({ nameJp, nameEn, profileImage }) => {
  const [parallaxOffset, setParallaxOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setParallaxOffset(window.pageYOffset);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={styles.topSection}>
      {/* 星 */}
      <div className={styles.decorativeStars}>
        <span
          className={`${styles.star} ${styles.star1}`}
          style={{ transform: `translateY(-${parallaxOffset * 0.5}px)` }}
        >
          ✦
        </span>
        <span
          className={`${styles.star} ${styles.star2}`}
          style={{ transform: `translateY(-${parallaxOffset * 0.6}px)` }}
        >
          ✦
        </span>
        <span
          className={`${styles.star} ${styles.star3}`}
          style={{ transform: `translateY(-${parallaxOffset * 0.7}px)` }}
        >
          ✦
        </span>
        <span
          className={`${styles.star} ${styles.star4}`}
          style={{ transform: `translateY(-${parallaxOffset * 0.8}px)` }}
        >
          ✦
        </span>
      </div>

      {/* 背景 */}
      <div className={styles.profileTopBackground} />
      <div className={styles.profileBottomBackground} />

      <h1 className={styles.aboutTitle}>
        {["A", "B", "O", "U", "T", " ", "M", "E"].map((letter, i) => (
          <span
            key={i}
            style={{
              transform:
                i === 5
                  ? "translateY(60px) translateX(15px)"
                  : i === 0
                  ? "rotate(-50deg) translateY(76px) translateX(-55px)"
                  : i === 1
                  ? "rotate(-35deg) translateY(63px) translateX(-24px)"
                  : i === 2
                  ? "rotate(-20deg) translateY(52px) translateX(-5px)"
                  : i === 3
                  ? "rotate(-5deg) translateY(43px) translateX(3px)"
                  : i === 4
                  ? "rotate(5deg) translateY(40px) translateX(1px)"
                  : i === 6
                  ? "rotate(30deg) translateY(55px) translateX(20px)"
                  : "rotate(40deg) translateY(85px) translateX(40px)",
            }}
          >
            {letter}
          </span>
        ))}
      </h1>

      {/* プロフィール画像とテキスト */}
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

export default Top;
