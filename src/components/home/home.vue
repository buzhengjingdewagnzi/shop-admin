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
    <keep-alive>
      <el-container>
        <el-aside class="aside" width="200px">
          <!-- 开启路由模式 -->
          <el-menu default-active="2" router unique-opened>
            <el-submenu
              :index="'' + item1.order"
              v-for="(item1, i) in menus"
              :key="i"
            >
              <template slot="title">
                <i class="el-icon-user-solid"></i>
                <span>{{ item1.authName }}</span>
              </template>
              <el-menu-item
                :index="item2.path"
                v-for="(item2, i) in item1.children"
                :key="i"
              >
                <i class="el-icon-menu"></i>
                <span>{{ item2.authName }}</span>
              </el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main class="main">
          <router-view></router-view>
        </el-main>
      </el-container>
    </keep-alive>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      menus: [],
    };
  },
  created() {
    this.getMenus();
  },
  methods: {
    getMenus() {
      this.$http.get(`menus`).then((res) => {
        this.menus = res.data.data;
      });
    },
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