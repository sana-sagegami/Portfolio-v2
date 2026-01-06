import React from "react";
import styles from './ProductCard.module.scss';


export interface Product {
  id: string;
  title: string;
  titleYo?: string; // Yo haku用
  titleHaku?: string; // Yo haku用
  description: string;
  icon?: string;
  githubUrl?: string;
}

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
        <h3 className={styles.productTitle}>
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

        {/* リンクとボタン */}
        <div className={styles.productLinks}>
          {product.githubUrl && (
            <a
              href={product.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.githubLink}
            >
              github
            </a>
          )}
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
