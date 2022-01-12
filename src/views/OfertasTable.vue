<template>
  <div class="m-0 row justify-content-center">
    <h1>Listado de ofertas de la empresa {{ empresa }}</h1>
    <table class="table table-striped">
      <thead>
        <th>Id</th>
        <th>Empresa</th>
        <th>Nombre</th>
        <th>Contrato</th>
        <th>Contacto</th>
        <th>Email</th>
        <th>Acciones</th>
      </thead>
      <tbody>
        <oferta-row
          v-for="oferta in ofertas"
          :key="oferta.id"
          :oferta="oferta"
          @deloferta="delOferta"
        ></oferta-row>
      </tbody>
    </table>
    <div class="col text-center">
      <button class="btn btn-primary" @click="nuevaOferta">Nueva Oferta</button>
    </div>
  </div>
</template>

<script>
import api from "../API";
import OfertaRow from "../components/OfertaRow.vue";

export default {
  components: { OfertaRow },

  props: ["empresa"],
  data() {
    return {
      nombreEmpresa: "",
      ofertas: [],
    };
  },
  mounted() {
    this.cargarOfertas();
  },
  methods: {
    cargarOfertas() {
      api.ofertas
        .getAll(this.empresa)
        .then((response) => (this.ofertas = response.data))
        .catch((err) => alert(err));
    },
    delOferta(datos) {
      if (
        confirm(
          `Vas a eliminar la siguiente oferta:\n ID: ${datos.oferta.id}\n Nombre: ${datos.oferta.nombre}`
        )
      )
        api.ofertas
          .delete(datos.oferta.id)
          .then(() => {
            let posicion = this.ofertas.findIndex(
              (oferta) => oferta.id == datos.oferta.id
            );
            this.ofertas.splice(posicion);
            alert(
              `Ya se ha borrado la oferta:\n ID: ${datos.oferta.id}\n Nombre:${datos.oferta.nombre}\n`
            );
          })
          .catch((error) => alert(error));
    },
    nuevaOferta() {
      this.$router.push(`/new`);
    },
  },
};
</script>