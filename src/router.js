import { createWebHistory, createRouter } from "vue-router";
import Home from "./components/Home.vue";
import Login from "./pages/Login.vue";
import Register from "./pages/Register.vue";

const routes = [
    {
        path: "/",
        name: "login",
        component: Login,
    },
    {
        path: "/login",
        name: "login",
        component: Login,
    },
    {
        path: "/home",
        component: Home,
    },
    {
        path: "/register",
        component: Register,
    },

];
const router = createRouter({
    history: createWebHistory(),
    routes,
});
export default router;