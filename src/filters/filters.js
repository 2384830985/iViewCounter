import method from '../method/method.js'
const vfilters = {
    teacherLabel: items => {//主订单状态
        let title;
        method.teacherLabel.forEach(function (res) {
            if (res.val == Number(items)) {
                title = res.title
            }
        });
        return title
    },
    teacherSex:items => {//教官性别
        let title;
        method.teacherSex.forEach(function (res) {
            if (res.val == Number(items)) {
                title = res.title
            }
        });
        return title
    },
    activityType: items => { //活动类型
        let title;
        method.activityType.forEach(function (res) {
            if (res.val == Number(items)) {
                title = res.title
            }
        });
        return title
    }

}
export default vfilters