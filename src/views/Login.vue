<template>
  <div class="container">
    <div class="row">
      <!-- <div class="col-md-1"></div> -->
      <div class="col-md-6">
        <div class="shadow rounded">
          <div class="card-body">
            <h3 class="card-title text-center">Login</h3>
            <form class="form-signin">
              <div class="form-label-group">
                <label for="inputEmail">Username</label>
                <input
                  type="email"
                  id="inputEmail"
                  class="form-control"
                  placeholder
                  required
                  autofocus
                />
              </div>
              <p></p>
              <div class="form-label-group">
                <label for="inputPassword">Password</label>
                <input type="password" id="inputPassword" class="form-control" placeholder required />
              </div>

              <div class="custom-control custom-checkbox mb-3">
                <input type="checkbox" class="custom-control-input" id="customCheck1" />
                <label class="custom-control-label" for="customCheck1">Remember password</label>
              </div>

              <div class="custom-control custom-checkbox mb-3" align="center">
                <button class="btn btn-lg btn-primary" type="submit">Login</button>
              </div>
              <div class="custom-control custom-checkbox mb-3">
                <router-link to="/registration" class="btn btn-link">Register</router-link> | <router-link to="/registration" class="btn btn-link">Forgot Password?</router-link>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div class="col-md-1"></div>
      <div class="col-md-5">
        
          <div class="placeholder">
            <img class="card-img center" src="../assets/Welcome.png" alt="Card image cap" align="middle">
            <p>Donec sed odio dui. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Vestibulum id ligula porta felis euismod semper. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.</p>
            <a href="#!">
              <div class="mask rgba-white-slight"></div>
            </a>
          </div>
        
      </div>
    </div>
  </div>
</template>

<style>
  .col-md-6 {
    padding: 1.5em 1.5em 1.5em 1.5em;
  }
</style>
