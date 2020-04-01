<template>
  <v-data-table 
  height="95vh"
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
