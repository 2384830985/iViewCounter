import { Message,Notice,Modal} from 'iview'
interface InterfaceMsgConfig {
    success: {
        type: string,
        state: string,
        options: object
    }
}
export default (config:InterfaceMsgConfig)=>{
    if (config && config.success) {
        // 上方message
        if (config.success.type === 'message') {
            Message[config.success.state](config.success.options)
        // 左侧message
        }else if(config.success.type === 'notice'){
            Notice[config.success.state](config.success.options);
        // 模态框
        }else if(config.success.type === 'modal'){
            Modal[config.success.state](config.success.options);
        }
    }
};