"use client";

import { useRouter } from "next/navigation";
import { ProductDetail } from "../components/ProductDetails";
import { ProductDetailData } from "../types/domin/ProductDetailData";

export default function ProductDetailClient({
  product,
}: {
  product: ProductDetailData;
}) {
  const router = useRouter();

  const handleBack = () => {
    router.push("/products");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return <ProductDetail product={product} onBack={handleBack} />;
}
