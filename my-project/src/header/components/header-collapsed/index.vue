<template>
    <Icon @click.native="collapsedSider" :class="rotateIcon" :style="{margin: '0 8px'}" type="md-menu" size="24"></Icon>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    import { State, Action, Getter ,Mutation } from "vuex-class";
    import bus from '@/libs/eventBus';
    @Component
    export default class headerSize extends Vue{
        @State isCollapsed:any;
        @Mutation SET_ISCOLLAPSED:any;
        collapsedSider () {
            this.SET_ISCOLLAPSED(!this.isCollapsed);
            bus.$emit("collapsed",1);
        }
        get rotateIcon(){
            return [
                'menu-icon',
                this.isCollapsed ? 'rotate-icon' : ''
            ];
        }
    }
</script>


<style scoped>
    .rotate-icon{
        transform: rotate(-90deg);
    }
</style>