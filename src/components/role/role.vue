<template>
  <div class="box">
    <!-- 面包屑 -->
    <!-- 首页》权限管理》角色列表 -->
    <my-bread class="bread" level1="权限管理" level2="角色列表"></my-bread>
    <!-- 按钮 -->
    <el-row class="btn-box">
      <el-col>
        <el-button @click="showAddRole" plain>添加角色</el-button>
      </el-col>
    </el-row>
    <!-- 表格 -->
    <el-table class="table" :data="roleList" style="width: 100%">
      <el-table-column type="expand" width="50">
        <template slot-scope="scope">
          <el-row v-for="(item1, i) in scope.row.children" :key="i">
            <el-col :span="3">
              <el-tag @close="delRight(scope.row, item1.id)" closable>{{
                item1.authName
              }}</el-tag>
              <i class="el-icon-arrow-right"></i>
            </el-col>
            <el-col :span="21">
              <el-row v-for="(item2, i) in item1.children" :key="i">
                <el-col :span="3">
                  <el-tag
                    @close="delRight(scope.row, item2.id)"
                    closable
                    type="danger"
                  >
                    {{ item2.authName }}
                  </el-tag>
                  <i class="el-icon-arrow-right"></i>
                </el-col>
                <el-col :span="21">
                  <el-tag
                    @close="delRight(scope.row, item3.id)"
                    closable
                    v-for="(item3, i) in item2.children"
                    :key="i"
                    type="success"
                  >
                    {{ item3.authName }}
                  </el-tag>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <!-- m没有权限的显示 -->
          <span v-if="scope.row.children.length === 0">未分配权限</span>
        </template>
      </el-table-column>
      <el-table-column type="index" label="#" width="100"> </el-table-column>
      <el-table-column prop="roleName" label="角色名称" width="180">
      </el-table-column>
      <el-table-column prop="roleDesc" label="角色描述"> </el-table-column>
      <el-table-column prop="address" label="操作">
        <template slot-scope="scope">
          <!-- size="mini"尺寸  plain透明底色 circle圆形按钮-->
          <el-button
            size="mini"
            type="primary"
            icon="el-icon-edit"
            @click="showUpdateRole(scope.row)"
            plain
            circle
          ></el-button>
          <el-button
            size="mini"
            type="danger"
            icon="el-icon-delete"
            @click="deleteRole(scope.row.id)"
            plain
            circle
          ></el-button>
          <el-button
            size="mini"
            type="success"
            icon="el-icon-check"
            @click="showSetRightDia(scope.row)"
            plain
            circle
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 为角色添加权限的对话框 -->
    <el-dialog title="修改权限" :visible.sync="dialogFormVisibleRight">
      <!-- 树形结构 -->
      <el-tree
        ref="tree"
        :data="treeList"
        show-checkbox
        node-key="id"
        default-expand-all
        :default-checked-keys="arrcheck"
        :props="defaultProps"
      >
      </el-tree>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleRight = false">取 消</el-button>
        <el-button type="success" @click="setRoleRight">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 添加角色对话框 -->
    <el-dialog title="添加角色" :visible.sync="dialogFormVisibleAdd">
      <el-form :model="form">
        <el-form-item label="角色名" :label-width="formLabelWidth">
          <el-input
            style="width: 90%"
            v-model="form.roleName"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="角色描述" :label-width="formLabelWidth">
          <el-input
            style="width: 90%"
            v-model="form.roleDesc"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleAdd = false">取 消</el-button>
        <el-button type="success" @click="addRole">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 修改角色对话框 -->
    <el-dialog title="编辑角色" :visible.sync="dialogFormVisibleUpdate">
      <el-form :model="form">
        <el-form-item label="角色名" :label-width="formLabelWidth">
          <el-input
            style="width: 90%"
            v-model="form.roleName"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="角色描述" :label-width="formLabelWidth">
          <el-input
            style="width: 90%"
            v-model="form.roleDesc"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="Cancel">取 消</el-button>
        <el-button type="success" @click="updateRole">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      roleList: [],
      columnwidth: 200,
      dialogFormVisibleRight: false,
      dialogFormVisibleAdd: false,
      dialogFormVisibleUpdate: false,
      formLabelWidth: "100px",
      //树形结构数据
      treeList: [],
      defaultProps: {
        label: "authName",
        children: "children",
      },
      arrexpand: [],
      arrcheck: [],
      //角色ID
      currRoleId: -1,
      form: {},
    };
  },
  created() {
    this.getRoleList();
  },
  methods: {
    Cancel() {
      this.dialogFormVisibleUpdate = false;
      this.getRoleList();
    },
    //修改角色
    updateRole() {
      this.dialogFormVisibleUpdate = false;
      this.$http.put(`roles/${this.form.id}`, this.form).then((res) => {
        const {
          meta: { status, msg },
          data,
        } = res.data;
        if (status === 200) {
          this.$message({
            type: "success",
            message: msg,
          });
        } else {
          this.$message({
            type: "warning",
            message: msg,
          });
        }
        this.getRoleList();
      });
    },
    //修改角色
    showUpdateRole(role) {
      this.dialogFormVisibleUpdate = true;
      this.form = role;
    },
    //删除角色
    deleteRole(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$http.delete(`roles/${id}`).then((res) => {
            const {
              meta: { msg, status },
            } = res.data;
            if (status === 200) {
              this.pagenum = 1;
              this.getRoleList();
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
    //打开添加角色对话框
    showAddRole() {
      this.form = {};
      this.dialogFormVisibleAdd = true;
    },
    //添加角色
    addRole() {
      this.dialogFormVisibleAdd = false;
      this.$http.post(`roles`, this.form).then((res) => {
        const {
          meta: { status, msg },
          data,
        } = res.data;
        if (status === 201) {
          this.$message.success(msg);
          this.getRoleList();
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
    //设置角色权限
    setRoleRight() {
      this.dialogFormVisibleRight = false;
      let arr1 = this.$refs.tree.getCheckedKeys();
      let arr2 = this.$refs.tree.getHalfCheckedNodes();
      let arr = [...arr1, ...arr2];
      this.$http
        .post(`roles/${this.currRoleId}/rights`, { rids: arr.join(",") })
        .then((res) => {
          this.getRoleList();
        });
    },
    //打开设置角色权限对话框
    showSetRightDia(role) {
      this.currRoleId = role.id;
      this.dialogFormVisibleRight = true;
      this.$http.get(`rights/tree`).then((res) => {
        this.treeList = res.data.data;
        // var arrexpand1 = [];
        // this.treeList.forEach((item1) => {
        //   arrexpand1.push(item1.id);
        //   item1.children.forEach((item2) => {
        //     arrexpand1.push(item2.id);
        //     item2.children.forEach((item3) => {
        //       arrexpand1.push(item3.id);
        //     });
        //   });
        // });
        // this.arrexpand=arrexpand1
        //获取当前角色权限ID
        let arrcheck1 = [];
        role.children.forEach((item1) => {
          // arrcheck1.push(item1.id);
          item1.children.forEach((item2) => {
            // arrcheck1.push(item2.id);
            item2.children.forEach((item3) => {
              arrcheck1.push(item3.id);
            });
          });
        });
        this.arrcheck = arrcheck1;
      });
    },
    //删除权限
    delRight(role, rightId) {
      this.$http.delete(`roles/${role.id}/rights/${rightId}`).then((res) => {
        role.children = res.data.data;
      });
    },
    //获取数据
    getRoleList() {
      this.$http.get(`roles`).then((res) => {
        this.roleList = res.data.data;
      });
    },
  },
};
</script>

<style>
.box {
  height: 100%;
}
.btn-box {
  margin-top: 20px;
}
.table {
  margin-top: 10px;
}
</style>