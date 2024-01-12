import Vue from "vue";
import VueRouter from "vue-router";
import { auth } from "@/firebase";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import(/* webpackChunkName: "home" */ "../views/Home.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/ingreso",
    name: "ingreso",
    component: () =>
      import(/* webpackChunkName: "ingreso" */ "../views/Ingreso.vue"),
  },
  {
    path: "/admin",
    name: "admin",
    component: () =>
      import(/* webpackChunkName: "ingreso" */ "../views/Admin.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/default",
    name: "default",
    component: () =>
      import(/* webpackChunkName: "default" */ "../views/Default.vue"),
    meta: { requiresAuth: true },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const usuario = auth.currentUser;
  // Verificar si la ruta es reconocida y requiere autenticación
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!usuario) {
      // Si el usuario no está autenticado, redirigir a la página de ingreso
      next({ path: "/ingreso" });
    } else {
      // Si el usuario está autenticado, permitir el acceso
      next();
    }
  } else {
    // Si la ruta no requiere autenticación, permitir el acceso
    next();
  }

  // Verificar si la ruta no es reconocida y el usuario está autenticado
  if (!to.matched.length && usuario) {
    // Redirigir al usuario a la ruta predeterminada
    next({ name: "default" });
  }
});

export default router;
