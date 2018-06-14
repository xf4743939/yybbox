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
                <div class="followStyle">
                    <div class="style_title">
                        <span class="style1">1</span>
                        <span>请选择跟投方式</span>
                    </div>
                    <div class="style_content">
                        <div class="style_num">
                            <div class="num1 " v-bind:class="activeStyle==1 ? 'followActive': '' " v-on:click="followStyle(1)">
                                <p>固定数量下单</p>
                                <p>例如您设置固定数量1手，不论交易员下单多少手，您手数均为1手。最低跟随手数为1.</p>
                            </div>
                            <div class="num2" v-if="activeStyle===1">
                                <span>固定跟投</span>
                               
                                     <el-input-number v-bind:min="1" class="num_val" size="mini" v-model="num1"></el-input-number>
                               
                                <span>手</span>
                            </div>
                        </div>
                        <div class="style_perce">
                            <div class="num1" v-on:click="followStyle(2)" v-bind:class="activeStyle==2 ? 'followActive': '' ">
                                <p>按比例下单</p>
                                <p>例如您设置为0.5倍比例跟随，交易员下单2手，您的手数为1手。不足1手时将默认为不跟随下单.</p>
                            </div>
                            <div class="num2" v-if="activeStyle===2">
                                <span>按比例下单</span>                             
                                   <el-input-number class="num_val" size="mini" v-model="num2" v-bind:precision="2" v-bind:step="1" v-bind:min="1"></el-input-number>
                              
                                <span>倍</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="followStyle">
                    <div class="style_title">
                        <span class="style1">2</span>
                        <span>请选择跟投方向</span>
                    </div>
                    <div class="style_content">
                        <div class="style_num">
                            <div class="num1" v-on:click="followDirection(1)" v-bind:class="activeDrection==1 ? 'followActive': '' ">
                                <p>正向跟投</p>
                                <p>交易员<span class="buy">买入</span>,您的操作也为<span class="buy">买入</span></p>
                            </div>
                        </div>
                        <div class="style_perce">
                            <div class="num1"  v-on:click="followDirection(2)" v-bind:class="activeDrection==2 ? 'followActive': '' ">
                                <p>反向跟投</p>
                                <p>交易员<span class="buy">买入</span>,您的操作也为<span class="sale">买出</span>.</p>
                            </div>              
                        </div>
                    </div>
                </div>
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
                num1: 1, //固定手数值
                num2: 1,  //百分比
                activeStyle: 1, //1表示选中固定数量2.表示按比例下单
                activeDrection: 1, //表示正向跟投 2.表示反向跟投
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
                debugger;
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
