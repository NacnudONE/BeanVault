import type { Product } from './data/types';

export function starString(rating: number): string {
  const r = Math.round(rating);
  return '★★★★★'.slice(0, r) + '☆☆☆☆☆'.slice(r);
}

const WEIGHT_MULT: Record<string, number> = { '250g': 1, '500g': 1.8, '1kg': 3.2 };

export function priceFor(product: Product, weight: string): number {
  return product.price * (WEIGHT_MULT[weight] ?? 1);
}

export function formatPrice(n: number): string {
  return `$${n.toFixed(2)}`;
}
