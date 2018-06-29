<template>
    <div style="padding:20px;" class="myUser">
        <!-- <div v-if="userList.length">
             <ul>
                 <li v-for="(item,index) in userList" :key="index">{{item.nickName}}</li>
             </ul>
        </div>
        <div v-else>
          还没有推广用户.......
        </div> -->
           <ul>
                 <li v-for="(item,index) in userList" :key="index">{{item.nickName}}</li>
            </ul>
    </div>
</template>
<script>
import {seoUserList} from '../../../api/getData'
import message from '../../../config/message'
export default {
     data(){
         return{
             userList:[]
         }
     },
     methods:{
       async seoUserList(){
           let res=await seoUserList()
           if(res && res.success){
              this.userList=res.result
            
           }else{
               message(this,res)
           }
       }
     },
     mounted(){
        this.seoUserList()   
     }
}
</script>
<style lang="less">
.myUser{
 ul{
       li:nth-child(odd){
           background: #efefef;
       }
   }
}
  
</style>

