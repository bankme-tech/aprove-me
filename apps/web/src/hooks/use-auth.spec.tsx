import { act, renderHook, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { AuthProvider, useAuth } from './use-auth';

describe('useAuth hook', () => {
  it('should be able to retrieve username and token from localstorage', async () => {
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation((key) => {
      switch (key) {
        case '@approve-me:token':
          return 'session-token';
        case '@approve-me:username':
          return 'test-user';
        default:
          return null;
      }
    });

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    await waitFor(() => {
      expect(result.current.isLogged).toBe(true);
      expect(result.current.username).toBe('test-user');
    });
  });

  it('should be able to update localstorage token on call updateSessionToken', async () => {
    const setItem = vi.spyOn(Storage.prototype, 'setItem');

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    act(() => {
      result.current.updateSessionToken('updated-token');
    });

    await waitFor(() => {
      expect(result.current.isLogged).toBe(true);
      expect(setItem).toHaveBeenCalled();
    });
  });

  it('should be able to update localstorage username on call updateUsername', async () => {
    const setItem = vi.spyOn(Storage.prototype, 'setItem');

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    act(() => {
      result.current.updateUsername('johndoe');
    });

    await waitFor(() => {
      expect(result.current.username).toBe('johndoe');
      expect(setItem).toHaveBeenCalled();
    });
  });
});
