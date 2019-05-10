import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import {store} from './store'
import * as firebase from 'firebase'
import './registerServiceWorker'

Vue.use(Vuetify,{
    theme:{
        primary: '#1976D2',
        secondary: '#424242',
        accent: '#82B1FF',
        error: '#FF5252',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FFC107'
    }
}),

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
  created(){
    firebase.initializeApp({
      apiKey: "AIzaSyCdvs5C8J_t9WPQlcZGuuLJ57hwM9_s9BQ",
      authDomain: "prosaude-36f66.firebaseapp.com",
      databaseURL: "https://prosaude-36f66.firebaseio.com",
      projectId: "prosaude-36f66",
      storageBucket: "prosaude-36f66.appspot.com",
      messagingSenderId: "86942539576"
    })
  }
}).$mount('#app')