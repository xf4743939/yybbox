<template>
     <div class="wrap">
        <p class="title">免责声明</p>
        <div class="artitle_wrap" v-for="(item,index) in articleList">
            <div class="declare_about" v-html="item.contents" >
              
            </div>

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
                "typeId":6,
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
      .declare_about {
        margin-top: 20px;
        p{
                width: 890px;
                margin-left: 10px;
                font-size: 14px;
                line-height: 26px;
        }
      }
    }
 }
</style>

