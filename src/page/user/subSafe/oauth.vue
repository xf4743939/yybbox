<template>
    <div class="val3">
    <div class="content">
        <div class="user_main">
            <div v-if="isEdit && user" v-cloak>
                <vue-form v-bind:state="formstate" v-on:submit.prevent="saveAuth" show-messages="$touched || $submitted" >
                    <validate class="form-group form_wrap clear">
                        <label>真实姓名</label>
                        <el-input v-if="user" class="ele_input" v-model="surname"  required name="name" v-bind:maxlength="9" v-bind:minlength="1" type="text" placeholder="姓名"></el-input>
                        <field-messages name="name" class="errorInfo" v-if="formstate.name">
                            <span slot="required">*请输入昵称</span>
                            <span slot="maxlength">*昵称最大为{{formstate.name.$attrs.maxlength}}位</span>
                            <span slot="minlength">*昵称最小为{{formstate.name.$attrs.minlength}}位</span>
                        </field-messages>
                    </validate>
                    <validate class="form-group form_wrap clear">
                        <label>电子邮箱</label>
                        <el-input  v-model="emailAddress" class="ele_input"  required name="email" type="email" placeholder="邮箱"></el-input>
                        <field-messages name="email"  class="errorInfo" v-if="formstate.email" >
                            <span slot="required">*请输入电子邮箱</span>
                            <span slot="email">*电子邮箱无效</span>
                        </field-messages>
                    </validate>
                   
                    <p class="user_card">
                        身份证件
                         <el-select  v-if="user" v-model="cardId" placeholder="请选择">
                            <el-option  v-for="(item,index) in cardTypes" 
                                :label="item.name"
                                :value="index"
                                :key="item.id">
                           </el-option>
                         </el-select>
                        <!-- <select  v-model="cardId" style="width: 214px; height: 36px; margin-left: 34px;text-align:left;">
                          
                            <option v-for="(item,index) in cardTypes" v-bind:value="index">&nbsp;&nbsp;{{ item.name}}</option>
                        </select> -->
                    </p>
                    <validate class="form-group form_wrap clear">
                        <label>证件号码</label>
                        <el-input class="ele_input" v-if="user"  v-model="cardID" required name="cardID" v-bind:maxlength="18" v-bind:minlength="6" type="text" placeholder="证件号码" ></el-input>
                        <field-messages name="cardID"  class="errorInfo" v-if="formstate.cardID" >
                            <span slot="required">*请输入证件号码</span>
                            <span slot="maxlength">*密码最大为{{formstate.cardID.$attrs.maxlength}}位</span>
                        </field-messages>
                    </validate>
                    <p class="tip"><span style="font-size: 16px; color: #F00">注：不支持身份信息修改，请谨慎填写，特殊情况请联系客服。</span></p>
                    <div>
                        <el-button native-type="submit" class="save_btn">确定</el-button>
                    </div>
                </vue-form>
            </div>
            <div class="user_information" v-else v-cloak >
                <p class="user_text" style="border-bottom: 1px solid #ddd; padding-bottom: 15px;">
                    <span style="font-size: 14px;">真实姓名：&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    <span style="font-size: 14px;" v-if="user.surname">{{ user.surname | subStr(1,1) }}</span>
                </p>
                <p class="user_text" style="border-bottom: 1px solid #ddd; padding-bottom: 15px;">
                    <span style="font-size: 14px;">电子邮箱：&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    <span style="font-size: 14px;" v-if="user.emailAddress ">{{ user.emailAddress | subStr(2,8) }}</span>
                </p>
                <p class="user_text" style="border-bottom: 1px solid #ddd; padding-bottom: 15px;">
                    <span style="font-size: 14px;">身份证件：&nbsp;&nbsp;&nbsp;</span>
                    <span style="font-size: 14px;" v-if="user.cardTypeCode=='ID'"> 身份证 </span>
                    <span style="font-size: 14px;" v-else-if="user.cardTypeCode=='HKID'"> 香港身份证 </span>
                    <span style="font-size: 14px;" v-else-if="user.cardTypeCode=='MCID'"> 香港身份证 </span>
                    <span style="font-size: 14px;" v-else> 身份证 </span>
                </p>
                <p class="user_text" style="border-bottom: 1px solid #ddd; padding-bottom: 15px;">
                    <span style="font-size: 14px;"> 证件号码：&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    <span v-if="user.cardID">{{ user.cardID | subStr(3,4) }}</span>
                </p>
                <p class="user_text"><span style="font-size: 16px; color: #F00">注：不支持身份信息修改，请谨慎填写，特殊情况请联系客服。</span></p>
            </div>
        </div>
    </div>
