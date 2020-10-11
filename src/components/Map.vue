
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
  props: ['dataset', 'hasMapData'],
  watch: {
    hasMapData: {
      immediate: true,
      handler(val, oldVal){
        console.log("The Prop Changed")
        console.log(val)
        console.log(oldVal)
        if(val == true){
          console.log("Intialzing map")
          this.initiateMap()
        }
      }
    }
  },
  methods: {
    initiateMap() {
      // create vector layer
      console.log("creating map")
  
        var geojsonObject;  
        
        console.log("Dataset")
        console.log(this.dataset)

            geojsonObject = this.dataset

             var vectorSource = new VectorSource({
              features: new GeoJSON().readFeatures(geojsonObject),
            });

            var getStyle = function (feature, resolution) {
                var color = feature.get('color')
                if(color){

                  return new Style({
                        stroke: new Stroke({
                          color: 'white',
                          lineDash: [1],
                          width: 1
                        }),
                        fill: new Fill({
                            
                            color: [color[0], color[1], color[2],  0.4]
                        })
                    }); 
                }
            };

            var vector = new VectorLayer({
              source: vectorSource,
              style: function (feature, resolution) {
                return getStyle(feature, resolution);
                }
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