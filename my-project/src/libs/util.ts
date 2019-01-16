import log from './util.log'

let util = {
    log,
    /**
     * @description 更新标题
     * @param {String} title 标题
     */
    title: (titleText:string)=> {
    const processTitle          = process.env.VUE_APP_TITLE || 'admin'
          window.document.title = `${processTitle}${titleText ? ` | ${titleText}` : ''}`
    },
    /**
     * @description 打开新页面
     * @param {String} url 地址
     */
    open : (url:string)=> {
        let a = document.createElement('a');
        a.setAttribute('href', url);
        a.setAttribute('target', '_blank');
        a.setAttribute('id', 'd2admin-menu-link');
        document.body.appendChild(a);
        a.click();
        let dom:any = document.getElementById('d2admin-menu-link');
        document.body.removeChild(dom);
    }
}


export default util;