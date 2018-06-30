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
                    <div v-if="worldOrHome==1">
                           <h3 style="margin-top:13px;">二、国际期货的模拟大赛交易规则</h3>
                            <p>1、交易分日盘交易和夜盘交易,日盘交易恒生指数期货主力合约,夜盘交易美白银主力合约</p>
                            <p>2、日盘交易时间：</p>
                            <p class="text">a)、9:15~12:00</p>
                            <p class="text">b)、13:00~16:30</p>
                            <p class="text">c)、如果外盘交易所进行冬令时/夏令时更替，上述交易时间也会进行响应调整</p>
                            <p class="text">d)、在上午11:50分之前，参赛选手需要自行进行清仓操作，中午不允许留仓。11:50之后还存在持仓或委托的账号,系统将会自动进行全撤清仓处理,由此造成的账户损益,由参赛选手负责</p>
                            <p class="text">e)、在下午16:20分之前，参赛选手需要自行进行清仓操作，晚上不允许留仓。16:20之后还存在持仓或委托的账号,系统将会自动进行全撤清仓处理,由此造成的账户损益,由参赛选手负责</p>
                            <p class="text">f)、日盘只能交易恒生指数</p>
                            <p> 3、夜盘交易时间：</p>
                            <p class="text">a)、17:00~次日凌晨6:00</p>
                            <p class="text">b)、如果外盘交易所进行冬令时/夏令时更替，上述交易时间也会进行响应调整</p>
                            <p class="text">c)、在凌晨5:50分之前，参赛选手需要自行进行清仓操作,晚上不允许留仓.5:50之后还存在持仓或委托的账号,系统将会自动进行全撤清仓处理,由此造成的账户损益,由参赛选手负责</p>
                            <p> 4、单日交易次数限制：每日交易次数大于等于12手,小于等于60手</p>
                            <p> 5、当日内亏损达到3%时,资金使用率降低为2/3,当日内亏损达到6%时,资金使用率降低为1/3,当日内亏损达到10%时,日内停止交易</p>
                            <p> 6、恒指采用港币结算,美白银采用美元结算,人民币,港币,美元之间的汇率按照系统配置的执行</p>
                            <p> 7、未产生交易,或者交易可考核数量及频率过少的参赛选手,不进行排名</p>
                            <h3 style="margin-top:13px;">三、实盘选拔规则</h3>
                            <P>1.交易品种日盘为恒生指数期货(HIS),夜盘为美白银(SI),每个参赛选手在大赛期间通过模拟交易平台参赛:</P>
                            <p>2.日盘交易时间:</p>
                            <p class="text">a).早上9:15-11:50</p>
                            <p class="text">b).下午13:00-16:20</p>
                            <p class="text">c).如果外盘交易所进行冬令时/夏令时更替,上述交易时间也会进行相应调整</p>
                            <p class="text">d).在上午11:50分之前,参赛选手需要自行进行清仓操作,中午不允许留仓.如果11:50之后还存在持仓或委仓,那么系统将会自动进行全撤清仓处理,由此造成的账户损益,有参赛选手负责</p>
                            <p class="text">e).在下午16:20分之前,参赛选手需要自行进行清仓操作,晚上不允许留仓.如果16:20之后还存在持仓或委仓,那么系统将会自动进行全撤清仓处理,由此造成的账户损益,有参赛选手负责</p>
                            <p >3、夜盘交易时间:</p>
                            <p class="text">a).17:00~次日凌晨5.55</p>
                            <p class="text">b).如果外盘交易所进行冬令时/夏令时更替，上述交易时间也会进行响应调整</p>
                            <p class="text">c).在凌晨5:50分之前,参赛选手需要自行进行清仓操作,晚午不允许留仓.如果5:50之后还存在持仓或委仓,那么系统将会自动进行全撤清仓处理,由此造成的账户损益,有参赛选手负责</p>
                            <p>4.单日交易次数限制,每日交易次数大于等于12手,小于等于60手</p>
                            <p>5.当日内亏损达到3%时,资金使用率降低为2/3;当日内亏损达到6%时,资金使用率降低为1/3;当日内亏损达到10%时,日内停止交易</p>
                            <p>6.恒生指数采用港币结算,美白银采用美元结算,人民币、港元、美元之间的汇率按照系统配置的汇率来执行</p>
                            <p>7.未产生交易,或者交易可考核数量及频率过少的参赛选手,不进行排名</p>
                    </div>
                    <div v-if="worldOrHome==2">
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
                                    <span>{{ ((scope.row.totalMoney + scope.row.profit - scope.row.commission)/600000).toFixed(2) }}</span>  
                                </template>
                            </el-table-column>
                            </el-table>
                   </div>
                   <div class="page_wrap" v-if="showPage">
                        <el-pagination

                          background
                          layout="prev, pager, next"
                           :total="totalNum"
                          v-on:prev-click="handlePrev"
                          v-on:next-click="handleNext"
                          v-on:current-change="handleCurrentPage">                     
                        </el-pagination>
                   </div>              
                </el-tab-pane>
            </el-tabs>
           
                <span class="game_btn" @click="game">{{btnText}}</span>
        
        </div>
    </div>
