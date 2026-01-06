"use client";

import { JSX } from "react";
import styles from "./HomePage.module.scss";
import Introduction from "./introduction/Introduction";
import Details from "./details/Details";
import Skills from "./skills/Skills";
import { detailsData, profileData, skillsData } from "./data/Data";
import Top from "./top/Top";

export default function HomePage(): JSX.Element {
  return (
    <main className={styles.mainContent}>
      <section className={styles.aboutSection}>
        <Top />
        <Introduction
          nameJp={profileData.nameJp}
          nameEn={profileData.nameEn}
          profileImage={profileData.profileImage}
        />
        <Details details={detailsData} />
        <Skills skills={skillsData} />
      </section>
    </main>
  );
}
