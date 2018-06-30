<template>
     <div class="template_container">
          <div class="btn_group">
                    <a @click="selectFolow(orderStatus.account)" :class="{active_btn:active==orderStatus.account}">持仓单</a>
                    <a @click="selectFolow(orderStatus.trader)" :class="{active_btn:active==orderStatus.trader}">成交单</a>
                    <a @click="selectFolow(orderStatus.delegate)" :class="{active_btn:active==orderStatus.delegate}">委托单</a>
          </div>          
                    <!-- 国际国内持仓单 -->
                    <div class="table_list" v-if="active==orderStatus.account" >
                         <el-table
                                v-if="type==1 || type==3"
                                :data="accounts"
                                stripe
                                style="width: 100%">
                                    <el-table-column    
                                    :label="tableField[0]"
                                    >   
                                        <template slot-scope="scope">     
                                        <span>{{ scope.row.instrumentID}}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column    
                                    :label="tableField[1]"
                                    >   
                                        <template slot-scope="scope">     
                                        <span>{{ scope.row.status }}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column    
                                    :label="tableField[2]"
                                    >   
                                        <template slot-scope="scope">     
                                        <span>{{ scope.row.allNum }}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column    
                                    :label="tableField[3]"
                                    >   
                                        <template slot-scope="scope">     
                                         <span >{{ Math.abs(scope.row.longQty-scope.row.shortQty) }}</span>                           
                                        </template>
                                    </el-table-column>
                                    <el-table-column    
                                    :label="tableField[4]"
                                    >   
                                        <template slot-scope="scope">     
                                          <span>{{ scope.row.qty }}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column    
                                    :label="tableField[5]"
                                    >   
                                        <template slot-scope="scope">     
                                        <span>{{ scope.row.averagePositionPrice }}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column    
                                    :label="tableField[6]"
                                    >   
                                        <template slot-scope="scope">     
                                        <span>{{ scope.row.posiDirection === 83 ? Math.abs(Math.ceil((scope.row.longQty - scope.row.shortQty - scope.row.qty) * scope.row.margin)).toFixed(2) : Math.abs(Math.ceil((scope.row.longQty + scope.row.qty - scope.row.shortQty) * scope.row.margin)).toFixed(2) }}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column    
                                    :label="tableField[7]"
                                    >   
                                        <template slot-scope="scope">     
                                        <span >{{ scope.row.ccy }}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column                                  
                                    :label="tableField[8]"
                                    >   
                                        <template slot-scope="scope">     
                                           <span>{{ scope.row.pl | toDecimal }}</span>
                                        </template>
                                    </el-table-column>
                         </el-table>
                         <el-table
                          v-if="type==2 || type ==4"
                                :data="accounts"
                                stripe
                                style="width: 100%">
                                    <el-table-column    
                                    :label="tableField[0]"
                                    >   
                                        <template slot-scope="scope">     
                                        <span>{{ scope.row.instrumentID}}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column    
                                    :label="tableField[1]"
                                    >   
                                        <template slot-scope="scope">     
                                        <span>{{ scope.row.posiDirection==83 ? '空' : '多'  }}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column    
                                    :label="tableField[2]"
                                    >   
                                        <template slot-scope="scope">     
                                        <span v-if="scope.row.posiDirection==83 ">{{ Math.abs(scope.row.todayPosition - scope.row.ydPosition) }}</span>
                                        <span v-else>{{ scope.row.todayPosition + scope.row.ydPosition }}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column    
                                    :label="tableField[3]"
                                    >   
                                        <template slot-scope="scope">     
                                         <span >{{ scope.row.todayPosition }}</span>                           
                                        </template>
                                    </el-table-column>
                                    <el-table-column    
                                    :label="tableField[4]"
                                    >   
                                        <template slot-scope="scope">     
                                          <span>{{ scope.row.ydPosition }}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column    
                                    :label="tableField[5]"
                                    >   
                                        <template slot-scope="scope">     
                                        <span>{{ (scope.row.positionCost / scope.row.position).toFixed(3) }}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column    
                                    :label="tableField[6]"
                                    >   
                                        <template slot-scope="scope">     
                                        <span>{{  Math.ceil(scope.row.useMargin).toFixed(0) }}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column    
                                    :label="tableField[7]"
                                    >   
                                        <template slot-scope="scope">     
                                        <span >{{ scope.row.ccy }}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column                                  
                                    :label="tableField[8]"
                                    >   
                                        <template slot-scope="scope">     
                                           <span>{{ scope.row.positionProfit | toDecimal }}</span>
                                        </template>
                                    </el-table-column>
                         </el-table>
                    </div>
                    <!-- 国际国内成交单 -->
                    <div class="table_list" v-if="active==orderStatus.trader" >
                         <el-table   
                                :data="tradeOrders"
                                stripe
                                style="width: 100%">
                                    <el-table-column    
                                    :label="tableField[0]"
                                    >   
                                        <template slot-scope="scope">     
                                        <span>{{ scope.row.tradeNo}}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column    
                                    :label="tableField[1]"
                                    >   
                                        <template slot-scope="scope">     
                                        <span>{{ scope.row.instrumentId }}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column    
                                    :label="tableField[2]"
                                    >   
                                        <template slot-scope="scope"> 
                                        <span>{{ scope.row.buySell==66 ? '多' : '空' }}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column    
                                    :label="tableField[3]"
                                    >   
                                        <template slot-scope="scope">     
                                         <span >{{ (scope.row.price) + '/' + scope.row.ccy}}</span>                           
                                        </template>
                                    </el-table-column>
                                    <el-table-column    
                                    :label="tableField[4]"
                                    >   
                                        <template slot-scope="scope">     
                                          <span>{{ scope.row.qty }}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column    
                                    :label="tableField[5]"
                                    >   
                                        <template slot-scope="scope">     
                                        <span>{{ (moment(scope.row.tradeDate).format('YYYY/MM/DD') + ' ' + scope.row.tradeTime) }}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column    
                                    :label="tableField[6]"
                                    >   
                                        <template slot-scope="scope">     
                                        <span>{{ scope.row.orderNo }}</span>
                                        </template>
                                    </el-table-column>
                        </el-table>
                    </div>
                    <!-- 挂单 -->
                     <div class="table_list" v-if="active==orderStatus.delegate" >
                         <el-table   
                                :data="delegates"
                                stripe
                                style="width: 100%">
                                    <el-table-column    
                                    :label="tableField[0]"
                                    >   
                                        <template slot-scope="scope">     
                                        <span>{{ scope.row.intOrderNo}}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column    
                                    :label="tableField[1]"
                                    >   
                                        <template slot-scope="scope">     
                                        <span>{{ scope.row.instrumentId }}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column    
                                    :label="tableField[2]"
                                    >   
                                        <template slot-scope="scope"> 
                                        <span>{{ scope.row.buySell==66 ? '多' : '空' }}</span>
                                        </template>
                                    </el-table-column>
                                        <el-table-column    
                                    :label="tableField[3]"
                                    >   
                                        <template slot-scope="scope">     
                                         <span >工作中</span>                           
                                        </template>
                                    </el-table-column>
                                    <el-table-column    
                                    :label="tableField[4]"
                                    >   
                                        <template slot-scope="scope">     
                                         <span >{{ (scope.row.price) + '/' + scope.row.ccy}}</span>                           
                                        </template>
                                    </el-table-column>
                                    <el-table-column    
                                    :label="tableField[5]"
                                    >   
                                        <template slot-scope="scope">     
                                          <span>{{ scope.row.totalQty }}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column    
                                    :label="tableField[6]"
                                    >   
                                        <template slot-scope="scope">     
                                        <span>{{ scope.row.tradedQty }}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column    
                                    :label="tableField[7]"
                                    >   
                                        <template slot-scope="scope">     
                                        <span>{{ scope.row.qty }}</span>
                                        </template>
                                    </el-table-column>
                                     <el-table-column    
                                    :label="tableField[8]"
                                    >   
                                        <template slot-scope="scope">     
                                        <span>{{ moment(scope.row.creationTime).format('YYYY/MM/DD hh:mm:ss') }}</span>
                                        </template>
                                    </el-table-column>
                        </el-table>
                    </div>
          
     </div>
