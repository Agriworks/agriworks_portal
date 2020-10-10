
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

            function getColor(d) {
              return d > 1000 ? '#800026' :
                    d > 500  ? '#BD0026' :
                    d > 200  ? '#E31A1C' :
                    d > 100  ? '#FC4E2A' :
                    d > 50   ? '#FD8D3C' :
                    d > 20   ? '#FEB24C' :
                    d > 10   ? '#FED976' :
                                '#FFEDA0';
            }

            function hexToRgb(hex) {
              var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
              return result ? {
                r: parseInt(result[1], 16),
                g: parseInt(result[2], 16),
                b: parseInt(result[3], 16)
              } : null;
            }

            var getStyle = function (feature, resolution) {
                if (feature.get('density') < 10) {
                    return new Style({
                        fill: new Fill({
                            color: [255, 0, 0, 0.2] // semi-transparent red
                        })
                    });
                }
                else {
                    return new Style({
                        stroke: new Stroke({
                          color: 'white',
                          lineDash: [1],
                          width: 1
                        }),
                        fill: new Fill({
                            color: [hexToRgb(getColor(feature.get('density'))).r, hexToRgb(getColor(feature.get('density'))).g, hexToRgb(getColor(feature.get('density'))).b, 0.2]
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