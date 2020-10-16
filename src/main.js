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
import * as Sentry from "@sentry/browser";
import { Vue as VueIntegration } from "@sentry/integrations";
import { Integrations } from "@sentry/tracing";

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

if (process.env.NODE_ENV === 'production') {
  Sentry.init({
    dsn: "https://f36b27290bdb45d8bda47e2f050de76a@o462392.ingest.sentry.io/5465731",
    integrations: [
      new VueIntegration({
        Vue,
        tracing: true,
        logErrors: true
      }),
      new Integrations.BrowserTracing(),
    ],
  
    // We recommend adjusting this value in production, or using tracesSampler
    // for finer control
    tracesSampleRate: 1.0,
  });
}
