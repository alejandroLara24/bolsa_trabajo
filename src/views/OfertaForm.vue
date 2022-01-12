<template>
  <div class="m-0 row justify-content-center">
    <div class="col-sm-6 col-md-4 col-lg-4">
      <!-- @submit.prevent="" -->
      <form @reset="cancelar" @submit.prevent="anyadirOferta" novalidate>
        <fieldset>
          <legend>{{ this.edit ? "Editar" : "Nuevo" }} oferta</legend>
          <!-- Aquí los inputs y botones del form -->
          <div v-show="edit" class="form-group">
            <label>ID:</label>
            <input
              type="text"
              class="form-control"
              v-model.number="nuevaOferta.id"
              disabled
            />
          </div>
          <div class="form-group">
            <label>Empresa:</label>
            <select
              class="form-select"
              name="empresas"
              v-model="nuevaOferta.empresa"
            >
              <option value="" disabled selected>
                --- Selecciona empresa ---
              </option>
              <option
                v-for="empresa in empresas"
                :key="empresa.id"
                v-bind:value="empresa.id"
              >
                {{ empresa.nombre }}
              </option>
            </select>
            <span class="error"></span>
          </div>
          <div class="form-group">
            <label>Nombre:</label>
            <input
              type="text"
              class="form-control"
              v-model="nuevaOferta.nombre"
              required
            />
            <span class="error"></span>
          </div>
          <div class="form-group">
            <label>Contrato:</label>
            <input
              type="text"
              class="form-control"
              v-model="nuevaOferta.contrato"
            />
            <span class="error"></span>
          </div>
          <div class="form-group">
            <label>Contacto:</label>
            <input
              type="text"
              class="form-control"
              required
              v-model="nuevaOferta.contacto"
            />
            <span class="error"></span>
          </div>
          <div class="form-group">
            <label>Email:</label>
            <input
              type="text"
              class="form-control"
              required
              v-model="nuevaOferta.email"
            />
            <span class="error"></span>
          </div>
          <button type="submit" class="btn btn-default btn-primary">
            {{ this.edit ? "Editar" : "Añadir" }}
          </button>
          <button type="reset" class="btn btn-danger">Cancelar</button>
        </fieldset>
      </form>
    </div>
  </div>
</template>

<script>
import api from "../API";

export default {
  props: ["oferta"],
  data() {
    return {
      nuevaOferta: {},
      empresas: {},
      edit: false,
    };
  },
  mounted() {
    this.refreshPage()
  },
  methods: {
    cargarOferta() {
      api.ofertas
        .getOne(this.oferta)
        .then((response) => (this.nuevaOferta = response.data))
        .catch((err) => alert(err));
    },
    cargarEmpresas() {
      api.empresas
        .getAll()
        .then((response) => (this.empresas = response.data))
        .catch((err) => alert(err));
    },
    refreshPage() {
      this.nuevaOferta = {}
      this.cargarEmpresas();
      if (this.oferta) {
        this.edit = true;
        this.cargarOferta();
      }
    },
    anyadirOferta() {
      if (this.edit) {
        api.ofertas
          .modify(this.nuevaOferta)
          .then(() => {
            alert("Se ha modificado el producto");
            this.nuevaOferta = {};
            this.$router.push("/");
          })
          .catch((err) => alert(err));
      } else {
        api.ofertas
          .create(this.nuevaOferta)
          .then(() => {
            alert("Se añadio el producto");
            this.newProduct = {};
            this.$router.push("/");
          })
          .catch((err) => alert(err));
      }
    },
    cancelar() {
      this.$router.push(`/empresas`);
    },
  },
  watch: {
    $route: "refreshPage",
  },
};
</script>