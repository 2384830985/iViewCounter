<template>
    <div class="app-breadcrumb">
        <transition name="slide-fade" mode="out-in">
            <Breadcrumb :key="matchedList[matchedList.length-1].path">
                <BreadcrumbItem v-for="(item,index) in matchedList"
                                :key="this"
                                :to="(index!==matchedList.length-1)?item.path:''"
                >{{item.meta.title}}</BreadcrumbItem>
            </Breadcrumb>
        </transition>
    </div>
</template>

<script lang="ts">
    import { Component, Vue, Watch } from 'vue-property-decorator';
    @Component
    export default class headerBreadcrumb extends Vue{
        private matchedList:Array<object> = [];
        created(){
            this.start()
        }
        @Watch('$route')
        private start(){
            let _this = this;
            _this.matchedList = _this.$route.matched;
        }
    }
</script>


<style lang="less" scoped>
    .app-breadcrumb{
        display: inline-block;
    }
</style>