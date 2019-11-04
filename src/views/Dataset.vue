<template>
  <div class="about">
    <h1>File View</h1>
    
    <p> {{fileName}}                                           {{filePublished}} </p>
    
  </div>
</template>

<script>
      import json from './json/data.json'
      
      export default{
          data(){
              return{
                  myJson: json
              }
          }
      }
</script>