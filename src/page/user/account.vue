<template>
       <el-col :span="21" class="user_right">
                   <div class="myWallet">
                      <h4 class="title">
                          <img src="../../images/Wallet.png"/>
                          <span>我的钱包</span>
                      </h4>
                      <div class="wallet_info">
                          <span class="account_name">账户余额</span>
                          <span class="account_num" v-if="user"><span>{{ (user.useMoney + user.activityNoWithdrawMoney + user.activityWithdrawMoney + user.shareMoney + user.followProfitMoney).toFixed(2) }}</span>元</span>                     
                          <span class="account_detail"><router-link to="/user/wallet/detail?type=1">钱包明细</router-link></span>
                      </div>
                   </div>
                   <div class="myMarket">
                         <h4 class="title">
                            <img src="../../images/mark.png"/>
                            <span>我的市场 </span>
                         </h4>
                       <el-tabs  type="border-card" v-model="activeName" @tab-click="selectAccount">
                           <el-tab-pane label="国际实盘" name="1">
                               <el-collapse accordion>
                                 <el-collapse-item>
                                      <template slot="title">
                                              <div class="acconut_info">
                                                    <ul >
                                                        <li><span class="line"></span><span class="text_tip">账户详情</span></li>
                                                        <li>
                                                            <img  class="img_type" src="../../images/account.png"/>
                                                            <span class="text1">账号</span>
                                                            <span v-if="brokerCompanyAccountsLongInfo" class="ellipsis text_content">{{brokerCompanyAccountsLongInfo.account | subStr(2,1)}}</span>
                                                            <span v-else>未绑定</span>
                                                            <span class="errMessage" v-if="brokerCompanyAccountsLongInfo && brokerCompanyAccountsLongInfo.recvMessage">{{brokerCompanyAccountsLongInfo.recvMessage}}</span>
                                                        </li>
                                                        <li v-if="brokerCompanyAccountsLongInfo">
                                                            <img class="img_type" :src="tradeOrFollowLogo" alt=""/>
                                                            <span class="text1">交易身份</span>
                                                            <span class="ellipsis text_content follows">{{ brokerCompanyAccountsLongInfo.accountType==1 ? '交易者' : '跟随者' }}</span>
                                                        </l>
                                                        <li v-if="brokerCompanyAccountsLongInfo">
                                                            <img class="img_type firm_icon"  :src="bindLogo" alt="">
                                                            <span class="text1 firm_unBind">已绑定实盘</span>
                                                        </li>
                                                        <li v-if="!brokerCompanyAccountsLongInfo">
                                                            <img class="img_type firm_icon"  :src="bindLogo" alt="">
                                                            <span class="text1 firm_tip">未绑定实盘</span>
                                                            <el-button @click="bindFirm" type="danger" size="mini" class="btn_bind">
                                                                    立即绑定
                                                            </el-button>
                                                        </li>
                                                    </ul>
                                               </div>
                                      </template>
                                      <div class="operator acconut_info">
                                           <ul class="clear" v-if="brokerCompanyAccountsLongInfo">
                                               <li class="left" style="margin-left:176px;">
                                                   <span style="color:#666;">
                                                       经济商
                                                   </span>
                                                   <span style="font-size:17px;margin-left:6px;">
                                                    
                                                   </span>
                                               </li>
                                               <li class="left" style="margin-left:49px;" v-if="brokerCompanyAccountsLongInfo">
                                                   <span style="color:#666;">创建时间</span>
                                                   <span>
                                                        {{ brokerCompanyAccountsLongInfo.creationTime | format }}
                                                   </span>
                                               </li>
                                               <li style="float:right;margin-right:22px">
                                                    <el-button @click="unBinding" type="danger" size="mini" class="btn_bind">
                                                                解除绑定
                                                     </el-button>
                                               </li>
                                           </ul>
                                           <div class="trade_rule">
                                               <p style="color:#333;font-weight:bold;margin-bottom:20px;font-size:16px;">交易细则：</p>
                                                <div class="rule_content">
                                                    <p>1、易友宝独立跟投平台，为保障您的资金独立安全，资金存取将通过您签约的经纪商平台完成.</p>
                                                    <p>2、正向跟随，默认跟随手数为0.01手，模拟用户每次开仓最大手数0.5手，同时间段最多可跟随3名交易员，总持仓手数不得大于3手.</p>
                                                    <p>3、按比例跟随，默认1:1跟随，总持仓手数最多不能超过3手，模拟账户的盈利数据保留3个月，亏损数据保留一个月.</p>
                                                    <p>4、易友宝诶独立跟投平台，为保障您的资金独立安全，资金存取将通过您签约的经纪商平台完成.<p>
                                                    <p>5、正向跟随，默认跟随手数为0.01手，模拟用户每次开仓最大手数0.5手，同时间段最多可跟随3名交易员，总持仓手数不得大于3手.</p>
                                                    <p>6、按比例跟随，默认1:1跟随，总持仓手数最多不能超过3手，模拟账户的盈利数据保留3个月，亏损数据保留一个月.</p>
                                                    <p>7、正向跟随，默认跟随手数为0.01手，模拟用户每次开仓最大手数0.5手，同时间段最多可跟随3名交易员，总持仓手数不得大于3手.</p>
                                                    <p>8、按比例跟随，默认1:1跟随，总持仓手数最多不能超过3手，模拟账户的盈利数据保留3个月，亏损数据保留一个月.</p>
                                                    <p>9、易友宝诶独立跟投平台，为保障您的资金独立安全，资金存取将通过您签约的经纪商平台完.</p>
                                                    <p>10、正向跟随，默认跟随手数为0.01手，模拟用户每次开仓最大手数0.5手，同时间段最多可跟随3名交易员，总持仓手数不得大于3手.</p>
                                                </div>
                                           </div>
                                      </div>
                                 </el-collapse-item>
                               </el-collapse>
                             
                           </el-tab-pane>
                           <el-tab-pane label="国内实盘" name="2">
                               <el-collapse accordion>
                                 <el-collapse-item>
                                      <template slot="title">
                                              <div class="acconut_info">
                                                    <ul >
                                                        <li><span class="line"></span><span class="text_tip">账户详情</span></li>
                                                        <li>
                                                            <img  class="img_type" src="../../images/account.png"/>
                                                            <span class="text1">账号</span>
                                                            <span v-if="brokerCompanyAccountsLongInfo" class="ellipsis text_content">{{brokerCompanyAccountsLongInfo.account | subStr(2,1)}}</span>
                                                            <span v-else>未绑定</span>
                                                        </li>
                                                        <li v-if="brokerCompanyAccountsLongInfo">
                                                            <img class="img_type" :src="tradeOrFollowLogo" alt=""/>
                                                            <span class="text1">交易身份</span>
                                                            <span class="ellipsis text_content follows">{{ brokerCompanyAccountsLongInfo.accountType==1 ? '交易者' : '跟随者' }}</span>
                                                        </l>
                                                        <li v-if="brokerCompanyAccountsLongInfo">
                                                            <img class="img_type firm_icon"  :src="bindLogo" alt="">
                                                            <span class="text1 firm_unBind">已绑定实盘</span>
                                                        </li>
                                                        <li v-if="!brokerCompanyAccountsLongInfo">
                                                            <img class="img_type firm_icon"  :src="bindLogo" alt="">
                                                            <span class="text1 firm_tip">未绑定实盘</span>
                                                            <el-button type="danger" size="mini" class="btn_bind">
                                                                    立即绑定
                                                            </el-button>
                                                        </li>
                                                    </ul>
                                               </div>
                                      </template>
                                      <div class="operator acconut_info">
                                           <ul class="clear">
                                               <li class="left" style="margin-left:176px;">
                                                   <span style="color:#666;">
                                                       经济商
                                                   </span>
                                                   <span style="font-size:17px;margin-left:6px;">
                                                       香港富商
                                                   </span>
                                               </li>
                                               <li class="left" style="margin-left:49px;" v-if="brokerCompanyAccountsLongInfo">
                                                   <span style="color:#666;">创建时间</span>
                                                   <span>
                                                        {{ brokerCompanyAccountsLongInfo.creationTime | format }}
                                                   </span>
                                               </li>
                                               <li style="float:right;margin-right:22px">
                                                    <el-button @click="unBinding"  type="danger" size="mini" class="btn_bind">
                                                                解除绑定
                                                     </el-button>
                                               </li>
                                           </ul>
                                           <div class="trade_rule">
                                               <p style="color:#333;font-weight:bold;margin-bottom:20px;font-size:16px;">交易细则：</p>
                                                <div class="rule_content">
                                                    <p>1、易友宝独立跟投平台，为保障您的资金独立安全，资金存取将通过您签约的经纪商平台完成.</p>
                                                    <p>2、正向跟随，默认跟随手数为0.01手，模拟用户每次开仓最大手数0.5手，同时间段最多可跟随3名交易员，总持仓手数不得大于3手.</p>
                                                    <p>3、按比例跟随，默认1:1跟随，总持仓手数最多不能超过3手，模拟账户的盈利数据保留3个月，亏损数据保留一个月.</p>
                                                    <p>4、易友宝诶独立跟投平台，为保障您的资金独立安全，资金存取将通过您签约的经纪商平台完成.<p>
                                                    <p>5、正向跟随，默认跟随手数为0.01手，模拟用户每次开仓最大手数0.5手，同时间段最多可跟随3名交易员，总持仓手数不得大于3手.</p>
                                                    <p>6、按比例跟随，默认1:1跟随，总持仓手数最多不能超过3手，模拟账户的盈利数据保留3个月，亏损数据保留一个月.</p>
                                                    <p>7、正向跟随，默认跟随手数为0.01手，模拟用户每次开仓最大手数0.5手，同时间段最多可跟随3名交易员，总持仓手数不得大于3手.</p>
                                                    <p>8、按比例跟随，默认1:1跟随，总持仓手数最多不能超过3手，模拟账户的盈利数据保留3个月，亏损数据保留一个月.</p>
                                                    <p>9、易友宝诶独立跟投平台，为保障您的资金独立安全，资金存取将通过您签约的经纪商平台完.</p>
                                                    <p>10、正向跟随，默认跟随手数为0.01手，模拟用户每次开仓最大手数0.5手，同时间段最多可跟随3名交易员，总持仓手数不得大于3手.</p>
                                                </div>
                                           </div>
                                      </div>
                                 </el-collapse-item>
                               </el-collapse>
                           </el-tab-pane>
                           <el-tab-pane label="国际模拟" name="3">
                                <el-collapse accordion>
                                    <el-collapse-item>
                                          <template slot="title">
                                              <div class="acconut_info">
                                                    <ul v-if="gameDetail">
                                                        <li><span class="line"></span><span class="text_tip">账户详情</span></li>
                                                        <li>
                                                            <img  class="img_type" src="../../images/account.png"/>
                                                            <span class="text1">账号</span>
                                                            <span style="width:100px" class="ellipsis text_content">{{gameDetail.user.userName | subStr(4,4)}}</span>
        
                                                        </li>
                                                      
                                                      <li v-if="gameDetail"  style="float:right;margin-right:120px;">
                                                            <img class="img_type firm_icon"  :src="isJoin" alt="">
                                                            <span class="text1 firm_tip" style="background:#999;color:#fff;padding:3px 7px;border-radius:8px;">
                                                                <span>已报名参赛</span>
                                                               <span>{{ gameDetail.cycel.name}}{{gameDetail.user.level==1 ? "选拔大赛" : "实盘预备赛" }}</span>
                                                            </span>
                                                        </li>
                                                        <li v-else>
                                                            <img class="img_type firm_icon"  :src="isJoin" alt="">
                                                            <span class="text1 firm_tip">未报名</span>
                                                            <el-button type="danger" size="mini" class="btn_bind">
                                                                    模拟大赛
                                                            </el-button>
                                                        </li>
                                                    </ul>
                                               </div>
                                           </template>
                                    </el-collapse-item>    
                                </el-collapse>
                           </el-tab-pane>
                           <el-tab-pane label="国内模拟" name="4">
                                 <el-collapse accordion>
                                    <el-collapse-item>
                                          <template slot="title">
                                              <div class="acconut_info">
                                                    <ul v-if="gameDetail">
                                                        <li><span class="line"></span><span class="text_tip">账户详情</span></li>
                                                        <li>
                                                            <img  class="img_type" src="../../images/account.png"/>
                                                            <span class="text1">账号</span>
                                                            <span v-if="user" style="width:100px" class="ellipsis text_content">{{gameDetail.user.userName | subStr(4,4)}}</span>
        
                                                        </li>
                                                      
                                                     <li v-if="gameDetail" style="float:right;margin-right:120px;">
                                                            <img class="img_type firm_icon"  :src="isJoin" alt="">
                                                            <span class="text1" style="background:#999;color:#fff;padding:3px 7px;border-radius:8px;"> 
                                                                <span>已报名参赛</span>
                                                               <span>{{ gameDetail.cycel.name}}{{gameDetail.user.level==1 ? "选拔大赛" : "实盘预备赛" }}</span>
                                                            </span>
                                                        </li>
                                                        <li v-else>
                                                            <img class="img_type firm_icon"  :src="isJoin" alt="">
                                                            <span class="text1 firm_tip">未报名</span>
                                                            <el-button type="danger" size="mini" class="btn_bind">
                                                                    模拟大赛
                                                            </el-button>
                                                        </li>
                                                    </ul>
                                               </div>
                                           </template>
                                    </el-collapse-item>    
                                </el-collapse>
                           </el-tab-pane>
                       </el-tabs>
                   </div>
                   <div class="account_detailed clear" v-if="worldOrHoeme==1 && accMoneyInfo ">
                    
                            <div class="left">
                                <span>币种</span>
                                <span>{{ accMoneyInfo.baseCcy }}</span>
                            </div>
                             <div class="left">
                                <span>日期</span>
                                <span>{{ accMoneyInfo.creationTime | dateFrm }}</span>
                            </div>
                            <div class="left">
                                <span>购买力</span>
                                <span>{{ (accMoneyInfo.buyingPower-accMoneyInfo.tradeCommission) | toDecimal }}</span>
                            </div>
                            <div class="left">
                                <span>资产净值</span>
                                <span>{{ accMoneyInfo.nav | toDecimal }}</span>
                            </div>
                            <p class="line"></p>
                            <div class="left">
                                <span>持仓盈亏</span>
                                <span>{{ accMoneyInfo.positionProfit | toDecimal }}</span>
                            </div>
                            <div class="left">
                                <span>平仓盈亏</span>
                                <span>{{ accMoneyInfo.closeProfit | toDecimal }}</span>
                            </div>
                            <div class="left">
                                <span>基本保证金</span>
                                <span>{{ accMoneyInfo.mMargin | toDecimal }}</span>
                            </div>
                             <div class="left">
                                <span>现金结余</span>
                                <span>{{ accMoneyInfo.cashBal | toDecimal }}</span>
                            </div>
                       
                   </div>
                    <div class="account_detailed account_home clear" v-if="worldOrHoeme==2 && accMoneyInfo ">                 
                            <div class="left">
                                <span>币种</span>
                                <span>{{ accMoneyInfo.baseCcy }}</span>
                            </div>
                             <div class="left">
                                <span>日期</span>
                                <span>{{ accMoneyInfo.creationTime | dateFrm }}</span>
                            </div>
                            <div class="left">
                                <span>动态权益</span>
                                <span>{{ accMoneyInfo.buyingPower | toDecimal }}</span>
                            </div>
                            <div class="left">
                                <span>静态权益</span>
                                <span>{{ accMoneyInfo.nav | toDecimal }}</span>
                            </div>
                         
                            <div class="left">
                                <span>持仓盈亏</span>
                                <span>{{ accMoneyInfo.positionProfit | toDecimal }}</span>
                            </div>
                            <div class="left">
                                <span>平仓盈亏</span>
                                <span>{{ accMoneyInfo.closeProfit | toDecimal }}</span>
                            </div>
                               <p class="line"></p>
                              <div class="left">
                                <span>上次结算保证金</span>
                                <span>{{ accMoneyInfo.marginCall | toDecimal }}</span>
                            </div>
                             <div class="left">
                                <span>冻结保证金</span>
                                <span>{{ accMoneyInfo.lockupAmt | toDecimal }}</span>
                            </div>
                            <div class="left">
                                <span>冻结手续费</span>
                                <span>{{ accMoneyInfo.tradeCommission | toDecimal }}</span>
                            </div>
                            <div class="left">
                                <span>手续费</span>
                                <span>{{ accMoneyInfo.totalFee | toDecimal }}</span>
                            </div>
                            <div class="left">
                                <span>占用保证金</span>
                                <span>{{ accMoneyInfo.mMargin | toDecimal }}</span>
                            </div>
                             <div class="left">
                                <span>可用金额</span>
                                <span>{{ accMoneyInfo.cashBal | toDecimal }}</span>
                            </div>
                       
                   </div>
                  
                   <div class="trader_wrap">
                         <h4 class="title">
                            <span class="line"></span>
                            <span>交易详情</span>
                        </h4>
                        <el-tabs v-model="tradeActive" @tab-click="tradeNav" class="trade_navs">
                            <el-tab-pane label="业绩" name="1">还没有数据...</el-tab-pane>
                            <el-tab-pane label="策略" name="2">还没有数据...</el-tab-pane>
                            <el-tab-pane label="跟投" name="3">
                                <follow-table v-if="isShowFollowTable"  :isTrader="isTrader" :uId="user.id" :type="types"></follow-table>
                            </el-tab-pane>
                            <el-tab-pane label="订单" name="4">订单</el-tab-pane>
                        </el-tabs>
                   </div>
        </el-col>
