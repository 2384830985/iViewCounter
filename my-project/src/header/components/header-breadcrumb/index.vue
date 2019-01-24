<template>
    <div class="app-breadcrumb">
        <transition name="el-breadcrumb">
            <Breadcrumb>
                <BreadcrumbItem to="/">Home</BreadcrumbItem>
                <BreadcrumbItem to="/components/breadcrumb">Components</BreadcrumbItem>
                <BreadcrumbItem>Breadcrumb</BreadcrumbItem>
            </Breadcrumb>
        </transition>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    import { State, Action, Getter ,Mutation } from "vuex-class";
    @Component
    export default class headerBreadcrumb extends Vue{

    }
</script>


<style lang="less" scoped>
    .app-breadcrumb{
        display: inline-block;
        .el-breadcrumb {
            display: inline-block;
            font-size: 14px;
            line-height: 50px;
            margin-left: 10px;
            .no-redirect {
                color: #97a8be;
                cursor: text;
            }
        }
    }
</style>