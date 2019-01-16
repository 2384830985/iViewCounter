import request from '@/plugin/axios'

export const xxx:Function = (data:Object)=>{
    return request({
        url: '/interface/paged',
        method: 'post',
        params: data,
        loading: {
            type: 'loading',
            options: {
            }
        }
    })
}