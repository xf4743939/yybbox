<template>
    <div>
        <head-top></head-top>
        <section class="game_main">
            <div class="game_type">
                <span @click="match(1)" :style="{color:worldOrHome===1? '#fc543c': '#666'} ">国际模拟大赛</span>
                <span class="line"></span>
                <span @click="match(2)" :style="{color:worldOrHome===2? '#fc543c': '#666'} ">国内模拟大赛</span>
            </div>
            <transition>
                <router-view></router-view>
            </transition>
        </section>
        <foot-bom></foot-bom>
    </div>
</template>
<script>
import headTop from '../../components/headTop'
import footBom from '../../components/footer'
import {getGameCycle,getMatchResult} from '../../api/getData'
import{mapState,mapActions} from 'vuex'
import message from '../../config/message'
export default {
    data(){
        return{
           worldOrHome:1
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
         match(index){
             this.worldOrHome=index;
          if(index==1){
            this.$router.push({
                path:'/game/world'
            })
          }else{
            this.$router.push({
                path:'/game/home'
            }) 
          }
       },  
    },
    mounted(){  
      let url=this.$route.path.substring(this.$route.path.lastIndexOf('/')+1)
      if(!url) return;
      if(url=='home'){
          this.worldOrHome=2
      }else if('world'==url){
          this.worldOrHome==1
      }
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
      .game_nav{
          .rules{
              margin-bottom: 25px;
              h3{
                  font-size: 16px;
                  margin-bottom: 8px;
                
              }
              p{
                  color: #666;
                  margin-bottom: 8px;
              }
              .text{
                  padding-left: 20px;
              }
          }
      }
      .game_type{
          margin-bottom: 10px;
          span:nth-of-type(1){
                font-size: 16px;
                color: #fc543c;
                display: inline-block;
                cursor: pointer;
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
             cursor: pointer;
         }
      }
  }
  .table_rank{
      min-height:600px;
      margin-top: 20px;
      .el-table__header{
          tr{
              th{
                  background: #fc543c;
                  color: #fff;
              }
          }
      }
       td,th{
           padding: 8px 0;
       }
  }
  
</style>


