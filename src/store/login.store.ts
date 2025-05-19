import { create } from "zustand";

interface User {
  id: number;
  name: string;
}

interface AuthState {
    isLoggedIn: boolean;
    user: User | null;
    login: (user: User) => void;
    logout: () => void;
}

export const useLoginStrore = create<AuthState>(() => ({
    isLoggedIn: false,
    user: null,
    login: (user: User) => set({ isLoggedIn: true, user }),
    logout: () => set({ isLoggedIn: false, user: null })
}));
