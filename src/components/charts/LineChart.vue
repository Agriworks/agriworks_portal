<script>
import { Line } from 'vue-chartjs'

export default {
  extends: Line,
  props: ['chartdata'],
  data() {
    return {
        options: {
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero: true
                  }
              }]
          },
          responsive: true,
          maintainAspectRatio: false
      },
    }
  },
  mounted () {
    this.renderChart(this.chartdata, this.options)
  }
}
</script>

<style>
</style>