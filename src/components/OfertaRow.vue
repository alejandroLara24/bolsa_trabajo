<template>
  <tr>
    <td>{{ oferta.id }}</td>
    <td>{{ nombreEmpresa }}</td>
    <td>{{ oferta.nombre }}</td>
    <td>{{ oferta.contrato }}</td>
    <td>{{ oferta.contacto }}</td>
    <td>{{ oferta.email }}</td>
    <td>
      <button @click="editarOferta">
        <i class="bi bi-pencil"></i>
      </button>
      <button @click="delOferta">
        <i class="bi bi-trash"></i>
      </button>
      <button @click="verEmpresa">
        <i class="bi bi-building"></i>
      </button>
    </td>
  </tr>
</template>

<script>
export default {
  name: "oferta-row",
  props: ["oferta"],
  data() {
    return {
      nombreEmpresa: "",
    };
  },
  mounted() {
    this.cargarNombreEmpresa();
  },
  methods: {
    editarOferta() {
      this.$router.push(`/editarOferta/${this.oferta.id}`);
    },
    delOferta() {
      this.$emit("deloferta", { oferta: this.oferta });
    },
    verEmpresa() {
      this.$router.push(`/empresas/${this.oferta.empresa}`);
    },
    cargarNombreEmpresa() {
      this.nombreEmpresa = this.$store.state.empresas.find(
        (empresa) => empresa.id == this.oferta.empresa
      ).nombre;
    },
  },
};
</script>