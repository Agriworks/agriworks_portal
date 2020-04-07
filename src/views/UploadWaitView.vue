<template>
    <div class="waitmessage">
        <img src="../assets/upload.png" alt="upload icon">
        <h3>Congratulations! Your dataset is being processed. You are free to leave this page and you'll receive an email once it's finished.</h3>
    </div>
</template>


<script>
export default {
    
}
</script>

<style scoped>
div.waitmessage {
    left: 0;
    line-height: 200px;
    margin-top: -100px;
    position: absolute;
    text-align: center;
    top: 50%;
    width: 100%;
}
</style>