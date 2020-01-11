<template>
  <div class="row">
    <div v-for="dataset in datasets" v-bind:key="dataset.id">
      <DatasetCard v-bind:dataset="dataset" />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import DatasetCard from "@/views/DatasetCard.vue";

export default {
  name: "DatasetBrowserView",
  components: {
    DatasetCard
  },
  computed: {
    datasets() {
      return this.$store.state.datasets;
    }
  },
  created() {
    this.$store.dispatch("fetchDatasets", { search: "" });
  }
};
</script>
<style scoped></style>
