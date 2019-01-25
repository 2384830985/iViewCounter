interface Log {
    capsule: any,
    colorful: any,
    default: any,
    primary: any,
    success: any,
    warning: any,
    danger: any,
}
interface Jump {
    Copy: any,
    Sleep: any,
}
// 扩充
import {Route} from "vue-router";
import VueRouter from "vue-router";
import Vue from 'vue';

declare module 'vue/types/vue' {
    interface Vue {
        $router: VueRouter,
        $route: Route,
        $log: Log,
        $Jump: Jump
    }
}