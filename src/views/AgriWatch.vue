<template>
  <v-container fluid>
    <v-row v-if="selected.length > 0" style="margin-left:20%; width:60%">
         <v-toolbar
      dense
      floating
    >
      <v-col md="auto">
      <v-text-field
        hide-details
        prepend-icon="mdi-magnify"
        single-line
        color = "success"
        clearable
        @click:clear="clear"
        v-model="searchQuery" 
        v-on:keyup="searchSubmit"
      ></v-text-field>
      </v-col>

      <v-col md="auto">
      
      {{selected.length}} Selected
      </v-col>
      <v-col class=".col-md-4 .ml-auto">
      <v-btn
      depressed
      >
      Deslect All Views
      </v-btn>
      </v-col>
    </v-toolbar>
    </v-row>


    <v-row v-if="selected.length == 0" style="margin-left:0; width:97%">
      <v-col
      flex-column  
      md="auto"
      >
        <v-btn
          dark
          depressed
          color="success"
          class="dashboardButton"
          @click="dialog=true"
          large
        >
          <v-icon>mdi-plus</v-icon>Create New View
        </v-btn>
        <v-menu>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="primary"
          dark
          depressed
          v-bind="attrs"
          class="dashboardButton"
          v-on="on"
          large
        >
          {{set}}
          <v-icon>
            mdi-menu-down
          </v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item
          v-for="(possibleSets, index) in possibleSets"
          :key="index"
          @click="changeSet(possibleSets)"
        >
          <v-list-item-title>{{ possibleSets }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
      </v-col>
      <v-spacer></v-spacer>
    <v-col
    class=".col-md-4 .ml-auto">
      <v-text-field
            class="rounded-lg"
            clearable
            @click:clear="clear"
            outlined
            dense
            v-model="searchQuery" 
            v-on:keyup="searchSubmit"
            label="Search Datasets">
            <v-icon slot="append" color = "success" @click="searchSubmit">mdi-magnify</v-icon>
        </v-text-field>
    </v-col>
    </v-row>
    <v-row>
      <div v-for="view in agriWatchViews" v-bind:key="view.id">
        <!-- Does not appear that the view has an id that is saved in the front end -->
        <!-- This is also causing problems in the AgriWatchViewCard because the link depends on the id -->
        <AgriWatchViewCard @selected="handleSelection($event, view.dataset)" :agriWatchView="view" />
      </div>
    </v-row>

    <v-dialog
      v-model="dialog"
      depressed
      scrollable
      eager
      max-width="80%">
      <v-card class="dialog">

        <v-card-text>
          <v-container>
            <v-stepper v-model="stepIndex" class="elevation-0">
              <v-stepper-header>
                <v-stepper-step
                  :complete="stepIndex > 1"
                  step="1"
                  color="primary"
                >
                  Select Dataset
                </v-stepper-step>
          
                <v-divider></v-divider>
          
                <v-stepper-step
                  :complete="stepIndex > 2"
                  step="2"
                  color="primary"
                >
                  Pick a visualization tool
                </v-stepper-step>
          
                <v-divider></v-divider>
          
                <v-stepper-step 
                  step="3"
                  color="primary"  
                >
                  Select Data Range/Generate
                </v-stepper-step>
              </v-stepper-header>

              <v-stepper-items>
                <v-stepper-content step="1">
                  <v-container>
                  <v-autocomplete
                    v-model="createFromDataset"
                    :items="datasets"
                    label="Create From Dataset"
                    :menu-props="autocompleteMenuProps"
                    required
                    outlined
                  ></v-autocomplete>
                  <v-row>
                    <v-spacer></v-spacer>
                    <v-btn 
                      class="dialogButton" 
                      depressed 
                      @click="decrementStep"
                    >
                    Cancel
                    </v-btn>
                    <v-btn 
                      color="primary" 
                      class="dialogButton" 
                      depressed 
                      @click="incrementStep"
                    >
                    Continue
                    </v-btn>
                  </v-row>
                  </v-container>
                </v-stepper-content>

                <v-stepper-content step="2">
                  <v-container>
                  <v-select
                    class="rounded-lg"
                    v-model="createVisualType"
                    :items="visualTypes"
                    label="Select view type"
                    required
                    outlined
                  ></v-select>
                  <v-row>
                    <v-spacer></v-spacer>
                    <v-btn 
                      class="dialogButton" 
                      depressed 
                      @click="decrementStep"
                    >
                    Back
                    </v-btn>
                    <v-btn 
                      color="primary" 
                      class="dialogButton" 
                      depressed 
                      @click="incrementStep"
                    >
                    Continue
                    </v-btn>
                  </v-row>
                  </v-container>
                </v-stepper-content>

                <v-stepper-content step="3">
                  <v-container>
                  <v-row>
                    <v-spacer></v-spacer>
                    <v-btn 
                      class="dialogButton" 
                      depressed 
                      @click="decrementStep"
                    >
                    Back
                    </v-btn>
                    <v-btn 
                      color="primary" 
                      class="dialogButton" 
                      depressed 
                      @click="incrementStep"
                    >
                    Create View
                    </v-btn>
                  </v-row>
                  </v-container>
                </v-stepper-content>
              </v-stepper-items>
            </v-stepper>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>

  </v-container>
</template>

<script>
import api from "../api";
import router from "../router";
import notify from "../utilities/notify";
import AgriWatchViewCard from "../components/AgriWatchViewCard.vue";
import { colors } from "../utilities/branding";

export default {
  name: "AgriWatch",
  components: {
    AgriWatchViewCard
  },
  data() {
    return {
      dialog: false,
      stepIndex: 1,
      createFromDataset: "",
      createVisualType: "",
      createXData: "",
      createYData: "",
      visualTypes: ["Heatmap"],
      set: "bookmarked", //which set of datasets, i.e. bookmarked, recently viewed, own
      possibleSets: ["bookmarked", "personal", "recent", "popular", "browse"],
      selected: [],
      searchQuery: "",
    }
  },
  computed: {
    agriWatchViews() {
      return this.$store.state.userAgriWatchViews;
    },
    datasets() {
      var retList = [];
      var datasets = this.$store.state.datasets;
      for (var i = 0; i < datasets.length; i++) {
        retList.push({text: datasets[i].name + " - " + datasets[i].author, value : datasets[i].id})
      }
      return retList
    },
    autocompleteMenuProps() {
      // default properties copied from the vuetify-autocomplete docs
      let defaultProps = {
        closeOnClick: false,
        closeOnContentClick: false,
        disableKeys: true,
        openOnClick: false,
        maxHeight: 200
      };
       return defaultProps;
    }
  },
  methods: {
    createView() {
      api.createAgriWatchView(
        this.createFromDataset,
        this.createVisualType,
        this.createXData,
        this.createYData
      )
      .then(response => {
        this.$router.push(`/agri-watch-view/${response.data.message}`);
        notify("Agriwatch view created", colors.green);
      })
      .catch(error => {
        notify(error.response.data.message);
      })
    },
    closeDialog() {
      this.dialog = false;
      this.stepIndex = 1;
    },
    incrementStep() {
      if (this.stepIndex < 3) {
        this.stepIndex += 1;
      } else {
        this.createView();
      }
    },
    decrementStep() {
      if (this.stepIndex > 1) {
        this.stepIndex -= 1;
      } else {
        this.dialog = false;
      }
    },
    changeSet(newSet){
      this.set = newSet
    },
    handleSelection(value, id){   
      if(value){
        this.selected.push(id)
      }else{
        this.selected = this.selected.filter(e => e !== id)
      }
    },
    searchSubmit(){
      console.log("Searching")
    },
    clear(){
      this.searchQuery = ""
    }
  },
  mounted() {
    this.$store.dispatch("fetchAgriWatchViews");
    this.$store.dispatch("fetchDatasets");
  }
}
</script>

<style scoped>
.dashboardButton {
  margin-right: 1rem;
  border-radius: 8px;
}

.dialogButton {
  margin: 1rem;
  border-radius: 8px;
}

.createViewCard {
  width: 300px;
  margin: 1rem;
  border: 3px solid var(--v-secondary-base);
  border-style: dashed;
  border-radius: 12px;
}

.viewType {
  font-weight: bold;
  color: var(--v-primary-base);
}

.dialog {
  border-radius: 12px;
}

.v-stepper__header {
  box-shadow: none;
} 
</style>