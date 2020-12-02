<template>
  <div id="agriWatchViewContainer">
    <div v-if="agriWatchView">
      
    </div>
    <div v-else>
      <LoadingIndicator/>
    </div>
  </div>
</template>

<script>
import HeatMap from '../components/HeatMap.vue';
import LoadingIndicator from '../components/LoadingIndicator.vue';

export default {
  name: "AgriWatchView",
  components: {
    HeatMap,
    LoadingIndicator,
  },
  data() {
    return {
      agriWatchView: null,
    }
  }
}
</script>

<style scoped>

</style>