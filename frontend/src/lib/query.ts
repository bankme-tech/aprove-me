import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount) => {
        if (failureCount > 5) {
          localStorage.removeItem('aprove-auth');
        }
        return false;
      },
    },
  },
});
