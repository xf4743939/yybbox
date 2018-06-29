<template>
     <div class="header_container clear">
    
        <div class="header_top">
            
                <!-- ios image -->
                <div class='tip' v-if="isShowIos" >
                    <span class='mask'>
                    <span class='tip_color'>敬请期待...</span>
                    <span class='cover'>
                        <img  src="../images/default/ios.png" width="137" height="156" /></span>
                    </span>
                </div>

                <div class="header_main" style="height: 100%;">
                    <div class="main_left">
                        <img src="../images/default/tel.png"/>
                        <p>
                            <span style="font-size: 17px; color: #F25E5E; font-weight: 600;">400-8388-563</span>
                            <span style="font-size: 13px; color: #a4a4a4; margin-left: 10px">周一至周五工作日</span>
                            <span style="font-size: 9px; color: #a4a4a4;">09:00-23:00</span>
                        </p>
                        <p>
                        </p>
                    </div>
                    <div class="main_center">
                        <div class="center_android" @mouseover="over" @mouseout="out">
                            <img src="../images/default/phone2.png" />
                            <p>安卓APP下载</p>
                            <!-- android -->
                            <div v-if="true" class=tip><img src="../images/default/Android.png" width="137" height="156" /></div>
                        </div>
                        <div class="center_ios" >
                            <img src="../images/default/phone2.png" />
                            <p>苹果APP下载</p>                
                        </div>
                    </div>
                    <div class="main_right" style="height: 100%;">
                        <div id="userINFO" class="head_category" v-cloak>
                            <div v-if="userInfos"  style="min-width: 200px; height: 100%;" class="loginInfo" index="1">
                                <a style="min-width: 150px; margin-right: 3px;">
                                    <img class="header-avator" :src="imgUrl"/>
                                    <span class="nickName" style="height: 100%; line-height: 40px;">{{userInfos.nickname}}</span>
                                    <span class="phoneNumber" style="height: 100%; line-height: 40px; margin-top: 3px; margin-right: 8px;">{{userInfos.phoneNumber | subStr(4,4)}}</span>
                                </a>
                                <a  @click="logOut" style="margin-top: 2px; cursor: pointer;line-height: 40px;">退出登陆</a>
                            </div>
                            <div v-if="!userInfos" class="logout_class" index="2">
                                <a class="b41" href="/login" style="background: #b1b1b1; color: #fff;">登录</a>
                                <a class="b42" href="/register" style="color: #fff;">注册</a>
                            </div>
                        </div>           
                    </div>
                </div>
        </div>
        <div class="nav nav_menu" v-cloak >
            <div class="nav_content">
                <img src="../images/default/logo.png"/>
                <el-menu id="munus_top" class="el-menu-demo" mode="horizontal" v-on:select="handleSelect" >
                    <el-menu-item v-bind:style="{ 'border-bottom-color':activeIndex==1 ? '#EF5E5D':'' }" v-bind:class="activeIndex==1 ? 'isActive' : '' " index="1">
                        <router-link to="/">首页</router-link> 
                   </el-menu-item>
                    <el-menu-item v-bind:style="{ 'border-bottom-color':activeIndex==2 ? '#EF5E5D':'' }" v-bind:class="activeIndex==2 ? 'isActive' : '' " index="2">
                        <router-link to="/trader">策略投资</router-link> 
                    </el-menu-item>
                    <el-menu-item v-bind:style="{ 'border-bottom-color':activeIndex==3 ? '#EF5E5D':'' }" v-bind:class="activeIndex==3 ? 'isActive' : '' " index="3">
                        <router-link to="/follower">跟投牛人</router-link>
                    </el-menu-item>
                    <el-menu-item index="4" v-bind:style="{ 'border-bottom-color':activeIndex==4 ? '#EF5E5D':'' }" v-bind:class="activeIndex==4 ? 'isActive' : '' ">
                           <router-link to="/game">模拟大赛</router-link>                  
                    </el-menu-item>
                    <el-menu-item index="5" v-bind:style="{ 'border-bottom-color':activeIndex==5 ? '#EF5E5D':'' }"  v-bind:class="activeIndex==5 ? 'isActive' : '' ">                
                            <router-link to="/user/index">个人中心</router-link>
                    </el-menu-item>
                </el-menu>
            </div>
       </div>
   </div>
</template>
<script>
 import {mapState,mapActions, mapMutations} from 'vuex'
 import {getStore, removeStore} from '../config/mUtils'
