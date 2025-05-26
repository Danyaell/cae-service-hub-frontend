import { create } from "zustand";
import { loginService } from "../api/login.service";
import { jwtDecode } from "jwt-decode";

interface User {
  id: number;
  name: string;
  role: string;
}

interface AuthStore {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;

  login: (name: string, password: string) => Promise<void>;
  logout: () => void;
  initialize: () => void;
}

export const useAuthStrore = create<AuthStore>((set) => ({
  user: null,
  token: null,
  loading: false,
  error: null,

  login: async (name, password) => {
    set({ loading: true, error: null});
    try {
      const { data } = await loginService(name, password);
      localStorage.setItem('token', data.token);
      set({ user: data.user, token: data.token, loading: false });
    } catch (err: any) {
      set({ error: err.message || 'Error en login', loading: false })
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    set({ user: null, token: null });
  },

  initialize: () => {
    const token = localStorage.getItem('token');
    if (!token) return;
    try {
      const decoded: any = jwtDecode(token);
      set({ token, user: { id: decoded.id, name: decoded.name, role: decoded.role }, error: null });
    } catch (error) {
      console.error('Error initializing auth store:', error);
      set({ user: null, token: null, error: 'Error initializing auth store' });
      
    }
  },
}));
