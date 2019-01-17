<template>
    <Header :style="{padding: 0}" class="layout-header-bar">
        <Icon @click.native="collapsedSider" :class="rotateIcon" :style="{margin: '0 20px'}" type="md-menu" size="24"></Icon>
    </Header>
</template>
<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    import { State, Action, Getter ,Mutation } from "vuex-class";
    @Component
    export default class Headers extends Vue{
        @State state;
        @Mutation SET_ISCOLLAPSED;
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

</style>
