import Vue from "vue";
import BootstrapVue from "bootstrap-vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import vuetify from "./plugins/vuetify";
require("./assets/styles.css");
import GAuth from 'vue-google-oauth2'

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

// Google Oauth options
const gauthOption = {
  clientId: '1071341380227-ue09mhacce5kvpfsh22rumpmv3nhqsv7.apps.googleusercontent.com',
  scope: 'profile email',
  prompt: 'select_account'
}


Vue.use(GAuth, gauthOption)
Vue.use(BootstrapVue);

Vue.config.productionTip = false;

new Vue({
  store,
  router,
  vuetify,
  render: h => h(App)
}).$mount("#app");
