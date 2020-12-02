<template>
  <div>
    <div class="row">
      <div v-for="view in views" v-bind:key="view.id">
        <ViewCard :id="view.id" />
      </div>
      <v-card primary tile class="createViewCard" hover>
        <v-button v-on:click="increment">Create New View</v-button>
      </v-card>
    </div>
  </div>
</template>

<script>
import ViewCard from "../components/ViewCard.vue";
export default {
    name: "AgriWatch",
    components: {
      ViewCard
    },
    data() {
      return {
        views: [],
        count: 0
      }
    },
    methods: {
      increment() {
        this.views.push({id: this.count});
        this.count++;
      }
    }
}
</script>

<style scoped>
.createViewCard {
  width: 300px;
  height: 200px;
  margin: 1rem;
  border: 2px solid var(--v-secondary-base);
  border-style: dashed;
  border-radius: 10px;
}

.viewType {
  font-weight: bold;
  color: var(--v-primary-base);
}

/*Makes the button not underline when you hover over it, not sure that it actually make it looks nice
If you do make it have an underline, make sure that the delete button also has an underline */
.popoutButton {
  text-decoration: none;
}
</style>