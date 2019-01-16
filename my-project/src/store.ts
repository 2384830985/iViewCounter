import Vue from 'vue';
import Vuex from 'vuex';
import Admin from './store/index'
Vue.use(Vuex);

export default new Vuex.Store({
    modules:{
        Admin
    }
});
