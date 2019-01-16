import util from '../../libs/util';
export default {
    install (Vue:any,options:Object){
        Vue.prototype.$open = util.open
    }
}