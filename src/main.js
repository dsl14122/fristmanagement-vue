import Vue from 'vue'
import App from './App.vue'
// 导入饿了么UI
import ElementUI from 'element-ui'
Vue.use(ElementUI);
import 'element-ui/lib/theme-chalk/index.css';


//导入路由文件
import  router from './router.js'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')


