<template>
  <div>
    <div class="row">
      <div class="col-sm-6">
        <h5> {{dataset.type}} </h5>
        <h1> {{ dataset.name }} </h1>
        <h3 v-if="dataset.tags"> Tags: {{ dataset.tags }} </h3>
        <p> By {{ dataset.author }} </p>
      </div>
      <div class="col-sm-6">
        <v-app id="app">
          <v-container>
            <v-layout>
              <v-flex xs12 sm6 offset-xs8>
                <v-card hover>
                  <v-card-title>
                    <h2>Metadata</h2>
                  </v-card-title>
          
                  <v-card-text>
                    <p> Type: {{dataset.type}} </p>
                    <p> Name: {{ dataset.name }} </p>
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
