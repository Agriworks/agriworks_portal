<template>
  <div class="table">
      <b-card-group deck>
        <b-card title="Meta Data" style="max-width: 50%;">
          <div class="container">
            <b-form inline>
              <label class="sr-only" for="inline-form-input-meta1">Meta Data #1</label>
              <b-input-group prepend="Field 1" class="mr-sm-5 mb-sm-4">
                <b-input
                  id="inline-form-input-meta1"
                  placeholder="Meta Data #1"
                ></b-input>
              </b-input-group>
              <label class="sr-only" for="inline-form-input-meta2">Meta Data #2</label>
              <b-input-group prepend="Field 2" class="mb-sm-4">
                <b-input
                  id="inline-form-input-meta2"
                  placeholder="Meta Data #2"
                ></b-input>
              </b-input-group>
            </b-form>
            <b-form inline>
              <label class="sr-only" for="inline-form-input-meta3">Meta Data #3</label>
              <b-input-group prepend="Field 3" class="mr-sm-5">
                <b-input
                  id="inline-form-input-meta3"
                  placeholder="Meta Data #3"
                ></b-input>
              </b-input-group>
              <label class="sr-only" for="inline-form-input-meta4">Meta Data #4</label>
              <b-input-group prepend="Field 4">
                <b-input
                  id="inline-form-input-meta4"
                  placeholder="Meta Data #4"
                ></b-input>
              </b-input-group>
            </b-form>
          </div>
        </b-card>
        <b-card title="Link Fields" style="max-width: 50%;">
          <div style="margin-bottom: 20px;">
            <b-card-text>Field 1</b-card-text>
              <div class=fields_row>
                <b-input
                  id="inline-form-input-name"
                  placeholder="Search Dataset"
                  style="margin-right: 10px; height: 42px; max-width: 50%;"
                ></b-input>
                <FieldLink style="width: 50%;"/>
              </div>
          </div>
          <div>
            <b-card-text>Field 2</b-card-text>
            <div class=fields_row>
              <b-input
                id="inline-form-input-name"
                placeholder="Search Dataset"
                style="margin-right: 10px; height: 42px; max-width: 50%;"
              ></b-input>
              <FieldLink style="width: 50%;"/>
            </div>
          </div>
        </b-card>
      </b-card-group>
      <b-card-group deck style="padding-top: 15px;">
        <b-card title="Selection" style="max-width: 50%;">
          <div>
            <b-form-file v-model="file" class="mt-3" plain></b-form-file>
            <div class="mt-3">Selected file: {{ file ? file.name : '' }}</div>
          </div>
        </b-card>
        <b-card title="Preparation" style="max-width: 50%;">
          <b-card-text>
            The following video will give you an explanation of how to prepare your data. Please note that all uploaded files will have either the .csv or .txt extension.
          </b-card-text>
        </b-card>
      </b-card-group>
  </div>
</template>

<script>
  import FieldLink from './FieldLink'
  export default {
    components: { FieldLink }
  }
</script>

<style lang="css">
.table {
  padding: 20px;
}
.form-inline {
  justify-content: center;
}
.fields_row {
  display: flex;
  flex-direction: row;
}
</style>