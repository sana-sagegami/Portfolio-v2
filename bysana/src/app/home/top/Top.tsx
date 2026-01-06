"use client";

import React, { useState, useEffect } from "react";
import styles from "./Top.module.scss";

const Top: React.FC = () => {
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
          ✧
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
          ✧
        </span>
      </div>

      {/* 背景 */}
      <div className={styles.profileTopBackground} />
      <div className={styles.profileBottomBackground} />

      {/* ABOUT ME タイトル */}
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
                  ? "rotate(-5deg) translateY(43px) translateX(5px)"
                  : i === 4
                  ? "rotate(5deg) translateY(43px) translateX(10px)"
                  : i === 6
                  ? "rotate(30deg) translateY(60px) translateX(20px)"
                  : "rotate(40deg) translateY(85px) translateX(40px)",
            }}
          >
            {letter}
          </span>
        ))}
      </h1>
    </div>
  );
};

export default Top;
