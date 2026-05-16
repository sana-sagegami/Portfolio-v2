"use client";

import { useRouter } from "next/navigation";
import { ProductDetail } from "../components/ProductDetails";
import { productDetailsData } from "../types/Data";

export default function ProductDetailClient({
  productId,
}: {
  productId: string;
}) {
  const router = useRouter();
  const product = productDetailsData[productId as keyof typeof productDetailsData];

  const handleBack = () => {
    router.push("/products");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!product) return <div>Product not found</div>;

  return <ProductDetail product={product} onBack={handleBack} />;
}
