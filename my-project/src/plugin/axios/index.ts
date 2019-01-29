import store from '@/store';
import util from '@/libs/util';
import aixos from 'axios';
import setting from '@/setting'
import cookie from '@/store/modules/cookie'
import { Message } from 'iview'
import Msg from '@/libs/message'
import Loading from '@/libs/loading';

const errorLog = (err:any)=>{
    // 添加打印错误 打印到控制台
    if (process.env.NODE_ENV === 'development') {
        util.log.danger('>>>>>> Error >>>>>>')
        console.log(err)
    }
    // // 显示提示
    Message.info(err.message)
}
// 创建一个 axios 实例
const service:any = aixos.create({
    baseURL: setting.baseURL,
    timeout: 10000                     // 请求超时时间
})

// 请求拦截器
service.interceptors.request.use(
        (config:any) => {
            Loading.show(config);
            if (!config.NoCookie) {
                if (cookie.state.getToken) {
                    return config
                }else {
                    Message.info('当前用户登陆已经过期')
                    Promise.reject('当前用户登陆已经过期')
                }
            }else {
                return config
            }
        },
        (error:any) => {
            // 发送失败
            console.log(error)
            Promise.reject(error)
        }
    )
// 响应拦截器
service.interceptors.response.use(
    (response:any) => {
        Loading.hide(response.config);
        const res = response;
        if (res.status !== 200) {
            Message.info(res.data.msg)
            return Promise.reject(res.msg);
        } else {
            if (res.data.code===0) {
                Msg(response.config)
                return res.data;
            }else {
                Message.info(res.data.msg)
                return Promise.reject(res.data.msg);
            }
        }
    },
    (error:any) => {
        Loading.hide(error.config);
        // loading.hide(error.config)
        if (error.response && error.response.status === 401) {
        //   util.cookies.remove()
          if (error.config.url.indexOf("logout") === -1) {
            // Message({
            //   message : '登陆信息已过期,请重新登陆!',
            //   type    : 'error',
            //   duration: 3 * 1000
            // })
          }
        //   setTimeout(() => {
        //     router.push({
        //       name: "login"
        //     });
        //   }, 1000)
        } else if (error.response && error.response.status === 500) {
          errorLog(new Error(`系统错误!: ${error.config.url}`))
        } else if (error.message && error.message.indexOf("timeout") > -1) {
          errorLog(new Error(`网络超时!: ${error.config.url}`))
        } else if (error.type === "403") {
          errorLog(new Error(`没有请求权限!: ${error.config.url}`))
        } else {
          errorLog(new Error(`网络错误!: ${error.config.url}`))
        }
        return Promise.reject(error)
      }
)

export default service;