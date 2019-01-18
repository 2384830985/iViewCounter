export default {
    /**
     * 左侧导航是否收缩
     * @param state
     * @param {boolean} data
     * @constructor
     */
    SET_ISCOLLAPSED(state: any, data: boolean) {
        state.state.isCollapsed = data
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
}