<template>
    <v-card tile primary class="datasetCard"> 
        <v-list-item three-line>
            <v-list-item-content>
                <div primary class="overline mb-4 datasetType"> {{ dataset.type }} </div>
                <v-list-item-title> {{ dataset.name }} </v-list-item-title>
                <v-list-item-subtitle> By {{ dataset.author }} </v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-avatar size="80" tile>
                 <v-img v-if="!$vuetify.theme.dark" src="../assets/chartNormal.png"/>
                <v-img v-if="$vuetify.theme.dark" src="../assets/chartDarkMode.png"/>
            </v-list-item-avatar>
        </v-list-item>
        <v-card-actions>
            <v-btn dark router-link :to="datasetLink" text color="var(--v-primary-base)"> Open </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>

export default {

  name: "DatasetCard",
  props: ["dataset"],
  computed: {
      datasetLink: function() {
          return "/dataset/" + this.dataset.id;
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