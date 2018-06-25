import axios from 'axios'
import {getStore,removeStore} from './mUtils'
import router from '../router/index'

axios.defaults.timeout=1000;
axios.defaults.baseURL="http://192.168.1.201:10086";
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';


axios.interceptors.request.use(
  config => {
      const token=JSON.parse(getStore('token'))
      if (token) {  // 判断是否存在token，如果存在的话，则每个http header都加上token   
          const access_token=token.access_token;
          config.headers.Authorization = `Bearer ${access_token}`;
      }
      return config;
  },
  err => {
      return Promise.reject(err);
});

axios.interceptors.response.use( 
   response => {
     return response ;
   },
   error => {
     if(error && error.response){
        switch(error.response.status){
           case 401 :
           //清楚token 并跳转登陆界面
           removeStore('token');
           router.replace({
             path:'login',
             query:{
               redirect: router.currentRoute.fullPath
             }
           })
           break;
           case 400:
           error.message='错误请求'
           break;
           case 404:
           error.message = '请求错误,未找到该资源'
           break;
         case 405:
           error.message = '请求方法未允许'
           break;
         case 408:
           error.message = '请求超时'
           break;
         case 500:
           error.message = '服务器端出错'
           break;
         case 501:
           error.message = '网络未实现'
           break;
         case 502:
           error.message = '网络错误'
           break;
         case 503:
           error.message = '服务不可用'
           break;
         case 504:
           error.message = '网络超时'
           break;
         case 505:
           error.message = 'http版本不支持该请求'
           break;
         default:
           error.message = `连接错误${err.response.status}`
        }
     }else{
       error.message= "连接到服务器失败"
     }
     console.log(error.message)
     return Promise.reject(error.response);  //返回接口返回的错误信息
   })



export function all(request){
   return axios.all(request)
}

export function spread(func){
  return axios.spread(func)
}

export function postList(url,data={}){
  return  axios.post(url,data)
} 

export function post(url,data = {}){

	return new Promise((resolve,reject) => {
		axios.post(url,data)
				 .then(response => {          
        	 resolve(response.data);
				 },err => {           
					 reject(err)
				 })
	})
}