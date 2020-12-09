<template>
  <div>
    <div class="row">
      <div v-for="view in agriWatchViews" v-bind:key="view.id">
        <AgriWatchViewCard :agriWatchView="view" />
      </div>
      <v-card primary tile class="createViewCard" hover @click.stop="createDialog = true">
        <v-card-title primary-title class="justify-center">
          <div>
            <h1 class="headline">+</h1>
          </div>
        </v-card-title>
      </v-card>
    </div>

    <v-dialog
      v-model="createDialog"
      scrollable
      eager
      max-width="80%">
      <v-card>
        <v-card-title>
          Create a new view
        </v-card-title>

        <v-card-text>
          <v-container>
            <v-row>
              <v-select
                v-model="createFromDataset"
                :items="datasets"
                label="Create From Dataset"
                required
              ></v-select>
            </v-row>
            <v-row>
              <v-select
                v-model="createVisualType"
                :items="visualTypes"
                label="Visual Type"
                required
              ></v-select>
            </v-row>
          </v-container>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
            <v-btn color="red darken-1" text @click="createDialog = false">Cancel</v-btn>
            <v-btn color="blue darken-1" text @click="createView">Create View</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </div>
</template>

<script>
import api from "../api";
import router from "../router";
import notify from "../utilities/notify";
import AgriWatchViewCard from "../components/AgriWatchViewCard.vue";

export default {
    name: "AgriWatch",
    components: {
      AgriWatchViewCard
    },
    data() {
      return {
        createDialog: false,
        createFromDataset: "",
        createVisualType: "",
        createXData: "",
        createYData: "",
        visualTypes: ["Heatmap"]
      }
    },
    computed: {
      agriWatchViews() {
        return this.$store.state.userAgriWatchViews;
      },
      datasets() {
        var retList = [];
        var datasets = this.$store.state.datasets;
        for (var i = 0; i < datasets.length; i++) {
          retList.push(datasets[i].name)
        }
        return retList
      }
    },
    methods: {
      createView() {
        console.log(this.createVisualType)
        api.createAgriWatchView(
          this.createFromDataset,
          this.createVisualType,
          this.createXData,
          this.createYData
        )
        .then(response => {
          this.$router.push(`/agri-watch-view/${response.data.message}`);
        })
        .catch(error => {
          notify(error.response.data.message);
        })
      }
    },
    mounted() {
      this.$store.dispatch("fetchAgriWatchViews");
      this.$store.dispatch("fetchDatasets");
    }
}
</script>

<style scoped>
.createViewCard {
  width: 300px;
  height: 200px;
  margin: 1rem;
  border: 2px solid var(--v-secondary-base);
  border-style: dashed;
  border-radius: 10px;
}

.viewType {
  font-weight: bold;
  color: var(--v-primary-base);
}

/*Makes the button not underline when you hover over it, not sure that it actually make it looks nice
If you do make it have an underline, make sure that the delete button also has an underline */
.popoutButton {
  text-decoration: none;
}
</style>