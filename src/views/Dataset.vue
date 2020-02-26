<template>
<div class="row">
  <div class="col-md-12">
  <h5> {{dataset.type}} </h5>
  <h1> {{ dataset.name }} </h1>
  <h3 v-if="dataset.tags"> Tags: {{ dataset.tags }} </h3>
  <p> By {{ dataset.author }} </p>

  <!-- Visualization modal -->
  <div class="col text-right">
    <button
      class="btn btn-primary"
      type="button"
      id="visualizeData"
      data-toggle="modal"
      data-target="#visualModal"
    >Visualize
    </button>
  </div>

  <div
      class="modal fade"
      id="visualModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Data Visualization</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form class="form-signin">
              <div class="form-label-group">
                <label for="inputEmail">Choose your X and Y axis</label>
                <v-select v-model="xAxis" required :items="dataset.headers" label="X axis"></v-select>
                <v-select v-model="yAxis" required :items="dataset.headers" label="Y axis"></v-select>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button id="showChartBtn" class="btn btn-primary" data-dismiss="modal" @click="showChart">Create</button>
          </div>
        </div>
      </div>
    </div>

  <DataTable :headers="dataset.headers" :data="dataset.data"/>
  <linechart :dataset="chartdata" :visible="chartVisible"/>
  </div>
</div>
</template>

<script>
import DataTable from "../components/DataTable";
import linechart from "../components/LineChart";

export default {
    name: "Dataset", 
    
    data() {
      return {
        xAxis: "Empty",
        yAxis: "Empty",
        chartdata: [{x: 0, y: 0}],
        chartVisible: 0
      }
    },

    components: {
      DataTable,
      linechart
    },
    computed: {
      dataset() {
        return this.$store.state.dataset
      },
    },
    methods: {
      showChart() {
        this.chartdata = this.dataset.data.map(entry => ({ x: entry[this.xAxis], y: entry[this.yAxis] }));
        this.chartVisible = 1;
      }
    },
    created() {
      this.$store.dispatch('fetchOneDataset', this.$route.params.id)
    }
}
</script>

<style scoped>

</style>
