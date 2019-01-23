import cookie from '@/libs/cookie.ts'
export default {
    // 是否全屏
    screenFullActive: false,
    // 全屏的颜色
    ColorPicker: localStorage.getItem('ColorPicker')||'#2d8cf0',
    // 默认颜色
    DefaultColor: '#2d8cf0',
    state     : {
        // 当前导航是否缩进
        isCollapsed: cookie.get('isCollapsed')?(cookie.get('isCollapsed')==='false'?false:true):false,
    },
}
