import axios from 'axios'
axios.defaults.timeout=5000;
// axios.defaults.baseURL='http://cangdu.org:8001'
axios.defaults.baseURL='/api'
axios.defaults.headers.post['Content-Type'] = 'application/x-www=form-urlencoded'
axios.defaults.withCredentials=true;

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