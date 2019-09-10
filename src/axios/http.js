import Axios from 'axios';
import confing from '@/axios/confing.js';
const httpServer =(opts,data)=>{
    let  httpData= {
        // 请求使用方法
        method: opts.method || 'post',
        // url
        url: opts.url,
        //baseURL
        // baseURL: "/api",
        baseURL: confing.url,
        data: opts.params,
        //请求时间，超时中断
        timeout: 10000,
        headers: opts.method=='get'? {
            'X-Requested-With': 'XMLHttpRequest',
            'Accept': 'application/json',
            'Content-Type': 'application/json,charset=UTF-8',
        }:{
            'Accept': 'application/json'
        },
     
    };
   
    let promise = new Promise(function(resolve, reject) {
        Axios(httpData).then(
          
            (res) => {
                if (res.status===200&&res.data.code!==-1) {
                    // 成功后是否弹框
                    resolve(res.data)
                }else {
                    reject(res)
                }
            }
        ).catch(
            (response) => {
                reject(response)
            }
        )
    });
    return promise;
};
export default httpServer