import iView from 'iview';
import Jump from '@/libs/overallSituation.ts'
let loadingInstance = null;
// iView.LoadingBar.start();
// iView.LoadingBar.finish();
// iView.LoadingBar.error();
interface interfaceConfig {
    loading: {
        type: string,
        time: number
    }
}

const Loading = {
    /**
     * 显示
     * config 配置文件
     */
    show: (config:interfaceConfig)=>{
        if(config.loading){
            if (config.loading.type==="LoadingBar") {
                iView.LoadingBar.start();
            }
            if (config.loading.type==="Loading") {
                iView.Spin.show();
            }
        }
    },
    /**
     * 隐藏
     */
    hide: (config:interfaceConfig)=>{
        if(config.loading){
            setTimeout(()=>{
                if (config.loading.type==="LoadingBar") {
                    iView.LoadingBar.finish();
                }
                if (config.loading.type==="Loading") {
                    iView.Spin.hide();
                }
            },config.loading.time||500)
        }
    }
}

export default Loading;