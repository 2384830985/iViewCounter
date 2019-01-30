<style>
    @import "style.less";
</style>
<template>
    <div class="layout">
        <div class="ivu-layout ivu-layout-has-sider" style="min-height: 100%">
            <!--左侧导航-->
            <Navigation></Navigation>
            <div class="ivu-layout">
                <!--上方-->
                <Headers></Headers>
                <!--tags-->
                <tags-view/>
                <!--内容-->
                <Content>
                   <app-main/>
                </Content>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    import { State, Action, Getter ,Mutation } from "vuex-class";
    import Navigation from '../menu/menu.vue';
    import Headers from '../header/header.vue';
    import AppMain from './content/appMain.vue';
    import TagsView from './tags-view/index.vue';
    @Component({
        components:{
            Navigation,
            Headers,
            AppMain,
            TagsView,
        }
    })
    export default class Layout extends Vue{
        @State state:any;
        created() {
        }
    }
</script>
