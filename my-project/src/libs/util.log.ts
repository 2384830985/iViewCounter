/**
 * @description 返回这个样式的颜色值
 * @param {String} type 样式名称 [ primary | success | warning | danger | text ]
 */
const typeColor = (type:string = 'default') =>{
    let color;
    switch (type) {
    case 'default':   // 默认颜色
        color = '#35495E';
        break;
    case 'primary':   // 主颜色
        color = '#3488ff';
        break;
    case 'success':   // 成功颜色
        color = '#43B883';
        break;
    case 'warning':   // 警告颜色
        color = '#e6a23c';
        break;
    case 'danger':   // 错误颜色
        color = '#f56c6c';
        break;
    default: 
        break;
    }
    return color;
}

let log = {

    /**
     * @description 打印一个 [ title | text ] 样式的信息
     * @param {String} title title text
     * @param {String} info info text
     * @param {String} type style
     */
    capsule:(title:string, info:string, type:string = 'primary')=> {
        console.log(
            `%c ${title} %c ${info} %c`,
            'background:#35495E; padding: 1px; border-radius: 3px 0 0 3px; color: #fff;',
            `background:${typeColor(type)}; padding: 1px; border-radius: 0 3px 3px 0;  color: #fff;`,
            'background:transparent'
        )
    },

    /**
     * 打印文字
     * @param textArr
     */
    colorful:(textArr:any)=>{
        console.log(
            `%c${textArr.map((t:any) => t.text || '').join('%c')}`,
            ...textArr.map((t:any) => `color: ${typeColor(t.type)};`)
        )
    },

    /**
     * 默认样式
     * @param {string | number} text
     */
    default:(text:string|number,mark?:string)=>{
           text        = '====>'+ text;
        if (mark) text = mark+': ' + text;
        log.colorful([{ text }])
    },
    
    /**
     * @description 打印 primary 样式的文字
     */
    primary:(text:string|number,mark?:string)=>{
           text        = '====>'+ text;
        if (mark) text = mark+': ' + text;
        log.colorful([{ text, type: 'primary' }])
    },

    /**
     * @description 打印 success 样式的文字
     */
    success: (text:string|number,mark?:string)=>{
           text        = '====>'+ text;
        if (mark) text = mark+': ' + text;
        log.colorful([{ text, type: 'success' }])
    },

    /**
     * @description 打印 warning 样式的文字
     */
    warning: (text:string|number,mark?:string)=>{
              text        = '====>'+ text;
           if (mark) text = mark+': ' + text;
        log.colorful([{ text, type: 'warning' }])
    },

    /**
     * @description 打印 danger 样式的文字
     */
    danger: (text:string|number,mark?:string)=>{
           text        = '====>'+ text;
        if (mark) text = mark+': ' + text;
        log.colorful([{ text, type: 'danger' }])
    }

}

export default log;