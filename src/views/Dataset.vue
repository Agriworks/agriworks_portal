<template>

  <div id="about">
    <b-container class="bv-example-row">
    
    <b-row align-h="between" >

      <b-col cols="5" md="5.5" :style="myStyle">
        <p> </p>
        <h5 class="text-primary font-weight-bold text-left"> Table </h5>
      </b-col>
    
    <b-col cols="5" md="5.5" :style="myStyle">
      <p> </p>
      <h5 class="text-primary font-weight-bold text-left"> Dataset </h5>
      <b-col align-h="between">
        <b-row> File Name: {{fileName}}  </b-row>
        <b-row> </b-row>
        <b-row> File Published: {{filePublished}} </b-row>
        <b-row> </b-row>
        <b-row> File Type: {{fileType}} </b-row>
        <b-row> </b-row>
      </b-col>  
    </b-col>
        
    </b-row>
    
    </b-container>
  </div>
</template>

<script>
      export default {
          name: "Dataset View", 
          data() {
              return {
                fileName: "Sample file",
                filePublished: "November 4th, 2019",
                fileType: "CSV",
                myStyle:{
                  backgroundColor:"#e3f8ff"
                },
              }
          }
      }

      function myFunction() {
        document.getElementById("about").style.borderTop = "thick solid #0000DF";
      }
</script>