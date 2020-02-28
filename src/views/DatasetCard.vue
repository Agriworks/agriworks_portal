<template>
  <v-card class="datasetCard">
    <v-list-item three-line>
      <v-list-item-content>
        <div class="overline mb-4 datasetType">{{ dataset.type }}</div>
        <v-list-item-title>{{ dataset.name }}</v-list-item-title>
        <v-list-item-subtitle>By {{ dataset.author }}</v-list-item-subtitle>
      </v-list-item-content>
      <v-list-item-avatar size="80" tile>
        <v-img v-if="!$vuetify.theme.dark" src="../assets/chartNormal.png"/>
        <v-img v-if="$vuetify.theme.dark" src="../assets/chartDarkMode.png"/>
      </v-list-item-avatar>
    </v-list-item>
    <v-card-actions>
       <v-btn dark router-link :to="datasetLink" text color="var(--v-primary-base)"> Open </v-btn>  

      <v-btn v-if="manage == true" text color="error">
        <router-link :to="datasetLink">Edit</router-link>
      </v-btn>
      <template>
        <v-row justify="center">
          <v-dialog v-model="dialog" persistent max-width="290">
            <template v-slot:activator="{ on }">
              <v-btn v-if="manage == true" text color="error" v-on="on">Delete</v-btn>
            </template>
            <v-card>
              <v-card-title class="headline">Delete dataset?</v-card-title>
              <v-card-text>Once you delete this dataset you will not be able to revert these changes.</v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
                <v-btn color="error" text @click="deleteDataset()">Delete</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-row>
      </template>
    </v-card-actions>
  </v-card>
</template>
<script>
import api from "../api";

export default {

  name: "DatasetCard",
  props: ["dataset", "manage"],
  computed: {
    datasetLink: function() {
      return "/dataset/" + this.dataset.id;
    }
  },
  data() {
    return {
      dialog: false
    };
  },
  methods: {
    deleteDataset() {
      this.$store.dispatch("deleteDataset", this.dataset.id);
      this.dialog = false;
    }
  }
};
</script>

<style scoped>
.datasetCard {
  width: 300px;
  margin: 1rem;
  border: 2px solid var(--v-secondary-base);
  border-radius: 10px; 
}

.datasetType {
  font-weight: bold;
  color: var(--v-primary-base);
}
</style>