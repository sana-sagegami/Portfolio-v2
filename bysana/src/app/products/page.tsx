import { productsData } from "./types/Data";
import ProductsClient from "./ProductsClient";

export default function Products() {
  return <ProductsClient products={productsData} />;
}
