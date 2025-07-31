import { createRouter, createWebHistory } from "vue-router";
import Layout from "@/components/Layout.vue";

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
          path: "/companies",
          name: "companies",
          component: () => import("@/views/Companies.vue"),
        },
        {
          path: "/employees",
          name: "employees",
          component: () => import("@/views/Employees.vue"),
        },
      ],
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue'),
    // },
  ],
});

export default router;
