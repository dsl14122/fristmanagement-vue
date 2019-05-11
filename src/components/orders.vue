<template>
  <div class="orders">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>订单管理</el-breadcrumb-item>
      <el-breadcrumb-item>订单列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 表格 -->
    <template>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column type="index" label="#" width="50"></el-table-column>
        <el-table-column prop="order_number" label="订单编号" width="230"></el-table-column>
        <el-table-column prop="order_price" label="订单价格" width="180"></el-table-column>
        <el-table-column prop="order_" label="是否付款" width="180">
           <template slot-scope="scope">
             <el-button v-if="scope.row.pay_status==0" type="danger" round>未付款</el-button>
             <el-button v-else type="success" round>已付款</el-button>
           </template>
        </el-table-column>
        <el-table-column prop="is_send" label="是否发货" width="180"></el-table-column>
        <el-table-column prop="create_time" label="下单时间" width="180">
           <template slot-scope="scope">
            {{scope.row.create_time | forMathTime}}
           </template>
        </el-table-column>
        <el-table-column prop="" label="操作">
          <template slot-scope="scope">
           <el-button
              type="primary"
              icon="el-icon-edit"
              @click="handleEdit(scope.row)"
              size="mini"
              plain
            ></el-button>
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
import moment from 'moment'
export default {
  name: "orders",
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
      ordersData:{
         query:'',
         pagenum:1,
         pagesize:10,
      }
    };
  },
  filters:{
    forMathTime(value){
          return  moment(value).format("YYYY-MM-DD HH:mm:ss");
    }
  },
  created() {
     this.$request.getOrders(this.ordersData).then(res=>{
       console.log(res);
       this.tableData=res.data.data.goods
       
     })
  },
};
</script>

<style lang='scss'>
.orders {
  .breadcrumb {
    background-color: #d3dce6;
    height: 45px;
    line-height: 45px;
    font-size: 15px;
    padding-left: 10px;
  }
}
</style>
