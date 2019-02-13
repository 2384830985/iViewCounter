<template>
    <el-menu :default-active="defaultActive"
             router
             class="el-menu-vertical-demo"
             :class="menuItemClasses"
             @open="handleOpen"
             @close="handleClose"
             ios-football="true"
             :active-text-color="ColorPicker"
             :collapse="isCollapsed">
        <div :class="!isCollapsed?'menu-wrapper':''"
             v-for="(item,index) in menuList" :key="index"
        >
            <sidebar-item :content="item" :index="(index+1+'')"></sidebar-item>
        </div>
    </el-menu>
    <!--@select="handleSelect"-->

    <!--background-color="#304156"-->
    <!--text-color="#bfcbd9"-->
    <!--active-text-color="#409EFF"-->
</template>
<script lang="ts">
    import { Component, Vue, Watch } from 'vue-property-decorator';
    import { State, Action, Getter ,Mutation } from "vuex-class";
    import SidebarItem from './sidebar-item/index.vue';
    import { menu } from '@/api/setting/index.ts';
    import {content} from "../router/router";

    @Component({
        components:{
            SidebarItem
        }
    })
    export default class Navigation extends Vue{
        private menuList: Array<object> = [];
        private defaultActive: string='';
        @State isCollapsed:any;
        @State ColorPicker:any;
        @Mutation SET_TAGSVIEW:any;
        get menuItemClasses(){
            return [
                !this.isCollapsed ? 't-el-menu-vertical' : ''
            ]
        }
        created(){
            this.start()
        }
        handleOpen(key:string, keyPath:Array<string>) {
            // console.log(key, keyPath);
        }
        handleClose(key:string, keyPath:Array<string>) {
            // console.log(key, keyPath);
        }
        // handleSelect(key:string, keyPath:Array<string>) {
        //     // this.SET_TAGSVIEW({
        //     //     // name:
        //     // });
        //     console.log(key, keyPath);
        //     console.log(this.$route);
        //     console.log(content);
        // }
        // 监听路由变化
        @Watch('$route')
        private start(){
            let _this = this;
            _this.defaultActive = _this.$Jump.Copy(_this.$route.path);
            menu().then((res:any)=>{
                _this.menuList = res.data.list;
            })
        }

    }
</script>

<style lang="less">
    .hide-trigger{
        width: 180px!important;
        min-width: 180px!important;
        max-width: 180px!important;
        flex: 0 0 180px!important;
    }
    .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 170px;
        min-height: 400px;
    }

    .el-submenu .el-menu-item {
        min-width: 170px!important;
    }
    .t-el-menu-vertical{
        width: 170px!important;
    }
    .el-menu--collapse {
        width: 36px!important;
        overflow-x: hidden;
    }
    .el-tooltip{
        //padding: 0 10px!important;
    }
    .submenu-title-noDown {
        padding-left: 10px !important;
        position: relative;
        .el-tooltip {
            padding: 0 5px !important;
        }
    }
    .submenu-title-down{
        .el-submenu__title{
            padding: 0!important;
            width: 100%;
            padding-left: 5px !important;
            padding-right: 20px!important;
        }
    }
    .menu-wrapper{
        width: 169px!important;
    }
</style>