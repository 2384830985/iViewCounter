import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'

Vue.use(Router);
export default new Router({
    routes: [{
        path: '/',
        name: 'Home',
        component: Home,
        children: [
            {
                path: '/home/activityList',
                name: 'activityList',
                component: () => import('@/components/comActivity/activityList'),
            },
            {
                path: '/home/activityAdd',
                name: 'activityAdd',
                component: () => import('@/components/comActivity/activityAdd')
            },
            {
                path: '/home/coachList',
                name: 'coachList',
                component: () => import('@/components/comCoach/coachList')
            },
            {
                path: '/home/coachAdd',
                name: 'coachAdd',
                component: () => import('@/components/comCoach/coachAdd')
            },
            {
                path: '/home/articleList',
                name: 'articleList',
                component: () => import('@/components/comArticle/articleList')
            },
            {
                path: '/home/articleAdd',
                name: 'articleAdd',
                component: () => import('@/components/comArticle/articleAdd')
            },
        ]
    }]
})