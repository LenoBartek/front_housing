import { createStore } from "vuex";

import { auth } from "./auth.module";
import immovableModule from "./modules/immovable/index.js";
import residentModule from "./modules/resident/index.js"
import voteModule from "./modules/vote/index.js"
import faultModule from "./modules/fault/index.js"

const store = createStore({
  modules: {
    auth,
    immovable: immovableModule,
    resident: residentModule,
    vote: voteModule,
    fault: faultModule,
  },
  state() {
    return {
      host: "http://localhost:8081",
      activeTabId: 1
    };
  },
  getters: {
    host(state) {
      return state.host;
    },
    activeTabId(state) {
      return state.activeTabId;
    },
  },
  mutations:{
    setActiveTabId(state, val){
      state.activeTabId = val;
    }
  }
});

export default store;
