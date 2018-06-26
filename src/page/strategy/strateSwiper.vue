<template>
        <div class="stragegy_wrap">
            <h3>推荐策略</h3>
            <div class="item-swiper">
                <local-swiper ref="awesomeSwiperB" v-bind:options="swiperOption">
                    <local-slide v-for="item in strategys" :key="item.id">
                         <div class="strategy">
                             <div class="strategy_top clear">
                                  <p style="height:35px;line-height:35px;background:#fc543c;color:#fff;">{{ item.name }}</p>
                             </div>
                             <div class="strategy_middle clear">
                                 <div :id="item.id" class="left" style="width:220px;height:150px;">

                                 </div>
                                 <div class="strategy_info left">
                                        <div>
                                            <p style="color:#999;margin-bottom:2px;">收益率</p>
                                            <p style="color:#fc543c;max-width:100%;height:18px;overflow:hidden;">{{ item.profitProbability.toFixed(2) + "%" }}</p>
                                           
                                        </div> 
                                        <div style="margin-top:10px;">
                                            <p style="color:#999;margin-bottom:2px;">策略资金</p>
                                            <p v-if="item.wh==1" style="font-weight:bold;max-width:100%;height:18px;overflow:hidden;">{{ item.leastMoneyLine*exchangeRate/10000 | toDecimal }}万元</p>
                                            <p v-if="item.wh==2" style="font-weight:bold;max-width:100%;height:18px;overflow:hidden;">{{ item.leastMoneyLine/10000 | toDecimal }}万元</p>
                                        </div>     
                                 </div>
                             </div>
                             <div class="strategy_foot">
                                 <div class="descript" v-if="item.description">
                                     <span>描述:</span>
                                     <span>{{ item.description }}</span>
                                 </div>
                        
                                 <div class="trade_num clear">
                                     <span class="left" style="margin-right:3px;">份额数</span>
                                     <div class="left" style="width:80%;height:15px;">
                                        <el-progress  :text-inside="true" :stroke-width="12" :percentage="getPercen(item)" status="exception"></el-progress>
                                     </div>
                                     <span class="per">{{ item.qty }}</span>
                                 </div>
                             </div>
                         </div>    
                    </local-slide>
                    <div class="swiper-pagination" slot="pagination"></div>
                </local-swiper>          
             </div>
        </div>
</template>
<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper';
require('swiper/dist/css/swiper.css')  
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/bar';
import 'echarts/lib/chart/line';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/toolbox';
import 'echarts/lib/component/markPoint';
import 'echarts/lib/component/tooltip'
import {getAllForTop,getAllexchangeRate} from '../../api/getData'
import message from '../../config/message'