</template>
<script>
import {getStore} from '../../config/mUtils'
import{mapState,mapActions} from 'vuex'
import {getByUserIdAndAccountTypeFC,unBind,getBrokerCompanyAccountOrNullFC,getCurrentLoginInformations,getGameDetailOfUserId} from '../../api/getData'
import message from '../../config/message'
import moment from 'moment'
import followTable from '../../components/userFollow'
export default {
    data(){
        return{
            activeName:'1', //当前的选择账户的class
            types:1,//表示实盘类型 
            tradeActive:'1',//交易详情导航指示
            user:null,
            isSim:false,//模拟账号
            accMoneyInfo:null,
            isShowFollowTable:false,//是否显示跟投组件
            brokerCompanyAccountsLongInfo:null,
            tradeOrFollowLogo:'', //交易者或者跟投者的图标
            bindLogo:'', //绑定或者没绑定的图标
            worldOrHoeme:1, //1.表示国际 2.表示国内
            isJoin:'',//图标地址报名未报名
            isShow:true,
            isTrader:0, //是否是交易者1.交易者0.跟投者
            gameDetail:null, //大赛信息
        }
    },
    filters:{
      dateFrm(el){
         if(!el) return '';
         return moment(el).format('YYYY-MM-DD');
      }
    },
    computed:{
       ...mapState(['userInfo'])
    },
    components:{
        followTable
    },
    methods:{
        ...mapActions(['getUserInfo']),
       tradeNav(tab,event){
          if(Number(tab.name)==3){
              this.isShowFollowTable=true;
          }
       },
      async unBinding(){
         const _that=this;
         this.$confirm('确定解绑经济商账号之前,请确保已全撤清仓!','提示',{
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
               
         }).then( async() => {
            let res= await unBind(this.worldOrHoeme);
            if(res && res.success){
               message(_that,{},'解除绑定成功','success',true)
            }else{
                message(_that,res)
            }

         }).catch(() => {
            //  message(_that,{},'已取消')
         })
      },
      bindFirm(){
           this.$confirm('确定立即绑定!','提示',{
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
           }).then( () => {
                this.$router.push({
                    path:'/openFirm'
                }) 
           }).catch( () => {

           })
      },
      //如果没有全局userInfo就重新请求
      async getInfo(){
          if(!this.userInfo){
              let res= await getCurrentLoginInformations();
                if(res && res.success){
                    this.user=res.result.user;
                    console.log(this.user)
                }else{
                    message(this,res)
                }
          }else{
                this.user=this.userInfo.user;
          }   
      },
      //得到账户模拟账号详情
      async getGameDetail(id,wh){
         let data={
             "userId":id,
             "worldOrHome":wh,
         };
         let res=await getGameDetailOfUserId(data)
         if(res && res.success){
             this.gameDetail=res.result
               if(!this.gameDetail){
                this.isJoin=require('../../images/nogame.png') 
              }else{
                this.isJoin=require('../../images/game.png');
             }  
         }else{
             message(_that,res)
         }
      },
      //得到经济商资金详情
      async getAccMoneyInfo(accountType,wh){
           let data = {
                "accountType":accountType,
                "worldOrHome":wh
                };

            let res=await getByUserIdAndAccountTypeFC(data);
           if(res.success){
               this.accMoneyInfo=res.result.accMoneyInfo;  
           }else{
              message(this,res);
           }            
      },
      //得到经纪商账户信息
      async getBrokerCompanyAccountOrNullFC(wh){
             let res=await  getBrokerCompanyAccountOrNullFC(wh);
            if(res && res.success){
               this.brokerCompanyAccountsLongInfo=res.result;
              if(!this.brokerCompanyAccountsLongInfo){
                     this.bindLogo=require('../../images/nogame.png') 
              }else{ 
                 this.bindLogo=require('../../images/game.png');
                 this.getImgUrl(this.brokerCompanyAccountsLongInfo);
               }              
              this.isTrader=this.brokerCompanyAccountsLongInfo.accountType==1? 1 : 0 
            }else{
                message(_that,res)
            } 
      },
      //国际国内实盘账户信息
      async selectAccount(tab,event){
      
          this.activeName=tab.name;
          this.types=Number(tab.name)
          if(Number(tab.name)==1 ||  tab==1 ){
                  this.getBrokerCompanyAccountOrNullFC(1);
                  this.getAccMoneyInfo(2,1)
          }else if(Number(tab.name)==2){
                  this.getBrokerCompanyAccountOrNullFC(2);
                  this.getAccMoneyInfo(2,2)
          } else if(Number(tab.name)==3){       
              this.getGameDetail(this.user.id,1)
              this.getAccMoneyInfo(1,1)
          }else if(Number(tab.name)==4){
                this.getAccMoneyInfo(1,2)
               this.getGameDetail(this.user.id,2)
          } 
        },
        getImgUrl(item){
            if(item.accountType===1){
                this.tradeOrFollowLogo=require('../../images/trade.png')
            }else{
                this.tradeOrFollowLogo=require('../../images/follow.png')
            }
            
        }
    },
    mounted(){  
         this.getInfo();
        this.selectAccount(1);           
    }
}
</script>
<style lang="less" >

   .title{
          padding-left: 35px;
          padding-top: 20px;
          img{
              height: 18px;
              width: 18px;
          }
          span{
                position: relative;
                font-size: 18px;
                color: #666;
                font-weight: bold;
                margin-left: 8px;
                top: -2px;
          }
      }
  .myWallet{
      margin-top: 20px;
     
      .wallet_info{
            height: 70px;
            background: #fff;
            margin-left: 14px;
            margin-bottom: 10px;
            box-shadow: 1px 1px 4px 1px #d9dce2;
            margin-top: 5px;
            span{
                display: inline-block;
                color: #333;
            }
            .account_name{
                margin-top: 26px;
                margin-left: 48px;
            }
            .account_num{
                margin-left: 30px;
                width: 130px;
                span{
                    margin-right: 3px;
                    color: #ea6e69;
                    font-weight: bold;
                    font-size: 14px;
                }
            }
            .account_detail{
                margin-left: 173px;
                a{
                    color: #ea5151;
                }
            }
      }
  }
  .myMarket{
      .el-tabs__nav{
          margin-left: 0px;
      }
      .el-tabs{
          background: #f5f5f5;
          margin-left: 14px;
          margin-top: 3px;
          .el-tabs__content{
              padding: 0px;
              .el-collapse-item__wrap{
                  background: #f5f5f5;
              }
          }
      }
      .el-tabs>.el-tabs__header .el-tabs__nav .el-tabs__item.is-active {
            color: #FD8A88;
            border-top: 4px solid #EF5E5D;
     }
     .el-tabs>.el-tabs__header .el-tabs__nav .el-tabs__item {
          border-top-width: 4px;
          line-height: 35px;
    }
    .el-collapse{
        border: 0;
    }
    .el-collapse-item__header{
        height: 35px;
        line-height: 35px;
        .el-collapse-item__arrow{
            line-height: 36px
        }
    }
  }
