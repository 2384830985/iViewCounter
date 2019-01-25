const Jump = {
    /**
     * 深拷贝
     * res 需要深拷贝的值
     */
    Copy: (res:any)=>{
        if (!res) return '';
        let obj:any;
        obj=JSON.parse(JSON.stringify(res));
        return obj
    },
    /**
     * 线程睡眠
     * @param {number} d 睡眠时间
     * @constructor
     */
    Sleep: (d:number)=>{
        let now:Date = new Date();
        let exitTime = now.getTime() + d;
        while (true) {
            now = new Date();
            if (now.getTime() > exitTime)
                return;
        }
    },
}

export default Jump;