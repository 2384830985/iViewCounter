<template>
    <div class="t-title">
        {{title}}
        <slot/>
    </div>
</template>

<script lang="ts">
    import { Component, Vue, Prop } from 'vue-property-decorator';
    @Component({
        name: 'TTitle'
    })
    export default class TTitle extends Vue{
        @Prop(String)
        title!:string
    }
</script>

<style lang="less" scoped>
    .t-title{
        font-size: 16px;
        color: rgba(0, 0, 0, 0.85);
        font-weight:bold;
    }
</style>