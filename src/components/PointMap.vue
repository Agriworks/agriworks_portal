<template>
  <div>
  </div>
</template>

<script>
import { loadModules } from 'esri-loader';

export default {
  name: 'point-map',
  props: ['data'],
  mounted() {
    // lazy load the required ArcGIS API for JavaScript modules and CSS
    loadModules(['esri/Map', 'esri/views/MapView', 'esri/Graphic', 'esri/layers/GraphicsLayer'], { css: true })
    .then(([Map, MapView, Graphic, GraphicsLayer]) => {

      // The heatmap renderer assigns each pixel in the view with
      // an intensity value. The ratio of that intensity value
      // to the maxPixel intensity is used to assign a color
      // from the continuous color ramp in the colorStops property

      var graphics = [];

      for (var key in this.data) {
        var item = this.data[key]
        var pointGraphic = new Graphic({
          attributes: {
            name: item.place
          },
          geometry: {
            type: "point",                     // autocasts as new Point()
            longitude: item.longitude,
            latitude: item.latitude
          },
          symbol: {
            type: "simple-marker",             // autocasts as new SimpleMarkerSymbol()
            color: [ 226, 119, 40 ],
            outline: {                         // autocasts as SimpleLineSymbol()
              color: [ 255, 255, 255 ],
              width: 2
            }
          },
          popupTemplate: {                     // autocasts as new PopupTemplate()
            title: item.type,
            content: [{
              type: "fields",
              fieldInfos: [
                {
                  fieldName: "name",
                  label: "Place",
                  visible: true
                }
              ]
            }]
          },
        });
        graphics.push(pointGraphic);
      }

      const layer = new GraphicsLayer({
        graphics: graphics
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