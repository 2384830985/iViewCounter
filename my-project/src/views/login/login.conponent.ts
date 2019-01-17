import { Component, Vue } from 'vue-property-decorator';
import { Particles } from '@/components/vueparticles'
import { login } from "@/api/login";

/**
 * 账号的校验
 */
interface interFaceForm{
    name    : string,
    password: string,
}

/**
 * 登陆的校验
 */
interface LoginRulesFun{
    name: {
        required : boolean,
        trigger  : string,
        validator: Function,
    };
    password: {
        required : boolean,
        trigger  : string,
        validator: Function,
    };
}

@Component({
    components: {
        Particles,
    }
})
export default class Login extends Vue {
    // 非空断言
    $refs!:{
        sizeForm: HTMLFormElement;
    }
    /**
     * 变量的校验
     */
    private sizeForm:interFaceForm = {
        name    : '',
        password: ''
    }
    /**
     * 表单校验
     */
    private loginRules: LoginRulesFun = {
        name: {
            required : false,
            trigger  : 'change',
            validator: (rule: any, value: string, callback: (res?: any) => {}) => {
                if (!value) {
                    callback(new Error('请输入登陆账号'));
                } else {
                    callback();
                }
            },
        },
        password: {
            required : false,
            trigger  : 'change',
            validator: (rule: any, value: string, callback: (res?: any) => {}) => {
                if (!value) {
                    callback(new Error('请输入密码'));
                } else {
                    if (value.length < 5) {
                        callback(new Error('密码不能小于5位'));
                    } else {
                        callback();
                    }
                }
            },
        },
    }

    constructor(){
        super()
    }
    /**
     * 登陆
     */
    submit(){
        let _this = this;
        this.$refs.sizeForm.validate((valid:Object) => {
            console.log(valid)
            if (valid) {
                login(this.sizeForm).then((res:any)=>{
                    if (res.code===0) {
                        this.$Message.success('登陆成功');
                        _this.$router.push('content')
                    }else {
                        this.$Message.error(res.data.msg);
                    }
                    console.log(res)
                })
            } else {
                console.log('error submit!!');
                return false;
            }
        });
    }
}