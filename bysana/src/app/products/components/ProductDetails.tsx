import { ProductDetailData } from "../data/Data";
import styles from "./ProductsPage.module.scss";

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

      {/* Tech Stack Section */}
      <section className={styles.stackSection}>
        <h2 className={styles.stackTitle}>
          <span className={styles.star}>✦</span>
          <span className={styles.stackText}>技術スタック</span>
          <span className={styles.star}>✦</span>
        </h2>
        <div className={styles.stackList}>
          {product.techStack.map((stack, i) => (
            <ul key={i}>
              {stack.map((tech, j) => (
                <li key={j}>{tech}</li>
              ))}
            </ul>
          ))}
        </div>
      </section>

      {/* Screens Section */}
      <section className={styles.screensSection}>
        <h2 className={styles.sectionTitle}>
          <span>画面</span>
        </h2>
        <div className={styles.screensGrid}>
          {product.screens.map((screen, i) => (
            <div key={i} className={styles.screenItem}>
              <img src={screen} alt={`${product.logoText} screen ${i + 1}`} />
            </div>
          ))}
        </div>
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
