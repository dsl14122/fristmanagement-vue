import Vue from 'vue'
import App from './App.vue'
// 导入饿了么UI
import ElementUI from 'element-ui'
Vue.use(ElementUI);
import 'element-ui/lib/theme-chalk/index.css';


//导入路由文件
import  router from './router.js'

//导入 网络请求的对象
import request from "./libs/http"
Vue.use(request)

Vue.config.productionTip = false
// 导入仓库文件
import store from "./store"

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')