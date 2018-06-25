<template>
    <div>
         <head-top></head-top>
        <section class="container_trader">
            <strate-swiper></strate-swiper>
            <trader-list></trader-list>
        </section>
        <foot-bom></foot-bom>>
    </div>
   
</template>
<script>
import strateSwiper from './strateSwiper'
import headTop from '../../components/headTop'
import footBom from '../../components/footer'
import traderList from '../../components/traderList'
import {getAllForTop} from '../../api/getData'
import message from '../../config/message'
export default {
    data(){
        return{

        }
    },
    components:{
     strateSwiper,
     headTop,
     footBom,
     traderList
    }
}
</script>
<style lang="less">
   
        .container_trader {
            margin-top: 118px;
            border: 0;
            width: 1200px;
            margin: 0 auto;
            padding-top: 20px;
        }
        .container_trader h3 {
            font-size: 20px;
            color: #666;
          
        }
</style>

