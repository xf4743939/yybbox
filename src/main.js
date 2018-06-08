// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'swiper/dist/css/swiper.min.css'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'
import store from './store/index'
import {getStore} from './config/mUtils';

import './config/filters'
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(VueAwesomeSwiper)


router.beforeEach((to,from,next) => {

   if(to.meta.requireAuth){
      const token=JSON.parse(getStore('token'));
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
