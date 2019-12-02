<template>
  <div id="main-container" class="container">
    <div class="row">
    <div class="col-md-6" style="margin-top:2rem">
      <h1 style="color:green"> Transform your Agricultural Landscape using Data</h1>
      <p> Agriworks enables researchers, policymakers, and common citizens to explore and act on agricultural data in an effort to better their local communities.</p>
      <div class="inline-row">
      <button class="btn btn-lg btn-success"> Sign Up </button>
      </div>
    </div>
    <div class="col-md-6">
      <div class="custom-card">
            <div class="custom-card-top">
            <p> Make An Impact Together </p> </div>
            <p> <fa-icon icon="search" size ="lg"/> <strong> Researchers: </strong> <br> Browse and manipulate datasets </p>
            <p> <fa-icon icon="balance-scale" size="lg"/>  <strong> Policy Makers: </strong>  <br> Make informed decisions </p>
            <p> <fa-icon icon="gem" size="lg"/> <strong> Citizens: </strong> <br> Be the change in your community </p>
      </div>
  </div>
  </div>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: "Home",
  components: {
    
  }
};
</script>

<style scoped>
#main-container {
  margin-top: 7%;  
}

#header {
  display: none;
}

.custom-card {
  border: 2px solid #192e7af5;
  border-radius: 10px;
  width: 90%;
  margin-left: 15%;
  min-height: fit-content;
  padding-bottom: 2rem;
}

.custom-card-top {
  background-color: #080755;
  height: 50px;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  margin-bottom: 2rem;
  color: white;
  padding: 0.5rem;
  font-weight: bold;
  font-size: 20px;
}

</style>