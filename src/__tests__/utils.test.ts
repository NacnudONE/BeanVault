import { starString, priceFor, formatPrice } from '../utils';
import type { Product } from '../data/types';

const base: Product = {
  id: 1,
  slug: 'test',
  name: 'Test Coffee',
  origin: 'Ethiopia',
  roast: 'Medium',
  price: 18,
  rating: 4.5,
  reviews: 100,
  flavors: ['Chocolate'],
  description: 'A test coffee.',
  brewing: ['Step 1'],
};

describe('starString', () => {
  it('returns all filled stars for rating 5', () => {
    expect(starString(5)).toBe('★★★★★');
  });

  it('returns all empty stars for rating 0', () => {
    expect(starString(0)).toBe('☆☆☆☆☆');
  });

  it('returns mixed stars for rating 3', () => {
    expect(starString(3)).toBe('★★★☆☆');
  });

  it('rounds 4.6 up to 5 filled stars', () => {
    expect(starString(4.6)).toBe('★★★★★');
  });

  it('rounds 4.4 down to 4 filled stars', () => {
    expect(starString(4.4)).toBe('★★★★☆');
  });
});

describe('priceFor', () => {
  it('returns base price for 250g (×1.0)', () => {
    expect(priceFor(base, '250g')).toBe(18);
  });

  it('applies 1.8× for 500g', () => {
    expect(priceFor(base, '500g')).toBeCloseTo(32.4);
  });

  it('applies 3.2× for 1kg', () => {
    expect(priceFor(base, '1kg')).toBeCloseTo(57.6);
  });

  it('falls back to base price for unknown weight', () => {
    expect(priceFor(base, '2kg')).toBe(18);
  });
});

describe('formatPrice', () => {
  it('formats whole number as $N.00', () => {
    expect(formatPrice(18)).toBe('$18.00');
  });

  it('formats one decimal as $N.X0', () => {
    expect(formatPrice(32.4)).toBe('$32.40');
  });

  it('formats zero', () => {
    expect(formatPrice(0)).toBe('$0.00');
  });

  it('rounds to 2 decimal places', () => {
    expect(formatPrice(10.999)).toBe('$11.00');
  });
});
