<template> 
  <div class="accordian" id="types">
    <div class="card">
      <div class="card-header" id="popularHeader">
        <h2 class="mb-0">
          <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#popularContent" aria-expanded="true" aria-controls="popularContent">
          Popular
          </button>
        </h2>
      </div>

      <div id="popularContent" class="collapse show" aria-labelledby="popularHeader" data-parent="#types">
        <div class="card-body">

          <div id="popularCarousel" class="carousel slide" data-ride="carousel">
            <div class="carousel-inner">

              <div class="carousel-item" v-for="(dataset, index) in popularDatasets" v-bind:key="dataset.id" v-bind:class="{ active: index == 0}"> 
                  <IndividualDataset v-bind:dataset="dataset" />
              </div>
             
            </div>
            <a class="carousel-control-prev" href="#popularCarousel" role="button" data-slide="prev">
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="sr-only">Previous</span>
            </a>
            <a class="carousel-control-next" href="#popularCarousel" role="button" data-slide="next">
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="sr-only">Next</span>
            </a>
          </div>

        </div>
        </div>
      </div>


    <div class="card">
      <div class="card-header" id="headerRecent">
        <h2 class="mb-0">
          <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#recentContent" aria-expanded="false" aria-controls="recentContent">
          Recent
          </button>
        </h2>
      </div>

      <div id="recentContent" class="collapse" aria-labelledby="headerRecent" data-parent="#types">
        <div class="card-body">
          
          <div id="recentCarousel" class="carousel slide" data-ride="carousel">
            <div class="carousel-inner">

              <div class="carousel-item" v-for="(dataset, index) in recentDatasets" v-bind:key="dataset.id" v-bind:class="{ active: index == 0}"> 
                  <IndividualDataset v-bind:dataset="dataset" />
              </div>
             
            </div>
            <a class="carousel-control-prev" href="#recentCarousel" role="button" data-slide="prev">
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="sr-only">Previous</span>
            </a>
            <a class="carousel-control-next" href="#recentCarousel" role="button" data-slide="next">
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="sr-only">Next</span>
            </a>
          </div>


        </div>
      </div>
    </div>

    <div class="card">
      <div class="card-header" id="headerNew">
        <h2 class="mb-0">
          <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#newContent" aria-expanded="false" aria-controls="newContent">
          New
          </button>
        </h2>
      </div>  

      <div id="newContent" class="collapse" aria-labelledby="headerNew" data-parent="#types">
        <div class="card-body">
          
          <div id="newCarousel" class="carousel slide" data-ride="carousel">
            <div class="carousel-inner">

              <div class="carousel-item" v-for="(dataset, index) in newDatasets" v-bind:key="dataset.id" v-bind:class="{ active: index == 0}"> 
                  <IndividualDataset v-bind:dataset="dataset" />
              </div>
             

            </div>
            <a class="carousel-control-prev" href="#newCarousel" role="button" data-slide="prev">
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="sr-only">Previous</span>
            </a>
            <a class="carousel-control-next" href="#newCarousel" role="button" data-slide="next">
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="sr-only">Next</span>
            </a>
          </div>

        </div>
      </div>
    </div>

  </div>

  


</template>

<script>

import IndividualDataset from "@/views/IndividualDataset.vue";

export default {

  name: "DashboardView",
  components: {
    IndividualDataset
  },

  methods: {
    togglePopular() {
     
    }
  
  },



  data() {
    return {

      slide: 0,
      sliding: null,
      first: true,

      popularDatasets: [
        {
          id: 1,
          title: "hello popular",

          features: [
            {
              id: 1,
              content: "popular data num 1"
            },
            {
              id: 2,
              content: "highly popular data"
            },
            {
              id: 3,
              content: "highly popular data"
            },
            {
              id: 4,
              content: "highly popular data"
            }
          ]
        },
        {
          id: 2,
          title: "popular hello",

          features: [
            {
              id: 1,
              content: "popular data num 2"
            },
            {
              id: 2,
              content: "highly popular data"
            },
            {
              id: 3,
              content: "highly cool data"
            },
            {
              id: 4,
              content: "highly cool data"
            }
          ]
        },
        {
          id: 3,
          title: "popular",

          features: [
            {
              id: 1,
              content: "popular data num 3"
            },
            {
              id: 2,
              content: "highly cool data"
            },
            {
              id: 3,
              content: "highly cool data"
            },
            {
              id: 4,
              content: "highly cool data"
            }
          ]
        },
        {
          id: 4,
          title: "popular 4",

          features: [
            {
              id: 1,
              content: "popular data num 4"
            },
            {
              id: 2,
              content: "highly cool data"
            },
            {
              id: 3,
              content: "highly cool data"
            },
            {
              id: 4,
              content: "highly cool data"
            }
          ]
        },
      ],

      recentDatasets: [
        {
          id: 1,
          title: "hello recent",

          features: [
            {
              id: 1,
              content: "recent data num 1"
            },
            {
              id: 2,
              content: "highly recent data"
            },
            {
              id: 3,
              content: "highly poprecentular data"
            },
            {
              id: 4,
              content: "highly recent data"
            }
          ]
        },
        {
          id: 2,
          title: "recent hello",

          features: [
            {
              id: 1,
              content: "recent data num 2"
            },
            {
              id: 2,
              content: "highly recent data"
            },
            {
              id: 3,
              content: "highly cool data"
            },
            {
              id: 4,
              content: "highly cool data"
            }
          ]
        },
        {
          id: 3,
          title: "recent",

          features: [
            {
              id: 1,
              content: "recent data num 3"
            },
            {
              id: 2,
              content: "highly cool data"
            },
            {
              id: 3,
              content: "highly cool data"
            },
            {
              id: 4,
              content: "highly cool data"
            }
          ]
        },
        {
          id: 4,
          title: "recent 4",

          features: [
            {
              id: 1,
              content: "recent data num 4"
            },
            {
              id: 2,
              content: "highly cool data"
            },
            {
              id: 3,
              content: "highly cool data"
            },
            {
              id: 4,
              content: "highly cool data"
            }
          ]
        }
      ],

      newDatasets: [
        {
          id: 1,
          title: "hello new",

          features: [
            {
              id: 1,
              content: "new data num 1"
            },
            {
              id: 2,
              content: "highly new data"
            },
            {
              id: 3,
              content: "highly new data"
            },
            {
              id: 4,
              content: "highly new data"
            }
          ]
        },
        {
          id: 2,
          title: "new hello",

          features: [
            {
              id: 1,
              content: "new data num 2"
            },
            {
              id: 2,
              content: "highly new data"
            },
            {
              id: 3,
              content: "highly cool data"
            },
            {
              id: 4,
              content: "highly cool data"
            }
          ]
        },
         {
          id: 3,
          title: "new",

          features: [
            {
              id: 1,
              content: "new data num 3"
            },
            {
              id: 2,
              content: "highly cool data"
            },
            {
              id: 3,
              content: "highly cool data"
            },
            {
              id: 4,
              content: "highly cool data"
            }
          ]
        },
        {
          id: 4,
          title: "new 4",

          features: [
            {
              id: 1,
              content: "new data num 4"
            },
            {
              id: 2,
              content: "highly cool data"
            },
            {
              id: 3,
              content: "highly cool data"
            },
            {
              id: 4,
              content: "highly cool data"
            }
          ]
        }
      ]

      
    };
}
}
</script>


<style scoped>
  

.carousel-item.active{
  margin: auto;
}
.container{
  margin: auto;
}
.carousel-control-next,
.carousel-control-prev {
    filter: invert(100%);
}

</style>