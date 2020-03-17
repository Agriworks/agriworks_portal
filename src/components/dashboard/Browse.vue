<template>
<div>
  <div class="row" v-if="this.datasets.length > 0">
    <div v-for="dataset in datasets" v-bind:key="dataset.id">
      <DatasetCard v-bind:dataset="dataset" />
    </div>
    <div style="background-color:green;width:100vw;height:100px;display:block" v-intersect.once.quiet="onIntersect">

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
  data(){
    return {
      pageNumber: 0
    }
  },
  computed: {
    datasets() {
      return this.$store.state.datasets;
    }
  },
  methods: {
    onIntersect(){
      this.$store.dispatch("fetchDatasets", this.pageNumber++);
      console.log("interesect")
    }
  },
  mounted() {
    this.$store.dispatch("fetchDatasets", this.pageNumber);
  }
};
</script>
<style scoped></style>
