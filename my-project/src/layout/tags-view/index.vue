<style lang="less">
    @import "./style.less";
</style>
<template>
    <div class="t-tags-content">
        <router-link v-for="(item,index) in TagsViewList"
                     :key="index"
                     :to="{path:item.path, query: item.query, fullPath: item.fullPath}"
        >
            <div class="t-tags-item"
                 :class="item.path===$route.path?'t-tags-color':''"
                 :style="`background: ${item.path===$route.path?ColorPicker:''}`"
            >{{item.name}}
                <Icon type="ios-close" class="t-tags-close"
                      @click.stop.prevent="closeSelectedTag(item,index)"
                />
            </div>
        </router-link>
    </div>
</template>
<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    import { State, Action, Getter ,Mutation } from "vuex-class";
    @Component
    export default class TagsView extends Vue{
        // TagsView List
        @State TagsView:any;
        // 全局配置颜色
        @State ColorPicker:any;
        // 删除当前的tags
        @Action CANCEL_TAGS:any;

        created() {
        }

        get TagsViewList(){
            return JSON.parse(this.TagsView)
        }

        /**
         * 删除当前 tags
         * @param {object} item
         * @param {number} index
         */
        closeSelectedTag(item:any,index:number){
            let _this = this;
            // 获取当前的 路径
            item.routePath = this.$route.path;
            // 当前数组选中的下标
            item.routeIndex = index;
            // 删除操作
            this.CANCEL_TAGS(item)
                .then((res:any)=>{
                    // 返回的需要跳转的页面 返回无的时候则跳转 '/' 首页
                    if (!res) {
                        _this.$router.push('/')
                    }else if (res.viewIndex>0) { // 是当前页面的时候则跳转 不是当前页面不作操作
                        _this.$router.push({path:res.path})
                    }
                })
        }
    }
</script>
