import TContent from './t-content/index.vue'
import TTitle from './t-content-title/index.vue'
import TContentCon from './t-content-con/index.vue'
const components:Array<object> = [
    TContent,
    TTitle,
    TContentCon,
];

const install:Function = (Vue:any,opts:object = {})=> {
    components.map((component:any) => {
        Vue.component(component.name, component);
    });
};

const win:any = window;

/* istanbul ignore if */
if (typeof win !== 'undefined' && win.Vue) {
    install(win.Vue);
}

export default {
    install,
    TContent,
    TTitle,
    TContentCon,
};