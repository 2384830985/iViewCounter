import Vue from 'vue';
import Vuex from 'vuex';
import {log,state,mutations,cookie,actions} from './store/index'
Vue.use(Vuex);

export default new Vuex.Store({
    state,
    mutations,
    actions,
    modules:{
        log,
        cookie
    }
});
