import type { ReactElement } from 'react';
import { render } from '@testing-library/react';
import type { RenderOptions } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { CartProvider } from '../context/CartContext';
import { ToastProvider } from '../context/ToastContext';

function AllProviders({ children }: { children: React.ReactNode }) {
  return (
    <MemoryRouter>
      <CartProvider>
        <ToastProvider>{children}</ToastProvider>
      </CartProvider>
    </MemoryRouter>
  );
}

export function renderWithProviders(
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) {
  return render(ui, { wrapper: AllProviders, ...options });
}

export type { RenderOptions };
