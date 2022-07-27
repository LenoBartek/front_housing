import { createRouter, createWebHistory } from "vue-router";

import Login from "./pages/Login.vue";
import Register from "./pages/Register.vue";
import NotFound from "./pages/NotFound.vue";
import ImmovablePage from "./pages/immovable/ImmovablePage.vue";
import ImmovableBuilding from "./pages/immovable/ImmovableBuilding.vue"
import ImmovableFlat from "./pages/immovable/ImmovableFlat.vue"
import ResidentPage from "./pages/resident/ResidentPage.vue"
import ResidentSelectFlat from "./pages/resident/ResidentSelectFlat.vue"
import ResidentCreate from "./pages/resident/ResidentCreate.vue"
import VotePage from "./pages/vote/VotePage.vue"
import FaultPage from  "./pages/fault/FaultPage.vue"

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", redirect: "/login" },
    { path: "/login", component: Login },
    { path: "/register", component: Register },
    { path: "/immovable", component: ImmovablePage},
    { path: "/immovable/:id/flat",
     component: ImmovableFlat,
     props: true,
    },
    { path: '/immovable/building', component: ImmovableBuilding},
    { path: '/resident', component: ResidentPage},
    { path: '/resident/addresident', component: ResidentSelectFlat},
    { path: '/resident/addresident/:id', 
     component: ResidentCreate,
     props: true,
    },
    { path: '/vote', component: VotePage},
    { path: '/fault', component: FaultPage},
    { path: "/:notFound(.*)", component: NotFound },
  ],
});

export default router;
