<template>
    <div>
       <head-top></head-top>
        <section class="openContent">
          <P class="fd">开通实盘账户</P>       
            <!--左边-->
            <div class="open_Main" v-if="showNum===1 && isShowOpenAccont===1">
                <div class="open_tip">
                    <a href="javascript:void(0);" style="margin-left: 20px;"><span>绑定/开户&nbsp;<img :src="arrowRedUrl" /></span></a>
                    <a href="javascript:void(0);"><span style="color: #999">&nbsp;选择身份绑定/选择经纪商开户</span></a>
                </div>
                <div class="open_types">
                    <div>
                        <span>选择市场:</span>
                        <el-select v-model="selected">
                            <el-option
                             v-for="(item,index) in worldOrHome"
                            :key="item.id"
                            :label="item.type"
                            :value="item.id">
                            </el-option>
                        </el-select>
                        <span>*环球期货、盘股票不支持线上开户</span>
                    </div>
                    <div class="open_btns">
                          <div class="bind">
                              <el-button @click="bindInfo">已有账户、申请绑定</el-button>
                          </div>
                          <div class="open" v-if="selected===2">
                             <el-button @click="openAccount">前往经纪商开户</el-button>
                          </div>              
                    </div>
                </div>
            </div>
              <!-- 选择绑定账户的身份 -->
                <div class="open_Main"  v-if="showNum===2">
                    <div class="open_tip">
                        <a href="javascript:void(0);" @click="backToOpen" style="margin-left: 20px;"><span style="color:#000">绑定/开户&nbsp;<img :src="arrowUrl" /></span></a>
                        <a href="javascript:void(0);"><span style="color: #fc543c">&nbsp;选择绑定账户的身份&nbsp;<img :src="arrowRedUrl" /></span></a>
                        <a href="javascript:void(0);"><span style="color: #999">&nbsp;完善资料</span></a>
                    </div>
                    <div class="types">
                        <div class="types_content">
                            <p class="text">
                                易友宝的真实账户有<span style="color: #fc543c; font-size: 20px"> 交易员</span> 和 <span style="color: #00a8ec; font-size: 20px">跟投者 </span>两种身份，您希望成为：
                            </p>
                            <p class="select_types">
                                <a  class="clear" style="border: 1px solid #fc543c" @click="toInfo(1)">
                                    <div class="left text_left">
                                           <img src="../../../../static/default/trader_firm.png"/>
                                           <span>交易者</span>
                                    </div>                         
                                    <div class="left text_right">
                                       易友宝跟投者，您可无限制跟随平台所有交易员的策略信号,以享
                                       受专业交易策略带来的收益；也可自主在线交易。跟随者可随时与
                                       交易员深度互动了解交易员动态、学习交易知识、提升交易易友宝
                                       跟投者，您可无限制跟随平台所有
                                    </div>
                                </a>
                                <a  class="clear" style="border: 1px solid #00a8ec; margin-right: 0" @click="toInfo(2)">
                                     <div class="left text_left">
                                           <img src="../../../../static/default/follow_firm.png"/>
                                           <span>跟投者</span>
                                    </div>    
                                    <div class="left text_right">
                                            易友宝跟投者，您可无限制跟随平台所有交易员的策略信号,以享
                                            受专业交易策略带来的收益；也可自主在线交易。跟随者可随时与
                                            交易员深度互动了解交易员动态、学习交易知识、提升交易易友宝
                                            跟投者，您可无限制跟随平台所有
                                    </div>
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            <!-- 经济商开户-->
            <div class="open_Main"  v-if="isShowOpenAccont===2">
                <div class="open_tip">
                    <a href="javascript:void(0);" @click="backToOpen" style=" margin-left:20px;"><span style="color: #000;" >绑定/开户&nbsp;<img :src="arrowUrl" /></span></a>
                    <a href="javascript:void(0);"><span style=" color:#fc543c">&nbsp;选择经纪商开户&nbsp;<img :src="arrowRedUrl" /></span></a>
                    <a href="javascript:void(0);"><span style=" color:#999">&nbsp;经纪商官网开户</span></a>
                </div>
                <div class="types">
                    <div class="types_content">
                        <ul class="clear">
                            <li v-for="(item,index) in accontOpen"><a target="blank" v-bind:href="item.linkUri"><img v-bind:src="item.logo"/><span>{{ item.name }}</span></a></li>                     
                        </ul>
                    </div>
                </div>
            </div>
         
            <!-- 完善资料 -->
        <div class="open_Main"  v-if="showNum===3">
            <div class="open_tip">
                <a href="javascript:void(0);"  @click="backToOpen" style="margin-left: 20px;"><span style="color: #000;">绑定/开户&nbsp;<img :src="arrowUrl" /></span></a>
                <a href="javascript:void(0);"  @click="backToBindAccount"><span style="color: #000000;">&nbsp;选择绑定账户的身份&nbsp;<img :src="arrowUrl" /></span></a>
                <a href="javascript:void(0);"><span style="color:#fc543c">&nbsp;完善资料&nbsp;<img :src="arrowRedUrl" /></span></a>
                <a href="javascript:void(0);"><span style="color: #999">&nbsp;绑定账户</span></a>
            </div>
            <div class="types">
                <div class="types_infos">
                    <div class="type_info clear">
                        <span class="left">真实姓名:</span>
                        <el-input class="left" v-model="name" v-bind:disabled="user.surname ? true : false"  placeholder="请您输入"></el-input>
                    </div>
                    <div class="type_info clear">
                        <span class="left">电子邮箱:</span>
                        <el-input class="left" v-model="user.emailAddress"  v-bind:disabled="user.emailAddress ? true : false"  placeholder="请您输入"></el-input>
                    </div>
                    <div class="type_info clear">
                        <span class="left">证件类型:</span>
                        <el-select class="left"  v-bind:disabled="cardVal ? true : false " v-model="cardVal">
                            <el-option
                            v-for="(item,index) in cards"
                            :key="item.code"
                            :label="item.name"
                            :value="item.code">
                            </el-option>
                        </el-select>
                    </div>
                    <div class="type_info clear">
                        <span class="left">证件号码:</span>
                        <el-input class="left" v-model="num" v-bind:disabled="user.cardID ? true : false" placeholder="请您输入"></el-input>
                    </div>
                    <div class="type_info clear" id="service">
                         <el-checkbox class="left" v-model="isChecked"></el-checkbox><span class="left" style="width:113px;">我已阅读并同意</span><a class="left" href="/componey/service">易友宝服务协议</a>
                    </div>
                    <div class="type_info" id="save_btn">
                           <el-button @click="toBindAccount" :disabled="!isChecked">确认信息</el-button>
                    </div>
                </div>
            </div>
        </div>  

           <!-- 国内已有账号 选择经济商开户 -->
            <div class="open_Main"  v-if="showNum===4">
                <div class="open_tip">
                    <a href="javascript:void(0);" @click="backToOpen" style=" margin-left:20px;"><span style="color: #000;" >绑定/开户&nbsp;<img :src="arrowUrl" /></span></a>
                    <a href="javascript:void(0);"><span style=" color:#fc543c">&nbsp;选择经纪商开户&nbsp;<img :src="arrowRedUrl" /></span></a>
                    <a href="javascript:void(0);"><span style=" color:#999">&nbsp;经纪商官网开户</span></a>
                </div>
                <div class="types">
                    <div class="types_content">
                        <ul class="clear">
                            <li v-for="(item,index) in accontOpen" v-bind:class="{isSeleted:isSeleted===index}"><a @click="seletedAccount(item)"><img v-bind:src="item.logo"/><span>{{ item.name }}</span></a></li>                     
                        </ul>
                    </div>
                </div>
            </div>
         <!-- 在经纪商开通账户的资料 -->
            <div class="open_Main"  v-if="showNum===5">
                <div class="open_tip">
                    <a href="javascript:void(0);" v-on:click="backToOpen" style="margin-left: 20px;"><span style="color: #000;">绑定/开户&nbsp;<img :src="arrowUrl" /></span></a>
                    <a href="javascript:void(0);" v-on:click="backToBindAccount"><span style="color: #000000;">&nbsp;选择绑定账户的身份&nbsp;<img :src="arrowUrl" /></span></a>
                    <a href="javascript:void(0);"><span style="color: #fc543c">&nbsp;绑定账户&nbsp;<img :src="arrowRedUrl" /></span></a>
                    <a href="javascript:void(0);"><span style="color:#666" >&nbsp;完成验证</span></a>
                </div>
               <div class="types">
                    <div class="types_infos">
                        <div class="type_info clear">
                            <span class="left">资金账户:</span>
                            <el-input class="left" v-model="moneyAccount"   placeholder="账号"></el-input>
                        </div>
                        <div class="type_info clear">
                            <span class="left">资金密码:</span>
                            <el-input type="password" class="left" v-model="moneyPassword"   placeholder="密码"></el-input>
                        </div>
                        <div class="type_info clear"  v-if="selected===1" >
                            <span class="left">License:</span>
                            <el-input class="left" v-model="license"   placeholder="license"></el-input>
                        </div>
                        <div class="type_info clear" v-if="selected===1">
                            <span class="left">AppId:</span>
                            <el-input class="left" v-model="appId"  placeholder="appID"></el-input>
                        </div>
                        <div class="type_info" id="save_btn">
                            <el-button v-if="selected===2" @click="toVerifyAccount" :disabled="!(moneyAccount && moneyPassword)">确认绑定</el-button>
                            <el-button v-if="selected===1" @click="toVerifyAccount" :disabled="!(moneyAccount && moneyPassword && license && appId )">确认绑定</el-button>
                        </div>
                    </div>
             </div>
           </div>
               <!--账号验证-->
            <div class="open_Main"  v-if="showNum===6">
                <div class="open_tip">
                    <a href="javascript:void(0);" v-on:click="backToOpen" style="margin-left: 20px;"><span style="color: #000;">绑定/开户&nbsp;<img :src="arrowUrl" /></span></a>
                    <a href="javascript:void(0);" v-on:click="backToBindAccount"><span style="color: #000000;">&nbsp;选择绑定账户的身份&nbsp;<img :src="arrowUrl" /></span></a>
                    <a href="javascript:void(0);"><span style="color:#666;" >&nbsp;绑定账户&nbsp;<img :src="arrowRedUrl" /></span></a>
                    <a href="javascript:void(0);"><span style="color: #fc543c">&nbsp;完成验证</span></a>
                </div>
               <div class="types">
                    <div class="types_infos">
                         <div style="text-align:center;margin-top:80px;font-size:18px">恭喜您申请绑定的<span style=" color:#fc543c; font-size:22px">{{ tradeOrFollow }}</span>实盘账户已完成</div>
                    </div>
               </div>
           </div>  
        </section>
       <foot-bom></foot-bom>
    </div>
