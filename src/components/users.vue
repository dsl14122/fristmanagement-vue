<template>
  <div class="users">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>活动管理</el-breadcrumb-item>
      <el-breadcrumb-item>活动列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 输入搜索框 -->
    <el-row>
      <el-col :span="8">
        <el-input placeholder="请输入内容" v-model="input3" class="input-with-select">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </el-col>
      <el-col :span="12">
        <el-button type="success" plain>添加用户</el-button>
      </el-col>
    </el-row>
    <!-- 表格 -->
    <template>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column type="index" width="50"></el-table-column>
        <el-table-column prop="role_name" label="姓名" width="180"></el-table-column>
        <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
        <el-table-column prop="mobile" label="电话" width="180"></el-table-column>
        <el-table-column prop="mg_state" label="用户状态" width="180">
          <template slot-scope="scope">
          <el-switch v-model="scope.row.mg_state" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="操作">
          
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)" size='mini' plain></el-button>
            <el-button type="success" icon="el-icon-check" size='mini' plain></el-button>
            <el-button type="danger" icon="el-icon-delete" @click="handleDelete(scope.$index, scope.row)" size='mini' plain></el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
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
  name: "users",
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
      ],
      userData: {
        query: "",
        pagenum: 1,
        pagesize: 10
      }
    };
  },
  methods: {
    handleEdit(index,row){
    console.log(row);

    },
    handleDelete(index,row){
     console.log(row);
    }
  },
  // 调用接口
  created() {
    this.$request.getusers(this.userData).then(res => {
      // console.log(res);
      this.tableData = res.data.data.users;
    });
  }
};
</script>

<style lang='scss'>
.users {
  .breadcrumb {
    background-color: #d3dce6;
    height: 45px;
    line-height: 45px;
    font-size: 15px;
    padding-left: 10px;
  }
}
</style>
