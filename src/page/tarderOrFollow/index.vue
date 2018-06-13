<template>
   <div>
       <head-top></head-top>
    <section class="detail_wrap">
        <div class="step_tip">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item>策略组合/{{tradertip}}</el-breadcrumb-item>
                <el-breadcrumb-item>精选组合</el-breadcrumb-item>
                <el-breadcrumb-item class="text">{{worldOrHome}}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="detail_info">
            <ul class="clear">
                <li class="left">
                     <img src="../../../static/default/traderGroup.png" class="left">
                    <div class="clear left info">
                        <img  src="../../../static/default/50x50.png" class="left info_left">
                        <div class="left info_right">
                            <p>xxxx组合<img :src="traderUrl" alt=""></p>
                            <p ><span>交易者</span>组合</p>
                            <p class="info_num"> 
                                <img src="../../../static/default/circle.png" alt="">
                                <span>被跟投人数</span>
                                <span>10</span>
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
                    <p>6000手</p>
                </li>
                <li class="left li_width">
                    <p>胜率</p>
                    <p>90.45%</p>
                </li>
                <li class="left li_width">

                </li>
                <li class="left">
                    <div class="clear">
                         <el-button v-if="false" size="mini"
                                   style="padding: 3px 15px;display:block;"
                                   type="danger"
                                   v-on:click="handleFirm(1 ,true,scope.row)">编辑实盘</el-button>
                        <el-button v-else size="mini"
                                   style="padding: 3px 15px;display:block;"
                                   type="danger"
                                   v-on:click="handleFirm(2,true,scope.row)">实盘跟投</el-button>
                        <el-button v-if="false" size="mini"
                                   v-bind:disabled="isDisableSimBtn"
                                   style="padding: 3px 15px; margin-top: 5px; margin-left: 0px;display:block;"
                                   v-on:click="handleFirm(3,false,scope.row)">编辑模拟</el-button>
                        <el-button v-else size="mini"
                                   v-bind:disabled="isDisableSimBtn"
                                   style="padding: 3px 15px; margin-top: 5px; margin-left: 0px;display:block;"
                                   v-on:click="handleFirm(4,false,scope.row)">模拟跟投</el-button>
                    </div>
                </li>
            </ul>
        </div>
        <div class="trader_wrap">
            <el-tabs v-model="tradeActive" @tab-click="tradeNav" class="trade_navs">
                <el-tab-pane label="业绩" name="1">业绩</el-tab-pane>
                <el-tab-pane label="策略" name="2">策略</el-tab-pane>
                <el-tab-pane label="跟投" name="3">
                </el-tab-pane>
                <el-tab-pane label="订单" name="4">订单</el-tab-pane>
            </el-tabs>
        </div>
    </section>
    <foot-bom></foot-bom>
  </div>

</template>
<script>
 import {mapState,mapActions, mapMutations} from 'vuex'
 import message from '../../config/message'
 import headTop from '../../components/headTop'
 import footBom from '../../components/footer'
export default {
    data(){
        return{
            user:null,
            tradertip:'交易员',
            worldOrHome:'国际期货',
            traderUrl:'../../../static/default/trade.png'
        }
    },
    components:{
      headTop,
      footBom
    },
    methods:{

    }
}
</script>
<style lang="less" >
   .detail_wrap{
       width: 1200px;
       margin: 0 auto;
       padding-top: 20px;
       padding-bottom: 20px;
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
            .li_width{
                      width: 16%;
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
</style>

