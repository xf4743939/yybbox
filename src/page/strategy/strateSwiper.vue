<template>
        <div class="stragegy_wrap">
            <h3>推荐策略</h3>
            <div class="item-swiper">
                <local-swiper ref="awesomeSwiperB" v-bind:options="swiperOption">
                    <local-slide v-for="i in 8" :key="i" style="height: 200px;">I'm Slide {{ i }}</local-slide>
                    <div class="swiper-pagination" slot="pagination"></div>
                <div class="swiper-button-prev" slot="button-prev"></div>
                    <div class="swiper-button-next" slot="button-next"></div>
                </local-swiper>          
             </div>
        </div>
</template>
<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper';
require('swiper/dist/css/swiper.css')  
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
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev'
                }           
            }
        }
    },
    components:{
         LocalSwiper: swiper,  
         LocalSlide:swiperSlide
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
</style>

