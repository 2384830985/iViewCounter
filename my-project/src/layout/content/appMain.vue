<template>
    <transition name="main-fade"
                mode="out-in">
        <keep-alive>
            <router-view :key="key"/>
        </keep-alive>
    </transition>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    @Component
    export default class AppMain extends Vue{
        get key() {
            return this.$route.fullPath
        }
    }
</script>
<style>

</style>