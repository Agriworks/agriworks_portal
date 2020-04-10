<template>
<div>
    <h1> Map </h1>
    <div id="map"></div>
</div>    
</template>

<script>
import * as L from 'leaflet';
import * as esri from 'esri-leaflet';

export default {
    name: "Mapdemo",
    data(){
        return {
            map: null
        }
    },
    mounted(){
        this.map = L.map('map', {
            maxZoom: 18,
            minZoom: 0
        }).setView([41.96, -82.12], 8);

        esri.basemapLayer('DarkGray').addTo(this.map);
    }
}
</script>

<style scoped>
#map {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    height: 300px;
}
</style>