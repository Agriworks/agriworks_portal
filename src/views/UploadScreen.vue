<template>
  <div class="uploadscreen"> 
    <h1>Upload file here </h1>
    <Upload />
  </div>
</template>

<script>
// @ is an alias to /src
import Upload from '@/components/Upload.vue'

export default {
  name: 'uploadscreen',
  components: {
    Upload
  }
}
</script>