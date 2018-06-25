<template>
     <div class="wrap">
        <p class="title">常见问题</p>
        <div v-if="articleList.length">
              <ul>
                <li  v-for="(item,index) in articleList " v-bind:key="item.id">
                    <router-link style="width:100%;" v-bind:to="'problemDetail?id='+ item.id ">
                        <span class="text2">{{ item.title }}</span>
                        <span style="float:right;display:block;color:#ccc;font-size:20px;">》</span>
                    </router-link>
                </li>
            </ul>
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
                "typeId":8,
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
   ul{
       height: 610px;
        overflow: hidden;
        overflow-y: auto;
        li{
            height: 44px;
            margin-bottom: 1px;
            color: #333;
            width: 900px;
            margin-left: 40px;
            line-height: 44px;
            a{
                overflow: auto;
                display: inline-block;
                border-bottom: 1px solid #e6e6e6;
                span{
                    display: inline-block;
                    height: 100%;
                    line-height: 44px;
                    color: #666;
                }
                .span:nth-of-type(1){
                        width: 740px;
                        height: 44px;
                        overflow: hidden;
                        float: left;
                        color: #333;
                }
            }
        }
   }
 }
</style>

