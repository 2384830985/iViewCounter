import cookie from '@/libs/cookie.ts'
export default {
    // 是否全屏
    screenFullActive: false,
    // 通过name缓存页面
    IncludeList: localStorage.getItem('IncludeList')||'',
    // 全屏的颜色
    ColorPicker: localStorage.getItem('ColorPicker')||'#2d8cf0',
    // 默认颜色
    DefaultColor: '#2d8cf0',
    // TagsView 的集合
    TagsView: localStorage.getItem('TagsView')||'[]',
    // 当前导航是否缩进
    isCollapsed: cookie.get('isCollapsed')?(cookie.get('isCollapsed')==='false'?false:true):false,
}
