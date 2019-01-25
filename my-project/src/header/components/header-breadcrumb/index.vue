<template>
    <div class="app-breadcrumb">
        <transition name="slide-fade">
            <Breadcrumb v-if="show">
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
        private show:boolean = true;
        created(){
            this.start()
        }
        @Watch('$route')
        private start(){
            let _this = this;
            _this.show = !_this.show;
            _this.matchedList = _this.$route.matched;
            setTimeout(function () {
                _this.show = !_this.show;
            },500)
        }
    }
</script>


<style lang="less" scoped>
    .app-breadcrumb{
        display: inline-block;
    }
    /* 可以设置不同的进入和离开动画 */
    /* 设置持续时间和动画函数 */
    .slide-fade-enter-active {
        transition: all .3s ease;
    }
    .slide-fade-leave-active {
        transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }
    .slide-fade-enter, .slide-fade-leave-to
        /* .slide-fade-leave-active for below version 2.1.8 */ {
        transform: translateX(50px);
        opacity: 0;
    }
</style>