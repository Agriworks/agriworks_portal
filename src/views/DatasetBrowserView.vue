<template>
<div>
    <div class="row">
      <div class="col-md-6">
        <v-btn dark color="success" small class="dashboardButton" @click="switchComponent('browse')">
          <v-icon>mdi-view-carousel</v-icon>Browse
        </v-btn>
          <v-btn dark color="success" small class="dashboardButton" @click="switchComponent('upload')">
            <v-icon>mdi-plus</v-icon>Create
          </v-btn>
        <v-btn dark color="success" small class="dashboardButton" @click="switchComponent('manage')">
          <v-icon>mdi-format-list-bulleted-square</v-icon>Manage
        </v-btn>
      </div>
      <div class="col-md-6" v-if="this.component == 'browse'">
        <b-nav-form @submit.prevent="searchSubmit">
          <b-form-input
            size="sm"
            class="mr-lg-2 searchBar"
            id="search"
            placeholder="Search across datasets"
          ></b-form-input>
          <b-button size="sm" class="my-2 my-sm-0" type="submit">
            <v-icon>mdi-magnify</v-icon>
          </b-button>
        </b-nav-form>
      </div>
    </div>
    <component v-bind:is="component"></component>
</div>
</template>

<script>
import Browse from "../components/dashboard/Browse";
import Manage from "../components/dashboard/Manage";
import Upload from "../components/dashboard/Upload";

export default {
  components: {
    browse: Browse,
    manage: Manage,
    upload: Upload
  },
  data() {
    return {
      component: (this.$route.params.component ? this.validateComponent(this.$route.params.component) : "browse")
    };
  },
  methods: {
    searchSubmit() {
      if (document.getElementById("search") == undefined) {
        this.$store.dispatch("filterDatasets", "");
      } else {
        this.$store.dispatch(
          "filterDatasets",
          document.getElementById("search").value
        );
      }
    },
    switchComponent(component) {
      this.component = this.validateComponent(component);
      if (this.component != "browse") {
        this.$router.push("/browse/" + this.component); 
      }
      else {
        this.$router.push("/browse");
      }
    },
    validateComponent(component) {
      const allowedComponents = ["browse", "manage", "upload"]
      if (allowedComponents.includes(component)) {
        return component;
      }
      else {
        return "browse"; 
      }
    }
  },
  mounted() {
    this.$store.dispatch("fetchUserDatasets")
  }
};
</script>
<style scoped>
.dashboardButton {
  margin-right: 0.5rem;
}
</style>
