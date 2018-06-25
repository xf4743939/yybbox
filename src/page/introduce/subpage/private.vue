<template>
     <div class="wrap">
        <p class="title">隐私政策</p>
        <div v-if="articleList.length">
             <div class="artitle_wrap" v-for="(item,index) in articleList">
                <div class="content_about" v-html="item.contents"  >
                
                </div>    
             </div>
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
                 "typeId":4,
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
<style lang="less" >
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
        .content_about {
            margin-top: 20px;
            width: 890px;
            margin-left: 10px;
            font-size: 14px;
            line-height: 40px;
            p:nth-of-type(1) {
             text-indent: 28px;
           }
           p{             
                margin-left: 10px;
                font-size: 14px;
                line-height: 26px;
                margin-top: 30px;
           }
           p:nth-of-type(6) {
             margin-top: 0px;
          }
           p:nth-of-type(7) {
             margin-top: 0px;
          }
      }   
    }
 }
</style>

