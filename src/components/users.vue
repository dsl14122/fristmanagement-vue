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
        <el-input placeholder="请输入内容" @keyup.native.enter="getusers"  v-model="userData.query" class="input-with-select">
          <el-button slot="append" icon="el-icon-search" @click="getusers"></el-button>
        </el-input>
      </el-col>
      <el-col :span="12">
        <el-button type="success" @click="addVisible=true" plain>添加用户</el-button>
      </el-col>
    </el-row>
    <!-- 表格 -->
    <template>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column type="index" width="50"></el-table-column>
        <el-table-column prop="username" label="姓名" width="180"></el-table-column>
        <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
        <el-table-column prop="mobile" label="电话" width="180"></el-table-column>
        <el-table-column prop="mg_state" label="用户状态" width="180">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.mg_state"
              @change="stateChange(scope.row)"
              active-color="#13ce66"
              inactive-color="#ff4949"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="操作">
          <template slot-scope="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              @click="handleEdit(scope.$index, scope.row)"
              size="mini"
              plain
            ></el-button>
            <el-button type="success" icon="el-icon-check" size="mini" plain></el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              @click="handleDelete(scope.$index, scope.row)"
              size="mini"
              plain
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
    <!-- 分页 -->
    <el-pagination
      :current-page="userData.pagenum"
      :page-sizes="[2, 4, 7, 9]"
      :page-size="userData.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change='sizeChange'
      @current-change='currentChange'
    ></el-pagination>
    <!-- 增加用户弹框 -->
    <el-dialog title="添加用户" :visible.sync="addVisible">
      <el-form :model="addForm" :rules="addRules" ref="addForm">
        <el-form-item label="用户名" label-width="120px" prop="username">
          <el-input v-model="addForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="120px" prop="password">
          <el-input v-model="addForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" label-width="120px">
          <el-input v-model="addForm.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" label-width="120px">
          <el-input v-model="addForm.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('addForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "users",

  data() {
    return {
      addVisible: false,
      //总页数条数
      total:0,
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
      },
      addRules: {
        username: [
          { required: true, message: "用户名不为空", trigger: "blur" },
          { min: 5, max: 10, message: "长度在 5 到 10 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "密码不为空", trigger: "blur" },
          { min: 6, max: 12, message: "长度在 6 到 12 个字符", trigger: "blur" }
        ]
      },
      addForm: {
        username: "",
        password: "",
        email: "",
        mobile: ""
      }
    };
  },
  methods: {
    handleEdit(index, row) {
      // console.log(row);
    },
    //删除用户
    handleDelete(index, row) {
      // console.log(row);
      //弹框确认
        this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
          confirmButtonText: '干了它',
          cancelButtonText: '算了吧',
          type: 'warning'
        }).then(() => {
          // 调用接口
          this.$request.deleteUsers(row.id).then(res=>{
              // console.log(res);
              // 重新获取数据
            if (res.data.meta.status == 200) {
               this.getusers();
            }
            })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '算了算了，不干它了'
          });          
        });



      
    },
    //更改状态
    stateChange(row) {
      this.$request
        .updateStatus({ id: row.id, type: row.mg_state })
        .then(res => {
          //  console.log(res);
        });
    },
    //增添用户
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 数据正确
          this.$request.addUsers(this.addForm).then(res => {
            console.log(res);
            // 关闭弹框
            this.addVisible = false;
            // 重新获取数据
            this.getusers();
            // 重置表单
            
          });
        } else {
          // 数据有误
          this.$message.error("数据格式不对！");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 数据获取
    getusers() {
      this.$request.getusers(this.userData).then(res => {
        // console.log(res);
        this.tableData = res.data.data.users;
        this.total=res.data.data.total;
      });
    },
    // 每页条数
    sizeChange(size){
      //  console.log(size);
       this.userData.pagesize=size
     this.getusers();
    },
    // 当前页
    currentChange(current){
    //  console.log(current);
     this.userData.pagenum=current
     this.getusers();
    }
  },
  // 调用接口
  created() {
    this.getusers();
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
