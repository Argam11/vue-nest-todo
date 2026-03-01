import { createRouter, createWebHistory } from "vue-router";
import Layout from "@/components/Layout.vue";
import { useUserStore } from "@/stores/user";
import { useCompaniesStore } from "@/stores/companies";
import { useGlobalStore } from "@/stores/global";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "layout",
      component: Layout,
      children: [
        {
          path: "/",
          name: "home",
          component: () => import("@/views/Home.vue"),
        },
        {
          path: "/login",
          name: "login",
          component: () => import("@/views/Login.vue"),
        },
        {
          path: "/my-account",
          name: "my-account",
          component: () => import("@/views/MyAccount.vue"),
          meta: { requiresAuth: true },
        },
        {
          path: "/companies",
          name: "companies",
          component: () => import("@/views/Companies.vue"),
          meta: { requiresAuth: true },
          beforeEnter: async (to, _from, next) => {
            const companyStore = useCompaniesStore();
            const globalStore = useGlobalStore();

            globalStore.setLoading(true);
            await companyStore.fetchCompanies();
            globalStore.setLoading(false);

            next();
          },
        },
        {
          path: "/companies/:id",
          name: "company",
          component: () => import("@/views/Company.vue"),
          meta: { requiresAuth: true },
          beforeEnter: async (to, _from, next) => {
            const companyStore = useCompaniesStore();
            const globalStore = useGlobalStore();

            globalStore.setLoading(true);
            await companyStore.fetchCompany(to.params.id as string);
            globalStore.setLoading(false);

            next();
          },
        },
        {
          path: "/employees",
          name: "employees",
          component: () => import("@/views/Employees.vue"),
          meta: { requiresAuth: true },
        },
        {
          path: "/error",
          name: "error",
          component: () => import("@/components/Error.vue"),
        },
        {
          path: "/:pathMatch(.*)*",
          name: "not-found",
          component: () => import("@/views/NotFound.vue"),
        },
      ],
    },
  ],
});

router.beforeEach(async (to, _from, next) => {
  const userStore = useUserStore();
  const globalStore = useGlobalStore();

  // Wait for authentication initialization
  if (!userStore.isInitialized) {
    globalStore.setLoading(true);
    await userStore.initializeAuth();
    globalStore.setLoading(false);
  }

  const requiresAuth = to.meta.requiresAuth;

  if (to.name === "login" && userStore.user) {
    next({ name: "home" });
  }

  if (requiresAuth && !userStore.user) {
    next({ name: "login" });
  } else {
    next();
  }
});

export default router;
