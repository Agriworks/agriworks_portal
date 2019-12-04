import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { library } from '@fortawesome/fontawesome-svg-core' //https://github.com/FortAwesome/vue-fontawesome
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'
import VueSidebarMenu from 'vue-sidebar-menu'
import 'vue-sidebar-menu/dist/vue-sidebar-menu.css'

library.add(fas);

Vue.component('fa-icon', FontAwesomeIcon);
Vue.use(VueSidebarMenu)

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

