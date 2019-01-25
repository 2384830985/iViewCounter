<template>
    <t-content>
        <RadioGroup v-model="phone">
            <Radio label="apple">
                <Icon type="logo-apple"></Icon>
                <span>Apple</span>
            </Radio>
            <Radio label="android">
                <Icon type="logo-android"></Icon>
                <span>Android</span>
            </Radio>
            <Radio label="windows">
                <Icon type="logo-windows"></Icon>
                <span>Windows</span>
            </Radio>
        </RadioGroup>
        <RadioGroup v-model="animal">
            <Radio label="金斑蝶"></Radio>
            <Radio label="爪哇犀牛"></Radio>
            <Radio label="印度黑羚"></Radio>
        </RadioGroup>
    </t-content>
</template>

<script lang="ts">
    import {Vue,Component} from 'vue-property-decorator'
    @Component({
        name: 'radios'
    })
    export default class radios extends Vue{
        private phone:string = 'apple';
        private animal:string = '爪哇犀牛';
    }
</script>

<style scoped>

</style>