import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const orderList = (a, b) => a.title.toLowerCase() > b.title.toLowerCase()

export default new Vuex.Store({
  state: {
    pageList: [],
    pageActive: {}
  },

  mutations: {
    setPageList (state, list) {
      state.pageList = list.sort(orderList)
    },
    setActivePage (state, item) {
      state.pageActive = item
    },
    pageListAdd (state, item) {
      const list = [...state.pageList];
      list.push(item)
      state.pageList = list.sort(orderList)
    }
  },

  getters: {
    pageList (state) {
      return state.pageList
    },
    pageActive (state) {
      return state.pageActive
    }
  },

  actions: {
    pageLoadList(context) {
      return fetch('http://localhost:3000/pages', {
        mode: 'cors'
      })
        .then(response => response.json())
        .then(response => {
          context.commit('setPageList', response.pages)
        })
    },
    pageCreate(context, item) {
      return fetch('http://localhost:3000/pages', {
        headers: {
          'Content-Type': 'application/json'
        },
        mode: 'cors',
        method: 'POST',
        body: JSON.stringify(item)
      })
        .then(response => response.json())
        .then(response => {
          console.log(response)
          context.commit('pageListAdd', response)
        })
    },
    pageLoadItem(context, path) {
      return fetch(`http://localhost:3000/pages/${path}`, {
        mode: 'cors'
      })
        .then(response => response.json())
        .then(response => {
          context.commit('setActivePage', response)
        })
    }
  },
});
