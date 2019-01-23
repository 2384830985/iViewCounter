<template>
    <el-dropdown trigger="click" size="small" @command="handleCommand">
      <span class="el-dropdown-link">
        <Avatar shape="square" icon="ios-person" />
      </span>
        <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="1">首页</el-dropdown-item>
            <el-dropdown-item command="2">项目地址</el-dropdown-item>
            <el-dropdown-item command="3" divided>退出</el-dropdown-item>
        </el-dropdown-menu>
    </el-dropdown>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    import { State, Action, Getter ,Mutation } from "vuex-class";
    import setting from '@/setting'
    @Component
    export default class headerAvatar extends Vue{
        @Mutation REMOVE_ALL: any;
        handleCommand(command:string){
            if (command==='1') {
                this.$router.push('/')
            }else if (command==='2') {
                window.open(setting.project)
            }else if (command==='3') {
                this.REMOVE_ALL();
                this.$router.replace('/refresh');
                this.$router.push('/login');
            }
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