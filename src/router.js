// 导入路由
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import login from "./components/login.vue"
import index from "./components/index.vue"
import users from "./components/users.vue"
import roles from "./components/roles.vue"
import rights from "./components/rights.vue"
import goods from "./components/goods.vue"
import params from "./components/params.vue"
import categories from "./components/categories.vue"
import orders from "./components/orders.vue"
import reports from "./components/reports.vue"
import error from "./components/error.vue"
import goodsList from "./components/goodsList.vue"
import goodsAdd from "./components/goodsAdd.vue"

//写组件
 

// 写规则
const routes=[
    {path:'/login',component:login},
    {path:'/',component:index,children:[
        {path:"",redirect:'users'},
        {path:"users",component:users},
        {path:"roles",component:roles},
        {path:"rights",component:rights},
        {
            path:"goods",
            component:goods,
            children:[
                { path:"add",component:goodsAdd},
                { path:"",component:goodsList},
            ]
        
         },
        {path:"params",component:params},
        {path:"categories",component:categories},
        {path:"orders",component:orders},
        {path:"reports",component:reports},
        {path:"error",component:error},

    ]},
]
// 实例化路由对象
 const router = new VueRouter({
      mode: 'history',
     routes
 })
  //导航前置守卫
 router.beforeEach((to, from, next) => {
     if(to.matched.length==0){
        next('/error');
     }else{
         next();
     }
  })
// 暴露路由
export default router