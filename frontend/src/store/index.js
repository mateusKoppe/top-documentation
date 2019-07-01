import Vue from 'vue';
import Vuex from 'vuex';

import user from './user'
import pages from './pages'

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    pages,
    user
  }
});
