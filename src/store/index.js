import Vue from 'vue';
import Vuex from 'vuex';
import {getAdminInfo} from '../api/getData'
Vue.use(Vuex);

const state = {
   adminInfo:{
       avator:'default.jpp'
   }
}

const mutations = {
    saveAdminInfo(state,adminInfo){
        state.adminInfo=adminInfo
    }
}

const actions = {
    async getAdminData({commit}){
   
        try{
        
            const res=await getAdminInfo();
            if(res.status==1){
                commit('saveAdminInfo',res)
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
    
