<template>
    <div>
           <!-- 跟投弹窗 -->
         <el-dialog
                 class="followDialog stargeyModal" 
                 :before-close="hideModal"
                v-bind:visible.sync="isVisible"          
                   >
            <span slot="title">
                  <span v-if="worldOrHome==1" style="position: relative; left: 5px; font-weight: bold;" >国际</span>
                  <span v-else style="position: relative; left: 5px; font-weight: bold;">国内</span>
                  <span v-if="isFirm==2" class="title_type">实盘跟投</span>
                  <span v-else class="title_type">模拟跟投</span>
                  <span class="title_img"><img :src="arrowUrl" /></span>
                  <span class="title_trader" style="color:#fc543c">策略组合</span>
            </span>
         
            <div class="followContent">
                <div class="item_top">
                     <span>请选择跟投份额</span>
                     <el-input-number v-model="num" :min="1"></el-input-number>
                     <span>份</span>
                </div>
                <div class="item_center">
                    <h3>组合xxx</h3>
                    <el-table
                        :data="items"
                      >
                        <el-table-column
                        label="用户"
                         >
                        <template slot-scope="scope">
                            <span >{{ scope.row.name }}</span>
                        </template>
                        </el-table-column>
                        <el-table-column
                        label="最少跟投资金"
                        >
                        <template slot-scope="scope">
                              <span >{{ (scope.row.leastMoneyLine/10000).toFixed(2) }}万元</span>
                        </template>
                        </el-table-column>
                        <el-table-column
                        label="手数"
                        >
                        <template slot-scope="scope">
                              <span >{{ scope.row.everyQty }}</span>
                        </template>
                        </el-table-column>
                           <el-table-column
                        label="每份年费"
                        >
                        <template slot-scope="scope">
                              <span >{{ scope.row.fee.toFixed(2) }}元</span>
                        </template>
                        </el-table-column>
                    </el-table> 
                    <ul class="clear item_foot">
                          <li class="left">
                              <p>最少跟投资金</p>
                              <p>{{(leastMoney/10000).toFixed(2)}}万元</p>
                          </li>
                          <li class="left">
                               <p>总手数</p>
                               <p>{{allNum}}手</p>
                          </li>
                          <li class="left">
                              <p>总年费</p>
                              <p>{{allFee.toFixed(2)}}元</p>
                          </li>
                    </ul>       
                </div>  
            </div>
            <span slot="footer" class="dialog-footer" >             
                <el-button  v-on:click="handleFollow" >确定跟投</el-button>
                <!-- <el-button class="cancelFollow" v-if="(clickBtn==1 || clickBtn==3 )" v-on:click="cancelFollow">取消跟投</el-button> -->
            </span>
        </el-dialog>
    </div>
</template>
<script>
import message from '../config/message'
import {strategyFollow} from '../api/getData'
export default {
    data(){
       return{
                arrowUrl:'../../static/default/fl_arrow.png',
                isShow:true, //message显示
                traderUserId:0,//交易员的用户id
                worldOrHome:1,
                isFirm: 1, //1表示模拟跟实盘2.表示实盘跟实盘
                clickBtn: 1, //1.表示编辑实盘 2.表示实盘跟投3.编辑模拟 4.模拟跟投
                ishide:false,
                num:1,
                strategyInfo:null, //跟投信息
                items:[], //组合策略的单个策略集合
                leastMoney:0,//最少跟投资金
                allNum:0,//总手数
                allFee:0,//总年费
       }
    },
    created(){
      
    },
    props:['isVisible','groupStrateInfo','modalInfo'],
    methods:{
           hideModal(){
               this.$emit('hideModal')      
           },
         //确定跟投
           async handleFollow(){
                const _that = this;     
                let data = {
                    "combiStrategyId":this.strategyInfo.id,
                    "number":_that.num,
                    "followType":_that.isFirm
                }
                let res= await strategyFollow(data);
      
                if(res && res.success){               
                    this.$emit('hideModal')            
                }else{
                     message(_that,res)
                }
            },
            //计算总年费手数
            calMoney(items){
                const _that=this;
                if(!items)return;
                items.forEach( item=>{
                    _that.leastMoney+=item.leastMoneyLine
                    _that.allNum+=item.everyQty
                    _that.allFee+=item.fee
                } )
            },
            //传进来的数据初始化
            ininData(){
                    this.worldOrHome=this.modalInfo.worldOrHome;
                    this.isFirm=this.modalInfo.isFirm;
                    this.clickBtn=this.modalInfo.clickBtn;
                    this.strategyInfo=this.groupStrateInfo;
                    this.items=this.groupStrateInfo.strategyItemList;
                    this.calMoney(this.items)
                    console.log(this.strategyInfo)         
            }
    },
    mounted(){
        this.ininData();
    }
}
</script>
<style lang="less">
.stargeyModal{
    .el-dialog__footer{
        text-align: center;
    }
}
  .item_top{
      text-align: center;
      >span{
          font-size: 16px;
          margin-right: 7px;
      }
      .el-input-number__increase:hover:not(.is-disabled)~.el-input .el-input__inner:not(.is-disabled) {
       border-color: #fc543c;
     }
      .el-input-number{
          width: 148px;
          .el-input-number__decrease{
              height: 100%;
              line-height: 40px;
              background: #fc543c;
              color: #fff;
          }
          .el-input-number__increase{
               height: 100%;
              line-height: 40px;
              background: #fc543c;
              color: #fff;
          }
        
          .el-input__inner{
            border-color: #fc543c;
            outline: 0;
          }
        
      }
  }
  .item_center{
     margin-top: 20px;
     .el-table{
         width: 620px;
         margin: 0 auto;
         .cell{
             >span{
                 font-weight: bold;
             }
         }
     }
     h3{
         height: 34px;
        font-size: 18px;
        text-align: center;
     }
  }
  .item_foot{
      margin-top: 16px;
      text-align: center;
      li{
          width: 33.33%;
          box-sizing: border-box;
          p:nth-of-type(1){
              color: #666;
              margin-bottom: 15px;

          }
          p:nth-of-type(2){
              font-weight: bold;
            }     
       }
  }
</style>

