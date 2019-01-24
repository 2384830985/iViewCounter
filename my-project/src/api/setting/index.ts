import request from '@/plugin/axios'

export const menu:Function = (data:Object={})=>{
    return request({
        url: '/menu',
        method: 'post',
        params: data,
        loading: {
            type: 'loading',
            options: {
            }
        }
    })
}