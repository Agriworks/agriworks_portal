
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
import {Control, defaults as defaultControls, ScaleLine} from 'ol/control';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer';
import {OSM, Vector as VectorSource} from 'ol/source';

import Feature from 'ol/Feature';
import GeoJSON from 'ol/format/GeoJSON';
import {Circle as CircleStyle, Fill, Stroke, Style, Text} from 'ol/style';
import Select from 'ol/interaction/Select';
import {click, pointerMove} from 'ol/events/condition';

export default {
  props: ['mapData', 'hasMapData'],
  watch: {
    hasMapData: {
      immediate: true,
      handler(val, oldVal){
        if(val == true){
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
        
        console.log("Map Data")
        console.log(this.mapData)

            geojsonObject = this.mapData.data
            var colors = this.mapData.colors
            var bucketGrades = this.mapData.bucketGrades

             var vectorSource = new VectorSource({
              features: new GeoJSON().readFeatures(geojsonObject),
            });

            var getStyle = function (feature, resolution, highlighted) {
                var color = feature.get('color')
                var width = 1
                if(highlighted){
                    width = 4
                }
                if(color){
                  return new Style({
                        stroke: new Stroke({
                          color: 'white',
                          lineDash: [1],
                          width: width,
                        }),
                        fill: new Fill({
                          
                            color: [color[0], color[1], color[2],  0.4]
                        }),
                        text: new Text({
                          text: feature.get("NAME"),
                          font: '12px Calibri,sans-serif',
                          fill: new Fill({
                            color: '#000',
                          }),
                          stroke: new Stroke({
                            color: '#fff',
                            width: 3,
                          }),
                        }),
                    }); 
                }
            };

            var view = new View({
                projection: "EPSG:4326",
                center: [0, 0],
                zoom: 2,
            });

            var vector = new VectorLayer({
              source: vectorSource,
              style: function (feature, resolution) {
                return getStyle(feature, resolution, false);
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
              view: view
            });
            //selection

            var featureClicked = null
            //select on single click
            var selectSingleClick = new Select();

            map.addInteraction(selectSingleClick);
            selectSingleClick.on('select', function (e){
              var feature = e.selected[0]
              featureClicked = feature
              feature.setStyle(getStyle(feature, view.getResolution, true))
              var polygon = feature.getGeometry()
              view.fit(polygon, {padding: [30, 30, 30, 30]})
            })

            //select on pointermove

            var selectPointerMove = new Select({
              condition: pointerMove
            });

            map.addInteraction(selectPointerMove);
            selectPointerMove.on('select', function(e){
              var feature = e.selected[0]
              if(feature){ 
                if(featureClicked && featureClicked != feature){ //resets the style of the clicked feature if hovering over a new feature
                    featureClicked.setStyle(getStyle(featureClicked, view.getResolution, false)) 
                    featureClicked = null
                    selectSingleClick.getFeatures().clear()
                }
                feature.setStyle(getStyle(feature, view.getResolution, true))
              }else{
                if(featureClicked){
                    featureClicked.setStyle(getStyle(featureClicked, view.getResolution, true)) //if not hovering to new feature, keep clicked highlighted
                }
              }
            });


            
            function rgbToHex(c) {
              return "#" + ((1 << 24) + (c[0] << 16) + (c[1] << 8) + c[2]).toString(16).slice(1);
            }

            
            //have the colors array, passed from backend
            //have the labels array, passed from backend


            var element = document.createElement('div');
            element.className = 'legend ol-unselectable ol-control';

            console.log(colors)
            
            for(var i = 0; i < colors.length; i++) {
              element.innerHTML +=
            '<i style="background:' + rgbToHex(colors[i]) + '"></i> ' +
            bucketGrades[i] + (bucketGrades[i + 1] ? '&ndash;' + bucketGrades[i + 1] + '<br>' : '+');
            }


            var legend = new Control({
              element: element
            });

            map.addControl(legend)

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

.legend {
    line-height: 18px;
    color: #555;
    bottom: 2em;
    right: .5em;
    opacity: 1;
    background-color: rgba(255, 255, 255, 0.575);
}
.legend i {
    width: 18px;
    height: 18px;
    float: left;
    margin-right: 8px;
    opacity: 0.7;
}

</style>