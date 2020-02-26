<template>
  <div>
    
    <linechart :dataset="dataset" :visible="showchart"/>
    
  </div>
</template>

<script>
import linechart from "../components/LineChart";

export default {
  name: "charts",
  components: {
    linechart
  },

  data() {
    return {
      dataset: [
        {x: "Jan", y: 7},
        {x: "Feb", y: 3},
        {x: "Mar", y: 5},
        {x: "Apr", y: 10},
        {x: "May", y: 7}
      ],
      showchart: 1
    }
  },
};
</script>

<style>
/* #charts {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #fff;
  margin-top: 60px;
  background-color: #f47166;
} */
</style>
