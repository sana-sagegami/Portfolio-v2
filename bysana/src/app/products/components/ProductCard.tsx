import React from "react";
import Image from "next/image";
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
    <button
      type="button"
      className={styles.productCard}
      onClick={() => onDetailClick(product.id)}
      aria-label={`${product.title}の詳細を見る`}
      data-hover-color={product.color || "#ef9995"}
    >
      {/* アイコン */}
      <div className={styles.productIcon}>
        {product.icon ? (
          <Image
            src={product.icon}
            alt={product.title}
            width={100}
            height={100}
          />
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
      </div>
    </button>
  );
};

export default ProductCard;
