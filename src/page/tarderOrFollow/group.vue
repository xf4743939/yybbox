<template>
   <div>
       <head-top></head-top>
    <section class="detail_wrap">
        <div class="step_tip">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item>策略组合/交易者</el-breadcrumb-item>
                <el-breadcrumb-item>精选组合</el-breadcrumb-item>
                <el-breadcrumb-item class="text">{{worldOrHome==1 ? '国际期货' : '国内期货'}}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="detail_info">
            <ul class="clear"  v-if="groupStrateInfo">
                <li class="left">
                     <img src="../../../static/default/traderGroup.png" class="left">
                    <div class="clear left info">
                        <img  style="border-radius:50%;" src="../../../static/default/50x50.png"  class="left info_left">
                        <div class="left info_right">
                            <p>{{groupStrateInfo.name}}<img :src="traderUrl" alt=""></p>
                            <p ><span>交易者</span>组合</p>
                            <p class="info_num"> 
                                <img src="../../../static/default/circle.png" alt="">
                                <span>被跟投人数</span>
                                <span>0</span>
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
                    <p>{{ groupStrateInfo.qty-groupStrateInfo.havingQty }}手 </p>
                </li>
                <li class="left li_width">
                    <p>胜率</p>
                    <p>{{ groupStrateInfo.winRate.toFixed(2)+'%' }}</p>
                </li>
                <li class="left li_width">
                   <el-progress :text-inside="true" :stroke-width="13" :percentage="groupStrateInfo.qty-groupStrateInfo.havingQty" color="#fc543c"></el-progress>
                   <div style="text-align:left;margin-top:20px;padding-left:45px">100份</div>
                </li>
                <li class="left btns">
                    <div class="clear">
                         <el-button v-if="groupStrateInfo.firmFollowStatus" size="mini"
                                   style="padding: 3px 15px;display:block;"
                                   type="danger"
                                   v-on:click="cancelFollow(true,groupStrateInfo)">取消跟投</el-button>
                         <!-- <el-button v-if="true" size="mini"
                                   style="padding: 3px 15px;display:block;"
                                   type="danger"
                                   v-on:click="cancelFollow(true,groupStrateInfo)">取消跟投</el-button>            -->
                        <el-button v-else size="mini"
                                   style="padding: 3px 15px;display:block;"
                                   type="danger"
                                   v-on:click="handleFirm(btnStatus.FirmFollow,true,groupStrateInfo)">实盘跟投</el-button>
                        <el-button v-if="groupStrateInfo.simFollowStatus" size="mini"
                                   v-bind:disabled="isDisableSimBtn"
                                   style="padding: 3px 15px; margin-top: 7px; margin-left: 0px;display:block;"
                                   v-on:click="cancelFollow(false,groupStrateInfo)">取消跟投</el-button>
                        <el-button v-else size="mini"
                                   v-bind:disabled="isDisableSimBtn"
                                   style="padding: 3px 15px; margin-top: 7px; margin-left: 0px;display:block;"
                                   v-on:click="handleFirm(btnStatus.simFollow,false,groupStrateInfo)">模拟跟投</el-button>
                    </div>
                </li>
            </ul>     
        </div>
        <div class="trader_wrap">
            <el-tabs v-model="tradeActive" @tab-click="tradeNav" class="trade_navs">
                <el-tab-pane label="业绩" name="1">
                    <out-standing v-if="isShowOutStanding" :groupStrateInfo="groupStrateInfo"></out-standing>
                </el-tab-pane>
                <el-tab-pane label="策略" name="2">
                   <strategy-detail v-if="isShowStrategy" :groupStrateInfo="groupStrateInfo" ></strategy-detail>
                </el-tab-pane>
                <el-tab-pane label="跟投" name="3">
                    还没有数据.....
                    <!-- 跟投组件 -->
                   <!-- <follow-list v-if="isShowFollowTable" :isTrader="isTrader" :userInfoForTrader="userInfoForTrader" ></follow-list> -->
                </el-tab-pane>
                <el-tab-pane label="订单" name="4">
                    <!-- 订单组件 -->
                  <group-order v-if="isShowGroupOrder" :groupStrateInfo="groupStrateInfo"></group-order>
                </el-tab-pane>
            </el-tabs>
        </div>

        <!-- modal -->
        <stragey-modal :isVisible="isVisible"     v-on:hideModal="hideModal" v-if="initData" :modalInfo="modalInfo" :groupStrateInfo="groupStrateInfo"></stragey-modal>
    </section>
    <foot-bom></foot-bom>
  </div>

