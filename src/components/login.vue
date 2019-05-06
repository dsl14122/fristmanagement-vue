<template>
  <div class="login">
    <div class="center_box">
        <h2>用户登录</h2>
      <el-form label-position="top" label-width="80px" >
        <el-form-item  label="用户名">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="btnLogin" type="primary">登 录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "login"
};
</script>

<style lang='scss'>
html,
body {
  height: 100%;
  margin: 0;
  padding: 0;
  .login {
    height: 100%;
    background-color: #324152;
    display: flex;
    justify-content: center;
    align-items: center;
    .center_box {
      width: 480px;
      height: 360px;
      background-color: #fff;
      border-radius: 10px;
      padding: 40px 35px;
      box-sizing: border-box;
      .btnLogin{
          width: 100%;
      }
      h2{
          margin: 0;
          padding: 0;
          text-align: center;
      }
    }
  }
}
</style>
