<template>
  <v-card primary tile class="viewCard" hover>
    <v-card flat class="popoutButton">
      <div primary class="overline mb-4 datasetType">{{ id }}</div>
    </v-card>
    <v-card-actions>

    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "ViewCard",
  props: ["agriWatchView", "manage","id"],
  computed: {
    viewLink: function() {
        
    }
  }
}
</script>

<style scoped>
.viewCard {
  width: 300px;
  height: 200px;
  margin: 1rem;
  border: 2px solid var(--v-secondary-base);
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