"use client";

import { useRouter } from "next/navigation";
import { ProductsPage } from "./components/ProductsPage";
import { Product } from "./types/Data";

interface Props {
  products: Product[];
}

export default function ProductsClient({ products }: Props) {
  const router = useRouter();

  const handleSelectProduct = (productId: string) => {
    router.push(`/products/${productId}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <ProductsPage products={products} onSelectProduct={handleSelectProduct} />
  );
}
