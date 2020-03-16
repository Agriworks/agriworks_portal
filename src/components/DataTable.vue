<template>
  <v-data-table 
  :headers="headers"
  :items="data"
  :items-per-page="10"
  :footer-props="{
    'items-per-page-options': [10, 30, 50, 100, 250, 500],
  }" 
  ></v-data-table>

</template>
<script>

import Vue from "vue";
export default {
    name: "DataTable",
    props: ["headers", "data"],
      
}
</script>
<style scoped>

</style>
