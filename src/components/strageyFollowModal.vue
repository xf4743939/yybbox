<template>
    <div>
           <!-- 跟投弹窗 -->
         <el-dialog
                 class="followDialog"
                 :before-close="hideModal"
                v-bind:visible.sync="isVisible"          
                   >
            <span slot="title">
                  <span v-if="worldOrHome==1" style="position: relative; left: 5px; font-weight: bold;" >国际</span>
                  <span v-else style="position: relative; left: 5px; font-weight: bold;">国内</span>
                  <span v-if="isFirm==2" class="title_type">实盘跟投</span>
                  <span v-else class="title_type">模拟跟投</span>
                  <span class="title_img"><img :src="arrowUrl" /></span>
                  <span class="title_trader">交易大师</span>
            </span>
         
            <div class="followContent">
               
              
            </div>
            <span slot="footer" class="dialog-footer">             
                <el-button  v-on:click="handleFollow" >确定跟投</el-button>
                <el-button class="cancelFollow" v-if="(clickBtn==1 || clickBtn==3 )" v-on:click="cancelFollow">取消跟投</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import message from '../config/message'
import {followCreate,unFollowBind} from '../api/getData'
export default {
    data(){
       return{
                arrowUrl:'../../static/default/fl_arrow.png',
                isShow:true, //message显示
                traderUserId:0,//交易员的用户id
                worldOrHome:1,
                isFirm: 1, //1表示模拟跟实盘2.表示实盘跟实盘
                clickBtn: 1, //1.表示编辑实盘 2.表示实盘跟投3.编辑模拟 4.模拟跟投
                ishide:false,
       }
    },
    created(){
      
    },
    props:['isVisible','modalInfo'],
    methods:{
           hideModal(){
               this.$emit('hideModal')      
           },
          //选择跟投按比例还是固定数量
            followStyle(index) {
                this.activeStyle =index ;
            },
               //正向反向
            followDirection(index) {
                this.activeDrection = index;
            },
                //确定跟投
           async handleFollow(){
                const _that = this;     
                let data = {
                    "traderUserId": _that.modalInfo.traderUserId,
                    "followType":_that.modalInfo.isFirm,
                    "worldOrHome":_that.modalInfo.worldOrHome,
                    "followDirection":_that.activeDrection
                }
              
                if (_that.activeStyle === 1) {
                    data["followCount"] = Number(_that.num1);
                } else {
                    data["followPercentage"] = Number(_that.num2);
                }
                let res= await followCreate(data);
              
                if(res && res.success){
                  
                    this.$emit('hideModal')            
                }else{
                     message(_that,res)
                }
            },
            //取消跟投
           async cancelFollow() {
                const _that = this;
                      
                let data= {
                    "traderUserId": _that.modalInfo.traderUserId,
                    "unBingType":_that.modalInfo.isFirm,
                    "worldOrHome":_that.modalInfo.worldOrHome
                }
                
               let res = await unFollowBind(data);
            
               if(res && res.success){
                     this.$emit('hideModal')            
               }else{
                   message(_that,res)
               }
            },
    },
    mounted(){
        this.worldOrHome=this.modalInfo.worldOrHome;
        this.num1=this.modalInfo.num1;
        this.num2=this.modalInfo.num2;
        this.activeStyle=this.modalInfo.activeStyle;
        this.activeDrection=this.modalInfo.activeDrection;
        this.isFirm=this.modalInfo.isFirm;
        this.clickBtn=this.modalInfo.clickBtn;
        console.log(this.modalInfo)
    }
}
</script>
