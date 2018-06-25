<template>
    <div class="email_wrap">
        <el-form :model="myForm" status-icon  ref="myForm" label-width="100px"  class="demo-ruleForm">
                 <!-- <p class="lgPwd2" v-if="user">
                        <span>当前邮箱地址</span>
                        <span style="margin-left:10px;">{{ user.email | subStr(4,4) }}</span>
                  </p> -->
                <el-form-item label="当前邮箱地址" v-if="user" >
                      <span style="margin-left:10px;">{{ user.emailAddress | subStr(4,4) }}</span>
                </el-form-item>
                <el-form-item label="邮箱验证码" class="clear">
                    <el-input class="left" v-model="code" placeholder="验证码"  auto-complete="off"></el-input>
                    <el-button class="left" style="margin-left:15px;" :disabled="count<60" @click="getCode">{{codeName}}</el-button>
                </el-form-item>
                <el-form-item label="新邮箱地址"          
                 prop="newEmail"
                 class="clear"
                 :rules="[
                    { required: true, message: '请输入邮箱地址', trigger: 'blur' },
                    { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
                ]">
                    <el-input v-model="myForm.newEmail"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button  @click="onSubmit('myForm')">提交</el-button>            
                </el-form-item>
        </el-form>
           <!-- <vue-form v-bind:state="formstate" v-on:submit.prevent="onSubmit" show-messages="$touched || $submitted">
                    <p class="lgPwd2">
                        <span>当前邮箱地址</span>
                        <span style="margin-left:10px;">{{ user.email | subStr(4,4) }}</span>
                    </p>
                    <p class="lgPwd2 clear">
                        <span class="left">邮箱验证码</span>
                         <el-input class="left" v-model="code" placeholder="验证码"></el-input>
                         <el-button class="left" :disabled="count<60" @click="getCode">{{codeName}}</el-button>
                    </p>
                    <p class="lgPwd2  clear">
                        <label class="left">新邮箱地址</label>
                        <el-input class="left" type="email"name="newEmail"  v-model="newEmail"  placeholder="新地址" required></el-input>
                    </p>
                    <div class="btn_next">
                        <el-button  native-type="submit">确定</el-button>
                    </div>
                </vue-form> -->
    </div>
</template>
<script>
import message from '../../../config/message'
import{mapState,mapActions} from 'vuex'
import getUserInfo from '../../../config/getUserInfo'
export default {
    data(){
        return{
            myForm:{      
                newEmail:'',
            },
            inline:true,
            code:null,
            message:null,
            user:null,
            isShow:true,
            count:60,//验证码到计时
            codeName:"获取验证码",     
        }
    },
    computed:{
        ...mapState['userInfo']
    },
    methods:{
        ...mapActions(['getUserInfo']),
        async onSubmit(formName)
        {
           this.$refs[formName].validate((valid)=>{
              
               if(valid){
                   console.log('提交修改邮箱');
               }else{
                   return false;
               }
           })
          
        },
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
              
                let data={};
                return;
             
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
    },
    mounted(){
          getUserInfo(this);
          console.log(this.user)
    }

}
</script>
<style lang="less">
  .email_wrap{
          padding-top: 25px;
         padding-left: 25px;
         .el-input{
             width: 200px;
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
  }
</style>

