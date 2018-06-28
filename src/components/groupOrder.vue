<template>
     <div class="template_container">
          <div class="btn_group">
                    <a @click="selectFolow(orderStatus.account)" :class="{active_btn:active==orderStatus.account}">持仓单</a>
                    <a @click="selectFolow(orderStatus.trader)" :class="{active_btn:active==orderStatus.trader}">成交单</a>
                    <!-- <a @click="selectFolow(orderStatus.delegate)" :class="{active_btn:active==orderStatus.delegate}">委托单</a> -->
          </div>          
                    <!-- 国际国内持仓单 -->
                    <div class="table_list" v-if="active==orderStatus.account" >
                        <div>
                            <ul class="clear table_title">
                                <li class="left">{{ tableField[0] }} </li>
                                <li class="left">{{ tableField[1] }}</li>
                                <li class="left">{{ tableField[2] }}</li>
                                <li class="left">{{ tableField[3] }}</li>
                                <li class="left">{{ tableField[4] }}</li>
                                <li class="left">{{ tableField[5] }}</li>
                                <li class="left">{{ tableField[6] }}</li>
                                <li class="left">{{ tableField[7] }}</li>
                                <li class="left">{{ tableField[8] }}</li>
                            </ul>
                            <div class="table_content" v-for="(item,index) in accountList">
                               <div v-for="(val,key) in item" >
                                   <h3>{{key}}</h3>
                                   <ul v-for="(a,index) in val">
                                        <li>{{ a.id }}</li>
                                        <li>{{ a.age}}</li>
                                        <li>{{a.name}}</li>
                                        <li>{{a.size}}</li>
                                        <li>{{ a.account }} </li>
                                        <li>{{ a.sex }}</li>
                                        <li>{{ a.pws }}</li>
                                        <li>{{a.money }}</li>
                                        <li>222</li>
                                   </ul>                 
                               </div>
                            </div>
                        </div>                        
                    </div>
            
             <!-- 国际国内持仓单 -->
                    <div class="table_list" v-if="active==orderStatus.trader" >
                        <div>
                            <ul class="clear table_title">
                                <li class="left">{{ tableField[0] }} </li>
                                <li class="left">{{ tableField[1] }}</li>
                                <li class="left">{{ tableField[2] }}</li>
                                <li class="left">{{ tableField[3] }}</li>
                                <li class="left">{{ tableField[4] }}</li>
                                <li class="left">{{ tableField[5] }}</li>
                                <li class="left">{{ tableField[6] }}</li>
                                <li class="left">{{ tableField[7] }}</li>
                                <li class="left">{{ tableField[8] }}</li>
                            </ul>
                            <div class="table_content">
                                还没有数据....
                               <!-- <div v-for="(val,key) in item" >
                                   <h3>{{key}}</h3>
                                   <ul v-for="(a,index) in val">
                                        <li>{{ a.id }}</li>
                                        <li>{{ a.age}}</li>
                                        <li>{{a.name}}</li>
                                        <li>{{a.size}}</li>
                                        <li>{{ a.account }} </li>
                                        <li>{{ a.sex }}</li>
                                        <li>{{ a.pws }}</li>
                                        <li>{{a.money }}</li>
                                        <li>222</li>
                                   </ul>                 
                               </div>
                            </div> -->
                        </div>                         
                    </div>
                </div>    
          
     </div>
</template>
<script>
import {orderStatus,tableField} from '../constants/enum'
import {} from '../api/getData'

import message from '../config/message'
import moment from 'moment'
export default {
   data(){
       return{
          active:1,
          isShow:true,
          orderStatus:orderStatus,//单的状态成交单持仓单
          tableField:[],//表格字段
          tradeOrders:[], //成交单
        //   accounts:[],//持仓单
        //   delegates:[],//挂单   
          moment:moment,
          accountList:[],//存放分组后的持仓单
          tradeOrderList:[],//存放分组后的成交单
       }
   },
   props:['groupStrateInfo'],
   methods:{ 
      selectFolow(index){
        this.active=index;
        // if(index==this.orderStatus.account){
        //     this.showOrder=1;
        //     this.tableField=tableField.account;
        //     this.getDirectionAndQty(this.accounts)
        // }else if(index==this.orderStatus.trader){         
        //       this.tableField=tableField.trader;   
        //       if(this.worldOrHome==1){
        //          this.getCcy(this.tradeOrders,this.worldInstrument,this.wordProducts,1,false) 
        //       }else{
        //           this.getCcy(this.tradeOrders,this.homeInstrument,this.homeProducts,2,false)  
        //       }     
        // }else{
        //     this.tableField=tableField.delegate;
        //     if(this.worldOrHome==1){
        //        this.getDelegateOrder()
        //     }else{
        //        this.getHomeDetegateOrder()
        //     }
        // }
      },
      classGroup(){
        const _that=this;
        let firmTradeOrderPosition=this.groupStrateInfo.firmTradeOrderPosition;
       
         firmTradeOrderPosition.namesList.forEach( (item,index) =>{
              let obj={};    
            //  this.accountList[item]=firmTradeOrderPosition.combiOrderPositionList[index].positionList
            //  this.tradeOrderList[item]=firmTradeOrderPosition.combiOrderPositionList[index].todayOrderList
            obj[item]=[{id:2,name:'xio',num:10,age:12,sex:'女',size:23,money:0,account:122,pws:123},{id:2,name:'xio',num:10,age:12,sex:'女',size:23,money:0,account:122,pws:123}]
             _that.accountList.push(obj)
            //   this.accountList[item]=[{id:1,name:'xufan',num:6},{id:2,name:'xio',num:10}]
            
         })
          
      },
      initData(){
          
      }

   },
   mounted(){ 
      this.tableField=tableField.account;
      this.classGroup()
    
   }    
}
</script>
<style lang="less">
   .template_container{
       padding-left: 20px;
       padding-right: 20px;
       padding-bottom: 50px;
       .table_title{
           background: #efefef;
           li{
                text-align: center;
                width: 8%;
                padding: 10px 18px;
                border-radius: 6px;
                color: #666;
           }
       }
       .table_list{
           margin-top: 10px;
       }
       .table_content{
           h3{
                height: 38px;
                line-height: 38px;
                padding-left: 15px;
           }
           ul:after{
               clear: both;
               display: block;
               width:0;
               height: 0;
               content: '';
               overflow: hidden;
           }
           ul{
               li{
                   text-align: center;
                    width: 8%;
                    padding: 10px 18px;
                    border-radius: 6px;
                    float: left;
               }
             
           }
           ul:nth-child(even){
                   background: #efefef;
          }
       }
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


