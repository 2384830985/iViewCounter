import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/views/login';
import Layout from '@/layout/layout.vue';
import {Route} from 'vue-router'
Vue.use(Router);

const redirect = { redirect: '/content' };// 重定向

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
        path: '/redirect/:route*',
        name: 'redirect',
        hidden: true,
        component: () => import('@/components/redirect/index.vue'),
    }
];
/**
 * 折线图
 */
const chartsList = [
    {
        path: '/charts',
        name: 'charts',
        component: Layout,
        meta: {
            title: 'charts',
            name: '图表'
        },
        children:[
            {
                path     : 'basics',
                name     : 'basics',
                meta: {
                    title: 'basics',
                    name: '基础折线图',
                },
                component: () => import('@/views/chart/basics/index.vue'),
            },
            {
                path     : 'doubleBroken',
                name     : 'doubleBroken',
                meta: {
                    title: 'doubleBroken',
                    name: '基础折线图',
                },
                component: () => import('@/views/chart/doubleBroken/index.vue'),
            },
        ]
    }
]
/**
 * 主框架
 * @type {{path: string; name: string; component: Layout}[]}
 */
export const content = [
    {
        path     : '/content',
        name     : 'Layout',
        component: Layout,
        meta: {
            title: 'home',
            name: '首页'
        },
        children: [
            {
                path     : 'buttons',
                name     : 'buttons',
                meta: {
                    title: 'buttons',
                    name: '按钮'
                },
                component: () => import('@/views/button/index.vue'),
            },
            {
                path     : 'radios',
                name     : 'radios',
                meta: {
                    title: 'radios',
                    name: '单选框',
                },
                component: () => import('@/views/radio/index.vue'),
            },
        ]
    }
]
export default new Router({
  // mode  : 'history',
  // base  : process.env.BASE_URL,

  routes: [
    {
        path     : '/',
        redirect: '/content'
    },
    ...refreshing,
    ...frameOut,
    ...content,
    ...chartsList,
  ],
});
