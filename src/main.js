import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { library } from '@fortawesome/fontawesome-svg-core' //https://github.com/FortAwesome/vue-fontawesome
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faSignInAlt, fa } from '@fortawesome/free-solid-svg-icons'

library.add(faSignInAlt);

<<<<<<< HEAD
Vue.component('fa-icon', FontAwesomeIcon);

Vue.config.productionTip = false;
=======
Vue.config.productionTip = false
>>>>>>> feature-cookieStorage

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

