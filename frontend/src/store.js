import Vue from "vue";
import Vuex from "vuex";
import axios from 'axios'

Vue.use(Vuex);

export default new Vuex.Store({

  state: {

    HOST: 'http://127.0.0.1:8000',
    DOMAIN: window.location.protocol + '//' + window.location.hostname + ':' + window.location.port

  },

  mutations: {

    
  },

  actions: {


  }

});
