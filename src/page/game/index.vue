<template>
    <div>
        <head-top></head-top>
        <section class="game_main">
            <div class="game_type">
                <span>国际模拟大赛</span>
                <span class="line"></span>
                <span>国内模拟大赛</span>
            </div>
        <div class="game_nav">
            <el-tabs type="border-card" v-model="active" @tab-click="gameNav" class="trade_navs">
                <el-tab-pane label="大赛首页" name="1">
                    <img src="../../../static/default/gameNum.png" alt="">
                </el-tab-pane>
                <el-tab-pane label="交易规则" name="2">交易规则</el-tab-pane>
                <el-tab-pane label="大赛排名" name="3">
                  大赛排名
                </el-tab-pane>
            </el-tabs>
        </div>
        </section>
        <foot-bom></foot-bom>
    </div>
</template>
<script>
import headTop from '../../components/headTop'
import footBom from '../../components/footer'

import{mapState,mapActions} from 'vuex'

export default {
    data(){
        return{
           active:'1'
        }
    },
    computed:{
       ...mapState(['userInfo'])
    },
    components:{
       headTop,
       footBom,
    },
    methods:{
       gameNav(tab){
           console.log(tab)
       }
      
    },
    mounted(){  
      
     
    }
}
</script>
<style lang="less" >
  .game_main{
      padding-top: 20px;
      margin-left: auto;
      margin-right: auto;
      width: 1200px;
      .el-tabs--border-card{
         >.el-tabs__header{
              .el-tabs__item:not(.is-disabled):hover{
                color: #fc543c;
              }
               .el-tabs__item.is-active{
                   color: #fc543c;
                   border-top: 3px solid #fc543c;
               }
         }
      } 
      .game_type{
          margin-bottom: 10px;
          span:nth-of-type(1){
                font-size: 16px;
                color: #fc543c;
                display: inline-block;
          }
         .line{
                width: 2px;
                background: #dcdfe6;
                height: 19px;
                display: inline-block;
                position: relative;
                top: 4px;
                margin-left: 3px;
                margin-right: 3px;
         } 
         span:nth-of-type(3){
             display: inline-block;
             font-size: 16px;
         }
      }
  }
  
</style>


