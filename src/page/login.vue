<template>
   <div class="login_page fillcontain">
        <transition name="form-fade" mode='in-out'>
        <section>
            <div class="manager_tip">
                ele 后台管理系统
            </div>
            <el-form :model="loginForm" status-icon :rules="rules" ref="loginForm"  class="demo-ruleForm">
                <el-form-item  prop="userName">
                    <el-input type="text" placeholder="请输入用户名" v-model="loginForm.userName" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item  prop="password">
                    <el-input type="password"  placeholder="请输入密码" v-model="loginForm.password" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('loginForm')">登录</el-button>                
                </el-form-item>
          </el-form>
           <div class="tip_list">
                 <p class="tip">温馨提示：</p>
				<p class="tip">未登录过的新用户，自动注册</p>
				<p class="tip">注册过的用户可凭账号密码登录</p>
           </div>
            
        </section>
        </transition>
     
   </div>
</template>

<script>
 import {getAdminInfo,login} from '../api/getData'
 import {mapState,mapActions} from 'vuex'
export default {
   data(){
       let validateUserName= (rule,value,callback) => {
           if(!value){
               callback(new Error('请输入用户名'))
           }else if(value && value.length<2){
               callback (new Error('用户名最少为2位'))
           }else if(value && value.length>12){
               callback (new Error('用户名最大为12位'))
           }else{
               callback()
           }
       };
         let validatePassword= (rule,value,callback) => {
           if(!value){
               callback(new Error('请输入密码'))
           }else if(value && value.length<2){
               callback (new Error('用户名最少为2位'))
           }else if(value && value.length>12){
               callback (new Error('用户名最大为12位'))
           }else{
               callback()
           }
       }; 
      return {
          loginForm:{
             userName:'',
             password:''
          },
        
          rules:{
             userName:[
                 {validator:validateUserName,trigger:'blur'}
             ],
             password:[
                   {validator:validatePassword,trigger:'blur'}
             ]
          },
          showLogin:false  
      }
   },
   mounted(){
     this.showLogin=true;
       if(!this.adminInfo.id){
           this.getAdminData()
       }
   },
   computed:{
      ...mapState(['adminInfo'])    
   },
   methods:{
      ...mapActions(['getAdminData']),
      async submitForm(name){
         
          this.$refs[name].validate(async(valid) => {
           
              if(valid){
                  let data={
                      user_name:this.loginForm.userName,
                      password:this.loginForm.password
                  }
               
                  const res=await login(data)
                  if(res.status==1){
                  
                      this.$message({
		                        type: 'success',
		                        message: '登录成功'
		              });
                      this.$router.push('manage')
                  }else{
                      this.$message({
                          type:"error",
                          message:res.message
                      });
                  }

              }else{
                this.$notify.error({
                    title: '错误',
                    message: '请输入正确的用户名或密码',
                    offset:100
                });
                return false;
              }
          })
      }
   },
   	watch: {
			adminInfo: function (newValue){
				if (newValue.id) {
					this.$message({
                        type: 'success',
                        message: '检测到您之前登录过，将自动登录'
                    });
					this.$router.push('manage')
				}
			}
		}  
}
</script>
<style lang="less">
  .login_page{
      background: #324057;
      position: relative;
      section{
         position: absolute;
        width: 380px;
        height: 260px;
        background: #fff;
        top: 30%;
        left: 50%;
        margin-left: -200px;
        text-align: center;
        border-radius: 6px;
        .manager_tip{
            position: relative;
            top: -100px;
            color: #fff;
            font-size: 34px;
        }
        .demo-ruleForm{
            position: relative;
            top: -26px;
            .el-input{
              .el-input__inner{
                  height: 34px;;
              }
            }
            .el-form-item__content{
                width: 80%;
                margin-left: 35px;
                button{
                    width: 100%;
                }
            }
        }
        .tip_list{
            position: relative;
            top: -33px;
            font-size: 13px;
            color: red;
        }
      }
  }
  .form-fade-enter-active, .form-fade-leave-active {
	  	transition: all 1s;
	}
	.form-fade-enter, .form-fade-leave-active {
	  	transform: translate3d(0, -50px, 0);
	  	opacity: 0;
	}
</style>

