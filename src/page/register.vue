<template>
   <div class="main">
    
            <headt-top></headt-top>
            <section style="margin-top:117px;">            
                   <el-form  status-icon  ref="registerForm" label-width="100px" >
                        <el-form-item label="手机号码">
                            <el-input type="text" v-model="phoneNumber" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="昵称" >
                            <el-input type="password" v-model="nickName" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="设置密码" >
                            <el-input v-model="password"></el-input>
                        </el-form-item>
                         <el-form-item label="确认密码" prop="age">
                            <el-input v-model="checkPassword"></el-input>
                        </el-form-item>
                         <el-form-item label="手机验证码" prop="age">
                            <el-input v-model.number="code"></el-input>
                            <el-button>获取验证码</el-button>
                        </el-form-item>
                        <el-form-item>
                            <el-button  @click="submitForm()">立即注册</el-button>
                        </el-form-item>
                        
                    </el-form>
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
    
   
   },
}
</script>
<style lang="less">
 
</style>

