<template>
    <div class="wrap">
      <p class="title">
       <router-link to="/introduce/placard">网站公告</router-link></p>
                    <div class="artitle_wrap">
                        <h1 class="title title_border">网站公告</h1>
                        <p class="artitle_content" v-if="article && article.contents">
                             {{ article.contents.replace(/<[^>]+>/g,"") }}
                            <span>
                              {{ article.creationTime | formatDate }}
                            </span>
                        </p>

                    </div>
      </div>
</template>
<script>
import {getArticleById} from '../../../api/getData'
import message from '../../../config/message'
export default {
    data(){
        return{
            article:null
        }
    },
    methods:{
       async getData(){
           const _that=this;
           let id=this.$route.query.id
           let res= await getArticleById(id)
           if(res && res.success){
              this.article=res.result
           }else{
             message(_that,res)
           }
        }
    },
    mounted(){
        this.getData();
    }
}
</script>
<style lang="less" scoped>
  .wrap {
        width: 960px;
        height: 720px;
        float: left;
        background: #fff;
        margin-left: 20px;
   .title {
       a{
         font-size: 15px;
        height: 58px;
        line-height: 58px;
        border-bottom: 1px solid #e6e6e6;
        padding-left: 25px;
        display: block;
        color: #333;
       }
 
  }
  .artitle_wrap {
    width: 920px;
    margin: 0 auto;
     .title_border{
         border: 0;
     }
    h1{
        font-size: 18px;
        text-align: center;
        margin: 20px auto 10px;
        font-weight: 400
    }
  }
  .artitle_content {
    width: 900px;
    margin: 0 auto;
    text-indent: 24px;
    font-size: 15px;
    line-height: 30px;
    height: 560px;
    overflow: hidden;
    overflow-y: auto;
    color: #666;
    span{
        float: right;
        margin-top: 80px;
        margin-right: 10px;
        font-size: 15px;
    }
}
}
</style>

