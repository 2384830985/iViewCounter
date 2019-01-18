import cookie from '@/libs/cookie.ts'
export default {
    // 是否全屏
    screenFullActive: false,
    state     : {
        // 当前导航是否缩进
        isCollapsed: cookie.get('isCollapsed')?(cookie.get('isCollapsed')==='false'?false:true):false,
    },
}
