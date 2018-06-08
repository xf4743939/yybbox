<template>
    <div class="f12 prepaid" id="prepaid">
            <div class="paid_content">
                <p class="contetn_tip">
                    温馨提示：使用第三方充值方式和活动转预付费用户无需进行再次验证操作。
                    <br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;通过扫码支付与预付费账号充值用户充值成功后，待审核通过后前往我的页面点击“钱包明细”按钮，查看资金详情。
                    <br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;充值遇到问题，请联系客服
                </p>
                <p class="service">
                     <a class="service_btn" href="javascript:void(0)">
                         <img src="../../../../static/wallet/qq.png" >
                         <span>客服01</span>
                     </a>
                      <a class="service_btn" href="javascript:void(0)">
                         <img src="../../../../static/wallet/qq.png" >
                         <span>客服02</span>
                     </a>
                </p>
            </div>

            <div class="tip1">
                <span class="circle">1</span>
                <p class="wei_style title" >方式一&nbsp;&nbsp;微信支付</p>
                <p class="see_code">请输入金额，然后点击【确定】，确定后长按二维码(不要在这里点击【识别二维码】)，然后【保存图片】，打开微信扫一扫，选取保存图片扫描支付。</p>
                <div style="float: left;" class="payMoney">
                    <p class="weixin">
                        充值金额&nbsp;&nbsp;<input type="text" v-model="money" placeholder="请您输入金额" style="padding-left: 10px; color: #000; text-align: left" />&nbsp;&nbsp;元
                    </p>
                    <p >
                        <a v-on:click="pay" style="width:160px;">微信支付</a>
                    </p>
                </div>
                <p style="float: left; margin-left: 10px; margin-top: 10px;position:relative" v-if="code">
                    <span style="position:absolute;">二维码</span>
                    <img :src="code" style="margin-left: 47px;" />
                </p>
            </div>
            <div class="tip2 tip1">
                <span class="circle">2</span>
                <p class="title">方式二&nbsp;&nbsp;履约预付费账号充值</p>
                <p>可线下/网上银行充值到履约预付费账户。</p>
                <p>履约预付费账号</p>
                <p>户名：深圳市融利威网络科技有限公司</p>
                <p>帐号：41008100040012072</p>
                <p>开户银行：农业银行深圳东海支行</p>
            </div>
            <div class="tip2 tip3" style="border-bottom: none">
                <span class="circle">3</span>
                <p class="title">方式三&nbsp;&nbsp;活动奖励转化预付费</p>
                <p >活动奖励可转化成预付费，活动奖励分为系统奖励300元、模拟大赛奖励、交易返点奖励、网站其他活动奖励。预付费可用来做实盘交易。</p>
                <p class="go">
                    <a href="/user/moneyDetail/detail?type=2">前往转化</a>
                </p>
            </div>
    </div>
</template>
<script>
import message from '../../../config/message'
import {createCode} from '../../../api/getData'
export default {
    data(){
      return{
          money:'',
          code:'',
          isShow:true //判断message显示
      }
    },
    watch:{
           money(cur, old) {
                if (!this.money || this.money === 0) {
                    this.code = "";
                }      
            }
    },
    computed:{
     
    },
    methods:{
      async pay(){
           const _that=this;
             if (!this.money && this.isShow) {    
                     this.isShow=false; 
                     message(_that,{},'充值金额不能为空');                 
            }
            if(this.money && this.money.length){
               let res=await createCode(this.money);
              
               if(res.success){ 
                   //code 写死了 要修改          
                 this.code="http://localhost:10088" + res.result;        
               }else{
                 message(_that,res)
               }
            }  
       }
    }
}
</script>
<style lang="less">
 #prepaid {
    padding-left: 20px;
    padding-right: 20px;
    margin-top: 15px;
    margin: 0 auto;
    .paid_content{
            width: 100%;
            height: 120px;
            background: #f8f5f5;
            margin-top: 16px;
            position: relative;
            .contetn_tip{
                font-size: 14px;
                line-height: 30px;
                margin-left: 20px;
                padding-top: 10px;
            }
            .service{
                position: absolute;
                left: 272px;
                bottom: 22px;
            }
    }
    .tip1{
        margin-top: 20px;
        overflow: hidden;
        padding-bottom: 20px;
        border-bottom: 1px solid #e6e6e6;
        .wei_style{
             display: inline-block;
            height: 26px;
            line-height: 26px;
            font-size: 16px;
            color: #333;
            padding-left: 8px;
        }
        .see_code{
            font-size: 14px;
            color: #999;
            margin-top: 4px;
        }
        .payMoney{
            p:nth-of-type(1){
               font-size: 14px;
                color: #000;
                margin-top: 12px;
                input{
                    font-size: 14px;
                    color: #000;
                    height: 30px;
                    width: 150px;
                    text-align: center;
                    border-radius: 3px;
                    border: 1px solid #e4e4e4;
                }
            }
            p:nth-of-type(2){
               a{
                   font-size: 16px;
                    cursor: pointer;
                    color: #fff;
                    display: block;
                    margin-left: 64px;
                    height: 30px;
                    width: 160px;
                    background: #fc534c;
                    text-align: center;
                    line-height: 30px;
                    margin-top: 14px;
                    border-radius: 3px;
               }
            }
        }
    }
    .tip2{
        margin-top: 14px;
        .title{
            display: inline-block;
        }
        p{
            font-size: 14px;
            color: #999;
            margin-top: 6px;
        }
        p:nth-of-type(1){
         
             height: 26px;
            line-height: 26px;
            font-size: 16px;
            color: #333;
            padding-left: 8px;
          
        }
        
    }
    .tip3{
        .title{
            display: inline-block;
        }
        .go{
            a{
                font-size: 16px;
                color: #fff;
                display: block;
                margin-left: 64px;
                height: 30px;
                width: 160px;
                background: #fc534c;
                text-align: center;
                line-height: 30px;
                margin-top: 16px;
                border-radius: 3px;
            }
        }
    }
}
.circle{
    display: inline-block;
    height: 24px;
    width: 24px;
    background: #fc534c;
    color: #fff;
    border-radius: 50%;
    text-align: center;
    line-height: 24px;
    position: relative;
    top: -2px;
}

</style>


