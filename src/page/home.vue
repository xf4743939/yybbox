<template>
  <div>
    <head-top></head-top>
     <section class="body-main">
        <div class="piclist big">
            <swiper ref="mySwiper">
                 <swiper-slide :options="swiperOption" v-for="(item,index) in swiperSlides" :key="item.id" >
                      <a  style="display:block;">
                         <img :src="'http://follow.yybbox.com' + item.imageURL " height="100%;"/>                      
                      </a>
                 </swiper-slide>
                 <div class="swiper-pagination" slot="pagination"></div>
            </swiper>
        </div>
        <div class="index-main g">
   
            <div class="gl">
                  <div class="gl1">
                      <p style="font-size: 18px; color: #3F3A39;" href="">收益排行榜</p>
                      <ul class="menu">
                          <li v-bind:class="{activeHome:active==1}" v-on:click="showWorldOrHome(1)"><a v-bind:class="{activeA:active==1}" href="javascript:;">国际期货</a></li>
                          <li v-bind:class="{activeHome:active==2}" v-on:click="showWorldOrHome(2)"><a v-bind:class="{activeA:active==2}" href="javascript:;">国内期货</a></li>
                      </ul>

                  </div>
                  <div class="profit_table">
                      <el-table v-bind:data="userTraderPofit"
                                stripe
                                style="width: 100%"
                                v-loading="isLoading"
                                element-loading-text="加载中"
                                element-loading-spinner="el-icon-loading"
                                element-loading-background="rgba(0, 0, 0, 0.7)">
                          <el-table-column
                              label="基本信息"
                              width="180">
                              <template slot-scope="scope">
                                  <a style="display: block;" v-bind:href="scope.row.bcaType==8 ||scope.row.bcaType==4 ? '/Trade/TFDetails/' + scope.row.id + '-1-True' : '/Trade/TFDetails/' +scope.row.id + '-1-Flase' ">
                                      <img v-bind:src="scope.row.icon!=null ? 'http://follow.yybbox.com' + scope.row.icon : '/Contents/images/default/30x30.png' "/>
                                      <span class="nickname" >{{ scope.row.nickname }}</span>
                                  </a>
                                  <span v-bind:style="{color:(scope.row.bcaType==4 || scope.row.bcaType==8 ) ? '#f43f4b' : '#35ABEC' }" class="traderOrfollow">{{ (scope.row.bcaType==4 || scope.row.bcaType==8 ) ? "交易者" : "跟随者" }}</span>
                              </template>
                          </el-table-column>
                          <el-table-column prop="tradeQty"
                                          label="交易总手数"
                                          width="180">
                          </el-table-column>
                          <el-table-column prop="totalPlusProfitQty"
                                          label="盈利手数">
                          </el-table-column>
                          <el-table-column prop="totalMinusProfitQty"
                                          label="亏损手数"
                                          width="180">
                          </el-table-column>
                          <el-table-column
                              label="交易胜率"
                              width="180">
                              <template slot-scope="scope">
                                  <span  v-if="(scope.row.totalPlusProfitQty + scope.row.totalMinusProfitQty)">{{ (Math.round(scope.row.totalPlusProfitQty/(scope.row.totalPlusProfitQty + scope.row.totalMinusProfitQty))*100).toFixed(2) + "%" }}</span>
                                  <span v-else>{{ (Math.round(scope.row.totalPlusProfitQty/1)*100).toFixed(2) + "%" }}</span>
                              </template>
                          </el-table-column>
                          <el-table-column prop="weekNum"
                                          label="交易周期">
                          </el-table-column>
                          <el-table-column prop="totalProfit"
                                          label="总盈利">
                          </el-table-column>
                      </el-table>
                  </div>
                  <div class="profit_page">
                      <el-pagination
                          background
                          layout="prev, pager, next"
                          v-bind:total="totalNum"
                          v-on:prev-click="handlePrev"
                          v-on:next-click="handleNext"
                          v-on:current-change="handleCurrentPage">
                          
                      </el-pagination>
                  </div>
            </div>
        </div>
     </section>
       <foot-bom></foot-bom>
  </div>

