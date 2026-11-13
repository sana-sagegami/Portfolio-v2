import { productDetailsData } from "../types/Data";
import ProductDetailClient from "./ProductDetailClient";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const exists = id in productDetailsData;
  if (!exists) {
    return <div>Product not found</div>;
  }

  return <ProductDetailClient productId={id} />;
}
