<template>
    <div class="val2" id="avator_wrap">
        <div>
            <div class="avator_content clear">       
                <ul class="avator_left">
                    <li v-for="(item,index) in avators" v-on:click="selectedImage(item)">
                        <img v-bind:src="item.url" style="width: 50px; height: 50px;" />
                    </li>
                </ul>
                <div class="avator_right clear">
                    <div class="avator_view_main clear" style="margin-top: 0px;">
                        <div class="avator_view">
                            <p style="font-size:14px; margin-bottom:8px; color:#fc543c">头像预览</p>
                            <p>您选择的图片将会自动生成三种尺寸头像，请预览后保存头像</p>
                        </div>
                        <div class="avator_image clear">
                            <p class="i80">
                                <img v-bind:src="selectedImgUrl" v-bind:class="[animate ? activeClass : remove]" />
                                <span style="display: inline-block; margin-left: 21px;">80×80</span>
                            </p>
                            <p class="i50">
                                <img v-bind:src="selectedImgUrl" v-bind:class="[animate ? activeClass : remove]"/>
                                <span style="margin-left: 10px; display: inline-block;">50×50</span>
                            </p>
                            <p class="i30"><img v-bind:src="selectedImgUrl" v-bind:class="[animate ? activeClass : remove]" /><span style=" display inline-block;">30×30</span></p>
                        </div>
                    </div>
                    <p class="avator_btns" style="margin-top:30px;">
                        <button v-on:click="saveAvator" class="save_avator">保存</button>
                         <button v-on:click="cancelAvator" class="cancel_avator" >取消</button>
                    </p>
                </div>
            </div>
       </div>
    </div>
</template>
<script>
import{mapState,mapActions} from 'vuex'
import getUserInfo from '../../../config/getUserInfo'
import message from '../../../config/message'
import { updateHeadImg} from '../../../api/getData'

export default {
    data(){
       return{
          user:null,
          message:'',
          avators:[],
          selectedImgUrl:"",
          animate:true,
          activeClass:'imgFadeIn',
          remove:'imgFadeOut',
          isShow:true,
          headerImgs:[] 
       }
    },
    created(){
       this.getAvator();
    },
    computed:{
        ...mapState(['userInfo'])
    },
    methods:{
        ...mapActions(['getUserInfo']),
        getAvator(){
            for(let i=1;i<=100;i++){
               let avator={
                   id:i,
                   url:'../../../../static/avator/a' + i + '.png'
               }
               let av="a" + i + ".png";
               this.avators.push(avator);
               this.headerImgs.push(av);
            }
        },
        selectedImage(item) {
             this.animate=false
             setTimeout( () => {
                     this.animate=true
                    this.selectedImgUrl = item.url;
             },200)       
        },
        cancelAvator() {
        
            this.selectedImgUrl=(this.userInfo && this.userInfo.icon)? this.userInfo.icon :"../../../../static/avator/a0.png"
           
        },
       async saveAvator() {
           let _that=this;
           let imgUrl=this.selectedImgUrl.substr(this.selectedImgUrl.lastIndexOf("/")+1);
            let findImg=this.headerImgs.find(function(value,index){
               return value==imgUrl
            })
              debugger;
            if(!findImg){          
                 if(_that.isShow){
                     _that.isShow=false;
                     _that.getUserInfo();
                     message(_that,{},'头像上传成功','success',true)
                  }
               return;  
            }
        
            let data={
                 "headImg":imgUrl
              }
            
              let res=await updateHeadImg(data);
              if(res && res.success){
                 _that.isShow=false;
                    _that.getUserInfo();
                 message(_that,{},'头像上传成功','success',true)
              }else{
                   if(_that.isShow){
                      _that.isShow=false;
                      message(_that,res)
                   }
              }
       },   

    },
    mounted(){
       getUserInfo(this)
       this.selectedImgUrl=(this.user && this.user.icon) ? this.userInfo.icon :'../../../../static/avator/a0.png'
    }
}
</script>
<style lang="less">
 #avator_wrap{
     .avator_content{
        margin-top: 20px;
        overflow: hidden;
        margin-left: 16px;
     }
     .avator_left {
        display:block;
        width: 66.67%;
        float: left;
        li{
            margin-right: 17px;
            float: left;
            img{
               width: 50px;
               height: 50px;
            }
        }
    }
    .avator_right {
            display: inline-block;
            width: 31%;
            margin-top: 25px;
            padding-right: 20px;
            .avator_image{
                margin-top: 30px;
                position: relative;
               .i80 {
                width: 80px;
                img{
                       width: 80px;
                        height: 80px;
                        border-radius: 50%; 
                }
             }
             .i50{
                     width: 50px;
                     position: absolute;
                     bottom: 0px;  
                     left: 130px;
                    img{
                        width: 50px;
                        height: 50px;
                        border-radius: 50%;
                    }
             }
             .i30{
                     width: 30px;
                      position: absolute;
                     bottom: 0px;  
                     left: 240px;
                 
                    img{
                        width: 30px;
                        height: 30px;
                        border-radius: 50%;
                    }
             }
             p{
                    display:block;
            
                    float: left;
                    background: rgb(248, 245, 245);
                    border-radius: 50%;
             }
        }
        .avator_btns{
            .save_avator{
                    width: 92px;
                    height: 32px;
                    color: rgb(255, 255, 255);
                    margin-right: 10px;
                    background:#fc543c;
                    outline: 0px;
                    border-width: 0px;
                    border-style: initial;
                    border-color: initial;
                    border-image: initial;
                    border-radius: 4px;
                    cursor: pointer;
            }
            .cancel_avator {
                width: 92px;
                height: 32px;
                color: rgb(255, 255, 255);
                outline: 0px;
                border-width: 0px;
                border-style: initial;
                border-color: initial;
                border-image: initial;
                cursor: pointer;
                background: #666;
                border-radius: 4px;
            }
        } 
     }
 }
 .imgFadeIn {
    -webkit-animation-name: fadeIn; /*动画名称*/
-webkit-animation-duration: 1.5s; /*动画持续时间*/

-webkit-animation-delay: 0s; /*延迟时间*/
}
.imgFadeOut {
    -webkit-animation-name: fadeOut; /*动画名称*/
-webkit-animation-duration: 1.5s; /*动画持续时间*/

-webkit-animation-delay: 0s; /*延迟时间*/
}
@-webkit-keyframes fadeOut {
    0% {
        opacity: 1    
    }
    50% {
        opacity: 0.5
    }
    100% {
        opacity: 0
    }
}
@-webkit-keyframes fadeIn {
    0% {
        opacity: 0    
    }
    50% {
        opacity: 0.5
    }
    100% {
        opacity: 1
    }
}
</style>

