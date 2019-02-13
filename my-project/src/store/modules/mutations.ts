import cookie from '@/libs/cookie';
import Jump from '@/libs/overallSituation'
export default {
    /**
     * 左侧导航是否收缩
     * @param state
     * @param {boolean} data
     * @constructor
     */
    SET_ISCOLLAPSED(state: any, data: boolean) {
        cookie.set('isCollapsed',data);
        state.isCollapsed = data;
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
    /**
     * 添加当前 vags-view
     * @param state 当前vuex的state
     * @param {string} data 当前的路由
     * @constructor
     */
    SET_TAGSVIEW(state: any, data: any) {
        // 转换为数组
        let TagsView: object[] = JSON.parse(state.TagsView);
        // 用于判断当前是否相同
        let TagsViewIndex:number = 1;
        TagsView.map((res:any)=>{
            if (data.path===res.path&&data.path!=='/') {
                TagsViewIndex++
            }
        });
        // 等于1表示没有相同的push 进去
        if (TagsViewIndex===1&&data.name!==''&&data.name) {
            TagsView.push({
                name: data.meta.name,
                path: data.path,
                query: data.query,
                fullPath: data.fullPath,
                metaName: data.name,
            })
        }
        // 改变vuex
        state.TagsView = JSON.stringify(TagsView);
        // 存储到localStorage
        localStorage.setItem('TagsView',JSON.stringify(TagsView));
    },
    /**
     * 保存当前的 tags
     *
     * @param state
     * @param data
     * @constructor
     */
    PRESE_TAGSVIEW(state: any, data: any) {
        // 改变vuex
        state.TagsView = JSON.stringify(data);
        // 存储到localStorage
        localStorage.setItem('TagsView',JSON.stringify(data));
    },
    /**
     * 保存需要缓存的页面
     * @param state
     * @param data
     * @constructor
     */
    PRESE_INCLUDE(state: any, data: string) {
        // 改变vuex
        state.IncludeList = data;
        // 存储到localStorage
        localStorage.setItem('IncludeList',data);
    },
    /**
     * 添加当前的缓存页面
     * @param state
     * @param {string} data
     * @param {string} view
     * @constructor
     */
    SET_CACHE(state:any , view: any) {
        // 转换成数组
        let IncludeList:string[] = Jump.Copy(state.IncludeList.split(','));
        // 判断当前的路由是否需要缓存
        if (!view.meta.noCache) {
            // 判断当前是否已经缓存了 CacheIndex 0 未缓存 1已经缓存
            let CacheIndex:number = 0;
            IncludeList.map((res:string)=>{
                if (res===view.name) {
                    CacheIndex = 1
                }
            });
            // 未缓存就存进去
            if (CacheIndex===0) {
                IncludeList.push(view.name)
            }
        }
        // 改变vuex dom 节点转换
        state.IncludeList = Jump.TryTurnStr(IncludeList,',');
        // 存储到localStorage
        localStorage.setItem('IncludeList',Jump.TryTurnStr(IncludeList,','));
    },
}