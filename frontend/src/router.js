import Vue from 'vue';
import Store from './store/index'
import Router from 'vue-router';
import Home from './views/Home';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/login',
      name: 'UserLogin',
      async beforeEnter(to, from, next) {
        const user = await Store.dispatch('user/loadUser')
        console.log(user)
        if (!user) next()
      },
      component: () => import('./views/UserLogin'),
    },
    {
      path: '/pages/create',
      name: 'PageCreate',
      component: () => import('./views/PageCreate'),
    },
    {
      path: '/pages/:path',
      name: 'PageContent',
      component: () => import('./views/PageContent'),
    },
  ],
});
