import { productDetailsData } from "../types/Data";
import ProductDetailClient from "./ProductDetailClient";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = productDetailsData[id as keyof typeof productDetailsData];
  if (!product) {
    return <div>Product not found</div>;
  }

  return <ProductDetailClient product={product} />;
}
