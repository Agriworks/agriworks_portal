<template>
  <div id="app">
    <div class="container-fluid">
      <Sidebar v-on:collapsed="onCollapsed"/>
      <div id="header">
        <div id="header-left">
          <Logo/>
        </div>
        <div id="header-right">
          <fa-icon icon="sign-in-alt" size="lg"/>
        </div>
      </div>
      <!-- <Push>
        <a id="logo">
            <Logo/>
        </a>
        <router-link v-for="route in routes" :key="route.path" :to="route.path">
            {{route.name}}  
        </router-link>
      </Push> -->
        <main id="page-wrap">
          <router-view />
        </main>
      </div>
    </div>  
</template>

<script>
import Logo from './components/Logo'
import {Push} from 'vue-burger-menu'
import store from './store'

export default {
  name: "app",
  components: {Logo, Sidebar},
  data() {
    return {
      routes: this.$router.options.routes, 
    };
  },
  methods: {
    onCollapsed(collapsed) {
      this.collapsed = collapsed
    },
    getYear(){
      var d = new Date();
      const currentYear = d.getFullYear();
      return currentYear;
    }, 
  
  }, 
  computed: {
    showError() {
      return this.$store.getters.getShowError
    }
  },
  watch: {
   showError: function(showVal){
   this.$forceUpdate
     if (showVal) {
           setTimeout(() =>   this.$store.commit("setShowError", false), 3000);
    }
    this.$forceUpdate
   } 
  }
}
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding-left: 250px;
}

#app.collapsed {
  padding-left: 50px;
}

.container-fluid {
  margin-top: 1rem;
}

#header {
  display: flex;
  justify-content: space-between;
  padding-left: 5rem;
  padding-right: 5rem;
}

#footer {
  bottom: 0;
  width: 100%;
}

.alert{
  width: 50%; 
  margin-left: 23rem; 
}

</style>
