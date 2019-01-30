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
    import {xxx,success} from '@/api/service/index.ts'
    @Component
    export default class buttons extends Vue {
        constructor(){
            super()
        }
        Error(){
            xxx()
        }
        warning(){
            success({})
        }
    }
</script>
