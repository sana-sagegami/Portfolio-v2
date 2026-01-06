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

        {/* デモ用表示 */}
        <div style={{ padding: "4rem 2rem", textAlign: "center" }}>
          <h1
            style={{ fontSize: "2.5rem", marginBottom: "2rem", color: "#333" }}
          >
            Home Page
          </h1>
          <div
            style={{
              background: "white",
              borderRadius: "1rem",
              padding: "2rem",
              maxWidth: "800px",
              margin: "0 auto",
              boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
            }}
          >
            <h2 style={{ color: "#d4a574", marginBottom: "1rem" }}>
              コンポーネント構成
            </h2>
            <ul style={{ textAlign: "left", lineHeight: 2, color: "#555" }}>
              <li>
                ✓ <strong>Top.tsx</strong> - About Meタイトルと装飾
              </li>
              <li>
                ✓ <strong>Introduction.tsx</strong> - プロフィール画像と名前
              </li>
              <li>
                ✓ <strong>Details.tsx</strong> - 出身、誕生日、大学、担当
              </li>
              <li>
                ✓ <strong>Skills.tsx</strong> - スキル一覧
              </li>
            </ul>
            <p style={{ marginTop: "1.5rem", color: "#666" }}>
              各コンポーネントをインポートして組み合わせることで
              <br />
              責任を明確に分離した保守性の高いコードになります
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
