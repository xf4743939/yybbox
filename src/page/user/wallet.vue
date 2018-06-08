<template>
    <div id="moneyDetail">
        <p class="myWallet">我的钱包</p>
        <div class="wallet_main">
            <div class="wallet_navs">       
                <router-link v-for="(item,index) in navs"  v-bind:to="item.url" v-bind:key="item.id"  v-cloak>
                    <span v-on:click="navClick(index)" v-bind:style="{'border-bottom':active==index ? '2px solid #FC534C' : '','color':active==index ? '#FC534C' : ''}">{{ item.name }}</span>
                </router-link>
            </div>
            <transition>
                <router-view  :user-info="user"></router-view>
            </transition> 
        </div>
</div>
</template>
<script>
import {getStore} from '../../config/mUtils'

export default {
    data(){
        return{
             navs:[
                   {
                        id: 1,
                        url:"/user/wallet/prepaid",
                        name: "预付费"
                   },
                   {
                        id: 2,
                        url:"/user/wallet/drawing",
                        name: "提款"
                    }, 
                    {
                        id: 3,
                        url:"/user/wallet/detail?type=1",
                        name: "钱包明细"
                    }
                ],
                active:0,
                user:null,
               
        }
    },
    methods:{
       navClick(index){
           this.active=index;
       }    
    },
    mounted(){
       if(!this.userInfo){  
         let getInfo=JSON.parse(getStore("userInfo"));  
           if(getInfo){          
              this.user=getInfo.user;
            }        
       }else{
          this.user=this.userInfo.user;
       }
    }
}
</script>
<style lang="less">
  #moneyDetail {
    width: 1035px;
    float: right;
    height: 750px;
    overflow: hidden;
    background: #fff;
    margin-top: 20px;
    .myWallet{
       font-size: 18px; 
        color: #333;
        padding-left: 31px;
        border-bottom: 1px solid #e4e4e4;
        padding-bottom: 15px;
        padding-top: 15px;
    }
    .wallet_main{
        width: 100%;
        margin: 0 auto;
        background: #FFF;
        .wallet_navs{
             height: 50px;
             border-bottom: 1px solid #e6e6e6;
             a{
                    display: block;
                    height: 50px;
                    width: 112px;
                    text-align: center;
                    float: left;
                    span{
                        color: #333;
                        display: inline-block;
                        height: 48px;
                        line-height: 48px;
                    }
             }
        }
    }
}

</style>

