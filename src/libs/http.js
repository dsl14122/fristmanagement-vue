
// 导入 axios
// import axios from 'axios'

//抽取网络请求的对象
const request={
    sayHi(){
      console.log('你好');
 
    }
}

// 暴露出去 包含install方法的对象
export default{
    install(Vue){
        Vue.prototype.$request=request
    }
}