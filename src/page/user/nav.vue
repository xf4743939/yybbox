<template>
    <el-col :span="3"  class="menu_container">
         <div class="user_info" v-if="user">
              <img class="avator" :src="avatorUrl">
              <span class="nickname">
                  <img  :src="sexUrl" alt=""> 
                  <span class="ellipsis">{{ user.nickname }}</span>
              </span>
         </div>
         <div class="user_menu">
            <el-menu :default-active='activeIndex' @select="navClick">
                  <el-menu-item index="1">
                        <i class="iconfont icon-moban"></i>
                        <span slot="title">账户总览</span>
                  </el-menu-item>
                  <el-menu-item index="2">
                        <i class="iconfont icon-yonghuguanli "></i>
                        <span slot="title">个人设置</span>
                  </el-menu-item>
                  <el-menu-item index="3" >
                        <i class="iconfont icon-zhanghu"></i>
                        <span slot="title">账户安全</span>
                  </el-menu-item>
                  <el-menu-item index="4">
                        <i class="iconfont icon-fabu"></i>
                        <span slot="title">分享赚钱</span>
                  </el-menu-item>
            </el-menu> 
         </div>
    </el-col>
</template>
<script>
import {getStore} from '../../config/mUtils'
import {getCurrentLoginInformations} from '../../api/getData'
import{mapState,mapActions} from 'vuex'
import { prdUrl} from '../../constants/enum'
export default {
    data(){
          return{
             user:null,
             avatorUrl:require('../../images/trade/50x50.png'),
             sexUrl:require('../../images/trade/50x50.png'),
             activeIndex:'1'
          }
    },
    computed:{
          ...mapState(['userInfo'])
    },
    methods:{
              ...mapActions(['getUserInfo']),
            //如果没有全局userInfo就重新请求
            async getInfo(){
                if(!this.userInfo){
                    let res= await getCurrentLoginInformations();
                        if(res && res.success){
                         this.user=res.result.user;
                         this.getUrl()
                        }else{
                            message(this,res)
                        }
                }else{
                    this.user=this.userInfo.user;  
                    this.getUrl()        
                }   
            }, 
            getUrl(){
               
                     if(this.user && this.user.icon){
                           this.avatorUrl=prdUrl + this.user.icon
                        }
                        if(this.user.sex===0){
                           this.sexUrl=require('../../images/trade/50x50.png')
                        }
                        else if(this.user.sex===1){
                           this.sexUrl=require('../../images/default/men.png')
                        }else if(this.user.sex===2){         
                           this.sexUrl=require('../../images/default/women.png')
                        }
            }, 
          navClick(key,keyPath){
             this.activeIndex=''+ key;
             if(key==1){
               this.$router.push({path:'/user/index'})
             }else if(key==2){
                this.$router.push({path:'/user/setting'}) 
             }else if(key==3){
                 this.$router.push({path:'/user/safe'}) 
             }else{
                  this.$router.push({path:'/user/shareMoney'}) 
             }
          },
          getActiveIndex(){
                let curUrl=this.$route.path  //全路径
                let getUrl=this.$route.path.substring(curUrl.lastIndexOf('/')+1); //路径的最后一个
               
                switch(getUrl.toLowerCase()){
                      case 'index':
                      this.activeIndex='1'
                      break;
                      case 'setting':
                      this.activeIndex='2'
                      break;
                      case 'info':
                      this.activeIndex='2'
                      break;
                      case 'avator':
                      this.activeIndex='2'
                      break;
                      case 'safe':
                      this.activeIndex='3'
                      break;
                      case 'oauth':
                      this.activeIndex='3'
                      break;
                      case 'bankcard':
                      this.activeIndex='3'
                      break;
                      case 'phonenumber':
                      this.activeIndex='3'
                      break;
                      case 'email':
                      this.activeIndex='3'
                      break;
                      case 'loginpwd':
                      this.activeIndex='3'
                      break;
                      case 'getmoneypwd':
                      this.activeIndex='3'
                      break;
                      case 'sharemoney':
                      this.activeIndex='4'
                      break
                      case 'myuser':
                        this.activeIndex='4'
                      break;
                        case 'seouser':
                        this.activeIndex='4'
                      break;
                      default:
                      this.activeIndex='1'
                }
          }
    },
    mounted(){
          this.getActiveIndex();
          this.getInfo()
    }
}
</script>


<style lang="less" >
   .menu_container{      
         background: #fff;
         margin-top: 20px;
         height:730px ;
         .user_info{
               .avator{
                     display: block;
                     width: 50px;
                     height: 50px;
                     overflow: hidden;
                     border-radius: 50%;
                     margin-left: 50px;
                     margin-top: 30px;
               }
               .nickname{
                     display: inline-block;
                     margin-left: 19px;
                     margin-top: 13px;
                     img{
                           width: 18px;
                           height: 18px;
                           overflow: hidden;
                           border-radius: 50%;
                           position: relative;
                     }
                     span{
                           display: inline-block;
                           width: 104px;
                           font-weight: bold;
                           font-size: 12px;
                     }
               }
         }
         .user_menu{
            .el-menu{
                  margin-top: 20px;
                  li{
                        text-align:center;
                  }
                  .is-active{
                        color: #fff;
                        background: #FC524C;
                  }
            }
         }
   }
</style>

