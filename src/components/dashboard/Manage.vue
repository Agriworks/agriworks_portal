<template>
  <div>
    <div class="row" v-if="this.datasets.length > 0">
      <div v-for="dataset in datasets" v-bind:key="dataset.id">
        <DatasetCard v-bind:dataset="dataset" v-bind:manage="true" />
      </div>
    </div>
    <div class="row" v-else>
      <div class="col-md-12">
        <h6>You don't have any datasets yet or none that match your search. Click Create to upload a new dataset.</h6>
      </div>
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
      return this.$store.state.userDatasets;
    }
  },
  mounted() {
    this.$store.dispatch("fetchUserDatasets");
  }
};
</script>
<style scoped></style>
