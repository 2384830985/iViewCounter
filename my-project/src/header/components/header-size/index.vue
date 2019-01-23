<template>
    <el-dropdown trigger="click" size="small" @command="handleCommand">
      <span class="el-dropdown-link">
        <Icon type="ios-color-wand" class="font-16" />
      </span>
        <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="large" :disabled="cookie.getSize==='large'">large</el-dropdown-item>
            <el-dropdown-item command="" :disabled="!cookie.getSize||cookie.getSize===''">default</el-dropdown-item>
            <el-dropdown-item command="small" :disabled="cookie.getSize==='small'">small</el-dropdown-item>
        </el-dropdown-menu>
    </el-dropdown>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    import { State, Action, Getter ,Mutation } from "vuex-class";
    @Component
    export default class headerSize extends Vue{
        @State cookie: any;
        @Mutation GET_SIZE: any;
        handleCommand(command:string){
            this.GET_SIZE(command);
            // 这个情况在已经加载完页面 用户改变了尺寸时触发
            this.$IVIEW.size = command;
            // 由于已经加载过设置 需要刷新此页面
            this.$router.replace('/refresh');
            this.$Message.success('Switch Size Success');
        }
    }
</script>


<style scoped>
    .font-16{
        font-size: 16px;
    }
    .el-dropdown-link {
        cursor: pointer;
    }
</style>