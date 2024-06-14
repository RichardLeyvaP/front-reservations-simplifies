// src/router/index.js
import Vue from 'vue';
import Router from 'vue-router';
import Reserve from '@/components/Reserve.vue';

Vue.use(Router);

const routes = [
  {
    path: '/',
    name: 'Reserve',
    component: Reserve,
  },
];

const router = new Router({
  mode: 'history',
  routes,
});

export default router;