export interface Product {
  productId: number;
  name: string;
  description: string;
  price: number;
  imgName: string;
  sku: string;
  unit: string;
  supplierId: number;
  discount?: number;
}

/**
 * Effective unit price after applying an optional discount, matching the
 * display logic used across the storefront (Products.tsx).
 */
export function getEffectiveUnitPrice(product: Product): number {
  return product.discount
    ? product.price * (1 - product.discount)
    : product.price;
}
