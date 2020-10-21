
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
import {pointerMove} from 'ol/events/condition';
import XYZ from 'ol/source/XYZ';

export default {
  props: ['mapData', 'hasMapData'],
  watch: {
    hasMapData: {
      immediate: true,
      handler(val){
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

        var NAME = "name"
        
        console.log("Map Data")
        console.log(this.mapData)

            geojsonObject = this.mapData.data
            var colors = this.mapData.colors
            var bucketGrades = this.mapData.bucketGrades

             var vectorSource = new VectorSource({
              features: new GeoJSON().readFeatures(geojsonObject),
            });

            function rgbToHex(c) {
              return "#" + ((1 << 24) + (c[0] << 16) + (c[1] << 8) + c[2]).toString(16).slice(1);
            }


            
            //legend Control

            var element = document.createElement('div');
            element.className = 'legend ol-unselectable ol-control';

            
            for(var i = 0; i < colors.length; i++) {
              element.innerHTML +=
            '<i style="background:' + rgbToHex(colors[i]) + '"></i> ' +
            bucketGrades[i] + (bucketGrades[i + 1] ? '&ndash;' + bucketGrades[i + 1] + '<br>' : '+');
            }


            var legend = new Control({
              element: element
            }); 

             //Info Control Panel

            var infoPanel = document.createElement('div')
            infoPanel.className = 'infoPanel ol-unselectable ol-control';

            function updateInfoPanel(featureName, data) {
              console.log("Updating Panel")
              if(featureName == null){
                infoPanel.innerHTML = '<h4>Value</h4>Hover over a state'
              }else{
                infoPanel.innerHTML = '<h4>Value' + '<br /><b>' + featureName + '</b><br />' + data
              }
            }

            updateInfoPanel(null, null);

            var info = new Control({
              element: infoPanel
            })

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
                          text: feature.get(NAME),
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
                center: [78, 20],
                zoom: 4,
            });

            var vector = new VectorLayer({
              source: vectorSource,
              style: function (feature, resolution) {
                return getStyle(feature, resolution, false);
                }
            });

            //Replaced by basaeLayer but there is a chance we need to revert 
            // var raster = new TileLayer({
            //   source: new OSM(),
            // });

            var baseUrl;
            
            if(!this.$vuetify.theme.dark){
              baseUrl = "https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}.png" //had to remove the {r} at the end to make it work, so there there is a chance it does not work with retina displays
            }else{
              baseUrl = "https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}.png" //also removed the {r}
            }

            var baseLayer = new TileLayer({
              source: new XYZ({
                url: baseUrl,
                maxZoom: 20,
                attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
              }),
            })

            

            // create map with 2 layer
            var map = new Map({
              controls: defaultControls().extend([
                new ScaleLine({
                  units: "degrees",
                }), legend, info
              ]),
              target: "map",
              layers: [baseLayer, vector],
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
                //update infoPanel
                updateInfoPanel(feature.get(NAME), feature.get('data'))
              }else{
                if(featureClicked){
                    featureClicked.setStyle(getStyle(featureClicked, view.getResolution, true)) //if not hovering to new feature, keep clicked highlighted
                }
                updateInfoPanel(null, null)
              }
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

.legend {
    line-height: 18px;
    color: #555;
    bottom: 2em;
    right: .5em;
    opacity: 1;
    background-color: rgba(255, 255, 255, 0.8);
}
.legend i {
    width: 18px;
    height: 18px;
    float: left;
    margin-right: 8px;
    opacity: 0.7;
}

.infoPanel {
    padding: 6px 8px;
    font: 14px/16px Arial, Helvetica, sans-serif;
    background: white;
    background: rgba(255,255,255,0.8);
    box-shadow: 0 0 15px rgba(0,0,0,0.2);
    border-radius: 5px;
    right: .5em;
    top: .5em;
}
.infoPanel h4 {
    margin: 0 0 5px;
    color: #777;
}

</style>