import iView from 'iview';
import {Menu,Submenu,MenuItem,MenuItemGroup,Tooltip,Dropdown,DropdownMenu,DropdownItem} from 'element-ui'
import cookie from '@/libs/cookie.ts'
import 'iview/dist/styles/iview.css';
import 'element-ui/lib/theme-chalk/index.css';
import './../../my-theme/index.less'
import pluginOpen from '../open';
import VueParticles from 'vue-particles';
import TUI from '@/t-components/index.ts';
import log from '@/libs/util.log';
import Jump from '@/libs/overallSituation'
export default {
    async install(Vue:any,options:Object){
        // 设置为 false 以阻止 vue 在启动时生成生产提示。https://cn.vuejs.org/v2/api/#productionTip
        Vue.config.productionTip = false;
        // 当前环境
        Vue.prototype.$env = process.env.NODE_ENV;
        // 当前的 baseUrl
        Vue.prototype.$baseUrl = process.env.BASE_URL;
        // console.log
        Vue.prototype.$log = log;
        // 全局公共方法
        Vue.prototype.$Jump = Jump;
        // iView
        Vue.use(iView, {
            size: cookie.get('size')|| '',
        })
        // 引入插件
        Vue.use(pluginOpen)
        // 粒子特效
        Vue.use(VueParticles)
        // 本地ui引入
        Vue.use(TUI)
        Vue.use(Menu);
        Vue.use(Submenu);
        Vue.use(MenuItem);
        Vue.use(MenuItemGroup);
        Vue.use(Tooltip);
        Vue.use(Dropdown);
        Vue.use(DropdownMenu);
        Vue.use(DropdownItem);
    }
}