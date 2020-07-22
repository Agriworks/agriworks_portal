<template>
  <div>
  </div>
</template>

<script>
import { loadModules } from 'esri-loader';

export default {
  name: 'heat-map',
  props: ['data','latCol','lonCol'],
  watch: {
    data: {
      handler() {
        // this gets tri
        loadModules(['esri/Map', 'esri/views/MapView', 'esri/Graphic', 'esri/layers/FeatureLayer'], { css: true })
        .then(([Map, MapView, Graphic, FeatureLayer]) => {

          // The heatmap renderer assigns each pixel in the view with
          // an intensity value. The ratio of that intensity value
          // to the maxPixel intensity is used to assign a color
          // from the continuous color ramp in the colorStops property

          var graphics = [];

          var lat = this.latCol
          var lon = this.lonCol
          var id = this.idCol
          
          for (var key in this.data) {
            var item = this.data[key]
            var pointGraphic = new Graphic({
              
              geometry: {
                type: "point",                     // autocasts as new Point()
                longitude: item[lon],
                latitude: item[lat]
              },
              symbol: {
                type: "simple-marker",             // autocasts as new SimpleMarkerSymbol()
                color: [ 226, 119, 40 ],
                outline: {                         // autocasts as SimpleLineSymbol()
                  color: [ 255, 255, 255 ],
                  width: 2
                }
              }
            });
            graphics.push(pointGraphic);
          }

          const renderer = {
            type: "heatmap",
            colorStops: [
              { color: "rgba(63, 40, 102, 0)", ratio: 0 },
              { color: "#472b77", ratio: 0.083 },
              { color: "#4e2d87", ratio: 0.166 },
              { color: "#563098", ratio: 0.249 },
              { color: "#5d32a8", ratio: 0.332 },
              { color: "#6735be", ratio: 0.415 },
              { color: "#7139d4", ratio: 0.498 },
              { color: "#7b3ce9", ratio: 0.581 },
              { color: "#853fff", ratio: 0.664 },
              { color: "#a46fbf", ratio: 0.747 },
              { color: "#c29f80", ratio: 0.83 },
              { color: "#e0cf40", ratio: 0.913 },
              { color: "#ffff00", ratio: 1 }
            ],
            maxPixelIntensity: 25,
            minPixelIntensity: 0
          };

          const layer = new FeatureLayer({
            source: graphics,
            renderer: renderer,
            objectIdField: "ObjectID"
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
      }
    }
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
  height: 1000px;
}
</style>