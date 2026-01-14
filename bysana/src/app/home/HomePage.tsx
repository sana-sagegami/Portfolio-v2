"use client";

import { JSX } from "react";
import styles from "./HomePage.module.scss";
import Details from "./details/Details";
import Skills from "./skills/Skills";
import { detailsData, profileData, skillsData } from "./data/Data";
import Top from "./top/Top";
import { useRouter } from "next/navigation";

export default function HomePage(): JSX.Element {
  const router = useRouter();

  const handlePd = () => {
    router.push("/products");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <main className={styles.mainContent}>
      <section className={styles.aboutSection}>
        <Top
          nameJp={profileData.nameJp}
          nameEn={profileData.nameEn}
          profileImage={profileData.profileImage}
        />
        <Details details={detailsData} />
        <Skills skills={skillsData} />
        <div className={styles.ProductsBtnWrap}>
          <button className={styles.ProductsBtn} onClick={handlePd}>
            Productsページへはこちら→
          </button>
        </div>
      </section>
    </main>
  );
}
