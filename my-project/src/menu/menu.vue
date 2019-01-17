<template>
    <Sider hide-trigger collapsible :collapsed-width="78" :class="hideTrigger" v-model="state.isCollapsed">
        <Menu active-name="1-2" theme="light" width="auto" :class="menuItemClasses">
            <MenuItem name="1-1">
                <Icon type="ios-navigate"></Icon>
                <span>Option 1</span>
            </MenuItem>
            <MenuItem name="1-2">
                <Icon type="ios-search"></Icon>
                <span>Option 2</span>
            </MenuItem>
            <MenuItem name="1-3">
                <Icon type="ios-settings"></Icon>
                <span>Option 3</span>
            </MenuItem>
        </Menu>
    </Sider>
</template>
<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    import { State, Action, Getter ,Mutation } from "vuex-class";
    @Component
    export default class Navigation extends Vue{
        @State state:any;
        get menuItemClasses(){
            return [
                'menu-item',
                this.state.isCollapsed ? 'collapsed-menu' : ''
            ]
        }
        get hideTrigger(){
            return [
                !this.state.isCollapsed ? 'hide-trigger' : ''
            ];
        }
    }
</script>

<style lang="less" scoped>
    .hide-trigger{
        width: 150px!important;
        min-width: 150px!important;
        max-width: 150px!important;
        flex: 0 0 150px!important;
    }
</style>
<style lang="less" scoped>
    @import "menu.less";
</style>
