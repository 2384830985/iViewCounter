//  例子特效
<template>
    <div>
        <vue-particles 
                color          = "#dedede"
              :particleOpacity = "0.7"
              :particlesNumber = "100"
                shapeType      = "circle"
              :particleSize    = "4"
                linesColor     = "#dedede"
              :linesWidth      = "1"
              :lineLinked      = "true"
              :lineOpacity     = "0.4"
              :linesDistance   = "150"
              :moveSpeed       = "3"
              :hoverEffect     = "true"
                hoverMode      = "grab"
              :clickEffect     = "true"
                clickMode      = "push"
        ></vue-particles>
    </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Particles extends Vue {
    created() {
      console.log(1);
    }
}
</script>

