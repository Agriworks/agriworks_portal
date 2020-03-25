<template>
  <v-data-table 
  :headers="headers"
  :items="data"
  :items-per-page="10"
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
