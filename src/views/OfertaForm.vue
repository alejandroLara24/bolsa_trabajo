<template>
  <div class="m-0 row justify-content-center">
    <div class="col-sm-6 col-md-4 col-lg-4">
      <ValidationObserver v-slot="{ handleSubmit }">
        <form @reset="cancelar" @submit.prevent="handleSubmit(anyadirOferta)" novalidate>
          <fieldset>
            <legend>{{ edit ? "Editar" : "Nuevo" }} oferta</legend>
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
            <ValidationProvider
              rules="seleccionar"
              v-slot="{ errors }"
              class="form-group"
            >
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
              <span class="error">{{ errors[0] }}</span>
            </ValidationProvider>
            <ValidationProvider
              rules="required|min:10|max:50"
              v-slot="{ errors }"
              class="form-group"
            >
              <label>Nombre:</label>
              <input
                type="text"
                class="form-control"
                v-model="nuevaOferta.nombre"
                name="Nombre"
                required
              />
              <span class="error">{{ errors[0] }}</span>
            </ValidationProvider>
            <ValidationProvider
              rules="required"
              v-slot="{ errors }"
              class="form-group"
            >
              <label>Contrato:</label>
              <input
                type="text"
                class="form-control"
                name="Contrato"
                v-model="nuevaOferta.contrato"
              />
              <span class="error">{{ errors[0] }}</span>
            </ValidationProvider>
            <ValidationProvider
              rules="required"
              v-slot="{ errors }"
              class="form-group"
            >
              <label>Contacto:</label>
              <input
                type="text"
                class="form-control"
                name="Contacto"
                v-model="nuevaOferta.contacto"
              />
              <span class="error">{{ errors[0] }}</span>
            </ValidationProvider>
            <ValidationProvider
              rules="required|email"
              v-slot="{ errors }"
              class="form-group"
            >
              <label>Email:</label>
              <input
                type="email"
                class="form-control"
                name="Email"
                v-model="nuevaOferta.email"
              />
              <span class="error">{{ errors[0] }}</span>
            </ValidationProvider>
            <button
              type="submit"
              class="btn btn-default btn-primary"
            >
              {{ edit ? "Editar" : "Añadir" }}
            </button>
            <button type="reset" class="btn btn-danger">Cancelar</button>
          </fieldset>
        </form>
      </ValidationObserver>
    </div>
  </div>
</template>

<script>
import api from "../API";
import { ValidationProvider, ValidationObserver } from "vee-validate";
import { extend, localize } from "vee-validate";
import es from "vee-validate/dist/locale/es.json";

localize("es", es);

import { required, email, min, max } from "vee-validate/dist/rules";

extend("required", required);
extend("seleccionar", {
  ...required,
  message: "Debes seleccionar una empresa",
});
extend("email", email);
extend("min", {
  ...min,
  params: ["length"],
  message: `El campo {_field_} debe tener al menos {length} caracteres`,
});
extend("max", {
  ...max,
  params: ["length"],
  message: `El campo {_field_} debe tener al menos {length} caracteres`,
});

export default {
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  props: ["oferta"],
  data() {
    return {
      nuevaOferta: {},
      empresas: {},
      edit: false,
    };
  },
  mounted() {
    this.refreshPage();
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
      this.nuevaOferta = {};
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

<style>
.error {
  color: red;
  display: block;
}
</style>