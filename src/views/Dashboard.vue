<template>
  <div>
    <h1 class="datasetTitle">Trending Datasets</h1>
    <div class="accordian" id="types">
      <v-card class="card">
        <div class="card-header" id="popularHeader">
          <h2 class="mb-0">
            <v-btn
              text
              type="button"
              data-toggle="collapse"
              data-target="#popularContent"
              aria-expanded="true"
              aria-controls="popularContent"
            >Popular</v-btn>
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
            <v-btn
              text
              type="button"
              data-toggle="collapse"
              data-target="#recentContent"
              aria-expanded="false"
              aria-controls="recentContent"
            >Recent</v-btn>
          </h2>
        </div>

        <div
          id="recentContent"
          class="collapse"
          aria-labelledby="headerRecent"
          data-parent="#types"
        >
          <div class="card-body">
            <div id="recentCarousel" class="carousel slide" data-ride="carousel">
              <div v-if="recentDatasets.length > 0" class="carousel-inner">
                <div
                  class="carousel-item"
                  v-for="(dataset, index) in recentDatasets"
                  v-bind:key="dataset.id"
                  v-bind:class="{ active: index == 0}"
                >
                  <DatasetCard v-bind:dataset="dataset" />
                </div>
              </div>
              <div v-else class="noneTag">
                <h6>
                  You haven't opened any datasets recently. Click
                  <span>
                    <a href @click="redirectBrowse">Browse</a>
                  </span> to view the datasets.
                </h6>
              </div>
              <a
                v-if="recentDatasets.length > 0"
                class="carousel-control-prev"
                href="#recentCarousel"
                role="button"
                data-slide="prev"
              >
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="sr-only">Previous</span>
              </a>
              <a
                v-if="recentDatasets.length > 0"
                class="carousel-control-next"
                href="#recentCarousel"
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
        <div class="card-header" id="headerNew">
          <h2 class="mb-0">
            <v-btn
              text
              type="button"
              data-toggle="collapse"
              data-target="#newContent"
              aria-expanded="false"
              aria-controls="newContent"
            >New</v-btn>
          </h2>
        </div>

        <div id="newContent" class="collapse" aria-labelledby="headerNew" data-parent="#types">
          <div class="card-body">
            <div id="newCarousel" class="carousel slide" data-ride="carousel">
              <div v-if="newDatasets.length > 0" class="carousel-inner">
                <div
                  class="carousel-item"
                  v-for="(dataset, index) in newDatasets"
                  v-bind:key="dataset.id"
                  v-bind:class="{ active: index == 0}"
                >
                  <DatasetCard v-bind:dataset="dataset" />
                </div>
              </div>
              <div v-else class="noneTag">
                <h6>
                  You don't have any recently created datasets. Click on the Create Tab on the
                  <span>
                    <a href @click="redirectBrowse">Browse</a>
                  </span> screen to upload a new dataset.
                </h6>
              </div>
              <a
                v-if="newDatasets.length > 0"
                class="carousel-control-prev"
                href="#newCarousel"
                role="button"
                data-slide="prev"
              >
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="sr-only">Previous</span>
              </a>
              <a
                v-if="newDatasets.length > 0"
                class="carousel-control-next"
                href="#newCarousel"
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
    </div>
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
    redirectBrowse() {
      this.$router.push("/browse");
    }
  },

  computed: {
    popularDatasets() {
      return this.$store.state.popularDatasets;
    },
    recentDatasets() {
      return this.$store.state.recentDatasets;
    },
    newDatasets() {
      return this.$store.state.newDatasets;
    }
  },

  beforeMount() {
    this.$store.dispatch("fetchPopularDatasets");
    this.$store.dispatch("fetchRecentDatasets");
    this.$store.dispatch("fetchNewDatasets");
  },

  data() {
    return {
      slide: 0,
      sliding: true,
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

.carousel-inner {
  padding-left: 350px;
}

.datasetTitle {
  margin-top: 20px;
  margin-bottom: 50px;
}

.noneTag {
  padding-left: 240px;
}
</style>