<template>
<div id="datasetContainer" v-if="this.dataset">
    <div class="row">
      <div class="d-flex justify-content-center col-sm-6" id="datasetInfoContainer">
        <h5> {{dataset.type}} </h5>
        <h1> {{ dataset.name }} </h1>
        <div v-if="hideTags">
          <div v-if="dataset.tags.length < 1">
            <p>No tags</p>
          </div>
          <div v-else>
            <p @click="changeTagStatus()" style="color: #96D34A; text-decoration: underline;">Show tags +</p>
          </div>
        </div>
        <div v-else>
          <p @click="changeTagStatus()" style="color: #96D34A; text-decoration: underline;">Hide tags -</p>
          <div>
            <span ><v-chip 
              v-for="tag in tags" 
              v-bind:key="tag"
              color="#96D34A" 
              style="margin-left: 5px;margin-bottom: 5px;">{{ tag }}
              </v-chip>
            </span>
          </div>
        </div>
        <p> By {{ dataset.author }} </p>
      <div class="row">
        <div class="col-md-6">
          <v-btn small dark color="#4caf50" id="downloadButton" v-on:click="downloadDataset" style="margin-right:0.5rem;">
            <v-icon small>mdi-arrow-down-circle-outline</v-icon>Download
          </v-btn>
          <v-btn small dark color="purple">
            <v-icon small>mdi-graph-outline</v-icon> Visualize
          </v-btn>
        </div>
      </div> 
      </div>
      <div class="col-sm-6" v-if="Object.keys(this.dataset.legend).length > 0" id="metadataContainer">
          <v-container>
            <v-layout>
              <v-flex>
                <v-card hover id="metadataCard">
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
  <div v-else>
    <div v-if="!hideLoadingIndicator">
      <LoadingIndicator/>
    </div>
  </div>
</template>



<script>
import DataTable from "../components/DataTable";
import LoadingIndicator from "../components/LoadingIndicator";
import api from '../api';
import notify from '../utilities/notify';
import { colors } from '../utilities/branding';

export default {
    name: "Dataset", 
    data(){
      return {
        hideTags : true,
        dataset: null,
        hideLoadingIndicator: false
      }
    },
    components: {
      DataTable,
      LoadingIndicator
    },
    methods: {
      changeTagStatus() {
        this.hideTags = !this.hideTags;
      }
    },
    created(){
      api.fetchDataset(this.$route.params.id)
      .then((response) => {
        this.dataset = response.data;
        console.log(this.dataset.legend);
        console.log(Object.keys(this.dataset.legend).length);
      })
      .catch((err) => {
        this.hideLoadingIndicator = true
        notify("Error fetching dataset. Please try again", colors.red);
      })
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
          notify("Unable to download file. Please try again later.", colors.red)
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

#metadataCard{
  border: 1px solid #a2e510;
}

</style>
