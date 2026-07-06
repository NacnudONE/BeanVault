import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from './test-utils';
import Shop from '../pages/Shop';
import { PRODUCTS } from '../data/products';

beforeEach(() => localStorage.clear());

function getSidebar() {
  return screen.getByRole('complementary');
}

describe('Shop — default state', () => {
  it('renders all products when no filters are active', () => {
    renderWithProviders(<Shop />);
    PRODUCTS.forEach(p => {
      expect(screen.getAllByText(p.name).length).toBeGreaterThan(0);
    });
  });

  it('shows the correct total product count', () => {
    renderWithProviders(<Shop />);
    expect(screen.getByText(`${PRODUCTS.length} products`)).toBeInTheDocument();
  });
});

describe('Shop — roast filter', () => {
  it('filters to only Light roast products when Light is clicked', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Shop />);

    await user.click(within(getSidebar()).getByText('Light'));

    const lightProducts = PRODUCTS.filter(p => p.roast === 'Light');
    const darkProducts = PRODUCTS.filter(p => p.roast === 'Dark');

    lightProducts.forEach(p => {
      expect(screen.getAllByText(p.name).length).toBeGreaterThan(0);
    });
    darkProducts.forEach(p => {
      expect(screen.queryAllByText(p.name)).toHaveLength(0);
    });
  });

  it('shows updated product count after filtering', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Shop />);

    await user.click(within(getSidebar()).getByText('Light'));

    const lightCount = PRODUCTS.filter(p => p.roast === 'Light').length;
    expect(screen.getByText(`${lightCount} products`)).toBeInTheDocument();
  });

  it('shows active filter tag with label "Roast: Light"', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Shop />);

    await user.click(within(getSidebar()).getByText('Light'));

    expect(screen.getByText('Roast: Light')).toBeInTheDocument();
  });

  it('clears individual filter when × on the tag is clicked', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Shop />);

    await user.click(within(getSidebar()).getByText('Light'));
    expect(screen.getByText('Roast: Light')).toBeInTheDocument();

    await user.click(screen.getByText('×'));

    expect(screen.getByText(`${PRODUCTS.length} products`)).toBeInTheDocument();
    expect(screen.queryByText('Roast: Light')).not.toBeInTheDocument();
  });
});

describe('Shop — sort', () => {
  it('sort select renders all options', () => {
    renderWithProviders(<Shop />);
    const select = screen.getByRole('combobox');
    expect(select).toBeInTheDocument();
    expect(within(select).getByText('Most Popular')).toBeInTheDocument();
    expect(within(select).getByText('Price: Low to High')).toBeInTheDocument();
  });

  it('sorts by price ascending — cheapest product appears first', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Shop />);

    await user.selectOptions(screen.getByRole('combobox'), 'price-asc');

    const cheapest = [...PRODUCTS].sort((a, b) => a.price - b.price)[0];
    const headings = screen.getAllByRole('heading', { level: 3 });
    const productHeadings = headings.filter(h => h.textContent !== 'Filters');
    expect(productHeadings[0]).toHaveTextContent(cheapest.name);
  });
});

describe('Shop — clear all filters', () => {
  it('"Clear all" button appears when a filter is active', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Shop />);

    await user.click(within(getSidebar()).getByText('Espresso'));

    expect(screen.getByRole('button', { name: /clear all/i })).toBeInTheDocument();
  });

  it('"Clear all" resets all filters and hides the tag bar', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Shop />);

    await user.click(within(getSidebar()).getByText('Espresso'));
    await user.click(screen.getByRole('button', { name: /clear all/i }));

    expect(screen.getByText(`${PRODUCTS.length} products`)).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /clear all/i })).not.toBeInTheDocument();
  });
});
