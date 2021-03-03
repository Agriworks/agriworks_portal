<template>
  <div id="datasetContainer">
    <div v-if="dataset">
      <div class="row">
        <div class="d-flex justify-content-center col-sm-6" id="datasetInfoContainer">
          <h5>{{dataset.type}}</h5>
          <h1>{{ dataset.name }}</h1>
          <div v-if="hideTags">
              <div v-if="dataset.tags.length < 1">
                <p>No tags</p>
              </div>
            <div v-else>
              <p
                @click="changeTagStatus()"
                style="color: #96D34A; text-decoration: underline;"
              >Show tags +</p>
            </div>
          </div>
          <div v-else>
            <p
              @click="changeTagStatus()"
              style="color: #96D34A; text-decoration: underline;"
            >Hide tags -</p>
            <div>
              <span>
                <v-chip
                  v-for="tag in dataset.tags"
                  v-bind:key="tag"
                  color="#96D34A"
                  style="margin-left: 5px;margin-bottom: 5px;"
                >{{ tag }}</v-chip>
              </span>
            </div>
          </div>
          <p>By {{ dataset.author }}</p>
          <div class="row">
            <div class="col-md-3">
              <v-btn
                dark
                elevation="0"
                class="rounded-lg"
                color="#4caf50"
                style="margin-right:0.5rem;"
                @click="downloadDataset()"
              >
                <v-icon small>mdi-arrow-down-circle-outline</v-icon>Download
              </v-btn>              
            </div>
            <div class="col-md-3">
              <v-btn
                v-if="this.dataset.allowToEdit"
                dark
                elevation="0"
                class="rounded-lg"
                color="#4caf50"
                style="margin-right:0.5rem;"
                @click.stop="changeLabelDialog = true"
              >
                <v-icon small>mdi-label-multiple-outline</v-icon>Change labels
              </v-btn>
              <v-dialog
                v-model="changeLabelDialog"
                max-width="600"
              >
                <v-card>
                  <v-card-title class="headline">
                    Change label
                  </v-card-title>

                  <v-card-text>
                    Choose label from dataset to change
                  </v-card-text>
                  <v-card-text>
                    <div class="row">
                      <div class="col-md-4">
                        <v-select
                          :items="dataset.headers"
                          label="Choose column"
                          v-model="chosenColumn"
                          outlined
                        ></v-select>
                      </div>
                      <div class="col-md-4">
                        <v-text-field
                          label="Current Label"
                          v-model="columnLabel"
                          outlined
                          disabled
                        ></v-text-field>
                      </div>
                      <div class="col-md-4">
                        <v-select 
                          :items="columnLabelOptions"
                          label="New Label"
                          v-model="newLabel"
                          outlined
                        ></v-select>
                      </div>
                    </div>
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      color="green darken-1"
                      text
                      @click="changeLabel()"
                    >
                      Change
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>

            </div>
          </div>
        </div>

        <div
          class="col-sm-6"
          v-if="Object.keys(this.dataset.legend).length > 0"
          id="metadataContainer"
        >
          <v-container>
            <v-layout>
              <v-flex>
                <v-card hover id="metadataCard">
                  <v-card-title>
                    <h2>Metadata</h2>
                  </v-card-title>
                  <v-card-text>
                    <div v-for="(value, name) in dataset.legend" :key="value">
                      <strong>{{ name }}</strong>
                      : {{ value }}
                    </div>
                  </v-card-text>
                </v-card>
              </v-flex>
            </v-layout>
          </v-container>
        </div>
      </div>

      <div class="row">
        <div v-for="view in agriWatchViews" v-bind:key="view.id">
          <div v-if="dataset.name === view.dataset">
            <AgriWatchViewCard :agriWatchView="view" />
          </div>
        </div>
      </div>


      <div class="row">
        <DataTable
          :headers="dataset.headers"
          :data="data"
          :isLoading="tableIsLoading"
          id="datatable"
        />
        <div
          class="row"
          v-if="additionalDataObjectsLoading"
          id="SubsequentDataObjectLoadingIndicator"
        >
          <p>Loading data ...</p>
          <LoadingIndicator />
        </div>
      </div>
    </div>
    <div v-else>
      <LoadingIndicator/>
    </div>
  </div>
</template>



