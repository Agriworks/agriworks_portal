<template>
  <v-data-table 
  :headers="headers"
  :items="data"
  :items-per-page="10"
  :footer-props="{
    'items-per-page-options': footerOptions,
  }" 
  ></v-data-table>

</template>
<script>

import Vue from "vue";
export default {
    name: "DataTable",
    props: ["headers", "data", "footerOptions"],
      
}
</script>
<style scoped>

</style>
