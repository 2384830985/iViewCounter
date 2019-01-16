<template>
    <div class="t-login-content">
        <!-- 粒子特效 -->
        <Particles></Particles>
        <div class="t-login-por">
            <div class="t-login-conponent">
                <div class="t-login-logo">
                    <img src="../../assets/logo.jpg" class="w-100 h-100 border-r50" alt="admin">
                </div>
                <!--<el-form ref="sizeForm" :rules="loginRules" :model="sizeForm">-->
                    <!--<el-form-item label=" " class="mt-4" prop="name">-->
                        <!--<el-input -->
                            <!--v-model     = "sizeForm.name"-->
                            <!--placeholder = "请输入账号"-->
                        <!--&gt;-->
                            <!--&lt;!&ndash; <template slot="prepend">-->
                                <!--<i class="icon-yonghu"></i>-->
                            <!--</template> &ndash;&gt;-->
                        <!--</el-input>-->
                    <!--</el-form-item>-->
                    <!--<el-form-item label=" " prop="password">-->
                        <!--<el-input -->
                            <!--type        = "password"-->
                            <!--v-model     = "sizeForm.password"-->
                            <!--placeholder = "请输入密码"-->
                        <!--&gt;-->
                            <!--&lt;!&ndash; <template slot="prepend">-->
                                <!--<i class="el-icon-star-off"></i>-->
                            <!--</template> &ndash;&gt;-->
                        <!--</el-input>-->
                    <!--</el-form-item>-->
                    <!--<el-form-item label=" ">-->
                        <!--<el-button class="w-100" @click="submit('sizeForm')">登陆</el-button>-->
                    <!--</el-form-item>-->
                <!--</el-form>-->
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Login from './login.conponent';
export default Login;
</script>

<style lang="less" scoped>
@import './style.less';
</style>

