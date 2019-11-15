<template>
  <div id="app">
    <div class="container-fluid">
      <Push>
        <a id="logo">
          <img src="./assets/logo_transparent_2.png" class="img-fluid" alt="Responsive image" height="100">
        </a>
        <router-link v-for="route in routes" :key="route.path" :to="route.path">
          {{route.name}}  
        </router-link>
      </Push>
      <main id="page-wrap">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script>
import {Push} from 'vue-burger-menu'
export default {
  name: "app",
  components: {Push},
  data() {
    return {
      routes: this.$router.options.routes
    };
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
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
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

</style>
