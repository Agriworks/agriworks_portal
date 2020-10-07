<template>
  <div class="small">
    <pie-chart v-if="chosenGraph === `Pie`"   :chartdata="datacollection"></pie-chart>
    <bar-chart v-if="chosenGraph === `Bar`"   :chartdata="datacollection"></bar-chart>
    <line-chart v-if="chosenGraph === `Line`" :chartdata="datacollection"></line-chart>
  </div>
</template>

<script>
  import LineChart from './charts/LineChart.vue'
  import BarChart from './charts/BarChart.vue'
  import PieChart from './charts/PieChart.vue'

  export default {
    components: {
      LineChart,
      PieChart,
      BarChart
    },
    props: ['chosenGraph', 'datacollection'],
    data () {
      return {
      }
    },
    mounted () {
    },
    methods: {
    }
  }
</script>

<style>
  .small {
    min-width:100%;
    margin-bottom: 20px;
  }
</style>
