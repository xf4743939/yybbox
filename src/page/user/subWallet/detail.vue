<template>
   <div class="f12" id="detail">
        <div class="main">
            <div class="btn clear">
                <p v-for="(item,index) in navs" v-on:click="navBar(item.id)" ><span v-bind:class="{ tc:type==item.id }">{{ item.name }}</span></p>
            </div> 
            <div class="con" v-if="type==1 && user">        
                <div class="con1">
                    <p>预付费&nbsp;
                        <span class="payMoney">{{ (user.useMoney + user.activityWithdrawMoney + user.activityNoWithdrawMoney + user.shareMoney + user.followProfitMoney) | toDecimal }}元</span></p>
                    <p class="clear filter_select">
                        <span class="left">资金明细</span>
                          <el-select v-model="selectedMoneyType" class="selectMoney left">
                                <el-option
                                v-for="(item,index) in moneyDetail"
                                :value="item.id"
                                :key="item.id" 
                                :label="item.name">
                                </el-option>
                           </el-select>

                    </p>
                    <p class="clear filter_select" style="width:23%;">
                       <span class="left "> 日期</span>
                         <el-select v-model="selectedDateType"  
                         class="selectStyle left"
                         v-on:mousedown="mousedown()" 
                         v-on:mouseout="mouseout()"
                         v-bind:class="{ 'select_style':isShowDatePeroid }">
                                <el-option
                                  v-for="(item,index) in selectDate"
                                  :value="item.id"
                                  :key="item.id" 
                                  :label="item.name">
                                </el-option>
                           </el-select>
                     
                        <span class="selectSpan" v-bind:class="{ 'select_span':isShowDatePeroid }"> {{ peroid }} </span>
                    </p>
                </div>
                <div style="width:100%;overflow:hidden;">
                    <ul class="con2">
                        <li v-for="(item,index) in payMoneyDatas">
                            <p style="font-weight:bold">{{ item.payment }}{{ item.isStatus==2?"(完成)":"(处理中)" }}</p>
                            <p style="font-size: 18px; text-align: center">
                                {{ item.money }}元
                            </p>
                            <p style="float:right; color:#999999; text-align:right">{{ item.creationTime | format }}</p>
                        </li>

                    </ul>
                </div>
             
            </div>
            <div class="con" v-if="type==2 && user">
                <div class="con1">
                    <p>活动奖励&nbsp;<span class="payMoney">{{ user.activityWithdrawMoney | toDecimal }}</span>元</p>
                    <p v-on:click="show(1)" class="conver_fee">
                      <span style="display: block; height: 32px; width: 110px; color:#ff7301;border: 1px #ff7301 solid; font-size: 14px; text-align: center; line-height: 32px; border-radius: 4px; margin-top: 13px; margin-left: 30px;cursor:pointer">转化为预付费</span>
                    </p>
                    <p class="clear filter_select">
                            <span class="left">资金明细</span>
                            <el-select v-model="selectedMoneyType" class="selectMoney left">
                                    <el-option
                                    v-for="(item,index) in moneyDetail"
                                    :value="item.id"
                                    :key="item.id"  
                                    :label="item.name">
                                    </el-option>
                            </el-select>

                        </p>
                        <p class="clear filter_select" style="width:23%;">
                        <span class="left "> 日期</span>
                            <el-select v-model="selectedDateType"  
                            class="selectStyle left"
                            v-on:mousedown="mousedown()" 
                            v-on:mouseout="mouseout()"
                            v-bind:class="{ 'select_style':isShowDatePeroid }">
                                    <el-option
                                    v-for="(item,index) in selectDate"
                                    :value="item.id"
                                     :key="item.id" 
                                    :label="item.name">
                                    </el-option>
                            </el-select>
                        
                            <span class="selectSpan" v-bind:class="{ 'select_span':isShowDatePeroid }"> {{ peroid }} </span>
                        </p>
                </div>
                <div style="width:100%;overflow:hidden;">
                          <ul class="con2">
                              <li v-for="(item,index) in payMoneyDatas">
                                  <p style="font-weight:bold">{{ item.payment }}{{ item.isStatus==2?"(完成)":"(处理中)" }}</p>
                                  <p style="font-size: 18px; text-align: center">

                                      {{ item.money }}元
                                  </p>
                                  <p style="float:right; color:#999999; text-align:right">{{ item.creationTime | format }}</p>
                              </li>

                          </ul>
                </div>
             
            </div>
            <div class="con" v-if="type==3 && user">
                <div class="con1">
                    <p>推广奖励&nbsp;<span class="payMoney">{{ user.shareMoney | toDecimal }}元</span></p>
                    <p v-on:click="show(2)" class="conver_fee"><span style="display:block;color: #ff7301 ;height:32px; width:110px; border:1px #ff7301 solid; font-size:14px; text-align:center; line-height:32px; border-radius:4px; margin-top:13px; margin-left:30px;cursor:pointer">转化为预付费</span></p>
                    <p class="clear filter_select">
                        <span class="left">资金明细</span>
                          <el-select v-model="selectedMoneyType" class="selectMoney left">
                                <el-option
                                v-for="(item,index) in moneyDetail"
                                :value="item.id"
                                :key="item.id"  
                                :label="item.name">
                                </el-option>
                           </el-select>

                    </p>
                    <p class="clear filter_select" style="width:23%;">
                       <span class="left "> 日期</span>
                         <el-select v-model="selectedDateType"  
                         class="selectStyle left"
                         v-on:mousedown="mousedown()" 
                         v-on:mouseout="mouseout()"
                         v-bind:class="{ 'select_style':isShowDatePeroid }">
                                <el-option
                                  v-for="(item,index) in selectDate"
                                  :value="item.id"
                                  :key="item.id" 
                                  :label="item.name">
                                </el-option>
                           </el-select>
                     
                        <span class="selectSpan" v-bind:class="{ 'select_span':isShowDatePeroid }"> {{ peroid }} </span>
                    </p>
                </div>
                <div style="width:100%;overflow:hidden;">
                    <ul class="con2">
                        <li v-for="(item,index) in payMoneyDatas">
                            <p style="font-weight:bold">{{ item.payment }}{{ item.isStatus==2?"(完成)":"(处理中)" }}</p>
                            <p style="font-size: 18px; text-align: center">
                                {{ item.money }}元
                            </p>
                            <p style="float:right; color:#999999; text-align:right">{{ item.creationTime | format }}</p>
                        </li>
                    </ul>
                </div>
             
            </div>
            <div class="con" v-if="type==4 && user">
                <div class="con1">
                    <p>跟投返点&nbsp;<span class="payMoney">{{ user.followProfitMoney | toDecimal }}元</span></p>
                    <p v-on:click="show(3)" class="conver_fee"><span style="display: block;cursor:pointer; height: 32px;color:#ff7301 ;width: 110px; border: 1px #ff7301 solid; font-size: 14px; text-align: center; line-height: 32px; border-radius: 4px; margin-top: 13px; margin-left: 30px">转化为预付费</span></p>
                    <p class="clear filter_select">
                        <span class="left">资金明细</span>
                          <el-select v-model="selectedMoneyType" class="selectMoney left">
                                <el-option
                                v-for="(item,index) in moneyDetail"
                                :value="item.id"
                                 :key="item.id"  
                                :label="item.name">
                                </el-option>
                           </el-select>

                    </p>
                    <p class="clear filter_select" style="width:23%;">
                       <span class="left "> 日期</span>
                         <el-select v-model="selectedDateType"  
                         class="selectStyle left"
                         v-on:mousedown="mousedown()" 
                         v-on:mouseout="mouseout()"
                         v-bind:class="{ 'select_style':isShowDatePeroid }">
                                <el-option
                                  v-for="(item,index) in selectDate"
                                  :value="item.id"
                                  :key="item.id" 
                                  :label="item.name">
                                </el-option>
                           </el-select>
                     
                        <span class="selectSpan" v-bind:class="{ 'select_span':isShowDatePeroid }"> {{ peroid }} </span>
                    </p>
                </div>
                <div style="width:100%;overflow:hidden;" >
                    <ul class="con2">
                        <li v-for="(item,index) in payMoneyDatas">
                            <p style="font-weight:bold">{{ item.payment }}{{ item.isStatus==2?"(完成)":"(处理中)" }}</p>
                            <p style="font-size: 18px; text-align: center">
                                {{ item.money }}元
                            </p>
                            <p style="float:right; color:#999999; text-align:right">{{ item.creationTime | format }}</p>
                        </li>
                    </ul>
                </div>
               
            </div>
            <!--model-->
           <el-dialog 
                v-bind:title="modalTitle"
                 v-bind:visible.sync="visible"
               
                   width="30%"
                 >
                 <span>{{modalContent}}</span>
               <span slot="footer" class="dialog-footer">
                   <el-button v-on:click="cancel">
                       取消
                   </el-button>
                   <el-button v-on:click="ok" type="primary">确定</el-button>
               </span>          
           </el-dialog>
            <el-dialog 
                custom-class="dateClass"
               v-bind:title="modalTitle"
                v-bind:visible.sync="isShowDate"
                 width="35%">
             
                <el-date-picker v-model="value6"
                     type="daterange" range-separator="至"
                       start-placeholder="开始日期"
                       end-placeholder="结束日期">

                </el-date-picker>
                <span slot="footer" class="dialog-footer">
                    <el-button v-on:click="cancel1">
                        取消
                    </el-button>
                    <el-button v-on:click="ok1" type="primary">确定</el-button>
                </span>        
            </el-dialog>
          

        </div>
   </div>
