import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import calendario_medicos from './views/calendario_medicos.vue'
import calendario_pacientes from './views/calendario_pacientes.vue'
import Medicos from './views/Medicos.vue'
import Cms from './views/Cms.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/calendario_medicos',
      name: 'calendario_medicos',
      component: calendario_medicos
    },
    {
      path: '/calendario_pacientes',
      name: 'calendario_pacientes',
      component: calendario_pacientes
    },
    {
      path: '/Medicos',
      name: 'Medicos',
      component: Medicos
    },
    {
      path: '/Cms',
      name: 'Cms',
      component: Cms
    }
  ],
  mode: 'history'
})
