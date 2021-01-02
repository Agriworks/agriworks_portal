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
                      <div v-for="(key, index) in this.keys" :key="key.name">  
                      <v-stepper-step 
                      :complete="stepIndex > index + 1"
                        :step="index + 1"
                        color="success" 
                        editable
                      >
                        {{key.name}}
                      </v-stepper-step>
                      </div>
                
                      <v-divider></v-divider>
                
                
                    </v-stepper-header>
                
                    <v-stepper-items>

                      <div v-for="(key, index) in this.keys" :key="key.name">  
                        <v-stepper-content :step="index + 1">
                          <v-row>
                            <v-col>
                          <v-select 
                            :items="columnLabelOptions"
                            :label="key.name"
                            v-model="key.label"
                            ></v-select>
                            </v-col>

                            <v-col>
                            <v-data-table
                              :headers="[{text: key.name, value:'value'}]"
                              :items="columnPreviews[key.name]"
                               calculate-widths
                              hide-default-footer
                            ></v-data-table>
                            </v-col>
                          </v-row>
                          <v-divider></v-divider>

                          <v-btn
                            v-if="stepIndex != 1"
                            color="error"
                            @click="stepIndex -= 1"
                          >
                            Back
                          </v-btn>


                          <v-btn
                            v-if="stepIndex != keys.length"
                            color="success"
                            @click="stepIndex += 1"
                            style="float: right"
                          >
                            Continue
                          </v-btn>

                          <v-btn
                            v-if="stepIndex == keys.length"
                            color="success"
                            @click="processForm"
                            style="float: right"
                          >
                            Upload
                          </v-btn>


                        </v-stepper-content>

                        

                      </div>


                     
                
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
      file: null,
      loading: false,
      search: "",
      dialog: false,
      keys: [],
      keyNames: [],
      columnPreviews: {},
      stepIndex: 1,
      hasTime: false,
      hasLocation: false,
      timeGranularity: null,
      locationGranularity: null,
      columnLabelOptions: ["Time (Daily)", "Time (Monthly)", "Time (Yearly)", "Location (State)", 
                    "Location (District)", "Location (Village)", "Latitude", "Longitude", 
                    "Data (Number)", "Data (String)", "N/A"],
      columnLabels: {}
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


      this.modifyColumnLabels();

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
          JSON.stringify(this.columnLabels),
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
        .catch(() => {
          notify("Error fetching tags.", colors.red);
        });
    },
    modifyColumnLabels(){
      //change the the column labels from the terms the user sees to the labels the backend expects

      console.log("These are the keys")
      console.log(this.keys)

      for(var key in this.keys){
        console.log("This is a key")
        console.log(key)
        this.keys[key].label = this.mapKeyLables( this.keys[key].label);
        this.columnLabels[this.keys[key].name] = this.keys[key].label;
      }
    },
    mapKeyLables(label){
      //definitly a better way of doing this but I didn't want to write out all the columnLableOptions again for risk of typo, plus if we wanted to add more
        var options = ["time_day", "time_month", "time_year", "loc_state", "loc_district", "loc_village",
                  "loc_lat", "loc_lon", "data_num", "data_string"]

        for (var i = 0; i < this.columnLabelOptions.length; i++){
          if (this.columnLabelOptions[i] == label)
            return options[i]
        }

        return "null"
    },
    getKeys(){
      // if (this.file) { return }

      //clear the keys first

      this.keys = []

      let reader = new FileReader();

      reader.readAsText(this.file);
    
      reader.onload = e => {
        let text = e.target.result;
        console.log(text);
        console.log("This is text[0]")
        console.log(text[1][0])
        console.log("Done")

        var rows = text.split("\n")

        //get the key names
        this.keyNames = this.keyNames.concat(rows[0].split(","));

        var splitRows = []

        for (var i = 0; i < 5; i++){
          splitRows.push(rows[i + 1].trim().split(","));
        }

        //create a array of objects for every column that has the name and label of the column

        var cnt = 0;

        //definitly a better way to do this for loop
        for(var keyName in this.keyNames){
          this.keys.push({name: this.keyNames[keyName], label: null});

          console.log(keyName)
          var previews = [];
          for (var j = 0; j < 5; j++){
            console.log(text)
            previews.push({value: splitRows[j][cnt]})
          }
          
          this.columnPreviews[this.keyNames[keyName]] = previews
          cnt += 1

        }
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

.firstRow {
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