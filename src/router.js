// 导入路由
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import login from "./components/login.vue"
import index from "./components/index.vue"

//写组件
 

// 写规则
const routes=[
    {path:'/login',component:login},
    {path:'/index',component:index},
]
// 实例化路由对象
 const router = new VueRouter({
     routes
 })
// 暴露路由
export default router