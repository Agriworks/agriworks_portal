<template>
  <div>
    <div class="row" v-if="this.datasets.length > 0">
      <div v-for="dataset in datasets" v-bind:key="dataset.id">
        <DatasetCard v-bind:dataset="dataset" />
      </div>

      <div v-intersect.quiet="onIntersect"></div>
      <div style="width:100vw;" v-if="this.loading">
        <LoadingIndicator />
      </div>
    </div>
    <div v-else>
      <LoadingIndicator />
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
      this.$store.dispatch("fetchDatasets", 0);
  }
};
</script>
<style scoped></style>
