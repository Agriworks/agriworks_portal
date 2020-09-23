<template>
  <div>
    <v-stepper flat v-model="stepper">
      <v-stepper-header>
        <v-stepper-step :complete="stepper > 1" step="1">Select datasets</v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step :complete="stepper > 2" step="2">Pick a visualization tool</v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step :complete="stepper > 3" step="3">Select Data range/Generate</v-stepper-step>
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content step="1">
          <h3>Select datasets</h3>
          <h5>Select one or more dataset form the list below</h5>
          <v-select
            v-model="selectedDatasets"
            :items="datasetNames">
            multiple 
          ></v-select>
          <v-btn 
            @click="stepper = 2"
            x-large
            color="success"
            dark
            >
            Continue
          </v-btn>
        </v-stepper-content>
      </v-stepper-items>

      <v-stepper-items>
        <v-stepper-content step="2">
          <h3>This is step 2</h3>
          <v-btn 
            @click="stepper = 3"
            x-large
            color="success"
            dark
            >
            Continue
          </v-btn>
        </v-stepper-content>
      </v-stepper-items>

      <v-stepper-items>
        <v-stepper-content step="3">
          <h3>This is step 3</h3>
          <v-btn 
            x-large
            color="success"
            dark
            >
            Continue
          </v-btn>
        </v-stepper-content>
      </v-stepper-items>
    
    </v-stepper>
  </div>
</template>

<script>
export default {
  name: "Merge",
  data() {
    return {
      stepper: 1,
      selectedDatasets: [],
      selectedDatasetsId: [],
      selectedDatasetsName: [],
      selectedDatasetsHeaders: [],
    }
  },
  computed: {
    datasets() {
      return this.$store.state.datasets;
    },
    datasetNames() {
      return this.$store.state.datasets.map(dataset => dataset.name);
    }
  },
  methods: {
    fetchHeaders() {
      for(id of selectedDatasets) {
        api.fetchDatasetInfo(id)
        .then(response => {
          let headers = response.data.headers;
          let name = response.data.name;
          this.selectedDatasetName.push(name);
          this.selectedDatasetsHeaders.push(headers);
        })
      }
    }
  },
  mounted() {
    this.$store.dispatch("fetchDatasets");
    console.log(this.datasetNames);
  }
}
</script>

<style scoped>
.grid-container {
  display: grid;
}
</style>