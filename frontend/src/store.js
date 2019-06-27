import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const orderList = (a, b) => a.title.toLowerCase() > b.title.toLowerCase()

let count = 0;
const getLastFolderInPath = path => {
  return path.split(".").pop()
}

const getFolderInLocation = (list, location) => {
  const parts = location.split(/\./g);
  const folder = parts.shift();
  const fetchFolder = list.find(item => {
    return getLastFolderInPath(item.location) == folder
  });
  if (!parts.length) return fetchFolder
  const newLocation = parts.join(".")
  return getFolderInLocation(fetchFolder.childreen, newLocation)
}

const updateFolderInList = (list, folder) => {
  const parts = folder.location.split(/\./g);
  const folderName = parts.shift();
  const fetchFolder = list.find(item => {
    return getLastFolderInPath(item.location) == folderName
  });
  if (!parts.length) return fetchFolder
  const newLocation = parts.join(".")
  return getFolderInLocation(fetchFolder.childreen, newLocation)
}

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
    },
    pageListAddInFolder (state, {folder, pages}) {
      const list = [...state.pageList];
      const findedFolder = getFolderInLocation(list, folder.location)
      console.log(findedFolder)
      findedFolder.childreen = pages
      console.log(findedFolder)
      state.pageList = list
    },
    pageFolderOpen (state, folder) {
      const list = [...state.pageList];
      const findedFolder = getFolderInLocation(list, folder.location)
      findedFolder.isOpened = true
      console.log(list)
      state.pageList = list
    },
    pageCloseFolder (state, folder) {
      const list = [...state.pageList];
      const folderIndex = list.findIndex(item => item.location == folder.location);
      list[folderIndex].isOpened = false
      state.pageList = list
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
    pageLoadList (context) {
      return fetch('http://localhost:3000/pages', {
        mode: 'cors'
      })
        .then(response => response.json())
        .then(response => {
          context.commit('setPageList', response.pages)
        })
    },
    pageLoadFolder (context, folder) {
      return fetch(`http://localhost:3000/pages/folder/${folder.location}`, {
        mode: 'cors'
      })
        .then(response => response.json())
        .then(response => {
          console.log(folder, response.page)
          context.commit('pageListAddInFolder', {
            folder,
            pages: response.pages
          })
          context.commit('pageFolderOpen', folder)
        })
    },
    pageCreate (context, item) {
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
          context.commit('pageListAdd', response)
        })
    },
    pageLoadItem (context, path) {
      return fetch(`http://localhost:3000/pages/${path}`, {
        mode: 'cors'
      })
        .then(response => response.json())
        .then(response => {
          context.commit('setActivePage', response)
        })
    },
    pageCloseFolder (context, folder) {
      context.commit('pageCloseFolder', folder)
    }
  },
});
