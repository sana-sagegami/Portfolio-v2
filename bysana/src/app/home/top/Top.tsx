"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
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

  const profileRef = React.useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const measure = () => {
      const el = profileRef.current;
      if (el) {
        const w = el.offsetWidth;
        const r = Math.round(w / 2) + 50; // 写真や円からさらに離す
        // グローバルな CSS 変数に設定してインラインスタイルを避ける
        try {
          document.documentElement.style.setProperty(
            "--about-radius",
            `${r}px`
          );
        } catch {
          // ignore
        }
      }
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  return (
    <div className={styles.topSection}>
      {/* 星 */}
      <div className={styles.decorativeStars}>
        <Image
          src="/assets/design/starsingle_br.svg"
          width={32}
          height={35}
          className={`${styles.star} ${styles.star1}`}
          style={
            {
              "--parallax": `-${parallaxOffset * 0.5}px`,
            } as React.CSSProperties
          }
          alt=""
        />
        <Image
          src="/assets/design/starsingle_br.svg"
          width={22}
          height={24}
          className={`${styles.star} ${styles.star2}`}
          style={
            {
              "--parallax": `-${parallaxOffset * 0.6}px`,
            } as React.CSSProperties
          }
          alt=""
        />
        <Image
          src="/assets/design/starsingle_br.svg"
          width={20}
          height={22}
          className={`${styles.star} ${styles.star3}`}
          style={
            {
              "--parallax": `-${parallaxOffset * 0.7}px`,
            } as React.CSSProperties
          }
          alt=""
        />
        <Image
          src="/assets/design/starsingle_br.svg"
          width={24}
          height={26}
          className={`${styles.star} ${styles.star4}`}
          style={
            {
              "--parallax": `-${parallaxOffset * 0.8}px`,
            } as React.CSSProperties
          }
          alt=""
        />
      </div>

      {/* 背景 */}
      <div className={styles.profileTopBackground} />
      <div className={styles.profileBottomBackground} />

      {/* ABOUTME を円周に沿わせる */}
      <div className={styles.profileContainer}>
        <div className={styles.profileImageBg} ref={profileRef}>
          <h1 className={styles.aboutTitle} aria-hidden>
            {["A", "B", "O", "U", "T", "M", "E"].map((letter, i) => (
              <span
                key={i}
                className={
                  letter === " " ? styles.aboutSpacer : styles.aboutLetter
                }
              >
                {letter}
              </span>
            ))}
          </h1>

          <div className={styles.profileImageWrapper}>
            {profileImage ? (
              <Image
                src={profileImage}
                alt={nameJp}
                className={styles.profileImage}
                width={380}
                height={380}
                priority={false}
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

      {/* プロフィール画像とテキスト */}
    </div>
  );
};

export default Top;
