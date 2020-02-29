<template>
  <div class="accordian" id="types">
    <v-card class="card">
      <div class="card-header" id="popularHeader">
        <h2 class="mb-0">
          <button
            class="btn btn-link"
            type="button"
            data-toggle="collapse"
            data-target="#popularContent"
            aria-expanded="true"
            aria-controls="popularContent"
          >Popular</button>
        </h2>
      </div>

      <div
        id="popularContent"
        class="collapse show"
        aria-labelledby="popularHeader"
        data-parent="#types"
      >
        <div class="card-body">
          <div id="popularCarousel" class="carousel slide" data-ride="carousel">
            <div class="carousel-inner">
              <div
                class="carousel-item"
                v-for="(dataset, index) in popularDatasets"
                v-bind:key="dataset.id"
                v-bind:class="{ active: index == 0}"
              >
                <DatasetCard v-bind:dataset="dataset" />
              </div>
            </div>
            <a
              class="carousel-control-prev"
              href="#popularCarousel"
              role="button"
              data-slide="prev"
            >
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="sr-only">Previous</span>
            </a>
            <a
              class="carousel-control-next"
              href="#popularCarousel"
              role="button"
              data-slide="next"
            >
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="sr-only">Next</span>
            </a>
          </div>
        </div>
      </div>
    </v-card>

    <v-card class="card">
      <div class="card-header" id="headerRecent">
        <h2 class="mb-0">
          <button
            class="btn btn-link"
            type="button"
            data-toggle="collapse"
            data-target="#recentContent"
            aria-expanded="false"
            aria-controls="recentContent"
          >Recent</button>
        </h2>
      </div>

      <div id="recentContent" class="collapse" aria-labelledby="headerRecent" data-parent="#types">
        <div class="card-body">
          <div id="recentCarousel" class="carousel slide" data-ride="carousel">
            <div class="carousel-inner">
              <div
                class="carousel-item"
                v-for="(dataset, index) in recentDatasets"
                v-bind:key="dataset.id"
                v-bind:class="{ active: index == 0}"
              >
                <DatasetCard v-bind:dataset="dataset" />
              </div>
            </div>
            <a class="carousel-control-prev" href="#recentCarousel" role="button" data-slide="prev">
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="sr-only">Previous</span>
            </a>
            <a class="carousel-control-next" href="#recentCarousel" role="button" data-slide="next">
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="sr-only">Next</span>
            </a>
          </div>
        </div>
      </div>
    </v-card>

    <v-card class="card">
      <div class="card-header" id="headerNew">
        <h2 class="mb-0">
          <button
            class="btn btn-link"
            type="button"
            data-toggle="collapse"
            data-target="#newContent"
            aria-expanded="false"
            aria-controls="newContent"
          >New</button>
        </h2>
      </div>

      <div id="newContent" class="collapse" aria-labelledby="headerNew" data-parent="#types">
        <div class="card-body">
          <div id="newCarousel" class="carousel slide" data-ride="carousel">
            <div class="carousel-inner">
              <div
                class="carousel-item"
                v-for="(dataset, index) in newDatasets"
                v-bind:key="dataset.id"
                v-bind:class="{ active: index == 0}"
              >
                <DatasetCard v-bind:dataset="dataset" />
              </div>
            </div>
            <a class="carousel-control-prev" href="#newCarousel" role="button" data-slide="prev">
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="sr-only">Previous</span>
            </a>
            <a class="carousel-control-next" href="#newCarousel" role="button" data-slide="next">
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="sr-only">Next</span>
            </a>
          </div>
        </div>
      </div>
    </v-card>
  </div>
</template>

<script>
import DatasetCard from "@/views/DatasetCard.vue";

export default {
  name: "DashboardView",
  components: {
    DatasetCard
  },

  methods: {
    togglePopular() {}
  },

  computed: {
    popularDatasets() {
      return this.$store.state.popularDatasets;
    },
    recentDatasets() {},
    newDatasets() {}
  },

  beforeMount() {
    this.$store.dispatch("fetchPopularDatasets");
  },

  data() {
    return {
      slide: 0,
      sliding: null,
      first: true
    };
  }
};
</script>


<style scoped>
.carousel-item.active {
  margin: auto;
}
.container {
  margin: auto;
}
.carousel-control-next,
.carousel-control-prev {
  filter: invert(100%);
}
</style>