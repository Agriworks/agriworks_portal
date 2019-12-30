<template>
  <div>
    <div class=fields_row>
      <b-input
        id="inline-form-input-name"
        placeholder="Search Dataset"
        style="margin-right: 10px; height: 42px; max-width: 50%;"
      ></b-input>
      <multiselect v-model="value" :options="options" :multiple="true" placeholder="Select a field"></multiselect>
    </div>
  </div>
</template>

<script>
  import Multiselect from 'vue-multiselect'

  export default {
    // OR register locally
    components: { Multiselect },
    data () {
      return {
        value: null,
        options: ['Data-field-1', 'Data-field-2', 'Data-field-3']
      }
    }
  }
</script>
<style lang="css">
.fields_row {
  display: flex;
  flex-direction: row;
}
</style>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
