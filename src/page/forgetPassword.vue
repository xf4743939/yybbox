<template>
   <div class="main">
    
            <headt-top></headt-top>
            <section class="reqister_container">   
                  <div class="register_text">
                       <span>忘记密码</span>
                       <span>有疑问?&nbsp;&nbsp;联系<a href="tencent://message/?uin=2067844913&Site=qq&Menu=yes" target="_blank" style="color:#fc543c;" >在线客服</a></span>
                  </div> 
                  <div class="clear" style="padding-top:45px;padding-bottom:50px;">
                    <div >
                        <el-form  status-icon :model="registerForm" ref="registerForm" class="forgetForm" :rules="rules" label-width="100px" >
                            <el-form-item label="手机号码" prop="phoneNumber">
                                <el-input type="text" v-model="registerForm.phoneNumber" auto-complete="off"></el-input>
                            </el-form-item>
                             <el-form-item label="手机验证码" prop="code">
                                <el-input v-model.number="registerForm.code"   style="width:170px;"></el-input>
                                <el-button style="height:40px;width:145px;" :disabled="registerForm.count<60" class="code" @click="getCode">{{ registerForm.codeName }}</el-button>
                            </el-form-item>
                            <el-form-item label="设置新密码" prop="password">
                                <el-input type="password" v-model="registerForm.password"  ></el-input>
                            </el-form-item>
                            <el-form-item label="确认新密码" prop="checkPassword">
                                <el-input type="password" v-model="registerForm.checkPassword" ></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button  @click="register('registerForm')" class="register_btn">{{ registerForm.registerName}}</el-button>
                            </el-form-item>                    
                        </el-form>
                  </div>
                
              </div>
               
            </section>
         <foot-bom></foot-bom>
      
   </div>
</template>

<script>
 import {getPhoneCode,findPassword} from '../api/getData'
 import headtTop from '../components/headTop'
 import footBom from '../components/footer'
 import {mapState,mapActions, mapMutations} from 'vuex'
 import {setStore} from '../config/mUtils'
 import message from '../config/message'
export default {
   data(){ 
     const validatePhone=(rule,value,callback) => {
        
       let reg = /^1[2|3|4|5|6|7|8|9]\d{9}$/;
         if(!value){
              callback(new Error('手机号为空'))
         }else if(!reg.test(value)){
              callback(new Error('手机号格式错误'))
         }else{
             callback()
         }
     };
     const validatePassword=(rule,value,callback) => {
           let reg = /[0-9A-Za-z]/;
        if(!value){
            callback(new Error('请输入密码'))
        }else if(value.length<6 || value.length>20){
            callback(new Error('密码长度应在6-20位之间！'))
        }else if(!reg.test(value)){
            callback(new Error('密码格式不正确'))
        }else{
            callback()
        }
     };
     const validateCheckPassword=(rule,value,callback) => {
           if(!value){
               callback(new Error('请再次输入密码'))
           }else if(value !== this.registerForm.password){
              callback(new Error('两次输入密码不一致!'))
           }else{
               callback()
           }
     };
     const validateCode=(rule,value,callback) => {
        if(!value){
            callback(new Error('请输入验证码'))
        }else{
            callback()
        }
     };
      return {
          registerForm:{
                phoneNumber:'',
                password:'',
                checkPassword:'',
                code:'',
                count:60,
                codeName:'获取验证码',
                registerName:'立即注册'  
          },
          rules:{
              phoneNumber:[{validator:validatePhone,trigger:'blur'}],
              password:[{validator:validatePassword,trigger:'blur'}],
              checkPassword:[{validator:validateCheckPassword,trigger:'blur'}],
              code:[{validator:validateCode,trigger:'blur'}],
          },
          isShow:true  
      }
   },
   components:{
        headtTop,
        footBom
   },

   computed:{
    
   },
   methods:{
      register(formName){
          const _that=this
           this.$refs[formName].validate( async(valid) => {
             
              if(valid){
    
                 let data={
                     "phoneNumber":_that.registerForm.phoneNumber,
                     "newPassword":_that.registerForm.password,
                     "code":_that.registerForm.code,
                 }
                 let res =await findPassword(data)
            debugger;
                 if(res && res.success){
                    _that.$message({
                            message: '新密码设置成功',
                            type: 'success',
                            duration: 2000,
                            center: true,
                            onClose:function(){
                                _that.isShow=true;
                              _that.$router.push({path:'/login'})
                        }
                    });
                     
                 }else{
                     message(_that,res)
                 }       

              }else{
                  return false;
              }
          })
      },
     async getCode(){
             const _that=this;
             let reg = /^1[2|3|4|5|6|7|8|9]\d{9}$/;
          if(!this.registerForm.phoneNumber){
             message(this,{},'手机号为空')
             return false;
          }
          if(reg.test(this.registerForm.phoneNumber)){
              debugger;
              let timer
              timer=setInterval( () => {
                  _that.registerForm.count--;
                  if( _that.registerForm.count>0){
                     _that.registerForm.codeName= _that.registerForm.count + '秒可重新获取'
                  }else{
                      clearInterval(timer)
                        _that.registerForm.codeName="获取验证码";
                        _that.registerForm.count=60;
                  }
              },1000)
              let data={
                    phoneNumber: _that.registerForm.phoneNumber,
                    type:2
              }
              let res= await getPhoneCode(data);
               if(res && res.success){
                     console.log(res.result)
                }else{
                    if(this.isShow){
                        this.isShow=false;
                        message(_that,res);
                    }
                } 

          }else{
              message(this,{},'手机号格式错误') 
              return false;
          }
       
      },
    
   },
  mounted(){
   
   
   },
}
</script>
<style lang="less">
  .reqister_container{
      width: 1200px;
      margin:  25px auto 20px auto;
      background: #fff;
      .code{
          height: 40px;
        position: relative;
        top: 2px;
        background: #fc543c;
        color: #fff;
      }
      .text_reqister{
          text-align: center;
          padding-left: 100px;
          margin-top: -8px;
          span:nth-of-type(1){
              color: #999;
          }
         a{
              color: #fc543c;
              margin-left: 3px;
          }
      }
      .register_btn{
          width: 316px;
          background: #fc543c;
          color: #fff;
      }
      .register_btn:active{
          border-color: #fc543c;
      }
      .el-form{
          margin-left: 10px;
      }
           .forgetForm{
            .el-form-item{
                width: 420px;
            } 
            margin-left: 320px;
            margin-top: 20px;
            margin-bottom: 48px;
        }
      .register_text{
          padding: 20px;
          border-bottom: 1px solid #e4e4e4;
          span:nth-of-type(1){
            margin-left: 11px;
            font-size: 18px;
            font-weight: bold;
            color: #333;
          }
          span:nth-of-type(2){
            font-size: 12px; 
            color: #999;
            margin-left: 14px;
          }
      }
      .sure_item{
          .is-checked{
              .el-checkbox__inner{
                  background-color: #fc543c;
                  border-color: #fc543c;
              }
          }
          .is-focus{
              .el-checkbox__inner{
                  border-color: #fc543c;
              }
          }
          .text1{
              color: #666;
              font-size: 13px;
              margin-left: 6px;
          }
          .text2{
              font-size: 13px;
              color: #fc543c;
          }
      }
  }
</style>

