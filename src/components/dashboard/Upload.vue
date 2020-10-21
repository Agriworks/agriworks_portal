<template>
  <div>
    <h1>Create New Dataset</h1>
    <div class="table">
      <v-form ref="form">
        <v-text-field v-model="datasetName" required label="Dataset name"></v-text-field>
        <v-select
          v-model="datasetPermissions"
          required
          :items="permissionOptions"
          label="Permissions"
        ></v-select>
        <v-select v-model="datasetType" required :items="typeOptions" label="Dataset type"></v-select>
        <v-combobox
          v-model="datasetTags"
          :items="tagsOfChosenType"
          :search-input.sync="search"
          hide-selected
          label="Tags"
          multiple
          small-chips
        >
          <template v-slot:selection="{item}">
            <v-chip close @click:close="remove(item)" color="#96D34A">{{ item.toLowerCase() }}</v-chip>
          </template>
          <template v-slot:no-data>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>
                  No tags matching "
                  <strong>{{ search }}</strong>". Press
                  <kbd>enter</kbd> to create a new one
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>
        </v-combobox>
      </v-form>
      <b-card-group deck class="lastRow">
        <v-flex xs12 sm6>
          <v-card max-width="95%" style="padding: 1rem;">
            <v-card-title>
              <h3>Data selection</h3>
            </v-card-title>
            <v-card-text>Choose a file with relevant data from your local computer to upload. Acceptable file formats incude: CSV</v-card-text>
            <v-file-input v-model="file" label="Select a file" show-size accept=".csv" @change="getKeys"></v-file-input>
          </v-card>
        </v-flex>
        <!-- <v-btn
          @click="processForm"
          class="submitButton"
          x-large
          color="success"
          dark
          :loading="this.loading"
        >
          <v-icon>mdi-folder-plus-outline</v-icon>Create
        </v-btn> -->
<!--         
        <b-card title="Preparation" style="max-width: 50%;">
          <b-card-text>
            The following video will give you an explanation of how to prepare your data. Please note that all uploaded files will have either the .csv or .txt extension.
          </b-card-text>
        </b-card> -->
        
        <div class="dialog">
          
          <v-dialog v-model="dialog"
            max-width="800px">
            <template v-slot:activator="{on, attrs}">
              <v-btn v-on="on"
                v-bind="attrs"
                class="submitButton"
                x-large
                color="success"
                dark
              >
                <v-icon>mdi-folder-plus-outline</v-icon>Configure Dataset
              </v-btn>
            </template>

            <v-card>
              <v-card-title>
                Dataset Configuration
              </v-card-title>
              
              <v-card-text>
                <v-container>
                  <v-stepper v-model="stepIndex">
                    <v-stepper-header>
                      <v-stepper-step
                        :complete="stepIndex > 1"
                        step="1"
                        color="success"
                      >
                        Time/Location Data Checking
                      </v-stepper-step>
                
                      <v-divider></v-divider>
                
                      <v-stepper-step
                        :complete="stepIndex > 2"
                        step="2"
                        color="success"
                      >
                        Select Data Column
                      </v-stepper-step>
                
                      <v-divider></v-divider>
                
                      <v-stepper-step 
                        step="3"
                        color="success"  
                      >
                        Select Granularity
                      </v-stepper-step>
                    </v-stepper-header>
                
                    <v-stepper-items>
                      <v-stepper-content step="1">
                        
                          <v-checkbox
                            v-model="hasTime"
                            label="My Dataset Contains Time Data"
                          ></v-checkbox>
                          <v-checkbox
                            v-model="hasLocation"
                            label="My Dataset Contains Location Data"
                          ></v-checkbox>
                        
                        <v-divider></v-divider>
              
                        <v-btn
                          color="success"
                          @click="changeStep"
                        >
                          Continue
                        </v-btn>
                
                        <v-btn text @click="closeDialog">
                          Cancel
                        </v-btn>
                      </v-stepper-content>
                
                      <v-stepper-content step="2">
                        <v-select
                          v-model="columnData.time"
                          :items="this.hasTime ? this.keys : 'N/A'"
                          label="Time"
                        ></v-select>
                        <v-select
                          v-model="columnData.location"
                          :items="this.hasLocation ? this.keys : 'N/A'"
                          label="Location"
                        ></v-select>
                        <v-select
                          v-model="columnData.latitude"
                          :items="this.hasLocation ? this.keys : 'N/A'"
                          label="Latitude"
                        ></v-select>
                        <v-select
                          v-model="columnData.longitude"
                          :items="this.hasLocation ? this.keys : 'N/A'"
                          label="Longitude"
                        ></v-select>
                        <v-select
                          v-model="columnData.value"
                          :items="this.hasLocation ? this.keys : 'N/A'"
                          label="Value"
                        ></v-select>

                        <v-divider></v-divider>

                        <v-btn
                          color="success"
                          @click="stepIndex = 3"
                        >
                          Continue
                        </v-btn>
                
                        <v-btn text @click="closeDialog">
                          Cancel
                        </v-btn>
                      </v-stepper-content>
                
                      <v-stepper-content step="3">
                        <v-select
                          v-model="timeGranularity"
                          :items="this.hasTime ? this.timeGranularityOptions : 'N/A'"
                          label="Time"
                        ></v-select>
                        <v-select
                          v-model="locationGranularity"
                          :items="this.hasLocation ? this.locationGranularityOptions : 'N/A'"
                          label="Location"
                        ></v-select>

                        <v-divider></v-divider>
                
                        <v-btn
                          color="success"
                          @click="processForm"
                        >
                          Save and Upload
                        </v-btn>
                
                        <v-btn text @click="closeDialog">
                          Cancel
                        </v-btn>
                      </v-stepper-content>
                    </v-stepper-items>
                  </v-stepper>
                </v-container>
              </v-card-text>
            </v-card>
          </v-dialog>
        </div>
      </b-card-group>
    </div>
  </div>
