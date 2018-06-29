<template>
     <div class="setting_main">
          <el-menu :default-active="activeIndex" class="el-munu-demo" mode="horizontal" @select="navClick">
                <el-menu-item index="1">推广用户</el-menu-item>
                <el-menu-item index="2">我的用户</el-menu-item>
          </el-menu>
          <transition> 
                <router-view></router-view>
          </transition>
     </div>
</template>
<script>
import{mapState,mapActions} from 'vuex'

export default {
    data(){
        return{
            activeIndex:'1',
        }
    },
    methods:{ 
        navClick(key,keyPath){
            if(parseInt(key)===1){
               this.$router.push({path:'/user/shareMoney/seouser'})
            }else{
                 this.$router.push({path:'/user/shareMoney/myuser'})
            }
        }
    },
    mounted () {
        let url=this.$route.path;
        let subUrl=url.substring(url.lastIndexOf('/')+1)
        if(subUrl=='seouser'){
            this.activeIndex='1'
        }else if(subUrl=='myuser'){
            this.activeIndex='2'
        } 
    }
}
</script>
<style lang="less" scoped>
  .setting_main{
      width: 1035px;
      float: right;
      margin-top: 20px;
      min-height:730px ;
      background: #fff;
      .el-menu-item{
          color: #333;
      }
      .el-menu--horizontal{
          >.is-active{
              border-bottom: 2px solid #fc543c;
              color: #fc543c;
          }
      }

  }
</style>



