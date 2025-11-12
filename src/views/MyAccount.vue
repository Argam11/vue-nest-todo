<script setup lang="ts">
import { useRouter } from "vue-router";
import { logout } from "@/services/auth";
const router = useRouter();

const handleLogout = async () => {
  await logout();
  router.push("/login");
};
</script>

<template>
  <h1>My Account</h1>
  <v-btn class="mt-4" @click="handleLogout">Logout</v-btn>
</template>
