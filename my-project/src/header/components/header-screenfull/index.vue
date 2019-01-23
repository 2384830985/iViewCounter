<template>
    <el-tooltip class="item"
                effect="dark"
                :content="screenFullActive?'退出全屏':'全屏'"
                placement="bottom">
        <Icon class="font-16"
              :type="screenFullActive?'ios-contract':'md-contract'"
              @click="buttonCli" />
    </el-tooltip>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    import { State, Action, Getter ,Mutation } from "vuex-class";
    import ScreenFull from 'screenfull';
    @Component
    export default class headerScreenFull extends Vue{
        private active:boolean = false;
        @State screenFullActive: any;
        @Mutation SET_SCREENFULL:any;
        buttonCli(){
            this.SET_SCREENFULL(!ScreenFull.isFullscreen)
            if (!ScreenFull.enabled) { // 如果不允许进入全屏，发出不允许提示
                return false
            }
            ScreenFull.toggle()
        }
    }
</script>


<style scoped>
    .font-16{
        font-size: 16px;
    }
</style>