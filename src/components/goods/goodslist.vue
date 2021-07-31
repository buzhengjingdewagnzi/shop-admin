<template>
  <div class="box">
    <!-- 面包屑 -->
    <my-bread class="bread" level1="商品管理" level2="商品列表"></my-bread>
    <!-- 搜索框 -->
    <el-row class="searchrow">
      <el-col>
        <el-input
          @clear="loadGoodsList"
          clearable
          placeholder="请输入内容"
          v-model="query"
          class="inputSearch"
        >
          <el-button
            @click="queryGoods()"
            slot="append"
            icon="el-icon-search"
          ></el-button>
        </el-input>
        <el-button
          type="success"
          @click="$router.push({ name: `goodsadd` })"
          plain
          >添加商品</el-button
        >
      </el-col>
    </el-row>
    <!-- 表格 -->
    <el-table
      class="table"
      :data="goodsList"
      max-height="460"
      style="width: 100%"
    >
      <el-table-column type="index" label="#" width="100"> </el-table-column>
      <el-table-column prop="goods_name" label="商品名称"> </el-table-column>
      <el-table-column prop="goods_price" label="商品价格"> </el-table-column>
      <el-table-column prop="goods_number" label="商品数量"> </el-table-column>
      <el-table-column label="创建日期">
        <!-- slot-scope传一个最外层数据源 -->
        <template slot-scope="scope">
          {{ scope.row.add_time | fmtdate }}
        </template>
      </el-table-column>
      <el-table-column prop="address" label="操作">
        <template slot-scope="scope">
          <!-- size="mini"尺寸  plain透明底色 circle圆形按钮-->
          <el-button
            size="mini"
            type="primary"
            icon="el-icon-edit"
            @click="showUpdateGoods(scope.row)"
            plain
            circle
          ></el-button>
          <el-button
            size="mini"
            type="danger"
            icon="el-icon-delete"
            @click="deleteGoods(scope.row.id)"
            plain
            circle
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      //搜索框内容
      query: "",
      goodsList: [],
      //分页
      total: -1,
      pagenum: 1,
      pagesize: 3,
    };
  },
  created() {
    this.getGoodsList();
  },
  methods: {
    handleSizeChange(val) {
      this.pagesize = val;
      this.pagenum = 1;
      this.getGoodsList();
    },
    handleCurrentChange(val) {
      this.pagenum = val;
      this.getGoodsList();
    },
    loadGoodsList() {
      this.getGoodsList();
    },
    queryGoods() {
      this.getGoodsList();
    },
    // 获取商品列表
    getGoodsList() {
      this.$http
        .get(
          `goods?query=${this.query}&pagenum=${this.pagenum}&pagesize=${this.pagesize}`
        )
        .then((res) => {
          console.log(res);
          const {
            meta: { status, msg },
            data: { goods, total },
          } = res.data;
          if (status === 200) {
            //表格数据赋值
            this.goodsList = goods;
            //total赋值
            this.total = total;
            //提示
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
  width: 350px;
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