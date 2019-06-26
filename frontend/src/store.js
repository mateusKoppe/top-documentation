import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    pageList: []
  },
  mutations: {
    setPageList (state, list) {
      state.pageList = list
    }
  },
  getters: {
    pageList (state) {
      return state.pageList
    }
  },
  actions: {
    loadPageList(context) {
      fetch('http://localhost:3000/pages', {
        mode: 'cors'
      })
        .then(response => response.json())
        .then(response => {
          context.commit('setPageList', response)
        })
    }
  },
});
