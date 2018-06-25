<template>
    <div class="wrap">
        <p class="title">合作伙伴</p>
        <div class="artitle_wrap" v-if="articleList.length">    
            <router-link v-bind:to="'partnerInfo?id='+ item.id " v-bind:key="index" class="imgList" style="margin-top:20px;"   v-for="(item,index) in articleList">
                   <img v-bind:src="item.imageURL" style="width:280px;height:auto;"/>
                   <p style="font-size:16px;">{{ item.title }}</p>
              </router-link>
        </div>
        <div v-else style="padding-left:25px;padding-top:25px;color:#999">
           暂时还没有数据.....
        </div>
    </div>
</template>

<script>
import {getArticleList} from '../../../api/getData'
import message from '../../../config/message'

export default {
    data(){
        return{
              articleList:[],
                page:1,
                num:15 
        }
    },
       methods:{
      async getData(page,num){
          const _that=this;
             let data={
                 "typeId":3,
                "categoryId":2,
                "page":page,
                "rows":num
            };
          
            let res=await getArticleList(data);
            if(res && res.success){
               this.articleList=res.result.items;
            }else{
                message(_that,res)
            }
       }  
    },
    mounted(){
        this.getData(this.page,this.num)
    }
}
</script>
<style lang="less" scoped>
   .wrap{
       width: 960px;
        height: 720px;
        float: left;
        background: #fff;
        margin-left: 20px;
    .title{
        font-size: 15px;
        height: 58px;
        line-height: 58px;
        border-bottom: 1px solid #e6e6e6;
        padding-left: 25px;
    }
    .artitle_wrap{
        padding-left: 25px;
       margin-bottom: 20px;
    
    }
 }
</style>
