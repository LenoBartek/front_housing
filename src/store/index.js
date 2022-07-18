import { createStore } from "vuex";

import { auth } from "./auth.module";
import immovableModule from "./modules/immovable/index.js";

const store = createStore({
  modules: {
    auth,
    immovable: immovableModule,
  },
  state() {
    return {
      host: "http://localhost:8081",
    };
  },
  getters: {
    host(state) {
      return state.host;
    },
  },
});

export default store;