<script>
import AgriWatchViewCard from "../components/AgriWatchViewCard.vue";
import DataTable from "../components/DataTable";
import LoadingIndicator from "../components/LoadingIndicator";
import api from "../api";
import notify from "../utilities/notify";
import { colors } from "../utilities/branding";
import $ from "jquery";

export default {
  name: "Dataset",
  components: {
    AgriWatchViewCard,
    DataTable,
    LoadingIndicator
  },
  data() {
    return {
      hideTags: true,
      dataset: null,
      data: [],
      cacheId: null,
      tableIsLoading: false,
      additionalDataObjectsLoading: false,
      changeLabelDialog: false,
      chosenColumn: "",
      columnLabel: "",
      newLabel: "",
      changedLabelIndex: -1,
      columnLabelOptions: ["time_day","time_month","time_year","loc_state","loc_district","loc_village","loc_lat","loc_lng","data"],
    };
  },
  computed: {
    agriWatchViews() {
      return this.$store.state.userAgriWatchViews;
    }
  },
  created() {
    this.tableIsLoading = true
    api.fetchDatasetInfo(this.$route.params.id)
      .then(response => {
        this.dataset = response.data;
        api.fetchPrimaryDatasetObjects(this.$route.params.id)
        .then((response) => {
          this.data = response.data.datasetObjects;
          this.tableIsLoading = false;
          if (response.data.cacheId) {
            this.cacheId = response.data.cacheId;
          }
        })
        .catch((error) => {
          notify(error.response.data.message, colors.red);
          this.$router.push("/browse").catch(err => {});
        });
      })
      .catch((error) => {
        notify(error.response.data.message, colors.red);
        this.$router.push("/browse").catch(err => {});
      });
    $(window).scroll(() => {
      if ($(window).scrollTop() + $(window).height() == $(document).height()) {
        if (this.cacheId && !this.additionalDataObjectsLoading) {
          this.additionalDataObjectsLoading = true;
          api
            .fetchSubsequentDatasetObjects(this.cacheId)
            .then(response => {
              this.data = this.data.concat(response.data.datasetObjects);
              this.additionalDataObjectsLoading = false;
              if (response.data.cacheId) {
                this.cacheId = response.data.cacheId;
              } else {
                this.cacheId = null;
              }
            })
            .catch(() => {
              notify("Error fetching subsequent dataset objects.", colors.red);
            });
        }
      }
    });
  },
  destroyed() {
    if (this.cacheId) {
      api.evictDatasetFromCache(this.cacheId).catch(() => {
        notify("Error evicting dataset from cache.", colors.red);
      });
    }
    this.cacheId = null;
    this.dataset = null;
    this.data = null;
  },
  methods: {
    changeTagStatus() {
      this.hideTags = !this.hideTags;
    },
    downloadDataset() {
      api
        .downloadDataset(this.$route.params.id)
        .then(response => {
          const fileURL = window.URL.createObjectURL(new Blob([response.data]));
          let fileLink = document.createElement("a");
          const fileName = this.$route.params.id + ".csv";

          fileLink.href = fileURL;
          fileLink.setAttribute("download", fileName);
          document.body.appendChild(fileLink);

          fileLink.click();
        })
        .catch(() => {
          notify(
            "Unable to download file. Please try again later.",
            colors.red
          );
        });
    },
    changeLabel() {
      this.changeLabelDialog = false
      this.dataset.columnLabels[this.changedLabelIndex] = this.newLabel
      api
        .changeDatasetLabel(this.$route.params.id, JSON.stringify(this.dataset.columnLabels), this.$store.state.user)
        .then(res => {notify(res.data.message, colors.green)})
        .catch(err=> {notify(err.data.message, colors.red)})
    }
  },
  mounted() {
    this.$store.dispatch("fetchAgriWatchViews");
  },
    watch: {
    chosenColumn: function() {
      let index = this.dataset.headers.findIndex(x => x.text === this.chosenColumn)
      this.changedLabelIndex = index
      this.columnLabel = this.dataset.columnLabels[index]
    }
  },

};
</script>

<style scoped>
#datatable {
  width: 100%;
  border: 2px solid #267a35de;
  border-radius: 4px;
}

#datasetInfoContainer {
  flex-direction: column;
}

#metadataCard {
  border: 1px solid #a2e510;
}

#SubsequentDataObjectLoadingIndicator {
  display: flex;
  flex-direction: column;
  text-align: center;
  margin-top: 1rem;
}
</style>
