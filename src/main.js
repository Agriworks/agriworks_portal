import Vue from "vue";
import BootstrapVue from "bootstrap-vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import vuetify from "./plugins/vuetify";

import notify from "./utilities/notify";
import { colors } from "./utilities/branding";

require("./assets/styles.css");
// import { library } from '@fortawesome/fontawesome-svg-core' //https://github.com/FortAwesome/vue-fontawesome
// import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
// import { fas } from '@fortawesome/free-solid-svg-icons'

// library.add(fas);

// Vue.component('fa-icon', FontAwesomeIcon);

// import { faSignInAlt, faBalanceScale, faSearch, faGem } from '@fortawesome/free-solid-svg-icons'

// library.add(faSignInAlt)
// library.add(faBalanceScale)
// library.add(faSearch)
// library.add(faGem)

// Vue.component('fa-icon', FontAwesomeIcon);

const plugins = {
  install () {
      Vue.notify = notify;
      Vue.prototype.$notify = notify;

      Vue.colors = colors;
      Vue.prototype.$colors = colors;
  }
}

Vue.use(plugins);
Vue.use(BootstrapVue);

Vue.config.productionTip = false;

new Vue({
  store,
  router,
  vuetify,
  render: h => h(App)
}).$mount("#app");
