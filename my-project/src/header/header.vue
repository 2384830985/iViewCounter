<template>
    <Header :style="{padding: 0}" class="layout-header-bar t-header-content">
        <div class="t-header-item">
            <Icon @click.native="collapsedSider" :class="rotateIcon" :style="{margin: '0 20px'}" type="md-menu" size="24"></Icon>
        </div>
        <div class="t-header-setting">
            <!--全屏-->
            <header-screen-full class="mr-3"/>
            <!--字体大小-->
            <header-size  class="mr-3"/>
            <!--颜色-->
            <header-color-picker class="mr-3"/>
            <!--头像-->
            <header-avatar/>

        </div>
    </Header>
</template>
<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    import { State, Action, Getter ,Mutation } from "vuex-class";
    import headerScreenFull from './components/header-screenfull/index.vue'
    import headerColorPicker from './components/header-colorPicker/index.vue'
    import headerSize from './components/header-size/index.vue'
    import headerAvatar from './components/header-avatar/index.vue'
    @Component({
        components: {
            headerAvatar,
            headerSize,
            headerScreenFull,
            headerColorPicker
        }
    })
    export default class Headers extends Vue{
        private color:string = '';
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
