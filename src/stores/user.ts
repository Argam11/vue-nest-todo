import { me } from "@/services/auth";
import { defineStore } from "pinia";

interface UserState {
  username: string | null;
  isInitialized: boolean;
  isLoading: boolean;
}

export const useUserStore = defineStore("user", {
  state: (): UserState => ({
    username: null,
    isInitialized: false,
    isLoading: false,
  }),
  actions: {
    setUser(user: UserState) {
      this.$patch(user);
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
        this.username = null;
        this.isInitialized = true;
      } finally {
        this.isLoading = false;
      }
    },
  },
});
