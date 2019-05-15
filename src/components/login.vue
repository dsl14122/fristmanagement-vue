<template>
  <div class="login">
    <div class="center_box">
      <h2>用户登录</h2>
      <el-form
        :model="loginForm"
        :rules="loginRules"
        ref="loginForm"
        label-position="top"
        label-width="80px"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="loginForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="loginForm.password" type="password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="btnLogin" type="primary" @click="submitForm('loginForm')">登 录</el-button>
          <el-button class="btnReset" type="danger" @click="resetForm('loginForm')">重 置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      loginForm: {
        username: "",
        password: ""
      },
      loginRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 5,
            max: 12,
            message: "长度在 5 到 12 个字符",
            trigger: "change"
          }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 8, message: "长度在 6 到 8 个字符", trigger: "change" }
        ]
      }
    };
  },
  methods: {
    //提交
    submitForm(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          const res = await this.$request.login(this.loginForm);
          //  console.log(res);
          if (res.data.meta.status == 400) {
            this.$message.warning(res.data.meta.msg);
          } else if (res.data.meta.status == 200) {
            this.$message.success(res.data.meta.msg);
            window.sessionStorage.setItem("token", res.data.data.token);
            // 编程式导航
            this.$router.push("/");
          } else {
            alert("404Not Found");
          }
        } else {
          alert("你倒是写点信息呀！");
          return false;
        }
      });
    },
    // 重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
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
      height: 370px;
      background-color: #fff;
      border-radius: 10px;
      padding: 10px 35px;
      box-sizing: border-box;
      .btnLogin {
        width: 100%;
      }
      .btnReset {
        width: 100%;
        margin: 10px 0;
      }
      h2 {
        margin: 0;
        padding: 0;
        text-align: center;
      }
    }
  }
}
</style>