</template>
<script>
import{mapState,mapActions} from 'vuex'
import message from '../../../config/message'
import headTop from '../../../components/headTop'
import footBom from '../../../components/footer'
import {getStore} from '../../../config/mUtils'
import getUserInfo from '../../../config/getUserInfo'
import {getAllForNormalFC,getCard,createBrokerCompanyAccountFC} from '../../../api/getData'
export default {
    data(){
        return{
              worldOrHome:[
                {
                    id:1,
                    type:'国际期货'
                },{
                    id:2,
                    type:'国内期货'
                }
           ],
           arrowUrl:'../../../../static/default/arrow1.png',
           arrowRedUrl:'../../../../static/default/arrow_red.png',
           selected:1,//国际国内选择框
           showNum:1,
           isShowOpenAccont:1,
           user:null,
           isShow:true,
           accontOpen:[],
           isSeleted: -1,
            cards: [],
            cardVal: '',
            isChecked:false,
            moneyAccount:'',
            moneyPassword: '',
            tradeOrFollow: "",
            license: "",
            appId: "",         
            homeSelectedBca: {},

        }
    },
    components:{
        headTop,
        footBom
    },
    computed:{
       ...mapState(['userInfo']),
       num:{
           get(){
               if(this.user.cardID){
                   return this.user.cardID=this.user.cardID.substring(0,2) + '*********' + this.user.cardID.substring(this.user.cardID.length-4)
               }
               return
           }
       },
       name:{
           get(){
               let num=''
                for (var i = 0; i < this.user.surname.length-1; i++) {
                        num += "*";
                    }                      
               return this.user.surname = num + this.user.surname.substring(this.user.surname.length - 1);
           }
       }
    },
    methods:{
          ...mapActions(['getUserInfo']),
        //申请绑定
          bindInfo() {         
                const  _that = this;
                if (!this.user.surname || !this.user.emailAddress || !this.user.cardTypeCode || !this.user.cardID) {
                    if (_that.isShow) {
                        _that.isShow = false;
                        _that.$message({
                            message: '你还未实名认证,将前往认证',
                            type: 'warning',
                            duration: 2000,
                            center: true,
                            onClose: function () {
                                _that.isShow = true;
                                _that.$router.push({
                                    path:'/user/safe/oauth'
                                })
                            }
                        });
                        return;
                    }
                }           
                if (this.selected === 1) {
                    if (this.user.bcaType>=2) {
                        if (_that.isShow) {
                            _that.isShow = false;
                            message(_that,{},'你已绑定经济商账号')
                        } 
                    } else {
                        _that.showNum = 2;
                    }             
                } else {
                    if (this.user.homeBCAType>=2) {
                        if (_that.isShow) {
                            _that.isShow = false;
                            message(_that,{},'你已绑定经济商账号')
                        } 
                    } else {
                        _that.showNum = 2;
                    }
                              
                }
            },
         //开通实盘
        async openAccount() {
           
                const  _that = this;     
                if (this.selected === 1) {
                    this.isShowOpenAccont = 2;
                } else {
                    this.isShowOpenAccont = 2;
                    let res= await getAllForNormalFC(this.selected);
                    if(res && res.success){
                       _that.accontOpen = res.result
                       console.log(_that.accontOpen)
                    }else{
                       message(_that,res)
                    }
                }
            },
        backToOpen(){
                    this.isChecked = false;
                    this.moneyAccount = "";
                    this.moneyPassword = "";
                    this.tradeOrFollow = "";
                    this.license = "";
                    this.appId = "";             
                    this.showNum = 1;
                    this.isShowOpenAccont = 1;
            },
       backToBindAccount(){
                this.isChecked = false;
                this.moneyAccount = "";
                this.moneyPassword = "";
                this.tradeOrFollow = "";
                this.license = "";
                this.appId = "";
                this.showNum = 2;
       },        
            //去交易这或者跟投者界面
        toInfo(param) {
                if (param === 1) {
                    this.tradeOrFollow = "交易者";
                } else {
                    this.tradeOrFollow = "跟投者";
                }
                this.showNum = 3;
                        
            },
            //完善资料
        async toBindAccount() {
                const _that = this;                           
                if (this.selected === 1) {
                    this.showNum = 5;
                } else {
                    this.showNum = 4;
                    let res= await getAllForNormalFC(this.selected);
                    if(res && res.success){
                       _that.accontOpen = res.result
                    }else{
                       message(_that,res)
                    }
                }
            },
        //得到身份证信息
        async getCards(){
            let res= await getCard({})
            let id=[];
            let index;
            if(res && res.success){
                this.cards=res.result;
                this.cards=this.cards.filter(x=>x.isStatus>0);
                this.cards.forEach( el => {
                    id.push(el.code)
                }) 
            
              if(this.user.cardTypeCode){
                 index=id.indexOf(this.user.cardTypeCode.toUpperCase());
                 if(index>-1){
                       this.cardVal = this.cards[index].code;
                 }else{
                    this.cardVal = "";                         
                 }
              }
            }else{
                message(this,res)
            }
          
        },
        //选择经纪商账户
        seletedAccount(item){
                this.homeSelectedBca = item;
                this.showNum = 5;         
        },
        //确定绑定实盘账户
       async toVerifyAccount(){          
                const  _that = this;
                let  accountType;
                let data={}
                if (this.tradeOrFollow === "交易者") {
                    accountType = 1;
                } else {
                    accountType = 2;
                }
                if (this.selected === 1) {
                    data = {
                        "account": this.moneyAccount,
                        "passwordString": this.moneyPassword,
                        "license": this.license,
                        "appID": this.appId,
                        "accountType": accountType,
                        "worldOrHome": this.selected
                    }
                } else {
                    data = {
                        "account": this.moneyAccount,
                        "passwordString": this.moneyPassword,
                        "license": this.homeSelectedBca.brokerId,
                        "appID": this.homeSelectedBca.brokerId,
                        "accountType": accountType,
                        "worldOrHome": this.selected
                    }
                }                   
                if (!this.moneyAccount) {
                    message(_that,{},'资金账户为空')
                }
                if (!this.moneyPassword) {
                    message(_that,{},'资金密码为空')
                }
                if (this.selected===1) {
                    if (!this.license) {
                      message(_that,{},'License 为空')
                    }
                    if (!this.appId) {
                        message(_that,{},'AppId 为空')
                    }
                }
               
                let res =await createBrokerCompanyAccountFC(data)
             
                if(res && res.success){
                    _that.getUserInfo()
                   _that.showNum=6
                }else{
                    message(_that,res)
                }  
       }          
    },
    mounted(){
           getUserInfo(this);
    //     if(!this.userInfo){  
    //       let getInfo=JSON.parse(getStore("userInfo"));       
    //        if(getInfo){          
    //           this.user=getInfo.user;            
    //         }        
    //    }else{
    //       this.user=this.userInfo.user;
    //    }
      this.getCards()

    }
}
</script>
<style lang="less">
  .openContent{
      width: 1200px;
      margin: 0 auto;
      .el-scrollbar{
        width: 300px;
      }
      .fd{
         font-size: 20px;
        margin-top: 20px;
        margin-bottom: 20px;
        font-weight: bold;
        color: #3f3a39;
        margin-left: 2px;
      }
      .open_Main{
          .types{
              width: 1140px;
              margin: 26px auto 0 auto;
              .types_infos{
                  margin-top: 40px;
                  .type_info{
                      display: block;
                      padding-left: 355px;
                      margin-bottom: 25px;
                      >span{
                           display: block;
                            height: 40px;
                            font-size: 17px;
                            line-height: 40px;
                            margin-right: 15px;
                            width: 74px;
                      }
                      .el-input{
                          width: 300px;
                      }
                  }
              }
              .types_content{
                  ul{
                      li{
                            float: left;
                            width: 100px;
                            margin: 21px;
                            a{
                                display: block;
                                img{
                                    width: 90%;
                                    display: block;
                                    margin: 0 auto;
                                    height:90px;
                                }
                                span{
                                        display: block;
                                        font-size: 22px;
                                        color: #333;
                                        text-align: center;
                                }
                            }
                      }
                  }
                  .text{
                      font-size: 17px;
                        color: #000;
                        margin-top: 0px;
                        margin-left: 26px;
                        margin-bottom: 20px;
                  }
                  .select_types{
                      margin-left: 26px;
                      a:hover{
                            opacity: 0.7;
                      }
                      a{
                           border: 1px solid #fc543c;
                           display: block;
                            height: 150px;
                            width: 500px;
                            background: #fafafa;
                
                            float: left;
                            margin-right: 60px;
                            margin-left: 0px;
                            font-size: 17px;
                            color: #fff;
                            text-align:center;
                            line-height: 46px;
                            cursor: pointer;
                            >.text_left{
                                margin-top: 20px;
                                border-right: 1px solid #ccc;
                                padding-left: 10px;
                                padding-right: 10px;
                            }
                            >.text_right{
                                    color: #666;
                                 
                                    padding-left: 19px;
                                    font-size: 14px;
                                    width: 340px;
                                    margin-top: 25px;
                                    text-indent: 5px;
                            }
                          img{
                                 display: block;
                              
                                margin: 14px 0;
                                padding: 6px 20px 6px 20px; 
                          }
                          span{
                               color: #333;
                               font-size: 16px;
                            //    display: block;
                            //     float: left;
                            //     width: 340px;
                            //     font-size: 14px;
                            //     color: #666;
                            //     margin-left: 20px;
                            //     line-height: 24px;
                            //     margin-top: 12px;
                          }
                      }
                  }
              }
          }
          background: #fff;
          height: 700px;
          .el-select{
              width: 300px;
          }
          .open_tip{
              height: 56px;
             border-bottom: 1px solid #e6e6e6;
             a{
                     display: block;
                    height: 55px;
                    text-align: center;
                    float: left;
                    span{
                        display: block;
                        font-size: 17px;
                        color: #fc543c;
                        text-align: center;
                        margin-top: 17px;
                    }
             }
          }
       .open_types{
           text-align: center;
           padding-top: 40px;
           >div{
                >span:nth-of-type(1){
                            display: inline-block;
                            font-size: 16px;
                            margin-right: 20px;
                     }
            >span:nth-of-type(2){
                 display: inline-block;
                 margin-left: 10px;
            }
           }  
         
       }
      }
      .open_btns{
          width: 1062px;
          margin-top: 25px;
          .open{
              margin-top: 10px;
          }
         .el-button{
             width: 300px;
             background: #fc543c;
             color: #fff;
             padding: 10px 18px;
            
         }
         .el-button:active{
             border-color: #fc543c;
         } 
      }
  }
  #save_btn{
     
      padding-left: 441px;
      .el-button{
          background: #fc543c;
          color: #fff;
           width: 300px;
      }
  }
  #service{
      padding-left: 443px;
      .el-checkbox{
          height: 24px;
        width: 24px;
        line-height: 24px;
        .is-checked .el-checkbox__inner{
            background: #fc543c;
            border-color: #fc543c;
        }
         .is-focus .el-checkbox__inner{      
            border-color: #fc543c;
        }
      }
      >span{
          height: 24px;
        font-size: 16px;
        line-height: 24px;
        margin-right: 3px;
      }
      a{
          font-size: 16px;
        height: 24px;
        line-height: 24px;
        color: #fc543c;
      }
  }
</style>

