<template>
  <div class="login-box">
    <el-form
      class="login-form"
      label-position="top"
      label-width="80px"
      :model="formdata"
    >
      <h2>用户登录</h2>
      <el-form-item label="用户名">
        <el-input v-model="formdata.username"> </el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input
          type="password"
          v-model="formdata.password"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-button @click.prevent="handleLogin()" class="login-btn" type="primary"
        >登录</el-button
      >
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formdata: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    //登录请求
    handleLogin() {
      this.$http.post("login", this.formdata).then((res) => {
        const {
          data,
          meta: { msg, status },
        } = res.data;
        if (status === 200) {
          //登录成功
          //把token保存到本地
          localStorage.setItem("token", data.token);
          //跳转页面到主页
          this.$router.push({ name: "home" });
          //成功提示
          this.$message.success(msg);
        } else if (status === 400) {
          this.$message.warning(msg);
        }
      });
    },
  },
};
</script>

<style>
.login-box {
  height: 100%;
  background: #324152;
  display: flex;
  justify-content: center;
  align-items: center;
}
.login-form {
  width: 400px;
  background: #fff;
  border-radius: 5px;
  padding: 30px;
}
.login-btn {
  width: 100%;
  margin: 10px 0;
}
</style>