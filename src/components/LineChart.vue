<template>
	<div>
		<h1 class="title">{{chartDefaults.title}}</h1>
		<svg width="100%" height="100%" viewBox="0 0 800 330"
		preserveAspectRatio="xMidYMid meet" >
			
			<g class='lineChart' :transform="translate">
				<axis class='yA' :scales="getScales().yAxis" :chartDefaults='chartDefaults' :data='data' :trns='trnsY'/>
				<axis class='xA' :scales="getScales().xAxis" :chartDefaults='chartDefaults' :data='data' :trns='trnsX()'/>
				<axis class='grid' :scales="getScales().yGrid" :chartDefaults='chartDefaults' :data='data' :trns='trnsY' :style="{opacity: chartDefaults.gridOpacity}"/>
				<path class='line' :d="line" />
			</g>
				
		</svg>
	</div>
</template>

<script>
import * as d3 from "d3";
import Axis from "./Axis";
export default {
  name: "vue-line-chart",
  components: {
    axis: Axis 
  },
  data() {
    return {
      data: [
        {
          day: "01-11-2016",
          count: 80
        },
        {
          day: "02-12-2016",
          count: 250
        },
        {
          day: "03-13-2016",
          count: 150
        },
        {
          day: "04-14-2016",
          count: 496
        },
        {
          day: "05-15-2016",
          count: 140
        },
        {
          day: "06-16-2016",
          count: 380
        },
        {
          day: "07-17-2016",
          count: 140
        },
        {
          day: "08-17-2016",
          count: 240
        },
        {
          day: "09-18-2016",
          count: 100
        },
        {
          day: "10-18-2016",
          count: 260
        },
        {
          day: "11-18-2016",
          count: 100
        },
        {
          day: "12-18-2016",
          count: 150
        }
      ],
      chartDefaults: {
        width: 800,
        height: 300,
        chartId: "linechart",
        title: "UK Rainfall for 2018",
        margin: {
          top: 5,
          right: 5,
          bottom: 15,
          left: 50
        },
        gridOpacity: 1,
        data: []
      },
      line: "",
      
      translate: "translate(" + 50 + "," + 5 + ")",
      trnsY: "translate(0,0)",
      trnsX: this.getTrnsx,
    };
  },
  mounted() {
    this.calculatePath();
  },
  methods: {
    getScales() {
      var parseDate = d3.timeParse("%m-%d-%Y");

      this.data.forEach(function(d) {
        d.date = parseDate(d.day);
      });

      const x = d3
        .scaleTime()
        .domain(
          d3.extent(this.data, function(d) {
            return d.date;
          })
        )
        .rangeRound([0, this.chartDefaults.width - 100]);
      const y = d3
        .scaleLinear()
        .domain([
          0,
          d3.max(this.data, function(d) {
            return d.count + 100;
          })
        ])
        .range([this.chartDefaults.height, 0]);
      d3.axisBottom().scale(x);
      d3.axisLeft().scale(y);

      var xAxis = d3
        .axisBottom()
        .scale(x)
        .tickFormat(d3.timeFormat("%b"))
        .tickValues(
          this.data
            .map(function(d, i) {
              if (i > 0) {
                return d.date;
              }
              return false;
            })
            .splice(1)
        )
        .ticks(4);

      var yAxis = d3
        .axisLeft()
        .scale(y)
        .ticks(5);
      var yGrid = d3
        .axisLeft()
        .scale(y)
        .tickSize(-(this.chartDefaults.width - 100), 0, 0)
        .tickFormat("");
      
      return {
        x,
        y,
        xAxis,
        yAxis,
        yGrid
      };
    },
    getTrnsx() {
      const t = "translate(0," + this.chartDefaults.height + ")";
      return t;
    },
    calculatePath() {
      const scale = this.getScales();
      const path = d3
        .line()
        .x(d => {
          return scale.x(d.date);
        })
        .y(d => {
          return scale.y(d.count);
        })
        .curve(d3.curveCardinal);

      this.line = path(this.data);
    }
  }
};
</script>

<style scoped>
div {
	background-color: white;
}

.title {
	color: black;
}
text {
  color: black;
}

path.line {
  fill: none;
  stroke: #3aabec;
  stroke-width: 3px;
}

.grid line {
	stroke: black;
  opacity: 0.05;
}

.xA line {
	stroke: black;
  opacity: 0.5;
}

svg {
  background-color: white;
}
</style>
