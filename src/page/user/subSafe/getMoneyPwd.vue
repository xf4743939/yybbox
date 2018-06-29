<template>
    <div class="phone_wrap">
        <div  class="content">
            <div v-if="user">
                <vue-form v-bind:state="formstate" v-on:submit.prevent="onSubmit" show-messages="$touched || $submitted">
                    <p class="lgPwd2">
                        <span style="width:90px">当前手机号</span>
                        <span style="margin-left:3px;">{{ user.phoneNumber | subStr(4,4) }}</span>
                    </p>
                    <p class="lgPwd2 clear">
                        <span class="left" style="width:90px;">手机验证码</span>
                         <el-input class="left" v-model="code" style="margin-left:3px;" placeholder="验证码"></el-input>
                         <el-button class="left" :disabled="count<60" @click="getCode">{{codeName}}</el-button>
                    </p>
                    <validate class="form-group form_wrap clear">
                        <label class="left">登录密码</label>
                        <el-input class="left" type="password" style="margin-left:3px;" name="loginPwd"  v-model="loginPwd" :maxlength="16"  :minlength="6" placeholder="登陆密码" required></el-input>
                        <field-messages name="loginPwd" v-if="formstate.loginPwd" class="errorInfo left">
                            <span slot="required">*请输入旧密码</span>
                            <span slot="maxlength">*密码最大为{{formstate.loginPwd.$attrs.maxlength}}位</span>
                            <span slot="minlength">*密码最小为{{formstate.loginPwd.$attrs.minlength}}位</span>
                        </field-messages>
                    </validate>
                    <validate class="form-group form_wrap clear">
                        <label class="left">旧提款密码</label>
                        <el-input class="left" type="password" style="margin-left:3px;" name="oldPwd"  v-model="oldPwd" :maxlength="16"  :minlength="6" placeholder="初次设置可以不填" required></el-input>
                        <!-- <field-messages name="oldPwd" v-if="formstate.oldPwd" class="errorInfo left">
                            <span slot="required">*请输入旧密码</span>
                            <span slot="maxlength">*密码最大为{{formstate.oldPwd.$attrs.maxlength}}位</span>
                            <span slot="minlength">*密码最小为{{formstate.oldPwd.$attrs.minlength}}位</span>
                        </field-messages> -->
                    </validate>
                     <validate class="form-group form_wrap clear">
                        <label class="left">新提款密码</label>
                        <el-input class="left" type="password" style="margin-left:3px;" name="newPwd"  v-model="newPwd" :maxlength="16"  :minlength="6" placeholder="新提款密码" required></el-input>
                        <field-messages name="newPwd" v-if="formstate.newPwd" class="errorInfo left">
                            <span slot="required">*请输入新提款密码</span>
                            <span slot="maxlength">*密码最大为{{formstate.newPwd.$attrs.maxlength}}位</span>
                            <span slot="minlength">*密码最小为{{formstate.newPwd.$attrs.minlength}}位</span>
                        </field-messages>
                    </validate>
                     <validate class="form-group form_wrap clear">
                        <label class="left">确认提款密码</label>
                        <el-input class="left" type="password" style="margin-left:3px;" name="confirmNewPwd"  v-model="confirmNewPwd" :maxlength="16"  :minlength="6" placeholder="确认提款密码" required></el-input>
                        <field-messages name="confirmNewPwd" v-if="formstate.confirmNewPwd" class="errorInfo left">
                            <span slot="required">*请输入确认提款密码</span>
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
import {upDatePayPwd,getPhoneCode,getCurrentLoginInformations} from '../../../api/getData'
import {removeStore} from '../../../config/mUtils'
export default {
    data(){
        return{
            code:'',
            message:'',
            formstate: {},
            user:null,    
            isShow:true,
            count:60,//验证码到计时
            codeName:"获取验证码",
            oldPwd:'',
            newPwd:'',
            confirmNewPwd:'',
            loginPwd: "",
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
                    type:5
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
                let  data = {
                    "loginPW": _that.loginPwd,
                    "oldPayPW": _that.oldPwd,
                    "newPayPW": _that.newPwd,
                    "code": _that.code
                };
            
                if (!_that.code && _that.isShow) {
                       _that.isShow=false
                       message(_that,{},'请输入验证码')
                };
                if((this.newPwd.trim()!==this.confirmNewPwd.trim())){
                   console.log('两次提款密码不一致')
                   return;
                }
                if(this.formstate.$invalid) {       
                    return;
                };
                let res= await upDatePayPwd(data);          
                if(res && res.success){
                     
                     message(_that,{},'提款密码修改成功','success',true)
                }else{
                    if(this.isShow){
                        this.isShow=false;
                        message(_that,res)
                    }
                }
            },
               //如果没有全局userInfo就重新请求
            async getInfo(){
                if(!this.userInfo){
                    let res= await getCurrentLoginInformations();
                        if(res && res.success){
                            this.user=res.result.user;
                        }else{
                            message(this,res)
                        }
                }else{
                    this.user=this.userInfo.user;          
                }   
            },         
    },
    mounted(){
        this.getInfo()
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
           width: 90px;
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
    
      padding-left: 94px;
      .el-button{
          width: 100px;
      }
  }
</style>



