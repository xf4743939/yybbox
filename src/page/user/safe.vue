
   <template>
     <div class="setting_main">
          <el-menu :default-active="activeIndex" class="el-munu-demo" mode="horizontal" @select="navClick">
                <el-menu-item index="1">实名认证</el-menu-item>
                <el-menu-item index="2">银行卡管理</el-menu-item>
                <el-menu-item index="3">手机号码</el-menu-item>
                <el-menu-item index="4">绑定邮箱</el-menu-item>
                <el-menu-item index="5">登录密码</el-menu-item>
                <el-menu-item index="6">提款密码</el-menu-item>
          </el-menu>
          <transition>
                <router-view></router-view>      
          </transition>
     </div>
</template>

<script>
export default {
    data(){
        return{
            activeIndex:'1'
        }
    },
    computed:{
      
    },
    methods:{
      
        navClick(key,keyPath){
            this.activeIndex=key;
            switch(parseInt(key)){
                case 1:
                this.$router.push({path:'/user/safe/oauth'})
                break;
                case 2:
                this.$router.push({path:'/user/safe/bankCard'})
                break;
                case 3:
                this.$router.push({path:'/user/safe/phoneNumber'})
                break;
                case 4:
                this.$router.push({path:'/user/safe/email'})
                break;
                case 5:
                this.$router.push({path:'/user/safe/loginPwd'})
                break;
                case 6:
                this.$router.push({path:'/user/safe/getMoneyPwd'})
                break;
                default:
                 this.$router.push({path:'/user/safe/oauth'})

            }
        },
         getActiveIndex(){
                let curUrl=this.$route.path  //全路径
                let getUrl=this.$route.path.substring(curUrl.lastIndexOf('/')+1); //路径的最后一个          
                switch(getUrl.toLowerCase()){
                      case 'oauth':
                      this.activeIndex='1'
                      break;
                      case 'bankcard':
                      this.activeIndex='2'
                      break;
                      case 'phonenumber':
                      this.activeIndex='3'
                      break;
                      case 'email':
                      this.activeIndex='4'
                      break;
                      case 'loginpwd':
                      this.activeIndex='5'
                      break;
                      case 'getmoneypwd':
                      this.activeIndex='6'
                      break;
                      default:
                      this.activeIndex='1'
                }
          }
    },
    mounted(){
        this.getActiveIndex()
    }
}
</script>
<style lang="less" scoped>
   .setting_main{
      width: 1035px;
      float: right;
      margin-top: 20px;
      height:780px ;
      background: #fff;
      .el-menu-item{
          color: #333;
      }
      .el-menu--horizontal{
          >.is-active{
              border-bottom: 2px solid #fc543c;
              color: #fc543c;
          }
      }

  }
</style>


