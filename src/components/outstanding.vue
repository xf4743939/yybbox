<template>
   <div class="netValue_container">
       <div class="btns">
          <el-button :class="active===1? 'active':'' " @click="nav(1)">总业绩</el-button>
          <el-button :class="active===2? 'active': '' " @click="nav(2)">跟投业绩</el-button>  
       </div>
       <div class="img" id="myechart" style="width:500px;height:300px;">
              
       </div>
       <div class="infos">
           <ul class="clear" v-if="strateInfo">
               <li>
                   <p>交易总手数</p>
                   <p>盈利手数</p>
               </li>
               <li>
                   <p>{{ strateInfo.qty }}手</p>
                   <p>{{ (strateInfo.qty*strateInfo.winRate)/100}}  手</p>
               </li>
               <li>
                   <p>胜率</p>
                   <p>盈亏手数</p>
               </li>
               <li>
                   <p>{{ strateInfo.winRate.toFixed(2) + '%' }}</p>
                   <p>{{ strateInfo.qty- (strateInfo.qty*strateInfo.winRate)/100 }}手</p>
               </li>
               <li>
                   <p>净值</p>
                   <p>总收益率</p>
               </li>
               <li>
                   <p>0</p>
                   <p>{{ strateInfo.profitProbability.toFixed(2) + '%' }}</p>
               </li>
               <li>
                   <p>当前本金</p>
                   <p>交易周期</p>
               </li>
               <li>
                   <p>0</p>
                   <p>0周</p>
               </li>
               <li>
                   <p>收益回撤比</p>
                   <p>夏普比率</p>
               </li>
               <li>
                   <p>0%</p>
                   <p>0%</p>
               </li>
               <li>
                   <p>回撤率</p>
                   <p>年化收益</p>
               </li>
               <li>
                   <p>0%</p>
                   <p>0万元</p>
               </li>
           </ul>
       </div>
   </div>
</template>

<script>
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/bar';
import 'echarts/lib/chart/line';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/toolbox';
import 'echarts/lib/component/markPoint';
import 'echarts/lib/component/tooltip'

export default {
   data(){
       return{
              charts:'',
              active:1,
              navLine:null,//净值图数据对象
              strateInfo:null, //策略信息

       }
   },
   props:['groupStrateInfo'],
   methods:{
       nav(index){
         this.active=index;
       },
        drawLine(id,item){
     
            this.charts=echarts.init(document.getElementById(id))
          
            this.charts.setOption({
            title:{
              text:'净值图',
              textStyle:{
                  fontWeight:'normal'
              }
            },
            grid:{
               show:false
            },     
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data:item.lineX.length ? item.lineX:['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                show:true,
                axisLine:{
                    show:false,       
                },
                axisTick:{
                     show:false
                 },
                 axisLabel:{
                     padding:[0,0,0,15]
                 }       
            },
            yAxis: {
                 type: 'value',
                 show:true,
                 axisLine:{
                    show:false
                 },
                 axisTick:{
                     show:false
                 },
                 axisLabel:{
                     margin:10
                 },
            },
            series: [{
                data:item.lineY.length ? item.lineY : [820, 932, 901, 934, 1290, 1330, 1320],
                type: 'line',
                symbolSize:7,
               
                // smooth:true,
                symbol: 'emptyCircle',
                areaStyle: {
                  normal: {
                    color:'#FFF9F0'
                  }
                },
                itemStyle: {
                  normal: {
                    color: '#FFC77D'
                 }
               },
            }]
         })
       },
       initData(){
           this.navLine=this.groupStrateInfo.navLine,
           this.strateInfo=this.groupStrateInfo
            this.$nextTick(function(){
                this.drawLine('myechart',this.navLine)
          })
       }
    
   },
   mounted(){
         this.initData()      
   }
}
</script>

<style lang="less">
  .netValue_container{
      padding-left: 25px;
      padding-right: 25px;
      padding-bottom: 50px;
      .btns{
          .el-button{
               padding: 6px 18px;
                // background: #fc543c;
                // color: #fff;
                border-radius: 16px;
                width: 85px;
                border:0;
          }
          .el-button:nth-of-type(2){
              width: 95px;
          }
          .active{
              color: #fff;
              background: #fc543c;
          }
      }
      .infos{
          li{
              float: left;
              box-sizing: border-box;
              width: 8.3%;
              padding-top: 20px;
              padding-bottom: 20px;
              p{
                    color: #666;
                   text-align: center;
              }
              p:nth-child(1){
                  margin-bottom: 20px;
              }
          }
          li:nth-child(odd){
              background: #F5F5F5;
             
          }
            li:nth-child(even){
             p{
                 padding-left: 3px;
                 padding-right: 3px;
                 width: 95px;
                 overflow: hidden;
                //  white-space: nowrap;
                 text-overflow: ellipsis;
             }
             
          }
      }
  }
  #myechart{
      margin-left: 330px;
      margin-top: 5px;
      margin-bottom: 15px;
  }
</style>


