<template>
  <v-app-bar
      app
      color="white"
      inverted-scroll
    >
    <img class="mr-3" :src="require('../assets/mini_logo.png')" height="40"/>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn flat tile text>Sign Up</v-btn>
        <v-btn flat tile color="#96D34A" @click="mockSignIn()">Sign In</v-btn>
      </v-toolbar-items>
    </v-app-bar>
</template>

<script>
  export default {
  name: "TopBar",
  data() {
    return {
      signedIn : true,
    }
  },
  methods: {
    mockSignIn(signedIn) {
      this.$emit('signedIn', signedIn);
    }
  }
};
</script>