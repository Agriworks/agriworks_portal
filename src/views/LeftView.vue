<template>
    <div class="col-lg-6 col-sm-12 left" id="leftCol">
        <div class="d-flex justify-content-center align-items-center" style="height: 33vh; min-height: 100px;">
            <img class="mr-3" :src="require('../assets/logo_transparent_2.png')" height="200" />
        </div>
        <img src='../assets/white-wave.png' alt="wave" class="mr-3 wave">
    </div>
</template>
<script>
export default {
    name: "LeftView"
}
</script>
<style scoped>
.wave {
  position:absolute;
  left: 0;
  bottom: 0;
  max-height: 40%;
  /* max-width: 100%; */
  opacity: 0.6;
}
#leftCol {
  background: linear-gradient(125deg, rgba(150,211,74,1) 59%, rgba(197,246,135,1) 99%);
  min-height: 100vh;
  text-align: center;
  overflow: hidden;
}
</style>