</template>
<script>
 import {mapState,mapActions, mapMutations} from 'vuex'
 import message from '../../config/message'
 import headTop from '../../components/headTop'
 import footBom from '../../components/footer'
 import {getCombiStrategyDetail,getBrokerCompanyAccountOrNullFC,unFollowStrategy,getCurrentLoginInformations} from '../../api/getData'
 import { btnStatus} from '../../constants/enum'
 import strageyModal from '../../components/strageyFollowModal'
 import followList from '../../components/followList'
 import groupOrder from '../../components/groupOrder'
 import {prdUrl} from '../../constants/enum'
 import strategyDetail from '../../components/strategy'
 import outStanding from '../../components/outstanding'
export default {
    data(){
        return{
            user:null,
            traderUrl:'../../../static/default/trade.png',
            isVisible:false,//跟投dialog    
            initData:false, //不要modal 
            followOptions:{
               //正在跟投历史跟投的参数
            }, 
            worldOrHome:1,
            isShowGroupOrder:false, //显示订单列表
            isShowFollowTable:false, //显示跟投列表   
            isDisableSimBtn: false, //参加模拟比赛禁用
            isShowOutStanding:false, //是否显示净值组件
            isShowStrategy:false,//是否显示策略组件
            tradeActive:'1', //当前导航
            avator:'', //用户头像
            btnStatus:btnStatus,//判断按钮状态
            isShow:true, //message显示     
            prdUrl:prdUrl,//服务器的地址
            groupStrateInfo:null, //组合策略详细信息
            modalInfo:{},//传递给跟投modal
        }
    },
    components:{
      headTop,
      footBom,
      strageyModal,
      followList,
      groupOrder,
      strategyDetail,
      outStanding
    },
    created(){
       this.getInfo()
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
       //隐藏跟投modal
       hideModal(){
            this.initData=false;
            this.isVisible = false;
            this.getCombiStrategyDetail();
       },
          //取消跟投
       async cancelFollow(isFirm,item) {
                const _that = this; 
                let data
                if(isFirm){
                    data= {
                        "combiStrategyId": item.id,
                        "number": 0,
                        "followType":2
                    }
                }
                else
                 {
                    data= {
                        "combiStrategyId":item.id,
                        "number": 0,
                        "followType":1
                    }
                }    
                  this.$confirm('取消跟投操作会把你该跟投的持仓进行平仓,是否取消跟投?', '取消跟投', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                    }).then( async() => {
                            let res = await unFollowStrategy(data);      
                            
                            if(res && res.success){
                                _that.getCombiStrategyDetail();
                             
                            }else{
                                message(_that,res)
                            }
                    }).catch(() => {
                             
                    });
           
         }, 
      async getCombiStrategyDetail(){
             const _that=this
            let arrUrl=this.$route.path.split('/');
            this.worldOrHome=Number(arrUrl[2]);
            let data = {
                    "combiId":Number(arrUrl[2]),
                    "wh":Number(arrUrl[3]),
                };
          let res =await getCombiStrategyDetail(data);
         if(res && res.success){
             this.groupStrateInfo=res.result;
             this.isShowOutStanding=true;  
           
         }else{
           message(_that,res)
         }
       },
       //跟投(点击跟投出现dialog)
      async handleFirm(index,isFirm,row) { 
                const _that = this;   
                _that.modalInfo.clickBtn = index;
                _that.modalInfo.isFirm = isFirm ? 2 : 1;  //模拟跟实盘跟
                _that.modalInfo.worldOrHome = row.wh; 
              
            if(!this.user){
                if(this.isShow){
                    this.isShow=false;
                    message(_that,{},'您当前未登入系统，不能跟随操作')
                } 
            }else{
                      let res;                         
                       if (row.wh === 1) {        
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
    tradeNav(tab,event){
           switch(parseInt(tab.name)){
               case 1:
                this.isShowOutStanding=true
               break;
               case 2:
                this.isShowStrategy=true 
               break;
               case 3:
                this.isShowFollowTable=true       
               break;
               case 4:
               this.isShowGroupOrder=true
               break;
               default:
               this.isShowOutStanding=true
           }
           console.log(tab,event)
       },
    },
    mounted(){
      this.getCombiStrategyDetail();
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
.el-message-box{
    .el-message-box__header{
        border: 1px solid #e4e4e4;
        .el-message-box__title{
            text-align: center;
            span{
                color: #333;
            }
        }
    }
    .el-message-box__btns{
        button:nth-child(2){
            background: #fc543c;
            border-color: #fc543c;
        }
    }
}
</style>

