<template>
    <div class="traderMain">
        <div class="trader_content">
            <h3>跟投牛人排行榜</h3>
            <div class="trade_tips">
                   <div class="panel">
                       <div class="sorts">
                            <div class="trader_type">
                                <span>交易类型:</span>
                                <button  v-bind:class="activeWorldOrHome==1 ? 'activeBtn' :'' "  v-on:click="selectedWorldOrHome(1)">国际期货</button>
                                <button v-bind:class="activeWorldOrHome==2 ? 'activeBtn' :'' " v-on:click="selectedWorldOrHome(2)">国内期货</button>
                            </div>
                            <div class="trader_time">
                                <span>近期有交易:</span>
                                <button v-bind:class="activeDateBtn==1 ? 'activeBtn1' :'' " v-on:click="selectedDate(1)">全部</button>
                                <button v-bind:class="activeDateBtn==2 ? 'activeBtn1' :'' "  v-on:click="selectedDate(2)" >近一日</button>
                                <button v-on:click="selectedDate(3)" v-bind:class="activeDateBtn==3 ? 'activeBtn1' :'' " >近一周</button>
                                <button v-on:click="selectedDate(4)" v-bind:class="activeDateBtn==4 ? 'activeBtn1' :'' " >近一个月</button>
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
                </div>
            </div>
        </div>
        <div class="profit_table">
            <el-table v-bind:data="followers"
                      stripe
                      v-on:sort-change="sortChange"
                      style="width: 100%"
                      v-loading="isLoading"
                      element-loading-text="加载中"
                      element-loading-spinner="el-icon-loading"
                      element-loading-background="rgba(0, 0, 0, 0.7)">
                <el-table-column label="基本信息"
                              >
                    <template slot-scope="scope" class="clear">
                        <a style="display:inline-block;cursor:pointer" @click="goDetail(scope.row)" class="clear left">
                            <img v-bind:src="scope.row.icon!=null ? iconUrl + scope.row.icon : defaultUrl "/>
                        </a>
                        <div class="left" style="min-width:90px;">
                             <span style="margin-top:16px;cursor:pointer" @click="goDetail(scope.row)" class="nickname">{{ scope.row.nickname }}</span>
                         
                        </div>                 
                    </template>
                </el-table-column>
                <el-table-column
                    label="净值"
                    sortable='custom'
                 >
                </el-table-column>
                <el-table-column prop="oneUserInfo.totalPlusProfitQty"
                                 sortable='custom'
                                 width="100"
                                 label="交易笔数">
                </el-table-column>

                <el-table-column label="交易胜率"
                                  sortable='custom'                          
                               >
                    <template slot-scope="scope">
                        <span 
                        v-if="(scope.row.oneUserInfo.totalPlusProfitQty + scope.row.oneUserInfo.totalMinusProfitQty)">
                        {{ (scope.row.oneUserInfo.totalPlusProfitQty/(scope.row.oneUserInfo.totalPlusProfitQty + scope.row.oneUserInfo.totalMinusProfitQty)) | toPercent }}</span>
                        <span v-else>{{ (scope.row.oneUserInfo.totalPlusProfitQty/1) | toPercent }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    sortable='custom'
                  
                    label="收益回撤比">
                    <template slot-scope="scope">
                        <span>{{ scope.row.oneUserInfo.sortPercent.toFixed(2) + '%'  }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    sortable='custom'
                
                    label="跟投人数">
                    <template slot-scope="scope">
                        <span>{{ scope.row.followPeopleForFrim + scope.row.followPeopleForSim }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="走势图">
                     <template slot-scope="scope">
                        <span style="display:inline-block;height:100%;width:100%" :id="scope.row.i">--</span>
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
    </div>    
</template>
<script>
import {navIndex} from '../constants/enum'
import{getBrokerCompanyAccountOrNullFC,getTraderForNBList} from '../api/getData.js'
import message from '../config/message';
import{mapState,mapActions} from 'vuex'
import getUserInfo from '../config/getUserInfo'
import{ prdUrl,sortField,sortDirection} from '../constants/enum.js'
import moment from 'moment'

export default {
    data(){
        return{
                activeName: '1',
                followers: [],
                user:null,
                totalNum: 0,
                isLoading: true,
                isShow:true, //message显示
                followTraderId: 0, //表示当前跟投的交易员Id
                worldOrHome: 1, //1.表示国际 2.表示国内
                activeWorldOrHome: 1, //帅选排序选择国内国际
                selectedTradeDate: "", //近期交易时间
                activeDateBtn: 1, //1.全部2.一周
                searchName:"",//搜索的名字
                iconUrl:prdUrl,
                defaultUrl:'../../static/default/30x30.png',
                arrowUrl:'../../static/default/fl_arrow.png',
                sort:1, //排序高低
                sortField:0 //默认排序
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
                this.activeWorldOrHome = index;
                this.getData(1,0);
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
              //选项卡
            handleClick(tab, event) {
                this.activeWorldOrHome = 1;
                this.selectedTradeDate = "";
                this.activeDateBtn = 1;
                this.searchName = "";
                this.getData(1,sortField.noSort);
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
                     let res = await getTraderForNBList(data);
                
                     if(res && res.success){       
                         _that.followers = res.result.items;              
                        _that.totalNum = res.result.totalCount;
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
            goDetail(row){             
                let url=`followDetail/${row.id}/${row.worldOrHome}/0`
                this.$router.push({path:url})
            }
    },
    mounted(){
         this.getData(1,sortField.noSort) 
    }
}
</script>
<style lang="less">
      .trade_tips{
          margin-bottom: 10px;
          .panel{
                padding: 20px 15px;
                background: #fff;
                border: 1px solid #dcdfe6;
                -webkit-box-shadow: 0 2px 4px 0 rgba(0,0,0,.12), 0 0 6px 0 rgba(0,0,0,.04);
                box-shadow: 0 2px 4px 0 rgba(0,0,0,.12), 0 0 6px 0 rgba(0,0,0,.04);
          }
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
         margin-top: 10px;
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
    }
      .traderMain .trader_content h3 {
         font-size: 18px;
       color: #333;
       margin-bottom: 15px; 
       font-weight: 400;
      }
</style>

