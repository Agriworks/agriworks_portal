<template>
<div>
    <div class="row">
      <div class="col-md-6">
        <v-btn dark color="success" small class="dashboardButton"> <v-icon>mdi-android</v-icon> Browse </v-btn>
        <router-link to="/upload"> <v-btn dark color="success" small class="dashboardButton"> <v-icon>mdi-plus</v-icon> Create </v-btn> </router-link>
        <v-btn dark color="success" small class="dashboardButton"> <v-icon>mdi-format-list-bulleted-square</v-icon> Manage </v-btn> 
      </div>
      <div class="col-md-6">
        <b-nav-form>
        <b-form-input size="sm" class="mr-lg-2 searchBar" placeholder="Search across datasets"></b-form-input>
        <b-button size="sm" class="my-2 my-sm-0" type="submit"><v-icon>mdi-magnify</v-icon></b-button>
        </b-nav-form>
      </div>
    </div>
    <div class="row">
      <component v-bind:is="component"></component>
    </div>
</div>
</template>

<script>
import Browse from "./Browse.vue";

export default {
  components: {
    browse: Browse
  },
  data() {
    return {
      component: "browse"
    };
  }
};
</script>
<style scoped>

.dashboardButton {
  margin-right: 0.5rem;
}
</style>
