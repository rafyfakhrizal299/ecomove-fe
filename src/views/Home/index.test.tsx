import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'; // contoh // jika pakai wrapper
import HomePage from '.';
import { renderWithProviders } from '../../utils/testing';

test('fetches & receives a user after clicking the get user button', async () => {
  renderWithProviders(<HomePage />);

  expect(screen.queryByText(/getting data\.\.\./i)).not.toBeInTheDocument();

  fireEvent.click(screen.getByRole('button', { name: /Get User/i }));

  expect(await screen.findByText(/The Octocat/i)).toBeInTheDocument();
  expect(screen.queryByText(/Fetching user\.\.\./i)).not.toBeInTheDocument();
});