</template>
<script>
import moment from 'moment'
import {getStore} from '../../../config/mUtils'
import message from '../../../config/message'
import {getAllFC,conversionFeeMoney} from '../../../api/getData'
export default {
    data(){
        return{
            moneyDetail: [],
            selectDate: [],
            DateSelect:[],
            value6:[],
            navs: [],
            active: 0,
            type:1,
            visible: false, //控制modal显示和隐藏
            isShowDate:false,
            modalTitle: "",
            modalContent: "",
            curIndex: 0,
            accountInfo: {},
            worldOrHome: "",
            selectedMoneyType: 1,
            selectedDateType:1,
            isType: 1, //财务类型
            inOut: 0, //出入金
            startDate: "",
            endDate: "",
            payMoneyDatas: [],//预付费的数据,
            sIndex:1, //下拉框选中
            peroid: '',//选择日期的时间段,
            isShowDatePeroid:false, //显示peroid,
            isShow:true,
            user:null
        }
    },
    created() {
            const _that = this;
           _that.type=parseInt(this.$route.query.type)         
                if (_that.type === 1) {
                    _that.moneyDetail = [
                    {
                        id: 1,
                        name: "全部"
                    },
                    {
                        id: 2,
                        name: "预存"
                    }, {
                        id: 3,
                        name: "提款"
                    }, {
                        id: 4,
                        name: "服务费"
                    }];
                } else if (_that.type===2) {
                    _that.moneyDetail = [
                        {
                            id: 1,
                            name: "全部"
                        },
                        {
                            id: 2,
                            name: "入金"
                        }, {
                            id: 3,
                            name: "出金"
                        }, {
                            id: 4,
                            name: "预付费奖励"
                        }
                    ];
                } else if (_that.type === 3) {
                    _that.moneyDetail = [
                        {
                            id: 1,
                            name: "全部"
                        },
                        {
                            id: 2,
                            name: "入金"
                        }, {
                            id: 3,
                            name: "出金"
                        }
                    ];
                } else {
                    _that.moneyDetail = [
                        {
                            id: 1,
                            name: "全部"
                        },
                        {
                            id: 2,
                            name: "入金"
                        }, {
                            id: 3,
                            name: "出金"
                        }
                    ];
                }
              
                _that.selectDate = [         
                    {
                        id:1,
                        name: "今天"
                    }, {
                        id: 2,
                        name: "近一周"
                    },
                    {
                        id: 3,
                        name: "近两周"
                    }, {
                        id: 4,
                        name: "近一个月"
                    }, {
                        id: 5,
                        name: "选择日期"
                    }
                ];
              
                _that.navs = [
                    {
                        id: 1,
                        name:"预付费"
                    }, {
                        id: 2,
                        name:"活动奖励"
                    }, {
                        id: 3,
                        name:"推广奖励"
                    }, {
                        id: 4,
                        name:"跟投返点"
                    }
                ];
           
        },
         watch: {
            selectedMoneyType(cur, old) {  
                this.getPage(parseInt(this.type));
            },
            selectedDateType(cur, old) {
              
                 if (this.selectedDateType===5) {
                     this.value6=[];
                    this.isShowDate = true;
                } else {            
                    this.isShowDate = false;
                  
                    this.getPage(parseInt(this.type));
                }
              
           },
           $route(to,from){     
                 this.getPage(parseInt(this.type));
          },   
          type(){
                const _that=this;
          
             if (_that.type === 1) {
                            _that.moneyDetail = [
                            {
                                id: 1,
                                name: "全部"
                            },
                            {
                                id: 2,
                                name: "预存"
                            }, {
                                id: 3,
                                name: "提款"
                            }, {
                                id: 4,
                                name: "服务费"
                            }];
                        } else if (_that.type===2) {
                            _that.moneyDetail = [
                                {
                                    id: 1,
                                    name: "全部"
                                },
                                {
                                    id: 2,
                                    name: "入金"
                                }, {
                                    id: 3,
                                    name: "出金"
                                }, {
                                    id: 4,
                                    name: "预付费奖励"
                                }
                            ];
                        } else if (_that.type === 3) {
                            _that.moneyDetail = [
                                {
                                    id: 1,
                                    name: "全部"
                                },
                                {
                                    id: 2,
                                    name: "入金"
                                }, {
                                    id: 3,
                                    name: "出金"
                                }
                            ];
                        } else {
                            _that.moneyDetail = [
                                {
                                    id: 1,
                                    name: "全部"
                                },
                                {
                                    id: 2,
                                    name: "入金"
                                }, {
                                    id: 3,
                                    name: "出金"
                                }
                            ];
                        }
                   }         
        },
        methods:{
              
           mousedown(){
              this.sIndex=this.selectedDateType; //把当前选中值得索引赋值给下拉选中索引
              this.selectedDateType=-1;
                            
          },
          mouseout(){
              var index= this.selectedDateType;
              if(index==-1){
                this.selectedDateType=this.sIndex;
              }
             
          },
          show(index) {
                //index 1表示活动奖励 2.表示推广奖励，3.边上跟投返点
            
                this.curIndex = index;
               
                if (index === 1) {
                  
                    if (this.user.activityWithdrawMoney === 0) {
                        this.modalContent = "没有可用资金";
                    } else {
                        this.modalTitle = "活动奖励";
                        this.modalContent = "活动奖励" + this.user.activityWithdrawMoney + "元转化为预付费";
                    } 
                  
                } else if (index === 2) {
                    if (this.user.shareMoney === 0) {
                        this.modalContent = "没有可用资金";

                    }else {
                        this.modalTitle = "推广奖励";
                        this.modalContent = "推广奖励" + this.user.shareMoney + "元转化为预付费";
                    }          
                } else {
                    if (this.user.followProfitMoney === 0) {
                        this.modalContent = "没有可用资金";
                      
                    } else {
                        this.modalTitle = "跟投返点";
                        this.modalContent = "跟投返点" + this.user.followProfitMoney + "元转化为预付费";
                    }                
                }
                this.visible = true;
            },
            filterInfo(type) {
               
                if (type === 1) {

                    switch (this.selectedMoneyType) {
                    case 1:
                        this.inOut = 0;
                        this.isType=1; 
                        break;
                    case 2:
                        this.isType = 1;
                        this.inOut = 1;
                        break;
                    case 3:
                        this.isType = 1;
                        this.inOut = 2;
                        break;
                    default:
                        this.isType = 5;
                        this.inOut = 2;
                    }
                }else if (type === 2) {
                    switch (this.selectedMoneyType) {
                    case 1:
                        this.isType = 6;
                        this.inOut = 0;
                        break;
                    case 2:
                        this.isType = 6;
                        this.inOut = 1;
                        break;
                    case 3:
                        this.isType = 6;
                        this.inOut = 2;
                        break;
                    default:
                        this.isType = 7;
                        this.inOut = 1;
                    }
                } else if (type === 3) {
                    switch (this.selectedMoneyType) {
                    case 1:
                        this.isType = 3;
                        this.inOut = 0;
                        break;
                    case 2:
                        this.isType = 3;
                        this.inOut = 1;
                        break;                     
                    default:
                        this.isType = 3;
                        this.inOut = 2;
                    }
                } else {
                    switch (this.selectedMoneyType) {
                    case 1:
                        this.isType = 8;
                        this.inOut = 0;
                        break;
                    case 2:
                        this.isType = 8;
                        this.inOut = 1;
                        break;
                    default:
                        this.isType = 8;
                        this.inOut = 2;
                    }
                }
             
                switch (this.selectedDateType) {
                case 1:                    
                    this.startDate = moment().format('YYYY-MM-DD ');
                    this.endDate = moment().format('YYYY-MM-DD ');
                    this.isShowDatePeroid = false;
                    this.peroid ="";
                    break;
                case 2:
                    this.startDate = moment().subtract(6,'days').format('YYYY-MM-DD');
                    this.endDate = moment().format('YYYY-MM-DD');
                    this.isShowDatePeroid = false;
                    this.peroid = "";
                    break;
                case 3:
                    this.startDate = moment().subtract(13,'days').format('YYYY-MM-DD');
                    this.endDate = moment().format('YYYY-MM-DD');
                    this.isShowDatePeroid = false;
                    this.peroid = "";
                    break;
                case 4:
                    this.startDate = moment().subtract(29,'days').format('YYYY-MM-DD');
                    this.endDate = moment().format('YYYY-MM-DD');
                    this.isShowDatePeroid = false;
                    this.peroid = "";
                    break;
                    default:
                                        
                }
            },
          async getPage(type) {
              
                //type 1预付费 2.活动 3.推广4.跟投
                const _that = this;
                // var url = userEnum.getAllFC;
                let data = {};
                let isType; //选的钱的类型
                let inOut;//出入金
                       
                if (type === 1) {
                   
                    this.filterInfo(type);
                }else if (type === 2) {
                   
                    _that.filterInfo(type);
                }else if (type === 3) {
                  
                    _that.filterInfo(type);
                } else {                  
                    _that.filterInfo(type);
                }
                data= {
                    "isType": _that.isType,
                    "inOut":_that.inOut,
                    "startDate":_that.startDate.trim(),
                    "endDate":_that.endDate.trim()
                }
               
                let res=await getAllFC(data)
               
                if(res.success){
                    _that.payMoneyDatas = res.result;     
                }else{
                     message(_that,res)
                }
               
            },
            navBar (index) {        
                this.type = index;
                this.$router.push({path:"/user/wallet/detail",query:{type:index}})              
                this.getPage(parseInt(this.type));
            },
           async ok () {
                this.visible=false;
                const _that = this;
                // var url = userEnum.conversionFeeMoney;
                let data = {};
              
                if (this.accountInfo && this.accountInfo.worldOrHome) {
                    this.worldOrHome = this.accountInfo.worldOrHome;
                } else {
                    message(_that,{},'你还没有绑定账户')                  
                }
                switch (this.curIndex) {
                case 1:
                    data = {
                        "converMoney": this.user.activityWithdrawMoney,
                        "converType": this.curIndex,
                        "worldOrHome": this.worldOrHome
                    }
                    break;
                case 2:
                    data = {
                        "converMoney": this.user.shareMoney,
                        "converType": this.curIndex,
                        "worldOrHome": this.worldOrHome
                    }
                    break;
                default:
                    data = {
                        "converMoney": this.user.followProfitMoney,
                        "converType": this.curIndex,
                        "worldOrHome":this.worldOrHome
                    }
                    break;
                }
                let res= await conversionFeeMoney(data)
                if(res.success){
                   message(_that,{},'转化成功','success',true)              
                }else{
                   message(_that,res)
                }
            },
            cancel () {          
               this.visible=false
            },
            ok1() {
             
                //选择日期的modal
                 if( !this.value6[0] ){
                     message(this,{},'请填写开始日期')
                }
               if(!this.value6[1] ){
                     message(this,{},'请填写结束日期')
                }
                            
                this.startDate =moment(this.value6[0]).format('YYYY-MM-DD');
                this.endDate = moment(this.value6[1]).format('YYYY-MM-DD');           
                this.isShowDatePeroid = true;
                this.peroid = this.startDate + "至" + this.endDate;
                this.isShowDate=false;
                this.getPage(parseInt(this.type));
            },
            cancel1() {
                this.isShowDate=false;
            },
        },
        mounted(){
            this.getPage(parseInt(this.type));
             if(!this.userInfo){  
                  let getInfo=JSON.parse(getStore("userInfo"));  
                    if(getInfo){          
                        this.user=getInfo.user;
                      }        
                }else{
                       this.user=this.userInfo.user;
                 }
        }    
}
</script>
<style lang="less">
 #detail{
     width: 100%;
     margin: 0 auto;
     .main{
         width:100%;
         margin: 0 auto;
         margin-top: 10px;
         .btn{
            border-bottom: 1px solid #e6e6e6;
            height: 45px; 
             .tc{
                color: #fff;
                background: #fc543c;
                border-radius: 20px;
             }
            p{
                width: 112px;
                height: 44px;
                color: #333;
                float: left;
                cursor: default;
                span{       
                       display: inline-block;
                        font-size: 14px;
                        text-align: center;
                        height: 28px;
                        width: 76px;
                        line-height: 28px;
                        margin-left: 15px;
                        margin-top: 5px; 
                        cursor: pointer;
                }
            }
         }
        
     }
     .con1{
         overflow: hidden;
         border-bottom: 1px solid #e6e6e6;
         .conver_fee{
                margin-left: 0px;
            }
        .filter_select{
            >span{
                display: inline-block;
                height: 100%;
                line-height: 60px;
            }
            >.select_span {
                font-size: 14px;
                color: #666;
                position: relative;

                width: 173px;
                display: block;
                float: right;            
          }            
        }    
         p{
             font-size: 14px;
            line-height: 60px;
            height: 60px;
            float: left;
            margin-left: 30px;
            width: 20%;
          
            .payMoney {
                        font-size: 16px;
                        color: #fc543c;
                     }
         }
        .selectMoney {
                       margin-top: 15px;
                       margin-left: 7px;
                        width: 120px;
                        font-size: 14px;
                        .el-input__inner{
                            height: 30px;
                        }
                    }
         .selectStyle{
                 margin-top: 15px;
                margin-left: 7px;
                width: 120px;
                font-size: 14px;
                .el-input__inner{
                    height: 30px;
                }
         }
         .select_style {
            width: 22px;
            height: 17px;
            font-size: 12px;
            border: 0;
            outline: 0;
            position: relative;
            top: 2px;
            text-align: center;
            .el-input{
                    .el-input__inner{
                        display: none;
                    }
                    .el-input__suffix{
                        top:21px;
                    }
                }
        }
         .selectSpan {
                        font-size: 18px;
                        color: #fc543c;
                    } 
             
     }
     .con2{
               width: 100%;
               margin: 0 auto;
                height: 650px;
            li{
                padding-left: 30px;
                padding-right: 20px;
                overflow: hidden;
                border-bottom: 1px solid #e6e6e6;
                p{
                    float: left;
                    font-size: 15px;
                    height: 50px;
                    line-height: 50px;
                    width: 33.33%;
                }
            }
     }
 }
</style>


