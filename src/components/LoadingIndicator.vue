<template>
    <div id="loadingContainer">
        <v-progress-circular indeterminate color="green"/>
    </div>
</template>

<script>
export default {
    name: "LoadingIndicator"
}
</script>

<style scoped>
#loadingContainer {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
