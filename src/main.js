import Vue from 'vue';
import App from './App.vue';
import router from './router/index.js';
import iView from 'iview';
import Jump from './utils/Jump.js';
import Vfilters from './filters/filters.js';
import VueQuillEditor from 'vue-quill-editor';
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';
import 'iview/dist/styles/iview.css';
for (let key in Vfilters) {
  Vue.filter(key, Vfilters[key])
}
Vue.use(iView);
Vue.use(VueQuillEditor, {
  placeholder: '请输入内容',
});
Vue.prototype.Jump = Jump;
Vue.config.productionTip = false;
new Vue({
  render: h => h(App),
  router,
}).$mount('#app');






