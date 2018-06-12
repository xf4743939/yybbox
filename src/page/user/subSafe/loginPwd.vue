<template>
    <div class="phone_wrap">
        <div  class="content">
            <div v-if="user">
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
                        <label class="left">旧密码</label>
                        <el-input class="left" type="password" style="margin-left:44px;" name="oldPwd"  v-model="oldPwd" :maxlength="16"  :minlength="6" placeholder="旧密码" required></el-input>
                        <field-messages name="oldPwd" v-if="formstate.oldPwd" class="errorInfo left">
                            <span slot="required">*请输入旧密码</span>
                            <span slot="maxlength">*密码最大为{{formstate.oldPwd.$attrs.maxlength}}位</span>
                            <span slot="minlength">*密码最小为{{formstate.oldPwd.$attrs.minlength}}位</span>
                        </field-messages>
                    </validate>
                     <validate class="form-group form_wrap clear">
                        <label class="left">新密码</label>
                        <el-input class="left" type="password" style="margin-left:44px;" name="newPwd"  v-model="newPwd" :maxlength="16"  :minlength="6" placeholder="新密码" required></el-input>
                        <field-messages name="newPwd" v-if="formstate.newPwd" class="errorInfo left">
                            <span slot="required">*请输入新密码</span>
                            <span slot="maxlength">*密码最大为{{formstate.newPwd.$attrs.maxlength}}位</span>
                            <span slot="minlength">*密码最小为{{formstate.newPwd.$attrs.minlength}}位</span>
                        </field-messages>
                    </validate>
                     <validate class="form-group form_wrap clear">
                        <label class="left">确认新密码</label>
                        <el-input class="left" type="password" style="margin-left:15px;" name="confirmNewPwd"  v-model="confirmNewPwd" :maxlength="16"  :minlength="6" placeholder="确认新密码" required></el-input>
                        <field-messages name="confirmNewPwd" v-if="formstate.confirmNewPwd" class="errorInfo left">
                            <span slot="required">*请输入确认新密码</span>
                            <span v-if="confirmNewPwd!==newPwd">*两次输入密码不一致</span>
                            <span slot="minlength">*密码最小为{{formstate.confirmNewPwd.$attrs.minlength}}位</span>
                        </field-messages>
                    </validate>
                    <div class="btn_next">
                        <el-button  native-type="submit">确定</el-button>
                    </div>
                </vue-form>
            </div>
        
        </div>
    </div>
</template>
<script>
import message from '../../../config/message'
import{mapState,mapActions} from 'vuex'
import getUserInfo from '../../../config/getUserInfo'
import {upDateLoginPwd,getPhoneCode} from '../../../api/getData'
import {removeStore} from '../../../config/mUtils'
export default {
    data(){
        return{
            code:null,
            message:null,
            formstate: {},
            user:null,    
            isShow:true,
            count:60,//验证码到计时
            codeName:"获取验证码",
            oldPwd:null,
            newPwd:null,
            confirmNewPwd:null,
            isSame:false
        }
    },
    computed:{
          ...mapState(['userInfo'])
    },
    created(){
    
    },
    methods:{
      ...mapActions(['getUserInfo']),
           async getCode () {
                const  _that = this;  
                let timer;  
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
              
                let data={
                    phoneNumber:this.user.phoneNumber,
                    type:3
                };
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
        async onSubmit() {               
                const  _that = this;
                let data = {
                    "oldPassword": _that.oldPwd,
                    "newPassword": _that.newPwd,
                    "code": _that.code
                };
                if (!_that.code && _that.isShow) {
                       _that.isShow=false
                       message(_that,{},'请输入验证码')
                };
                if(this.newPwd!=this.confirmNewPwd){
                    return;
                }
                if(this.formstate.$invalid) {       
                    return;
                };
            
                let res= await upDateLoginPwd(data);
             
                if(res && res.success){
                     removeStore('token');
                     removeStore('userInfo');
                     message(_that,{},'修改密码成功','success',true)
                }else{
                    if(this.isShow){
                        this.isShow=false;
                        message(_that,res)
                    }
                }
            },         
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


