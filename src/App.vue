<script setup lang="ts">
import { storeToRefs } from "pinia";
import { RouterLink, RouterView } from "vue-router";
import { useUserStore } from "@/stores/user";
import LoadingSpinner from "@/components/LoadingSpinner.vue";

const userStore = useUserStore();
const { username, isLoading } = storeToRefs(userStore);
</script>

<template>
  <LoadingSpinner v-if="isLoading" message="Authenticating..." />

  <div v-else>
    <header>
      <RouterLink to="/">
        <img alt="Vue logo" class="logo" src="@/assets/logo.svg" />
      </RouterLink>

      <nav>
        <RouterLink to="/companies">Companies</RouterLink>
        <RouterLink to="/employees">Employees</RouterLink>

        <RouterLink v-if="username" to="/my-account">{{ username }}</RouterLink>
        <RouterLink v-else to="/login">Login</RouterLink>
      </nav>
    </header>

    <div class="content">
      <RouterView />
    </div>
  </div>
</template>

<style scoped>
header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  line-height: 1.5;
  padding: 1rem;
  position: fixed;
  top: 0;
  z-index: 1;
  width: 100%;
  background-color: #fff;
}

.content {
  margin-top: 100px;
}

.logo {
  width: 50px;
  height: 50px;
}

nav {
  font-size: 12px;
}

nav a.router-link-exact-active {
  color: #000;
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}
</style>
