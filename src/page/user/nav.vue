<template>
    <el-col :span="3"  class="menu_container">
         <div class="user_info">
              <img class="avator" src="../../images/default/50x50.png">
              <span class="nickname">
                  <img  src="../../images/default/men.png" alt=""> 
                  <span class="ellipsis">醉里挑灯看剑</span>
              </span>
         </div>
         <div class="user_menu">
            <el-menu default-active='1'>
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
export default {
    
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

