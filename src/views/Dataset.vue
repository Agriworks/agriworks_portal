<template>
<div class="row">
  <div class="col-md-12">
  <h5> {{dataset.type}} </h5>
  <h1> Dataset: {{ dataset.name }} </h1>
  <h3 v-if="dataset.tags"> Tags: {{ dataset.tags }} </h3>
  <p> By {{ dataset.author }} </p>
  <DataTable :headers="dataset.headers" :data="dataset.data"/>
  </div>
</div>
</template>

<script>
import DataTable from "../components/DataTable"

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
      this.$store.dispatch('fetchDataset')
    }
}
</script>

<style scoped>
</style>