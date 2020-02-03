<template>
  <v-app>
    <!-- <Sidebar /> -->
    <Sidebar v-if="mockIsSignedIn" />
    <v-content>
      <div v-if="mockIsSignedIn">
        <div id="header">
          <div id="header-left"></div>
          <div id="header-right"></div>
        </div>
        <div class="container">
          <router-view />
        </div>
      </div>
    </v-content>

    <!-- <router-view /> -->
  </v-app>
</template>

<script>
import Sidebar from "./components/Sidebar";

export default {
  name: "app",
  components: { Sidebar },
  data() {
    return {
      routes: this.$router.options.routes,
      mini: true,
      mockIsSignedIn: false,
      signedIn: false
    };
  },
  methods: {
    getYear() {
      var d = new Date();
      const currentYear = d.getFullYear();
      return currentYear;
    }
  },
  created() {
    this.$store.dispatch("fetchDatasets");
    this.mockIsSignedIn = this.$router.currentRoute.name != "Home";
    this.signedIn = this.$store.getters.isLoggedIn;
  },
  updated() {
    this.mockIsSignedIn = this.$router.currentRoute.name != "Home";
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
