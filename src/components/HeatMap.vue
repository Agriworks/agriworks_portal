<template>
  <div>
  </div>
</template>

<script>
import { loadModules } from 'esri-loader';

export default {
  name: 'heat-map',
  props: ['data'],
  mounted() {
    // lazy load the required ArcGIS API for JavaScript modules and CSS
    loadModules(['esri/Map', 'esri/views/MapView', 'esri/Graphic', 'esri/layers/GraphicsLayer'], { css: true })
    .then(([Map, MapView, Graphic, GraphicsLayer]) => {

      // The heatmap renderer assigns each pixel in the view with
      // an intensity value. The ratio of that intensity value
      // to the maxPixel intensity is used to assign a color
      // from the continuous color ramp in the colorStops property
      const polyline = {
        type: "polyline",  // autocasts as new Polyline()
          paths: [
            [-111.30, 52.68],
            [-98, 49.5],
            [-93.94, 29.89]
          ]
      };

      const polylineSymbol = {
        type: "simple-line",  // autocasts as SimpleLineSymbol()
        color: [226, 119, 40],
        width: 4
      };

      const polylineAtt = {
        Name: "Keystone Pipeline",
        Owner: "TransCanada"
      };

      const polylineGraphic = new Graphic({
        geometry: polyline,
        symbol: polylineSymbol,
        attributes: polylineAtt
      });

      const layer = new GraphicsLayer({
        graphics: [polylineGraphic]
      });

      const map = new Map({
        basemap: "topo-vector",
        layers: [layer]
      });

      this.view = new MapView({
        container: this.$el,
        map: map,
        // center should be parameter passed in based on the dataset (lon/lat)
        center: [78, 20],
        zoom: 4
      });
    });
  },
  beforeDestroy() {
    if (this.view) {
      // destroy the map view
      this.view.container = null;
    }
  }
};

</script>

<style scoped>
div {
  padding: 2;
  margin: 2;
  width: 100%;
  height: 500px;
}
</style>