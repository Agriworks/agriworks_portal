<template>
  <div>
    <div class="row">
      <div v-for="view in agriWatchViews" v-bind:key="view.id">
        <ViewCard :id="view.id" />
      </div>
      <v-card primary tile class="createViewCard" hover>
        <v-button v-on:click="showCreatedDialog">Create New View</v-button>
      </v-card>
    </div>

    <v-dialog
      v-model="createViewDialog"
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
                v-model="dataset"
                :items="datasets"
                label="Dataset"
                required
              ></v-select>
            </v-row>
            <v-row>
              <v-select
                v-model="visualType"
                :items="visualTypes"
                label="Visual Type"
                required
              ></v-select>
            </v-row>
          </v-container>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>

        </v-card-actions>
      </v-card>
    </v-dialog>

  </div>
</template>

<script>
import AgriWatchViewCard from "../components/AgriWatchViewCard.vue";
import LoadingIndicator from "../LoadingIndicator";

export default {
    name: "AgriWatch",
    components: {
      AgriWatchViewCard
    },
    data() {
      return {
        createDialog: false
      }
    },
    computed: {
      agriWatchViews() {
        return this.$store.state.datasets;
      },
      datasets() {
        return this.$store.state.datasets;
      }
    },
    methods: {
      showCreatedDialog() {
        this.createDialog = true
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