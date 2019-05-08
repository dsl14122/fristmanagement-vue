
// 导入 axios
import axios from 'axios'
import Vue from 'vue'
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
    }
}

// 暴露出去 包含install方法的对象
export default{
    install(Vue){
        Vue.prototype.$request=request
    }
}