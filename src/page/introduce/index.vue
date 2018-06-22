<template>
    <div class="introduce_container">
        <headt-top></headt-top>
        <div class="clear main" >
                <div class="introduce_left left">
                    <router-link v-for="(item,index) in menus " v-on:click.native="navBar(index)" v-bind:key="item.index"  v-bind:to="item.url" v-bind:style="{ color:active==index ? '#fc543c':'#333',background:active==index ? '#fff':'' }">
                            <img v-bind:src="active==index? '../../../static/introduce/0'+ (index+1) + '.png' : '../../../static/introduce/c'+ (index+1) + '.png' " /> <span>{{ item.name }}</span>
                    </router-link>
                </div>
                <div class="introduce_right right">
                    <transition>
                        <router-view></router-view>
                    </transition>
                </div>
        </div>
         <foot-bom></foot-bom>   
    </div>
</template>
<script>
import {getArticleTypeList} from '../../api/getData'
import message from '../../config/message'
 import headtTop from '../../components/headTop'
 import footBom from '../../components/footer'
export default {
    data(){
        return{
            active:0,
            menus:[],
            
        }
    },
    components:{
        headtTop,
        footBom
    },
    methods:{
       navBar(index){
           this.active=index;
       },
      async getNavs(){
          const _that=this;
           let data={
               "categrotyId":2
           }
           let res= await getArticleTypeList(data);
       
           if(res && res.success){
             this.menus=res.result
             if(this.menus.length){
                     _that.menus[0].url='/introduce/brief';            
                     _that.menus[1].url='/introduce/about';    
                    _that.menus[2].url='/introduce/partner';        
                    _that.menus[3].url='/introduce/private';      
                    _that.menus[4].url='/introduce/service';
                    _that.menus[5].url='/introduce/declare';
                    _that.menus[6].url='/introduce/guide';
                    _that.menus[7].url='/introduce/problem';
                    _that.menus= [{ 
                        id:1,
                        url:'/introduce/placard',
                        name:'网站公告',                    
                    }].concat(_that.menus)
             }
           }else{
              message(this,res)
           }
       } 
    },
    mounted(){
        this.getNavs()
    }
}
</script>

<style lang="less">
  .main{
      width: 1200px;
      margin: 20px auto 20px auto;
      .introduce_left{
              width: 220px;
            height: 720px;
            background: #e6e6e6;
            a{
                height: 58px;        
                border-bottom: 1px solid #FFF;
                color: #333;
                width: 220px;
                overflow: auto;
                zoom: 1;
                display: inline-block;
                img{
                        float: left;
                        margin-top: 15px;
                        margin-left: 30px;
                        margin-right: 10px;
                }
                span{
                    float: left;
                    line-height: 58px;
                    font-size: 16px;
                }
            }
         
      }
  }
</style>

