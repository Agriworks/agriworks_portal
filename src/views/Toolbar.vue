<template>
  <div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      signedIn: true
    };
  },
  methods: {
    mockSignIn(signedIn) {
      this.$emit("signedIn", signedIn);
    },
    signUp() {
      this.mockSignIn(this.signedIn);
      this.$router.push("registration");
    }
  }
};
</script>
