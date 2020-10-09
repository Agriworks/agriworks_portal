
<template>

    <div id="map"></div>

</template>
<script>

import api from "../api";

// import openlayer css for style
import "ol/ol.css";
// This is library of openlayer for handle map
import Map from "ol/Map";
import View from "ol/View";
import { defaults as defaultControls, ScaleLine } from "ol/control";
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer';
import {OSM, Vector as VectorSource} from 'ol/source';

import Feature from 'ol/Feature';
import GeoJSON from 'ol/format/GeoJSON';
import {Circle as CircleStyle, Fill, Stroke, Style} from 'ol/style';
export default {
  async mounted() {
    await this.initiateMap();
  },
  methods: {
    initiateMap() {
      // create vector layer
      console.log("creating map")
  
        var geojsonObject;  
        api.getMap()

        api.getMap().then(
          response => {
            geojsonObject = response.data.data

             var vectorSource = new VectorSource({
              features: new GeoJSON().readFeatures(geojsonObject),
            });

            var vector = new VectorLayer({
              source: vectorSource
            });

            var raster = new TileLayer({
              source: new OSM(),
            });
            // create map with 2 layer
            var map = new Map({
              controls: defaultControls().extend([
                new ScaleLine({
                  units: "degrees",
                }),
              ]),
              target: "map",
              layers: [raster, vector],
              view: new View({
                projection: "EPSG:4326",
                center: [0, 0],
                zoom: 2,
              }),
            });


          }).catch(
            console.log("Something went wrong")
          )
        

       

    // var vectorLayer = new VectorLayer({
    // source: new VectorSource({
    //   url: 'https://leafletjs.com/examples/choropleth/us-states.js',
    //     format: new GeoJSON(),
    // })});

    //   var source = new VectorSource({
    //     features: new GeoJSON().readFeatures(geojsonObject),
    //     });


        
        // create title layer
        
     },
  },
};
</script>
<style>
#map {
  margin: 0;
  padding: 0;
  height: 500px;
  width: 99%;
}

</style>