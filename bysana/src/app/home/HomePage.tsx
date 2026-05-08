"use client";

import { JSX } from "react";
import styles from "./HomePage.module.scss";
import Details from "./details/Details";
import Skills from "./skills/Skills";
import { detailsData, profileData, skillsData } from "./data/Data";
import Top from "./top/Top";
import { useRouter } from "next/navigation";
import ProductCard from "@/src/app/products/components/ProductCard";
import { productsData } from "@/src/app/products/types/Data";

export default function HomePage(): JSX.Element {
  const router = useRouter();

  const handleProductClick = (productId: string) => {
    router.push(`/products/${productId}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleAllProducts = () => {
    router.push("/products");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const previewProducts = productsData.slice(0, 2);

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
        <div className={styles.productsPreviewSection}>
          <div className={styles.productsPreviewFrame}>
            <div className={styles.productsFrameHeader}>
              <span className={styles.productsFrameLabel}>Products</span>
            </div>
            <div className={styles.productsPreviewGrid}>
              {previewProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onDetailClick={handleProductClick}
                />
              ))}
            </div>
            <div className={styles.productsFrameFooter}>
              <button type="button" className={styles.ProductsBtn} onClick={handleAllProducts}>
                <span>Products一覧を見る</span>
                <span className={styles.ProductsBtnArrow}>→</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
