import { ProductDetailData } from "../types/domin/ProductDetailData";
import styles from "./ProductDetails.module.scss";

interface ProductDetailProps {
  product: ProductDetailData;
  onBack: () => void;
}

export const ProductDetail: React.FC<ProductDetailProps> = ({
  product,
  onBack,
}) => {
  const isYohaku = product.id === "yohaku";

  return (
    <main className={styles.detailMain}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <h1 className={styles.logoTitle}>
          {isYohaku ? (
            <>
              <span className={styles.logoYo}>{product.logoYo}</span>{" "}
              <span className={styles.logoHaku}>{product.logoHaku}</span>
            </>
          ) : (
            product.logoText
          )}
        </h1>
        <div className={styles.logoImageWrap}>
          {product.logoSvg ? (
            <img
              src={product.logoSvg}
              alt={product.logoText}
              className={styles.logoImage}
            />
          ) : null}
          <div className={styles.logoGlow} />
        </div>
      </section>

      {/* Summary Section */}
      <section className={styles.summarySection}>
        <h2 className={styles.sectionTitle}>
          <span>概要</span>
        </h2>
        <p className={styles.summaryText}>{product.summary}</p>
      </section>

      {/* Role Section */}
      {product.role && (
        <section className={styles.summarySection}>
          <h2 className={styles.sectionTitle}>
            <span>担当箇所</span>
          </h2>
          <p className={styles.summaryText}>{product.role}</p>
        </section>
      )}

      {/* Tech Stack Section */}
      <section className={styles.stackSection}>
        <h2 className={styles.sectionTitle}>
          <span>技術スタック</span>
        </h2>
        <div className={styles.stackList}>
          <ul>
            {product.techStack.flat().map((tech, j) => (
              <li key={j}>{tech}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* KeyPoints Section */}
      <section className={styles.summarySection}>
        <h2 className={styles.sectionTitle}>
          <span>工夫点</span>
        </h2>
        <p className={styles.summaryText}>{product.keyPoints}</p>
      </section>

      {/* Screens Section */}
      <section className={styles.screensSection}>
        <h2 className={styles.sectionTitle}>
          <span>画面</span>
        </h2>
        {product.screens.map((screenGroup, groupIndex) => (
          <div key={groupIndex} className={styles.screenGroup}>
            <h3 className={styles.screenGroupTitle}>{screenGroup.title}</h3>
            <div
              className={`${styles.screensGrid} ${
                isYohaku ||
                product.id === "librarium" ||
                product.id === "sleepGuard"
                  ? styles.verticalLayout
                  : ""
              } ${screenGroup.images.length === 2 ? styles.twoColumns : ""}`}
            >
              {screenGroup.images.map((screen, i) => (
                <div key={i} className={styles.screenItem}>
                  <img
                    src={screen}
                    alt={`${product.logoText} ${screenGroup.title} ${i + 1}`}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* Back Button */}
      <div className={styles.backBtnWrap}>
        <button onClick={onBack} className={styles.backBtn}>
          ← Productsページに戻る
        </button>
      </div>
    </main>
  );
};
