import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/views/login';
import Layout from '@/layout/layout.vue';
import {Route} from 'vue-router'
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
const refreshing = [
    // 刷新页面 必须保留
    {
        path: '/refresh',
        name: 'refresh',
        hidden: true,
        component: {
            beforeRouteEnter (to:Route, from:Route, next:Function) {
                next((vm:any) => vm.$router.replace(from.fullPath))
            },
            render: (h:any) => h()
        }
    },
    // 页面重定向 必须保留
    {
        path: '/redirect/:route',
        name: 'redirect',
        hidden: true,
        component: {
            beforeRouteUpdate (to:Route, from:Route, next:Function) {
                next((vm:any) => vm.$router.replace(from.params.route))
            },
            render: (h:any) => h()
        }
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
        component: Layout,
        children: [

        ]
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
    ...refreshing,
    ...frameOut,
    ...content
  ],
});
