<template>
  <el-container class="container">
    <el-header class="header">
      <el-row>
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <img class="logo" src="" alt="" />
          </div>
        </el-col>
        <el-col :span="18" class="middle"><span>电商管理平台</span> </el-col>
        <el-col :span="2"
          ><div class="grid-content bg-purple">
            <a @click.prevent="handleSignout" class="logout">退出</a>
          </div></el-col
        >
      </el-row>
    </el-header>
    <el-container>
      <el-aside class="aside" width="200px">
        <!-- 开启路由模式 -->
        <el-menu default-active="2" router="turn" unique-opened="turn">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-user-solid"></i>
              <span>用户管理</span>
            </template>
            <el-menu-item index="users">
              <i class="el-icon-menu"></i>
              <span>用户列表</span>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-remove"></i>
              <span>权限管理</span>
            </template>
            <el-menu-item index="2-1">
              <i class="el-icon-menu"></i>
              <span>角色列表</span>
            </el-menu-item>
            <el-menu-item index="2-2">
              <i class="el-icon-menu"></i>
              <span>权限列表</span>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-s-goods"></i>
              <span>商品管理</span>
            </template>
            <el-menu-item index="3-1">
              <i class="el-icon-menu"></i>
              <span>商品列表</span>
            </el-menu-item>
            <el-menu-item index="3-2">
              <i class="el-icon-menu"></i>
              <span>分类参数</span>
            </el-menu-item>
            <el-menu-item index="3-3">
              <i class="el-icon-menu"></i>
              <span>商品分类</span>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-s-fold"></i>
              <span>订单管理</span>
            </template>
            <el-menu-item index="4-1">
              <i class="el-icon-menu"></i>
              <span>订单列表</span>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-s-data"></i>
              <span>数据统计</span>
            </template>
            <el-menu-item index="5-1">
              <i class="el-icon-date"></i>
              <span>数据报表</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main class="main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  //获取token
  //判断
  beforeCreate() {
    const token = localStorage.getItem('token');

    if (!token) {
      this.$router.push({ name: 'login' });
    }
  },
  methods: {
    handleSignout() {
      //清除token
      localStorage.clear();
      this.$message.success("退出成功");
      this.$router.push({ name: "login" });
    },
  },
};
</script>

<style>
.container {
  height: 100%;
  background: rgba(0, 0, 0, 0.06);
}
.header {
  background: #ffffff;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}
.logo {
  margin-top: 10px;
}
.middle {
  text-align: center;
  line-height: 60px;
  font-size: 25px;
  font-weight: bold;
  color: #000000;
}
.logout {
  text-decoration: none;
  color: black;
  text-align: center;
  line-height: 60px;
}
.aside {
  background: #ffffff;
}
.main {
  margin-top: 10px;
  margin-left: 10px;
  border-radius: 10px;
  background: #ffffff;
  box-shadow: 10px 10px 5px #000000;
}
</style>