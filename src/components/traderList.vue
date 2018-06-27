<template>
    <div class="traderMain">
        <div class="trader_content">
            <h3>策略组合/交易员</h3>
            <div class="trade_tips">
                <el-tabs type="border-card" v-model="activeName" v-on:tab-click="handleClick">
                    <el-tab-pane label="精选组合" name='1'>
                        <div class="sorts">
                            <div class="trader_type">
                                <span>交易类型:</span>
                                <button  v-bind:class="activeWorldOrHome==1 ? 'activeBtn' :'' "  v-on:click="selectedWorldOrHome(1)">国际期货</button>
                                <button v-bind:class="activeWorldOrHome==2 ? 'activeBtn' :'' " v-on:click="selectedWorldOrHome(2)">国内期货</button>
                            </div>
                            <!-- <div class="trader_time">
                                <span>近期有交易:</span>
                                <button v-bind:class="activeDateBtn==1 ? 'activeBtn1' :'' " v-on:click="selectedDate(1)">全部</button>
                                <button v-bind:class="activeDateBtn==2 ? 'activeBtn1' :'' "  v-on:click="selectedDate(2)" >近一日</button>
                                <button v-on:click="selectedDate(3)" v-bind:class="activeDateBtn==3 ? 'activeBtn1' :'' " >近一周</button>
                                <button v-on:click="selectedDate(4)" v-bind:class="activeDateBtn==4 ? 'activeBtn1' :'' " >近一个月</button>
                            </div> -->
                            <div class="money">
                                <span>策略资金:</span>
                                <input type="text" v-model="startMoney" />
                                <span>-</span>
                                <input type="text" v-model="endMoney" style="margin-left: 0px;" />
                                <span>万元</span>
                                <button class="money_save" @click="searchByMoney">确定</button>
                            </div>
                            <!-- <div class="tarder_nickname">
                                <span>搜索昵称:</span>
                                <el-input placeholder="请输入内容" v-model="searchName">
                                </el-input>
                                <i class="el-icon-search" v-on:click="searchByName" style="position: relative; left: -24px; width: 16px; height: 16px; cursor: pointer;"></i>
                            </div> -->
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="适合我的组合" name='2'>
                        <div class="sorts">
                            <div class="trader_type">
                                <span>交易类型:</span>
                                <button v-bind:class="activeWorldOrHome==1 ? 'activeBtn' :'' " v-on:click="selectedWorldOrHome(1)">国际期货</button>
                                <button v-bind:class="activeWorldOrHome==2 ? 'activeBtn' :'' " v-on:click="selectedWorldOrHome(2)">国内期货</button>
                            </div>
                            <div class="trader_time">
                                <span>近期有交易:</span>
                                <button v-bind:class="activeDateBtn==1 ? 'activeBtn1' :'' " v-on:click="selectedDate(1)">全部</button>
                                <button v-bind:class="activeDateBtn==2 ? 'activeBtn1' :'' " v-on:click="selectedDate(2)">近一日</button>
                                <button v-on:click="selectedDate(3)" v-bind:class="activeDateBtn==3 ? 'activeBtn1' :'' ">近一周</button>
                                <button v-on:click="selectedDate(4)" v-bind:class="activeDateBtn==4 ? 'activeBtn1' :'' ">近一个月</button>
                            </div>
                            <div class="money">
                                <span>策略资金:</span>
                                <input type="text" />
                                <span>-</span>
                                <input type="text" style="margin-left: 0px;" />
                                <span>万元</span>
                                <button class="money_save">确定</button>
                            </div>
                            <div class="tarder_nickname">
                                <span>搜索昵称:</span>
                                <el-input placeholder="请输入内容" v-model="searchName">
                                </el-input>
                                <i class="el-icon-search" v-on:click="searchByName" style="position: relative; left: -24px; width: 16px; height: 16px; cursor: pointer;"></i>
                            </div>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="交易牛人" name='3'>
                        <div class="sorts">
                            <div class="trader_type">
                                <span>交易类型:</span>
                                <button v-bind:class="activeWorldOrHome==1 ? 'activeBtn' :'' " v-on:click="selectedWorldOrHome(1)">国际期货</button>
                                <button v-bind:class="activeWorldOrHome==2 ? 'activeBtn' :'' " v-on:click="selectedWorldOrHome(2)">国内期货</button>
                            </div>
                            <div class="trader_time">
                                <span>近期有交易:</span>
                                <button v-bind:class="activeDateBtn==1 ? 'activeBtn1' :'' " v-on:click="selectedDate(1)">全部</button>
                                <button v-bind:class="activeDateBtn==2 ? 'activeBtn1' :'' " v-on:click="selectedDate(2)">近一日</button>
                                <button v-on:click="selectedDate(3)" v-bind:class="activeDateBtn==3 ? 'activeBtn1' :'' ">近一周</button>
                                <button v-on:click="selectedDate(4)" v-bind:class="activeDateBtn==4 ? 'activeBtn1' :'' ">近一个月</button>
                            </div>
                            <div class="money">
                                <span>策略资金:</span>
                                <input type="text" />
                                <span>-</span>
                                <input type="text" style="margin-left: 0px;" />
                                <span>万元</span>
                                <button class="money_save">确定</button>
                            </div>
                            <div class="tarder_nickname">
                                <span>搜索昵称:</span>
                                <el-input placeholder="请输入内容" v-model="searchName">
                                </el-input>
                                <i class="el-icon-search" v-on:click="searchByName" style="position: relative; left: -24px; width: 16px; height: 16px; cursor: pointer;"></i>
                            </div>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="策略报告" name='4'>还没有数据.....</el-tab-pane>
                </el-tabs>
            </div>
        </div>
        <!-- 组合策略 -->
        <div class="profit_table" :key="activeName" v-if="activeName=='1' || activeName=='2' ">
            <el-table v-bind:data="strategys"
                    stripe
                    v-on:sort-change="sortStragey"
                    style="width: 100%"
                    v-loading="isLoading"
                    element-loading-text="加载中"
                    element-loading-spinner="el-icon-loading"
                    element-loading-background="rgba(0, 0, 0, 0.7)">
                <el-table-column label="基本信息"
                                width="200">
                    <template slot-scope="scope" class="clear">
                        <a style="display:inline-block;cursor:pointer" @click="goDetail(scope.row)" class="clear left">
                            <img v-bind:src="scope.row.icon!=null ? iconUrl + scope.row.icon : defaultUrl "/>
                        </a>
                        <div class="left">
                            <span style="margin-top:6px;cursor:pointer" @click="goDetail(scope.row)" class="nickname">{{ scope.row.name }}</span>
                        </div>                 
                    </template>
                </el-table-column>
                <el-table-column
                    label="净值"
                    sortable='custom'
                    width="130">
                    <template slot-scope="scope">
                        <span>0</span>
                    </template>
                </el-table-column>
                <el-table-column 
                                sortable='custom'
                                width="100"
                                label="交易笔数">
                           <template slot-scope="scope">
                             <span>0</span>
                           </template>       
                </el-table-column>

                <el-table-column label="交易胜率"
                                sortable='custom'                          
                                width="100">
                    <template slot-scope="scope">
                        <span>
                             {{ scope.row.winRate.toFixed(2) + '%' }}
                       </span>
                    </template>
                </el-table-column>
                <el-table-column
                    sortable='custom'
                    width="120"
                    label="收益回撤比">
                    <template slot-scope="scope">
                        <span>0</span>
                    </template>
                </el-table-column>
                <el-table-column
                    sortable='custom'
                    label="最小跟投资金">
                      <template slot-scope="scope">
                        <span>{{ scope.row.leastMoneyLine/10000 | toDecimal }}万</span>
                     </template>
                </el-table-column>
                <el-table-column
                    sortable='custom'
                    width="100"
                    label="跟投人数">
                    <template slot-scope="scope">
                        <span>0</span>
                    </template>
                </el-table-column>
                <el-table-column prop="weekNum"
                                label="剩余份额/总份额">
                                  <template slot-scope="scope">
                                     <div>
                                         <el-progress  :text-inside="true" :stroke-width="12" :percentage="getPercen(scope.row)" status="exception"></el-progress>
                                     </div>
                                  </template> 
                </el-table-column>
                <el-table-column
                    label="跟头操作">
                    <template slot-scope="scope">
                        <el-button v-if="scope.row.firmFollowStatus" size="mini"
                                style="padding: 3px 15px;"
                                type="danger"
                                v-on:click="handleFirm(1 ,true,scope.row)">编辑实盘</el-button>
                        <el-button v-else size="mini"
                                style="padding: 3px 15px;"
                                type="danger"
                                v-on:click="handleFirm(2,true,scope.row)">实盘跟投</el-button>
                        <el-button v-if="scope.row.simFollowStatus" size="mini"
                                v-bind:disabled="isDisableSimBtn"
                                style="padding: 3px 15px; margin-top: 5px; margin-left: 0px;"
                                v-on:click="handleFirm(3,false,scope.row)">编辑模拟</el-button>
                        <el-button v-else size="mini"
                                v-bind:disabled="isDisableSimBtn"
                                style="padding: 3px 15px; margin-top: 5px; margin-left: 0px;"
                                v-on:click="handleFirm(4,false,scope.row)">模拟跟投</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
           <!-- 交易牛人 -->
        <div class="profit_table " :key="activeName" v-if="activeName=='3'" >
            <el-table v-bind:data="tarders"
                      stripe
                      v-on:sort-change="sortChange"
                      style="width: 100%"
                      v-loading="isLoading"
                      element-loading-text="加载中"
                      element-loading-spinner="el-icon-loading"
                      element-loading-background="rgba(0, 0, 0, 0.7)">
                <el-table-column label="基本信息"
                                 width="200">
                    <template slot-scope="scope" class="clear">
                        <a style="display:inline-block;cursor:pointer" @click="goDetail(scope.row)" class="clear left">
                            <img v-bind:src="scope.row.icon!=null ? iconUrl + scope.row.icon : defaultUrl "/>
                        </a>
                        <div class="left">
                             <span style="margin-top:6px;cursor:pointer" @click="goDetail(scope.row)" class="nickname">{{ scope.row.nickname }}</span>
                        </div>                 
                    </template>
                </el-table-column>
                <el-table-column
                    label="净值"
                    sortable='custom'
                    width="130">
                </el-table-column>
                <el-table-column prop="oneUserInfo.totalPlusProfitQty"
                                 sortable='custom'
                                 width="100"
                                 label="交易笔数">
                </el-table-column>

                <el-table-column label="交易胜率"
                                  sortable='custom'                          
                                 width="100">
                    <template slot-scope="scope">
                        <span 
                        v-if="(scope.row.oneUserInfo.totalPlusProfitQty + scope.row.oneUserInfo.totalMinusProfitQty)">
                        {{ (scope.row.oneUserInfo.totalPlusProfitQty/(scope.row.oneUserInfo.totalPlusProfitQty + scope.row.oneUserInfo.totalMinusProfitQty)) | toPercent }}</span>
                        <span v-else>{{ (scope.row.oneUserInfo.totalPlusProfitQty/1) | toPercent }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    sortable='custom'
                    width="130"
                    label="收益回撤比">
                    <template slot-scope="scope">
                        <span>{{ Number(scope.row.oneUserInfo.sortPercent).toFixed(2) + "%" }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    sortable='custom'
                    label="最小跟投资金">
                </el-table-column>
                <el-table-column
                    sortable='custom'
                    width="100"
                    label="跟投人数">
                    <template slot-scope="scope">
                        <span>{{ scope.row.followPeopleForFrim + scope.row.followPeopleForSim }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="weekNum"
                                 label="剩余份额/总份额">
                </el-table-column>
                <el-table-column
                    label="跟头操作">
                    <template slot-scope="scope">
                        <el-button v-if="scope.row.firmFollow" size="mini"
                                   style="padding: 3px 15px;"
                                   type="danger"
                                   v-on:click="handleFirm(1 ,true,scope.row)">编辑实盘</el-button>
                        <el-button v-else size="mini"
                                   style="padding: 3px 15px;"
                                   type="danger"
                                   v-on:click="handleFirm(2,true,scope.row)">实盘跟投</el-button>
                        <el-button v-if="scope.row.simFollow" size="mini"
                                   v-bind:disabled="isDisableSimBtn"
                                   style="padding: 3px 15px; margin-top: 5px; margin-left: 0px;"
                                   v-on:click="handleFirm(3,false,scope.row)">编辑模拟</el-button>
                        <el-button v-else size="mini"
                                   v-bind:disabled="isDisableSimBtn"
                                   style="padding: 3px 15px; margin-top: 5px; margin-left: 0px;"
                                   v-on:click="handleFirm(4,false,scope.row)">模拟跟投</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="profit_page">
            <el-pagination background
                           layout="prev, pager, next"
                           v-bind:total="totalNum"
                           v-on:prev-click="handlePrev"
                           v-on:next-click="handleNext"
                           v-on:current-change="handleCurrentPage">

            </el-pagination>
        </div>

        <!-- 交易牛人跟投弹窗 -->
        <el-dialog
                 class="followDialog"
            v-bind:visible.sync="isVisible2"          
                   >
            <span slot="title">
                  <span v-if="worldOrHome==1" style="position: relative; left: 5px; font-weight: bold;" >国际</span>
                  <span v-else style="position: relative; left: 5px; font-weight: bold;">国内</span>
                  <span v-if="isFirm==2" class="title_type">实盘跟投</span>
                  <span v-else class="title_type">模拟跟投</span>
                  <span class="title_img"><img :src="arrowUrl" /></span>
                  <span class="title_trader">交易大师</span>
            </span>
         
            <div class="followContent">
                <div class="followStyle">
                    <div class="style_title">
                        <span class="style1">1</span>
                        <span>请选择跟投方式</span>
                    </div>
                    <div class="style_content">
                        <div class="style_num">
                            <div class="num1 " v-bind:class="activeStyle==1 ? 'followActive': '' " v-on:click="followStyle(1)">
                                <p>固定数量下单</p>
                                <p>例如您设置固定数量1手，不论交易员下单多少手，您手数均为1手。最低跟随手数为1.</p>
                            </div>
                            <div class="num2" v-if="activeStyle===1">
                                <span>固定跟投</span>
                               
                                     <el-input-number v-bind:min="1" class="num_val" size="mini" v-model="num1"></el-input-number>
                               
                                <span>手</span>
                            </div>
                        </div>
                        <div class="style_perce">
                            <div class="num1" v-on:click="followStyle(2)" v-bind:class="activeStyle==2 ? 'followActive': '' ">
                                <p>按比例下单</p>
                                <p>例如您设置为0.5倍比例跟随，交易员下单2手，您的手数为1手。不足1手时将默认为不跟随下单.</p>
                            </div>
                            <div class="num2" v-if="activeStyle===2">
                                <span>按比例下单</span>                             
                                   <el-input-number class="num_val" size="mini" v-model="num2" v-bind:precision="2" v-bind:step="1" v-bind:min="1"></el-input-number>
                              
                                <span>倍</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="followStyle">
                    <div class="style_title">
                        <span class="style1">2</span>
                        <span>请选择跟投方向</span>
                    </div>
                    <div class="style_content">
                        <div class="style_num">
                            <div class="num1" v-on:click="followDirection(1)" v-bind:class="activeDrection==1 ? 'followActive': '' ">
                                <p>正向跟投</p>
                                <p>交易员<span class="buy">买入</span>,您的操作也为<span class="buy">买入</span></p>
                            </div>
                        </div>
                        <div class="style_perce">
                            <div class="num1"  v-on:click="followDirection(2)" v-bind:class="activeDrection==2 ? 'followActive': '' ">
                                <p>反向跟投</p>
                                <p>交易员<span class="buy">买入</span>,您的操作也为<span class="sale">买出</span>.</p>
                            </div>              
                        </div>
                    </div>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">             
                <el-button  v-on:click="handleFollow" >确定跟投</el-button>
                <el-button class="cancelFollow" v-if="(clickBtn==1 || clickBtn==3 )" v-on:click="cancelFollow">取消跟投</el-button>
            </span>
        </el-dialog>

          <!-- 组合策略modal -->
        <stragey-modal :isVisible="isVisible"     v-on:hideModal="hideModal" v-if="initData" :modalInfo="modalInfo" :groupStrateInfo="groupStrateInfo"></stragey-modal>
    </div>    
</template>
<script>
import {navIndex} from '../constants/enum'
import{
    followCreate,unFollowBind,
getBrokerCompanyAccountOrNullFC,getTraderList,
currentUserGameStatus,getTraderForNBList,
getStrategyListByFilter,getStrategyListForMeByFilter
} from '../api/getData.js'
import message from '../config/message';
import{mapState,mapActions} from 'vuex'
import getUserInfo from '../config/getUserInfo'
import{ prdUrl,sortField,sortDirection} from '../constants/enum.js'
import moment from 'moment'

export default {
    data(){
        return{
                activeName: '1',
                tarders: [],
                user:null,
                totalNum: 0,
                isLoading: true,
                isShow:true, //message显示
                isVisible:false,
                initData:false,//控制组合策略弹窗
                modalInfo:null, //组合策略弹窗传参
                isVisible2:false,//跟投交易员dialog
                groupStrateInfo:null,//组合策略信息
                num1: 1, //固定手数值
                num2: 1,  //百分比
                activeStyle: 1, //1表示选中固定数量2.表示按比例下单
                activeDrection: 1, //表示正向跟投 2.表示反向跟投
                followTraderId: 0, //表示当前跟投的交易员Id
                isFirm: 1, //1表示模拟跟实盘2.表示实盘跟实盘
                worldOrHome: 1, //1.表示国际 2.表示国内
                clickBtn: 1, //1.表示编辑实盘 2.表示实盘跟投3.编辑模拟 4.模拟跟投
                isDisableSimBtn: false, //参加模拟比赛禁用
                activeWorldOrHome: 1, //帅选排序选择国内国际
                selectedTradeDate: "", //近期交易时间
                activeDateBtn: 1, //1.全部2.一周
                searchName:"",//搜索的名字
                iconUrl:prdUrl,
                defaultUrl:'../../static/default/30x30.png',
                arrowUrl:'../../static/default/fl_arrow.png',
                sort:1, //排序高低
                sortField:0 ,//默认排序
                startMoney:'',//开始资金
                endMoney:'', //结束资金
                strategys:[]
        }
    },
    created(){
       getUserInfo(this);
    },
    computed:{
         ...mapState(['userInfo'])
    },
    methods:{
          ...mapActions(['getUserInfo']),
          //搜索通过跟投资金
             searchByMoney(){
                 if(Number(this.activeName)==1){
                    this.getStrategyListByFilter(1,0)
                 }else if(Number(this.activeName)==2){
                    this.getStrategyListForMeByFilter(1,0)
                 }else if(Number(this.activeName)==3){
                     this.getData(1,0)
                 }else{

                 }
              
            },
             //已用的份额数
            getPercen(item){
                //qty 总份额 havingQty 剩余份额
                let num=item.qty-item.havingQty;
                return  Number((num/item.qty)*100);
            },
            //策略组合排序 和适合我的策略
            sortStragey(row){
                if(!row.column) return;
                this.sort=row.order=="ascending"? 2 : 1;             
                switch(row.column.label) {
                    case "净值":
                        if(Number(this.activeName)==1){
                            this.getStrategyListByFilter(1, sortField.noSort);
                        }else if(Number(this.activeName)==2){
                            this.getStrategyListForMeByFilter(1,sortField.noSort)
                        }
                        break;
                    case "交易笔数":
                        if(Number(this.activeName)==1){
                            this.getStrategyListByFilter(1, sortField.qty);
                        }else if(Number(this.activeName)==2){
                            this.getStrategyListForMeByFilter(1,sortField.qty)
                        }
                        break;
                    case "交易胜率":
                       if(Number(this.activeName)==1){
                            this.getStrategyListByFilter(1, sortField.winRate);
                        }else if(Number(this.activeName)==2){
                            this.getStrategyListForMeByFilter(1,sortField.winRate)
                        }
                        break;
                    case "收益回撤比":
                       if(Number(this.activeName)==1){
                            this.getStrategyListByFilter(1, 0);
                        }else if(Number(this.activeName)==2){
                            this.getStrategyListForMeByFilter(1,0)
                        }
                        break;
                    case "最小跟投资金":
                      if(Number(this.activeName)==1){
                            this.getStrategyListByFilter(1, 0);
                        }else if(Number(this.activeName)==2){
                            this.getStrategyListForMeByFilter(1,0)
                        }
                        break;
                    case "跟投人数":
                     if(Number(this.activeName)==1){
                            this.getStrategyListByFilter(1, sortField.followNUm);
                        }else if(Number(this.activeName)==2){
                            this.getStrategyListForMeByFilter(1,sortField.followNUm)
                        }
                        break;
                    default:
                       if(Number(this.activeName)==1){
                            this.getStrategyListByFilter(1, 0);
                        }else if(Number(this.activeName)==2){
                            this.getStrategyListForMeByFilter(1,0)
                        }
                }          
            },
           //排序搜索过滤(*排序缺降序要修改)
            sortChange(row){     
           
               if(!row.column) return;
                this.sort=row.order=="ascending"? 2 : 1;
               
                switch(row.column.label) {
                    case "净值":
                        this.getData(1, sortField.noSort);
                        break;
                    case "交易笔数":
                        this.getData(1, sortField.qty);
                        break;
                    case "交易胜率":
                        this.getData(1, sortField.winRate);
                        break;
                    case "收益回撤比":
                        this.getData(1, 0);
                        break;
                    case "最小跟投资金":
                        this.getData(1, 0);
                        break;
                    case "跟投人数":
                        this.getData(1, sortField.followNUm);
                        break;
                    default:
                        this.getData(1, 0);
                }          
            },
              //选择国际国内
            selectedWorldOrHome(index) {
                if(Number(this.activeName)==1){
                     this.activeWorldOrHome = index;
                     this.getStrategyListByFilter(1,0)
                }    
            },
              //选择交易的时间
            selectedDate: function (index) {
                this.activeDateBtn = index;
                if (index===navIndex.one) {
                    this.selectedTradeDate = "";
                }else if (index === navIndex.two) {
                    this.selectedTradeDate = moment().format("YYYY-MM-DD");
                }else if (index === navIndex.three) {
                    this.selectedTradeDate = moment().subtract(1,"weeks").format("YYYY-MM-DD");
                } else {
                    this.selectedTradeDate = moment().subtract(1,"months").format("YYYY-MM-DD");
                }
                this.getData(1,sortField.noSort);
            },
             //通过昵称搜索
            searchByName() {
                this.getData(1,sortField.noSort);
            },
             //选择跟投按比例还是固定数量
            followStyle(index) {
                this.activeStyle =index ;
            },
               //正向反向
            followDirection(index) {
                this.activeDrection = index;
            },
              //选项卡
            handleClick(tab, event) {
                this.activeName=tab.name;
                this.activeWorldOrHome = 1;
                this.selectedTradeDate = "";
                this.activeDateBtn = 1;
                this.searchName = "";
                if(Number(this.activeName)==1){
                    this.getStrategyListByFilter(1,0)
                }else if(Number(this.activeName)==2){
                    this.getStrategyListForMeByFilter(1,0)
                }else if(Number(this.activeName)===3){
                 
                    this.getData(1,0)
                }else{

                }
           
                // this.getData(1,sortField.noSort);
            },
               //确定跟投
           async handleFollow(){
                const _that = this;     
                let data = {
                    "traderUserId": _that.followTraderId,
                    "followType": _that.isFirm,
                    "worldOrHome": _that.worldOrHome,
                    "followDirection":_that.activeDrection
                }
              
                if (_that.activeStyle === 1) {
                    data["followCount"] = Number(_that.num1);
                } else {
                    data["followPercentage"] = Number(_that.num2);
                }
                let res= await followCreate(data);
                if(res && res.success){
                     _that.isVisible2=false //dialog隐藏
                     _that.getData(1,sortField.noSort);
                }else{
                     message(_that,res)
                }
            },
              //取消跟投
           async cancelFollow() {
                const _that = this;
                      
                let data= {
                    "traderUserId": _that.followTraderId,
                    "unBingType":_that.isFirm,
                    "worldOrHome": _that.worldOrHome
                }
               let res = await unFollowBind(data);
               if(res && res.success){
                      _that.isVisible2 = false; //dialog隐藏                  
                        _that.getData(1,sortField.noSort);
               }else{
                   message(_that,res)
               }
            },
               //跟投(点击跟投出现dialog)
           async handleFirm(index,isFirm,row) {      
                const _that = this;
                //跟随关系传参
              
                if (index===2 || index===4) {
                    _that.activeStyle = 1;
                    _that.activeDrection = 1;
                    _that.num1 = 1;
                    _that.num2 = 1;
                }else if(index===1){
                    if(row.firmFollow){
                            if (row.followRelationShip.followCount === 0 && row.followRelationShip.followPercentage!==0) {
                                _that.activeStyle = 2;
                                _that.activeDrection = row.followRelationShip.followDirection;
                                _that.num2 = row.followRelationShip.followPercentage;
                                _that.num1 = 1;
                            } else if (row.followRelationShip.followCount !== 0 && row.followRelationShip.followPercentage === 0) {
                                _that.activeStyle = 1;
                                _that.activeDrection = row.followRelationShip.followDirection;
                                _that.num1 = row.followRelationShip.followCount;
                                _that.num2 = 1;
                            }             
                    }              
                }else if(index===3){
                      if (row.simFollowRelationShip.followCount === 0 && row.simFollowRelationShip.followPercentage!==0) {
                            _that.activeStyle = 2;
                            _that.activeDrection = row.simFollowRelationShip.followDirection;
                            _that.num2 = row.simFollowRelationShip.followPercentage;
                            _that.num1 = 1;
                        } else if (row.simFollowRelationShip.followCount !== 0 && row.simFollowRelationShip.followPercentage === 0) {
                            _that.activeStyle = 1;
                            _that.activeDrection = row.simFollowRelationShip.followDirection;
                            _that.num1 = row.simFollowRelationShip.followCount;
                            _that.num2 = 1;
                        }             
                }
                _that.clickBtn = index;
                _that.worldOrHome = row.worldOrHome;
                _that.isFirm = isFirm ? 2 : 1;
                _that.followTraderId = row.id;

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
                                _that.isVisible2 = true;
                            }else{
                                 message(_that,res)
                            }
                }
               
            },
            getSortField(sortVal){
                  switch(sortVal){
                      case sortField.noSort:
                      this.sortField=0
                      break;
                      case sortField.profit:
                      this.sortField=1
                      break; 
                      case sortField.winRate:
                      this.sortField=2
                      break; 
                      case sortField.avgAmt:
                      this.sortField=3
                      break;
                      case sortField.proAmt:
                      this.sortField=4
                      break;
                      case sortField.qty:
                      this.sortField=5
                      break;
                      case sortField.followNUm:
                      this.sortField=6
                      break;
                      case sortField.week:
                      this.sortField=7
                      case sortField.followProfit:
                      this.sortField=8
                      break; 
                      default:
                      this.sortField=0
                  }
            },
            async getData(page,sortVal) { 
                
                  const _that = this;
                 _that.isLoading = true;
                 this.getSortField(sortVal);  
                 setTimeout(() => {
                     _that.isLoading=false
                 },500)  
                let data = {
                    "tradeUserId": 0,
                    "accountType": 2, //模拟账号还是实盘账号
                    "worldOrHome": _that.activeWorldOrHome,
                    "searchName": _that.searchName, //搜索昵称
                    "filterName":_that.sortField, //排序的名称
                    "sort":_that.sort,
                    "startDate": _that.selectedTradeDate,
                    "page": page,
                    "rows": 10
                };
               
                     let res = await getTraderList(data);
                     if(res && res.success){   
                         _that.tarders = res.result.items;              
                        _that.totalNum = res.result.totalCount;
                    
                       }else{
                              message(_that,res)
                       }  
                 
            
            },
            //获取组合策略
            async getStrategyListByFilter(page,sortVal){
                  const _that = this;
                 _that.isLoading = true;
                 this.getSortField(sortVal);  
                 setTimeout(() => {
                     _that.isLoading=false
                 },300)
                 let data={
                        "combiId": 0,
                        "startMoney":_that.startMoney + '0000',//开始资金
                        "endMoney":_that.endMoney + '0000',//结束资金
                        "sortName": _that.sortField,
                        "wh":_that.activeWorldOrHome,
                        "sort": _that.sort,
                        "page": page,
                        "rows":1000
                 }
             
                 let res= await getStrategyListByFilter(data);
                 if(res && res.success){
                    
                    this.strategys=res.result.items;
                    console.log(this.strategys)
                    _that.totalNum=res.result.totalCount
                 }else{
                     message(_that,res)
                 } 
            },
            //获取适合我的策略
           async getStrategyListForMeByFilter(page,sortVal){
                  const _that = this;
                 _that.isLoading = true;
                 this.getSortField(sortVal);  
                 setTimeout(() => {
                     _that.isLoading=false
                 },300)
                 let data={
                        "combiId": 0,
                        "startMoney":_that.startMoney + '0000',//开始资金
                        "endMoney":_that.endMoney + '0000',//结束资金
                        "sortName": _that.sortField,
                        "wh":_that.activeWorldOrHome,
                        "sort": _that.sort,
                        "page": page,
                        "rows":10
                 }  
                 let res= await getStrategyListForMeByFilter(data);
          
                 if(res && res.success){        
                    this.strategys=res.result.items;
                    _that.totalNum=res.result.totalCount
                 }else{
                     message(_that,res)
                 } 
            },
            handleCurrentPage(val) {
                this.getData(val,sortField.noSort);

            },
            handlePrev: function (val) {        

                this.getData(val,sortField.noSort);
            },
            handleNext: function (val) {          
                this.getData(val,sortField.noSort);
            },
           async getUserGameStatus(){
               const _that=this;
               let res;
               if(this.worldOrHome===1){
                  res = await currentUserGameStatus(1)
               }else{
                   res= await currentUserGameStatus(2)
               }             
               if(res && res.success)
               {
                   this.getData(1,sortField.noSort)
                    if (res.result) {
                        if (res.result === 1 || res.result === 2) {
                            _that.isDisableSimBtn = true;
                        } else {
                            _that.isDisableSimBtn = false;
                        }
                    }
               }
            },
            goDetail(row){           
                if(Number(this.activeName)==1 || Number(this.activeName)==2 ){
                   let url=`groupDetail/${row.id}/${row.wh}`
                    this.$router.push({path:url})
                }else if(Number(this.activeName)==3){
                      let url=`tradeDetail/${row.id}/${row.worldOrHome}/1`
                       this.$router.push({path:url})
                }             
            
            }
    },
    mounted(){
        //  this.getUserGameStatus();
         this.getStrategyListByFilter(1,sortField.noSort)
        //  this.getData(1,sortField.noSort) 
    }
}
</script>
<style lang="less">
      .trade_tips .el-tabs--border-card>.el-tabs__header .el-tabs__item.is-active {
            color: #FD8A88;
            border-top: 4px solid #EF5E5D;
        }
        .trader_type button {
    
            border-radius: 18px;
        }
        .trade_tips .activeBtn {          
            background: #FC534C;
            color: #fff;
        }
        .trade_tips .activeBtn1 {
              background: #FC534C;
              color: #fff;
         }
      .trade_tips .trader_time button:nth-of-type(1) {
            margin-left: 16px
        }
        .trade_tips button {
            border: 0;
            background: #fff;
            outline: 0;
            margin-left: 30px;
            width: 78px;
            padding: 3px 0;
            white-space: nowrap;
            border-radius: 18px;
        }
        .trade_tips  span {
            font-size: 14px;
        }
        .trader_time, .money,.tarder_nickname{
            margin-top: 13px;
        }
        .money input {
            height: 28px;
            width: 78px;
            border-radius: 18px;
            border: 0;
            background: #F5F5F5;
            outline: 0;
            padding-left: 8px;
            padding-right: 4px;
            font-weight: bold;
            margin-left: 28px;
            box-sizing: border-box;
        }
     .trade_tips .money .money_save {
            width: 45px;
            height: 26px;
            box-sizing: border-box;
            border: 1px solid red;
            border-radius: 6px;
            color: red;
            cursor: pointer;
        }
     .tarder_nickname .el-input {
         margin-left: 27px;
         width: 173px;
     }
      .tarder_nickname .el-input .el-input__inner {
            height: 26px;
            border-radius: 10px;
            width: 173px;
      }
     .tarder_nickname .el-input  .el-input__suffix {
         top: -6px;
     }
    .trade_tips .el-tabs--border-card>.el-tabs__header .el-tabs__item {
         border-top-width: 4px;
     }
    .traderMain .profit_table {
        margin-top: 5px;
    }
     .profit_table {
      min-height: 500px;
  }
     .profit_table a img {
        
        width: 30px;
        float: left;
        border-radius: 50%;
        margin-left: 6px;
         height: 30px;
         display: block;
     }
     .profit_table .nickname {
        color: #333;
        display: inline-block;
        font-size: 14px;
        margin-left: 11px;
        width: 131px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
     }
      .profit_table .traderOrfollow {
          font-size: 12px;
        display: inline-block;
        margin-left: 10px;
      }
     .profit_page .el-pagination.is-background .el-pager li:not(.disabled).active {
         background: #FC534C;
   
     }
    .traderMain .profit_page {
        text-align: center;
        margin-top: 20px;
    }
    .traderMain {
        margin-top: 20px;
          .el-table th{
            height: 60px;
            padding: 0px;
            .cell{
                height: 100%;
               line-height: 59px;
            }
        }
        .el-progress-bar__innerText{
             margin-top: -5px;
         }
    }
      .traderMain .trader_content h3 {
         font-size: 18px;
       color: #666;
       margin-bottom: 5px; 
       font-weight: 400;
      }
</style>

