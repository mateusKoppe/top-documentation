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
      const response = await Api.post('user/login', user)
      commit('setLogged', body)
      localStorage.setItem('token', response.body.token)
      return data
    },
    async loadUser({ commit }) {
      const token = localStorage.getItem('token')
      if (!token) return false
      console.log(`user/byToken/${token}`)
      const response = await Api.get(`user/byToken/${token}`);
      switch (response.status) {
        case 200:
          commit('setLogged', response.body)
          return true

        case 404:
          localStorage.removeItem('token')
          return false
      }
    }
  },
};
