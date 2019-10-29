<template>
    <div class="container">
      <div class="row">
        <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
          <div class="card card-signin my-5">
            <div class="card-body">
              <h3 class="card-title text-center">Sign Up</h3>
              <form method = "POST" action = "/signup" class="form-signin">
                <div class="form-label-group">
                  <label for="inputText">First Name</label>
                  <input name = "firstName" type="text" id="inputText" class="form-control" placeholder="" required autofocus>
                </div>
                <div class="form-label-group">
                  <label for="inputText">Last Name</label>
                  <input name = "lastName" type="text" id="inputText" class="form-control" placeholder="" required autofocus>
                </div>
                <div class="form-label-group">
                  <label for="inputEmail">Email</label>
                  <input name = "email" type="email" id="inputEmail" class="form-control" placeholder="" required autofocus>
                </div>
              <p></p>
                <div class="form-label-group">
                  <label for="inputPassword">Password</label>
                  <input name = "password" type="password" id="inputPassword" class="form-control" placeholder="" required>
                </div>

                <div class="custom-control custom-checkbox mb-3">
                  <input type="checkbox" class="custom-control-input" id="customCheck1">
                  <label class="custom-control-label" for="customCheck1">Remember password</label>
                </div>
                
              <div class="custom-control custom-checkbox mb-3">
                  <button class="btn btn-lg btn-primary" type="submit">Sign Up</button>
                  <router-link to="/login" class="btn btn-link">Login</router-link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>


<style scoped>
  .form-label-group {
    margin: 35px 10px; 
  }
  h3 {
    margin: 20px 15px; 
  }
  button {
    margin: 15px 15px; 
  }
</style>