import request from '@/plugin/axios'

export const login:Function = (data:Object)=>{
    return request({
        url: '/login',
        method: 'post',
        data: data,
    })
}