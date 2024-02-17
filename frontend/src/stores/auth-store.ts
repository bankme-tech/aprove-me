import { create } from 'zustand';

export const authStore = create((set) => ({
  user: {},

  setUser: () =>
    set((state) => ({
      user: {
        login: 'name',
      },
    })),
}));
