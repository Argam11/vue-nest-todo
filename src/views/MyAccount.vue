<script setup lang="ts">
import { useRouter } from "vue-router";
import { logout } from "@/services/auth";
import { useUserStore } from "@/stores/user";

const router = useRouter();
const userStore = useUserStore();

const handleLogout = async () => {
  await logout();
  userStore.setUser({ username: null });
  router.push("/login");
};
</script>

<template>
  <h1>My Account</h1>
  <v-btn class="mt-4" @click="handleLogout">Logout</v-btn>
</template>
