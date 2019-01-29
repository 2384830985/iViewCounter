<template>
    <div v-if="content.child">
        <!--有下一级-->
        <el-submenu
                :index="index+''"
                v-if="content.child.length>0"
                :class="{
            'submenu-title-down':isCollapsed,
            }">
            <!--有下一级的title-->
            <template slot="title">
                <Icon :type="content.icon" size="24" class="mr-2" :class="{'mr-14':showName&&isCollapsed}"/>
                <span slot="title" v-if="!isCollapsed||showName"
                >{{content.name}}</span>
            </template>
            <div v-for="(items,indexs) in content.child" :key="this">
                <!--递归调用自身-->
                <sidebar-item
                        v-if="items.child"
                        :content="items"
                        :showName="true"
                        :index="index+'-'+(indexs+1)+''" />
                <!--没有下一级-->
                <Item v-else
                      :content="items"
                      :className="isCollapsed?'submenu-title-noDown':''"
                      :showName="showName"/>
            </div>
        </el-submenu>
        <!--没有下一级-->
        <Item :content="content"
              v-else
              :className="isCollapsed?'submenu-title-noDown':''"
              :showName="showName"/>
    </div>
</template>
<script lang="ts">
    import { Component, Vue, Prop } from 'vue-property-decorator';
    import { State, Action, Getter ,Mutation } from "vuex-class";
    import Item from '../item/index.vue'
    @Component({
        name: 'SidebarItem',
        components: {
            Item
        }
    })
    export default class SidebarItem extends Vue{
        @State isCollapsed:any;
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
    .t-showName{
        padding-left: 10px!important;
    }
    .mr-14{
        margin-right: 14px!important;
    }
</style>