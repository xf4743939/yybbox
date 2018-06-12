<template>
    <div class="phone_wrap">
        <div  class="content">
            <div v-if="displayCard===0 && user">
                <vue-form v-bind:state="formstate" v-on:submit.prevent="onSubmit" show-messages="$touched || $submitted">
                    <p class="lgPwd2">
                        <span>当前手机号</span>
                        <span style="margin-left:10px;">{{ user.phoneNumber | subStr(4,4) }}</span>
                    </p>
                    <p class="lgPwd2 clear">
                        <span class="left">手机验证码</span>
                         <el-input class="left" v-model="code" placeholder="验证码"></el-input>
                         <el-button class="left" :disabled="count<60" @click="getCode">{{codeName}}</el-button>
                    </p>
                    <validate class="form-group form_wrap clear">
                        <label class="left">登录密码</label>
                        <el-input class="left" type="password" style="margin-left:29px;" name="loginPwd"  v-model="loginPwd" :maxlength="16"  :minlength="6" placeholder="登陆密码" required></el-input>
                        <!-- <input  v-model="loginPwd" v-on:focus="focus($event)"  v-on:input="change($event)" autocomplete="off"  required name="loginPwd"  v-bind:maxlength="16" type="text" v-bind:minlength="6" placeholder="登陆密码" style="margin-left: 54px;" /> -->
                        <field-messages name="loginPwd" v-if="formstate.loginPwd" class="errorInfo left">
                            <span slot="required">*请输入登录密码</span>
                            <span slot="maxlength">*密码最大为{{formstate.loginPwd.$attrs.maxlength}}位</span>
                            <span slot="minlength">*密码最小为{{formstate.loginPwd.$attrs.minlength}}位</span>
                        </field-messages>
                    </validate>
                    <div class="btn_next">
                        <el-button  native-type="submit">下一步</el-button>
                    </div>
                </vue-form>
            </div>
            <div v-if="displayCard===1">
                <vue-form v-bind:state="formstate" v-on:submit.prevent="next" show-messages="$touched || $submitted">
                    <p class="lgPwd2 clear">
                         <span class="left">市场选择</span>
                         <el-select v-model="wrOrHm" placeholder="请选择">
                                <el-option
                                v-for="(item,index) in wrOrHms"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                                </el-option>
                         </el-select>
                    </p>
                    <validate class="form-group form_wrap clear">
                        <label class="left">资金账号</label>
                        <el-input class="left" type="text" v-model="account" name="account" placeholder="资金账号" required :minlength="4" :maxlength="16" ></el-input>
                        <div class="errorInfo left">
                            <span v-if="!account">*请输入资金账号</span>
                            <!-- <span v-if="account.length>16">*账号最大为{{formstate.account.$attrs.maxlength}}位</span>
                            <span v-if="account.length<6">*账号最小为{{formstate.account.$attrs.minlength}}位</span> -->
                        </div>
                        <!-- <field-messages name="account" v-if="formstate.account" class="errorInfo left">
                            <span slot="required">*请输入资金账号</span>
                            <span slot="maxlength">*账号最大为{{formstate.account.$attrs.maxlength}}位</span>
                            <span slot="minlength">*账号最小为{{formstate.account.$attrs.minlength}}位</span>
                        </field-messages> -->
                    </validate>
                    <validate class="form-group form_wrap clear">
                        <label class="left">用户密码</label>
                        <el-input class="left" v-model="userPwd" placeholder="用户密码" name="userPwd" type="password" :maxlength="16" :minlength="6" required></el-input>
                        <!-- <input v-model="userPwd"    autocomplete="off"  required name="userPwd" v-bind:maxlength="16" type="text" v-bind:minlength="6" placeholder="用户密码" style="margin-left: 41px;" /> -->
                        <field-messages name="userPwd" v-if="formstate.userPwd" class="errorInfo left">
                            <span slot="required">*请输入用户密码</span>
                            <span slot="maxlength">*密码最大为{{formstate.userPwd.$attrs.maxlength}}位</span>
                            <span slot="minlength">*密码最小为{{formstate.userPwd.$attrs.minlength}}位</span>
                        </field-messages>
                    </validate>
                    <validate class="form-group form_wrap clear" v-if="wrOrHm==1">
                        <label class="left">license</label>
                        <!-- <input v-model="license" required name="license" type="text"  placeholder="license" style="margin-left: 52px;" /> -->
                         <el-input class="left" style="margin-left:26px;" v-model="license" placeholder="license" name="license" required type="text"></el-input>
                        <field-messages name="license" v-if="formstate.license" class="errorInfo left">
                            <span slot="required">*请输入license</span>                   
                        </field-messages>
                    </validate>
                    <validate class="form-group form_wrap clear" v-if="wrOrHm==1">
                        <label class="left">appId</label>
            
                        <el-input class="left" style="margin-left:32px;" v-model="appId" placeholder="appId" name="appId" required type="text"></el-input>
                        <!-- <input v-model="appId" required name="appId" type="text" placeholder="appId" style="margin-left:58px;"  /> -->
                         <field-messages name="appId" v-if="formstate.appId" class="errorInfo left">
                            <span slot="required">*请输入用户appId</span>                   
                        </field-messages>
                        <!-- <div class="errorInfo left">
                            <span v-if="!appId">*请输入用户appId</span>
                        </div>               -->
                    </validate>
                    <div>
                          <el-button style="width:100px;margin-left:69px;" native-type="submit" >确定</el-button>
                    </div>
                </vue-form>
            </div>
            <div v-if="displayCard===2">
                <vue-form v-bind:state="formstate" v-on:submit.prevent="save" show-messages="$touched || $submitted">
                    <validate class="form-group form_wrap clear">
                        <label class="left">新手机号码</label>
                        <el-input class="left" placeholder="手机号码" v-model="newPhoneNum" required name="newPhoneNum" :maxlength="16" type="text" :minlength="6">
                        </el-input>
                        <!-- <input v-model="newPhoneNum" required name="newPhoneNum" v-bind:maxlength="16" type="text" v-bind:minlength="6" placeholder="手机号码" style="margin-left: 41px;" /> -->
                        <field-messages name="newPhoneNum" v-if="formstate.newPhoneNum" class="errorInfo">
                            <span slot="required">*请输入新手机号</span>
                            <span slot="maxlength">*号码最大为{{formstate.newPhoneNum.$attrs.maxlength}}位</span>
                            <span slot="minlength">*号码最小为{{formstate.newPhoneNum.$attrs.minlength}}位</span>
                        </field-messages>
                    </validate>
                    <p class="lgPwd2 clear">
                        <span class="left"> 手机验证码</span>
                         <el-input class="left" v-model="newCode" placeholder="验证码"></el-input>
                         <!-- <input type="text" name="newCode" v-model="newCode" placeholder="验证码" style="margin-left: 30px; padding-left: 10px;" />&nbsp;&nbsp;&nbsp;&nbsp; -->
                          <el-button class="left" :disabled="count2<60" @click="getCode">{{codeName2}}</el-button>
                        <!-- <input type="button" v-on:click="getCode" v-bind:disabled="count2<60" v-bind:value="codeName2"  style="height: 34px; width: 118px" /> -->
                    </p>
                     <div class="btn_next" style="padding-top:0px;">
                        <el-button  native-type="submit">确定</el-button>
                    </div>
                    <!-- <div>
                        <button class="btn btn-primary" type="submit" style="margin-left: 114px;">确定</button>
                    </div> -->
                </vue-form>

            </div>
        </div>
    </div>
