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

export const useAuthStrore = create<AuthState>((set) => ({
    isLoggedIn: false,
    user: null,
    login: (user) => set({ isLoggedIn: true, user }),
    logout: () => set({ isLoggedIn: false, user: null })
}));
