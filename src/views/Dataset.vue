<template>
<div id="datasetContainer">
    <div class="row">
      <div class="d-flex justify-content-center col-sm-6" id="datasetInfoContainer">
        <h5> {{dataset.type}} </h5>
        <h1> {{ dataset.name }} </h1>
        <h3 v-if="dataset.tags"> Tags: {{ dataset.tags }} </h3>
        <p> By {{ dataset.author }} </p>
      <div class="row">
        <div class="col-md-6">
          <v-btn dark color="#4caf50" id="downloadButton" v-on:click="downloadDataset">
            <v-icon>mdi-arrow-down-circle-outline</v-icon>Download
          </v-btn>
        </div>
      </div> 
      </div>
      <div class="col-sm-6">
          <v-container>
            <v-layout>
              <v-flex>
                <v-card hover id="metadataContainer">
                  <v-card-title>
                    <h2>Metadata</h2>
                  </v-card-title>
                  <v-card-text>
                    <div v-for="(value, name) in dataset.legend" :key="value">
                      <strong> {{ name }} </strong> : {{ value }}
                    </div>
                  </v-card-text>
          
                </v-card>
              </v-flex>
            </v-layout>
          </v-container>
      </div>
    </div>
    <div class="row">
      <DataTable :headers="dataset.headers" :data="dataset.data" id="datatable"/>
    </div>
  </div>
  
</template>



<script>
import DataTable from "../components/DataTable";
import api from "../api";

export default {
    name: "Dataset", 
    components: {
      DataTable
    },
    computed: {
      dataset() {
        return this.$store.state.dataset
      }
    },
    created() {
      this.$store.dispatch('fetchOneDataset', this.$route.params.id)
    },
    methods: {
      downloadDataset(){
        api.downloadDataset(this.$route.params.id)
        .then(response => {
          const fileURL = window.URL.createObjectURL(new Blob([response.data]));
          let fileLink = document.createElement('a');
          const fileName = this.$route.params.id + '.csv';

          fileLink.href = fileURL;
          fileLink.setAttribute('download', fileName);
          document.body.appendChild(fileLink);

          fileLink.click();
        })
        .catch(response => {
          console.log(response);
        })
      }
    }
}
</script>

<style scoped>

#datatable {
  width: 100%;
  border: 2px solid #267a35de;
  border-radius: 4px;
}

#datasetInfoContainer {
  flex-direction: column
}

#metadataContainer {
  border: 1px solid #a2e510;
}
</style>
