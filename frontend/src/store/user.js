import Api from "../common/Api"

export default {
  namespaced: true,

  state: {
    logged: {}
  },

  mutations: {
    setLogged(state, user) {
      state.logged = user
    }
  },

  getters: {
    logged(state) {
      return state.logged
    }
  },

  actions: {
    async login({ commit }, user) {
      const response = await Api.post('/user/login', user)
      const data = {
        status: response.status
      }
      if (!response.bodyUsed) return data
      data.body = await response.json()
      commit('setLogged', body)
      localStorage.setItem('token', body.token)
      return data
    }
  },
};
