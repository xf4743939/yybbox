<template>
   <div>
       <head-top></head-top>
    <section class="detail_wrap">
        <div class="step_tip">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item>策略组合/{{ isTrader? '交易员' : '跟随者' }}</el-breadcrumb-item>
                <el-breadcrumb-item>精选组合</el-breadcrumb-item>
                <el-breadcrumb-item class="text">{{modalInfo.worldOrHome==1 ? '国际期货' : '国内期货'}}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="detail_info">
            <ul class="clear"  v-if="userInfoForTrader">
                <li class="left">
                     <img :src=" !userInfoForTrader.icon ? '../../../static/default/traderGroup.png' : 'userInfoForTrader.icon' " class="left">
                    <div class="clear left info">
                        <img  src="../../../static/default/50x50.png" class="left info_left">
                        <div class="left info_right">
                            <p>xxxx组合<img :src="traderUrl" alt=""></p>
                            <p ><span>{{ isTrader ? '交易者' : '跟随者' }}</span>组合</p>
                            <p class="info_num"> 
                                <img src="../../../static/default/circle.png" alt="">
                                <span>被跟投人数</span>
                                <span>{{userInfoForTrader.followPeopleForFrim }}</span>
                            </p>
                        </div>
                    </div>
                </li>
                <li class="left li_width">
                    <p>净值</p>
                    <p>0港币</p>
                </li>
                <li class="left li_width">
                    <p>交易手数</p>
                    <p>{{ userInfoForTrader.oneUserInfo.totalQty }}</p>
                </li>
                <li class="left li_width">
                    <p>胜率</p>
                    <p>{{ (userInfoForTrader.oneUserInfo.totalPlusProfitQty/(userInfoForTrader.oneUserInfo.totalQty==0 ? 1 : userInfoForTrader.oneUserInfo.totalQty )) | toPercent   }}</p>
                </li>
                <li class="left li_width">
                   <el-progress :text-inside="true" :stroke-width="13" :percentage="50" color="#fc543c"></el-progress>
                   <div style="text-align:left;margin-top:20px;padding-left:45px">100份</div>
                </li>
                <li class="left btns">
                    <div class="clear">
                         <el-button v-if="userInfoForTrader.firmFollow" size="mini"
                                   style="padding: 3px 15px;display:block;"
                                   type="danger"
                                   v-on:click="handleFirm(btnStatus.editFirm,true,userInfoForTrader)">编辑实盘</el-button>
                        <el-button v-else size="mini"
                                   style="padding: 3px 15px;display:block;"
                                   type="danger"
                                   v-on:click="handleFirm(btnStatus.FirmFollow,true,userInfoForTrader)">实盘跟投</el-button>
                        <el-button v-if="userInfoForTrader.simFollow" size="mini"
                                   v-bind:disabled="isDisableSimBtn"
                                   style="padding: 3px 15px; margin-top: 7px; margin-left: 0px;display:block;"
                                   v-on:click="handleFirm(btnStatus.editSim,false,userInfoForTrader)">编辑模拟</el-button>
                        <el-button v-else size="mini"
                                   v-bind:disabled="isDisableSimBtn"
                                   style="padding: 3px 15px; margin-top: 7px; margin-left: 0px;display:block;"
                                   v-on:click="handleFirm(btnStatus.simFollow,false,userInfoForTrader)">模拟跟投</el-button>
                    </div>
                </li>
            </ul>

                    <follow-modal :isVisible="isVisible" 
                    :modalInfo="modalInfo"
                    v-on:hideModal="hideModal"
                    v-if="initData"
                    ></follow-modal>
            
          
        </div>
        <div class="trader_wrap">
            <el-tabs v-model="tradeActive" @tab-click="tradeNav" class="trade_navs">
                <el-tab-pane label="业绩" name="1">业绩</el-tab-pane>
                <el-tab-pane label="策略" name="2">策略</el-tab-pane>
                <el-tab-pane label="跟投" name="3">
                   <follow-list v-if="isShowFollowTable" :isTrader="isTrader" :userInfoForTrader="userInfoForTrader" ></follow-list>
                </el-tab-pane>
                <el-tab-pane label="订单" name="4">
                    <order-list v-if="showOrderTable" :worldOrHome="this.modalInfo.worldOrHome" :userInfoForTrader="userInfoForTrader" ></order-list>
                </el-tab-pane>
            </el-tabs>
        </div>
    </section>
    <foot-bom></foot-bom>
  </div>

