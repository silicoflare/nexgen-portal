import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Session {
  user: {
    id: string;
    role: string;
  } | null;
  token: string | null;
  login: (user: { id: string; role: string }, token: string) => void;
  logout: () => void;
}

export const useSessionStore = create(
  persist<Session>(
    (set) => ({
      user: null,
      token: null,
      login: (user, token) => set({ user, token }),
      logout: () => set({ user: null, token: null }),
    }),
    { name: "session-storage" }
  )
);
