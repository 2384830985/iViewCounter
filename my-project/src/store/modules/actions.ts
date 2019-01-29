import Jump from '@/libs/overallSituation'
/**
 * actions
 * @type {{}}
 */
export default  {
    /**
     * 删除当前的tags-view
     * @param {any} state
     * @param {any} commit
     * @param {any} view
     * @param {string} path
     * @param {number} pathIndex
     * @returns {Promise}
     * @constructor
     */
    async CANCEL_TAGS({state, commit}:any , view: any) {
        return new Promise((resolve:Function, reject:any) => {
            // 判断当前是否是当页
            let viewIndex = 0;
            // 当选中当是当前页面的时候
            if (view.routePath===view.path) {
                ++viewIndex
            }
            // 转换为数组 当前已经有的 TagsView
            let TagsView: Array<any> = JSON.parse(state.TagsView);
            // 删除当前 TagsView
            TagsView.splice(view.routeIndex,1);
            // 删除后需要跳转到哪个页面 如果还有缓存页面则跳转到最后一个
            if (TagsView.length>0) {
                TagsView[TagsView.length-1].viewIndex = viewIndex;
                resolve(TagsView[TagsView.length-1]);
            }else {//没有最有一个的时候返回空
                resolve(TagsView[TagsView.length-1]);
            }
            // 缓存当前页面
            let IncludeList = Jump.Copy(state.IncludeList.split(','));
            IncludeList.map((res:string,index:number)=>{
                if (res===view.metaName) {
                    // 删除当前页面
                    IncludeList.splice(index,1)
                }
            });
            // 转换为string 类型 keep-alive 需要
            let Include:string =  Jump.TryTurnStr(IncludeList,',');
            // 保存当前的 tags
            commit('PRESE_TAGSVIEW',TagsView);
            // 保存当前剩余的 页面缓存
            commit('PRESE_INCLUDE',Include);
        });
    },

};

