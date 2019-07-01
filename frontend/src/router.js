import Vue from 'vue';
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
      name: 'Login',
      component: () => import('./views/Login'),
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
