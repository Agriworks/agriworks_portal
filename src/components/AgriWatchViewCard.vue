<template>
  <v-card primary elevation="0" class="agriWatchViewCard" hover>
    <v-card :to="viewLink" flat class="popoutButton">
      <v-list-item three-line>
        <v-list-item-content>
          <div primary class="overline mb-4 viewType">{{ agriWatchView.visualType }}</div>
          <v-list-item-title> {{ agriWatchView.dataset }}</v-list-item-title>
        </v-list-item-content>
        <v-list-item-avatar size="80" tile>
          <v-img v-if="!$vuetify.theme.dark" src="../assets/chartNormal.png" />
          <v-img v-if="$vuetify.theme.dark" src="../assets/chartDarkMode.png" />
        </v-list-item-avatar>
      </v-list-item>
    </v-card>
    <v-card-actions>
      <template>
        <v-row justify="center">
          <v-dialog v-model="dialog" persistent max-width="290">
            <template v-slot:activator="{ on }">
              <v-btn v-if="manage == true" color="error" text v-on="on" width="90%">Delete</v-btn>
            </template>
            <v-card>
              <v-card-title class="headline">Delete view?</v-card-title>
              <v-card-text>Are you sure?</v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
                <v-btn color="error" text @click="deleteAgriWatchView()">Delete</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog> 
        </v-row>
      </template>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "AgriWatchViewCard",
  props: ["agriWatchView", "manage"],
  computed: {
    viewLink: function() {
        return "/agri-watch-view/" + this.agriWatchView.id;
    }
  },
  data() {
    return {
      dialog: false
    };
  },
  methods: {
    deleteAgriWatchView() {
      // do something
    }
  }
}
</script>

<style scoped>
.agriWatchViewCard {
  width: 300px;
  margin: 1rem;
  border: 3px solid var(--v-secondary-base);
  border-radius: 15px;
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