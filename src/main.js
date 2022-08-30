import { createApp } from "vue";

import App from "./App.vue";
import router from "./router";
import store from "./store/index.js";
import BaseCard from "./components/admin/ui/BaseCard.vue";
import BaseButton from "./components/admin/ui/BaseButton.vue";
import HalfPage from "./components/admin/ui/HalfPage.vue";
import BodyFrame from "./components/admin/ui/BodyFrame.vue";
import BaseDialog from "./components/admin/ui/BaseDialog.vue";
import HomePage from './components/admin/HomePage.vue'
import BaseSpinner from './components/admin/ui/BaseSpinner.vue'
import ButtonHeader from './components/admin/ui/ButtonHeader.vue'
import HalfPage60 from './components/admin/ui/HalfPage60.vue'

import "bootstrap/";
import "bootstrap/dist/css/bootstrap.min.css";

// import { FontAwesomeIcon } from "./plugins/font-awesome";
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'
library.add(faTwitter, faUserSecret)

import Vue3EasyDataTable from "vue3-easy-data-table";
import "vue3-easy-data-table/dist/style.css";

const app = createApp(App);

app.use(router);
app.use(store);

app.component("font-awesome-icon", FontAwesomeIcon);
app.component("base-card", BaseCard);
app.component("base-button", BaseButton);
app.component("half-page", HalfPage);
app.component("body-frame", BodyFrame);
app.component("EasyDataTable", Vue3EasyDataTable);
app.component("base-dialog", BaseDialog);
app.component('home-page', HomePage);
app.component('base-spinner', BaseSpinner);
app.component('button-header', ButtonHeader);
app.component('half-page-60', HalfPage60)

app.mount("#app");
