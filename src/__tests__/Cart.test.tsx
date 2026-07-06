import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from './test-utils';
import Cart from '../pages/Cart';

const cartItem = {
  key: 'p1-250g-Whole Bean',
  id: 1,
  name: 'Ethiopian Yirgacheffe',
  price: 22,
  w: '250g',
  g: 'Whole Bean',
  qty: 2,
};

beforeEach(() => localStorage.clear());

describe('Cart — empty state', () => {
  it('shows the empty cart message', () => {
    renderWithProviders(<Cart />);
    expect(screen.getByText(/your cart is empty/i)).toBeInTheDocument();
  });

  it('shows the Start Shopping button', () => {
    renderWithProviders(<Cart />);
    expect(screen.getByRole('button', { name: /start shopping/i })).toBeInTheDocument();
  });

  it('does not render the order summary', () => {
    renderWithProviders(<Cart />);
    expect(screen.queryByText(/order summary/i)).not.toBeInTheDocument();
  });
});

describe('Cart — with items', () => {
  beforeEach(() => {
    localStorage.setItem('bv_cart', JSON.stringify([cartItem]));
  });

  it('renders item name', () => {
    renderWithProviders(<Cart />);
    expect(screen.getByText('Ethiopian Yirgacheffe')).toBeInTheDocument();
  });

  it('renders item weight and grind', () => {
    renderWithProviders(<Cart />);
    expect(screen.getByText(/250g.*Whole Bean/i)).toBeInTheDocument();
  });

  it('renders the order summary', () => {
    renderWithProviders(<Cart />);
    expect(screen.getByText(/order summary/i)).toBeInTheDocument();
  });

  it('shows the Proceed to Checkout button', () => {
    renderWithProviders(<Cart />);
    expect(screen.getByRole('button', { name: /proceed to checkout/i })).toBeInTheDocument();
  });

  it('removes item when Remove button is clicked', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Cart />);

    const removeBtn = screen.getByRole('button', { name: /remove/i });
    await user.click(removeBtn);

    expect(screen.getByText(/your cart is empty/i)).toBeInTheDocument();
  });

  it('increases quantity when + is clicked', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Cart />);

    const plusBtn = screen.getByRole('button', { name: '+' });
    await user.click(plusBtn);

    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('decreases quantity when − is clicked (minimum 1)', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Cart />);

    const minusBtn = screen.getByRole('button', { name: '−' });
    await user.click(minusBtn);

    expect(screen.getByText('1')).toBeInTheDocument();
  });
});
