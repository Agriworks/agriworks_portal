<template>
  <div id="app">
    <div class="container-fluid">
      <Push>
        <a id="logo">
          <img src="./assets/logo_transparent_2.png" class="img-fluid" alt="Responsive image" height="100">
        </a>
        <a id="home" href="#"> 
          <span><router-link to="/"><div class="sidebar-text">Home</div></router-link></span>  
        </a>
        <a id="about" href="#"> 
          <span><router-link to="/about"><div class="sidebar-text">About</div></router-link></span>  
        </a>
        <a id="login" href="#"> 
          <span><router-link to="/login"><div class="sidebar-text">Login</div></router-link></span>  
        </a>
        <a id="reg" href="#"> 
          <span><router-link to="/registration"><div class="sidebar-text">Sign Up</div></router-link></span>  
        </a>
      </Push>
      <main id="page-wrap">
        <!-- <div id="nav">
          <router-link to="/">Home |</router-link>
          <router-link to="/about"> About |</router-link>
          <router-link to="/login"> Login |</router-link>
          <router-link to="/dashboard"> Dashboard |</router-link>
          <router-link to="/account"> Account |</router-link>
          <router-link to="/admin"> Admin |</router-link>
          <router-link to="/registration"> Sign Up |</router-link>
          <router-link to="/browse"> Browse</router-link>
        </div> -->
        <router-view />
      </main>
    </div>
  </div>
</template>

<script>
//import Registration from './components/Registration.vue'
import {Push} from 'vue-burger-menu'
export default {
  name: "app", 
  components: {
    Push 
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
