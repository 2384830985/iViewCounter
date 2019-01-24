<template>
    <div v-if="content.child">
        <el-submenu
                :index="index+''"
                v-if="content.child.length>0"
                :class="{
            'submenu-title-down':state.isCollapsed,
            }">
            <template slot="title">
                <Icon :type="content.icon" size="24" class="mr-2" :class="{'mr-14':showName&&state.isCollapsed}"/>
                <span slot="title" v-if="!state.isCollapsed||showName"
                >{{content.name}}</span>
            </template>
            <div v-for="(items,indexs) in content.child" :key="this">
                <sidebar-item
                        v-if="items.child"
                        :content="items"
                        :showName="true"
                        :index="index+'-'+(indexs+1)+''" />
                <el-menu-item
                        v-else
                        :index="index+'-'+(indexs+1)+''"
                        :class="{'submenu-title-noDown':state.isCollapsed}">
                    <Icon :type="items.icon" class="mr-2" size="24"/>
                    <span slot="title">{{items.name}}</span>
                </el-menu-item>
            </div>
        </el-submenu>
        <el-menu-item
                v-else
                :index="index+1+''"
                :class="{'submenu-title-noDown':state.isCollapsed}">
            <Icon :type="content.icon" class="mr-2" size="24"/>
            <span slot="title">{{content.name}}</span>
        </el-menu-item>
    </div>
</template>
<script lang="ts">
    import { Component, Vue, Prop } from 'vue-property-decorator';
    import { State, Action, Getter ,Mutation } from "vuex-class";
    @Component
    export default class SidebarItem extends Vue{
        @State state:any;
        @Prop(Object) content:any;
        @Prop(Boolean) showName:any;
        @Prop(String) index:any;
        constructor(){
            super()
        }
    }
</script>

<style lang="less">

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
    .t-showName{
        padding-left: 10px!important;
    }
    .mr-14{
        margin-right: 14px!important;
    }
</style>