</template>
<script>
import {getGameCycle,getMatchResult,currentUserJoinNewGame,cancelGame,applyGame} from '../../api/getData'
import{mapState,mapActions} from 'vuex'
import message from '../../config/message'
import {getStore} from '../../config/mUtils'
export default {
    data(){
        return{
           active:'1',
           gameType:1,
           gameNums:[],//比赛期数
           gameNum:0,
           ranks:[],
           showPage:true,
           totalNum:0,//总条数
           worldOrHome:1,
           page:1,
           gameUser:null,//大赛用户信息
           btnText:'报名模拟大赛',
           isGame:false,//
           num:15,
           isLoading:true,
           defaultUrl:'../../../static/default/gameNum.png',
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
     game(){
    
            const _that=this;
            if(!this.isGame){
                let token = JSON.parse(getStore('token'));
                if(!token){
                     this.$message({      
                        message:'您还没有登陆将去登陆',
                        type:'warning',
                        duration:2000,
                        center:true,
                        onClose:function(){
                           _that.$router.push({path:'/login'})
                       }
                  })  
                  return;  
                }
            } 
         
            if(this.isGame){
                this.$confirm('退出大赛后，您的国际期货模拟大赛账户的权益值将恢复为初始值.', '退出国际期货模拟大赛吗?', {
                    confirmButtonText: '退赛',
                    cancelButtonText: '取消',
                    type: 'warning'
            }).then(async() => {
                let data={
                     "worldOrHome":1
                }
                 let res=await cancelGame(data)
               
               if(res && res.success){
                    message(_that,{},'退赛成功','success',true);
                  
               }else{
                  message(_that,res)
               }  
            })
        }else{
              this.$confirm('参加大赛后,您的国际期货模拟交易账户的权益值将恢复为初始值.', '报名参赛国际期货模拟大赛吗?', {
                    confirmButtonText: '参赛',
                    cancelButtonText: '取消',
                    type: 'warning'
            }).then(async() => {
                let data={
                     "worldOrHome":1
                }
                 let res=await applyGame(data)
                
               if(res && res.success){
               
                     message(_that,{},'参赛成功','success',true)
                 
               }else{
                  message(_that,res)
               }  
            })
        }
     },
        //获取当前用户参加大赛状态
     async currentUserGameStatus(){
       let res=await currentUserJoinNewGame(1);
       if(res && res.success){
          this.gameUser=res.result;
          if(this.gameUser){
              this.btnText="退出模拟大赛";
              this.isGame=true
          }else{
              this.btnText="报名模拟大赛";
              this.isGame=false;
          }
       }else{
           message(this,res)
       }
     },
       gameNav(tab){
           if(Number(tab.name)==3){
               this.showPage=true;
               this.page=1;
               this.getMatchResult(this.page,this.num)
           }else{
               this.showPage=false;
           }
       },
       //处理期数
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
       this.currentUserGameStatus(); 
       this.getGameCycle();
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
          position: relative;
          .game_btn{
               cursor: pointer;
              text-align: center;
                position: absolute;
                top: 7px;
                z-index: 999;
                right: 20px;
                display: inline-block;
                padding: 6px 12px;
                background: #fc543c;
                color: #fff;
                border-radius: 6px;
          }
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
  .el-message-box__title{
      text-align: center;
      span{
          text-align: center;
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
               border-color: #fc543c;
          }
      }
  }
</style>

