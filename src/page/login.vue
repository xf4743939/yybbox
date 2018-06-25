<template>
   <div class="login_page fillcontain">
    
            <headt-top></headt-top>
            <section >
                <div class="login d" id="userLogin">
                    <form  method="post" v-on:submit.prevent="userLogin" > 
                        <div class="d1">
                            <div class="d2">
                                <div class="d3">
                                    <p class="d31">会员登录</p>
                                    <p class="d32">
                                        没账号？<a href="/user/register">立即注册</a>
                                    </p>
                                </div>

                                <div class="d4">
                                    <div class="d40">
                                        <p class="d41" style="height: 1px;"></p>
                                        <p class="d41">
                                            <input id="txtaccount" type="text" placeholder="请输入您的用户名/手机号码" style="padding-left: 10px" v-model="userName" name="userName">

                                            <img src="../images/default/user.png" />
                                        </p>
                                        <p class="d41" style="padding-top: 20px">
                                            <input  type="password" placeholder="请输入登录密码" style="padding-left: 10px" v-model="password" name="password">

                                            <img src="../images/default/lock.png"/>
                                        </p>
                                        <input type="hidden" name="grant_type" value="password"/>
                                        <input type="hidden" name="client_id" value="app"/>
                                        <input type="hidden" name="client_secret" value="app" />
                                
                                        <p class="d42">
                                            <el-checkbox class="remName" v-model="checked">记住用户名</el-checkbox>

                                            <!-- <span>记住密码</span> -->

                                            <a href="/forgetPassword">忘记密码？</a>
                                        </p>
                                        <input type="submit" id="submitBtn" v-model="loginText"/>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div> 
            </section>
         <foot-bom></foot-bom>
      
   </div>
</template>

<script>
 import {getToken,getCurrentLoginInformations} from '../api/getData'
 import headtTop from '../components/headTop'
 import footBom from '../components/footer'
 import {mapState,mapActions, mapMutations} from 'vuex'
 import {setStore} from '../config/mUtils'
export default {
   data(){  
      return {
         checked:true,
         loginText:'登录',
         userName:'',
         password:''
           
      }
   },
   components:{
        headtTop,
        footBom
   },
   mounted(){
   
   
   },
   computed:{
    
   },
   methods:{
     ...mapMutations(['saveUserInfo']),
     async userLogin(){
            const _that = this;
            if (!this.userName) {
                    this.loginText = "登录账号为空";
                    return false;
                }else if (!this.password) {
                    this.loginText = "登录密码为空";
                    return false;
                } else {                
                    this.loginText = "登录中....";              
                     let options = "userName=" + _that.userName + "&password=" + _that.password + "&grant_type=password&client_id=app&client_secret=app";                  
                     let res= await getToken(options);
                     if(res && res.access_token){
                         setStore('token', res);
                         let response=await getCurrentLoginInformations();
                         if(response && response.success){
                                setStore('userInfo',response.result)
                                _that.saveUserInfo(response.result);
                                _that.loginText="登录成功正在跳转....";                          
                                if(_that.checked){
                                setStore('userName', _that.userName);
                                }else{
                                removeStore("userName");
                                }
                                setInterval(
                                    () => {
                                    this.$router.push({path:'/'})
                                    },500)                  
                         }else{
                            _that.loginText=response.error.message;
                         }                        
                     }else{
                         _that.loginText = res.error_description;
                     }                 
                }
      }
   },
}
</script>
<style lang="less">
    /*登录*/
.login.d{background:url("../images/default/pexels-photo.jpg")  center top; height:820px; border-top:1px solid #f5f5f5; overflow:hidden;min-width:1200px;}
.login .d1{ width:1200px; margin:0 auto}
.login .d2{ width:392px; height:396px;     background: rgba(4,4,4,.4);  float:right; margin-top:60px}
.login .d3{ width:380px; height:64px; background:#FFF; margin-left:6px; margin-top:6px; border-bottom:1px solid #d6d6d6  ; overflow:hidden}
.login .d31{ font-size:24px; color:#3f3a39; line-height:64px; float:left;margin-left:18px;}
.login .d32{ font-size:15px; color:#808080; line-height:64px; float:right; margin-right:18px;}
.login .d32 a{ color:#FC817C; font-size:15px}

.login .d4{width:380px; height:319px; background:#FFF; margin-left:6px; }
.login .d40{ width:319px; margin:0 36px}
.login .d41 { width:300px; height:40px; position:relative;padding-top: 20px;display: block;}
.login .d41 input{text-align: left;padding-left:10px; width:300px; height:38px; font-size:14px; border:1px solid #d3d3d3; border-radius:3px; color:#000}
.login .d41 img{ position:absolute; right:10px; top:33px}
.login .d42 { margin-top:24px; overflow:hidden}
.login .d42 input{ height:18px; width:18px; float:left; } 

.login .d42 a{ float:right; color:#FC817C;font-size: 14px;margin-top: 1px;} 
.login .d43{ display:block; height:45px; width:310px; background:#FC534C; border-radius:4px; line-height:45px; font-size:18px; text-align:center; color:#FFF;margin-top: 30px;letter-spacing: 3px;}
.login .d43:hover{ opacity:0.8}

.remName .el-checkbox__input .el-checkbox__inner {
    color: #FC534C;
  
    border-color: #FC534C;
    height: 16px;
    width: 16px;
    border-radius: 50%;
}

.remName .el-checkbox__input .el-checkbox__inner:after {
    left: 5px;
    height: 8px;
}
.remName .el-checkbox__input +.el-checkbox__label {
    color: #333;
    position: relative;
    top: 1px;
}
.remName .is-checked .el-checkbox__inner {
      background-color: #FC534C;
}
#submitBtn {
   display: block;
    height: 45px;
    width: 310px;
    background: #FC534C;
    border-radius: 4px;
    line-height: 45px;
    font-size: 18px;
    text-align: center;
    color: #FFF;
    margin-top: 30px;
    outline: 0;
    border: 0;
    cursor: pointer;
}
  .form-fade-enter-active, .form-fade-leave-active {
	  	transition: all 1s;
	}
	.form-fade-enter, .form-fade-leave-active {
	  	transform: translate3d(0, -50px, 0);
	  	opacity: 0;
	}
</style>

