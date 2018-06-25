<template>
        <div class="stragegy_wrap">
            <h3>推荐策略</h3>
            <div class="item-swiper">
                <local-swiper ref="awesomeSwiperB" v-bind:options="swiperOption">
                    <local-slide v-for="i in 8" :key="i">
                         <div class="strategy">
                             <div class="strategy_top clear">
                                  <p style="height:35px;line-height:35px;background:#fc543c;color:#fff;">恒指</p>
                             </div>
                             <div class="strategy_middle clear">
                                
                             </div>
                             <div class="strategy_foot">
                                 <div class="descript">
                                     <span>描述:</span>
                                     <span>2dsfkdsjf sf sajkgh ghagkl asgdglaksdfgaglkag kasdgasglka gag asglfg6fg4agfasdfh ka</span>
                                 </div>
                                 <div class="trader_type">
                                     <span>主要交易品种:</span>
                                     <span>恒指003</span>
                                 </div>
                                 <div class="trade_num">
                                     <span>份额数</span>
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
import {getAllForTop} from '../../api/getData'
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
            tradeUrl:'../../../static/default/trade.png'
        }
    },
    components:{
         LocalSwiper: swiper,  
         LocalSlide:swiperSlide
    },
    methods:{
       async getAllForTop(wh){
           let res=await getAllForTop(wh)   
           if (res && res.success){
               this.strategys=res.result.items;
               console.log(this.strategys)
               this.totalCount=res.result.totalCount;
           }else{
               message(this,res)
           }
       }
    },
    mounted(){
       this.getAllForTop(1)
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
      }
      .strategy{
          padding-bottom: 20px;
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
              .descript{
                  span:nth-of-type(1){
                      margin-left: 10px;
                  }
                  span:nth-of-type(2){
                      display: inline-block;
                      width: 285px;
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