export default {
    data(){
        return{
             swiperOption: {
                slidesPerView:3,
                spaceBetween:50,
                pagination: {
                    el: '.swiper-pagination',
                    dynamicBullets: true
                },
                  
            },
            strategys:[],
            worldOrHome:1,
            totalCount:0,
            avatorUrl:'../../../static/default/30x30.png',
            tradeUrl:'../../../static/default/trade.png',
            charts:'',
            exchangeRate:0, //港币兑人民币汇率
           
        }
    },
    created(){
      this.getAllexchangeRate()
    },
    components:{
         LocalSwiper: swiper,  
         LocalSlide:swiperSlide
    },
    methods:{
        //已用的份额数
        getPercen(item){
            //qty 总份额 havingQty 剩余份额
           let num=item.qty-item.havingQty;
           return  Number((num/item.qty)*100);
        },
       async getAllexchangeRate(){
           let res= await getAllexchangeRate()
           if(res && res.success){
               this.exchangeRate=res.result[2].moneyValue
           }else{
               message(this,res)
           }
       }, 
       async getAllForTop(wh){   
           const _that=this;
           let res=await getAllForTop(wh)   
           if (res && res.success){
               this.strategys=res.result.items;
               this.totalCount=res.result.totalCount;
               this.strategys.forEach( item => {
                    this.$nextTick(function(){
                        this.drawLine(item.id,item)
                    })
               })        
           }else{
               message(this,res)
           }
       },
       drawLine(id,item){
    
            this.charts=echarts.init(document.getElementById(id))
            this.charts.setOption({
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data:item.profitLine.lineX,
                show:false
            },
            yAxis: {
                 type: 'value',
                 show:false,         
            },
            series: [{
                data:item.profitLine.lineY,
                type: 'line',
                smooth:true,
                symbol: 'none',
                areaStyle: {
                  normal: {
                    color:'rgb(255,219,222)'
                  }
                },
                itemStyle: {
                  normal: {
                    color: '#fc543c'
                 }
               },
            }]
         })
       }
    },
    mounted(){
       this.getAllForTop(1);
    }
}
</script>
<style lang="less">
     .swiper-container {
            width: 100%;
            height: 100%;
        }
        .swiper-slide {
            text-align: center;
            font-size: 18px;
            background: #fff;

            /* Center slide text vertically */
            display: -webkit-box;
            display: -ms-flexbox;
            display: -webkit-flex;
            display: flex;
            -webkit-box-pack: center;
            -ms-flex-pack: center;
            -webkit-justify-content: center;
            justify-content: center;
            -webkit-box-align: center;
            -ms-flex-align: center;
            -webkit-align-items: center;
            align-items: center;
        }
      .item-swiper {
          width: 1100px;
          margin-left: 50px;
          .swiper-pagination {
              position: absolute;
              bottom: 0;
          }
          .swiper-pagination-bullet-active{
              background: #fc543c;
          }
      }
      .strategy{
          padding-bottom: 20px;
          width: 100%;
          .strategy_info{
            width: 110px;
            text-align: left;
            margin-top: 20px;
          }
          .strategy_top{
                height: 35px;      
                border-bottom: 1px solid #e4e4e4;
            >div:nth-last-of-type(2){
                 margin-left:20px;
                    margin-right: 30px;
                 p{
                     width: 180px;
                     text-align: left;
                     height: 19px;
                     span{
                        min-width: 30px;
                        display: inline-block;
                        max-width: 120px;
                        overflow: hidden;
                        height: 20px;
                        white-space: nowrap;
                        text-overflow: ellipsis; 
                     }
                     img{
                         display: inline-block;
                        margin-left: 3px;
                        position: relative;
                        top: -2px;
                     }
                 }
                 p:nth-of-type(2){
                     color: #666;
                  
                 }
            }
           
          }
          .strategy_foot{
              text-align: left;
              position: relative;
              top:-20px;
              .descript{
                  span:nth-of-type(1){
                     margin-left: 10px;
                    display: inline-block;
                    position: relative;
                    top: -23px;
                  }
                  span:nth-of-type(2){
                         display: inline-block;
                        width: 285px;
                        height: 36px;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        word-break: break-all;
                        color: #666;
                  }
              }
              .trader_type{
                  margin-top: 10px;
                  span:nth-of-type(1){
                      margin-left: 10px;
                  }
                  span:nth-of-type(2){
                      max-width: 280px;
                      overflow: hidden;
                      height:19px;
                      white-space: nowrap;
                      text-overflow: ellipsis;
                  }
              }
                .trade_num{
                  margin-top: 10px;
                  position: relative;
                  .el-progress-bar__innerText{
                      margin-top: -5px;
                  }
                  .per{
                      position: absolute;
                      top: -15px;
                      right: 15px;
                  }
                  span:nth-of-type(1){
                      margin-left: 10px;
                  }
                  span:nth-of-type(2){
                      max-width: 280px;
                    //   overflow: hidden;
                    //   height:19px;
                    //   white-space: nowrap;
                    //   text-overflow: ellipsis;
                  }
              }
          }
          .share_btn{
              display: inline-block;
              img{
                  display: inline-block;
                  width: 30px;
                  height: 30px;
              }
          }
      }
</style>

