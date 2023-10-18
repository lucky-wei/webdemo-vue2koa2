import axios from 'axios'

// 请求头
axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'

// 创建axios实例
const service = axios.create({
    // URL公共部分
    baseURL:"",
    // 超时
    timeout:10000
})

// rquest拦截器
// service.interceptors.request.use()

/*
**  API请求正常
	OK: 200,
	// 403 服务器理解请求客户端的请求，但是拒绝执行此请求
	// 301 资源地址永久迁移新地址，浏览器自动跳转到新地址
	// 401 要求用户身份验证
    // 500 服务器内部错误
    // 600 源站没有返回响应头部，只返回实体内容
    // 601
	//1100003 token超时
*/
//response拦截器
service.interceptors.response.use(res=>{
    if(res.code === 401){
        //登录验证
        
    }else if(res.code !== 200){
        return Promise.reject('error')
    }else{
        return res.data
    }
},error=>{
    console.log(error)
})