.acconut_info{
    ul{
        li{
            float: left;
            height: 36px;
            line-height: 36px;
            .line{
                width: 3px;
                height: 25px;
                background: #CA534C;
                display: inline-block;
                margin-top: 5px;
            }
             .text_tip{
                    display: inline-block;
                    margin-left: 9px;              
                    position: relative;
                    top: -7px;
                }
            .img_type{
                position: relative;
                top: 3px;
            }
            .text1{
                margin-left: 5px;
                margin-right: 5px;
                display: inline-block;
                color: #666;
            }
            .firm_bind{
                    height: 22px;
                    background: #999;
                    line-height: 22px;
                    color: #fff;
                    padding: 2px 5px;
                    border-radius: 6px;
            }
            .firm_unBind{
                color: #666;
            }
            .text_content{
                display: inline-block;
                position: relative;
                top:3px;
                width: 50px;
            }
            .follows{
                font-size: 16px;
            } 
            .btn_bind {
                padding: 4px 13px;
            }   
        }
        li:nth-of-type(1){
            width: 15%;
            padding-left: 15px;
        }
        li:nth-of-type(2){
            width: 24%;
            
        }
         li:nth-of-type(3){
            margin-right: 36px;      
        }
        .errMessage{
            color: #fc543c;
        }
    }
 
}
.acconut_info ul:after{
    clear: both;
    display:block;
    content:'';
    width: 0;
    height: 0;
    overflow: hidden;
    visibility: hidden;

}
 .account_detailed{
           background: #fff;
            margin-left: 15px;
            margin-top: 6px;
            padding-top: 5px;
            padding-bottom: 5px;
      div{
          width: 25%;
          text-align: center;
      }
      .left{
          span{
              display: block;
              padding: 5px 0px;
          }
      }
      .line{
          clear:left;
          border: 1px dashed #e4e4e4
      }
  } 
  .account_home{
      div{
          width: 16.66%;
      }
  }
  .operator{
      background: #f5f5f5;
      border-top:1px solid #e4e4e4;
      ul{
          padding-top: 10px;
          padding-bottom: 10px;
      }
  } 
  .trade_rule{
      width: 980px;
      margin-left: auto;
      margin-right: auto;
      background: #fff;
      height: 380px;
      padding-top: 30px;
      padding-left: 15px;
      .rule_content{
          p{
              margin-bottom: 10px;
          }
      }
  } 
  .trader_wrap{
      background: #fff;
      width: 1035px;
      margin-left: 15px;
      margin-top: 20px;
      .el-tabs__nav{
          margin-left: 30px;
      }
      .el-tabs__content{
          padding-left: 30px;
      }
      .title{
          padding-left: 7px;
          padding-top: 0px;
      }
    .line{
        width: 3px;
        height: 25px;
        background: #CA534C;
        display: inline-block;
        margin-top: 5px;
        top:4px;
    }
    .el-tabs__item:hover{
        color: #fc543c;
    }
    .el-tabs__item.is-active{
        color: #fc543c;
    }
    .el-tabs__active-bar{
        background-color: #fc543c;
    }
  }
  .el-message-box {
      .el-message-box__btns{
          text-align: right;
          padding-right: 28px;
          .el-button--small{
              padding: 6PX 25PX;
              border: 0;
          }
          button:nth-child(2){
              background: #fc543c;
          }
      }
  }
</style>


