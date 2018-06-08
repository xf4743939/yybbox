<template>
    <div>
        <head-top></head-top>
        <div class="main">
            <el-row>
               <nav-memu></nav-memu>
               <!-- <el-col :span="21" class="user_right">
                   <div class="myWallet">
                      <h4 class="title">
                          <img src="../../images/Wallet.png"/>
                          <span>我的钱包</span>
                      </h4>
                      <div class="wallet_info">
                          <span class="account_name">账户余额</span>
                          <span class="account_num" v-if="user"><span>{{ (user.useMoney + user.activityNoWithdrawMoney + user.activityWithdrawMoney + user.shareMoney + user.followProfitMoney).toFixed(2) }}</span>元</span>                     
                          <span class="account_detail"><router-link to="">钱包明细</router-link></span>
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
                                                    <el-button type="danger" size="mini" class="btn_bind">
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
                                                    <el-button type="danger" size="mini" class="btn_bind">
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
                                                    <ul v-if="user">
                                                        <li><span class="line"></span><span class="text_tip">账户详情</span></li>
                                                        <li>
                                                            <img  class="img_type" src="../../images/account.png"/>
                                                            <span class="text1">账号</span>
                                                            <span v-if="user" class="ellipsis text_content">{{user.userName | subStr(4,4)}}</span>
        
                                                        </li>
                                                      
                                                     <li v-if="user.gameUserDetail" style="float:right;margin-right:120px;">
                                                            <img class="img_type firm_icon"  :src="isJoin" alt="">
                                                            <span class="text1 firm_tip" style="background:#999;color:#fff;padding:3px 7px;border-radius:8px;">
                                                                <span>已报名参赛</span>
                                                               <span>{{ user.gameUserDetail.gameName}}{{user.gameUserDetail.level==1 ? "选拔大赛" : "实盘预备赛" }}</span>
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
                                                    <ul v-if="user">
                                                        <li><span class="line"></span><span class="text_tip">账户详情</span></li>
                                                        <li>
                                                            <img  class="img_type" src="../../images/account.png"/>
                                                            <span class="text1">账号</span>
                                                            <span v-if="user" class="ellipsis text_content">{{user.userName | subStr(4,4)}}</span>
        
                                                        </li>
                                                      
                                                     <li v-if="user.gameUserDetail" style="float:right;margin-right:120px;">
                                                            <img class="img_type firm_icon"  :src="isJoin" alt="">
                                                            <span class="text1" style="background:#999;color:#fff;padding:3px 7px;border-radius:8px;"> 
                                                                <span>已报名参赛</span>
                                                               <span>{{ user.gameUserDetail.gameName}}{{user.gameUserDetail.level==1 ? "选拔大赛" : "实盘预备赛" }}</span>
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
               </el-col> -->
               <transition name="fade" mode="out-in">
                   <router-view></router-view>
               </transition>
             
            </el-row>
        </div>
       
        <foot-bom></foot-bom>
    </div>
</template>
<script>
import headTop from '../../components/headTop'
import footBom from '../../components/footer'
import navMemu from './nav'
import accountMain from './account'
import{mapState,mapActions} from 'vuex'

export default {
    data(){
        return{
        
        }
    },
    computed:{
       ...mapState(['userInfo'])
    },
    components:{
       headTop,
       footBom,
       navMemu,
       accountMain
    },
    methods:{
       
      
    },
    mounted(){  
      
     
    }
}
</script>
<style lang="less" >
  .main{
      margin-top: 119px;
      margin-left: auto;
      margin-right: auto;
      width: 1200px;
  }
  
</style>


