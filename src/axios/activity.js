
import http from './http'
//文章分页列表
export function activitySelectByPage(res) {
    return http({
        url: '/activity/selectByPage',
        method: 'POST',
        params:res
    })
}
// 删除
export function activityDeleteOne(activityId) {
    return http({
        url: '/activity/deleteOne?activityId='+activityId,
        method: 'POST'
    })
}
//提前结束
export function activityEndOne(activityId) {
    return http({
        url: '/activity/endOne?activityId='+activityId,
        method: 'POST'
    })
}
//todo
export function activityFindTeachersByName(name) {
    return http({
        url: '/activity/findTeachersByName?name=' + name,
        method: 'POST'
    })
}
//增加新活动
export function activityAddOrUpdateOne(res) {
    return http({
        url: '/activity/addOrUpdateOne',
        method: 'POST',
        params:res
    })
}
// 获取文章详情
export function  activitySelectOneById(activityId) {
    return http({
        url: '/activity/selectOneById?activityId=' + activityId,
        method: 'POST'
    })
}