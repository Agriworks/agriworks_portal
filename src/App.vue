<template>
  <v-app>
    <!-- TODO: FIND A CLEANER WAY TO DO CONDITIONAL REDERING-->
     <!-- <Sidebar /> -->
      <Sidebar v-if="signedIn" v-on:signedOut="changeSignInState"/>
      <TopBar v-if="!signedIn" v-on:signedIn="changeSignInState"/>
      <v-content>
        <div v-if="signedIn">
          <div id="header">
            <div id="header-left">
            </div>
            <div id="header-right">
            </div>
          </div>
          <div class="container">
          <router-view />
          </div>
        </div>
         <!-- Landing Page-->
        <Landing v-on:signedIn="changeSignInState" v-else/>
      </v-content>
  </v-app>
</template>

<script>
import Sidebar from './components/Sidebar'
import Landing from './views/Landing'
import TopBar from './components/TopBar'

export default {
  name: "app",
  components: {Sidebar, Landing, TopBar},
  data() {
    return {
      routes: this.$router.options.routes,
      mini: true,
      signedIn: false,
    };
  },
  methods: {
    getYear(){
      var d = new Date();
      const currentYear = d.getFullYear();
      return currentYear;
    },
    changeSignInState(){
      this.signedIn = !this.signedIn //mocked signed in state
    }
  },
  created() {
    this.$store.dispatch("fetchDatasets");
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
