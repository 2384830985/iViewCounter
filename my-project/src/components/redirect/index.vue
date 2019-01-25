<script>
    import {Vue ,Component} from 'vue-property-decorator'

    @Component({
        beforeCreate(){
            this.$router.replace(`/${this.$route.params.route}`)
        },
        render(h){
            h()
        }
    })
    export default class Redirect extends Vue{

    }
</script>
