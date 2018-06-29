<template>
    <div class="getMoney"  v-if="user">
        <div class="paid_content">
            <p class="contetn_tip">用户权益&nbsp;&nbsp;<span>{{ (user.useMoney + user.activityWithdrawMoney + user.activityNoWithdrawMoney + user.shareMoney + user.followProfitMoney) | toDecimal }}</span>元</p>
        </div>
      <form>
                <ul class="draw_main">
            <li class="draw_type">
                <p style="width:94px;font-size:16px;">&nbsp;&nbsp;&nbsp;提款类型</p>
                <p>
                    <input type="radio" name="useMoney" v-model="moneyType" value="1" />&nbsp;预付费<br /><span>&nbsp;&nbsp;&nbsp;&nbsp;可提取{{ user.useMoney | toDecimal }}元</span>
                </p>
                <p>
                    <input type="radio" name="activity" v-model="moneyType" value="2" />&nbsp;活动奖励<br /><span>&nbsp;&nbsp;&nbsp;&nbsp;可提取{{ user.activityWithdrawMoney | toDecimal }}元</span><br /><span>&nbsp;&nbsp;&nbsp;&nbsp;已冻结{{ parseFloat(user.activityNoWithdrawMoney).toFixed(2)}}元&nbsp;</span>
                </p>
                <p>
                    <input type="radio" name="shareMoney" v-model="moneyType" value="3" />&nbsp;推广奖励<br /><span>&nbsp;&nbsp;&nbsp;&nbsp;可提取{{ user.shareMoney | toDecimal }}元</span>
                </p>
                <p>
                    <input type="radio" name="followMoney" v-model="moneyType" value="4" />&nbsp;跟投返点<br /><span>&nbsp;&nbsp;&nbsp;&nbsp;可提取{{ user.followProfitMoney | toDecimal }}元</span>
                </p>

            </li>
            <li class="draw_info">
                <p class="clear" style="padding-left:14px;"> <span class="left draw_text">提款金额</span>
                    <!-- <input type="text" name="code" autocomplete="off" value="" placeholder="验证码" style="margin-left: 30px; padding-left: 10px;" v-show="false" />
                    <input v-show="false" value="" autocomplete="new-password" required v-bind:maxlength="16" type="password" v-bind:minlength="6" placeholder="提款密码" style="margin-left: 54px;" /> -->
                    <!-- <input type="text" v-model="moneyNum" autocomplete="off" placeholder="提款金额" style="padding-left:10px; color:#000; text-align:left;margin-left:11px;" />元</p> -->
                    <el-input placeholder="提款金额"
                    v-model="moneyNum" clearable class="left draw_input">
                    </el-input>
                    <span class="left draw_text">元</span>
                 </p>   
            </li>
            <li class="draw_info">
                <p>
                    提款银行卡
                    <el-select v-model="selectedBankCard" placeholder="请选择" style="width:214px;">
                        <el-option v-for="(item,index) in bankCards"
                        :value="item.bankNumber"
                        :key="item.id"
                        :label="item.bankNumber | subStr(5,4)"                       
                        >
                        </el-option>
                    </el-select>
                    <!-- <select v-model="selectedBankCard" style="width: 212px;text-align:left;border:1px solid #c0c4cc;height:40px;border-radius:4px;color:#606266">
                        <option disabled selected value="">--请选择--</option>
                        <option v-for="(item,index) in bankCards" v-bind:value="item.bankNumber"> {{ item.bankNumber | subStr(5,4) }} </option>
                    </select> -->
                    <a href="/user/SetInfo/bindCard">管理</a>
                </p>
            </li>
            <li class="draw_info">
                <p class="clear" style="padding-left:14px;">
                   <span class="left draw_text"> 提款密码</span>  
                    <!-- <input type="text"  v-on:blur="focus($event)" v-on:input="change($event)" v-model="payMoneyPwd" autocomplete="off" placeholder="初次操作,请先设置提款密码" style=" padding-left:10px; color:#000; text-align:left" /> -->
                    <el-input type="password" 
                     v-model="payMoneyPwd"
                     class="left draw_input"
                     placeholder="初次操作,请先设置提款密码"
                     style=" color:#000; text-align:left">
                    </el-input>
                    <a class="draw_text" href="/user/SetInfo/getPwd">设置</a>
                </p>
            </li>
            <li class="draw_btn">
                <input type="button"  v-on:click="drawMoney" value="确定" />
            </li>

        </ul>
      </form>
        <div class="draw_tips">
                <h6>温馨提示：</h6>
                <p>(1)&nbsp;预付费1000以上资金未进行实盘交易，资金提现收取3%手续费</p>
                <p>(2)&nbsp;为了您的资金安全，请确保提现银行卡号的户名和您进行实名验证的姓名一致</p>
                <p>(3)&nbsp;请确保您输入的是正确的储蓄卡账号，而非信用卡账号</p>
                <p>(4)&nbsp;您确认提现后，我们将在1个工作日（国家节假日排除）之内将款项转到您在系统上填写的银行账号。规则如下:</P>
                <p>a、每个工作日15:00之前的用户提现申请，将在下一个工作日进行打款操作</p>
                <p>b、15:00之后的提现申请，将与下个工作日申请一并处理，具体到账时间以银行到账时间为准</p>
                 <p>(5)&nbsp;提现过程遇到问题，请联系客服
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
    </div>
