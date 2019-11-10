<template>
  <div class="row">
    <div v-for="dataset in datasets" v-bind:key="dataset.id">
      <IndividualDataset v-bind:dataset="dataset" />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import IndividualDataset from "@/views/IndividualDataset.vue";
// import axios from "axios";
export default {
  name: "DatasetBrowserView",
  components: {
    IndividualDataset
  },
  data() {
    return {
      datasets: [
        {
          id: 1,
          title: "hello",

          features: [
            {
              id: 1,
              content: "cool data num 1"
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
          id: 2,
          title: "hello",

          features: [
            {
              id: 1,
              content: "cool data num 2"
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
          id: 3,
          title: "hello",

          features: [
            {
              id: 1,
              content: "cool data num 3"
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
          title: "hello",

          features: [
            {
              id: 1,
              content: "cool data num 4"
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
          id: 5,
          title: "hello",

          features: [
            {
              id: 1,
              content: "cool data num 5"
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
  // ,
  // methods: {
  //   created() {
  //     axios
  //       .get("https://jsonplaceholder.typicode.com/todos?_limit=5")
  //       .then(res => (this.datasets = res.data))
  //       .catch(err => console.log(err));
  //   }
  // }
};
</script>
<style scoped>
.row {
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
}
</style>