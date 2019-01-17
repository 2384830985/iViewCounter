import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/views/login';
import Layout from '@/layout/layout.vue';

Vue.use(Router);
/**
 * 在主框架之外显示
 */
const frameOut = [
  // 登录
  {
      path     : '/login',
      name     : 'Login',
      component: Login
  }
];
/**
 * 主框架
 * @type {{path: string; name: string; component: Layout}[]}
 */
const content = [
    {
        path     : '/content',
        name     : 'Layout',
        component: Layout
    }
]
export default new Router({
  // mode  : 'history',
  // base  : process.env.BASE_URL,

  routes: [
    {
      path     : '/',
      name     : 'login',
      component: Login,
    },
    ...frameOut,
    ...content
  ],
});
