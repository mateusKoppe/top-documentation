import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const orderList = (a, b) => a.title.toLowerCase() > b.title.toLowerCase();

export default new Vuex.Store({
  state: {
    pageList: {},
    pageActive: {},
  },

  mutations: {
    setPageList(state, list) {
      state.pageList = list;
    },
    setActivePage(state, item) {
      state.pageActive = item;
    },
    pageListAdd(state, item) {
      const list = [...state.pageList];
      list.push(item);
      state.pageList = list;
    },
    pageListAddInFolder(state, { folder, pages }) {
      const list = [...state.pageList];
      const folderIndex = list.findIndex(item => item.title == folder.title);
      list[folderIndex].childreen = pages;
      state.pageList = list;
    },
    pageFolderOpen(state, folder) {
      const list = [...state.pageList];
      const folderIndex = list.findIndex(item => item.title == folder.title);
      list[folderIndex].isOpened = true;
      state.pageList = list;
    },
    pageCloseFolder(state, folder) {
      const list = [...state.pageList];
      const folderIndex = list.findIndex(item => item.title == folder.title);
      list[folderIndex].isOpened = false;
      state.pageList = list;
    },
  },

  getters: {
    pageList(state) {
      return state.pageList;
    },
    pageActive(state) {
      return state.pageActive;
    },
  },

  actions: {
    pageLoadList(context) {
      return fetch('http://localhost:3000/pages', {
        mode: 'cors',
      })
        .then(response => response.json())
        .then((response) => {
          context.commit('setPageList', response);
        });
    },
    pageLoadFolder(context, folder) {
      return fetch(`http://localhost:3000/pages/folder/${folder.title}`, {
        mode: 'cors',
      })
        .then(response => response.json())
        .then((response) => {
          context.commit('pageListAddInFolder', {
            folder,
            pages: response,
          });
          context.commit('pageFolderOpen', folder);
        });
    },
    pageCreate(context, item) {
      return fetch('http://localhost:3000/pages', {
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'cors',
        method: 'POST',
        body: JSON.stringify(item),
      })
        .then(response => response.json())
        .then((response) => {
          context.commit('pageListAdd', response);
        });
    },
    pageLoadItem(context, path) {
      return fetch(`http://localhost:3000/pages/${path}`, {
        mode: 'cors',
      })
        .then(response => response.json())
        .then((response) => {
          context.commit('setActivePage', response);
        });
    },
    pageCloseFolder(context, folder) {
      context.commit('pageCloseFolder', folder);
    },
  },
});
