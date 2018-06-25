<template>
    <div class="wrap">
      <p class="title">
       <router-link to="/introduce/service">服务协议</router-link><span v-if="article">>{{article.title}}</span>
       </p>
         <div v-if="!article" style="padding-left:25px;padding-top:25px;color:#999">
          暂时还没有数据.....
       </div>            
       <div v-else>
                   <div class="artitle_wrap newMan" v-if="article && article.contents">
                           <div class="article-container" v-html="article.contents"></div>
                      
                    </div>
       </div>
      </div>
</template>
<script>
import {getArticleById} from '../../../api/getData'
import message from '../../../config/message'

export default {
    data(){
        return{
                article:'',
        }
    },
    methods:{
      async getData(){
            const _that=this;
              let id=this.$route.query.id;
              if(!id) return;
            let res=await getArticleById(id);   
            if(res && res.success){
               this.article=res.result;
            }else{
                message(_that,res)
            }
       }  
    },
    mounted(){
        this.getData()
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
        a{
            font-size: 15px;
            width: 920px;
            height: 58px;
            margin: 0 auto;
            line-height: 58px;
            border-bottom: 1px solid #e6e6e6;
            color: #333;
        }
        span{
            font-size: 16px;
        }
    }
    .newMan {
        width: 900px;
        overflow: hidden;
        height: 661px;
        overflow-x: hidden;
        margin: 0 auto;
        .article-container {
            width: 920px;
            overflow: auto;
            height: 661px;
       }
    }
 }
</style>

