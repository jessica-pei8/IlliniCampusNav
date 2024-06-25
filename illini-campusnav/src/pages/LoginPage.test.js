import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import LoginPage from './LoginPage';

describe('LoginPage', () => {
  test('renders login page', () => {
    const { getByText, getByPlaceholderText } = render(<LoginPage />);
    const signInText = getByText(/Sign in to your account/i);
    expect(signInText).toBeInTheDocument();

    const usernameInput = getByPlaceholderText('Username');
    const passwordInput = getByPlaceholderText('Password');
    expect(usernameInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
  });

  test('validates empty fields on form submission', async () => {
    const { getByText } = render(<LoginPage />);
    const signInButton = getByText(/Sign in/i);

    fireEvent.click(signInButton);

    await waitFor(() => {
      const errorMessages = getByText(/Username is required/i);
      expect(errorMessages).toBeInTheDocument();
    });
  });

  test('submits form with valid inputs', async () => {
    const mockSubmit = jest.fn();
    const { getByText, getByPlaceholderText } = render(<LoginPage onSubmit={mockSubmit} />);
    const signInButton = getByText(/Sign in/i);
    const usernameInput = getByPlaceholderText('Username');
    const passwordInput = getByPlaceholderText('Password');

    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(signInButton);

    await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalledTimes(1);
      expect(mockSubmit).toHaveBeenCalledWith({ username: 'testuser', password: 'password123' });
    });
  });

  test('renders signup link', () => {
    const { getByText } = render(<LoginPage />);
    const signUpLink = getByText(/Sign up/i);
    expect(signUpLink).toBeInTheDocument();
  });

  test('navigates to signup page when signup link is clicked', async () => {
    const mockNavigate = jest.fn();
    const { getByText } = render(<LoginPage navigate={mockNavigate} />);
    const signUpLink = getByText(/Sign up/i);

    fireEvent.click(signUpLink);

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledTimes(1);
      expect(mockNavigate).toHaveBeenCalledWith('/signup');
    });
  });
});
