<template>
	<div class="chart-container">
  </div>
</template>

<script>
import * as d3 from "d3";

export default {
  name: "linechart",
  
  props: ["dataset", "visible"],

  mounted() {
    this.renderChart();
  },

  watch: {
    dataset: function() {
      this.renderChart();
    },
    visible: function() {
      this.renderChart();
    }
  },

  methods: {
    renderChart() {
      d3.selectAll("svg").remove();

      var margin = {top: 50, right: 50, bottom: 50, left: 100}
        , width = 1000 // window.innerWidth - margin.left - margin.right 
        , height = 500; // window.innerHeight - margin.top - margin.bottom;

      var minY = this.dataset[0].y, maxY = this.dataset[0].y;

      var entry;

      for(entry of this.dataset) {
        if(entry.y < minY) {
          minY = entry.y;
        }
        if(entry.y > maxY) {
          maxY = entry.y;
        }
      }

      var xScale = d3.scaleLinear()
          .domain([0, this.dataset.length]) 
          .range([0, width]); 

      var yScale = d3.scaleLinear()
          .domain([minY, maxY]) 
          .range([height, 0]); 

      var line = d3.line()
          .x(function(d, i) { return xScale(i); }) 
          .y(function(d) { return yScale(d.y); }) 
          .curve(d3.curveMonotoneX);

      var svg = d3.select("div.chart-container").append("svg")
          .attr("class", "chart")
          .attr("width", width + margin.right + margin.left)
          .attr("height", height + margin.top + margin.bottom)
          .append("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      var ticks = this.dataset.map(i => i.x);

      var xAxis = d3.axisBottom(xScale)
          .ticks(this.dataset.length)
          .tickFormat(function(d, i) { return ticks[i]; });

      svg.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + height + ")")
          .call(xAxis); 

      svg.append("g")
          .attr("class", "y axis")
          .call(d3.axisLeft(yScale)); 

      svg.append("path")
          .datum(this.dataset) 
          .attr("class", "line") 
          .attr("d", line); 

      svg.selectAll(".dot")
          .data(this.dataset)
          .enter().append("circle") 
          .attr("class", "dot") 
          .attr("cx", function(d, i) { return xScale(i) })
          .attr("cy", function(d) { return yScale(d.y) })
          .attr("r", 5);

      d3.select("svg.chart").style("opacity", this.visible);
    }
    
  }
};
</script>

<style>
.line {
    fill: none;
    stroke: #ffab00;
    stroke-width: 3;
}

.dot {
    fill: #ffab00;
    stroke: #fff;
}

</style>
