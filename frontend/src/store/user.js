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
      commit('setLogged', body)
      localStorage.setItem('token', response.body.token)
      return data
    }
  },
};
