<template>
  <div class="container">
    <div>
      <ul class="nav nav-tabs row">
        <li class="col-md-1">
          <button v-on:click="component='browse' " class="btn btn-primary">Browse</button>
        </li>
        <li class="col-md-1">
          <button v-on:click="component='manage' " class="btn btn-primary">Manage</button>
        </li>
        <li class="col-md-1">
          <button v-on:click="component='create' " class="btn btn-primary">Create</button>
        </li>
      </ul>
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
</style>
