<template>
  <div>
    <h1>Create New Template</h1>
    <div class="table">
      <v-form ref="form">
        <v-text-field v-model="templateName" required label="Template Name"></v-text-field>
        <v-text-field v-model="author" required label="Author"></v-text-field>
        <v-text-field v-model="headerName" required label="Template Header"></v-text-field>
        <v-text-field v-model="headerUnit" required label="Units"></v-text-field>
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
      <div id="headers-table">
        <p v-if="headers.length < 1" class="empty-table">
          View you headers here
        </p>
        <v-simple-table v-else> 
          <thead>
            <tr>
              <th>Header name</th>
              <th>Header unit</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="header in headers" :key="header.id">
              <td v-if="editing === header.id">
                <v-text-field solo v-model="header.name"></v-text-field>
              </td>
              <td v-else>{{ header.name }}</td>
              <td v-if="editing === header.id">
                <v-text-field solo v-model="header.unit"></v-text-field>
              </td>
              <td v-else>{{ header.unit }}</td>
              <td v-if="editing === header.id">
                <v-btn @click="editHeader(header)">Save</v-btn>
                <v-btn class="muted-button" @click="cancelEdit(header)">Cancel</v-btn>
              </td>
              <td v-else>
                <v-btn @click="editMode(header)">Edit</v-btn>
                <v-btn @click="deleteHeader(header)">Delete</v-btn>
              </td>
            </tr>
          </tbody>
        </v-simple-table>
    </div>

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
import api from "../api";
import router from "../router";
import notify from "../utilities/notify";
import { colors } from "../utilities/branding";

export default {
  name: "CreateTemplate",
  data() {
    return {
      templateName: "",
      author: "",
      headerName: "",
      headerUnit: "",
      headers: [],
      editing: null,
      cachedHeader: null,
      file: null,
      loading: false,
      search: ""
    };
  },
  methods: {

    //Create method called addHeader, which will add the typed Header to the headers array
    addHeader() {
      const headerId = this.headers.length < 1 ? 0 : this.headers[this.headers.length - 1].id + 1;
      const newHeader = {
        "id": headerId,
        "name": this.headerName,
        "unit": this.headerUnit
      }
      this.headers.push(newHeader);
    },
    editMode(header) {
      this.cachedHeader = Object.assign({}, header);
      this.editing = header.id;
    },
    editHeader(header) {
      if (header.name === "" || header.unit === "") {
        this.cancelEdit(header);
        return;
      } 
      this.editing = null;
    },
    cancelEdit(header) {
      Object.assign(header, this.cachedHeader);
      this.editing = null;
    },
    deleteHeader(header) {
      let i;
      for (i = 0; i < this.headers.length; i++) {
        if (this.headers[i].id === header.id) {
          this.headers.splice(i, 1);
          break;
        }
      }
    },
    //Need to edit the processForm (and, therefore, the api) to upload the template to the backend, along with its name
    processForm() {
      this.loading = true;

      //This part is used to redirect to a new page if this is a long request
      var timer = setTimeout(function() {
        router.push({ name: "WaitForUpload" });
      }, 7515);

      //Creates the template
      api
        .uploadTemplate(
          this.templateName,
          this.author,
          this.headers
        )
        .then(response => {
          this.loading = false;
          clearTimeout(timer);
        })
        .catch(error => {
          this.loading = false;
          notify(error.response.data.message, colors.red);
          clearTimeout(timer);
        });
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
.v-file-input {
  max-width: 95%;
}

.headers-table {
  padding: 5%;
}
</style>