<template>
  <div>
  </div>
</template>

<script>
import { loadModules } from 'esri-loader';

export default {
  name: 'heat-map',
  props: 'data',
  mounted() {
    // lazy load the required ArcGIS API for JavaScript modules and CSS
    loadModules(['esri/Map', 'esri/views/MapView', 'esri/layers/FeatureLayer'], { css: true })
    .then(([Map, MapView, FeatureLayer]) => {
      const defaultSym = {
        type: "simple-fill", // autocasts as new SimpleFillSymbol()
        outline: {
          // autocasts as new SimpleLineSymbol()
          color: [128, 128, 128, 0.2],
          width: "0.5px"
        }
      };

      const renderer = {
        type: "simple", // autocasts as new SimpleRenderer()
        symbol: defaultSym,
        label: "U.S. County",
        visualVariables: [
          {
            type: "color",
            field: "POP_POVERTY",
            normalizationField: "TOTPOP_CY",
            legendOptions: {
              title: "% population in poverty by county"
            },
            stops: [
              {
                value: 0.1,
                color: "#FFFCD4",
                label: "<10%"
              },
              {
                value: 0.3,
                color: "#350242",
                label: ">30%"
              }
            ]
          }
        ]
      };

      const graduatedColorLayer = new FeatureLayer({
        url:
          "https://services.arcgis.com/V6ZHFr6zdgNZuVG0/arcgis/rest/services/counties_politics_poverty/FeatureServer/0",
        renderer: renderer,
        title: "Poverty in the southeast U.S.",
        popupTemplate: {
          // autocasts as new PopupTemplate()
          title: "{COUNTY}, {STATE}",
          content:
            "{POP_POVERTY} of {TOTPOP_CY} people live below the poverty line.",
          fieldInfos: [
            {
              fieldName: "POP_POVERTY",
              format: {
                digitSeparator: true,
                places: 0
              }
            },
            {
              fieldName: "TOTPOP_CY",
              format: {
                digitSeparator: true,
                places: 0
              }
            }
          ]
        }
      });

      const map = new Map({
        basemap: 'gray',
        layers: [graduatedColorLayer]
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