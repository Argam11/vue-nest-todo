import { me } from "@/services/auth";
import { defineStore } from "pinia";

interface User {
  username: string;
}

interface UserState {
  user: User | null;
  isInitialized: boolean;
  isLoading: boolean;
}

export const useUserStore = defineStore("user", {
  state: (): UserState => ({
    user: null,
    isInitialized: false,
    isLoading: false,
  }),
  actions: {
    setUser(user: User | null) {
      this.user = user;
      this.isInitialized = true;
    },

    async initializeAuth() {
      if (this.isInitialized) return;
      this.isLoading = true;

      try {
        const user = await me();
        this.setUser(user);
      } catch {
        // User is not authenticated or token expired
        this.user = null;
        this.isInitialized = true;
      } finally {
        this.isLoading = false;
      }
    },
  },
});
