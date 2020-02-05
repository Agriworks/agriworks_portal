<template>
  <div>
    <v-app>
      <Sidebar v-if="mockIsSignedIn" />
      <v-content v-if="mockIsSignedIn">
        <div id="header">
          <div id="header-left"></div>
          <div id="header-right"></div>
        </div>
        <div class="container">
          <router-view />
        </div>
      </v-content>
      <router-view v-else />
    </v-app>
  </div>
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
