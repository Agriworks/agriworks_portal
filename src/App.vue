<template>
  <v-app>
    <!-- <Notification Drawer /> -->
    <v-snackbar v-model="snackbar.show" :color="snackbar.color" :top="true">
      {{ snackbar.message }}
      <v-btn dark text @click="snackbar.show = false">Close</v-btn>
    </v-snackbar>
    <v-content>
        <div class="container-fluid" v-if="onLanding">
          <router-view /> <!-- Landing page !-->
        </div>
        <div class="container" v-else>
          <Sidebar/>
          <router-view/> 
        </div>
    </v-content>
    </v-app>
</template>

<script>
import Sidebar from "./components/Sidebar";
import Landing from "./views/Landing";
import { mapState } from "vuex";

export default {
  name: "app",
  components: { Sidebar },
  data() {
    return {
      colors: { success: "#4CAF50", error: "#F44336", info: "#00ACC1" },
      routes: this.$router.options.routes,
      mini: true,
      onLanding: true //by default we are on the homepage
    };
  },
  computed: {
    ...mapState(["snackbar"])
  },
  created() {
    this.$store.dispatch("fetchDatasets");
  },
  updated() {
    this.onLanding = this.$router.currentRoute.name == "Home" //we are performing a check on every update
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
