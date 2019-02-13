import request from '@/plugin/axios'

export const chartsBasics:Function = (data:Object={})=>{
    return request({
        url: '/charts/basics',
        method: 'get',
        data: data,
    })
}

export const chartsBoubleBroken:Function = (data:Object={})=>{
    return request({
        url: '/charts/doubleBroken',
        method: 'get',
        data: data,
    })
}