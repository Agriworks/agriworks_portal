import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { library } from '@fortawesome/fontawesome-svg-core' //https://github.com/FortAwesome/vue-fontawesome
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faSignInAlt, faBalanceScale, faSearch, faGem } from '@fortawesome/free-solid-svg-icons'

library.add(faSignInAlt)
library.add(faBalanceScale)
library.add(faSearch)
library.add(faGem)

<<<<<<< HEAD
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'



import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'



Vue.config.productionTip = false
=======
Vue.component('fa-icon', FontAwesomeIcon);
Vue.config.productionTip = false;
>>>>>>> 30b94d81b7a60162a0485c805e879806217846db

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

