<template>
<div class="row">
  <div class="col-md-12">
  <h5> {{dataset.type}} </h5>
  <h1> {{ dataset.name }} </h1>
  <h3 v-if="dataset.tags"> Tags: {{ dataset.tags }} </h3>
  <p> By {{ dataset.author }} </p>
  <v-app id="app">
  <v-container ma-0 pa-0>
    <v-layout>
      <v-flex xs12 sm6>
        <v-card hover>

          <v-card-title>
            <h2>Metadata</h2>
          </v-card-title>
          
          <v-card-text>
            <p>{{dataset.meta}}</p>
          </v-card-text>
          
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</v-app>
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
