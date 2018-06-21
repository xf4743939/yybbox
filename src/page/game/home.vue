<template>
    <div class="game_wrap">
            <div class="game_nav">
            <el-tabs type="border-card" v-model="active" @tab-click="gameNav" class="trade_navs">
                <el-tab-pane label="大赛首页" name="1">
                    <img :src="defaultUrl" alt="">
                </el-tab-pane>
                <el-tab-pane label="交易规则" name="2" class="rules">
                    <div>
                           <h3>一、参数流程</h3>
                           <p> 点击报名   —>  下载软件   —>   参加比赛</p>
                           <p>实盘交易客户端软件下载地址：<a href="http://www.rlwapp.com:88/follow/%E6%98%93%E5%8F%8B%E5%AE%9D%E8%B7%9F%E6%8A%95.exe">国际实盘下载</a></p>
                           <p>模拟交易客户端软件下载地址：<a href="http://www.rlwapp.com:88/follow/%E6%98%93%E5%8F%8B%E5%AE%9D%E8%B7%9F%E6%8A%95%EF%BC%88%E6%A8%A1%E6%8B%9F%EF%BC%89.exe">国际模拟下载</a></p>
                    </div>
                    <div >
                            <h3 style="margin-top:13px;">二、国内期货的模拟大赛交易规则</h3>
                            <p>1、交易合约:螺纹钢主力合约</p>
                            <p>2、交易时间:</p>
                            <p class="text">a)、9:00~10:15&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;10:30~11:30</p>
                            <p class="text">b)、13:30~15:00</p>
                            <p class="text">c)、21:00~23:00</p>
                            <p class="text">d)、在上午11: 20分之前,参赛选手需要自行进行清仓操作,中午不允许留仓.11: 20之后还存在持仓/委托的账号,系统将会自动进行全撤清仓处理，由此造成的账户损益，由参赛选手负责</p>
                            <p class="text">e)、在下午14: 50分之前,参赛选手需要自行进行清仓操作,晚上不允许留仓.14: 50之后还存在持仓/委托的账号,系统将会自动进行全撤清仓处理,由此造成的账户损益,由参赛选手负责</p>
                            <p class="text">f)、在晚上22: 50分之前,参赛选手需要自行进行清仓操作,晚上不允许留仓.22: 50之后还存在持仓/委托的账号,系统将会自动进行全撤清仓处理,由此造成的账户损益,由参赛选手负责</p>
                            <p>3、单日交易次数限制:每次交易次数大于等于400手,小于等于2000手</p>
                            <p>4、当日内亏损达到3%时,资金使用率降低为2/3,当日内亏损达到6%时,资金使用率降低为1/3,当日内亏损达到10%时,日内停止交易</p>
                            <p> 5、未产生交易,或者交易可考核数量及频率过少的参赛选手,不进行排名</p>
                    </div>
                  
                </el-tab-pane>
                <el-tab-pane label="大赛排名" name="3">
                   <div class="select_main">
                       <el-select v-model="gameType" >
                            <el-option
                             v-for="item in gameTypes"
                            :key="item.id"
                            :label="item.label"
                            :value="item.id">
                            </el-option>
                        </el-select>
                         <el-select v-model="gameNum"  style="width:220px;margin-left:10px;">
                            <el-option
                             v-for="item in gameNums"
                            :key="item.id"
                            :label="item.label"
                            :value="item.id">
                            </el-option>
                        </el-select>
                        <!-- tabel -->
                         <el-table
                            :data="ranks"
                            stripe
                               v-loading="isLoading"
                                element-loading-text="加载中"
                                element-loading-spinner="el-icon-loading"
                                element-loading-background="rgba(0, 0, 0, 0.7)"
                            class="table_rank"
                            style="width: 100%">
                            <el-table-column
                                label="排行"
                                >
                                <template slot-scope="scope">
                                    <span>{{scope.$index+1}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="nickName"
                                label="选手"
                                >
                            </el-table-column>
                            <el-table-column
                                label="手机号">
                                <template slot-scope="scope">
                                    <span>{{ scope.row.userName |subStr(4,4) }}</span>  
                                </template>
                            </el-table-column>
                             <el-table-column
                                label="总资产">
                                <template slot-scope="scope">
                                    <span>{{ scope.row.totalMoney + scope.row.profit - scope.row.commission }}</span>  
                                </template>
                            </el-table-column>
                             <el-table-column
                                label="净值">
                                <template slot-scope="scope">
                                    <span>{{ ((scope.row.totalMoney + scope.row.profit - scope.row.commission)/500000).toFixed(2) }}</span>  
                                </template>
                            </el-table-column>
                            </el-table>
                   </div>
                     <div class="page_wrap" v-if="showPage">
                        <el-pagination
                          background
                    
                          layout="prev, pager, next"
                          v-bind:total="totalNum"
                          v-on:prev-click="handlePrev"
                          v-on:next-click="handleNext"
                          v-on:current-change="handleCurrentPage">                     
                        </el-pagination>
                   </div>              
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>
<script>
import {getGameCycle,getMatchResult} from '../../api/getData'
import{mapState,mapActions} from 'vuex'
import message from '../../config/message'

export default {
    data(){
        return{
           active:'1',
           gameType:1,
           gameNums:[],//比赛期数
           gameNum:0,
           ranks:[],
           page:1,
           num:15,
           showPage:true,
           isLoading:true,
           totalNum:0,//总条数
           worldOrHome:2,
           page:1,
           nums:15,
           defaultUrl:'../../../static/default/homegamedesc.png',
           gameTypes:[{
               label:'模拟大赛',
               id:1
           },{
               label:'实盘预备赛',
               id:2
           }]
        }
    },
    computed:{
       ...mapState(['userInfo'])
    },
    methods:{
       gameNav(tab){
            if(Number(tab.name)==3){
               this.showPage=true;
    
               this.getMatchResult(this.page,this.num)
           }else{
               this.showPage=false;
           }
       },
       filterCycle(items){
            if(!items) return;
            items.forEach(item => {
                 let time=new Date(item.startDate);
                 let time2=new Date(item.endDate);
                 let month=time.getMonth()+1;
                 let month2=time2.getMonth()+1;
                 let date=time.getDate();
                 let date2=time2.getDate();
                 let label=item.name + '(' + month + '月' + date +'日' + "-" + month2 + '月' + date2 + '日)'
                 let data={
                     id:item.id,
                     label:label
                 };
                 this.gameNums.push(data)
            });
               this.gameNums=Array.from(new Set(this.gameNums))
       },
       //获取比赛期数
       async getGameCycle(){
            let data={
                "worldOrHome":this.worldOrHome
            } 
            let cycles
            let res=await getGameCycle(data);
            if(res.success){
                cycles=res.result;
               this.filterCycle(cycles);
               this.gameNum=this.gameNums[0].id
            }else{
              message(this,res)
            } 
       },
       //获取大赛排名
      async getMatchResult(page,num){
          const _that=this;
          let data={
                "cycleId":Number(_that.gameNum),
                "gameCycleLevel": Number(_that.gameType),
                "worldOrHome":_that.worldOrHome ,
                "page": page,
                "rows": num
          } 
            _that.isLoading = true;
                setTimeout(function () {
                    _that.isLoading = false;
                }, 500);          
          let res =await getMatchResult(data); 
       
          if(res.success){
              this.ranks=res.result.items;
              this.totalNum=res.result.totalCount;
          }else{
              message(_that,res)
          }
      },
    handleCurrentPage(val){
        const _that=this;
        this.getMatchResult(val,this.num)
     },
     handlePrev(val){
        const _that=this;
       this.getMatchResult(val,this.num)
     },
     handleNext(val){
       const _that=this;
       this.getMatchResult(val,this.num)
     }   
    },
    mounted(){  
       this.getGameCycle()
    }
}
</script>
<style lang="less" >
  .game_main{
      padding-top: 20px;
      margin-left: auto;
      margin-right: auto;
      width: 1200px;
      .el-tabs--border-card{
         >.el-tabs__header{
              .el-tabs__item:not(.is-disabled):hover{
                color: #fc543c;
              }
               .el-tabs__item.is-active{
                   color: #fc543c;
                   border-top: 3px solid #fc543c;
               }
         }
      } 
      .game_nav{
          .rules{
              margin-bottom: 25px;
              h3{
                  font-size: 16px;
                  margin-bottom: 8px;
                
              }
              p{
                  color: #666;
                  margin-bottom: 8px;
              }
              .text{
                  padding-left: 20px;
              }
          }
      }
      .game_type{
          margin-bottom: 10px;
          span:nth-of-type(1){
                font-size: 16px;
                color: #fc543c;
                display: inline-block;
                cursor: pointer;
          }
         .line{
                width: 2px;
                background: #dcdfe6;
                height: 19px;
                display: inline-block;
                position: relative;
                top: 4px;
                margin-left: 3px;
                margin-right: 3px;
         } 
         span:nth-of-type(3){
             display: inline-block;
             font-size: 16px;
             cursor: pointer;
         }
      }
  }
  .table_rank{
      margin-top: 20px;
      .el-table__header{
          tr{
              th{
                  background: #fc543c;
                  color: #fff;
              }
          }
      }
       td,th{
           padding: 8px 0;
       }
  }
  
</style>

