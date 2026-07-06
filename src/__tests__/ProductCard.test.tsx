import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from './test-utils';
import ProductCard from '../components/ProductCard';
import type { Product } from '../data/types';

const product: Product = {
  id: 1,
  slug: 'ethiopian-yirgacheffe',
  name: 'Ethiopian Yirgacheffe',
  origin: 'Ethiopia',
  roast: 'Light',
  price: 22,
  rating: 5,
  reviews: 234,
  flavors: ['Floral', 'Citrus'],
  description: 'A wonderful light roast.',
  brewing: ['Heat water to 93°C'],
};

beforeEach(() => localStorage.clear());

describe('ProductCard — rendering', () => {
  it('renders the product name', () => {
    renderWithProviders(<ProductCard product={product} />);
    expect(screen.getByText('Ethiopian Yirgacheffe')).toBeInTheDocument();
  });

  it('renders the origin', () => {
    renderWithProviders(<ProductCard product={product} />);
    expect(screen.getByText('Ethiopia')).toBeInTheDocument();
  });

  it('renders the formatted price for 250g', () => {
    renderWithProviders(<ProductCard product={product} />);
    expect(screen.getByText('$22.00')).toBeInTheDocument();
  });

  it('renders the roast badge', () => {
    renderWithProviders(<ProductCard product={product} />);
    expect(screen.getByText('Light')).toBeInTheDocument();
  });

  it('renders the Add to Cart button', () => {
    renderWithProviders(<ProductCard product={product} />);
    expect(screen.getByRole('button', { name: /add to cart/i })).toBeInTheDocument();
  });
});

describe('ProductCard — interactions', () => {
  it('clicking Add to Cart does not throw', async () => {
    const user = userEvent.setup();
    renderWithProviders(<ProductCard product={product} />);
    const btn = screen.getByRole('button', { name: /add to cart/i });
    await user.click(btn);
  });
});
