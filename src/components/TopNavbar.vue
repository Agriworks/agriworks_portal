<template>
    <v-app-bar
        app
        dark
    >

    <v-toolbar-items>
        <v-btn flat tile v-bind:color="tool==='agribase' ? '#96D34A' : '#1E1E1E'" @click="updateTool('agribase')">Agribase</v-btn>
        <v-btn flat tile v-bind:color="tool==='agriwatch' ? '#96D34A' : '#1E1E1E'"  @click="updateTool('agriwatch')">Agriwatch</v-btn>
    </v-toolbar-items>

    </v-app-bar>
</template>

<script>
export default {
    name: "TopNavbar",

    props: ["tool"],

    computed: {
        agribaseColor() {
            return (this.tool === 'agribase' ? "#96D34A" : null)
        }, 
        agriwatchColor(){
            return (this.tool === "agriwatch" ? "#96D34A" : null)
        }
    },

    methods: {
        updateTool(tool){
            this.$emit("updateTool", tool)
            console.log("This is called in child class")
        }
    }
};
</script>