</template>
<script>
import {orderStatus,tableField} from '../constants/enum'
import {getAllWorldInstrument,
getAllHomeInstrument,getWordProducts,
getAllHomeProduct,getAllInstrumentAndproduct,
brokerCompanyAccountPositionService,simBrokerCompanyAccountPositionService,
homeBrokerCompanyAccountPositionService,homeSimBrokerCompanyAccountPositionService,
todayTradeOrderService,todaySimTradeOrderService,
todayHomeTradeOrderService,todayHomeSimTradeOrderService,
brokerCompanyAccountDelegateOrderService,simDelegateOrderService,
homeBrokerCompanyAccountDelegateOrderService,homeSimDelegateOrderService,
spreads} from '../api/getData'

import message from '../config/message'
import moment from 'moment'
export default {
   data(){
       return{
          active:1,
          isShow:true,
          orderStatus:orderStatus,
          tableField:[],//表格字段
          tradeOrders:[], //成交单
          accounts:[],//持仓单
          delegates:[],//挂单   
          moment:moment,
          worldInstrument:[],//国际合约
          homeInstrument:[],//国内合约
          wordProducts:[],//国际商品货物
          homeProducts:[],//国内商品货物
       }
   },
   created(){
       this.initData(this.type);  
   },
   props:['type'],
    watch:{
      type(newValue,oldValue){
           this.initData(newValue)
      }
   },
   methods:{
       initData(type){
             switch(Number(type)){
                 case 1 :
                 this.brokerCompanyAccountPositionService();
                 this.todayTradeOrderService();
                 this.brokerCompanyAccountDelegateOrderService();
                 break;
                 case 2 :
                 this.homeBrokerCompanyAccountPositionService();
                 this.todayHomeTradeOrderService();
                 this.homeBrokerCompanyAccountDelegateOrderService()
                 break;
                 case 3 :
                 this.simBrokerCompanyAccountPositionService();
                 this.todaySimTradeOrderService();
                 this.simDelegateOrderService();
                 break;
                 default:
                 this.homeSimBrokerCompanyAccountPositionService();
                 this.todayHomeSimTradeOrderService();
                 this.homeSimDelegateOrderService();
             }
       },
       //国际实盘持仓单
       async brokerCompanyAccountPositionService(){
          let res =await brokerCompanyAccountPositionService()
          if(res && res.success){
              this.accounts=res.result
          }else{
              message(this,res)
          }
       },
       //国际模拟持仓单
       async simBrokerCompanyAccountPositionService(){
          let res=await simBrokerCompanyAccountPositionService()
            if(res && res.success){
              this.accounts=res.result
          }else{
              message(this,res)
          }
       },
       //国内实盘持仓单
       async homeBrokerCompanyAccountPositionService(){
           let res=await homeBrokerCompanyAccountPositionService()
            if(res && res.success){
              this.accounts=res.result
          }else{
              message(this,res)
          }
       },
       //国内模拟持仓单
       async homeSimBrokerCompanyAccountPositionService(){
          let res=await homeSimBrokerCompanyAccountPositionService();
            if(res && res.success){
              this.accounts=res.result
          }else{
              message(this,res)
          }
       },
       //国际实盘成交单
      async todayTradeOrderService(){
         let res=await todayTradeOrderService()
         if(res && res.success){
            this.tradeOrders=res.result;
         }else{
             message(this,res)
         }
      },
        //国际模拟成交单
      async todaySimTradeOrderService(){
         let res=await todaySimTradeOrderService()
         if(res && res.success){
            this.tradeOrders=res.result;
          
         }else{
             message(this,res)
         }
      },
          //国内实盘成交单
      async todayHomeTradeOrderService(){
         let res=await todayHomeTradeOrderService()
         if(res && res.success){
            this.tradeOrders=res.result;
          
         }else{
             message(this,res)
         }
      },
             //国内模拟成交单
      async todayHomeSimTradeOrderService(){
         let res=await todayHomeSimTradeOrderService()
         if(res && res.success){
            this.tradeOrders=res.result;
         }else{
             message(this,res)
         }
      },
      //国际实盘挂单
      async brokerCompanyAccountDelegateOrderService(){
          let res= await brokerCompanyAccountDelegateOrderService();
          if(res && res.success){
             this.delegates=res.result;
          }else{
              message(this,res)
          }
      },
        //国际模拟挂单
      async simDelegateOrderService(){
          let res= await simDelegateOrderService();
          if(res && res.success){
             this.delegates=res.result;
       
          }else{
              message(this,res)
          }
      },
         //国内实盘挂单
      async homeBrokerCompanyAccountDelegateOrderService(){
          let res= await homeBrokerCompanyAccountDelegateOrderService();
          if(res && res.success){
             this.delegates=res.result;
         
          }else{
              message(this,res)
          }
      },
         //国内模拟挂单
      async homeSimDelegateOrderService(){
          let res= await homeSimDelegateOrderService();
          if(res && res.success){
             this.delegates=res.result;
         
          }else{
              message(this,res)
          }
      },
      selectFolow(index){
        this.active=index;
        if(index==this.orderStatus.account){
            this.tableField=tableField.account;
            this.getDirectionAndQty(this.accounts)
        }else if(index==this.orderStatus.trader){         
              this.tableField=tableField.trader;   
              if(this.type==1 || this.type==3 ){
                 this.getCcy(this.tradeOrders,this.worldInstrument,this.wordProducts,1,false) 
              }else{
                  this.getCcy(this.tradeOrders,this.homeInstrument,this.homeProducts,2,false)  
              }     
        }else{
            this.tableField=tableField.delegate;
             if(this.type==1 || this.type==3){
                  this.getCcy(this.delegates,this.worldInstrument,this.wordProducts,1,true) 
             }else{
                   this.getCcy(this.delegates,this.worldInstrument,this.wordProducts,2,true) 
             }
        }
      },
   
      //获取持仓单的方向和总手数
      getDirectionAndQty(options){
          const _that=this;
          if( !options) return;
          if(this.type==1 || this.type==3){
              
             options=options.filter(function(item){
                  if (item.longShort === 66) {
                        return (item.longQty + item.qty) !== item.shortQty;
                    } else if (item.longShort === 83) {
                        return item.longQty !== item.qty + item.shortQty;
                    }
                });
                options.forEach(function(item) {
                     if (item.longQty - item.shortQty > 0) {
                        if (item.longShort === 83) {
                            if (item.longQty - item.shortQty - item.qty > 0) {
                                item["status"]='多';
                                item["allNum"]=item.longQty - item.qty - item.shortQty
                            } else {
                                item["status"]='空';
                                item["allNum"]= Math.abs(item.longQty - item.qty - item.shortQty) 
                            }

                        } else {
                                item["status"]='多';
                                item["allNum"]=item.longQty + item.qty - item.shortQty
                        }
                    } else if (item.longQty - item.shortQty === 0) {
                        if (item.longShort === 83) {
                             item["status"]='空';
                             item["allNum"]= item.qty               
                        } else {
                                item["status"]='多';
                                item["allNum"]=item.qty 
                        }
                    } else {
                        if (item.longShort === 83) {
                             item["status"]='空';
                             item["allNum"]= Math.abs(item.longQty - item.qty - item.shortQty)
                        } else {
                            if (item.longQty - item.shortQty + item.qty > 0) {
                                 item["status"]='多';
                                item["allNum"]=item.longQty - item.shortQty + item.qty
                            } else {
                                 item["status"]='空';
                                 item["allNum"]= Math.abs(item.longQty + item.qty - item.shortQty)
                            }
                        }
                    }                  
                    item["averagePositionPrice"] = 0;
                    _that.calAvgPositions(item);
                });
               this.accounts=options;
        
          }else{
              options = options.filter(function(item) {
                    return item.position > 0;
                });
               this.accounts=options;
          }
      },
      //根据成交单计算持仓均价
      calAvgPositions(position){
           //参数参入一个持仓单
            let pos; //净持仓手数
            if (position.longShort === 83) {
                pos = position.longQty - position.shortQty - position.qty;
            } else {
                pos = position.longQty + position.qty - position.shortQty;
            }
            let totalNumber = pos; //当前手数下面用于抵消       
            let _order; //当前成交单
            let dAmt = 0; //当前成交单点数

            this.tradeOrders =this.tradeOrders.sort(function(a, b) {
                return b.id - a.id;
            });

            for (var i = 0; i < this.tradeOrders.length; i++) {
                _order = this.tradeOrders[i];
                if (_order.buySell !== position.longShort) {
                    continue;
                }
                if (!(_order.instrumentId === position.instrumentID)) {
                    continue;
                }
                if (totalNumber > _order.qty) {
                    totalNumber -= Number(_order.qty);
                    dAmt += (Number(_order.qty) * Number(_order.price));
                } else {
                    dAmt += (Number(totalNumber) * Number(_order.price));
                    totalNumber = 0;
                    break;
                }
            }

            if (totalNumber > 0) {
                if (0 !== position.qty) {
                    dAmt += ((Number(position.totalAmt) / Number(position.qty)) * Number(totalNumber));
                }
            }
            position["averagePositionPrice"] = ((Number(dAmt) / Number(pos))).toFixed(3);
      },
      //得到成交单的货币种类
        //a 表示成交单 b表示合约 c.表示产品货物 d表示国际国内(1国际2.国内)e表示类别fasle 成交单true 挂单 
       getCcy(a, b, c, d, e) {
        
                let  findProduct;
                let  findInstrument;
                let orders=[];
                if (d === 1) {
                    if (e) {
                        if (a && a.length) {
                            a.forEach(function(item, index) {
                                findInstrument = b.find(function(x) {
                                    return x.code === item.instrumentID;
                                });
                                if (findInstrument) {
                                    findProduct = c.find(function(i) {
                                        return i.productId === findInstrument.productCode;
                                    });
                                }
                                if (findProduct) {            
                                    item.ccy = findProduct.ccy;
                                 
                                }else{
                                    item.ccy='其它'
                                }
                                   orders.push(item);
                            });
                          
                        }
                       
                    } else {
                        if (a && a.length) {
                            a.forEach(function(item, index) {
                            
                                findInstrument = b.find(function(x) {
                                    return x.code === item.instrumentId;
                                });
                                if (findInstrument) {
                                    findProduct = c.find(function(i) {
                                        return i.productId === findInstrument.productCode;
                                    });
                                }
                                if (findProduct) {            
                                    item.ccy = findProduct.ccy;
                                 
                                }else{
                                    item.ccy='其它'
                                }
                                   orders.push(item);
                            });
                        }
                    }
                  
                } else {
                    if (e) {                  
                        if (a && a.length) {
                            a.forEach(function(item, index) {
                                findInstrument = b.find(function(x) {
                                    return x.instrumentID === item.instrumentID;
                                });
                                if (findInstrument) {
                                    findProduct = c.find(function(i) {
                                        return i.productId === findInstrument.productId;
                                    });
                                }
                               if (findProduct) {            
                                    item.ccy = findProduct.ccy;
                                 
                                }else{
                                    item.ccy='其它'
                                }
                                 orders.push(item);
                            });
                        }
                    } else {                     
                        if (a && a.length) {
                            a.forEach(function(item, index) {
                                findInstrument = b.find(function(x) {
                                    return x.instrumentID === item.instrumentId;
                                });
                                if (findInstrument) {
                                    findProduct = c.find(function(i) {
                                        return i.productId === findInstrument.productId;
                                    });
                                }
                               if (findProduct) {            
                                    item.ccy = findProduct.ccy;
                                 
                                }else{
                                    item.ccy='其它'
                                }
                                 orders.push(item);
                            });
                        }
                    }                   
                }
                if(e){
                    this.delegates=orders;
                }else{
                   this.tradeOrders=orders;
                }              
       },

       //获取国际合约
       getWorldInstrument(){
           const _that=this;
          let data=[getAllWorldInstrument(),getAllHomeInstrument(),getWordProducts(),getAllHomeProduct()];
          getAllInstrumentAndproduct(data).then(spreads(function(res1,res2,res3,res4){
           
                if(res1.data.success){
                     _that.worldInstrument=res1.data.result
                }else{
                    message(_that,res1.data)
                }
                if(res2.data.success){
                     _that.homeInstrument=res2.data.result
                }else{
                    message(_that,res2.data)
                }
                 if(res3.data.success){
                     _that.wordProducts=res3.data.result
                }else{
                    message(_that,res3.data)
                }
                 if(res4.data.success){
                     _that.homeProducts=res4.data.result
                }else{
                    message(_that,res4.data)
                }
              
          }))
       }

   },
   mounted(){ 
       this.getWorldInstrument(); 
       this.getDirectionAndQty(this.accounts); 
       this.tableField=tableField.account;
       
   }    
}
</script>
<style lang="less">
   .template_container{
       padding-left: 20px;
       padding-right: 20px;
       .btn_group{
           margin-bottom:5px;
           .active_btn{
                color: #fff;
                background: #fc543c;
           }
           a{
               padding: 6px 1px;
                display: inline-block;
                text-align: center;
                border-radius: 20px;
                width: 102px;
                cursor: pointer;
           }
       }
   }
</style>


