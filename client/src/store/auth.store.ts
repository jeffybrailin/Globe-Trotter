
import { create } from 'zustand';
import type { User } from '../types';

interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    login: (token: string, user: User) => void;
    logout: () => void;
    checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    token: localStorage.getItem('token'),
    isAuthenticated: !!localStorage.getItem('token'),

    login: (token, user) => {
        localStorage.setItem('token', token);
        set({ token, user, isAuthenticated: true });
    },

    logout: () => {
        localStorage.removeItem('token');
        set({ token: null, user: null, isAuthenticated: false });
    },

    checkAuth: async () => {
        // Optional: Validate token with backend if needed
        // For now, simpler to just trust local state or handle 401s in api.ts
        // Could add /api/auth/me endpoint call here
    }
}));
