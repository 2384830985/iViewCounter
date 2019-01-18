// cookie 的操作
import JsCookie from 'js-cookie'

const cookie = {
    /**
     * 获取cookie
     * @param {string} res
     * @returns {string | undefined}
     */
    get: (res:string)=>{
        return JsCookie.get(res)
    },
    /**
     * 存储cookie
     * @param {string} name
     * @param {string} res
     * @param {number} expires
     * @param {string} path
     */
    set: (name:string,res:any,expires:number=7,path:string='')=>{
        return JsCookie.set(name,res,{ expires: expires, path: path })
    },
    /**
     * 删除cookie
     * @param {string} name
     */
    remove: (name:string='token')=>{
        return JsCookie.remove(name)
    }

};

export default cookie;