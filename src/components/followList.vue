<template>
     <div class="template_container">
          <div class="btn_group">
                    <a @click="selectFolow(1)" :class="{active_btn:relationStatus==1}">正在跟投</a>
                    <a @click="selectFolow(2)" :class="{active_btn:relationStatus==2}">历史跟投</a>
                    <a @click="selectFolow(3)" :class="{active_btn:relationStatus==3}">已付费</a>
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
import {followStatus,tableField} from '../constants/enum'
import {followRelationshipService} from '../api/getData'
import message from '../config/message'
export default {
   data(){
       return{
          tableData:[],
          active:1,
          isShow:true,
          tableField:tableField,//表格字段
          followers:[],
       }
   },
   props:['followOptions','relationStatus'],
   methods:{
      handleEdit(index, row) {
        console.log(index, row);
      },
      handleCancel(index, row) {
        console.log(index, row);
      },
      selectFolow(index){
         this.$emit('handleStatus',index)
          
      },
      async getData(){
          debugger
         let res= await followRelationshipService(this.followOptions);
         debugger;
         if(res && res.success){
              this.followers=res.result;
         }else{
             message(this,res)
         }
      }
   },
   mounted(){
      this.getData()
   }    
}
</script>
<style lang="less">
   .template_container{
       padding-left: 20px;
       padding-right: 20px;
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


