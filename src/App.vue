<template>
<<<<<<< HEAD
  <div>
    <v-app>
      <Sidebar v-if="mockIsSignedIn" />
      <v-content v-if="mockIsSignedIn">
=======
  <v-app>
    <!-- <Sidebar /> -->
    <Sidebar v-if="signedIn" v-on:signedOut="changeSignInState" />
    <v-content>
      <div v-if="signedIn">
        <div>
>>>>>>> f103933a378a2599848068663136eda605484e88
        <div id="header">
          <div id="header-left"></div>
          <div id="header-right"></div>
        </div>
        <div class="container">
          <router-view />
        </div>
<<<<<<< HEAD
      </v-content>
      <router-view v-else />
    </v-app>
  </div>
=======
        </div>
      </div>
      <!-- Landing Page-->
      <Landing v-on:signedIn="changeSignInState" v-else />
    </v-content>
  </v-app>
>>>>>>> f103933a378a2599848068663136eda605484e88
</template>

<script>
import Sidebar from "./components/Sidebar";

export default {
  name: "app",
  components: { Sidebar },
  data() {
    return {
      mockIsSignedIn: false
    };
  },
  created() {
    this.$store.dispatch("fetchDatasets");
    this.mockIsSignedIn = this.$router.currentRoute.name != "Home";
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
