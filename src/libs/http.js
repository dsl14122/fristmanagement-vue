
// 导入 axios
import axios from 'axios'

axios.defaults.baseURL='http://localhost:8888/api/private/v1/'
//抽取网络请求的对象
const request={
    login(params){
        return axios.post('login',params)
    },
    //获取用户
    getusers(params){
        return axios.get('users',{
            params,
            headers:{
                Authorization:window.sessionStorage.getItem('token')
            }
        })
    }
}

// 暴露出去 包含install方法的对象
export default{
    install(Vue){
        Vue.prototype.$request=request
    }
}