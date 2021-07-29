<template>
  <div class="box">
    <!-- 面包屑 -->
    <!-- 首页》权限管理》权限列表 -->
    <!-- <my-bread></my-bread> -->
    <my-bread level1="权限管理" level2="权限列表"></my-bread>
    <!-- 表格 -->
    <el-table
      class="table"
      stripe
      :data="rightList"
      max-height="550"
      style="width: 100%"
    >
      <el-table-column type="index" label="#" width="100"> </el-table-column>
      <el-table-column
        prop="authName"
        label="名称"
        :width="columnwidth"
      ></el-table-column>
      <el-table-column prop="path" label="路径" :width="columnwidth">
      </el-table-column>
      <el-table-column prop="level" label="星级" >
        <template slot-scope="scope">
          <span v-if="scope.row.level==='0'"> 一级</span>
          <span v-if="scope.row.level==='1'"> 二级</span>
          <span v-if="scope.row.level==='2'"> 三级</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      rightList: [],
      columnwidth: 200,
    };
  },
  created() {
    this.getRightList();
  },
  methods: {
    getRightList() {
      this.$http.get(`rights/list`).then((res) => {
        this.rightList = res.data.data;
      });
    },
  },
};
</script>

<style>
.box {
  height: 100%;
}
.table {
  margin-top: 10px;
}
</style>