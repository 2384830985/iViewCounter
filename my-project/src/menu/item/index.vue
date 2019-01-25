<template>
    <el-menu-item
            v-else
            :index="content.url"
            :class="className">
        <Icon :type="content.icon" :class="classIcon||'mr-2'" :size="size||'24'"/>
        <span slot="title">{{content.name}}</span>
    </el-menu-item>
</template>
<script lang="ts">
    import { Component, Vue, Prop } from 'vue-property-decorator';
    import { State, Action, Getter ,Mutation } from "vuex-class";
    @Component({
        name: 'Item',
    })
    export default class Item extends Vue{
        @State state:any;
        @Prop(Object) content:any;
        @Prop(String) index:any;
        @Prop(String) className:any;
        @Prop(String) classIcon:any;
        @Prop(String) size:any;
        constructor(){
            super()
        }
    }
</script>

<style lang="less">
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
</style>