</template>
<script>
 import {mapState,mapActions, mapMutations} from 'vuex'
 import message from '../../config/message'
 import headTop from '../../components/headTop'
 import footBom from '../../components/footer'
 import getUserInfo from '../../config/getUserInfo'
 import {getTraderList,getTraderForNBList,getBrokerCompanyAccountOrNullFC,currentUserGameStatus} from '../../api/getData'
 import { btnStatus} from '../../constants/enum'
 import followModal from '../../components/followModal'
 import followList from '../../components/followList'
 import orderList from '../../components/orderList'
export default {
    data(){
        return{
            user:null,
            traderUrl:'../../../static/default/trade.png',   
            isTrader:0, //1交易者0，跟投者 
            isVisible:false,//跟投dialog    
            initData:false, //不要modal 
            modalInfo:{
                // traderUserId:0,//交易员的用户id
                // worldOrHome:1,
                // num1: 1, //固定手数值
                // num2: 1,  //百分比
                // activeStyle: 1, //1表示选中固定数量2.表示按比例下单
                // activeDrection: 1, //表示正向跟投 2.表示反向跟投
                // isFirm: 2, //1表示模拟跟实盘2.表示实盘跟实盘
                // clickBtn: 2, //1.表示编辑实盘 2.表示实盘跟投3.编辑模拟 4.模拟跟投
            }, 
            followOptions:{
               //正在跟投历史跟投的参数
            }, 
            worldOrHome:1,
            showOrderTable:false, //显示订单列表
            isShowFollowTable:false, //显示跟投列表
            relationStatus:1, //1.表示正在跟投 2.表示历史跟投   
            userInfoForTrader:null,  //交易者或跟投者的个人信息
            isDisableSimBtn: false, //参加模拟比赛禁用
            tradeActive:'1', //当前导航
            avator:'', //用户头像
            btnStatus:btnStatus,//判断按钮状态
            isShow:true, //message显示     
            isDisableSimBtn: false, //参加模拟比赛禁用
        }
    },
    components:{
      headTop,
      footBom,
      followModal,
      followList,
      orderList
    },
    created(){
       getUserInfo(this);
    },
    computed:{
         ...mapState(['userInfo'])
    },
    methods:{
       ...mapActions(['getUserInfo']),
       //隐藏跟投modal
       hideModal(){
            this.initData=false;
            this.isVisible = false;
            this.getTraderInfo();
       },
       //判断正在跟投历史跟投按钮
    //    handleStatus(index){
    //       this.relationStatus=index;
    //       if(index==1){
    //          this.followOptions.followRelationshipStatus=1
    //       }else if(index==2){
    //          this.followOptions.followRelationshipStatus=0
    //       }
    //    },
    //   getFollowOptions(){
    //       let arrUrl=this.$route.path.split('/');
    //       this.followOptions.worldOrHome=Number(arrUrl[3]);
    //       this.followOptions.isTrader=Number(arrUrl[4]);
    //       this.followOptions.hasNickName=1;
    //       this.followOptions.followDirection=0;
    //       this.followOptions.followType=2; //表示实盘
    //       this.followOptions.rows=10;
    //       this.followOptions.traderUserId=Number(arrUrl[2]) //交易员id
    //       this.followOptions.followRelationshipStatus=this.relationStatus  //1.表示正在跟投 0表示历史跟投
    //   },
      async getTraderInfo(){
            const _that=this
            let arrUrl=this.$route.path.split('/');
            this.modalInfo.traderUserId=Number(arrUrl[2]),
            this.modalInfo.worldOrHome=Number(arrUrl[3]),
             this.isTrader=Number(arrUrl[4]);
             let res
            let data = {
                    "tradeUserId":Number(arrUrl[2]),
                    "accountType": 2, //模拟账号还是实盘账号
                    "worldOrHome":Number(arrUrl[3]),
                };
         if(this.isTrader){
              res= await getTraderList(data)
         }else{
            res=await getTraderForNBList(data)
         }
       
         if(res && res.success){
             this.userInfoForTrader=res.result.items[0];
           
         }else{
           message(_that,res)
         }
       },
       //follow modal options
       getFirmStatus(row){    
             const _that=this;
                if(row.firmFollow){
                     if (row.followRelationShip.followCount === 0 && row.followRelationShip.followPercentage!==0) {
                        _that.modalInfo.activeStyle = 2;
                        _that.modalInfo.activeDrection = row.followRelationShip.followDirection;
                        _that.modalInfo.num2 = row.followRelationShip.followPercentage;
                        _that.modalInfo.num1 = 1;
                    } else if (row.followRelationShip.followCount !== 0 && row.followRelationShip.followPercentage === 0) {
                        _that.modalInfo.activeStyle = 1;
                        _that.modalInfo.activeDrection = row.followRelationShip.followDirection;
                        _that.modalInfo.num1 = row.followRelationShip.followCount;
                        _that.modalInfo.num2 = 1;
                    }              
                }else{
                      _that.modalInfo.activeStyle = 1;
                        _that.modalInfo.activeDrection = 1;
                        _that.modalInfo.num1 = 1;
                        _that.modalInfo.num2 = 1;
                }
              
       },
       getSimStatus(row){
            const _that=this;
            if(row.simFollow){
                       if (row.simFollowRelationShip.followCount === 0 && row.simFollowRelationShip.followPercentage!==0) {
                        _that.modalInfo.activeStyle = 2;
                        _that.modalInfo.activeDrection = row.simFollowRelationShip.followDirection;
                        _that.modalInfo.num2 = row.simFollowRelationShip.followPercentage;
                        _that.modalInfo.num1 = 1;
                    } else if (row.simFollowRelationShip.followCount !== 0 && row.simFollowRelationShip.followPercentage === 0) {
                        _that.modalInfo.activeStyle = 1;
                        _that.modalInfo.activeDrection = row.simFollowRelationShip.followDirection;
                        _that.modalInfo.num1 = row.simFollowRelationShip.followCount;
                        _that.modalInfo.num2 = 1;
                    }             
                }else{
                        _that.modalInfo.activeStyle = 1;
                        _that.modalInfo.activeDrection = 1;
                        _that.modalInfo.num1 = 1;
                        _that.modalInfo.num2 = 1;
                }         
       },
       //跟投(点击跟投出现dialog)
      async handleFirm(index,isFirm,row) { 
               const _that = this;   
                _that.modalInfo.clickBtn = index;
               _that.modalInfo.isFirm = isFirm ? 2 : 1;  //模拟跟实盘跟
               if(isFirm){
                   this.getFirmStatus(row)
               } else{
                   this.getSimStatus(row)
               } 
            // _that.modalInfo.worldOrHome = row.worldOrHome; 
            if(!this.user){
                if(this.isShow){
                    this.isShow=false;
                    message(_that,{},'您当前未登入系统，不能跟随操作')
                } 
            }else{
                        let res;                         
                       if (row.worldOrHome === 1) {        
                          res = await getBrokerCompanyAccountOrNullFC(1);
                        } else {
                            res= await getBrokerCompanyAccountOrNullFC(2)                            
                        }
                    //获取经济商账户，有就让他跟投
                        if(res && res.success){ 
                          
                            _that.isVisible = true;
                            _that.initData=true;
                        }else{
                            message(_that,res)
                        }
            }
        
        },
     async getUserGameStatus(){
               const _that=this;
               let res;
               if(this.modalInfo.worldOrHome===1){
                  res = await currentUserGameStatus(1)
               }else{
                   res= await currentUserGameStatus(2)
               }
             
               if(res && res.success)
               {
                    
                    if (res.result) {
                        if (res.result === 1 || res.result === 2) {
                            _that.isDisableSimBtn = true;
                        } else {
                            _that.isDisableSimBtn = false;
                        }
                    }
               }
               
        },
    tradeNav(tab,event){
     
           switch(parseInt(tab.name)){
               case 1:
               break;
               case 2: 
               break;
               case 3:
                this.isShowFollowTable=true;       
               break;
               default:
               this.showOrderTable=true;

           }
           console.log(tab,event)
       },
    },
    mounted(){
        this.getUserGameStatus();
        this.getTraderInfo();
    }
}
</script>
<style lang="less" >
   .detail_wrap{
       width: 1200px;
       margin: 0 auto;
       padding-top: 20px;
       padding-bottom: 20px;
       .trader_wrap{
           background: #fff;
           margin-top: 20px;
           .el-tabs--top{
             .el-tabs__nav{
                 margin-left: 26px;
                 .el-tabs__active-bar{
                     background-color: #fc543c;
                 }
                 .el-tabs__item{
                     font-size: 16px;
                     color: #666;
                 }
                .el-tabs__item:hover{
                    color: #fc543c;
                }
                .is-active{
                    color: #fc543c;
                }
             }   
           }
       }
       .step_tip{
           margin-bottom: 13px;
           .el-breadcrumb{
               .el-breadcrumb__inner{
                   font-size: 16px;
                   color: #666;
               }
               .text{
                     .el-breadcrumb__inner{
                        font-weight: bold;
                     }            
               }
           }
       }
   }
   .detail_info{
       background: #fff;
       ul{
           height: 120px;
           .btns{
               margin-left: 30px;
               >div{
                   margin-top: 27px;
               }
           }
            .li_width{
                      width: 16%;
                      text-align: center;
                      p:nth-of-type(1){
                        margin-top: 30px;
                        font-weight: bold;
                        color: #666;
                      }
                      p:nth-of-type(2){
                        margin-top: 20px;
                        color: #fc543c; 
                      }
                      .el-progress{
                          width: 150px;
                          margin-top: 29px;
                      }
                      .el-progress-bar__innerText{
                           position: relative;
                           top:-3px;
                           font-size: 7px;
                       }
                }
           li{
               height: 120px;
               >img{
                   height: 100%;
               }
               .info{
                   margin-left: 25px;
                    height: 100%;
                    line-height: 120px;
                    
                    .info_left{
                        height: 50px;
                        width: 50px;
                        display: inline-block;
                        margin-top: 35px;
                    }
                    .info_right{
                        padding-right:25px;
                        border-right: 1px solid #e4e4e4;
                        margin-top: 24px;
                     
                        p{
                            margin-left: 24px;
                            font-size: 15px;
                        }
                        p:nth-of-type(1){
                            img{
                                position: relative;
                                top: 3px;
                                left: 5px;
                            }
                            margin-left: 24px;
                        }
                        p:nth-of-type(2){
                            font-size: 14px;
                            color: #666;
                            margin-top: 5px;
                            span{
                                font-size: 15px;
                                color: #fc543c;
                                margin-right: 4px;
                            }
                        }
                        .info_num{
                            img{
                                position: relative;
                                top: 5px;
                            }
                            span:nth-of-tyoe(1){
                               
                            }
                            span:nth-of-type(2){
                                color: #fc543c;
                                margin-top: 5px;
                            }
                        }
                    }
               }
           }
       }
   }

</style>

