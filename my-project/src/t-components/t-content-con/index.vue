<template>
    <div class="t-charts-content">
        {{content}}
        <slot/>
    </div>
</template>

<script lang="ts">
    import { Component, Vue, Prop } from 'vue-property-decorator';
    @Component({
        name: 'TContentCon'
    })
    export default class TContentCon extends Vue{
        @Prop(String)
        content!:string
    }
</script>

<style lang="less" scoped>
    .t-charts-content{
        color: rgba(0,0,0,0.45);
        font-size: 12px;
        margin-bottom: 1rem;
    }
</style>