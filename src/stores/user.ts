import { me } from "@/services/auth";
import { defineStore } from "pinia";

interface IUser {
  username: string;
}

interface IUserState {
  user: IUser | null;
  isInitialized: boolean;
}

export const useUserStore = defineStore("user", {
  state: (): IUserState => ({
    user: null,
    isInitialized: false,
  }),
  actions: {
    setUser(user: IUser | null) {
      this.user = user;
      this.isInitialized = true;
    },

    async initializeAuth() {
      if (this.isInitialized) return;

      try {
        const user = await me();
        this.setUser(user);
      } catch {
        // User is not authenticated or token expired
        this.user = null;
        this.isInitialized = true;
      }
    },
  },
});
