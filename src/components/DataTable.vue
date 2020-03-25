<template>
  <v-data-table 
  :headers="headers"
  :items="data"
  :disable-pagination="true"
  :loading="isLoading"
  :fixed-header="true"
  :hide-default-footer="true"
  ></v-data-table>
</template>
<script>

import Vue from "vue";
export default {
    name: "DataTable",
    props: ["headers", "data", "isLoading"],
}
</script>
<style scoped>

</style>
