
// 导入 axios
import axios from 'axios'
import Vue from 'vue'
// 导入路由对象
import router from '../router'
axios.defaults.baseURL='http://localhost:8888/api/private/v1/'

// 添加一个请求拦截器
axios.interceptors.request.use(function (config) {
    //  console.log(config);
   config.headers.Authorization=window.sessionStorage.getItem('token');
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

// 添加一个拦截器的反应
axios.interceptors.response.use(function (response) {
    // console.log(response);
    if(response.data.meta.status==200){
        Vue.prototype.$message.success(response.data.meta.msg)
    }else if(response.data.meta.status==400&& response.data.meta.msg=='无效token'){
        new Vue().$message.warning('git警告,再伪造token，删了你的库！')
        // 编程式导航
        router.push('login')
        //删除token
        window.sessionStorage.removeItem('token')
        response.data.data=[]
    }
    
    return response;
  }, function (error) {
    // Do something with response error
    return Promise.reject(error);
  });

//抽取网络请求的对象
const request={
    login(params){
        return axios.post('login',params)
    },

    //获取用户
    getusers(params){
        return axios.get('users',{
            params
        })
    },
    //修改用户状态
    updateStatus(params){
        return axios.put(`users/${params.id}/state/${params.type}`)
    },
    // 增加用户
    addUsers(params){
        return axios.post('users',params)
    },
    //删除用户
    deleteUsers(id){
        return axios.delete(`users/${id}`)
    },
    //根据id获取用户信息
    getuserbyid(id){
        return axios.get(`users/${id}`)
    },
    //修改用户信息
    updateUser(params){
        return  axios.put(`users/${params.id}`,{
            email:params.email,
            mobile:params.mobile,
        })
    },

    //角色列表
    getRoles(){
        return axios.get('roles')
    },
    // 分配用户角色
    updateRoles(params){
        return axios.put(`users/${params.id}/role`,{
            rid:params.rid
        })
    },
    //添加角色
    addRoles(params){
      return axios.post('roles',params)
    },
    //删除角色
    deleteRoles(id){
        return  axios.delete(`roles/${id}`)
    },
    //根据ID查询角色
    selectRolesById(id){
        return axios.get(`roles/${id}`)
    },
    // 编辑提交角色
    editRoles(params){
         return axios.put(`roles/${params.id}`,params)
    }
}

// 暴露出去 包含install方法的对象
export default{
    install(Vue){
        Vue.prototype.$request=request
    }
}