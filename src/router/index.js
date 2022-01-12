import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import EmpresasTable from '../views/EmpresasTable'
import EmpresasView from '../views/EmpresasView'
import OfertaForm from '../views/OfertaForm'
import OfertasTable from '../views/OfertasTable'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/empresas',
    name: 'Empresas',
    component: EmpresasTable
  },
  {
    path: '/empresas/:id',
    name: 'EmpresasView',
    component: EmpresasView,
    props: true
  },
  {
    path: '/ofertas/:empresa',
    name: 'Ofertas',
    component: OfertasTable,
    props: true
  },
  {
    path: '/new',
    name: 'NuevaOferta',
    component: OfertaForm
  },
  {
    path: '/editarOferta/:oferta',
    name: 'EditarOferta',
    component: OfertaForm,
    props: true
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
