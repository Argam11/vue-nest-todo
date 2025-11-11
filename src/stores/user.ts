import { defineStore } from "pinia";

interface UserState {
  username: string | null;
}

export const useUserStore = defineStore("user", {
  state: (): UserState => ({
    username: null,
  }),
  actions: {
    setUser(user: UserState) {
      this.$patch(user);
    },
  },
});