</template>
<script>
import headTop from '../components/headTop';
import footBom from '../components/footer';
import {swiper,swiperSlide} from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.min.css'
import moment from 'moment' ;
import {getSwipers,getTraderForProfitSortList} from '../api/getData';
import message from '../config/message';
 import {mapState,mapActions, mapMutations} from 'vuex'
export default {
   name:'carrousel',
   data(){
     return{
        swiperOption:{
           spaceBetween:30,
           autoplay:true,    
           speed:500,
           loop:true,
           pagination:{
             el:'.swiper-pagination',
             dynamicBullets:true,
             clickable:true
           }          
        },
        swiperSlides:[],
        active:1,
        totalNum:0,
        isLoading:true,
        userTraderPofit:[], //交易榜交易者
        isShow:true,

     }
   },
   components:{
     headTop,
     footBom,
     swiper,
     swiperSlide
   },
   computed:{
       swiper(){
         return this.$refs.mySwiper.swiper;
       },
    
   },
   methods:{
  
     async getBanner(){
         const _that=this;
         let data={
           "categoryId": 6,
            "page": 1,
            "rows": 10
         }    
         let res=await getSwipers(data);
         if(res.success){
            this.swiperSlides=res.result.items;
         }else{  
            
           message(_that,res);
         }     
     },
    async showWorldOrHome(index,page){
              this.active = index;
               const _that = this;
                _that.isLoading = true;
                setTimeout(function () {
                    _that.isLoading = false;
                }, 1000);
                let data= {
                    "worldOrHome":index,
                    "page": page,
                    "rows":10
                } 
                let res=await getTraderForProfitSortList(data);           
                if(res.success){
                     _that.userTraderPofit = res.result.items;
                     _that.totalNum = res.result.totalCount;
                }else{
                
                    message(_that,res);
                }   
     },
     handleCurrentPage(val){
        const _that=this;
        this.showWorldOrHome(_that.active,val)
     },
     handlePrev(val){
        const _that=this;
        this.showWorldOrHome(_that.active,val)
     },
     handleNext(val){
       const _that=this;
       this.showWorldOrHome(_that.active,val)
     }
    
   },
   mounted(){
     this.getBanner();
     this.showWorldOrHome(1,1);    
   }
}
</script>
<style lang="less" >
 .swiper-container {
      width: 100%;
      height: 100%;

    }
    .swiper-slide {
      text-align: center;
      font-size: 18px;
      background: #fff;
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
.body-main{
  margin-top: 118px;
  width: 100%;
  border: 0;
  .piclist{
    width: 100%;
    height: 450px;
    overflow: hidden;
    min-width:1200px;
  }
} 
.index-main.g {
    width: 1200px;
    margin: 0 auto;
    margin-top: 30px;
    overflow: hidden;
    .gl{
      width: 100%;
      .gl1{
        overflow: hidden;
          .menu{
          margin-top: 6px;
        }
        .activeHome{
          background: #fff;
          border-color: #FC5751;
          color: #FD8884;
        }
        li{
          float: left;
          width: 100px;
          text-align: center;
          padding: 5px 0px;
          box-sizing: border-box;
          -moz-box-sizing: border-box;
          -webkit-box-sizing: border-box;
          height: 37px;
          border-width: 3px 0 0 0;
          border-style: solid;
          border-color: #f5f5f5;
          a{
            color: #8F8F8F;
            font-size: 16px;
          }
          .activeA{
            color: #FD8884;
          }
       }
      
      }
    }
    .profit_table {
       min-height: 700px;
       .traderOrfollow {
          font-size: 12px;
        display: inline-block;
        margin-left: 10px;
     }
       .nickname{
           color: #333;
          display: inline-block;
          font-size: 14px;
          margin-left: 11px;
       }
       a{
         img{
             margin-top: 10px;
              width: 30px;
              float: left;
              border-radius: 50%;
              margin-left: 6px;
              height: 30px;
              display: block;
         }
       }
    }
    .profit_page {
      text-align: center;
      margin-top: 25px;
    }
}
 .profit_page .el-pagination.is-background .el-pager li:not(.disabled).active {
     background: #FC534C;
   
 }
  
 .menu:after {
     clear: both;
     content: '';
     display: block;
     width: 0;
     height: 0;
     visibility: hidden
 }
 
</style>

