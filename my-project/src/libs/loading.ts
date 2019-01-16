// import { Loading } from 'element-ui';
import NProgress from 'nprogress';

let loadingInstance = null;

interface config {
    loading?: {

    }
}

const loading = {
    /**
     * 显示
     * config 配置文件
     */
    show: (config:config)=>{
        if(config.loading){

        }
    },
    /**
     * 隐藏
     */
    hide: ()=>{

    }
}

export default loading;