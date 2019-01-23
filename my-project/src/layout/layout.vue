<style scoped>
 @import "../menu/menu.less";
</style>
<template>
    <div class="layout">
        <div class="ivu-layout ivu-layout-has-sider" style="min-height: 100%">
            <!--左侧导航-->
            <Navigation></Navigation>
            <div class="ivu-layout">
                <!--上方-->
                <Headers></Headers>
                <!--内容-->
                <Content>
                    Content
                    <Button>Default</Button>
                    <Button type="primary">Primary</Button>
                    <Button type="dashed">Dashed</Button>
                    <Button type="text">Text</Button>
                    <br><br>
                    <Button type="info">Info</Button>
                    <Button type="success">Success</Button>
                    <Button type="warning">Warning</Button>
                    <Button type="error">Error</Button>
                    <router-view/>
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
    @Component({
        components:{
            Navigation,
            Headers,
        }
    })
    export default class Layout extends Vue{
        @State state:any;
        created() {
        }
    }
</script>
