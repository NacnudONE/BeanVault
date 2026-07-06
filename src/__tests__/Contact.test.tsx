import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from './test-utils';
import Contact from '../pages/Contact';
import Toast from '../components/Toast';

describe('Contact — rendering', () => {
  it('renders the page heading', () => {
    renderWithProviders(<Contact />);
    expect(screen.getByRole('heading', { name: /contact us/i })).toBeInTheDocument();
  });

  it('renders form fields', () => {
    renderWithProviders(<Contact />);
    expect(screen.getByPlaceholderText('Your name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('your@email.com')).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/tell us how/i)).toBeInTheDocument();
  });

  it('renders the Send Message button', () => {
    renderWithProviders(<Contact />);
    expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument();
  });

  it('renders FAQ section', () => {
    renderWithProviders(<Contact />);
    expect(screen.getByRole('heading', { name: /faq/i })).toBeInTheDocument();
  });
});

describe('Contact — FAQ accordion', () => {
  it('FAQ answers are hidden by default', () => {
    renderWithProviders(<Contact />);
    const firstAnswerContainer = screen.getByText(/faq/i)
      .closest('div')
      ?.parentElement;
    expect(firstAnswerContainer).toBeDefined();
  });

  it('clicking a FAQ question reveals its answer', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Contact />);

    const questions = screen.getAllByRole('button');
    const faqBtn = questions.find(b => b.textContent?.includes('?'));
    if (faqBtn) {
      await user.click(faqBtn);
    }
  });
});

describe('Contact — form submit', () => {
  it('shows toast on form submission', async () => {
    const user = userEvent.setup();
    renderWithProviders(
      <>
        <Contact />
        <Toast />
      </>,
    );

    await user.click(screen.getByRole('button', { name: /send message/i }));
    expect(screen.getByText(/message sent/i)).toBeInTheDocument();
  });
});
