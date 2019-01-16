
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
@Component
export default class Home extends Vue {
  private text:string = '123';
  constructor(){
    super()
  }
  render(createElement:Function) {
    return createElement(
      'div', {
      attrs: {
        id   : 'foo',
        class: 'foox'
      }
    }, [this.text]
    )
  }
}
</script>
