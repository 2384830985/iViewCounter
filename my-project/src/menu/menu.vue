<template>
    <el-menu default-active="1-4-1"
             class="el-menu-vertical-demo"
             :class="menuItemClasses"
             @open="handleOpen"
             @close="handleClose"
             :collapse="state.isCollapsed">
        <el-submenu index="1">
            <template slot="title">
                <i class="el-icon-location"></i>
                <span slot="title">导航一</span>
            </template>
            <el-menu-item-group>
                <span slot="title">分组一</span>
                <el-menu-item index="1-1">选项1</el-menu-item>
                <el-menu-item index="1-2">选项2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="分组2">
                <el-menu-item index="1-3">选项3</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="1-4">
                <span slot="title">选项4</span>
                <el-menu-item index="1-4-1">选项1</el-menu-item>
            </el-submenu>
        </el-submenu>
        <el-menu-item index="2">
            <i class="el-icon-menu"></i>
            <span slot="title">导航二</span>
        </el-menu-item>
        <el-menu-item index="3" disabled>
            <i class="el-icon-document"></i>
            <span slot="title">导航三</span>
        </el-menu-item>
        <el-menu-item index="4">
            <i class="el-icon-setting"></i>
            <span slot="title">导航四</span>
        </el-menu-item>
    </el-menu>
</template>
<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    import { State, Action, Getter ,Mutation } from "vuex-class";
    @Component
    export default class Navigation extends Vue{
        @State state:any;
        get menuItemClasses(){
            return [
                !this.state.isCollapsed ? 't-el-menu-vertical' : ''
            ]
        }
        handleOpen(key:string, keyPath:Array<string>) {
            console.log(key, keyPath);
        }
        handleClose(key:string, keyPath:Array<string>) {
            console.log(key, keyPath);
        }
    }
</script>

<style lang="less" scoped>
    .hide-trigger{
        width: 200px!important;
        min-width: 200px!important;
        max-width: 200px!important;
        flex: 0 0 200px!important;
    }
</style>
<style lang="less" scoped>
    @import "menu.less";
</style>
