<template>
  <v-app>
    <Sidebar />
    <div  on:click="closeSidebar">
      <v-content>
          <div id="header">
            <div id="header-left">
            </div>
            <div id="header-right">
            <!-- Log in and sign in buttons. Display only if not logged in !--> 
            </div>
          </div>
          <router-view />
      </v-content>
    </div>
  </v-app>
</template>

<script>
// import Logo from './components/Logo'
import Sidebar from './components/Sidebar'

// import {Push} from 'vue-burger-menu'

export default {
  name: "app",
  components: {Sidebar},
  data() {
    return {
      routes: this.$router.options.routes,
      mini: true
    };
  },
  methods: {
    getYear(){
      var d = new Date();
      const currentYear = d.getFullYear();
      return currentYear;
    },
  }
}
</script>

<style lang="scss">

#header {
  display: flex;
  justify-content: space-between;
  margin-top: 90px;
  padding-left: 5rem;
  padding-right: 5rem;
}

#footer {
  bottom: 0;
  width: 100%;
}

</style>
