import { BFormFile } from 'bootstrap-vue'
Vue.component('b-form-file', BFormFile)

<template>
  <div class="container">
    <!-- Styled -->
    <b-form-file
      id="file-large"
      size="lg"
      accept=".csv, .txt, .xlsm"
      v-model="file"
      :state="Boolean(file)"
      placeholder="No file chosen"
      ref="file-upload"
    ></b-form-file>
    <div class="mt-2">Selected file: {{ file ? file.name : '' }}</div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        file: null
      }
    },
    methods: {
      clearFiles() {
        this.$refs['file-upload'].reset()
      }
    }
  }
</script>

<style lang="css">
.b-form-file {
  text-align: left
}
.mt-2 {
  text-align: left
}
</style>