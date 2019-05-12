<template>
  <div class="params">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>分类参数</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 警告栏 -->
    <el-alert class="alert" title="注意：只允许为第三级分类设置相关参数！" type="warning" show-icon></el-alert>
    <!-- 级联 -->
    <div class="jilian">
      <span>请选择商品分类：</span>&nbsp;&nbsp;
      <el-cascader :props="props" @change="change" expand-trigger="hover" :options="options"></el-cascader>
    </div>
    <!-- tabs 标签页 -->
    <el-tabs v-model="activeName">
      <el-tab-pane label="动态参数" name="first">
        <el-button size="small" class="btn" type="primary" disabled>添加动态参数</el-button>
        <!-- 表格 -->
        <template>
          <el-table :data="dynameicTable" border style="width: 100%">
            <el-table-column prop="date" label=" " width="50"></el-table-column>
            <el-table-column type="index" width="50"></el-table-column>
            <el-table-column prop="attr_name" label="商品参数" width="180"></el-table-column>
            <el-table-column prop="address" label="操作">
              <el-button
                type="primary"
                icon="el-icon-edit"

                size="mini"
                plain
              ></el-button>
              <el-button
                type="danger"
                icon="el-icon-delete"

                size="mini"
                plain
              ></el-button>
            </el-table-column>
          </el-table>
        </template>
      </el-tab-pane>
      <el-tab-pane label="静态参数" name="second">
        <el-button size="small" class="btn" type="primary" disabled>添加静态参数</el-button>
        <!-- 表格 -->
        <template>
          <el-table :data="staticTable" border style="width: 100%">
            <el-table-column type="index" width="50"></el-table-column>
            <el-table-column prop="attr_name" label="属性名称 " width="200"></el-table-column>
            <el-table-column prop="attr_vals" label="属性值" width="300"></el-table-column>
            <el-table-column prop label="操作">
              <el-button
                type="primary"
                icon="el-icon-edit"
               
                size="mini"
                plain
              ></el-button>
              <el-button
                type="danger"
                icon="el-icon-delete"
               
                size="mini"
                plain
              ></el-button>
            </el-table-column>
          </el-table>
        </template>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: "params",
  data() {
    return {
      activeName: "second",
      tableData: [{}],
      options: [
        {
          value: "zhinan",
          label: "指南",
          children: [
            {
              value: "shejiyuanze",
              label: "设计原则",
              children: [
                {
                  value: "yizhi",
                  label: "一致"
                },
                {
                  value: "fankui",
                  label: "反馈"
                },
                {
                  value: "xiaolv",
                  label: "效率"
                },
                {
                  value: "kekong",
                  label: "可控"
                }
              ]
            },
            {
              value: "daohang",
              label: "导航",
              children: [
                {
                  value: "cexiangdaohang",
                  label: "侧向导航"
                },
                {
                  value: "dingbudaohang",
                  label: "顶部导航"
                }
              ]
            }
          ]
        },
        {
          value: "zujian",
          label: "组件",
          children: [
            {
              value: "basic",
              label: "Basic",
              children: [
                {
                  value: "layout",
                  label: "Layout 布局"
                },
                {
                  value: "color",
                  label: "Color 色彩"
                },
                {
                  value: "typography",
                  label: "Typography 字体"
                },
                {
                  value: "icon",
                  label: "Icon 图标"
                },
                {
                  value: "button",
                  label: "Button 按钮"
                }
              ]
            },
            {
              value: "form",
              label: "Form",
              children: [
                {
                  value: "radio",
                  label: "Radio 单选框"
                },
                {
                  value: "checkbox",
                  label: "Checkbox 多选框"
                },
                {
                  value: "input",
                  label: "Input 输入框"
                },
                {
                  value: "input-number",
                  label: "InputNumber 计数器"
                },
                {
                  value: "select",
                  label: "Select 选择器"
                },
                {
                  value: "cascader",
                  label: "Cascader 级联选择器"
                },
                {
                  value: "switch",
                  label: "Switch 开关"
                },
                {
                  value: "slider",
                  label: "Slider 滑块"
                },
                {
                  value: "time-picker",
                  label: "TimePicker 时间选择器"
                },
                {
                  value: "date-picker",
                  label: "DatePicker 日期选择器"
                },
                {
                  value: "datetime-picker",
                  label: "DateTimePicker 日期时间选择器"
                },
                {
                  value: "upload",
                  label: "Upload 上传"
                },
                {
                  value: "rate",
                  label: "Rate 评分"
                },
                {
                  value: "form",
                  label: "Form 表单"
                }
              ]
            },
            {
              value: "data",
              label: "Data",
              children: [
                {
                  value: "table",
                  label: "Table 表格"
                },
                {
                  value: "tag",
                  label: "Tag 标签"
                },
                {
                  value: "progress",
                  label: "Progress 进度条"
                },
                {
                  value: "tree",
                  label: "Tree 树形控件"
                },
                {
                  value: "pagination",
                  label: "Pagination 分页"
                },
                {
                  value: "badge",
                  label: "Badge 标记"
                }
              ]
            },
            {
              value: "notice",
              label: "Notice",
              children: [
                {
                  value: "alert",
                  label: "Alert 警告"
                },
                {
                  value: "loading",
                  label: "Loading 加载"
                },
                {
                  value: "message",
                  label: "Message 消息提示"
                },
                {
                  value: "message-box",
                  label: "MessageBox 弹框"
                },
                {
                  value: "notification",
                  label: "Notification 通知"
                }
              ]
            },
            {
              value: "navigation",
              label: "Navigation",
              children: [
                {
                  value: "menu",
                  label: "NavMenu 导航菜单"
                },
                {
                  value: "tabs",
                  label: "Tabs 标签页"
                },
                {
                  value: "breadcrumb",
                  label: "Breadcrumb 面包屑"
                },
                {
                  value: "dropdown",
                  label: "Dropdown 下拉菜单"
                },
                {
                  value: "steps",
                  label: "Steps 步骤条"
                }
              ]
            },
            {
              value: "others",
              label: "Others",
              children: [
                {
                  value: "dialog",
                  label: "Dialog 对话框"
                },
                {
                  value: "tooltip",
                  label: "Tooltip 文字提示"
                },
                {
                  value: "popover",
                  label: "Popover 弹出框"
                },
                {
                  value: "card",
                  label: "Card 卡片"
                },
                {
                  value: "carousel",
                  label: "Carousel 走马灯"
                },
                {
                  value: "collapse",
                  label: "Collapse 折叠面板"
                }
              ]
            }
          ]
        },
        {
          value: "ziyuan",
          label: "资源",
          children: [
            {
              value: "axure",
              label: "Axure Components"
            },
            {
              value: "sketch",
              label: "Sketch Templates"
            },
            {
              value: "jiaohu",
              label: "组件交互文档"
            }
          ]
        }
      ],
      // 级联选择器的对应关系
      props: {
        value: "cat_id",
        label: "cat_name",
        children: "children"
      },
      // 静态数据
      staticTable: [],
      // 动态数据
      dynameicTable: []
    };
  },
  created() {
    this.$request.getCategories().then(res => {
      console.log(res);
      this.options = res.data.data;
    });
  },
  methods: {
    change(value) {
      if (value.length == 3) {
        const id = value[2];

        this.$request.getStatic(id).then(res => {
          // console.log(res);
          this.staticTable = res.data.data;
        });
        this.$request.getDynamic(id).then(res => {
          console.log(res);
          this.dynameicTable = res.data.data;
        });
      }
    }
  }
};
</script>

<style lang='scss'>
.params {
  .breadcrumb {
    background-color: #d3dce6;
    height: 45px;
    line-height: 45px;
    font-size: 15px;
    padding-left: 10px;
  }
  .alert {
    margin-top: 20px;
  }
  .jilian {
    margin: 20px 0;
  }
  .btn {
    margin-bottom: 20px;
  }
}
</style>
