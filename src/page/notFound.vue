<template>
    <div class="missing fh wh">
        <div class="error  ">
            <div class="error_left"><img src="../../static/default/404.png"></div>
            <div class="error_right">
                <ul>
                    <li class="error_title">找不到页面!</li>
                    <li class="error_info">您所要的页面未找到，但是您可以试试下面的方法：</li>
                    <li>点击<a href="/">这里</a>去首页，您可以找到更多；</li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    
}
</script>
<style lang="less">
  .wh {
    width: 1140px;
    margin: 0 auto;
}
.missing {
    background: #fff;
    margin: 60px auto;
}
.fh {
    overflow: hidden;
    zoom: 1;
}
.error {
    overflow: hidden;
    zoom: 1;
    width: 580px;
    margin: 97px auto;
}
.error_left, .error_right {
    float: left;
}
.error_left, .error_right {
    float: left;
}
img {
    border: 0;
    vertical-align: text-bottom;
}
.error_right {
    margin-left: 106px;
    color: #35a2f4;
    margin-top: 56px;
}
.error_right li {
    margin-bottom: 5px;
}
.error_right li.error_info {
    margin-bottom: 31px;
}
.error_right li.error_title {
    font-size: 36px;
    font-weight: bold;
    margin-bottom: 11px;
}
.error_right a {
    color: #fe5816;
}
a {
    color: #999b9d;
    text-decoration: none;
}
</style>


