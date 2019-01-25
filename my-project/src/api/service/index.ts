import request from '@/plugin/axios'

export const xxx:Function = (data:Object)=>{
    return request({
        url: '/interface/paged',
        method: 'post',
        params: data,
        loading: {
            type: 'LoadingBar',
        }
    })
}

export const success:Function = (data:Object={})=>{
    return request({
        url: '/login',
        method: 'post',
        params: data,
        loading: {
            type: 'Loading',
            size: 24
        },
        success: {
            type: 'notice',
            state: 'success',
            options: {
                title: '删除成功',
            }
        }
    })
}