</template>
<script>
import {getStore} from '../../../config/mUtils'
import {getBankCards,moneyCreateFc} from '../../../api/getData';
import message from '../../../config/message'
export default {
    data(){
        return{
            user:null,
            bankCards:[],
            message: "",
            selectedBankCard: "",
            moneyType:1,
            moneyNum:"",
            payMoneyPwd:"",
            isShow:true, //判断message显示
            delay:false,   
        }
    },
    created(){
       if(!this.userInfo){  
         let getInfo=JSON.parse(getStore("userInfo"));  
           if(getInfo){          
              this.user=getInfo.user;
            }        
       }else{
          this.user=this.userInfo.user;
       }
       this.getBankCards()
    },
    methods:{
            focus(event){         
                if(!this.payMoneyPwd){
                    event.target.type="text"
                }else{
                    event.target.type="password"
                    }          
            },
            change(event){
                if(!this.payMoneyPwd){
                    event.target.type="text"
                }else{
                    event.target.type="password"
                }  
            },
            async getBankCards() {
                const _that = this; 
                let res= await getBankCards();
           
                if(res.success){
                   this.bankCards=res.result 
                }else{
                     message(_that,res);
                
                }         
            },
            async drawMoney() {      
                const _that = this;              
                let data = {};
                if(!this.moneyNum && this.isShow){
                   
                      this.isShow=false
                      message(_that,{},'提款金额为空')                     
                }       
                if(!this.selectedBankCard && this.isShow){
                     this.isShow=false;
                     message(_that,{},'请选择提款银行卡') 
               }             
                switch (parseInt(this.moneyType)) {
                case 1:
                    data= {
                        "money": this.moneyNum,
                        "payment": "预付费奖励扣款",
                        "isType": 1,
                        "inOut": 2,
                        "toOrFromForSource": 100,
                        "exValue": this.selectedBankCard,
                        "payPassword": this.payMoneyPwd
                    }
                    break;
                case 2:
                    data = {
                        "money": this.moneyNum,
                        "payment": "活动奖励扣款",
                        "isType": 6,
                        "inOut": 2,
                        "toOrFromForSource": 102,
                        "exValue": this.selectedBankCard,
                        "payPassword": this.payMoneyPwd
                    }
                    break;
                case 3:
                    data = {
                        "money": this.moneyNum,
                        "payment": "推广奖励扣款",
                        "isType": 3,
                        "inOut": 2,
                        "toOrFromForSource": 101,
                        "exValue": this.selectedBankCard,
                        "payPassword": this.payMoneyPwd
                    }
                    break;
                default:
                    data = {
                        "money": this.moneyNum,
                        "payment": "跟投返点扣款",
                        "isType": 8,
                        "inOut": 2,
                        "toOrFromForSource": 104,
                        "exValue": this.selectedBankCard,
                        "payPassword": this.payMoneyPwd
                    }
                }
           
                if(this.selectedBankCard.length && this.moneyNum.length){
                     let res=await moneyCreateFc(data);
                     if(res.success){
                         message(_that,{},'提款成功','success');
                           if(this.isShow){
                              this.$router.go(0);
                           }                                        
                     }else{
                     
                         message(_that,res)  
                     }
               }
               
            }
    },
    watch:{
         moneyNum(cur, old) {    
                if (!this.moneyNum) {
                    return;
                } else {                
                    switch(parseInt(this.moneyType)) {                    
                    case 1:
                        if (this.user.useMoney===0) {
                            message(_that,{},'没有可提的预付费')
                        }
                        break;
                    case 2:
                        if (this.user.activityWithdrawMoney === 0) {
                              message(_that,{},'没有可提取的活动奖励')                  
                        }
                        break;
                    case 3:
                        if (this.user.shareMoney === 0) {
                              message(_that,{},'没有可提取的推广奖励')                             
                        }
                        break;
                    default:
                        if (this.user.followProfitMoney === 0) {
                             message(_that,{},'没有可提取的跟投返点')    
                        }
                    }
                }          
            },
    },

  
}
</script>
<style lang="less">
.getMoney {
    padding-left: 20px;
    padding-right: 20px;
    margin-top: 15px;
    margin: 0 auto;
    .paid_content{
            width: 100%;
            height: 60px;
            background: #f8f5f5;
            margin-top: 16px;
            position: relative;
            .contetn_tip{
                font-size: 14px;
                line-height: 30px;
                margin-left: 20px;
                float: left;
                margin-top: 18px;
                span{
                   font-size: 18px;
                    color: #fc543c;
                    font-weight: bold;
                    display: inline-block;
                    position: relative;
                    top: 2px;
                    margin-right: 3px;
                }
            }        
    }
   .draw_main{
        margin-top: 20px;
        margin-left: 6px;
        border-bottom: 1px solid #e6e6e6;
        padding-bottom: 30px;
        .draw_type{
            height: 82px;
            overflow: hidden;
            p{
                float: left;
                font-size: 15px;
                height: 24px;
                line-height: 24px;
                width: 18%;
                span{
                    color: #666;
                }
            }
        }
        .draw_info{
            margin-top: 16px;
          
            p{
                font-size: 16px;
               
                a{
                    font-size: 15px;
                    color:#fc543c;
                }
                .draw_text{
                    display:block;
                    height:100%;
                    line-height:40px;
                    font-size:16px;
                }
                .draw_input{
                    width:214px;
                    margin-left:5px;
                    margin-right:5px;
                }
            }
        }
        .draw_btn{
            margin-top: 16px;
           margin-left: 80px;
           input{
               font-size: 17px;
                color: #fff;
                margin-left: 3px;
                height: 34px;
                width: 214px;
                text-align: center;
                background: #fc543c;
                border: none;
                cursor: pointer;
                border-radius: 4px;
           }
        }
       
   }
    .draw_tips{
            margin-top: 20px;
            margin-left: 6px;
            position: relative;
            h6{
                font-size: 15px;
            }
            p{
                font-size: 14px;
                color: #333;
               
                margin-top: 10px;
            }
        }
}


</style>


