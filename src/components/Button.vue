<template>
    <v-btn color="#4caf50" dark> {{title}}</v-btn> 
</template>

<script>
export default {
    name: "Button",
    props:['title', 'action']
}
</script>