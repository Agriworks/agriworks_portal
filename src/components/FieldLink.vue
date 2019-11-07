<template>
  <div>
    <multiselect v-model="value" :options="options" :multiple="true" placeholder="Select a field"></multiselect>
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

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
