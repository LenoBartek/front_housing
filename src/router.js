import { createRouter, createWebHistory } from "vue-router";

import Login from "./pages/Login.vue";
import NotFound from "./pages/NotFound.vue";
import store from './store/index.js';

const Register = () => import("./pages/Register.vue");
const ImmovablePage = () => import("./pages/immovable/ImmovablePage.vue");
const ImmovableBuilding = () => import("./pages/immovable/ImmovableBuilding.vue");
const ImmovableFlat = () => import("./pages/immovable/ImmovableFlat.vue");
const ResidentPage = () => import("./pages/resident/ResidentPage.vue");
const ResidentSelectFlat = () => import("./pages/resident/ResidentSelectFlat.vue");
const ResidentCreate = () => import("./pages/resident/ResidentCreate.vue");
const VotePage = () => import("./pages/vote/VotePage.vue");
const FaultPage = () => import("./pages/fault/FaultPage.vue");
const AccountPage = () => import("./pages/account/AccountPage.vue");
const NoticesPage = () => import("./pages/notices/NoticesPage.vue");
const NoticesBuilding = () => import("./pages/notices/NoticesBuilding.vue");
const FaultBuilding = () => import("./pages/fault/FaultBuilding.vue");
const VoteBuilding = () => import("./pages/vote/VoteBuilding.vue")
const FeesPage = () => import("./pages/fees/FeesPage.vue")

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", redirect: "/login" },
    { path: "/login", component: Login },
    { path: "/register", component: Register },
    { path: "/immovables", component: ImmovablePage, meta: { requiresAuth: true, role: ['ADMIN'] } },
    { path: "/immovables/:id/flat", component: ImmovableFlat, props: true, meta: { requiresAuth: true, role: ['ADMIN'] } },
    { path: "/immovables/building", component: ImmovableBuilding, meta: { requiresAuth: true, role: ['ADMIN'] } },
    { path: "/residents", component: ResidentPage, meta: { requiresAuth: true, role: ['ADMIN'] } },
    { path: "/residents/addresident", component: ResidentSelectFlat, meta: { requiresAuth: true, role: ['ADMIN'] } },
    {
      path: "/residents/addresident/:id",
      component: ResidentCreate,
      props: true, meta: { requiresAuth: true, role: ['ADMIN'] }
    },
    { path: "/votes", component: VotePage, meta: { requiresAuth: true, role: ['ADMIN', 'USER'] } },
    { path: "/votes/addvote", component: VoteBuilding, meta: { requiresAuth: true, role: ['ADMIN'] } },
    { path: "/faults", component: FaultPage, meta: { requiresAuth: true, role: ['ADMIN', 'USER'] } },
    { path: "/faults/addfault", component: FaultBuilding, meta: { requiresAuth: true, role: ['ADMIN', 'USER'] }},
    { path: "/account", component: AccountPage, meta: { requiresAuth: true, role: ['ADMIN', 'USER'] } },
    { path: "/notices", component: NoticesPage, meta: { requiresAuth: true, role: ['ADMIN', 'USER'] } },
    { path: "/notices/addnotice", component: NoticesBuilding, meta: { requiresAuth: true, role: ['ADMIN'] } },
    { path: "/fees", component: FeesPage, meta: { requiresAuth: true, role: ['USER'] } },
    { path: "/:notFound(.*)", component: NotFound },
  ],
});

router.beforeEach(function(to, _, next) {
  if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
    next('/login');
  }
  else if (to.meta.requiresAuth && store.getters.isAuthenticated) {
    if (to.meta?.role?.includes(store.getters.role)) {
      next();
    }
    else {
      if (store.getters.role == 'USER') next('/votes')
    }
  } 
  else {
    next();
  }
});

export default router;
