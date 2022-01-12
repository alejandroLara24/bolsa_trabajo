import Vue from 'vue'
import Vuex from 'vuex'
import api from '../API'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    empresas: [],
    ofertas: []
  },
  mutations: {
    loadEmpresas(state, payload) {
      state.empresas = payload
    }
  },
  actions: {
    loadEmpresas(context) {
      api.empresas.getAll()
        .then((response) => context.state.empresas = response.data)
        .catch((error) => alert(error))
    }
  },
  modules: {
  }
})
