export default {
  namespaced: true,

  state: {
    list: {},
    pageActive: {},
  },

  mutations: {
    setlist(state, list) {
      state.list = list;
    },
    setActivePage(state, item) {
      state.pageActive = item;
    },
    listAdd(state, item) {
      const list = [...state.list];
      list.push(item);
      state.list = list;
    },
    listAddInFolder(state, { folder, pages }) {
      const list = [...state.list];
      const folderIndex = list.findIndex(item => item.title == folder.title);
      list[folderIndex].childreen = pages;
      state.list = list;
    },
    folderOpen(state, folder) {
      const list = [...state.list];
      const folderIndex = list.findIndex(item => item.title == folder.title);
      list[folderIndex].isOpened = true;
      state.list = list;
    },
    folderClose(state, folder) {
      const list = [...state.list];
      const folderIndex = list.findIndex(item => item.title == folder.title);
      list[folderIndex].isOpened = false;
      state.list = list;
    },
  },

  getters: {
    list(state) {
      return state.list;
    },
    pageActive(state) {
      return state.pageActive;
    },
  },

  actions: {
    listLoad(context) {
      return fetch('http://localhost:3000/pages', {
        mode: 'cors',
      })
        .then(response => response.json())
        .then((response) => {
          context.commit('setlist', response);
        });
    },
    folderLoad(context, folder) {
      return fetch(`http://localhost:3000/pages/folder/${folder.title}`, {
        mode: 'cors',
      })
        .then(response => response.json())
        .then((response) => {
          context.commit('listAddInFolder', {
            folder,
            pages: response,
          });
          context.commit('folderOpen', folder);
        });
    },
    create(context, item) {
      console.log(item)
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
          context.commit('listAdd', response);
        });
    },
    loadItem(context, path) {
      return fetch(`http://localhost:3000/pages/${path}`, {
        mode: 'cors',
      })
        .then(response => response.json())
        .then((response) => {
          context.commit('setActivePage', response);
        });
    },
    folderClose(context, folder) {
      context.commit('folderClose', folder);
    },
  },
};
