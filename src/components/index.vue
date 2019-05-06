<template>
  <el-container class="indexBox">
    <el-header class="indexTitle">
      <el-row>
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <img class="logo" src="../assets/logo.png" alt>
          </div>
        </el-col>
        <el-col :span="19">
          <div class="grid-content bg-purple-light title">三国后台管理</div>
        </el-col>
        <el-col :span="1">
          <div class="grid-content bg-purple">
            <el-button type="danger" class="logout" icon="el-icon-delete" circle></el-button>
          </div>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside width="200px" class="indexLeft">
        <el-menu router default-active="2" class="el-menu-vertical-demo">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>用户管理</span>
            </template>
              <el-menu-item index="users"> <i class="el-icon-menu"></i>用户列表</el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>权限管理</span>
            </template>
              <el-menu-item index="roles"> <i class="el-icon-menu"></i>角色列表</el-menu-item>
              <el-menu-item index="rights"> <i class="el-icon-menu"></i>权限列表</el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>商品管理</span>
            </template>
              <el-menu-item index="goods"> <i class="el-icon-menu"></i>商品列表</el-menu-item>
              <el-menu-item index="params"> <i class="el-icon-menu"></i>分类参数</el-menu-item>
              <el-menu-item index="categories"> <i class="el-icon-menu"></i>商品分类</el-menu-item>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>订单管理</span>
            </template>
              <el-menu-item index="orders"> <i class="el-icon-menu"></i>订单列表</el-menu-item>
          </el-submenu>
          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>数据统计</span>
            </template>
              <el-menu-item index="reports"> <i class="el-icon-menu"></i>数据报表</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main class="indexRight">
          <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: "index"
};
</script>

<style lang='scss'>
.indexBox {
  height: 100%;
  .indexTitle {
    background-color: #b3c0d1;
    .logo {
      height: 60px;
      img {
        width: 100%;
      }
    }
    .title {
      text-align: center;
      line-height: 60px;
      color: #fff;
      font-size: 25px;
      font-weight: bold;
    }
    .logout {
      margin-top: 10px;
    }
  }
  .indexLeft {
  }
  .indexRight {
      padding-top: 0;
    background-color: #e9eef3;
  }
}
</style>
