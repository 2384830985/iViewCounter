import cookie from '@/libs/cookie.ts'
import {ActionTree, GetterTree, MutationTree,StoreOptions} from "vuex";

/**
 * state
 * @type {{getToken: string | undefined}}
 */
const state= {
    getToken: cookie.get('token')
};
/**
 * actions
 * @type {{}}
 */
const actions: ActionTree<String, any> = {

};
/**
 * getters
 * @type {{}}
 */
const getters: GetterTree<String, any> = {

};
/**
 * mutations
 * @type {{}}
 */
const mutations: MutationTree<String> = {
    GET_TOKEN: (state:any,data:string)=>{
        cookie.set('token',data)
        state.getToken = data;
    }
};

export default {
    state,
    getters,
    actions,
    mutations
}