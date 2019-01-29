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
     * 数组转换字符串
     */
    TryTurnStr: (list:Array<number|string>,character:string)=>{
        let msg = '';
        list.map((res:string|number,index:number)=>{
            if (res&&res!=='') {
                if (index===list.length-1) {
                    msg += res
                }else{
                    msg += res + '' + character
                }
            }
        });
        return msg
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