</template>

<script>
import api from "../../api";
import router from "../../router";
import notify from "../../utilities/notify";
import { colors } from "../../utilities/branding";

export default {
  name: "Upload",
  data() {
    return {
      datasetName: "Sample",
      tagsOfChosenType: [],
      datasetTags: [],
      datasetPermissions: "Public",
      datasetType: "Land Use",
      permissionOptions: ["Public", "Private"],
      typeOptions: ["Land Use", "Pesticide Report"],
      timeGranularityOptions: ["day", "month", "year"],
      locationGranularityOptions: ["state", "district", "village","coordinates"],
      file: null,
      loading: false,
      search: "",
      dialog: false,
      keys: [],
      stepIndex: 1,
      hasTime: false,
      hasLocation: false,
      timeGranularity: null,
      locationGranularity: null,
      columnData: {
        value: null,
        longitude: null,
        latitude: null,
        locationLabel: null,
        time: null,
        location: null
      }
    };
  },
  watch: {
    datasetTags: function() {
      this.datasetTags[this.datasetTags.length - 1] = this.datasetTags[
        this.datasetTags.length - 1
      ].toLowerCase();
    },
    datasetType: function() {
      this.getTags(this.datasetType);
    }
  },
  methods: {
    processForm() {
      this.loading = true;

      var timer = setTimeout(function() {
        router.push({ name: "WaitForUpload" });
      }, 7515);

      this.datasetTags = [...new Set(this.datasetTags)];
      api
        .uploadDataset(
          this.file,
          this.datasetName,
          this.datasetTags,
          this.datasetPermissions,
          this.datasetType,
          JSON.stringify(this.columnData),
          this.timeGranularity,
          this.locationGranularity
        )
        .then(response => {
          this.loading = false;
          this.$router.push(`/dataset/${response.data.message}`);
          clearTimeout(timer);
        })
        .catch(error => {
          this.loading = false;
          notify(error.response.data.message, colors.red);
          clearTimeout(timer);
        });
    },
    remove(item) {
      this.datasetTags.splice(this.datasetTags.indexOf(item), 1);
      this.datasetTags = [...this.datasetTags];
    },
    getTags(datasetType) {
      api
        .fetchTags(datasetType)
        .then(response => {
          this.tagsOfChosenType = response.data;
        })
        .catch(err => {
          notify("Error fetching tags.", colors.red);
        });
    },
    getKeys(){
      // if (this.file) { return }
      let reader = new FileReader();

      reader.readAsText(this.file);
    
      reader.onload = e => {
      let text = e.target.result;
      console.log(text);
      this.keys = this.keys.concat(text.split("\n")[0].split(","));
      }

    },
    printHeatmapData() {
      this.dialog = false;
      console.log(this.heatmapData)
    },
    closeDialog() {
      this.dialog = false;
      this.hasTime = false;
      this.hasLocation = false;
      this.stepIndex = 1;
    },
    changeStep() {
      (this.hasTime || this.hasLocation) ? this.stepIndex = 2 : this.closeDialog()
    },
  },
  created() {
    this.getTags(this.datasetType);
  }
};
</script>

<style lang="css">
.table {
  padding: 20px;
}
.form-inline {
  justify-content: center;
}

.lastRow {
  padding-top: 15px;
  flex: auto;
  align-items: center;
}

.submitButton {
  flex: auto;
}
.v-file-input {
  max-width: 95%;
}
</style>