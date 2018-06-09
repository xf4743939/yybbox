<template>
    <div class="user_information" v-if="user">
        <div class="user_nick clear">
           <span class="user_tip left">昵称</span>
          <el-input
             class="left"
             placeholder="请输入您的昵称"
             v-model="user.nickname"
             clearable>
          </el-input>
          <span class="left tip_message" v-if='showMessage'>*{{message}}</span>
        </div>
        <div class="user_sex user_nick clear">
             <span class="user_tip left">性别</span>
             <el-radio-group v-model="user.sex" class="left">
                    <el-radio :label="1">男</el-radio>
                    <el-radio :label="2">女</el-radio>
                    <el-radio :label="0">保密</el-radio>
            </el-radio-group>
        </div>
        <div class="btn">
               <el-button type="danger" @click="save">保存</el-button>
        </div>
    </div>
</template>
<script>
import message from '../../../config/message'
import{mapState,mapActions} from 'vuex'
import getUserInfo from '../../../config/getUserInfo'
import {upDateUser} from '../../../api/getData'
export default {
    data(){
       return{
           user:null,
           message:'',
           isShow:true,// ele messagebox
       }
    },
    created(){
    
    }, 
    computed: {
        ...mapState(['userInfo']),
         showMessage(){
             if(!this.user.nickname){
                 this.message="昵称为空";
                return true
             }else if(this.user.nickname.length>9){
                 this.message="昵称不能超过9个字符"
                 return true
             }else{
                 return false
             }
         },
    },
    methods:{
       ...mapActions(['getUserInfo']),
       async save(){
           const _that=this;
       
           if(this.showMessage){
             return false;
           }
       
           let data={
               "nickname":_that.user.nickname,
               "sex":parseInt(_that.user.sex)
           }
           let res=await upDateUser(data)
           if(res && res.success){
               this.isShow=false;
               this.getUserInfo();
               message(_that,{},'昵称修改成功','success',true)
        
           }else{
               message(_that,res)
           }
       }
    },
    mounted(){
       getUserInfo(this)
    }
}
</script>
<style lang="less">
  .user_information{
      background:#fff;
      background: #fff;
      padding-top: 46px;
      padding-left: 28px;
       .user_nick{
           .user_tip{
                height: 100%;
                display: block;
                line-height: 40px;
                letter-spacing: 13px;
           }
         .tip_message{
                height: 100%;
                display: block;
                line-height: 40px;
                margin-left: 10px;
                color: #fc543c;
         }
       }
       .user_sex{
           .el-radio-group{
               height: 100%;
               .el-radio{
                   line-height: 40px;
               }
           }
       }
      .el-input{
          width: 214px;
      }
      .el-input__inner{
          width: 214px;

      }
      .is-checked .el-radio__inner{
          border-color: #fc543c;
          background: #fff;
      }
      .el-radio__inner:after{
        background: #fc543c;
      }
      .el-radio__input.is-checked+.el-radio__label{
          color: #fc543c;
      }
      .btn{
          padding-left: 53px;
          padding-top: 6px;
          .el-button{
              width: 85px;
              padding: 6px 13px
          }
      }
  }
</style>


