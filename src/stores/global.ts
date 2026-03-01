import { defineStore } from "pinia";

interface IGlobalState {
  isLoading: boolean;
}

export const useGlobalStore = defineStore("global", {
  state: (): IGlobalState => ({
    isLoading: false,
  }),
  actions: {
    async setLoading(isLoading: boolean) {
      this.isLoading = isLoading;
    },
  },
});
