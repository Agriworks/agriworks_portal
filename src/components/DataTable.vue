<template>
  <div>
    <v-data-table 
    :headers="headers"
    :items="data"
    :items-per-page="5"
    ></v-data-table>
  </div>
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
