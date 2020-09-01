<template>
    <v-app-bar
        app
    >

    <v-toolbar-items>
        <v-btn flat tile text>Agribase</v-btn>
        <v-btn flat tile color="#96D34A" @click="mockSignIn()">Agriwatch</v-btn>
    </v-toolbar-items>

    </v-app-bar>
</template>

<script>
export default {
    name: "TopNavbar",

    props: ["tool"],
};
</script>