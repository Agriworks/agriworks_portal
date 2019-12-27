<template>
  <div id="app" :class="[{'collapsed' : collapsed}]">
    <div class="container-fluid">
      <Sidebar v-on:collapsed="onCollapsed"/>
      <div id="header">
        <div id="header-left">
          <Logo/>
        </div>
        <div id="header-right">
          <!-- Log in and sign in buttons. Display only if not logged in !--> 
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
import Sidebar from './components/Sidebar'

// import {Push} from 'vue-burger-menu'

export default {
  name: "app",
  components: {Logo, Sidebar},
  data() {
    return {
      routes: this.$router.options.routes,
      collapsed: true
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
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
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

</style>
