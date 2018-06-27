<template>
     <div class="strategy_info">
         <h2>策略信息</h2>
         <div class="strategy_item">
              <h3>包含策略</h3>
              <div class="item_content">
                   <div class="item_card clear">
                       <el-card class="box-card left">
                            <div class="text item1">
                                <span>宝盈量化01</span>
                                <img src="../../static/default/trade.png">    
                            </div>
                             <div class="text item2">
                                <span>最少跟投资金</span>
                                <span>
                                    <span style="color:#fc543c;">10.00</span>
                                    <span>万元/份</span>
                                </span>
                            </div>
                            <div class="text item3">
                                <span>手数</span>
                                <span>
                                    <span style="color:#fc543c;">2</span>
                                    <span>手/份</span>
                                </span>
                            </div>
                            <div class="text item4">
                                <span>年费</span>
                                <span>
                                    <span style="color:#fc543c;">100.00</span>
                                    <span>元/份</span>
                                </span>
                            </div>
                       </el-card>
                       <el-card class="box-card left">
                            <div v-for="o in 4" :key="o" class="text item">
                                {{'列表内容 ' + o }}
                            </div>
                       </el-card>
                        <el-card class="box-card left">
                            <div v-for="o in 4" :key="o" class="text item">
                                {{'列表内容 ' + o }}
                            </div>
                       </el-card>
                      <el-card class="box-card left">
                            <div v-for="o in 4" :key="o" class="text item">
                                {{'列表内容 ' + o }}
                            </div>
                       </el-card>
                  </div>
                  <div class="item_foot">
                        <div >
                           <span>最少跟投总资金</span>
                           <span>
                               <span style="color:#fc543c;">10.00</span>
                               <span>万元/份</span>
                          </span>
                        </div>
                        <div >
                           <span >总手数</span>
                           <span>
                               <span style="color:#fc543c;">2</span>
                               <span>手/份</span>
                          </span>
                        </div>
                        <div >
                           <span>总年费</span>
                           <span>
                               <span style="color:#fc543c;">100.00</span>
                               <span>元/份</span>
                          </span>
                        </div>
                  </div> 
              </div>            
         </div>

        <div class="strategy_item">
            <h3>交易描述</h3>
            <div class="item_content dec">
                交易描述交易描述交易描述
            </div>            
        </div> 

         <div class="strategy_item">
            <h3>交易品种</h3>
            <div class="item_content types">
                交易描述交易描述交易描述
            </div>            
        </div> 
        <div class="strategy_item">
            <h3>跟投配置</h3>
            <div class="item_content setting">
                    <div class="item_foot">
                        <div class="infos">
                           <span>最大跟投份额</span>
                           <span>
                               <span style="color:#fc543c;">10.00</span>
                               <span>份</span>
                          </span>
                        </div>
                        <div class="infos">
                           <span>份额年费</span>
                           <span>
                               <span style="color:#fc543c;">1000.00</span>
                               <span>元/份</span>
                          </span>
                        </div>
                        <div class="infos">
                           <span>最少跟投资金</span>
                           <span>
                               <span style="color:#fc543c;">56465116.00</span>
                               <span>元/份</span>
                          </span>
                        </div>
                  </div> 
            </div>            
        </div>                             
    </div>
</template>
<script>
export default {
    
}
</script>
<style lang="less">
   .strategy_info{
       padding-left: 18px;
       padding-right: 18px;
       padding-bottom: 35px;
       h2{
           font-size: 18px;
           font-weight: 500;
       }
       .strategy_item{
           margin-top: 10px;
           h3{
               font-size: 16px;
                height: 32px;
                background: #efefef;
                font-weight: 400;
                color: #333;
                line-height: 32px;
                padding-left: 10px;
           }
           .dec{
               padding-left: 25px;
               min-height: 30px;
           }
           .types{
                 padding-left: 25px;
               min-height: 30px;
           }
           .item_content{
               margin-bottom: 20px;
               margin-top: 20px;
               .item_foot{
                   padding-left: 28px;
                  padding-top: 20px;
                   div{
                       height: 27px;
                       margin-bottom: 10px;
                       >span:nth-of-type(1){
                           height: 30px;
                           background: #efefef;
                           width: 120px;
                           display: inline-block;
                           text-align: center;
                           line-height: 27px;
                       }
                       >span:nth-of-type(2){
                              display: inline-block;
                              width: 148px;
                              text-align: right;
                        }
                   }
               }
               .item_card{
                   .el-card__body{
                       padding: 20px 20px 0 20px;
                   }
                   .box-card{
                       width: 22%;
                       box-sizing: border-box;
                       margin-left: 27px;
                      .text{
                           margin-bottom: 20px;
                        
                       }
                       .item1{
                           text-align: center;
                            span{
                                font-size: 18px;
                             
                            }
                            img{
                                position: relative;
                                top: 4px;
                            }
                       }
                      .item2{
                          >span:nth-of-type(1){
                              display: inline-block;
                              width: 85px;
                              color: #666;
                          }
                          >span:nth-of-type(2){
                              display: inline-block;
                              width: 122px;
                              text-align: right;
                          }
                      }
                     .item3{
                          >span:nth-of-type(1){
                              display: inline-block;
                              width: 85px;
                              color: #666;
                          }
                         >span:nth-of-type(2){
                              display: inline-block;
                              width: 122px;
                              text-align: right;
                          }
                      }
                      .item4{
                          >span:nth-of-type(1){
                              display: inline-block;
                              width: 85px;
                              color: #666;
                          }
                           >span:nth-of-type(2){
                               display: inline-block;
                               width: 122px;
                              text-align: right;
                          }
                      }
                   }
               }
           }
           .setting{
               margin-top: 0px;
              .item_foot{
                  .infos{
                      >span:nth-of-type(1){
                          background: #fff;
                          text-align: left;
                      }
                      >span:nth-of-type(2){
                          text-align: left;
                      }
                  }
              }
           }
       }
   }
</style>


