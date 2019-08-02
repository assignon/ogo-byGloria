import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";
import vuetify from './plugins/vuetify';

import VAnimateCss from 'v-animate-css';
import Vuex from 'vuex'

Vue.config.productionTip = false;
Vue.use(VAnimateCss);
Vue.use(Vuex);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
