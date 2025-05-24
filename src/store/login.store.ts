import { create } from "zustand";
import { loginService } from "../api/login.service";

interface User {
  id: number;
  name: string;
  role: string;
}

interface AuthStore {
  user: User | null;
  //token:
  loading: boolean;
  error: string | null;

  login: (name: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStrore = create<AuthStore>((set) => ({
  user: null,
  //token: null,
  loading: false,
  error: null,

  login: async (name, password) => {
    set({ loading: true, error: null});
    try {
      const { data } = await loginService(name, password);
      //localStorage.setItem('token', token);
      set({ user: data.user, loading: false });
    } catch (err: any) {
      if (err.status == 404) {
        set({ error: 'Credenciales Inválidas', loading: false })
      }
      set({ error: err.message || 'Error en login', loading: false })
    }
  },

  logout: () => {
    //localStorage.removeItem('token');
    set({ user: null });
  }
}));
