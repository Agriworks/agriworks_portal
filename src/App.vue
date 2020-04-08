<template>
  <v-app>
    <!-- <Notification Drawer /> -->
    <v-snackbar v-model="snackbar.show" :color="snackbar.color" :top="true" :timeout="1500">
      {{ snackbar.message }}
      <v-btn dark text @click="snackbar.show = false">Close</v-btn>
    </v-snackbar>
    <v-content>
      <v-dialog
        v-model="dialog"
        width="500"
      >
        <v-card>
          <v-list dense style="display:flex;flex-direction:column;">
            <v-list-item>
              <v-switch v-model="$vuetify.theme.dark"  color="green"></v-switch>
              <v-list-item-title> Dark Mode </v-list-item-title>
            </v-list-item>
            <v-list-item>
              <v-switch v-model="openSidebar" color="green"></v-switch>
              <v-list-item-title> Always open sidebar </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-card>
      </v-dialog>
      <div class="container" v-if="this.showSidebar">
        <Sidebar 
        @openDialog="openDialog()"
        :mini="mini"
        :expand_on_hover="expand_on_hover"/>
        <router-view />
        <!-- App !-->
      </div>
      <div v-else>
        <router-view />
        <!-- Landing page !-->
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
      showSidebar: false, //by default we are on the homepage
      dialog: false,
      mini: true,
      expand_on_hover: true,
      openSidebar: false
    };
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
    ...mapState(["snackbar"])
  },  
  methods: {
    openDialog() {
      this.dialog = true
    }
  },
  updated() {
    this.showSidebar = this.$router.currentRoute.name != "Home" //we are performing a check on every update
  }
};
</script>

<style lang="scss" >
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
