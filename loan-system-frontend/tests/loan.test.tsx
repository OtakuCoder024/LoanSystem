import '@testing-library/jest-dom/vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import Dashboard from '../src/components/Dashboard';


globalThis.fetch = vi.fn(() =>
  Promise.resolve({
    ok: true,
    json: async () => [],
  })
) as any;

describe('Dashboard', () => {

  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    cleanup();
  });

  it('renders dashboard title', () => {
    localStorage.setItem('user', JSON.stringify({ id: 1, role: 'USER' }));

    render(<Dashboard />);

    expect(
      screen.getByRole('heading', { name: /Dashboard/i })
    ).toBeInTheDocument();
  });

  it('shows apply button for normal user', () => {
    localStorage.setItem('user', JSON.stringify({ id: 1, role: 'USER' }));

    render(<Dashboard />);

    expect(
      screen.getAllByText(/Apply for Loans/i).length
    ).toBeGreaterThan(0);
  });

  it('hides apply button for admin', () => {
    localStorage.setItem('user', JSON.stringify({ id: 1, role: 'ADMIN' }));

    render(<Dashboard />);

    expect(screen.queryByText(/Apply for Loans/i)).toBeNull();
  });

  it('opens apply loan modal when clicked', () => {
    localStorage.setItem('user', JSON.stringify({ id: 1, role: 'USER' }));

    render(<Dashboard />);

    fireEvent.click(screen.getAllByText(/Apply for Loans/i)[0]);

    expect(screen.getByText(/Apply Loan/i)).toBeInTheDocument();
  });

});
