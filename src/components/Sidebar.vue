<template>
  <nav>
    <v-navigation-drawer
      app
      dark
      :color="color"
      :mini-variant.sync="mini"
      expand-on-hover
      permanent
    >
      <v-list-item>
        <v-img v-if="!mini" src="../assets/logo_transparent_2.png" />
        <v-img v-else src="../assets/mini_logo.png" />
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item
          v-for="item in items.filter(n => {if(this.$store.getters.isLoggedIn){return n.displayOnLoggedIn}else{return !n.displayOnLoggedIn}})"
          :key="item.title"
          :to="item.link"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item @click="mockSignOut()" v-if="this.$store.getters.isLoggedIn">
          <v-list-item-icon>
            <v-icon>mdi-logout</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      drawer: true,
      items: [
        {
          title: "Home",
          icon: "mdi-home",
          link: "/browse",
          displayOnLoggedIn: true
        },
        {
          title: "Login",
          icon: "mdi-login-variant",
          link: "/login",
          displayOnLoggedIn: false
        },
        {
          title: "Registration",
          icon: "mdi-account-plus",
          link: "/registration",
          displayOnLoggedIn: false
        },
        {
          title: "Dashboard",
          icon: "mdi-view-dashboard",
          link: "/dashboard",
          displayOnLoggedIn: true
        },
        {
          title: "Account",
          icon: "mdi-account",
          link: "/account",
          displayOnLoggedIn: true
        }
      ],
      mini: true,
      color: "#212121"
    };
  },
  methods: {
    mockSignOut() {
      // this.$emit("signedOut", true);
      this.$store.dispatch("logout");
    }
  }
};
</script>

<style scoped>
h4 {
  font-size: 0.8vw;
}
.v-navigation-drawer--fixed.v-navigation-drawer--open {
  padding-top: 15px;
}

.pa-2 {
  max-width: 50%;
}
.addMargin {
  margin-left: 20%;
}
.v-list-item__avatar {
  margin-left: 5%;
}
</style>
