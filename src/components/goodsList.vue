<template>
    <div id="goodsList">
        <!-- 输入搜索框 -->
    <el-row>
      <el-col :span="8">
        <el-input placeholder="请输入内容"  class="input-with-select">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </el-col>
      <el-col :span="12">
        <el-button type="success" @click="$router.push('goods/add')" plain>添加商品</el-button>
      </el-col>
    </el-row>
    <!-- 表格 -->
    <template>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column type="index" label="#" width="50"></el-table-column>
        <el-table-column prop="goods_name" label="商品名称" width="600"></el-table-column>
        <el-table-column prop="goods_price" label="商品价格(元)" width="120"></el-table-column>
        <el-table-column prop="goods_weight" label="商品重量" width="80"></el-table-column>
        <el-table-column prop="name" label="创建时间" width="180">
          <template slot-scope="scope">{{scope.row.add_time | forMathTime}}</template>
        </el-table-column>
        <el-table-column prop="address" label="操作">
          <template slot-scope="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              @click="editVisible=true"
              size="mini"
              plain
            ></el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini" plain></el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
    <!-- 分页 -->
    <el-pagination
      :current-page="goodsData.pagenum"
      :page-sizes="[2, 4, 7, 10]"
      :page-size="goodsData.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="sizeChange"
      @current-change="currentChange"
    ></el-pagination>
    </div>
</template>

<script>
// 日期导入
import moment from "moment";
export default {
 name:"goodsList",
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
      goodsData: {
        query: "",
        pagenum: 1,
        pagesize: 10
      },
      // 总页数
      total: ""
    };
  },
  created() {
    this.getgoods();
  },
  filters: {
    forMathTime(value) {
      return moment(value).format("YYYY-MM-DD HH:mm:ss");
    }
  },
  methods: {
    getgoods() {
      this.$request.getGoods(this.goodsData).then(res => {
        console.log(res);
        this.tableData = res.data.data.goods;
        this.total = res.data.data.total;
      });
    },
    // 每页条数
    sizeChange(size) {
      //  console.log(size);
      this.goodsData.pagesize = size;
      this.getgoods();
    },
    // 当前页
    currentChange(current) {
      //  console.log(current);
      this.goodsData.pagenum = current;
      this.getgoods();
    }
  }
}
</script>

<style>

</style>
