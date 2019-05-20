import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'
import VuexPersistence from 'vuex-persist'

Vue.use(Vuex)

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})

export const store = new Vuex.Store({
  plugins: [vuexLocal.plugin],
  state: {
    loadedProntuarios: [],
    medicos: [],
    pacientes: [],
    dados: [],
  },

  mutations: {
    clear_medicos(state){
      state.medicos = []
    },

    add_medico(state, payload){
      state.medicos.push( {... payload})
    },

    setDados(state, payload) {
      console.log('Passo 3')
      console.log(payload)
      state.dados = payload
    }
  },

  actions: {
    criarProntuario ({commit}, payload) {
      const prontuario = {
        exames: payload.exames,
        hipotesesDiagnosticas: payload.hipotesesDiagnosticas,
        diagnosticosDefinidos: payload.diagnosticosDefinidos,
        tratamentosEfetuados: payload.tratamentosEfetuados,
        data: payload.data,
      }
      firebase.database().ref('prontuario').push(prontuario)
          .then((data) => {
            console.log(data);
            commit ('criarProntuario', prontuario)
          })
          .catch((error) => {
            console.log(error)
          })
    },

    createMedicos({commit}, payload) {
      var ref = firebase.database().ref('/medicos');
      ref.child(payload.crm).set(payload)
    },

    loadDados ({commit}) {
      firebase.database().ref('medicos').once('value')
          .then((data) => {
            const medico = []
            console.log('Passo 1')
            console.log(data.val())
            const obj = data.val()
            for (let key in obj) {
              medico.push({
                nome: obj[key].nome,
                crm: obj[key].crm,
                especialidades: obj[key].especialidades
              })
            }
            console.log('Passo 2')
            console.log(medico)
            commit('setDados', medico)
          })
          .catch(
              (error) => {
                console.log(error)
                commit('setDados', false)
              }
          )
    },

    createPacientes({commit}, payload) {
      var ref = firebase.database().ref('/pacientes');
      ref.child(payload.cpf).set(payload)
    },

    addDatesTimeVacancy({commit}, payload){
      //var keyMed = {medico: payload.medicos}
      //var keyEspe = {especialidades: payload.especialidades}
      var infos={
        datas: payload.datas,
        horas: payload.horas,
        vagas: payload.vagas
      }

      console.log(infos)
      firebase.database().ref('/medicos/'+ payload.idMed + '/especialidades/' + payload.espMed +'/').child(payload.idMed).set(infos)

      for(const key in payload.datas){
        firebase.database().ref('/medicos/'+ payload.idMed + '/especialidades/' + payload.espMed +'/consultas').child(payload.idMed).set(
            {data_inicial:payload.datas[key] +'T'+ payload.horas})

      }
    },

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
    },

    agendarConsulta({commit},payload){
      const paciente = {
        nome: payload.nome,
        num_associado: payload.num_associado,
        status: payload.status,
        modalidade: payload.modalidade
      };
      firebase.database().ref(payload.path).push(paciente);
    }
  },

  getters:{
    dados (state) {
      console.log('Passo 5')
      console.log(state.dados)
      return state.dados
    },
    get_especialidades(state){
      var especialidades = []
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
    get_CRM: (state) => (args) => {
      var crm = ''
      state.medicos.forEach(element => {
        var tem = false
        for (const key in element.especialidades) {
          if(key == args.especialidade){
            tem = true
            break;
          }
        }
        if(tem && element.nome == args.medico){
          crm = element.id

        }
      });
      return crm;
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
    },
    get_Horas: (state) => (args) => {
      var timesOptions = []
      console.log(args.medico)
      state.medicos.forEach( element => {
        if(element.nome == args.medico){
          for(const key in element.especialidades){
            if(key == args.especialidade){
              for(const key2 in element.especialidades[key].consultas){
                //Condição que verifica também se já tem paciente a consulta. Caso tive, não aparecerá no calendário porque a consulta já está agendada
                if(element.especialidades[key].consultas[key2].data_inicial.split('T')[0] == args.data
                    && element.especialidades[key].consultas[key2].paciente == undefined){
                  timesOptions.push(element.especialidades[key].consultas[key2].data_inicial.split('T')[1])
                }
              }
            }
          }
        }
      })
      return timesOptions
    },
    get_Path_Cadastro_Cons: (state) => (args) => {
      var path = ''
      state.medicos.forEach( element => {
        if(element.nome == args.medico){
          for(const key in element.especialidades){
            if(key == args.especialidade){
              for(const key2 in element.especialidades[key].consultas){
                if(element.especialidades[key].consultas[key2].data_inicial.split('T')[0] == args.data
                    && element.especialidades[key].consultas[key2].data_inicial.split('T')[1] == args.hora){
                  path = '/medicos/' + element.id + '/especialidades/' + key + '/consultas/' + key2 + '/paciente'
                }
              }
            }
          }
        }
      })
      return path
    }
  }
})