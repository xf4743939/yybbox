import axios from 'axios'
import {getStore,removeStore} from './mUtils'
import router from '../router/index'

axios.defaults.timeout=5000;
axios.defaults.baseURL="http://localhost:10088";
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
//  axios.defaults.withCredentials=true;

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
     if(error.response){
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
        }
     }
     return Promise.reject(error.response.data);  //返回接口返回的错误信息
   })



export function get(url,params={}){
  return new Promise((resolve,reject) => {
    axios.get(url,{
      params:params
    })
    .then(response => {
      resolve(response.data);
    })
    .catch(err => {
      reject(err)
    })
  })
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