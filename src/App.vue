<template>
   <div id="app" class="fillcontain">
         <transition>
           <router-view v-if="isRouterAlive"></router-view>
         </transition>
   </div>
</template>
<script>
import {getCurrentLoginInformations} from './api/getData'
import {mapState,mapActions, mapMutations} from 'vuex'
import {getStore} from './config/mUtils'
export default {
   
     provide(){
        return{
            reload:this.reload()
        }
     },
     data(){
           return{
                 isRouterAlive:true
           }
     },
     methods:{
           reload(){
              
                 this.isRouterAlive=false;
                 this.$nextTick(function(){
                       this.isRouterAlive=true
                 })
           }
     }
}
</script>
<style lang="less" >
      @import './style/common';
      @import './assets/iconfont/iconfont.css';
</style>


