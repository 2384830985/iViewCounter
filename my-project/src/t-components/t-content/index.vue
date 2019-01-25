<template>
    <div class="t-content">
        <slot/>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    @Component({
        name: 'TContent'
    })
    export default class TContent extends Vue{
        constructor(){
            super()
        }
    }
</script>

<style lang="less" scoped>
.t-content{
    width: 100%;
    height: 100%;
    background: white;
    border: 1px solid #e6e6e6;
}
</style>