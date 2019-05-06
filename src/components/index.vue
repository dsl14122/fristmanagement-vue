<template>
  <el-container class="indexBox">
    <el-header class="indexTitle">
      <el-row>
        <el-col :span="4">
          <div class="grid-content bg-purple">
              <img class="logo" src="../assets/logo.png" alt="">
          </div>
        </el-col>
        <el-col :span="19">
          <div class="grid-content bg-purple-light title" >三国后台管理</div>
        </el-col>
        <el-col :span="1">
          <div class="grid-content bg-purple">
               <el-button type="danger" class="logout" icon="el-icon-delete" circle></el-button>
          </div>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside width="200px" class="indexLeft">Aside</el-aside>
      <el-main class="indexRight">Main</el-main>
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
    .logo{
        height: 60px;
        img{
            width: 100%;
        }
    }
    .title{
        text-align: center;
        line-height:60px;
        color: #fff;
        font-size: 25px;
        font-weight: bold;
    }
    .logout{
        margin-top: 10px;
    }
  }
  .indexLeft {
  }
  .indexRight {
    background-color: #e9eef3;
  }
}
</style>
