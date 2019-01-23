import cookie from '@/libs/cookie.ts'
export default {
    /**
     * 左侧导航是否收缩
     * @param state
     * @param {boolean} data
     * @constructor
     */
    SET_ISCOLLAPSED(state: any, data: boolean) {
        console.log(data);
        cookie.set('isCollapsed',data);
        state.state.isCollapsed = data;
    },
    /**
     * 是否全屏
     * @param state
     * @param {boolean} data
     * @constructor
     */
    SET_SCREENFULL(state: any, data: boolean) {
        state.screenFullActive = data
    },
    /**
     * 更换颜色
     * @param state
     * @param {string} data
     * @constructor
     */
    SET_COLORPICKER(state: any, data: string) {
        localStorage.setItem('ColorPicker',data);
        state.ColorPicker = data;
    },
}