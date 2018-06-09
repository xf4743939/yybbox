<template>
    <div class="val3">
    <div class="content">
        <div class="f12">
            <div v-if="isEdit && user" v-cloak>
                <vue-form v-bind:state="formstate" v-on:submit.prevent="saveAuth" show-messages="$touched || $submitted" >
                    <validate class="form-group form_wrap">
                        <label>真实姓名:</label>
                        <input v-if="user"  v-model="surname" required name="name" v-bind:maxlength="9" v-bind:minlength="1" type="text" placeholder="姓名" style="margin-left: 69px;" />
                        <field-messages name="name" class="errorInfo" v-if="formstate.name">
                            <span slot="required">*请输入昵称</span>
                            <span slot="maxlength">*昵称最大为{{formstate.name.$attrs.maxlength}}位</span>
                            <span slot="minlength">*昵称最小为{{formstate.name.$attrs.minlength}}位</span>
                        </field-messages>
                    </validate>
                    <validate class="form-group form_wrap">
                        <label>电子邮箱:</label>
                        <input  v-model="emailAddress" required name="email" type="email" placeholder="邮箱" style="margin-left: 69px;" />
                        <field-messages name="email"  class="errorInfo" v-if="formstate.email" >
                            <span slot="required">*请输入电子邮箱</span>
                            <span slot="email">*电子邮箱无效</span>
                        </field-messages>
                    </validate>
                   
                    <p class="f1222">
                        身份证件：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <select  v-if="user" v-model="cardId" style="width: 214px; height: 36px; margin-left: 34px;text-align:left;">
                          
                            <option v-for="(item,index) in cardTypes" v-bind:value="index">&nbsp;&nbsp;{{ item.name}}</option>
                        </select>
                    </p>
                    <validate class="form-group form_wrap">
                        <label>证件号码:</label>
                        <input  v-if="user" v-model="cardID" required name="cardID" v-bind:maxlength="18" v-bind:minlength="6" type="text" placeholder="证件号码" style="margin-left: 69px;" />
                        <field-messages name="cardID"  class="errorInfo" v-if="formstate.cardID" >
                            <span slot="required">*请输入证件号码</span>
                            <span slot="maxlength">*密码最大为{{formstate.cardID.$attrs.maxlength}}位</span>
                        </field-messages>
                    </validate>
                    <p class="f1222"><span style="margin-left: 131px; font-size: 16px; color: #F00">注：不支持身份信息修改，请谨慎填写，特殊情况请联系客服。</span></p>
                    <div>
                        <button class="btn btn-primary" type="submit" style="margin-left: 130px;">确定</button>
                    </div>
                </vue-form>
            </div>
            <div class="user-information" v-else v-cloak >
                <p class="f1222" style="border-bottom: 1px solid #ddd; padding-bottom: 15px;">
                    <span style="font-size: 14px;">真实姓名：&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    <span style="font-size: 14px;" v-if="user.surname">{{ user.surname | subStr(1,1) }}</span>
                </p>
                <p class="f1222" style="border-bottom: 1px solid #ddd; padding-bottom: 15px;">
                    <span style="font-size: 14px;">电子邮箱：&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    <span style="font-size: 14px;" v-if="user.emailAddress ">{{ user.emailAddress | subStr(2,8) }}</span>
                </p>
                <p class="f1222" style="border-bottom: 1px solid #ddd; padding-bottom: 15px;">
                    <span style="font-size: 14px;">身份证件：&nbsp;&nbsp;&nbsp;</span>
                    <span style="font-size: 14px;" v-if="user.cardTypeCode=='ID'"> 身份证 </span>
                </p>
                <p class="f1222" style="border-bottom: 1px solid #ddd; padding-bottom: 15px;">
                    <span style="font-size: 14px;"> 证件号码：&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    <span v-if="user.cardID">{{ user.cardID | subStr(3,4) }}</span>
                </p>
                <p class="f1222"><span style="margin-left: 86px; font-size: 16px; color: #F00">注：不支持身份信息修改，请谨慎填写，特殊情况请联系客服。</span></p>
            </div>
        </div>
    </div>
</div>
</template>
<script>
import message from '../../../config/message'
import{mapState,mapActions} from 'vuex'
import getUserInfo from '../../../config/getUserInfo'
import {realNameAuthentication,getCard} from '../../../api/getData'

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
       getUserInfo(this);
       this.getCard()
      if(!_that.user || !_that.user.surname || !_that.user.emailAddress || !_that.user.cardTypeCode ||!_that.user.cardID ){
            _that.isEdit=true
        }else{      
          _that.isEdit=false
      }       
    }
}
</script>
<style lang="less" scoped>
  .content {
    margin-top: 20px;
    overflow: hidden;
    margin-left: 36px;
 }
</style>


