<template>
  <div class="card_manager">
      <div v-if="displayCard===0">
             <h3 v-if="bankCards">已绑定银行卡</h3>
                <el-table
                :data="bankCards"
                style="width:100%">
                    <el-table-column
                    label="银行名称"
                    width="246px">
                    <template slot-scope="scope">
                        <img :src="scope.row.logo">
                    </template>
                    </el-table-column>
                    <el-table-column
                        label="卡号"
                        width="246px">
                        <template slot-scope="scope">
                            <span>{{ scope.row.bankNumber | subStr(5,4) }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="状态"
                        width="246px">
                        <template slot-scope="scope">
                            <span>已认证</span>
                        </template>
                    </el-table-column>
                <el-table-column label="操作" width="246px">
                    <template slot-scope="scope">
                        <a  @click="deleteCard(scope.row.id)" class="delete_btn">删除</a>
                        <a  v-if="scope.row.status===1" class="update_btn" style="cursor:default">默认卡</a>
                        <a  v-if="scope.row.status===0" @click="setDefaultCard(scope.row.id)" class="update_btn" style="color:#fc543c">更改为默认卡</a>
                    </template>
                </el-table-column>
            </el-table>
            <div class="plug_btn clear">
                <img @click="addCard(1)" class="left" src="../../../../static/plug.png"/>
                <span class="left">添加银行卡</span>
            </div>
      </div>
      <div v-if="displayCard===1 && user">
            <div class="edit_info">
                <p class="edit_bankInfo" style="color: #F00; margin: 0 auto">注：为了确保资金安全，只能添加{{ user.surname | subStr(1,1) }}的银行卡</p>
                <p class="edit_bankInfo" style="margin-bottom:10px;">开户名<span style="margin-left:45px;display:inline-block;">{{ user.surname |subStr(1,1) }}</span></p>
                <p class="edit_bankInfo">
                    开户银行
                      <el-select v-model="bankName"  placeholder="请选择" style="margin-left:24px;">
                            <el-option                   
                            v-for="(item,index) in banks"
                            :key="item.id"
                            :label="item.bankName"
                            :value="item.bankName">
                            </el-option>
                       </el-select>
                </p>
                <p class="edit_bankInfo">
                    开户所在省
                      <el-select v-model="province"  placeholder="请选择" style="margin-left:10px;">
                            <el-option                    
                            v-for="(item,index) in provinces"
                            :key="index"
                            :label="item.name"
                            :value="item.name">
                            </el-option>
                        </el-select>
                   
                </p>
                <p class="edit_bankInfo">
                    开户所在市
                     <el-select v-model="city"  placeholder="请选择" style="margin-left:10px;">
                            <el-option
                            v-for="(item,index) in citys"
                            :key="index"
                            :label="item"
                            :value="item">
                            </el-option>
                     </el-select>
                </p>
                <p class="edit_bankInfo clear">
                    <span class="left">开户支行</span>
                    <el-input class="left edit_input" v-model="subBank" placeholder="开户银行"></el-input>
                    <!-- <input type="text" v-model="subBank" placeholder="开户银行" style="padding-left: 10px; color: #000; text-align: left" /> -->
                </p>
                <p class="edit_bankInfo clear">
                    <span class="left">银行卡号</span>
                    <el-input class="left edit_input" v-model="bankNumber" placeholder="银行卡号"></el-input>
                    <!-- <input type="text" v-model="bankNumber" placeholder="银行卡号" style="padding-left: 10px; color: #000; text-align: left" /> -->
                </p>
                <p class="edit_bankInfo clear">
                      <span class="left ">确认卡号</span>
                       <el-input class="left edit_input" v-model="confirmBankNumber" placeholder="确认卡号"></el-input>
                    <!-- <input type="text" v-model="confirmBankNumber" placeholder="确认卡号" style="padding-left: 10px; color: #000; text-align: left" /> -->
                </p>
                <p class="edit_bankInfo">
                    <el-button @click="createBankCard">确定</el-button>
                    <!-- <a v-on:click="createBankCard" style="margin-left: 98px; color: #fff;">确定</a> -->
                </p>
            </div>
        </div>
  </div>
 
</template>
<script>
import message from '../../../config/message'
import provinces from '../../../constants/province'
import{mapState,mapActions} from 'vuex'

import {getBankCards,getAllBanks,setDefaultCard,deleteCard,addBankCard,getCurrentLoginInformations} from '../../../api/getData'

export default {
    data(){
        return{
            displayCard: 0,
            banks:[],//所有的银行
            citys: [],
            provinces:[],
            bank: "",
            message:"",
            bankName: "",//开户银行
            province: "",
            city: "",
            subBank: "",//开户分行
            bankNumber: "",//卡号
            code: "",//银行代号
            confirmBankNumber: "",
            bankCards: [], //用户所有的银行卡,
            staus: 1,  //1代表添加银行卡2.表示修改银行卡
            id:0, //id 表示银行卡id
            isShow:true,
            user:null  
        }
    },
    created(){
        this.provinces=provinces; 
        this,getInfo()     
    },
    computed:{
        ...mapState(['userInfo'])
    },
    methods:{
           ...mapActions(['getUserInfo']),
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
          //得到当前用户下所有的银行卡
           async getBankCards(){
                const _that = this;
                let res=await getBankCards();
                if(res && res.success){
                       _that.bankCards=res.result;
                       console.log( _that.bankCards)
                        if(_that.bankCards && _that.bankCards.length){
                            this.getBankLogo(_that.bankCards);                         
                       }                                 
                }else{
                   message(_that,res)
                }

            },
            //获取所有开户银行
           async getAllBanks() {
                const _that = this;
                let res=await getAllBanks();
                 if(res && res.success){
                      _that.banks=res.result; 
                  
                 }else{
                     message(_that,res)
                 }
            },
            async createBankCard(){
                const _that=this;
                
            },
            //解绑银行卡
            async deleteCard(id){
                  const  _that = this;
                  let res= await deleteCard(id)
                  if(res && res.success){
                      this.isShow=false;
                      message(_that,{},'解绑银行卡成功','success')
                      this.getBankCards();               
                  }else{
                     message(_that,res)
                  }
            },
            //设置默认银行卡
            async setDefaultCard(id) {
              const  _that = this;
               if(_that.isShow){
                   let res= await setDefaultCard(id);
                   if(res && res.success){
                        this.isShow=false;
                        message(_that,{},'设置默认卡成功','success');
                        this.getBankCards();
                   }else{
                       message(_that,res)
                   }
              }          
            }, 
            //添加银行卡
            addCard: function (index) {    
                this.displayCard = 1;
                this.status = index;
            },
            //更新银行logo
            getBankLogo(items){
               items.forEach( item => {
                   switch(item.bankCode.toLowerCase()){
                       case 'boc':
                       item.logo='../../../../static/bank/BOC.png'
                       break;
                       case 'icbc':
                       item.logo='../../../../static/bank/ICBC.png'
                       break;
                       case 'ccb':
                       item.logo='../../../../static/bank/CCB.png'
                       break;
                       case 'bcm':
                       item.logo='../../../../static/bank/BCM.png'
                       break;
                       case 'abc':
                       item.logo='../../../../static/bank/ABC.png';
                       default:
                       item.logo='../../../../static/bank/CMBC.png'
                   }
               })   
            },
              //更新或增加银行卡
           async createBankCard() {
                 const _that = this;        
                    if (!this.bankName && this.isShow) 
                    {
                         this.isShow=false;
                        message(_that,{},'请选择开户银行')
                        
                     }
                    if (!this.province  && this.isShow) {                       
                         this.isShow=false;
                         message(_that,{},'请选择开户所在的省')
                    }
                    if (!this.city && this.isShow) {
                          this.isShow=false;
                          message(_that,{},'请选择开户所在的市')
                    }
                    if (!this.subBank && this.isShow) {            
                         this.isShow=false;
                          message(_that,{},'请输入开户支行')
                    }
                    if (!this.bankNumber && this.isShow) {
                         this.isShow=false;
                         message(_that,{},'请输入银行卡号')
                    }
                    if (!this.confirmBankNumber && this.isShow) {
                        this.isShow=false;
                        message(_that,{},'请输入确认银行卡号')
                    }
                    if (this.bankNumber !== this.confirmBankNumber && this.isShow) {
                         this.isShow=false;
                         message(_that,{},'两次卡号输入不一致')
                    }                      
                   if(this.isShow){
             
                        let name = this.bankName.trim();
                        let allBanks = this.banks.map(function (item, index) {
                            return item.bankName;
                        });
                        if (allBanks.indexOf(name) > -1) {
                            this.code = this.banks[allBanks.indexOf(name)].code;
                        }
                        let data = {
                            "realName": this.user.surname,
                            "bankName": this.bankName,
                            "province": this.province,
                            "city": this.city,
                            "subbranch": this.subBank,
                            "bankNumber": this.bankNumber,
                            "bankCode": this.code
                        };  
                
                        let res= await addBankCard(data);
                  
                        if(res && res.success){
                            message(_that,{},'添加银行卡成功','success',true);
                        }else{
                            message(_that,res)
                        }
                   }
              
           },    
    },
     watch: {
              province(cur,old) {           
                    const _that = this;
                    this.provinces.forEach(function(item, index) {
                        if (item.name.trim() === _that.province.trim()) {
                            _that.citys = item.city[0].area;
                        
                        }
                    });
                }
    },
    mounted(){

        this.getBankCards();
        this.getAllBanks();   
    }

}
</script>
<style lang="less">
    .card_manager{
        padding-left: 25px;
        padding-right: 25px;
        h3{
            font-size: 16px;
            margin-top: 30px;
            margin-bottom: 15px;
        }
        .el-table {
             thead{
                tr{
                    background-color: #f3e0e0;
                    th{
                        background: #f3e0e0;
                        color: #666;
                    }
                    // color:#666;
                }
             }
           img{
               width:200px ;
               height:auto;
           }
        }
        .delete_btn{
            padding-right: 9px;
           border-right: 1px solid #c0c4cc;
           color: #fc543c;
           font-size: 13px;
           cursor: pointer;
        }
        .update_btn{
            padding-left: 9px;
            font-size: 13px;
            cursor: pointer;
        }
    }
    .plug_btn{
        display: inline-block;
        margin-top: 25px;
        width: 136px;
        margin-left: 40%;; 
        img{
            display: block;
        }
        span{
            display: block;
            height:50px;
            line-height: 50px;
            margin-left: 15px;
        }
    }
    .edit_info{
        margin-top:25px;
        .el-button{
            margin-left: 84px;
            width: 100px;
            height: 40px;
            background: #fc543c;
            color: #fff;
            outline: 0;
            span{
                letter-spacing:6px;
            }
        }
        .el-button:active{
            color: #fff;
            border-color: #fc543c;
        }
        .edit_bankInfo{
            .edit_input{
                margin-left: 28px;
            }
            height:40px;
            margin-bottom: 30px;
            >span{
                display:block;
                height:40px ;
                line-height: 40px;             
            }
            .el-input{
                width: 200px;
                >input{
                    width: 200px;
                }
            } 
        }
    }
</style>


