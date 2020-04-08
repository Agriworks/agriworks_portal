<template>
  <div>
    <div class="row" v-if="this.datasets.length > 0">
      <div v-for="dataset in datasets" v-bind:key="dataset.id">
        <DatasetCard v-bind:dataset="dataset" />
      </div>
    </div>
    <div class="row" v-else>
      <div class="col-md-12">
        <h6>No datasets found that match your query. Please search again.</h6>
      </div>
    </div>
    <div v-intersect.quiet="onIntersect"></div>
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
  data() {
    return {
      pageNumber: 0,
      loading: false
    };
  },
  computed: {
    datasets() {
      return this.$store.state.datasets;
    }
  },
  methods: {
    onIntersectPromise() {
      return new Promise((resolve, reject) => {
        this.$store.dispatch("fetchDatasets", ++this.pageNumber, true);
        resolve(response);
      }).catch(error => {
        reject(error);
      });
    },
    onIntersect() {
      if (this.pageNumber * 12 + 16 <= this.datasets.length) {
        this.loading = true;
        this.onIntersectPromise()
          .then(res => (this.loading = false))
          .catch(err => (this.loading = false));
      }
    }
  },
  mounted() {
    this.$store.dispatch("fetchDatasets");
  }
};
</script>
<style scoped></style>
