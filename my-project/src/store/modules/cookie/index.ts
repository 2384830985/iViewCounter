import cookie from '@/libs/cookie.ts'
import {ActionTree, GetterTree, MutationTree,StoreOptions} from "vuex";

/**
 * state
 * @type {{getToken: string | undefined}}
 */
const state= {
    // token
    getToken: cookie.get('token'),
    // size
    getSize: cookie.get('size'),
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
    /**
     * 修改token
     * @param state
     * @param {string} data
     * @constructor
     */
    GET_TOKEN: (state:any,data:string)=>{
        cookie.set('token',data)
        state.getToken = data;
    },
    /**
     * 修改按钮size
     * @param state
     * @param {string} data
     * @constructor
     */
    GET_SIZE: (state:any,data:string)=>{
        cookie.set('size',data)
        state.getSize = data;
    },
    /**
     * 删除所有cookie
     * @param state
     * @param {string} data
     * @constructor
     */
    REMOVE_ALL: (state:any,data?:string)=>{
        cookie.remove('token');
        cookie.remove('isCollapsed');
        cookie.remove('size');
        localStorage.clear();
        state.getToken = '';
        state.getSize = '';
    },

};

export default {
    state,
    getters,
    actions,
    mutations
}