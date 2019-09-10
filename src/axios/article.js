
import http from './http'

//文章分页列表
export function articleSelectByPage(res) {
    return http({
        url: '/article/selectByPage',
        method: 'POST',
        params:res
    })
}
// 置顶
export function articleSetTop(articleId) {
    return http({
        url: '/article/setTop?articleId='+articleId,
        method: 'POST'
    })
}
//取消置顶
export function articleCancleTop(articleId) {
    return http({
        url: '/article/cancleTop?articleId='+articleId,
        method: 'POST'
    })
}
//下移
export function articleMoveBackward(articleId) {
    return http({
        url: '/article/moveBackward?articleId=' + articleId,
        method: 'POST'
    })
}
//上移
export function articleMoveForward(articleId) {
    return http({
        url: '/article/moveForward?articleId=' + articleId,
        method: 'POST'
    })
}
// 获取文章详情
export function articleSelectOne(articleId) {
    return http({
        url: '/article/selectOne?articleId=' + articleId,
        method: 'POST'
    })
}
// 新增
export function articleAddOrUpdateOne(res) {
    return http({
        url: '/article/addOrUpdateOne',
        method: 'POST',
        params:res
    })
}
// 删除

export function articleDeleteOne(articleId) {
    return http({
        url: '/article/deleteOne?articleId=' + articleId,
        method: 'POST',
    })
}