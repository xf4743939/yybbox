<template>
     <div class="template_container">
          <div class="btn_group">
                    <a @click="selectFolow(1)" :class="{active_btn:active==1}">正在跟投</a>
                    <a @click="selectFolow(2)" :class="{active_btn:active==2}">历史跟投</a>
                    <a @click="selectFolow(3)" :class="{active_btn:active==3}">已付费</a>
                    <div class="table_list">
                         <el-table
                                :data="tableData"
                                stripe
                                style="width: 100%">
                                    <el-table-column    
                                    label="交易者"
                                    >   
                                        <template slot-scope="scope">     
                                        <span>组合</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column    
                                    label="市场类型"
                                    >   
                                        <template slot-scope="scope">     
                                        <span>国际市场</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column    
                                    label="跟随类型"
                                    >   
                                        <template slot-scope="scope">     
                                        <span>策略组合</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column    
                                    label="份额"
                                    >   
                                        <template slot-scope="scope">     
                                        <span>2</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column    
                                    label="比例/手数"
                                    >   
                                        <template slot-scope="scope">     
                                        <span>--</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column    
                                    label="跟投方向"
                                    >   
                                        <template slot-scope="scope">     
                                        <span>多</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column    
                                    label="跟投收益"
                                    >   
                                        <template slot-scope="scope">     
                                        <span>4875港币</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column    
                                    label="首次跟随时间"
                                    >   
                                        <template slot-scope="scope">     
                                        <span>2018/05/21</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column    
                                    label="跟投操作"
                                    >   
                                        <template slot-scope="scope">     
                                           <a  @click="handleCancel(scope.$index, scope.row)">取消</a>
                                           <a  @click="handleEdit(scope.$index, scope.row)">编辑</a>
                                        </template>
                                    </el-table-column>
                        </el-table>
                    </div>
          </div>
     </div>
</template>
<script>
import {followStatus} from '../constants/enum'

export default {
   data(){
       return{
          tableData:[],
          active:1
       }
   },
   props:['accountObj'],
   methods:{
      handleEdit(index, row) {
        console.log(index, row);
      },
      handleCancel(index, row) {
        console.log(index, row);
      },
      selectFolow(index){
         this.active=index;
      },
      async getData(status){
          let data={
               "hasNickName": 1,
               "followDirection": 0,
               "rows":10 
          }
          if(status==followStatus.following){
              
          }else if(status==followStatus.followed){

          }else{

          }
      }
   },
   mounted(){
       console.log(this.accountObj)
   }    
}
</script>
<style lang="less">
   .template_container{
       .btn_group{
           .active_btn{
                color: #fff;
                background: #fc543c;
           }
           a{
               padding: 6px 1px;
                display: inline-block;
                text-align: center;
                border-radius: 20px;
                width: 102px;
                cursor: pointer;
           }
       }
   }
</style>


