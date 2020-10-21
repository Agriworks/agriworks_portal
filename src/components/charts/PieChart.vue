<script>
import { Pie } from 'vue-chartjs'

export default {
  extends: Pie,
  props: ['chartdata'],
  data() {
    return {
        options: {
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