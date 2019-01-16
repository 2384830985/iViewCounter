import store from '@/store';
import util from '@/libs/util';
import aixos from 'axios';
import {Message} from 'iview';
import {State, Action, Getter } from 'vuex-class';
import loading from '@/libs/loading';

const errorLog = (err:any)=>{
    // 添加打印错误 打印到控制台
    if (process.env.NODE_ENV === 'development') {
        util.log.danger('>>>>>> Error >>>>>>')
        console.log(err)
    }
    util.log.danger(456)
    console.log(store.state)
    // // 显示提示
    // Message.info(err.message)
}
// 创建一个 axios 实例
const service:any = aixos.create({
    baseURL: process.env.VUE_APP_API,
    timeout: 10000                     // 请求超时时间
})

// 请求拦截器
service.interceptors.request.use(
        (config:any) => {
          console.log(config)
          return config
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
        console.log(response)
        const res = response.data;
        if (res.statusCode !== 200) {
            // Message({
            //   message : res.msg,
            //   type    : 'error',
            //   duration: 3 * 1000
            // })
            return Promise.reject(res.msg);
          } else {
            // message(response.config)
            console.log(response.data)
            return res.data;
          }
    },
    (error:any) => {
        console.log(error)
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