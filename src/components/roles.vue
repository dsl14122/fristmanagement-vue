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
        <el-button type="success" @click="addVisible=true" plain>添加角色</el-button>
      </el-col>
    </el-row>
    <!-- 表格 -->
    <template>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <!-- 第一层 -->
            <el-row v-for="(item1,index) in props.row._children" :key="index">
              <el-col :span="6">
                <el-tag
                  :key="item1.id"
                  @close="delRights(props.row,item1.id)"
                  closable
                  type="primary"
                >{{item1.authName}}</el-tag>
                <span class="el-icon-arrow-right"></span>
              </el-col>
              <el-col :span="18">
                <!-- 第二层 -->
                <el-row v-for="(item2,i) in item1.children" :key="i">
                  <el-col :span="6">
                    <el-tag
                      :key="item2.id"
                      @close="delRights(props.row,item2.id)"
                      closable
                      type="success"
                    >{{item2.authName}}</el-tag>
                    <span class="el-icon-arrow-right"></span>
                  </el-col>
                  <el-col :span="18">
                    <!-- 第三层 -->
                    <el-tag
                      class="my-tag"
                      v-for="(item3,j) in item2.children"
                      :key="item3.id"
                      @close="delRights(props.row,item3.id)"
                      closable
                      type="warning"
                    >{{item3.authName}}</el-tag>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>
        </el-table-column>

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
    <!-- 权限弹框 -->
    <el-dialog title="分配权限" :visible.sync="rightsVisible">
      <el-tree
        :data="rightsData"
        :props="rightsProps"
        show-checkbox
        default-expand-all
        node-key="id"
        ref="tree"
        :default-checked-keys="defaultCheckedKeys"
      ></el-tree>
      <div slot="footer" class="dialog-footer">
        <el-button @click="rightsVisible = false">取 消</el-button>
        <el-button type="primary" @click="setRolerights">确 定</el-button>
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
        roleDesc: ""
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
        roleDesc: ""
      },
      //权限分配
      rightsVisible: false,
      rightsForm: {},
      rightsData: [],
      rightsProps: {
        children: "children",
        label: "authName"
      },
      //默认选中权限
      defaultCheckedKeys: []
    };
  },
  created() {
    this.getRoles();
  },
  methods: {
    //角色编辑
    async handleEdit(row) {
      this.editVisible = true;
      // console.log(row);
      const res = await this.$request.selectRolesById(row.id);
      // console.log(res);
      // 获取数据
      this.editForm = res.data.data;
    },
    //分配角色
    async handleRole(row) {
      // console.log(row);
      this.rightsVisible = true;
      this.rightsForm = row;
      const res = await this.$request.getTreeRights();
      console.log(res);
      this.rightsData = res.data.data;
      let checkedIds = [];
      function getCheckedKeys(item) {
        // 查找后代的children 如果有 就遍历 并且 添加到数组中
        item._children.forEach(v => {
          checkedIds.push(v.id);
          if (v.children) {
            v._children = v.children;
            getCheckedKeys(v);
          }
        });
      }
      getCheckedKeys(row);
      // 设置到data中
      this.defaultCheckedKeys = checkedIds;
    },
    // 弹框删除事件
    handleDelete(row) {
      console.log(row);
      //弹框提示
      this.$confirm("此操作将永久删除该信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          const res = await this.$request.deleteRoles(row.id);
          console.log(res);
          if (res.data.meta.status == 200) {
            this.getRoles();
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },

    //数据渲染
    async getRoles() {
      const res = await this.$request.getRoles();
      console.log(res);
      let data = res.data.data;
      data.forEach(v => {
        v._children = v.children;
        //删除children
        delete v.children;
      });
      this.tableData = data;
    },

    //增添用户
    submitForm(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          // 数据正确
          if (formName == "editForm") {
            this.editForm.id = this.editForm.roleId;
            const res = await this.$request.editRoles(this.editForm);
            // console.log(res);
            if (res.data.meta.status == 200) {
              //重新获取数据
              this.getRoles();
              //  关闭弹框
              this.editVisible = false;
              this.$refs[formName].resetFields();
            }
          } else if (formName == "roleForm") {
            const res = await this.$request.updateRoles({
              id: this.roleForm.id,
              rid: this.roleValue
            });

            if (res.data.meta.status == 200) {
              // 重新获取角色
              this.getusers();
              // 关闭角色框
              this.roleVisible = false;
            }
          } else {
            const res = await this.$request.addRoles(this.addForm);
            console.log(res);
            // 关闭弹框
            this.addVisible = false;
            // 重新获取数据
            this.getRoles();
            // 重置表单
            this.$refs[formName].resetFields();
          }
        } else {
          // 数据有误
          this.$message.error("数据格式不对！");
          return false;
        }
      });
    },
    // 删除权限
    async delRights(row, rightId) {
      const res = await this.$request.deleteRight({
        roleId: row.id,
        rightId
      });
      row._children = res.data.data;
    },
    // 角色授权
    async setRolerights() {
      // join方法 把数组 按照传入的值 拼接起来
      const rids = this.$refs.tree.getCheckedKeys().join(",");
      const res = await this.$request.setRolerights({
        roleId: this.rightsForm.id,
        rids
      });
      console.log(res);
      if (res.data.meta.status == "200") {
        this.rightsVisible = false;
        this.getRoles();
      }
      //  重新获取菜单数据并保存到vuex中
      this.$request.getMenus().then(res => {
        this.$store.commit("changeMenuList", res.data.data);
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
  .my-tag {
    margin-right: 5px;
    margin-bottom: 5px;
  }
}
</style>
