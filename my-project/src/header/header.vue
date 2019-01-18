<template>
    <Header :style="{padding: 0}" class="layout-header-bar t-header-content">
        <div class="t-header-item">
            <Icon @click.native="collapsedSider" :class="rotateIcon" :style="{margin: '0 20px'}" type="md-menu" size="24"></Icon>
        </div>
        <div class="t-header-setting">
            <header-screen-full/>
        </div>
    </Header>
</template>
<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    import { State, Action, Getter ,Mutation } from "vuex-class";
    import headerScreenFull from './components/header-screenfull/index.vue'
    @Component({
        components: {
            headerScreenFull
        }
    })
    export default class Headers extends Vue{
        @State state:any;
        @Mutation SET_ISCOLLAPSED:any;
        collapsedSider () {
            this.SET_ISCOLLAPSED(!this.state.isCollapsed)
        }
        get rotateIcon(){
            return [
                'menu-icon',
                this.state.isCollapsed ? 'rotate-icon' : ''
            ];
        }

    }
</script>

<style lang="less" scoped>
@import "./style.less";
</style>
