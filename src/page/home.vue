<template>
  <div>
    <head-top></head-top>
     <section class="data_section">
        <header class="header_title">
            数据统计
        </header>
        <el-row :gutter="20" style="margin-bottom:10px;">
          <el-col :span="4"><div class="grid-content today_header"> <span>当日数据:</span></div></el-col>
          <el-col :span="4"><div class="grid-content "> <span class="data_num">{{addUser}}</span>新增用户</div></el-col>
          <el-col :span="4"><div class="grid-content "><span class="data_num">{{addOrder}}</span>新增订单</div></el-col>
          <el-col :span="4"><div class="grid-content "><span class="data_num">{{addAdmin}}</span>新增管理员</div></el-col>
        </el-row>
        <el-row :gutter="20" >
          <el-col :span="4"><div class="grid-content sum_header "> <span>总数据:</span></div></el-col>
          <el-col :span="4"><div class="grid-content "> <span class="data_num">{{allUser}}</span>注册用户</div></el-col>
          <el-col :span="4"><div class="grid-content "><span class="data_num">{{allOrder}}</span>订单</div></el-col>
          <el-col :span="4"><div class="grid-content "><span class="data_num">{{allAdmin}}</span>管理员</div></el-col>
        </el-row>
     </section>
  </div>
</template>
<script>
import headTop from '../components/headTop';
import moment from 'moment' ;
import {userCount,orderCount,getUserCount,getOrderCount,adminDayCount,adminCount} from '../api/getData';
export default {
   data(){
     return{
        addUser:null,
        addOrder:null,
        addAdmin:null,
        allUser:null,
        allOrder:null,
        allAdmin:null,
        sevenDate:[]
     }
   },
   components:{
     headTop
   },
   mounted(){
      this.initData();
      for(let i = 6; i > -1;i--){
         const date=moment(new Date().getTime()-86400000* i).format('YYYY-MM-DD');
          this.sevenDate.push(date);
      }
      console.log(this.sevenDate)
   },
   methods:{
      async initData(){
         const today=moment().format('YYYY-MM-DD');
        
         Promise.all([userCount(today),orderCount(today),adminDayCount(today),getUserCount(),getOrderCount(),adminCount()])
         .then(res => {
              this.addUser=res[0].count;
              this.addOrder=res[1].count;
              this.addAdmin=res[2].count;
              this.allUser=res[3].count;
              this.allOrder=res[4].count;
              this.allAdmin=res[5].count;
       
         }).catch(err => {
           console.log(err);
         })
      }
   }
}
</script>
<style lang="less" >
 @import '../style/mixin';
 .data_section{
   padding-top: 20px;
   margin-bottom: 40px;
   padding-left: 20px;
   .today_header{
     background: #ff9800;
   }
   .sum_header{
    background:  #20a0ff;
   }
   .data_num{
     color: #666;
     font-size: 26px;
   }
 }
 .header_title{
   text-align: center;
   font-size: 30px;
   margin-bottom: 10px;
 }
 .grid-content{
    text-align: center;
    font-size: 14px;
    color: #333;
    border-radius: 6px;
    background: #e5e9ef;
    span{
      border-radius: 6px;
      font-size: 22px;
      padding: 4px 0;
      color: #fff;
      display: inline-block;
    }
 }
</style>

