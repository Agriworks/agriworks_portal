<template>
<div>
  <div class="row" v-if="this.datasets.length > 0">
    <div v-for="dataset in datasets" v-bind:key="dataset.id">
      <DatasetCard v-bind:dataset="dataset" />
    </div>
  </div>
  <div v-else>
    <LoadingIndicator/>
  </div>
</div>
</template>

<script>
// @ is an alias to /src
import DatasetCard from "@/views/DatasetCard.vue";
import LoadingIndicator from "../LoadingIndicator";

export default {
  name: "DatasetBrowserView",
  components: {
    DatasetCard,
    LoadingIndicator
  },
  computed: {
    datasets() {
      return this.$store.state.datasets;
    }
  },
  mounted() {
    this.$store.dispatch("fetchDatasets");
  }
};
</script>
<style scoped></style>
