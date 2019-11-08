<template>
    <div>
        <div class="main">
            <h1>Account settings</h1>
            <div>
                <h2>Email Address</h2>
                <p>What ever the email address is</p>
                <button class="btn btn-primary" type="button" id="changeEmail" data-toggle="modal" data-target="#emailModal">Change</button>
            </div>
            <div>
                <h2>Password</h2>
                <p>Choose a good password</p>
                <button class="btn btn-primary" type="button" data-toggle="modal" data-target="#passwordModal" id="changePassword">Change</button>
            </div>
        </div>
            <!--Email Modal -->
            <div class="modal fade" id="emailModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Update your email</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <form class="form-signin">
                            <div class="form-label-group">
                                <label for="inputEmail">Update your email below.</label>
                                <input 
                                type="password"
                                id="inputCurrentPassword"
                                class="form-control"
                                placeholder="Current Password"
                                required
                                autofocus
                                />
                                <input
                                type="email"
                                id="inputEmail"
                                class="form-control"
                                placeholder = "New Email"
                                required
                                autofocus
                                />
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary">Save changes</button>
                    </div>
                    </div>
                </div>
            </div>

            <!-- Password Modal -->
            <div class="modal fade" id="passwordModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Update your password</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <form class="form-signin">
                            <div class="form-label-group">
                                <label for="inputEmail">Update your password below.</label>
                                <input 
                                type="password"
                                id="inputCurrentPassword"
                                class="form-control"
                                placeholder="Current Password"
                                required
                                autofocus
                                />
                                <input
                                type="password"
                                id="inputPassword"
                                class="form-control"
                                placeholder = "New Password"
                                required
                                autofocus
                                />
                                <input
                                type="password"
                                id="inputConfirmPassword"
                                class="form-control"
                                placeholder = "Confirm New Password"
                                required
                                autofocus
                                />
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary">Save changes</button>
                    </div>
                    </div>
                </div>
            </div>
       
       
    </div>
</template>


<script>
export default {
    
}
</script>


<style scoped>

.form-control {
    padding: 1rem 1rem;
    border: 1px solid #007bff;
    margin: 1rem 1rem 1rem 1rem;
    width: 90%;

}


</style>