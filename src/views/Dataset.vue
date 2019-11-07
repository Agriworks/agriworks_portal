<template>

<div class="datasetstuff">

  <div class="containers">
    <div class="top-slim-bar"></div>
    <div class="bottom-body">
      <h5 class="header"> Table </h5>
      <div class="table"> </div>
    </div>
  </div>

  <div class="containers">
    <div class="top-slim-bar"></div>
    <div class="bottom-body">
      <h5 class="header"> Dataset </h5>
      <div class="data"> 
        <div> File Name: {{fileName}} </div>
        <div> File Published: {{filePublished}} </div>
        <div> File Type: {{fileType}} </div>
      </div>
    </div>
  </div>

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
</script>

<style scoped>
.datasetstuff{
  width:100vw;
  display:flex;
  flex-direction: row;
  justify-content: space-between;
}
  .containers {
    display: flex;
    flex-direction: column;
    padding-bottom: 0.75rem;
    background-color: #e4f8ff;
    width: 45%;
    margin-bottom: 1rem;
    margin-right: 1rem;
    height: 20rem;
    width: 36.5rem;
    /* display: flex; */
  }
  
  .top-slim-bar {
    margin: 0;
    width: 100%;
    height: 0.25rem;
    background-color: #11c7f5;
  }

  .header {
    font-weight: bold;
    padding-left: 0.75rem;
    color: blue;
    text-align: left;
  }

  .data {
    color: blue;
    padding-left: 0.75rem;
    text-align: left;
  }

</style>