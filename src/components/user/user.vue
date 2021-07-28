<template>
  <div class="box">
    <!-- 面包屑 -->
    <!-- 首页》用户管理》用户列表 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索框 -->
    <el-row class="searchrow">
      <el-col>
        <el-input placeholder="请输入内容" v-model="query" class="inputSearch">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
        <el-button type="success" plain>添加用户</el-button>
      </el-col>
    </el-row>
    <!-- 表格 -->
    <el-table :data="userList" style="width: 100%">
      <el-table-column type="index" label="#" width="60"> </el-table-column>
      <el-table-column prop="username" label="姓名" width="180">
      </el-table-column>
      <el-table-column prop="email" label="邮箱"> </el-table-column>
      <el-table-column prop="mobile" label="电话"> </el-table-column>
      <el-table-column label="创建时间">
        <!-- slot-scope传一个最外层数据源 -->
        <template slot-scope="scope">
          {{ scope.row.create_time | fmtdate }}
        </template>
      </el-table-column>
      <el-table-column label="用户状态" width="150">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.mg_state"
            active-color="#13ce66"
            inactive-color="rgba(0,0,0,0.2)"
          >
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="操作">
        <template slot-scope="scope">
          <!-- size="mini"尺寸  plain透明底色 circle圆形按钮-->
          <el-button size="mini" type="primary" icon="el-icon-edit" plain circle></el-button>
          <el-button size="mini" type="success" icon="el-icon-check" plain circle></el-button>
          <el-button size="mini" type="danger" icon="el-icon-delete" plain circle></el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      query: "",
      pagenum: 1,
      pagesize: 5,
      userList: [],
      //分页
      total: -1,
    };
  },
  created() {
    this.getUserList();
  },
  methods: {
    getUserList() {
      //设置请求头
      const AUTH_TOKEN = localStorage.getItem("token");
      this.$http.defaults.headers.common["Authorization"] = AUTH_TOKEN;
      this.$http
        .get(
          `users?query=${this.query}&pagenum=${this.pagenum}&pagesize=${this.pagesize}`
        )
        .then((res) => {
          const {
            meta: { status, msg },
            data: { users, total },
          } = res.data;
          if (status === 200) {
            //表格数据赋值
            this.userList = users;
            //total赋值
            this.total = total;
            //提示
            this.$message.success(msg);
          } else {
            //提示
            this.$message.warning(msg);
          }
        });
    },
  },
};
</script>
<style>
.box {
  height: 100%;
}
.inputSearch {
  width: 300px;
}
.searchrow {
  margin-top: 20px;
}
</style>