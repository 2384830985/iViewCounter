import http from './http'

//教官新增
export function teacherAddOrUpdateOne(res) {
    return http({
        url: '/teacher/addOrUpdateOne',
        method: 'POST',
        params:res
    })
}

//删除单个
export function teacherDeleteOne(teacherId) {
    return http({
        url: '/teacher/deleteOne?teacherId='+teacherId,
        method: 'POST'
    })
}
// 所有活动
export function teacherSelectActivitiesByTitle(title) {
    return http({
        url: '/teacher/selectActivitiesByTitle?title='+title,
        method: 'POST'
    })
}
//教官分页
export function teacherSelectByPage(res) {
    return http({
        url: '/teacher/selectByPage',
        method: 'POST',
        params:res
    })
}
//教官分页
export function teacherSelectOneById(teacherId) {
    return http({
        url: '/teacher/selectOneById?teacherId='+teacherId,
        method: 'POST'
    })
}
// //教官标签
// export function teacherAllLabels() {
//     return http({
//         url: '/teacher/AllLabels',
//         method: 'POST'
//     })
// }
// //枚举所有教官性别
// export function  teacherAllSex() {
//     return http({
//         url: '/teacher/teacherAllSex',
//         method: 'POST'
//     })
// }