</template>
<script>
import message from '../../../config/message'
import{mapState,mapActions} from 'vuex'
import getUserInfo from '../../../config/getUserInfo'
import {checkPhoneNumIsYourSelf,getPhoneCode,checkBrokerCompanyAccountIsYourSelf,upDatePhoneNum} from '../../../api/getData'
export default {
    data(){
        return{
            code:null,
            loginPwd:null,
            message:null,
            formstate: {},
            displayCard:0,
            appId:"",
            license:null,
            userPwd:null,
            wrOrHms:[
                {
                    id: 1,
                    name: "国际期货"
                },{
                    id: 2,
                    name:"国内期货"
                },
               ], 
            wrOrHm:null,
            newPhoneNum:null, 
            newCode:null, 
            user:null,
            account:null,
            isShow:true,
            count:60,//验证码到计时
            codeName:"获取验证码",
            count2:60,
            codeName2:"获取验证码", 
            delay:1
        }
    },
    computed:{
          ...mapState(['userInfo'])
    },
    created(){
        this.wrOrHm=this.wrOrHms[0].id
    },
    methods:{
      ...mapActions(['getUserInfo']),
    //    focus:function(event){
    //            if(!this.loginPwd){
    //               event.target.type="text"
    //           }else{
    //              event.target.type="password"
    //           }
           
    //        },
    //      focus1:function(event){
            
    //            if(!this.userPwd){
    //               event.target.type="text"
    //           }else{
    //              event.target.type="password"
    //             }          
    //        },
    //       change:function(event){
           
    //            if(!this.loginPwd){
    //               event.target.type="text"
    //           }else{
    //              event.target.type="password"
    //           }  
                 
    //       },
    //         change1:function(event){
          
    //            if(!this.userPwd){
    //               event.target.type="text"
    //           }else{
    //              event.target.type="password"
    //             }                  
    //       },        
           async getCode () {
                const  _that = this;  
                let timer;  
                 if(this.displayCard){
                    if(this.user.phoneNumber==this.newPhoneNum){
                        message(_that,{},'新手机号码与旧手机号码相同')
                        return;
                    }
                }              
               if(_that.displayCard === 0){
                 timer=setInterval(function(){
                       _that.count--;
                   if( _that.count>0){
                          _that.codeName=_that.count+"秒可重新获取"; 
                                                        
                     }else{
                         clearInterval(timer);  
                        _that.codeName="获取验证码";
                        _that.count=60
                    }
                     
                },1000)                
     
              }else{
                      timer=setInterval(function(){
                       _that.count2--;
                   if( _that.count2>0){
                               _that.codeName2=_that.count2+"秒可重新获取"; 
                                                        
                     }else{
                         clearInterval(timer);  
                        _that.codeName2="获取验证码";
                        _that.count2=60
                    }
                     
                },1000)                
     
              }
                let data={};
                if(this.displayCard){
                      data={
                          phoneNumber:this.newPhoneNum,
                          type:4
                      }
                }else{
                    data={
                        phoneNumber:this.user.phoneNumber,
                        type:1
                    }
                }
            
                let res =await getPhoneCode(data);
                if(res && res.success){
                     console.log(res.result)
                }else{
                    if(this.isShow){
                        this.isShow=false;
                        message(_that,res);
                    }
                } 
         },
            //修改手机号 验证码和登录密码
           async onSubmit() {
                const _that = this;
                let data = {
                    "loginCode": _that.code,
                    "loginPassWord": _that.loginPwd               
                };
                if (!_that.code && this.isShow) {
                     this.isShow=false;
                     message(_that,{},'请输入验证码')
                }
                if (this.formstate.$invalid) {               
                    return;
                }
              if(_that.code  &&  _that.code.length ){
                  let res= await checkPhoneNumIsYourSelf(data);
                  if(res && res.success){
                          _that.displayCard = 1;
                  }else{
                     if(this.isShow){
                         this.isShow=false;
                         message(_that,res)
                     }
                  }
             }         
          },
           async next() {
                const  _that = this;           
                // var url = userEnum.checkBrokerCompanyAccountIsYourSelf;
                let data = {};
                if (_that.wrOrHm === 1) {
                    data = {
                        "loginCode": _that.code,
                        "loginPassWord": _that.loginPwd,
                        "account": _that.account,
                        "password": _that.userPwd,
                        "license": _that.license,
                        "appID": _that.appId,
                        "worldOrHome":_that.wrOrHm
                    }
                } else {
                    data = {
                        "loginCode": _that.code,
                        "loginPassWord": _that.loginPwd,
                        "account": _that.account,
                        "password": _that.userPwd,
                        "worldOrHome":_that.wrOrHm
                    }
                }     
            
                if(!this.account && _that.wrOrHm === 1){
                   return;
                }
                if (this.formstate.$invalid) {               
                    return;
                } 
             
                let res =await checkBrokerCompanyAccountIsYourSelf(data);
             
                if(res && res.success){
                     message(_that,{},'验证经济商账户通过','success');
                     _that.displayCard=2
                }else{
                     if(this.isShow){
                         this.isShow=false;
                         message(_that,res)
                     }   
                }

            },
             async save() {
            
                const _that = this;
                let data;
                if (_that.wrOrHm === 1) {
                    data = {
                        "loginCode": _that.code,
                        "loginPassWord": _that.loginPwd,
                        "account": _that.account,
                        "password": _that.userPwd,
                        "license": _that.license,
                        "appID": _that.appId,
                        "worldOrHome": _that.wrOrHm,
                        "newPhoneNum": _that.newPhoneNum,
                        "code":_that.newCode
                    }
                } else {
                    data = {
                        "loginCode": _that.code,
                        "loginPassWord": _that.loginPwd,
                        "account": _that.account,
                        "password": _that.userPwd,                 
                        "worldOrHome": _that.wrOrHm,
                        "newPhoneNum": _that.newPhoneNum,
                        "code": _that.newCode
                    }
                }
           
                if (this.formstate.$invalid) {               
                    return;
                }
               
                if (!_that.newCode) {
                   if(_that.isShow){
                           _that.isShow=false;
                           message(_that,{},'请输入新手机号')
                    }   
                }

               if(_that.newPhoneNum==_that.userInfo.phoneNumber){
                     if(_that.isShow){
                           _that.isShow=false;
                           message(_that,{},'新手机号码与原手机号码相同')                        
                      }                 
                 }
               if(_that.newCode && _that.newCode.length){
                   let res= await upDatePhoneNum(data);
                   if(res && res.success){
                           if(res.result){
                               message(_that,{},'手机号码修改成功','success',true);
                               this.getUserInfo();
                           }else{
                               message(_that,res)
                           }
                   }else{
                       if(this.isShow){
                           this.isShow=false;
                           message(_that,res)
                       }
                   }
                }
               
        }
    },
    mounted(){
          getUserInfo(this);
    }
}
</script>
<style lang="less" scoped>
  .phone_wrap{
      padding-top:25px;
      padding-left:25px;
      .form-group {
          margin-bottom: 25px;
      }
      .el-input{
          width: 200px;
          margin-left: 15px;
          margin-right: 15px;
      }
      .lgPwd2{
          margin-bottom: 25px;
      }
        span.left{
                    display: block;
                height: 40px;
                line-height: 40px;
            }
      .el-button{
           width: 120px;
            height: 40px;
            padding: 0;
            background: #FC543C;
            color: #FFF;
            outline: 0;      
            span{
               display: inline-block;
               height: 40px;
               line-height:40px;
            }
      }
       .el-button:active{
           border-color:#fc543c;
       }
       label{
           display: block;
           height: 40px;
           line-height: 40px;
       }
       .errorInfo {
           display: block;
           height: 40px;
           line-height: 40px;
           color: #fc543c;
       }
  }
  .btn_next{
    
      padding-left: 84px;
      .el-button{
          width: 100px;
      }
  }
</style>

