import React from 'react';
import { describe, it, expect, vi, beforeAll, afterAll } from 'vitest';
import { render, screen } from '@testing-library/react';
import SignUpPage from './page';

describe('SignUpPage', () => {
  beforeAll(() => {
    vi.mock('next/navigation', () => ({
      useRouter: vi.fn,
    }));
  });

  it('should render correctly', async () => {
    render(<SignUpPage />);

    expect(screen.getByTestId('register-form')).toBeDefined();
  });

  afterAll(() => {
    vi.clearAllMocks();
  });
});
