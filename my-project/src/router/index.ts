import Vue from 'vue';
import NProgress from 'nprogress';
import Router from 'vue-router';
import 'nprogress/nprogress.css';
import Routes from './router';

const Progress:any = NProgress;
Vue.use(Progress);
Vue.use(Router);

/**
 * 路由拦截
 */
Routes.beforeEach(async (to:Object,form:object,next:Function)=>{
    // 进度条开启
    NProgress.start()
    next()
})

Routes.afterEach((to:Object)=>{
    // 进度条关闭
    NProgress.done()
})

export default Routes