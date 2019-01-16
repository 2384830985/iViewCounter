import Vue from 'vue';
import { App }from './index';
import router from './router';
import store from './store';
// 核心插件
import Admin from '@/plugin/admin'

Vue.use(Admin,{ store })
new Vue({
    router,
    store,
    render: (h) => h(App),
    created() {

    },
    mounted() {
        // 展示系统信息
        // this.$store.commit('d2admin/releases/versionShow')
        // 用户登录后从数据库加载一系列的设置
        // this.$store.dispatch('d2admin/account/load')
        // 获取并记录用户 UA
        // this.$store.commit('d2admin/ua/get')
        // 初始化全屏监听
        // this.$store.dispatch('d2admin/fullscreen/listen')
    },
    watch: {
        // '$route.matched'(val) {
        //   let fullAside = this.$store.state.d2admin.menu.fullAside
        //   const _side = fullAside.filter(menu => menu.path === val[0].path)
        //   this.$store.commit('d2admin/menu/asideSet', _side.length > 0 ? _side[0].children : [])
        // }
    }
}).$mount('#app');
