<template>
  <NavBar />
  <router-view :key="$route.fullPath" />
</template>

<script>
//app.vue
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap';
import NavBar from "./components/NavBar";

export default {
  name: "App",
  components: {
    NavBar,
  }
}
</script>

<style>
</style>
