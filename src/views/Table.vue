<template>
  <div>
    <b-table striped hover :items="$store.state.items"></b-table>
  </div>
</template>
<script>
import Vue from "vue";
import BootstrapVue from "bootstrap-vue";
// import Data from csv

Vue.use(BootstrapVue);
  export default {
    name: "Table",
    
  }
</script>
<style scoped>

</style>
