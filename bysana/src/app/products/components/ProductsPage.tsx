import React from "react";
import styles from "./ProductsPage.module.scss";
import  ProductCard from "./ProductCard";
import { Product } from "../data/Data";

interface ProductsPageProps {
  products: Product[];
  onSelectProduct: (productId: string) => void;
}


// Products一覧ページ
export const ProductsPage: React.FC<ProductsPageProps> = ({
  products,
  onSelectProduct,
}) => {
  return (
    <main className={styles.productsMain}>
      {/* ヘッダー */}
      <div className={styles.productsHeader}>
        <span className={styles.productsStar}>✦</span>
        <h1 className={styles.productsTitle}>Products</h1>
      </div>

      {/* プロダクトグリッド */}
      <div className={styles.productsGrid}>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onDetailClick={onSelectProduct}
          />
        ))}
      </div>
    </main>
  );
};

