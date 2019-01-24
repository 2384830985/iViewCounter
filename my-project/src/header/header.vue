<template>
    <Header :style="{padding: 0}" class="layout-header-bar t-header-content">
        <div class="t-header-item">
            <!--控制左侧导航栏目-->
            <header-collapsed/>
            <!--面包屑-->
            <header-breadcrumb/>
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
    import headerScreenFull from './components/header-screenfull/index.vue'
    import headerColorPicker from './components/header-colorPicker/index.vue'
    import headerSize from './components/header-size/index.vue'
    import headerAvatar from './components/header-avatar/index.vue'
    import headerCollapsed from './components/header-collapsed/index.vue'
    import headerBreadcrumb from './components/header-breadcrumb/index.vue'
    @Component({
        components: {
            headerBreadcrumb,
            headerCollapsed,
            headerAvatar,
            headerSize,
            headerScreenFull,
            headerColorPicker
        }
    })
    export default class Headers extends Vue{
        constructor(){
            super()
        }
    }
</script>

<style lang="less" scoped>
@import "./style.less";
</style>
