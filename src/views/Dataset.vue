<template>
  <div v-if="dataset.legend==='{}'">
    <div class="row">
      <div class="col-md-12">
        <h5> {{dataset.type}} </h5>
        <h1> {{ dataset.name }} </h1>
        <h3 v-if="dataset.tags"> Tags: {{ dataset.tags }} </h3>
        <p> By {{ dataset.author }} </p>
        <DataTable :headers="dataset.headers" :data="dataset.data"/>
      </div>
    </div>
  </div>
  <div v-else>
    <div class="row">
      <div class="col-sm-6">
        <h5> {{dataset.type}} </h5>
        <h1> {{ dataset.name }} </h1>
        <h3 v-if="dataset.tags"> Tags: {{ dataset.tags }} </h3>
        <p> By {{ dataset.author }} </p>
      </div>
      <div class="col-sm-6">
        <v-app id="app">
          <v-container fluid>
            <v-layout>
              <v-flex>
                <v-card hover>
                  <v-card-title>
                    <h2>Metadata</h2>
                  </v-card-title>
          
                  <v-card-text>
                    <div v-for="(value, name) in dataset.legend" :key="value">
                      {{ name }}: {{ value }}
                    </div>
                  </v-card-text>
          
                  </v-card>
                </v-flex>
              </v-layout>
            </v-container>
          </v-app>
      </div>
    </div>
    <div class="row">
      <DataTable :headers="dataset.headers" :data="dataset.data"/>
    </div>
  </div>
  
</template>



<script>
import DataTable from "../components/DataTable";

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
    }
}
</script>

<style scoped></style>
