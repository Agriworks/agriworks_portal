<template>
    <v-footer
        :color="darkTheme ? '#121212' : '#ffffff'"
        :absolute="$vuetify.breakpoint.mobile ? false : true"
    >
        <v-col
            class="text-center"
            cols="12"
        >
            <h6> Proudly built by  <a href="https://www.hack4impactbu.com/index.html" target="_blank"><span v-if="!darkTheme"><img src="../assets/hack4impactlogo.png" width="15%"/></span><span v-if="darkTheme"><img src="../assets/hack4impactlogo_white.png" width="15%"/></span></a></h6>
        </v-col>
    </v-footer>
</template>
<script>
export default {
    name: "Footer",
    data() {
        return {
            darkTheme: this.$vuetify.theme.dark,

        }
    }
}
</script>