<template>
   <div class="header_container">
       <el-breadcrumb>
           <el-breadcrumb-item :to="{path:'/manage'}">
             首页
           </el-breadcrumb-item>
             <el-breadcrumb-item v-for="(item,index)  in $route.meta" key="index">
               {{item}}
           </el-breadcrumb-item>
           <el-dropdown @command="handleCommand" menu-align='start'>
			<img :src="baseImgPath + adminInfo.avatar" class="avator">
			<el-dropdown-menu slot="dropdown">
				<el-dropdown-item command="home">首页</el-dropdown-item>
				<el-dropdown-item command="singout">退出</el-dropdown-item>
			</el-dropdown-menu>
		 </el-dropdown>
       </el-breadcrumb>
   </div>
</template>
<script>

import {signout} from '../api/getData'
import {baseImgPath} from '../config/env'
import {mapState,mapActions} from 'vuex'
export default {
  data(){
      return{
          baseImgPath
      }
  }
}
</script>
<style lang="less">
  @import '../style/mixin';
</style>

