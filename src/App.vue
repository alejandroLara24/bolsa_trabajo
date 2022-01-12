<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Bienvenida</router-link> |
      <router-link to="/empresas">Empresas</router-link> |
      <router-link to="/new">Nueva oferta</router-link> |
      <router-link to="/about">Acerca de</router-link>
    </div>
    <router-view />
    <footer>Alejandro Lara</footer>
  </div>
</template>

<script>
export default {
  mounted() {
    this.$store.dispatch("loadEmpresas");
  },
};
</script>

<style>
@import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.7.2/font/bootstrap-icons.css");
</style>
