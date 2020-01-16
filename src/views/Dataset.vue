<template>
  <div class="row">
    <div class="col-md-12">
      <h5>{{ dataset.type }}</h5>
      <h1>Dataset: {{ dataset.name }}</h1>
      <h3 v-if="dataset.tags">Tags: {{ dataset.tags }}</h3>
      <p>By {{ dataset.author }}</p>
      <DataTable :headers="datasetHeaders" :data="datasetData" />
    </div>
  </div>
</template>

<script>
import DataTable from "../components/DataTable";

export default {
  name: "Dataset",
  components: {
    DataTable
  },
  computed: {
    datasetData() {
      return this.$store.state.dataset.data;
    },
    datasetHeaders() {
      try {
        var oneData = Object.keys(this.$store.state.dataset.data[0]);
      } catch (err) {
        this.$store.commit(
          "setErrorMessage",
          "Unable to retrieve data for this dataset"
        );
      }
      var headers = [];
      //format the headers for DataTable
      for (var header in oneData) {
        headers.push({ text: oneData[header], value: oneData[header] });
      }

      return headers;
    },
    dataset() {
      return this.$store.state.dataset;
    }
  },
  created() {
    this.$store.dispatch("fetchOneDataset", this.$route.params.id);
  }
};
</script>

<style scoped></style>
