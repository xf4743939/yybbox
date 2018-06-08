import Vue from 'vue';
import Vuex from 'vuex';
import {getCurrentLoginInformations} from '../api/getData'
Vue.use(Vuex);

const state = {
    // login:false,
    userInfo:null //用户信息
}

const mutations = {
     saveUserInfo(state,userInfo){     
         state.userInfo=userInfo
     },
     getUserInfo(state,userInfo){      
         state.userInfo=userInfo
     }

}

const actions = {
    async getUserInfo({commit,state}){
        try{
        
            let res=await getCurrentLoginInformations(); //seccession
            if(res.success){
                commit('getUserInfo',res.result)
            }else{
                throw new Error(res)
            }
        }
        catch(err){
           console.log('你尚未登陆或者session失效')
        }
    }
}

export default new Vuex.Store({
    state,
    actions,
    mutations
})
    
