function formatNumber(n) {
    n = n.toString()
    return n[1] ? n : '0' + n
}
//数据转化


function weekChange(n) {
    switch (n) {
        case 1:
            return " 周一";
            break;
        case 2:
            return "周二";
            break;
        case 3:
            return "周三";
            break;
        case 4:
            return "周四";
            break;
        case 5:
            return "周五";
            break;
        case 6:
            return "周六";
            break;
        case 0:
            return "周日";
            break;
    }
}
export default {
    Jumps: (url, params, ret) => { // 获取页面跳转url    url:url  params:当前url上的数据 res:循环的值
        // console.log(url)
        for (let rets in ret) {   //variable 为属性名
            if (ret[rets] === '') {
                ret[rets] = 'empty'
            } else if (ret[rets] == null) {
                delete ret[rets]
            }
        }
        let u = url.split(':')[0].split('"')[1]  // 获取基础url
        var repeat1 = (variable, params) => {
            let index = 1
            for (let req in ret) {
                if (req == variable) {
                    index++
                    u += ret[req] + '/'
                }
            }
            if (index == 1) {
                if (params[variable] == undefined) {
                    u += 'empty/'
                } else {
                    u += params[variable] + '/'
                }
            }
        }
        for (let variable in params) {   //variable 为属性名
            repeat1(variable, params)
        }
        let basic = u.substr(0, u.length - 1);
        return basic
    },
    params: (params) => { //获取当前要传的所有值
        let data = {};
        for (let variable in params) {   //variable 为属性名
            if (params[variable] == 'empty') {
                data[variable] = null
            } else {
                data[variable] = params[variable]
            }
        }
        return data
    },
    deep: (params) => {//深拷贝
        if (params !== 0) {
            if (!params) return '';
        }
        let obj = {};
        obj = JSON.parse(JSON.stringify(params));
        return obj
    },
    searchOf: (params) => {
        let url = '';
        let index = 0;
        for (let variable in params) {   // variable 为属性名
            if (params[variable] !== '' && params[variable] !== null) {
                if (index === 0) {
                    url += `?${variable}=${params[variable]}`;
                } else {
                    url += `&${variable}=${params[variable]}`;
                }
                ++index;
            }
        }
        return url;
    },
    dateTransform: (date) => {
        let d = new Date(date);
        let dateT = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + (d.getHours() ? d.getHours() : '00') + ':' + (d.getMinutes() ? d.getMinutes() : '00') + ':' + (d.getSeconds() ? d.getSeconds() : '00');
        return dateT
    },


    /**
     * 时间戳转化为年 月 日 时 分 秒
     * number: 传入时间戳
     * format：返回格式，支持自定义，但参数必须与formateArr里保持一致
     */
    formatDate: function (value) {
        let date = new Date(value);
        let y = date.getFullYear();
        let MM = date.getMonth() + 1;
        MM = MM < 10 ? ('0' + MM) : MM;
        let d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        let h = date.getHours();
        h = h < 10 ? ('0' + h) : h;
        let m = date.getMinutes();
        m = m < 10 ? ('0' + m) : m;
        let s = date.getSeconds();
        s = s < 10 ? ('0' + s) : s;
        return y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s;
    },
    
    deleteStr:function(testStr){
        let resultStr=testStr.replace(/\s+/g,"");//去掉空格
        resultStr=testStr.replace(/[ ]/g,"");    //去掉空格
        resultStr=testStr.replace(/[\r\n]/g,"");//去掉回车换行
        return resultStr
    }
}