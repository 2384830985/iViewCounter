<template>
    <transition name="main-fade"
                mode="out-in">
        <keep-alive :include="IncludeList">
            <router-view :key="key"/>
        </keep-alive>
    </transition>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    import { State } from 'vuex-class'
    @Component
    export default class AppMain extends Vue{
        @State IncludeList:any;
        get key() {
            return this.$route.fullPath
        }
    }
</script>
<style>

</style>