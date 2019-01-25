import Vue from 'vue';
import Router from 'vue-router';
import Routes from './router';
import iView from 'iview';
Vue.use(Router);

/**
 * 路由拦截
 */
Routes.beforeEach(async (to:Object,form:object,next:Function)=>{
    // 进度条开启
    iView.LoadingBar.start();
    next()
})

Routes.afterEach((to:Object)=>{
    // 进度条关闭
    iView.LoadingBar.finish();
})

export default Routes