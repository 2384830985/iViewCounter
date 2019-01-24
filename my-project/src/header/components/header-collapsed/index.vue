<template>
    <Icon @click.native="collapsedSider" :class="rotateIcon" :style="{margin: '0 20px'}" type="md-menu" size="24"></Icon>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    import { State, Action, Getter ,Mutation } from "vuex-class";
    @Component
    export default class headerSize extends Vue{
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


<style scoped>
    .rotate-icon{
        transform: rotate(-90deg);
    }
</style>