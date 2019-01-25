<template>
    <t-content>
        <Button>Default</Button>
        <Button type="primary">Primary</Button>
        <Button type="dashed">Dashed</Button>
        <Button type="text">Text</Button>
        <br><br>
        <Button type="info">Info</Button>
        <Button type="success">Success</Button>
        <Button type="warning" @click="warning">Warning</Button>
        <Button type="error" @click="Error">Error</Button>
    </t-content>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    import Util from '@/libs/util';
    import {xxx,success} from '@/api/service/index.ts'
    @Component
    export default class buttons extends Vue {
        constructor(){
            Util.log.default(1,'home')
            Util.log.primary(1,'home')
            Util.log.success(1,'home')
            Util.log.warning(1)
            Util.log.danger(1)
            super()
        }
        Error(){
            xxx()
        }
        warning(){
            success({})
        }

        /**
         * 开始执行
         */
        created() {
            this.$log.capsule('D2Admin', 'ErrorHandler', 'success');
        }
    }
</script>