</div>
</template>
<script>
import message from '../../../config/message'
import{mapState,mapActions} from 'vuex'

import {realNameAuthentication,getCard,getCurrentLoginInformations} from '../../../api/getData'

export default {
    data(){
       return{
            message:null,
            formstate:{},
            cardTypes: [],
            isEdit:true,
            message:"",
            user:{},
            cardId:0,
            isShow:true,
            surname:"",
            emailAddress:"",
            cardTypeCode:"",
            cardID:""
      }
    },
    computed:{
       ...mapState(['userInfo'])
    },
    methods:{
        ...mapActions(['getUserInfo']),
          //如果没有全局userInfo就重新请求
      async getInfo(){
          const _that=this
          if(!this.userInfo){
              let res= await getCurrentLoginInformations();
                if(res && res.success){
                    this.user=res.result.user; 
                     if(!_that.user || !_that.user.surname || !_that.user.emailAddress || !_that.user.cardTypeCode ||!_that.user.cardID ){
                            _that.isEdit=true
                        }else{      
                        _that.isEdit=false;
                    }                
                }else{
                    message(this,res)
                }
          }else{
               this.user=this.userInfo.user;
                 if(!_that.user || !_that.user.surname || !_that.user.emailAddress || !_that.user.cardTypeCode ||!_that.user.cardID ){
                            _that.isEdit=true
                        }else{      
                        _that.isEdit=false;
                    }              
          }   
      },
         async saveAuth() {
                const _that = this;
                if(this.cardTypes && this.cardTypes.length){
                   let findCard=this.cardTypes.forEach(function(item,index){
                       if(index==_that.cardId){
                            _that.cardTypeCode=item.code
                        }
                  })
               }   
                let data= {
                    "surname":_that.surname,
                    "cardTypeCode":_that.cardTypeCode,
                    "cardId":_that.cardID,
                    "emailAddress":_that.emailAddress
                }
              
                if (this.formstate.$invalid) {  
                   return;
                };
                let res=await realNameAuthentication(data);
          
                 if(res && res.success){
                    _that.isEdit=true;
                    this.getUserInfo();
                    message(_that,{},'实名认证成功','success',true)    
                }else{
                    message(_that,res)
                }        
            },
        async getCard(){
            const _that = this; 
            let res=await getCard({})       
            if(res && res.success){
                  _that.cardTypes = res.result.filter(x => x.isStatus > 0);
            }else{
               message(_that,res)
            }    
          }
    },
    mounted(){
       this.getInfo()
       this.getCard()
     
    }
}
</script>
<style lang="less" >
  .content {

    overflow: hidden;
    .user_main{
        form{
            padding-left: 25px;
            .user_card{
                margin-top:23px;
                .el-select{
                    width:212px;
                    height:36px;
                    margin-left:15px;
                }
                .el-input{
                    .el-input__inner{
                        height:36px;
                       
                    }
                }
            }
            .tip{
                margin-top:20px;
                span{
                    margin-left:77px;
                }
            }
            .save_btn{
                width: 100px;
                height: 36px;
                padding: 0;
                background: #fc543c;
                color: #fff;
                margin-top: 15px;
                margin-left: 76px;
            }
            .save_btn:active{
               border:1px solid #fc543c;
            }
            .form_wrap {
               margin-top: 23px;
                label {
                        font-size: 14px;
                        color: #333;
                        float: left;
                        display: block;
                        height: 36px;
                        line-height: 36px;
                }
                .ele_input{
                    float: left;
                    width: 212px;
                    height: 36px;
                    margin-left: 20px;
                    .el-input__inner{
                        height:36px ;
                    }
                }
                .errorInfo{
                    float: left;
                    display:block;
                    margin-left: 15px;
                    color:#fc543c;
                    font-size: 14px;
                    span{
                        font-size: 14px;
                        display: inline-block;
                        height: 36px;
                        line-height: 36px;
                    }
                }            
             }
             button[type="submit"]{
                   background: #fc543c;
                    outline: 0;
                    border: 0;
                    width: 100px;
                    height: 34px;
                    margin-top: 14px;
                    cursor: pointer;
                    color: #fff;
             }
        }
        .user_information{
             margin-top: 20px;
            overflow: hidden;
            margin-left: 36px;
            padding-top: 0px;
             padding-left: 0px;
            .user_text{
              font-size: 14px;
                color: #000;
                margin-top: 24px;
            }
        }
    }
 }
</style>


