<template>
  <div id="charts">

    <linechart />

  </div>
</template>

<script>
import linechart from "../components/LineChart";

export default {
  name: "charts",
  components: {
    linechart
  },
};
</script>

<style>
#charts {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #fff;
  margin-top: 60px;
  background-color: #f47166;
}
</style>
