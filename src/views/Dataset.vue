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
            <div class="col-md-6">
              <v-btn
                small
                dark
                color="#4caf50"
                id="downloadButton"
                style="margin-right:0.5rem;"
                @click="downloadDataset()"
              >
                <v-icon small>mdi-arrow-down-circle-outline</v-icon>Download
              </v-btn>
              
          <!-- Second option for heatmap icon
            <v-btn small dark color="purple">
            <v-icon small>mdi-graph-outline</v-icon> Visualize
          </v-btn> -->
          <v-btn small dark color="red" 
          @click.stop="heatMapDialog = true">
            <v-icon small>mdi-graph</v-icon>Heat Map            
          </v-btn>


          <v-dialog 
          v-model="userSelectDialog"
          scrollable
          eager
          max-width="80%"
          >
            <v-card>
              <v-card-title>
                Heatmap Configuration
              </v-card-title>
              
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6">
                      <v-select
                        v-model="lonCol"
                        :items="dataset.headers"
                        label="Longitude"
                        required
                      ></v-select>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-select
                        v-model="latCol"
                        :items="dataset.headers"
                        label="Latitude"
                        required
                      ></v-select>
                    </v-col>               
                  </v-row>
                </v-container>
                <div v-if="haveError" style="color: red">*Error: Latitude/Longitude data is invalid.*</div>
              </v-card-text>

              <v-divider></v-divider>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="userSelectDialog = false">Close</v-btn>
                <v-btn color="blue darken-1" text 
                  @click.stop="openHeatmapDialog">
                  Show</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

          <v-dialog
            v-model="heatMapDialog"
            scrollable
            eager
            max-width="80%">
            <v-card>
              <v-toolbar>
                <v-toolbar-title>Heat Map</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-items>
                  <v-btn icon @click=""heatMapDialog" = false">
                  <v-icon>mdi-close</v-icon>
                  </v-btn>
                </v-toolbar-items>
              </v-toolbar>
                   <Map :mapData="mapData" :hasMapData="hasMapData"> </Map>
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
import HeatMap from '../components/HeatMap.vue';
import DataTable from "../components/DataTable";
import LoadingIndicator from "../components/LoadingIndicator";
import Map from '../components/Map'
import api from "../api";
import notify from "../utilities/notify";
import { colors } from "../utilities/branding";
import $ from "jquery";

export default {
  name: "Dataset",
  components: {
    DataTable,
    LoadingIndicator,
    HeatMap,
    Map
  },
  data() {
    return {
      hideTags: true,
      dataset: null,
      data: [],
      cacheId: null,
      dataLoaded: false,
      tableIsLoading: true,
      additionalDataObjectsLoading: false,
      haveError: false,
      heatMapDialog: false,
      userSelectDialog: false,
      latCol:"",
      lonCol:"",
      mapData: null,
      hasMapData: false,
      colors: [],
      bucketGrades: []
    };
  },
  created() {
    api.fetchDatasetInfo(this.$route.params.id)
      .then(response => {
        this.dataset = response.data;
        api.fetchPrimaryDatasetObjects(this.$route.params.id)
        .then((response) => {
          this.data = response.data.datasetObjects;
          console.log("We are here")
          this.getMapData()
          this.tableIsLoading = false;
          this.dataLoaded = true;
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
    getMapData(){
      console.log("get map data method called")
      api.getMap(this.data, 'location', 'data').then(
        response => {
            this.mapData = response.data
            this.hasMapData = true
        }
      )
      
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
    openHeatmapDialog() {
      this.haveError = false
      for (var key in this.data){
        let lat = this.data[key][this.latCol];
        let lon = this.data[key][this.lonCol];
        if (!((-90 <= lat && lat <= 90) && (-180 <= lon && lon <= 180))){
          this.haveError = true;
          return;
        }
      }
      this.heatMapDialog = true;
      this.userSelectDialog = false;
    },
  }
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
