<template>
  <nav>

    <v-navigation-drawer app :color="color" dark :expand-on-hover="!isExpanded" permanent>
      <v-list-item class="px-2">
        <v-img
          v-if="isExpanded"
          src="../assets/logo_transparent_2_white_text.png"
          contain
          max-height="50"
          aspect-ratio="1"
        />  
        <v-list-item-avatar v-else>
          <v-img src="../assets/mini_logo.png"/>
        </v-list-item-avatar>
      </v-list-item>

      <v-divider></v-divider>


      <v-list flat>




        <v-list-group
          v-for="item in items.filter(n => {if(this.$store.getters.isLoggedIn == true){return n.displayOnLoggedIn && n.subItems}else{return !n.displayOnLoggedIn && n.subItems}})"
          :key="item.title"
          :prepend-icon="item.icon"
          no-action
        >
          <template v-slot:activator>
            <v-list-item
            class="activatorSlot"
              :to="item.link"
              link
            >
              <v-list-item-content>
                <v-list-item-title v-text="item.title"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>
  
          <v-list-item
          
            v-for="subItem in item.subItems"
            :key="subItem.title"
            :prepend-icon="subItem.icon"
            :to="subItem.link"
            link
          >
          
            <v-list-item-content>
              <v-list-item-title v-text="subItem.title"></v-list-item-title>
            </v-list-item-content>
            <v-list-item-icon>
              <v-icon v-text="subItem.icon"></v-icon>
            </v-list-item-icon>
          </v-list-item>

          </v-list-group> 


       
        <v-list-item
            v-for="item in items.filter(n => {if(this.$store.getters.isLoggedIn == true){return n.displayOnLoggedIn && !n.subItems}else{return !n.displayOnLoggedIn}})"
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


          

        <v-list-item @click="mockSignOut()" v-if="this.$store.getters.isLoggedIn == true">
            <v-list-item-icon>
              <v-icon>mdi-logout</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Logout</v-list-item-title>
            </v-list-item-content>
          </v-list-item> 
        <v-divider></v-divider>
          <div class="text-center" v-if="isExpanded">
              <v-btn color="#4caf50" dark @click.stop="openDialog()">Settings</v-btn>
          </div>

      </v-list>

     
    </v-navigation-drawer> 
  </nav>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
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
        }, 
        {
          title: "Agribase",
          icon: "mdi-database",
          link: "/browse", 
          displayOnLoggedIn: true,
          subItems: [
            {
              title: "Create",
              link: "/browse/upload", //what ever the create page is 
              icon: "mdi-plus"
            },
            {
              title: "Manage",
              link: "/manage", //not sure where this is supposed to go
              icon:"mdi-clipboard"
            }
          ]
        }, 
        {
          title: "Agriwatch",
          icon: "mdi-chart-box",
          link: "/dashboard",
          displayOnLoggedIn: true,
          subItems: [
            {
              title: "Create",
              link: "/browse/upload", //not sure if it is the same create page as agribase create page
              icon: "mdi-plus"
            },
            {
              title: "Merge",
              link: "/merge", //I do not think that this exists
              icon: "mdi-merge"
            }
          ]
        } 
      ],
      color: "#212121"
    };
  },
  props: ["isExpanded"],
  methods: {
    mockSignOut() {
      // this.$emit("signedOut", true);
      this.$store.dispatch("logout");
    },
    openDialog() {
      this.$emit("openDialog", true);
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

.activatorSlot {
  padding: 0;
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
.card-actions {
  position: absolute;
  bottom: 0;
}
</style>
