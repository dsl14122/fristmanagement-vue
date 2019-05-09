<template>
  <div class="roles">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 输入搜索框 -->
    <el-row>
      <el-col :span="24">
        <el-button type="success" @click='addVisible=true' plain>添加角色</el-button>
      </el-col>
    </el-row>
    <!-- 表格 -->
    <template>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop label=" " width="30"></el-table-column>
        <el-table-column type="index" width="50"></el-table-column>
        <el-table-column prop="roleName" label="角色名称" width="180"></el-table-column>
        <el-table-column prop="roleDesc" label="角色描述" width="180"></el-table-column>
        <el-table-column prop="address" label="操作">
          <template slot-scope="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              @click="handleEdit(scope.row)"
              size="mini"
              plain
            ></el-button>
            <el-button
              type="success"
              icon="el-icon-check"
              @click="handleRole(scope.row)"
              size="mini"
              plain
            ></el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              @click="handleDelete(scope.row)"
              size="mini"
              plain
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
    <!-- 增加角色弹框 -->
    <el-dialog title="添加角色" :visible.sync="addVisible">
      <el-form :model="addForm" :rules="addRules" ref="addForm">
        <el-form-item label="角色名称" label-width="120px" prop="roleName">
          <el-input v-model="addForm.roleName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" label-width="120px" prop="roleDesc">
          <el-input v-model="addForm.roleDesc" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('addForm')">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 修改角色弹框 -->
    <el-dialog title="编辑角色" :visible.sync="editVisible">
      <el-form :model="editForm" :rules="editRules" ref="editForm">
        <el-form-item label="角色名称" label-width="120px" prop="roleName">
          <el-input v-model="editForm.roleName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" label-width="120px" prop="roleDesc">
          <el-input v-model="editForm.roleDesc" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('editForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "roles",
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
      //  添加角色
      addVisible: false,
      addRules: {
        roleName: [
          { required: true, message: "角色名称不为空", trigger: "blur" },
          { min: 2, max: 10, message: "长度在 2 到 10 个字符", trigger: "blur" }
        ],
        roleDesc: [
          { required: true, message: "角色描述不为空", trigger: "blur" },
          { min: 0, max: 12, message: "长度在 0 到 12 个字符", trigger: "blur" }
        ]
      },
      addForm: {
        roleName: "",
        roleDesc: "",
      },

      //  编辑角色
      editVisible: false,
      editRules: {
        roleName: [
          { required: true, message: "角色名称不为空", trigger: "blur" },
          { min: 2, max: 10, message: "长度在 2 到 10 个字符", trigger: "blur" }
        ],
        roleDesc: [
          { required: true, message: "角色描述不为空", trigger: "blur" },
          { min: 0, max: 12, message: "长度在 0 到 12 个字符", trigger: "blur" }
        ]
      },
      editForm: {
        roleName: "",
        roleDesc: "",
      },


    };
  },
  created() {
    this.getRoles();
  },
  methods: {
    //角色编辑
    handleEdit(row) {
        this.editVisible=true;
        // console.log(row);
        this.$request.selectRolesById(row.id).then(res=>{
            // console.log(res);
            // 获取数据
             this.editForm=res.data.data
        })

    },
    //角色添加
    handleRole(row) {
      // console.log(row);
      
        // this.$request
    },
    // 弹框删除事件
    handleDelete(row) {
      console.log(row);
      //弹框提示
       this.$confirm('此操作将永久删除该信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
             this.$request.deleteRoles(row.id).then(res=>{
                console.log(res);
                if(res.data.meta.status==200){
                 this.getRoles();
                }

             })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
       
    },

    //数据渲染
    getRoles() {
      this.$request.getRoles().then(res => {
        console.log(res);
        let data = res.data.data;
        data.forEach(v => {
          v._children = v.children;
          //删除children
          delete v.children;
        });
        this.tableData = data;
      });
    },

    //增添用户
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 数据正确
          if (formName == "editForm") {
            this.editForm.id = this.editForm.roleId;
            this.$request.editRoles(this.editForm).then(res => {
              // console.log(res);
              if (res.data.meta.status == 200) {
                //重新获取数据
                this.getRoles();
                //  关闭弹框
                this.editVisible = false;
                this.$refs[formName].resetFields();
              }
            });
          } else if (formName == "roleForm") {
            this.$request
              .updateRoles({
                id: this.roleForm.id,
                rid: this.roleValue
              })
              .then(res => {
                if (res.data.meta.status == 200) {
                  // 重新获取角色
                  this.getusers();
                  // 关闭角色框
                  this.roleVisible = false;
                 
                }
              });
          } else {
            this.$request.addRoles(this.addForm).then(res => {
              console.log(res);
              // 关闭弹框
              this.addVisible = false;
              // 重新获取数据
              this.getRoles();
              // 重置表单
              this.$refs[formName].resetFields();
            });
          }
        } else {
          // 数据有误
          this.$message.error("数据格式不对！");
          return false;
        }
      });
    }
  }
};
</script>

<style lang='scss'>
.roles {
  .breadcrumb {
    background-color: #d3dce6;
    height: 45px;
    line-height: 45px;
    font-size: 15px;
    padding-left: 10px;
  }
}
</style>
