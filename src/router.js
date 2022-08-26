import { createRouter, createWebHistory } from "vue-router";

import Login from "./pages/Login.vue";
import NotFound from "./pages/NotFound.vue";

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

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", redirect: "/login" },
    { path: "/login", component: Login },
    { path: "/register", component: Register },
    { path: "/immovables", component: ImmovablePage },
    { path: "/immovables/:id/flat", component: ImmovableFlat, props: true },
    { path: "/immovables/building", component: ImmovableBuilding },
    { path: "/residents", component: ResidentPage },
    { path: "/residents/addresident", component: ResidentSelectFlat },
    {
      path: "/residents/addresident/:id",
      component: ResidentCreate,
      props: true,
    },
    { path: "/votes", component: VotePage },
    { path: "/faults", component: FaultPage },
    { path: "/faults/addfault", component: FaultBuilding },
    { path: "/account", component: AccountPage },
    { path: "/notices", component: NoticesPage },
    { path: "/notices/addnotice", component: NoticesBuilding },
    { path: "/:notFound(.*)", component: NotFound },
  ],
});

export default router;
