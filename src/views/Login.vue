<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
        <div class="card card-signin my-5">
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

              <div class="custom-control custom-checkbox mb-3">
                <button class="btn btn-lg btn-primary" type="submit">Login</button>
                <router-link to="/registration" class="btn btn-link">Register</router-link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
