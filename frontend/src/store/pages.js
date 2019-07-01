import Api from "../common/Api"

export default {
  namespaced: true,

  state: {
    list: {},
    pageActive: {},
  },

  mutations: {
    setList(state, list) {
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
    async listLoad(context) {
      const response = await Api.get('pages')
      context.commit('setList', response.body);
      return response
    },
    async folderLoad(context, folder) {
      const response = await Api.get(`/pages/folder/${folder.title}`)
      context.commit('listAddInFolder', {
        folder,
        pages: response,
      });
      context.commit('folderOpen', folder);
      return response
    },
    async create(context, item) {
      const response = await Api.post('pages', item)
      context.commit('listAdd', response.body);
      return response
    },
    async loadItem(context, path) {
      const response = await Api.get(`pages/${path}`)
      context.commit('setActivePage', response.body);
      return response
    },
    folderClose(context, folder) {
      context.commit('folderClose', folder);
    },
  },
};
