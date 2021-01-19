<template>
  <v-app>
    <!-- <Notification Drawer /> -->
    <v-snackbar v-model="snackbar.show" :color="snackbar.color" :top="true" :timeout="1500">
      {{ snackbar.message }}
      <v-btn dark text @click="snackbar.show = false">Close</v-btn>
    </v-snackbar>
    <v-main>
      <v-dialog v-model="dialog" width="500">
        <v-card>
          <v-list dense style="display:flex;flex-direction:column;">
            <v-list-item>
              <v-switch v-model="$vuetify.theme.dark" color="green"></v-switch>
              <v-list-item-title>Dark Mode</v-list-item-title>
            </v-list-item>
            
            <v-list-item>
              <v-switch v-model="sidebarAlways" color="green"></v-switch>
              <v-list-item-title>Always keep the sidebar visible</v-list-item-title>
            </v-list-item>
            
          </v-list>
        </v-card>
      </v-dialog>
      <div class="container" v-if="this.showSidebar">
        <div v-on:mouseover="setExpandedTrue">
          <Sidebar @openDialog="openDialog()" v-bind:isExpanded="isExpanded || sidebarAlways"/>
        </div>
        <div v-on:mouseover="setExpandedFalse">
          <router-view />
        </div>
        <!-- App !-->
      </div>
      <div v-else>
        <router-view />
        <!-- Landing page !-->
      </div>
    </v-main>
  </v-app>
</template>

<script>
import Sidebar from "./components/Sidebar";
import { mapState } from "vuex";

export default {
  name: "app",
  components: { Sidebar },
  data() {
    return {
      colors: { success: "#4CAF50", error: "#F44336", info: "#00ACC1" },
      routes: this.$router.options.routes,
      showSidebar: false, //by default we are on the homepage
      dialog: false,
      isExpanded: false,
    }
  },
  methods: {
    openDialog() {
      this.dialog = true;
    },
    setExpandedTrue() {
      this.isExpanded = true;
    },
    setExpandedFalse() {
      this.isExpanded = false;
    }
  },
  watch: {
    openSidebar: function() {
      if (this.openSidebar === true) {
        this.mini = false,
        this.expand_on_hover = false
      }
      else {
        this.mini = true,
        this.expand_on_hover = true
      }
    }
  },
  computed: {
    ...mapState(["snackbar", "sidebarAlwaysExpanded"]), 
    sidebarAlways: {
      set(val) {
        this.$store.commit("setSidebarAlwaysExpanded", val)
      }, 
      get() {
        return this.sidebarAlwaysExpanded; 
      }
    } 
  },
  updated() {
    this.showSidebar = this.$router.currentRoute.name != "Home" 
                    && this.$router.currentRoute.name != "login" 
                    && this.$router.currentRoute.name != "registration"
                    && this.$router.currentRoute.name != "resend-confirmation-email"
                    && this.$router.currentRoute.name != "forgot-password"
                    && this.$router.currentRoute.name != "reset-password"
                    && this.$router.currentRoute.name != "google-registration"
                    && this.$router.currentRoute.name != "confirm-user"; //we are performing a check on every update
  }
};
</script>

<style lang="scss" >
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@500&display=swap');
.form-control:focus {
  border-color: #4caf50;
  box-shadow: 0px 0px 8px #4caf50;
}
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
