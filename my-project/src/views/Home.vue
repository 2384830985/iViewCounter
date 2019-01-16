<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
import Util from './../libs/util'
import * as xx from '../api/service'
@Component({
  components: {
    HelloWorld,
  },
})
export default class Home extends Vue {
    constructor(){
        Util.log.capsule('D2Admin', 'ErrorHandler', 'success')
        Util.log.default(1,'home')
        Util.log.primary(1,'home')
        Util.log.success(1,'home')
        Util.log.warning(1)
        Util.log.danger(1)
        super()
    }
    /**
     * 开始执行
     */
    created() {
      // xx.xxx({})
      //   .then((res:object)=>{
      //     console.log(res)
      //   })
    }

    
    
}
</script>
