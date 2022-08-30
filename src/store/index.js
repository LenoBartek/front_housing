import { createStore } from "vuex";

import { auth } from "./auth.module";
import immovableModule from "./modules/immovable/index.js";
import residentModule from "./modules/resident/index.js";
import voteModule from "./modules/vote/index.js";
import faultModule from "./modules/fault/index.js";
import accountModule from "./modules/account/index.js";
import noticesModule from "./modules/notices/index.js";
import auth2Module from "./modules/auth2/index.js";

const store = createStore({
  modules: {
    auth,
    immovable: immovableModule,
    resident: residentModule,
    vote: voteModule,
    fault: faultModule,
    account: accountModule,
    notices: noticesModule,
    auth2: auth2Module,
  },
  state() {
    return {
      host: "https://habapp.azurewebsites.net/",
      activeTabId: 1,
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
  mutations: {
    setActiveTabId(state, val) {
      state.activeTabId = val;
    },
  },
});

export default store;
