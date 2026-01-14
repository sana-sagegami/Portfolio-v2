import React from "react";
import styles from "./ProductCard.module.scss";
import { Product } from "../types/domin/Product";

interface ProductCardProps {
  product: Product;
  onDetailClick: (productId: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onDetailClick,
}) => {
  return (
    <div className={styles.productCard}>
      {/* アイコン */}
      <div className={styles.productIcon}>
        {product.icon ? (
          <img src={product.icon} alt={product.title} />
        ) : (
          <div className={styles.productIconPlaceholder}>
            {product.title.charAt(0)}
          </div>
        )}
      </div>

      {/* コンテンツ */}
      <div className={styles.productContent}>
        {/* タイトル */}
        <h3
          className={styles.productTitle}
          style={
            {
              "--hover-color": product.color || "#ef9995",
            } as React.CSSProperties
          }
        >
          {product.titleYo && product.titleHaku ? (
            <>
              <span className={styles.productTitleYo}>{product.titleYo}</span>{" "}
              <span className={styles.productTitleHaku}>
                {product.titleHaku}
              </span>
            </>
          ) : (
            product.title
          )}
        </h3>

        {/* 説明文 */}
        <p className={styles.productDescription}>{product.description}</p>

        {/* 受賞 */}
        {product.awards && product.awards.length > 0 && (
          <div className={styles.productAwards}>
            {product.awards.map((award, index) => (
              <span key={index} className={styles.awardBadge}>
                #{award}
              </span>
            ))}
          </div>
        )}

        {/* ボタン */}
        <div className={styles.productLinks}>
          <button
            className={styles.detailButton}
            onClick={() => onDetailClick(product.id)}
          >
            詳細へ
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
