<template>
    <div class="container"> 
        <div>
            <b-form @submit="onSubmit" @reset="onReset" v-if="show">
            <b-form-group
                id="input-group-1"
                label="First Name':"
                label-for="input-1"
            >
                <b-form-input
                id="input-1"
                v-model="form.firstName"
                required
                placeholder="Enter first name"
                ></b-form-input>
            </b-form-group>      
            
            <b-form-group
                id="input-group-1"
                label="Last Name:"
                label-for="input-1"
            >
                <b-form-input
                id="input-1"
                v-model="form.lastName"
                required
                placeholder="Enter last name"
                ></b-form-input>
            </b-form-group>

            <b-form-group
                id="input-group-1"
                label="Email address:"
                label-for="input-1"
            >
                <b-form-input
                id="input-1"
                v-model="form.email"
                type="email"
                required
                placeholder="Enter email"
                ></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-2" label="Your Password:" label-for="input-2">
                <b-form-input
                id="input-2"
                v-model="form.password"
                required
                placeholder="Enter password"
                ></b-form-input>
            </b-form-group>


            <b-button type="submit" variant="primary">Submit</b-button>
            <b-button type="reset" variant="danger">Reset</b-button>
            </b-form>
        </div>
    </div>
</template>

<script>
  export default {
    data() {
      return {
        form: {
            firstName: "", 
            lastName: "", 
            email: "",
            password: "", 
        }, 
        show: true
      }
    },
    methods: {
      onSubmit(evt) {
        evt.preventDefault()
      },
      onReset(evt) {
        evt.preventDefault()
        // Reset our form values
        this.form.email = ''
        this.form.name = ''
        this.form.food = null
        this.form.checked = []
        // Trick to reset/clear native browser form validation state
        this.show = false
        this.$nextTick(() => {
          this.show = true
        })
      }
    }
  }
</script>

<style scoped>

</style>