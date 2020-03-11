<template>
  <div class="table">
    <h1> Create New Dataset </h1>
    <v-form ref="form">
      <v-text-field v-model="datasetName" required label="Dataset name"></v-text-field>
      <v-select v-model="datasetPermissions" required :items="permissionOptions" label="Permissions"></v-select>
      <v-select v-model="datasetType" required :items="typeOptions" label="Dataset type"></v-select>
      <v-combobox
      v-model="datasetTags"
      hide-selected
      label="Tags"
      multiple
      small-chips
    >
    <template v-slot:selection="{item}">
      <v-chip
        close
        @click:close="remove(item)"
        color="#96D34A"
      >
        {{ item }}
      </v-chip>
    </template>
      <!-- <template v-slot:no-data>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>
              No results matching "<strong>{{ search }}</strong>". Press <kbd>enter</kbd> to create a new one
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template> -->
    </v-combobox>
    </v-form>
      
      <b-card-group deck class="lastRow">
        <b-card title="Data Selection" style="max-width: 50%;">
          <div>
            <p> Choose a file with relevant data from your local computer to upload. Acceptable file formats incude: CSV </p>
            <v-file-input v-model="file" label="Select a file" show-size accept=".csv"></v-file-input>
          </div>
        </b-card>
        <v-btn @click="processForm" class="submitButton" x-large color="success" dark :loading="this.loading"> <v-icon>mdi-folder-plus-outline </v-icon> Create </v-btn> 
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
import api from "../../api";

export default {
  name: 'Upload',
  data() {
    return {
      datasetName: "Sample",
      datasetTags: [],
      datasetPermissions: "Public",
      datasetType: "Land Use",
      permissionOptions: ["Public", "Private"],
      typeOptions: ["Land Use", "Pesticide Report"],
      file: null,
      loading: false
    }
  },
  methods: {
    processForm() {
      this.loading = true;
      api.uploadDataset(this.file, this.datasetName, this.datasetTags, this.datasetPermissions, this.datasetType)
      .then(response => {
        this.loading = false;
        this.$router.push(`/dataset/${response.data.message}`);
      })
      .catch(error => {
        this.loading = false;
        this.$store.dispatch("notifyError", error.response.data.message);
      })
    },
    remove (item) {
        this.datasetTags.splice(this.datasetTags.indexOf(item), 1)
        this.datasetTags = [...this.datasetTags]
    },
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