<template>
  <v-app>
    <!-- <Sidebar /> -->
    <Sidebar v-if="signedIn" v-on:signedOut="changeSignInState" />
    <v-content>
      <div v-if="signedIn">
        <div>
        <div id="header">
          <div id="header-left"></div>
          <div id="header-right"></div>
        </div>
        <div class="container">
          <router-view />
        </div>
        </div>
      </div>
      <!-- Landing Page-->
      <Landing v-on:signedIn="changeSignInState" v-else />
    </v-content>
  </v-app>
</template>

<script>
import Sidebar from "./components/Sidebar";
import Landing from "./views/Landing";

export default {
  name: "app",
  components: { Sidebar, Landing },
  data() {
    return {
      routes: this.$router.options.routes,
      mini: true,
      signedIn: false
    };
  },
  methods: {
    getYear() {
      var d = new Date();
      const currentYear = d.getFullYear();
      return currentYear;
    },
    changeSignInState() {
      this.signedIn = !this.signedIn; //mocked signed in state
    }
  },
  created() {
    this.$store.dispatch("fetchDatasets");
    this.signedIn = this.$store.getters.isLoggedIn;
  }
};
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
