import {createStore} from "vuex";

import {auth} from "./auth.module";
import immovableModule from './modules/immovable/index.js'

const store = createStore({
    modules: {
        auth,
        immovable: immovableModule
    },
});

export default store;