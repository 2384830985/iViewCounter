<template>
    <div class="t-login-content">
        <!-- 粒子特效 -->
        <Particles></Particles>
        <div class="t-login-por">
            <div class="t-login-conponent">
                <div class="t-login-logo">
                    <img src="../../assets/logo.jpg" class="w-100 h-100 border-r50" alt="admin">
                </div>
                <Form ref="sizeForm" :model="sizeForm" :rules="loginRules">
                    <FormItem class="mt-3" prop="name">
                        <Input v-model="sizeForm.name" size="large" placeholder="请输入账号"/>
                    </FormItem>
                    <FormItem prop="password">
                        <Input type= "password" v-model="sizeForm.password" size="large" placeholder="请输入密码"/>
                    </FormItem>
                    <FormItem>
                        <Button class="w-100" size="large" @click="submit('sizeForm')">登陆</Button>
                    </FormItem>
                </Form>
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

