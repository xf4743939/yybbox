<template>
    <div>
         <head-top></head-top>
        <section class="container_trader">
            <follower-list></follower-list>
        </section>
        <foot-bom></foot-bom>>
    </div>
   
</template>
<script>
import headTop from '../../components/headTop'
import footBom from '../../components/footer'

import followerList from '../../components/followerList'
export default {
    data(){
        return{

        }
    },
    components:{
     headTop,
     footBom,
     followerList
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

