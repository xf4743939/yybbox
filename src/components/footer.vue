<template>

   <div class="foot e">
    <div class="e1">
        <div class="e2">
            <p style="font-size: 18px; color: #666">客户热线</p>
            <p style="font-size: 20px; color: #DC615E">400-8388-563</p>
            <p>Q Q：2067844913、3226209225</p>
            <p>邮箱：yybbox@aliyun.com</p>
            <p style="line-height: 2spx">
                地址：广东省深圳市宝安区沙井街道中
                <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;心路110号天悦大厦1107-1108
            </p>
        </div>
        <div class="e3">
            <ul style="margin-left: 44px">
                关于我们
                <li><a href="/introduce/placard">平台简介</a></li>
                <li><a href="/introduce/partner">合作伙伴</a></li>
                <li><a href="/introduce/about">联系我们</a></li>
            </ul>
            <ul>
                网站条款
                <li><a href="/introduce/private">隐私政策</a></li>
                <li><a href="/introduce/service">服务协议</a></li>
                <li><a href="/introduce/declare">免责声明</a></li>
            </ul>
            <ul style="margin-right: 44px">
                帮助中心
                <li><a href="/introduce/guide">新手指南</a></li>
                <li><a href="/introduce/problem">常见问题</a></li>
            </ul>

        </div>
        <div class="e4">
            <p class="e41" style="width: 174px;">PC客户端下载</p>
            <p class="e41" style="width: 174px;">手机APP下载</p>
            <div class="e42" style="clear: both;">
                <p class="pc" style="height: 156px; width: 174px;">

                    <a href="http://www.rlwapp.com:88/follow/%E6%98%93%E5%8F%8B%E5%AE%9D%E8%B7%9F%E6%8A%95.exe">国际期货实盘</a>
                    <a class="tb sc" href="http://www.rlwapp.com:88/follow/%E6%98%93%E5%8F%8B%E5%AE%9D%E8%B7%9F%E6%8A%95%EF%BC%88%E6%A8%A1%E6%8B%9F%EF%BC%89.exe">国际期货模拟</a>
                    <a class="tb" href="http://www.rlwapp.com:88/follow/%E5%9B%BD%E5%86%85%E5%AE%A2%E6%88%B7%E7%AB%AF.exe">国内期货实盘</a>
                    <a class="tb sc"  href="http://www.rlwapp.com:88/follow/%E5%9B%BD%E5%86%85%E5%AE%A2%E6%88%B7%E7%AB%AF%EF%BC%88%E6%A8%A1%E6%8B%9F%EF%BC%89.exe">国内期货模拟</a>

                </p>
                <p>
                    <img style="margin: 0 10px" src="../images/default/Android.png">

                    <span class="mask">
                        <span class="tip_color">敬请期待...</span>
                        <span class="cover"><img src="../images/default/ios.png"></span>   
                                   
                     </span>
                </p>
            </div>

        </div>



    </div>
    <div class="e0">
        <p>©深圳市融利威网络科技有限公司 版权所有 粤ICP备16069902号-1</p>
        <p style="margin-top: 4px">技术支持：融利威（深圳）技术有限公司</p>
    </div>

   </div>
</template>
<script>
export default {
    data(){
        return{

        }
    }
}
</script>
<style lang="less" scoped>
    .foot{
        background: #fff;
        padding-top: 24px;
        overflow: hidden;
        margin-top: 30px;
        min-width:1200px;
        .e1{
            width: 1200px;
            margin: 0 auto;
            padding-bottom: 24px;
            overflow: hidden;
            .e2{
                width: 264px;
                height: 210px;
              
                padding-top: 10px;
                float: left;
                p{
                    color: #666;
                    margin-bottom: 10px;
                    font-size: 13px;
                }
            }
            .e3{
                float: left;
                padding-top: 10px;
                height: 210px;
              
                ul{
                    font-size: 18px;
                    color: #333;
                    float: left;
                    margin-right: 58px;
                    li{
                        margin-top: 10px;
                        a{
                            font-size: 13px;
                            color: #666;
                        }
                    }
                }
            }
            .e4{
                float: right;
                padding-top: 10px;
                overflow: hidden;
                width: 472px;
                .e41{
                  
                    margin-bottom: 14px;
                }
            }
        }
        .e0{
            border-top: 1px solid #e4e4e4;
            height: 60px;
            p{
                text-align: center;
                color: #999797;
                margin-top: 10px;
            }
        }
        .e42{
            float: left;
            .pc{
                    background-color: #f5f5f5;
                    border-radius: 5px;
                    a{
                        color: #DC615E;
                        display: block;
                        height: 37px;
                        line-height: 37px;
                        font-size: 16px;
                        text-align: center;
                        font-weight: 600;
                    }
                    .sc{
                        color: #50A4C3;
                    }
                    .tb{
                        border-top: 2px solid #fff;
                     }
            }
            p{
                float: left;
            }
        }
    }
    .e41{
        font-size: 18px;
        color: #333;
        float: left;
        margin-right: 58px;   
    }
    .mask{
       position: relative;
        height: 100%;
        display: inline-block;
        .tip_color{
            position: absolute;
            color: #fff;
            display: inline-block;
            width: 120px;
            z-index: 999;
            top: 40%;
            left: 10%;
        }
        .cover{
            width: 136px;
            height: 100%;
            display: inline-block;
            background: rgba(0, 0, 0, 0.4);
            z-index: 100;
            opacity: 0.3;
            color: #fff;
        } 
    }
</style>


