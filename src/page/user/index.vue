<template>
    <div>
        <head-top></head-top>
        <div class="main">
            <el-row>
               <nav-memu></nav-memu>
               <transition name="fade" mode="out-in">
                   <router-view></router-view>
               </transition>
             
            </el-row>
        </div>
       
        <foot-bom></foot-bom>
    </div>
</template>
<script>
import headTop from '../../components/headTop'
import footBom from '../../components/footer'
import navMemu from './nav'
import accountMain from './account'
import{mapState,mapActions} from 'vuex'

export default {
    data(){
        return{
        
        }
    },
    computed:{
       ...mapState(['userInfo'])
    },
    components:{
       headTop,
       footBom,
       navMemu,
       accountMain
    },
    methods:{
       
      
    },
    mounted(){  
      
     
    }
}
</script>
<style lang="less" >
  .main{
      margin-top: 119px;
      margin-left: auto;
      margin-right: auto;
      width: 1200px;
  }
  
</style>


