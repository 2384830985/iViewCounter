import Vue from 'vue';
import Vuex from 'vuex';
import {log,state,mutations,cookie} from './store/index'
Vue.use(Vuex);

export default new Vuex.Store({
    state,
    mutations,
    modules:{
        log,
        cookie
    }
});
