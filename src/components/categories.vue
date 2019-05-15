<template>
  <div class="categories">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品分类</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 输入搜索框 -->
    <el-row>
      <el-col :span="24">
        <el-button type="success" plain>添加分类</el-button>
      </el-col>
    </el-row>
    <!-- 表格 -->

    <el-table :data="tableData" row-key="cat_id" border style="width: 100%">
      <el-table-column prop="cat_name" label="分类名称" width="180"></el-table-column>
      <el-table-column prop label="级别" width="180">
        <template slot-scope="scope">
          {{scope.row.cat_level==0?"一级":""}}
          {{scope.row.cat_level==1?"二级":""}}
          {{scope.row.cat_level==2?"三级":""}}
        </template>
      </el-table-column>
      <el-table-column prop label="是否有效" width="180">
        <template slot-scope="scope">{{scope.row.cat_deleted==false?"有效":"无效"}}</template>
      </el-table-column>
      <el-table-column prop="address" label="操作">
        <template>
          <el-button type="primary" class="el-icon-edit"></el-button>
          <el-button type="danger" class="el-icon-delete"></el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      :current-page="1"
      :page-sizes="[2, 4, 7, 9]"
      :page-size="3"
      layout="total, sizes, prev, pager, next, jumper"
      :total="50"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  name: "categories",
  data() {
    return {
      tableData: [
        {
          date: "1",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "3",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "4",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ]
    };
  },
  async created() {
    const res = await this.$request.getCategories();
    //  console.log(res);
    this.tableData = res.data.data;
  }
};
</script>

<style lang='scss'>
.categories {
  .breadcrumb {
    background-color: #d3dce6;
    height: 45px;
    line-height: 45px;
    font-size: 15px;
    padding-left: 10px;
  }
}
</style>
