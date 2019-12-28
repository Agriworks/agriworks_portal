<template>
  <div class="table">
    <v-form ref="form">
      <v-text-field v-model="datasetName" required label="Dataset name"></v-text-field>
      <v-text-field v-model="datasetTags" label="Dataset tags"></v-text-field>
      <v-select v-model="datasetPermissions" :items="permissionOptions" label="Permissions"></v-select>
      <v-select v-model="datasetType" :items="typeOptions" label="Dataset type"></v-select>
    </v-form>
      
      <b-card-group deck class="lastRow">
        <b-card title="Data Selection" style="max-width: 50%;">
          <div>
            <p> Choose a file with relevant data from your local computer to upload. Acceptable file formats incude: CSV & TXT </p>
            <v-file-input v-model="file" label="Select a file" show-size accept=".csv, .txt"></v-file-input>
          </div>
        </b-card>
        <v-btn @click="processForm" class="submitButton" x-large color="success" dark> <v-icon>mdi-folder-plus-outline </v-icon> Create </v-btn> 
        <!--
        <b-card title="Preparation" style="max-width: 50%;">
          <b-card-text>
            The following video will give you an explanation of how to prepare your data. Please note that all uploaded files will have either the .csv or .txt extension.
          </b-card-text>
        </b-card>
        !-->
      </b-card-group>
  </div>
</template>

<script>
  import FieldLink from './FieldLink'
  import axios from 'axios'
  export default {
    name: 'Upload',
    components: { FieldLink },
    data() {
      return {
        datasetName: "Sample",
        datasetTags: "Untitled",
        datasetPermissions: "Public",
        datasetType: "Land Use",
        permissionOptions: ["Public", "Private"],
        typeOptions: ["Land Use", "Pesticide Report"],
        file: null
      }
    },
    methods: {
      processForm() {
        let newDataset = new FormData();
        newDataset.append('file', this.file);
        newDataset.append('name', this.datasetName);
        newDataset.append('tags', this.datasetTags);
        newDataset.append('permissions', this.datasetPermissions);
        newDataset.append('type', this.datasetType);
        axios.post('http://localhost:4000/upload/', 
            newDataset, {
            headers: {
              'Content-type': 'multipart/form-data'
            }
          },
          )
          .then(function(response) {
            //#TODO: display success message to user
            console.log(response);
            console.log('Success!');
          })
          .catch(function(error) {
            //#TODO: display error message to user
            console.log(error);
            console.log(error.body);
            console.log('Failure');
          });
      },
      handleFileUpload() {
        this.file = this.$refs['file-input']
      }
    }
  }
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
</style>