<template>
  <div class="goods">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>
      <router-view></router-view>

  </div>
</template>

<script>

export default {
  name: "goods",
 
};
</script>

<style lang='scss'>
.goods {
  .breadcrumb {
    background-color: #d3dce6;
    height: 45px;
    line-height: 45px;
    font-size: 15px;
    padding-left: 10px;
  }
}
</style>
