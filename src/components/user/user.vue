<template>
  <div class="box">
    <!-- 面包屑 -->
    <!-- 首页》用户管理》用户列表 -->
    <my-bread class="bread" level1="用户管理" level2="用户列表"></my-bread>
    <!-- 搜索框 -->
    <el-row class="searchrow">
      <el-col>
        <el-input
          @clear="loadUserList"
          clearable
          placeholder="请输入内容"
          v-model="query"
          class="inputSearch"
        >
          <el-button
            @click="queryUser()"
            slot="append"
            icon="el-icon-search"
          ></el-button>
        </el-input>
        <el-button type="success" @click="showAddUser" plain
          >添加用户</el-button
        >
      </el-col>
    </el-row>
    <!-- 表格 -->
    <el-table
      class="table"
      :data="userList"
      max-height="460"
      style="width: 100%"
    >
      <el-table-column type="index" label="#" width="100"> </el-table-column>
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
            @change="changeMgstate(scope.row)"
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
          <el-button
            size="mini"
            type="primary"
            icon="el-icon-edit"
            @click="showUpdateUser(scope.row)"
            plain
            circle
          ></el-button>
          <el-button
            size="mini"
            type="danger"
            icon="el-icon-delete"
            @click="deleteUser(scope.row.id)"
            plain
            circle
          ></el-button>
          <el-button
            size="mini"
            type="success"
            icon="el-icon-check"
            @click="showSetUserRole(scope.row)"
            plain
            circle
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <!-- 
     size-change每页显示条数变化时 
     current-change当前页改变时触发 
     current-page设置当前页数
     page-sizes每页多少条数据的选项
     page-size默认显示多少条
     layout功能
     total数据总数
     -->
    <el-pagination
      class="pagination"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="[3, 6, 9]"
      :page-size="3"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
    <!-- 添加用户对话框 -->
    <el-dialog title="添加用户" :visible.sync="dialogFormVisibleAdd">
      <el-form :model="form">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input
            style="width: 90%"
            v-model="form.username"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="密 码" :label-width="formLabelWidth">
          <el-input
            style="width: 90%"
            v-model="form.password"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="邮 箱" :label-width="formLabelWidth">
          <el-input
            style="width: 90%"
            v-model="form.email"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="电 话" :label-width="formLabelWidth">
          <el-input
            style="width: 90%"
            v-model="form.mobile"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleAdd = false">取 消</el-button>
        <el-button type="success" @click="addUser">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑用户弹出框 -->
    <el-dialog title="编辑用户" :visible.sync="dialogFormVisibleUpdate">
      <el-form :model="form">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input
            style="width: 90%"
            disabled
            v-model="form.username"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="邮 箱" :label-width="formLabelWidth">
          <el-input
            style="width: 90%"
            v-model="form.email"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="电 话" :label-width="formLabelWidth">
          <el-input
            style="width: 90%"
            v-model="form.mobile"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="Cancel">取 消</el-button>
        <el-button type="success" @click="updateUser">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 修改用户权限对话框 -->
    <el-dialog title="分配角色" :visible.sync="dialogFormVisibleRole">
      <el-form :model="form">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          {{ currUsername }}
        </el-form-item>
        <el-form-item label="角色" :label-width="formLabelWidth">
          {{ currRoleId }}
          <el-select v-model="currRoleId" placeholder="请分配用户权限">
            <el-option disabled label="请选择" :value="-1"></el-option>
            <el-option
              :label="item.roleName"
              v-for="(item, i) in roles"
              :key="i"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleRole = false">取 消</el-button>
        <el-button type="primary" @click="setUserRole">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      //搜索框内容
      query: "",
      userList: [],
      //分页
      total: -1,
      pagenum: 1,
      pagesize: 3,
      //添加用户对话框
      dialogFormVisibleAdd: false,
      dialogFormVisibleDel: false,
      dialogFormVisibleUpdate: false,
      dialogFormVisibleRole: false,

      formLabelWidth: "100px",
      //角色权限ID
      currRoleId: -1,
      currUserId: -1,
      currUsername: "",
      roles: [],
      //表单数据
      form: {
        username: "",
        password: "",
        eamil: "",
        mobile: "",
      },
    };
  },
  created() {
    //加载页面时获取数据
    this.getUserList();
  },
  methods: {
    Cancel() {
      this.dialogFormVisibleUpdate = false;
      this.getUserList();
    },
    //弹出修改用户权限对话框
    showSetUserRole(user) {
      this.dialogFormVisibleRole = true;
      this.currUsername = user.username;
      this.currUserId = user.id;
      this.$http.get(`users/${this.currUserId}`).then((res) => {
        this.currRoleId = res.data.data.rid;
      });
      this.$http.get(`roles`).then((res) => {
        this.roles = res.data.data;
      });
    },
    //修改用户权限
    setUserRole() {
      this.dialogFormVisibleRole = false;
      console.log(this.currRoleId);
      this.$http
        .put(`users/${this.currUserId}/role`, { rid: this.currRoleId })
        .then((res) => {
          this.currRoleId = res.data.data.rid;
        });
    },
    //修改用户状态
    changeMgstate(user) {
      this.$http
        .put(`users/${user.id}/state/${user.mg_state}`)
        .then((res) => {});
    },
    //显示编辑用户对话框
    showUpdateUser(user) {
      this.dialogFormVisibleUpdate = true;
      this.form = user;
    },
    //编辑用户
    updateUser() {
      this.dialogFormVisibleUpdate = false;
      this.$http.put(`users/${this.form.id}`, this.form).then((res) => {
        const {
          meta: { status, msg },
          data,
        } = res.data;
        if (status === 200) {
          this.pagenum = 1;
          this.getUserList();
          this.$message({
            type: "success",
            message: msg,
          });
        } else {
          this.getUserList();
          this.$message({
            type: "warning",
            message: msg,
          });
        }
      });
    },
    //删除用户
    deleteUser(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$http.delete(`users/${id}`).then((res) => {
            const {
              meta: { msg, status },
            } = res.data;
            if (status === 200) {
              this.pagenum = 1;
              this.getUserList();
              this.$message({
                type: "success",
                message: msg,
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    showAddUser() {
      this.form = {};
      this.dialogFormVisibleAdd = true;
    },
    //添加用户
    addUser() {
      this.dialogFormVisibleAdd = false;
      this.$http.post(`users`, this.form).then((res) => {
        const {
          meta: { status, msg },
          data,
        } = res.data;
        if (status === 201) {
          this.$message.success(msg);
          this.getUserList();
          //清空form数据
          this.form = {};
          //or
          // for(const key in this.form){
          //   this.form[key]=''
          // }
        } else {
          this.$message.warning(msg);
        }
      });
    },
    //清空输入框时加载数据
    loadUserList() {
      this.getUserList();
    },
    //查找用户
    queryUser() {
      this.getUserList();
    },
    //分页模块方法
    handleSizeChange(val) {
      this.pagesize = val;
      this.pagenum = 1;
      this.getUserList();
    },
    handleCurrentChange(val) {
      this.pagenum = val;
      this.getUserList();
    },
    //获取数据的方法
    getUserList() {
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
            // this.$message.success(msg);
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
.table {
  margin-top: 10px;
}
.pagination {
  margin-top: 15px;
}
</style>