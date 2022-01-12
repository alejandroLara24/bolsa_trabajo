<template>
  <div>
    <h1>Listado de empresas</h1>
    <table class="table table-striped">
      <thead>
        <th>Id</th>
        <th>Nombre</th>
        <th>Domicilio</th>
        <th>Localidad</th>
        <th>Contacto</th>
        <th>Email</th>
        <th>Acciones</th>
      </thead>
      <tbody>
        <tr v-for="empresa in empresas" :key="empresa.id">
          <td>{{ empresa.id }}</td>
          <td>{{ empresa.nombre }}</td>
          <td>{{ empresa.domicilio }}</td>
          <td>{{ empresa.localidad }}</td>
          <td>{{ empresa.contacto }}</td>
          <td>{{ empresa.email }}</td>
          <td>
            <button @click="verEmpresa(empresa.id)">
              <i class="bi bi-eye"></i>
            </button>
            <button @click="verOfertas(empresa.id)">
              <i class="bi bi-file-earmark-bar-graph"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  computed: {
    empresas() {
      return this.$store.state.empresas;
    },
  },
  methods: {
    verEmpresa(id) {
      this.$router.push(`/empresas/${id}`);
    },
    verOfertas(id) {
      this.$router.push(`/ofertas/${id}`);
    },
  },
};
</script>