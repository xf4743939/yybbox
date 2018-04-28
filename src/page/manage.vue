<template>
    <div class="manage_page fillcontain">
      <el-row class="nav_container" style="height:100%;">         
            <el-col :span="4" style="height:100%;">
                <el-menu
                style="height:100%;"
                :default-active="defaultActive"
                class="el-menu-vertical-demo"
                background-color="#00474f"
                text-color="#fff"
                active-text-color="#ffd04b">
                    <el-menu-item index="1">
                        <i class="el-icon-menu"></i>
                        <span slot="title">首页</span>
                    </el-menu-item>
                    <el-submenu index="2">
                        <template slot="title">
                        <i class="el-icon-document"></i>
                        <span>数据管理</span>
                        </template>                      
                        <el-menu-item index="2-1">用户列表</el-menu-item>
                        <el-menu-item index="2-2">商家列表</el-menu-item>
                        <el-menu-item index="2-3">食品列表</el-menu-item>
                        <el-menu-item index="2-4">订单列表</el-menu-item>
                        <el-menu-item index="2-5">管理员列表</el-menu-item>
                    </el-submenu>
                    <el-submenu index="3">
                            <template slot="title">
                            <i class="el-icon-plus"></i>
                            <span>添加数据</span>
                            </template>                      
                            <el-menu-item index="3-1">添加商铺</el-menu-item>
                            <el-menu-item index="3-2">添加商品</el-menu-item>
                    </el-submenu>
                     <el-submenu index="4">
                            <template slot="title">
                            <i class="el-icon-star-on"></i>
                            <span>图表</span>
                            </template>                      
                            <el-menu-item index="4-1">用户分布</el-menu-item>
                    </el-submenu>
                     <el-submenu index="5">
                            <template slot="title">
                            <i class="el-icon-edit"></i>
                            <span>编辑</span>
                            </template>                      
                            <el-menu-item index="3-1">文本编辑</el-menu-item>
                    </el-submenu>
                     <el-submenu index="6">
                            <template slot="title">
                            <i class="el-icon-setting"></i>
                            <span>设置</span>
                            </template>                      
                            <el-menu-item index="6-1">管理员设置</el-menu-item>
                    </el-submenu> 
                    <el-submenu index="7">
                            <template slot="title">
                            <i class="el-icon-warning"></i>
                            <span>说明</span>
                            </template>                      
                            <el-menu-item index="7-1">说明</el-menu-item>
                    </el-submenu> 
                </el-menu>
            </el-col>
            <el-col :span="20" style="height:100%;overflow:auto;">
                <keep-alive>
                    <router-view></router-view>
                </keep-alive>
            </el-col>
        </el-row>

    </div>
</template>
<script>
export default {
  computed:{
      defaultActive:function(){
         
          return this.$route.path.replace('/','')
      }
  }
}
</script>
<style lang="less" scoped>
 
</style>

