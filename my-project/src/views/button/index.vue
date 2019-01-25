<template>
    <t-content>
        <Button>Default</Button>
        <Button type="primary">Primary</Button>
        <Button type="dashed">Dashed</Button>
        <Button type="text">Text</Button>
        <br><br>
        <Button type="info">Info</Button>
        <Button type="success">Success</Button>
        <Button type="warning">Warning</Button>
        <Button type="error" @click="Error">Error</Button>
    </t-content>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    import Util from '@/libs/util'
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
            this.$router.replace('/redirect/content/buttons')
        }

        /**
         * 开始执行
         */
        created() {
            this.$log.capsule('D2Admin', 'ErrorHandler', 'success');

            // xx.xxx({})
            //   .then((res:object)=>{
            //     console.log(res)
            //   })
        }
    }
</script>
