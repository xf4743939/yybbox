<template>
    <div class="seo_container">
        <div class="seo_top">
            <ul class="clear" v-if="seoInfo">
                <li class="left" style="border-right:1px solid #e4e4e4;">
                    <p>累计赚取佣金</p>
                    <p>{{ seoInfo.shareMoney | toDecimal }}</p>
                    <p  class="btn" @click="getMoney">提取</p> 
                </li>
                 <li class="left" style="border-right:1px solid #e4e4e4;">
                    <p>佣金比例</p>
                    <p>5%</p>
                    <p style="color:#fc543c;">普通推广员</p> 
                </li>
                <li class="left">
                    <p>我的用户</p>
                    <p>{{ seoInfo.totalOwnUserNumber }}人</p>
                    <p style="color:#666;">实盘交易{{ seoInfo.tradeUserNumber }}人</p> 
                </li>
            </ul>
        </div>
        <div class="seo_code">
            <p style="color:#fc543c;"><span style="margin-left:-43px;">推荐朋友扫码,成为你的用户(*此二维码仅展示)</span></p>
           <img src="../../../../static/default/code.png" alt="">
        </div>
        <div>
            <img src="../../../../static/default/seoStep.png" alt="">
        </div>
    </div>
</template>
<script>
import {seoUserStatistice} from '../../../api/getData'
import message from '../../../config/message'
export default {
    data(){
        return{
            seoInfo:null
        }
    },
    methods:{
      async seoUserStatistice(){
          let res=await seoUserStatistice()
        
          if(res &&res.success){
             this.seoInfo=res.result;
          }else{
              message(this,res)
          }
      },
      getMoney(){
          this.$router.push({path:'/user/wallet/drawing'})
      }
    },
    mounted(){
       this.seoUserStatistice()
    }
}
</script>
<style lang="less">
   .seo_container{
       .seo_code{
           text-align: center;
           p{
               margin-bottom: 15px;
              
               margin-left: -30px;
           }
           img{
               margin-left: -70px;
           }
       }
       .seo_top{
           padding: 20px;
           ul{
               background: #F5F5F5;
               padding-top: 20px;
               padding-bottom: 20px;
               box-sizing: border-box;
               
               li{
                   width: 33.33%;
                   text-align: center;
                  box-sizing: border-box;
                   p:nth-of-type(1){
                       color: #666;
                   }
                   p:nth-of-type(2){
                       margin-top: 15px;
                       margin-bottom: 15px;
                       color: #333;
                   }
                   .btn{
                            width: 50px;
                            background: #fc543c;
                            color: #fff;
                            border-radius: 4px;
                            padding: 3px 6px;
                            margin-left: 136px;
                            cursor: pointer;
                   }
               }
           }
       }
   }
</style>

