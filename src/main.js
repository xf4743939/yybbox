// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'swiper/dist/css/swiper.min.css'
import VueForm from 'vue-form'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'
import store from './store/index'
import {getStore} from './config/mUtils';
import {getCurrentLoginInformations} from './api/getData'
import './config/filters'
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(VueAwesomeSwiper)
Vue.use(VueForm)

router.beforeEach((to,from,next) => {
   const token=JSON.parse(getStore('token'));
   const that=this;
   if(token){
     getCurrentLoginInformations().then(res=>{
        if(res.success){
            store.state.userInfo=res.result;
        }else{
          next()
        }
     })
   }else{
      next({
        path:'/login',
        query:{redirect: to.fullPath}
      })
   }
   if(to.meta.requireAuth){
      if(token){
        next()
      }
      else{
        next({
          path:'/login',
          query:{redirect: to.fullPath}
        })
      }
   }else{
      next()
   }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
 
})
