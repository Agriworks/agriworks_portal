<template>
  <div>
    <v-stepper v-model="stepIndex" class="elevation-0">
      <v-stepper-header>
        <v-stepper-step
          :complete="stepIndex > 1"
          step="1"
          color="success"
        >
          Upload dataset
        </v-stepper-step>
  
        <v-divider></v-divider>
  
        <v-stepper-step
          :complete="stepIndex > 2"
          step="2"
          color="success"
        >
          Dataset Info
        </v-stepper-step>

        <v-divider></v-divider>
  
        <v-stepper-step
          :complete="stepIndex > 3"
          step="3"
          color="success"
        >
          Configure dataset
        </v-stepper-step>
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content step="1">
          <h4> Upload Dataset </h4>
          <p>Choose a file with relevant data from your local computer to upload. Acceptable file formats incude: CSV</p>
          <v-file-input v-model="file" label="Select a file" show-size accept=".csv" @change="getKeys"></v-file-input>
          <v-row>
            <v-spacer></v-spacer>
            <v-btn
              v-if="file !== null"
              color="success"
              class="dialogButton" 
              depressed 
              @click="incrementStep"
            >
            Continue
            </v-btn>
            <v-btn
              v-else
              disabled
              color="success"
              class="dialogButton" 
              depressed 
              @click="incrementStep"
            >
            Continue
            </v-btn>
          </v-row>
        </v-stepper-content>

        <v-stepper-content step="2">
          <h4> Dataset Info </h4>
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
            
          </div>
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
              color="success" 
              class="dialogButton" 
              depressed 
              @click="incrementStep"
            >
            Continue
            </v-btn>
          </v-row>
        </v-stepper-content>

        <v-stepper-content step="3">
          <h4> Dataset Configuration </h4>
          <p> If your dataset contains columns with location or time data, choose the appropriate label for each of those columns. 
              For all other columns, leave the default data label unchanged. 
          </p>

          <v-row>
            <!-- <v-col md="auto">
              <h5> Column Names </h5>
              <div v-for="key in this.keys" :key="key.name">  
                <v-subheader>{{key.name}}</v-subheader>
              </div>
            </v-col> -->
            <v-col>
              <h5> Dataset columns </h5>
              <div v-for="key in this.keys" :key="key.name"> 
                <v-row align="center"
      justify="center"> 
                  <v-col align="center"   justify="center" :cols="4">
                    <v-subheader>{{key.name}}</v-subheader>
                  </v-col>
                  <v-col>
                    <v-select 
                    :items="columnLabelOptions"
                    item-text="name"
                    :label="key.name"
                    @click="changeCurrentKey(key.name)"
                    v-model="key.label"
                    ></v-select>
                  </v-col>
                </v-row>
              </div>
            </v-col>

             <v-col>
              <h5>{{currentKey}} Column Preview </h5>
              <v-data-table
                :headers="[{text: currentKey, value:'value'}]"
                :items="columnPreviews[currentKey]"
                calculate-widths
                hide-default-footer
              ></v-data-table>
            </v-col>
          </v-row>

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
              color="success" 
              class="dialogButton" 
              depressed 
              @click="incrementStep"
            >
            Create Dataset
            </v-btn>
          </v-row>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
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
      columnLabelOptions: [
        { name : "Time (Daily)", value : "time_day" }, 
        { name : "Time (Monthly)", value : "time_month" }, 
        { name : "Time (Yearly)", value : "time_year" }, 
        { name : "Location (State)", value : "loc_state" }, 
        { name : "Location (District)", value : "loc_district" }, 
        { name : "Location (Village)", value : "loc_village" }, 
        { name : "Latitude", value : "loc_lat" }, 
        { name : "Longitude", value : "loc_lng" }, 
        { name : "Data", value : "data" }
      ],
      columnLabels: [],
      currentKey: ""
    };
  },
  watch: {
    datasetTags: function() {
      if (this.datasetTags.length > 0) {
        this.datasetTags[this.datasetTags.length - 1] = this.datasetTags[
          this.datasetTags.length - 1
        ].toLowerCase();
      }
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
          //response.data.forEach(tag  => this.tagsOfChosenType.push(tag));
          if (response.data.message !== "Unable to get tags") {
            this.tagsOfChosenType = response.data;
          }
        })
        .catch(() => {
          notify("Error fetching tags.", colors.red);
        });
    },
    modifyColumnLabels(){
      //change the the column labels from the terms the user sees to the labels the backend expects

      this.columnLabels = [];

      for (var i = 0; i < this.keys.length; i++) {
        this.columnLabels.push(this.keys[i].label);
      }
    },
    getKeys(){
      //clear everything
      this.keys = []
      this.keyNames = []
      this.columnPreviews = {}
      this.columnLabels = []
      this.datasetTags = []

      let reader = new FileReader();

      reader.readAsText(this.file);
    
      reader.onload = e => {
        let text = e.target.result;
        let arrData = this.csvStringToArray(text);

        //get the key names
        this.keyNames = this.keyNames.concat(arrData[0]);
        this.currentKey = this.keyNames[0]

        //create a array of objects for every column that has the name and label of the column
        var cnt = 0;
        //definitly a better way to do this for loop
        for(var keyName in this.keyNames){
          this.keys.push({name: this.keyNames[keyName], label: "data"});

          var previews = [];
          for (var j = 1; j < Math.min(arrData.length, 6); j++){
            previews.push({value: arrData[j][cnt]})
          }
          
          this.columnPreviews[this.keyNames[keyName]] = previews
          cnt += 1

        }
      }

    },
    incrementStep() {
      if (this.stepIndex < 3) {
        this.stepIndex += 1;
      } else {
        this.processForm();
      }
    },
    decrementStep() {
      if (this.stepIndex > 1) {
        this.stepIndex -= 1;
      } else {
        this.dialog = false;
      }
    },
    changeCurrentKey(keyName) {
      this.currentKey = keyName;
    },
    csvStringToArray(strData) {
      const objPattern = new RegExp(("(\\,|\\r?\\n|\\r|^)(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|([^\\,\\r\\n]*))"),"gi");
      let arrMatches = null, arrData = [[]];
      while ((arrMatches = objPattern.exec(strData))){
        if (arrMatches[1].length && arrMatches[1] !== ",")arrData.push([]);
        arrData[arrData.length - 1].push(arrMatches[2] ? 
          arrMatches[2].replace(new RegExp( "\"\"", "g" ), "\"") :
          arrMatches[3]);
      }
      return arrData;
    }
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

.dialogButton {
  margin: 1rem;
  border-radius: 8px;
}
.v-file-input {
  max-width: 95%;
}
.v-stepper__header {
  box-shadow: none;
} 

.v-data-table {
  border: 2px solid #267a35de;
  border-radius: 10px;
}
</style>