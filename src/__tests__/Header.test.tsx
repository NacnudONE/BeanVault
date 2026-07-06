import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from './test-utils';
import Header from '../components/Header';

beforeEach(() => localStorage.clear());

describe('Header — branding', () => {
  it('renders the BEANVAULT logo text', () => {
    renderWithProviders(<Header />);
    expect(screen.getByText('BEAN')).toBeInTheDocument();
    expect(screen.getByText('VAULT')).toBeInTheDocument();
  });
});

describe('Header — navigation', () => {
  it('renders all five nav links', () => {
    renderWithProviders(<Header />);
    ['Home', 'Shop', 'About', 'Blog', 'Contact'].forEach(label => {
      expect(screen.getAllByText(label).length).toBeGreaterThan(0);
    });
  });
});

describe('Header — cart badge', () => {
  it('does not show a badge when the cart is empty', () => {
    renderWithProviders(<Header />);
    // badge only renders when cartCount > 0
    expect(screen.queryByText('0')).not.toBeInTheDocument();
  });

  it('shows the correct badge count when cart is pre-populated in localStorage', () => {
    localStorage.setItem(
      'bv_cart',
      JSON.stringify([
        { key: 'p1-250g-Whole Bean', id: 1, name: 'Test Coffee', price: 18, w: '250g', g: 'Whole Bean', qty: 5 },
      ]),
    );
    renderWithProviders(<Header />);
    expect(screen.getByText('5')).toBeInTheDocument();
  });
});

describe('Header — hamburger menu', () => {
  it('hamburger button is present in the DOM', () => {
    renderWithProviders(<Header />);
    expect(document.querySelector('[aria-label="Toggle menu"]')).toBeTruthy();
  });

  it('clicking the hamburger opens the mobile nav', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Header />);

    const btn = document.querySelector('[aria-label="Toggle menu"]') as HTMLElement;
    const before = screen.getAllByText('Shop').length;
    await user.click(btn);
    const after = screen.getAllByText('Shop').length;
    // mobile dropdown adds a second set of nav links
    expect(after).toBeGreaterThan(before);
  });
});
