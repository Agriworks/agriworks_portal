<template>
  <div class="about">
    <h1>Dataset </h1>
    <p> File Name: {{fileName}}  </p>
    <p> File Published: {{filePublished}} </p>
    <p> File Type: {{fileType}} </p>
  </div>
</template>

<script>
      export default {
          name: "Dataset View", 
          data() {
              return {
                fileName: "Sample file",
                filePublished: "November 4th, 2019",
                fileType: "CSV"
              }
          }
      }
</script>