<template>
     <div class="template_container">
          <div class="btn_group">
                    <a @click="selectFolow(followStatus.following)" :class="{active_btn:active==followStatus.following}">正在被跟投</a>
                    <a @click="selectFolow(followStatus.followed)" :class="{active_btn:active==followStatus.followed}">历史被跟投</a>
                    <a @click="selectFolow(followStatus.vipFollow)" :class="{active_btn:active==followStatus.vipFollow}">已付费</a>
                    <div class="table_list" v-if="followers">
                         <el-table
                                :data="followers"
                                stripe
                                style="width: 100%">
                                    <el-table-column    
                                    :label="tableField[0]"
                                    >   
                                        <template slot-scope="scope">     
                                        <span>{{ scope.row.nickName}}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column    
                                    :label="tableField[1]"
                                    >   
                                        <template slot-scope="scope">     
                                        <span>{{  scope.row.followType==2 ? '实盘跟随中' : '模拟跟随中'  }}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column    
                                    :label="tableField[2]"
                                    >   
                                        <template slot-scope="scope">     
                                        <span v-if="scope.row.followCount">{{ scope.row.followCount }}手</span>
                                        <span v-if="scope.row.followPercentage">{{ scope.row.followPercentage }}.00倍</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column    
                                    :label="tableField[3]"
                                    >   
                                        <template slot-scope="scope">     
                                        <span>{{ scope.row.followDirection==1 ? '多' : '空' }}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column    
                                    :label="tableField[4]"
                                    >   
                                        <template slot-scope="scope">     
                                        <span v-if="!scope.row.followProfit">0</span>
                                        <span v-else>{{ scope.row.followProfit }}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column    
                                    :label="tableField[5]"
                                    >   
                                        <template slot-scope="scope">     
                                        <span>{{ scope.row.creationTime | formatDate}}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column    
                                    :label="tableField[6]"
                                    >   
                                        <template slot-scope="scope">     
                                        <span>100</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column    
                                    :label="tableField[7]"
                                    >   
                                        <template slot-scope="scope">     
                                        <span v-if="!scope.row.lastModificationTime">未变更</span>
                                        <span v-else>变更</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                    v-if="!isTrader"    
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
import moment from 'moment'
export default {
   data(){
       return{
          tableData:[],
          active:1,
          isShow:true,
          followStatus:followStatus,
          tableField:[],//表格字段
          followers:[],
          copyFollowers:[]
       }
   },
   created(){
       this.followers=this.userInfoForTrader.followerList
       this.copyFollowers=this.userInfoForTrader.followerList

   },
   props:['userInfoForTrader','isTrader'],
   methods:{
      handleEdit(index, row) {
        console.log(index, row);
      },
      handleCancel(index, row) {
        console.log(index, row);
      },
      selectFolow(index){
        this.active=index;
        if(index==this.followStatus.following){
           this.followers=this.copyFollowers.filter(x=>x.relationshipStatus>0)      
        }else if(index==this.followStatus.followed){
           this.followers=this.copyFollowers.filter(x=>x.relationshipStatus==0) 
        }else{

        }
      },
   
   },
   mounted(){
       this.tableField=tableField.traderFollowing;
       
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


