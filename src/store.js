import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'
import { stat } from 'fs';
import VuexPersistence from 'vuex-persist'


Vue.use(Vuex)

const vuexLocal = new VuexPersistence({
    storage: window.localStorage
})

export const store = new Vuex.Store({
  plugins: [vuexLocal.plugin],
  state: {
    medicos: []
  },
  mutations: {
    clear_medicos(state){
      state.medicos = []
    },

    add_medico(state, payload){
      state.medicos.push( {... payload})      
    }
  },
  actions: {
      getMedicos({commit}){
        firebase.database().ref('/medicos').once('value').then(function(snapshot) {
          commit('clear_medicos')
          var obj = snapshot.val();
          for (const key in obj) {
            commit('add_medico',{
              id: key,
              ...
              obj[key],

            })
          }
        });
      }
  },
  getters:{
    get_especialidades(state){
      var especialidades = []
      especialidades.ind
      state.medicos.forEach(element => {
        for (const key in element.especialidades) {
          especialidades.push({text: key})
        }
      });
      return especialidades;
    },
    get_MedicosbyEspecialidade: (state) => (especialidade) => {
      var nome_medicos = []
      state.medicos.forEach(element => {
        var tem = false
        for (const key in element.especialidades) {
          if(key == especialidade){
            tem = true
            break;
          }
        }
        if(tem){
          nome_medicos.push(element.nome)
        }
      });

      return nome_medicos;
    },

    get_Datas: (state) => (args) => {
      var datas = []
      console.log(args.medico)
      state.medicos.forEach( element => {
        if(element.nome == args.medico){
          for(const key in element.especialidades){
            if(key == args.especialidade){
              for(const key2 in element.especialidades[key].consultas){
                datas.push(element.especialidades[key].consultas[key2].data_inicial.split('T')[0])
              }
            }
          }
        }
      })

      return datas
    } 
  }
})