import {getCurrentLoginInformations} from '../api/getData'
import {prdUrl} from '../constants/enum'
 export default {
    data(){
        return{
           isShowAd:false, //android img 显隐
           isShowIos:false,
           activeIndex:1,
           userInfos:null,
           imgUrl:require('../images/trade/50x50.png'),//默认头像
           prdUrl:prdUrl,
           isHave:false
        }
    },
    computed:{     
      ...mapState(["userInfo"])
    },
    methods:{
        over(e){   
         
              this.isShowAd=true;
        },
        out(e){ 
           this.isShowAd=false       
        },
        handleSelect(){
           this.activeIndex=1;
        },
        getCurrentIndex(){
                   let a=window.location.pathname; 
                   let url = a.substring(a.indexOf('/')+1) //获取URL
                   if(url.indexOf('/')>0){
                       url=url.substring(0,url.indexOf('/'))
                   }
                 
                   switch(url.toLowerCase()){
                       case 'trader':
                         this.activeIndex = 2;
                       break;
                         case 'follower':
                         this.activeIndex = 3;
                       break;
                         case 'login':
                         this.activeIndex =1;
                       break;
                         case 'register':
                         this.activeIndex = 1;
                       break;
                         case 'forgetpassword':
                         this.activeIndex = 1;
                       break;
                         case 'user':
                         this.activeIndex = 5;
                       break;
                         case 'groupdetail':
                         this.activeIndex = 2;
                       break;
                         case 'tradedetail':
                         this.activeIndex = 2;
                       break;
                        case 'followdetail':
                         this.activeIndex = 3;
                       break;
                         case 'game':
                         this.activeIndex =4;
                       break;
                       default:
                       this.activeIndex=1
                       
                   }
        },
        logOut(){
           removeStore('token');
           removeStore('userInfo');
           this.$router.go(0);
        },
       async initData(){
          let res=await getCurrentLoginInformations();       
          if(res && res.success){
              this.userInfos=res.result.user;
             if(!res.result.user.icon){
                   this.imgUrl=require('../images/trade/50x50.png')    
             }else{
                  this.imgUrl=this.prdUrl + this.userInfos.icon;     
             }
          }else{
             console.log(res.error.message)  
          }     
      },
      getInfo(){
            const token = JSON.parse(getStore('token'));
            let info=JSON.parse(getStore('userInfo'))
            if(token){
                if(!info){
                this.initData();
                }else{
                    this.userInfos=info.user;
                    if(!info.user.icon){
                    this.imgUrl=require('../images/trade/50x50.png')    
                }else{
                    this.imgUrl=this.prdUrl + this.userInfos.icon;     
                }  
                }
            }else{
            this.userInfos=null;
            }
       }
    },
    mounted(){   
        this.getCurrentIndex();
        this.getInfo()
    }
}
</script>
<style lang="less" >
[v-cloak] {
    display: none;
}
   .header_container{
       height: 119px;
       .el-menu--horizontal>.el-menu-item.is-active{
           border-bottom: 2px solid #fc543c;
       }
   }
    .header_top{
        background: #f5f5f5;
        height: 40px;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 1500;
        width: 100%;
        .tip{
           position: absolute;
           display: none;
           z-index:1300 ;
           .mask{
                position: relative;
                height: 100%;
                display: inline-block;
                .tip_color{
                       position: absolute;
                        color: #fff;
                        display: inline-block;
                        width: 120px;
                        z-index: 999;
                        top: 40%;  
                        left: 10%;
                }
           }
           .cover{
                 width: 136px;
                height: 100%;
                display: inline-block;
                background: rgba(0, 0, 0, 0.4);
                z-index: 100;
                opacity: 0.3;
                color: #fff;
           }
        }
        .header_main{
            width: 1200px;
            margin: 0 auto;
            overflow: hidden;
            .main_left{
                overflow: hidden;
                float: left;
                img{
                    margin-top: 10px;
                    display: block;
                    float: left;
                }
                p{
                    float: left;
                    margin-left: 10px;
                    margin-top: 10px;
                }
            }
            .main_center{
                float: left;
                margin-left: 240px;
                .center_android,.center_ios{
                    float: left;
                    cursor: pointer;
                    img{
                        display: block;
                        margin-top: 9px;
                        margin-right: 6px;
                        float: left;
                        border:0;
                    }
                    p{
                       color: #999999;
                       width: 130px;
                       margin-top: 10px; 
                    }
                }
             
            }
            .main_right{
                float: right;
                border-radius: 2px;
                overflow: hidden;
            }
            #userINFO{
                margin-right: 14px;
                min-width: 200px;
                height: 100%;
                a{
                        display: block;
                        min-width: 60px;
                        height: 100%;
                        color: #ff7301;
                        float: left;
                        text-align: center;
                        font-size: 14px;
                        max-width: 300px;
                       
                }
                img{
                   position: relative;
                    top: -9px;
                    height: 22px;
                    width: 22px;
                    display: inline-block;
                    border-radius: 50%; 
                }
                span{
                        display: inline-block;
                        position: relative;
                        margin-left: 10px;
                        color:#333;
                        font-size: 14px;
                        max-width: 120px;
                        overflow: hidden;
                        text-overflow: ellipsis;
                }
                .logout_class{
                    display: block;
                    margin-top: 10px;
                    float: right;
                }
                .b42{
                    background: #FC534C;
                }
            }
        }
    }
    .nav{
        background: #FFF;
        position: fixed;
        top: 40px;
        left: 0;
        z-index: 1400;
        width: 100%;
        .nav_content{
           height: 78px;
            width: 1200px;
            margin: 0 auto;          
           img{
               display: block;
                float: left;
                margin-top: 13px;
           } 
           ul{
               float: right;
                li{
               width: 118px;
                float: left;
                text-align: center;
                position: relative;
                a{
                    font-size: 19px;
                    color: #666;
                    line-height: 74px;
                    font-weight: 600;
                    width: 100%;
                    height: 100%;
                    display: inline-block;
                } 
             }
           }
        }
        #munus_top{
            .el-menu-item{
                height: 78px;
                line-height: 78px;
                padding: 0px;
                font-size: 14px;
            }          
        }
    }
  #munus_top .el-submenu .el-submenu__title{
      
        font-weight: bold;
        height: 78px;
        line-height: 78px;
        font-size: 19px;
        padding: 0px;
        border: 0;
  }
  #munus_top>.el-submenu .el-submenu__title{
      font-weight: bold;
      margin-top: 9px;
      color: #666;
  }
    .nav .nav_content ul .isActive{
        border-bottom: 4px solid #EF5E5D
    }
    .nav .nav_content ul .isActive a{
       color: #FD8A88;
    }
    .logout_class:after {
       clear:both;
        content:'.';
        display:block;
        width: 0;
        height: 0;
        visibility:hidden;
  }
  .loginInfo:after {
    clear:both;
   content:'.';
   display:block;
   width: 0;
   height: 0;
   visibility:hidden;
}
</style>

