<template>
    <v-container fluid>
      <v-row
        style="margin-left:0; width:97%"
      >
        <v-col
          flex-column       
          cols="11"
         >
          <v-row
          >
            <v-btn
              dark
              color="success"
              small
              class="dashboardButton"
              @click="switchComponent('browse')"
              large
            >
          <v-icon>mdi-view-carousel</v-icon>Browse
        </v-btn> 
        <v-btn
          dark
          color="success"
          small
          class="dashboardButton"
          @click="switchComponent('upload')"
          large
        >
          <v-icon>mdi-plus</v-icon>Create
        </v-btn>
          <v-btn
          dark
          color="success"
          small
          class="dashboardButton"
          large
          @click="switchComponent('manage')"
        >
          <v-icon>mdi-format-list-bulleted-square</v-icon>Manage
        </v-btn>  
            
        <v-spacer />
        <template v-if="this.component == 'browse' || this.component == 'manage'">
        <v-text-field
            color="red"
            clearable
            @click:clear="clear"
            solo
            dense
            v-model="searchQuery"
            full-width
            v-on:keyup="searchSubmit"
            label="Search Datasets">
            <v-icon slot="append" color = "success" @click="searchSubmit">mdi-magnify</v-icon>
        </v-text-field>
        </template>
      </v-row>
    </v-col>
      </v-row>
    <component v-bind:is="component"></component>
  </v-container>
</template>

<script>
import Browse from "../components/dashboard/Browse";
import Manage from "../components/dashboard/Manage";
import Upload from "../components/dashboard/Upload";

export default {
  components: {
    browse: Browse,
    manage: Manage,
    upload: Upload
  },
  data() {
    return {
      searchQuery: "",
      alignment: 'center',
      justify: 'space-between',
      component: this.$route.params.component
        ? this.validateComponent(this.$route.params.component)
        : "browse"
    };
  },
  methods: {
    clear() {
        if(this.component == "manage"){
          this.$store.dispatch("fetchUserDatasets");
        }
        else
        {
          this.$store.dispatch("filterDatasets", "");
        }
    },
    searchSubmit() {
      if (this.searchQuery == "") {
        this.$store.dispatch("filterDatasets", "");
      } else if (
        (this.searchQuery == undefined ||
          this.searchQuery == "" ||
          this.searchQuery == " ") &&
        this.component == "manage"
      ) {
        this.$store.dispatch("fetchUserDatasets");
      } else {
        this.$store.dispatch(
          "filterDatasets",
          this.searchQuery
        );
      }
    },
    switchComponent(component) {
      this.component = this.validateComponent(component);
      if (this.component != "browse") {
        this.$router.push("/browse/" + this.component);
      } else {
        this.$router.push("/browse");
      }
    },
    validateComponent(component) {
      const allowedComponents = ["browse", "manage", "upload"];
      if (allowedComponents.includes(component)) {
        return component;
      } else {
        return "browse";
      }
    }
  },
  mounted() {
    this.$store.dispatch("fetchUserDatasets");
  }
};
</script>
<style scoped>
.dashboardButton {
  margin-right: 0.5rem;
}

.v-input__icon--append .v-icon { 
    color: purple;
}
</style>
