<template>
   <div id="app" class="fillcontain">
         <transition>
           <router-view></router-view>
         </transition>
   </div>
</template>
<script>
import {getCurrentLoginInformations} from './api/getData'
import {mapState,mapActions, mapMutations} from 'vuex'
import {getStore} from './config/mUtils'
export default {

   
}
</script>
<style lang="less" >
      @import './style/common';
      @import './assets/iconfont/iconfont.css';
</style>


