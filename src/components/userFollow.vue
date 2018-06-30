<template>
     <div class="template_container">
          <div class="btn_group">
                    <a @click="selectFolow(followStatus.following)" :class="{active_btn:active==followStatus.following}">正在被跟投</a>
                    <a @click="selectFolow(followStatus.followed)" :class="{active_btn:active==followStatus.followed}">历史被跟投</a>
                    <a v-if="false" @click="selectFolow(followStatus.vipFollow)" :class="{active_btn:active==followStatus.vipFollow}">已付费</a>
                    <div class="table_list" v-if="followers && isTrader==1" >
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
                                        <span>{{  scope.row.followType==2 ? '实盘跟实盘' : '模拟跟实盘'  }}</span>
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
                    <div class="table_list" v-if="followers && isTrader==0 " >
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
                                        <span>{{ (type==1 || type==3) ? '国际市场' : '国内市场' }}</span>
                                        </template>
                                    </el-table-column>
                                       <el-table-column    
                                    :label="tableField[2]"
                                    >   
                                        <template slot-scope="scope">        
                                        <span>{{  scope.row.followType==2 ? '实盘跟实盘' : '模拟跟实盘'  }}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column    
                                    :label="tableField[3]"
                                    >   
                                        <template slot-scope="scope"> 
                                          <span>--</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column    
                                    :label="tableField[4]"
                                    >   
                                        <template slot-scope="scope"> 
                                          <span v-if="scope.row.followCount>0">{{ scope.row.followCount}}手</span>
                                          <span v-if="scope.row.followPercentage>0">{{ scope.row.followPercentage }}.00倍</span>
                                        </template>
                                    </el-table-column>                        
                                    <el-table-column    
                                    :label="tableField[5]"
                                    >   
                                        <template slot-scope="scope">     
                                        <span>{{ scope.row.followDirection==1 ? '多' : '空' }}</span>
                                        </template>
                                    </el-table-column>
                                      <el-table-column    
                                    :label="tableField[6]"
                                    >   
                                        <template slot-scope="scope">     
                                        <span v-if="!scope.row.followProfit">0</span>
                                        <span v-else>{{ scope.row.followProfit }}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column    
                                    :label="tableField[7]"
                                    >   
                                        <template slot-scope="scope">     
                                        <span>{{ scope.row.creationTime | formatDate}}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                      v-if="active==1"    
                                    :label="tableField[8]"
                                    >   
                                        <template slot-scope="scope">     
                                        <span @click="unFollow(scope.row)" class="operor">取消</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                      v-if="active==2"    
                                    :label="tableField[8]"
                                    >   
                                        <template slot-scope="scope">     
                                        <span>{{ scope.row.lastModificationTime | formatDate}}</span>
                                        </template>
                                    </el-table-column>
                        </el-table>
                    </div>
          </div>
     </div>
</template>
<script>
import {followStatus,tableField} from '../constants/enum'
import {followRelationshipService,unFollowBind} from '../api/getData'
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
       }
   },
   created(){
      this.getTableField()
   },
   props:['type','isTrader','uId'],
   watch:{
      type(newValue,oldValue){
           this.getFollowers(newValue,this.isTrader,1,10)
      }
   },
   methods:{
      getTableField(){
           if(this.isTrader){
          if(this.active==1){
            this.tableField=tableField.traderFollowing
          }else if(this.active==2){
            this.tableField=tableField.traderFollowed
          }
        }else{
           if(this.active==1){
             this.tableField=tableField.userFollowerFollowing
          }else if(this.active==2){
             this.tableField=tableField.userfollowerFollowed
          }
        }
      },
      handleEdit(index, row) {
        console.log(index, row);
      },
     async unFollow(item){
         console.log(item)
         let wh, unType,tarderId
         if(this.type==1){
                wh=1;
                unType=2
         }else if(this.type==2){
                   wh=2;
                unType=2
         }else if(this.type==3){
                 wh=1;
                unType=1
         }else{
                 wh=2;
                unType=1
         }
         if(this.isTrader){
             tarderId=item.followerUserId
         }else{
           tarderId=item.traderUserId
         }
         let data={
               "traderUserId": tarderId,
                "unBingType": unType,
                "worldOrHome": wh
         }
          let res =await unFollowBind(data)
          if(res && res.success){
             message(this,{},'取消跟投成功','success')
             this.getFollowers(this.type,this.isTrader,1,10)
          }else{
             message(this,res)
          }
      },
      selectFolow(index){
        this.active=index;
        this.getTableField();
        this.getFollowers(this.type,this.isTrader,1,10)
      },
      //得到当前用户的跟投者
     async getFollowers(type,isTrader,page,num){
         let data={};
        
        switch(Number(type)){
            case 1:
            if(isTrader){
                    data = {
                    "worldOrHome": 1,
                    "hasNickName": 1,
                    "followDirection": 0, 
                    "isTrader": 1,
                    "followType": 2,
                    "page":page,
                    "rows":num
                }
            }else{
                 data = {
                        "worldOrHome": 1,
                        "hasNickName": 1,
                        "followDirection": 0,
                        "isTrader": 0,
                        "followType": 2,
                         "page":page,
                         "rows":num
                        }
            } 
            break;
            case 2:
            if(isTrader){
                 data = {
                            "worldOrHome": 2,
                            "hasNickName": 1,
                            "followDirection": 0,
                            "isTrader": 1,
                            "followType": 2,
                            "page":page,
                            "rows":num
                        }
            }else{
                 data = {
                            "worldOrHome": 2,
                            "hasNickName": 1,
                            "followDirection": 0,
                            "isTrader": 0,
                            "followType": 2,
                            "page":page,
                            "rows":num
                        }
            }
            break;
            case 3:
            if(isTrader){
                data = {
                        "worldOrHome": 1,
                        "hasNickName": 1,
                        "followDirection": 0,
                        "isTrader": 1,
                        "followType": 1,
                        "page":page,
                         "rows":num
                        }
            }else{
                data = {
                        "worldOrHome": 1,
                        "hasNickName": 1,
                        "followDirection": 0,
                        "isTrader": 0,
                        "followType": 1,
                        "page":page,
                        "rows":num
                        }
            }
            break;
            default:
            if(isTrader){
                    data = {
                            "worldOrHome": 2,
                            "hasNickName": 1,
                            "followDirection": 0,
                            "isTrader": 1,
                            "followType": 1,
                            "page":page,
                            "rows":num
                        }
            }else{
                 data = {
                            "worldOrHome": 2,
                            "hasNickName": 1,
                            "followDirection": 0,
                            "isTrader": 0,
                            "followType": 1,
                             "page":page,
                             "rows":num
                        }
            }

        }
        if(this.active==1){
             data["followRelationshipStatus"] = 1;
        }else if(this.active==2){
           data["followRelationshipStatus"] = 0;
        }
       
        let res = await followRelationshipService(data)
        if(res && res.success){
             if(isTrader){
                this.followers=res.result.filter( x => x.traderUserId==this.uId)
             }else{
                 this.followers=res.result.filter( x => x.followerUserId==this.uId)
             }
             console.log(this.followers)
        }else{
            message(_that,res)
        }
     }
   },
   mounted(){
        this.getFollowers(this.type,this.isTrader,1,10)
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
           .table_list{
               padding-bottom: 35px;
           }
           .operor{
               color: #fc543c;
               display: inline-block;
               cursor: pointer;
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


