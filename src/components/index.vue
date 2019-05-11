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
            <el-button type="danger" class="logout" icon="el-icon-delete" circle @click="logout"></el-button>
          </div>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside width="200px" class="indexLeft">
        <el-menu router default-active="2" class="el-menu-vertical-demo">
          <el-submenu :index="item1.order" v-for="(item1, index) in menus" :key="index">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{item1.authName}}</span>
            </template>
            <el-menu-item :index="item2.path" v-for="(item2, i) in item1.children" :key="i">
              <i class="el-icon-menu"></i>
              {{item2.authName}}
            </el-menu-item>
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
  name: "index",
  data() {
    return {
      menus: []
    };
  },
  beforeCreate() {
    if (!window.sessionStorage.getItem("token")) {
      this.$message.error("你倒是去登录一下呀!");
      //  编程式导航
      this.$router.push("login");
    }
  },
  methods: {
    logout() {
      window.sessionStorage.removeItem("token");
      //  编程式导航
      this.$router.push("login");
    }
  },
  created() {
    this.$request.getMenus().then(res => {
      console.log(res);
      this.menus = res.data.data;
    });
  }
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
