<template>
    <v-app-bar
        app
    >

    <v-toolbar-items>
        <v-btn flat tile text @click="updateTool('agribase')">Agribase</v-btn>
        <v-btn flat tile color="#96D34A" @click="updateTool('agriwatch')">Agriwatch</v-btn>
    </v-toolbar-items>

    </v-app-bar>
</template>

<script>
export default {
    name: "TopNavbar",

    props: ["tool"],

    methods: {
        updateTool(tool){
            this.$emit("updateTool", tool)
            console.log("This is called in child class")
        }
    }
};
</script>