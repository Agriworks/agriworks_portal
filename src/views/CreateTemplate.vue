<template>
  <div>
    <h1>Create New Template</h1>
    <div class="table">
      <v-form ref="form">
        <v-text-field v-model="templateName" required label="Template Name"></v-text-field>
        <v-text-field v-model="templateHeaders" required label="Template Header"></v-text-field>
        <v-text-field v-model="units" required label="Units"></v-text-field>
        <v-btn
          @click="addHeader"
          class="submitButton"
          x-large
          color="success"
          dark
        >
        Add header 
      </v-btn>

      </v-form>

      <!-- Create a section that displays each of the headers that have been added, with an option to remove
      headers that have been added here, if they were put on accident !-->


      <!-- Create a section for the button that will send this information to the backend once the user finishes
      creating the headings !-->
      <b-card-group deck class="lastRow">
        <v-btn
          @click="processForm"
          class="submitButton"
          x-large
          color="success"
          dark
          :loading="this.loading"
        >
          <v-icon>mdi-folder-plus-outline</v-icon>Create Template
        </v-btn>
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
      templateName: "Sample",
      headers: [],
      file: null,
      loading: false,
      search: ""
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

    //Create method called addHeader, which will add the typed Header to the headers array
    addHeader() {
      headers.push()
    },
    //Create method called removeHeader, which will remove a typed Header from the headers array
    removeHeader() {

    },
    //Need to edit the processForm (and, therefore, the api) to upload the template to the backend, along with its name
    processForm() {
      this.loading = true;

      //This part is used to redirect to a new page if this is a long request
      var timer = setTimeout(function() {
        router.push({ name: "WaitForUpload" });
      }, 7515);

      //Creates
      this.datasetTags = [...new Set(this.datasetTags)];
      api
        .uploadDataset(
          this.file,
          this.datasetName,
          this.datasetTags,
          this.datasetPermissions,
          this.datasetType
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