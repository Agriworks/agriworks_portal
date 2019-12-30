<template>
  <div class="container">
    <div class="top-slim-bar"></div>
    <div class="bottom-body">
      <div class="picture"></div>
      <div class="right-body">
        <div class="features">
          <h1> {{ dataset.name }} </h1> 
          <h2> {{ dataset.type }} </h2>
          <p> {{ dataset.author }} </p>
        </div>
        <button class="btn btn-primary">Open</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "IndividualDataset",
  props: ["dataset"]
};
</script>
<style scoped>
div {
  padding: 0;
  margin: 0;
}
.top-slim-bar {
  margin: 0;
  width: 100%;
  height: 3%;
  background-color: #11c7f5;
}
.container {
  display: flex;
  flex-direction: column;
  height: 20rem;
  width: 35.5rem;
  background-color: #d9f7ff;
  margin-bottom: 1rem;
  margin-right: 1rem;
}
.picture {
  margin-top: 1rem;
  margin-right: 1rem;

  left: 0;
  width: 50%;
  height: 100%;
  background-image: url("../../public/images/logo.png");
}
.bottom-body {
  display: flex;
  width: 100%;
}
.features {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 3rem;
  margin-left: 3rem;
  padding: 0;
}
.btn {
  margin-top: 4rem;
  margin-left: 3rem;
  width: 50%;
  align-self: center;
}
.right-body {
  display: flex;
  flex-direction: column;
}
.individual-feature {
  padding: 0.3rem;
}
</style>