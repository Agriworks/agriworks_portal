<template>
  <div id="app">
    <div class="container-fluid">
      <div id="header">
        <div id="header-left">
          <Logo/>
        </div>
        <div id="header-right">
          <fa-icon icon="sign-in-alt" size="lg"/>
        </div>
      </div>
      <Push>
        <a id="logo">
            <Logo/>
        </a>
        <router-link v-for="route in routes" :key="route.path" :to="route.path">
            {{route.name}}  
        </router-link>
      </Push>
        <main id="page-wrap">
          <router-view />
        </main>
      </div>
        <footer v-bind="currentYear = getYear()">
          <small>Copyright &copy; {{currentYear}} Agriworks</small>
        </footer>
    </div>  
</template>

<script>
import Logo from './components/Logo'
import {Push} from 'vue-burger-menu'

export default {
  name: "app",
  components: {Push, Logo},
  data() {
    return {
      routes: this.$router.options.routes
    };
  },
  methods:{
    getYear(){
      var d = new Date();
      const currentYear = d.getFullYear();
      return currentYear;
    }
  }
};
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
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

.sidebar-text {
  font-weight: bold;
  color: white;
}
.bm-menu {
  height: 100%; /* 100% Full-height */
  width: 0; /* 0 width - change this with JavaScript */
  position: fixed; /* Stay in place */
  z-index: 1000; /* Stay on top */
  top: 0;
  left: 0;
  background-color:#42b983;
  overflow-x: hidden; /* Disable horizontal scroll */
  padding-top: 20px; /* Place content 60px from the top */
  transition: 0.5s; /*0.5 second transition effect to slide in the sidenav*/
}

.bm-burger-button {
  height: 22px;
  top: 30px;
}

.bm-overlay {
  background: white;
}
.bm-item-list {
  color: #b8b7ad;
  margin-left: 10%;
  font-size: 20px;
}
.bm-item-list > * {
  display: flex;
  text-decoration: none;
  padding: 0.7em;
}
.bm-item-list > * > span {
  margin-left: 10px;
  font-weight: 700;
  color: white;
}
#footer {
  bottom: 0;
  width: 100%;
}

</style>
