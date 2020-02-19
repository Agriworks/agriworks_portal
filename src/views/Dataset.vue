<template>
<div id="datasetContainer">
    <div class="row">
      <div class="d-flex justify-content-center col-sm-6" id="datasetInfoContainer">
        <h5> {{dataset.type}} </h5>
        <h1> {{ dataset.name }} </h1>
        <div v-if="hideTags">
          <p @click="changeTagStatus()" style="color: #96D34A; text-decoration: underline;">Show tags +</p>
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

export default {
    name: "Dataset", 
    data() {
      return {
        hideTags : true,
      };
    },
    methods: {
      changeTagStatus() {
        this.hideTags = !this.hideTags;
      }
    },
    components: {
      DataTable
    },
    computed: {
      dataset() {
        return this.$store.state.dataset
      },
      tags() {
        return this.$store.state.dataset.tags
      }
    },
    created() {
      this.$store.dispatch('fetchDataset', this.$route.params.id)
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
