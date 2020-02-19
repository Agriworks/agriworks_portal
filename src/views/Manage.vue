<template>
  <div class="row">
    <div v-for="dataset in datasets" v-bind:key="dataset.id">
      <DatasetCard v-bind:dataset="dataset" v-bind:manage="true"  />
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
  beforeMount() {
    this.$store.dispatch("fetchUserDatasets");
  },    
  
};
</script>
<style scoped></style>
