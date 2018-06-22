<template>
    <div class="wrap">
         <p class="title">
           网站公告
        </p>
          <ul>
              <li>
                  <router-link style="width:100%;" v-bind:to="'article?id='+ item.id " v-for="(item,index) in articleList " v-bind:key="item.id" >
                      <span class="text1">公告</span><span class="text2">{{ item.title }}</span><span class="text3">{{ item.creationTime | formatDate  }}</span>
                  </router-link>
              </li>
          </ul>
         
     </div>
</template>
<script>
import {getArticleList} from '../../../api/getData'
import message from '../../../config/message'
export default {
    data(){
        return{
               articleList:[],
        }
    },
    methods:{
       async getData(page,num){
         let data={
            "categoryId":1,
             "page":page,
             "rows":num
         }
         let res=await getArticleList(data);
         if(res && res.success){
            this.articleList=res.result.items
         }else{
             message(this,res)
         }
      }
    },
    mounted(){
       this.getData(1,10)
    }
}
</script>
<style lang="less">
  .wrap{
      width: 980px;
      height: 720px;
      .title{
          font-size: 15px;
            width: 920px;
            height: 58px;
            margin: 0 auto;
            line-height: 58px;
            border-bottom: 1px solid #e6e6e6;
      }
      ul{
          height: 610px;
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
                }
                .text1{
                        font-size: 15px;
                        color: #fc543c;
                        margin-right: 6px;
                        float: left;
                }
                .text2 {
                        width: 740px;
                        height: 44px;
                        overflow: hidden;
                        float: left;
                        color: #333;
                    }
                .text3 {
                        color: #ccc;
                        float: right;
                    }    
            }
          }
      }
  }
</style>


