<template>
  <div>
    <!-- 卡片视图区域 -->
    <el-card>
      <!-- 搜索与添加区域 -->
      <el-row :gutter="10">
        <el-col :span="3">
          <el-button type="primary" @click="addDialogVisible = true"
            >添加教学周期</el-button
          >
        </el-col>
      </el-row>

      <!-- 教学周期列表区域 -->
      <el-table :data="teachinglist" border stripe>
        <el-table-column label="标题" prop="title"></el-table-column>
        <el-table-column label="开始时间" prop="starttime">
          <template slot-scope="scope">
            <div>
              {{ scope.row.starttime | showDate }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="结束时间" prop="endtime">
          <template slot-scope="scope">
            <div>
              {{ scope.row.endtime | showDate }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="无课日期" prop="no_class"></el-table-column>
        <el-table-column label="上午上课" prop="am_class"></el-table-column>
        <el-table-column label="下午上课" prop="pm_class"></el-table-column>
        <el-table-column label="操作" width="180px">
          <template slot-scope="scope">
            <!-- 修改按钮 -->
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="showEditDialog(scope.row.id)"
            ></el-button>
            <!-- 删除按钮 -->
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="removeTeachingById(scope.row.id)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页区域 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[5, 10, 15]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>

    <!-- 修改教学周期的对话框 -->
    <el-dialog
      title="修改教学周期"
      :visible.sync="editDialogVisible"
      width="60%"
      @close="editDialogVisible = false"
    >
      <el-form
        :model="editForm"
        :rules="FormRules"
        ref="editFormRef"
        label-width="140px"
      >
        <el-form-item label="教学周期标题" prop="title">
          <el-input v-model="editForm.title"></el-input>
        </el-form-item>
        <el-form-item label="开始日期" prop="starttime">
          <el-date-picker
            v-model="editForm.starttime"
            type="date"
            placeholder="选择开始日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="结束日期" prop="endtime">
          <el-date-picker
            v-model="editForm.endtime"
            type="date"
            placeholder="选择结束日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="没有课程日期" prop="no_class">
          <el-select
            v-model="editForm.no_class"
            multiple
            placeholder="请选择"
            style="width: 100%"
          >
            <el-option
              v-for="item in editoptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="上午上课日期" prop="am_class">
          <el-select
            v-model="editForm.am_class"
            multiple
            placeholder="请选择"
            style="width: 100%"
          >
            <el-option
              v-for="item in editoptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="下午上课日期" prop="pm_class">
          <el-select
            v-model="editForm.pm_class"
            multiple
            placeholder="请选择"
            style="width: 100%"
          >
            <el-option
              v-for="item in editoptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editDepartment">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 添加教学周期的对话框 -->
    <el-dialog
      title="添加教学周期"
      :visible.sync="addDialogVisible"
      width="60%"
      @close="addDialogVisible = false"
    >
      <el-form
        :model="addForm"
        :rules="FormRules"
        ref="addFormRef"
        label-width="140px"
      >
        <el-form-item label="教学周期标题" prop="title">
          <el-input v-model="addForm.title"></el-input>
        </el-form-item>
        <el-form-item label="开始日期" prop="starttime">
          <el-date-picker
            v-model="addForm.starttime"
            type="date"
            placeholder="选择开始日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="结束日期" prop="endtime">
          <el-date-picker
            v-model="addForm.endtime"
            type="date"
            placeholder="选择结束日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="没有课程日期" prop="no_class">
          <el-select
            v-model="addForm.no_class"
            multiple
            placeholder="请选择"
            style="width: 100%"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="上午上课日期" prop="am_class">
          <el-select
            v-model="addForm.am_class"
            multiple
            placeholder="请选择"
            style="width: 100%"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="下午上课日期" prop="pm_class">
          <el-select
            v-model="addForm.pm_class"
            multiple
            placeholder="请选择"
            style="width: 100%"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addTeaching">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  getTeaching,
  addTeaching,
  removeTeaching,
  getTeachingItem,
  editTeachingItem,
} from "network/api/teachingcycle";
export default {
  data() {
    return {
      queryInfo: {
        query: "",
        // 当前的页数
        pagenum: 1,
        // 当前每页显示多少条数据
        pagesize: 5,
      },
      total: 0,
      teachinglist: null,
      // 添加表单数据
      addForm: {
        title: "",
        starttime: "",
        endtime: "",
        no_class: "",
        am_class: "",
        pm_class: "",
      },
      options: [
        { value: "请先选择开始与结束日期", label: "请先选择开始与结束日期" },
      ],
      optionsall: [],

      // 添加、修改表单的验证规则对象
      FormRules: {
        title: [
          { required: true, message: "请输入教学中其名称", trigger: "blur" },
          {
            min: 2,
            max: 10,
            message: "教学周期标题的长度在2~10个字符之间",
            trigger: "blur",
          },
        ],
        starttime: [
          { required: true, message: "请选择开始时间", trigger: "blur" },
        ],
        endtime: [
          { required: true, message: "请选择结束时间", trigger: "blur" },
        ],
      },
      // 控制修改部门对话框的显示与隐藏
      editDialogVisible: false,
      addDialogVisible: false,
      // 查询到的信息对象
      editForm: {
        title: "",
        starttime: "",
        endtime: "",
        no_class: "",
        am_class: "",
        pm_class: "",
      },
      editoptions: [
        { value: "请先选择开始与结束日期", label: "请先选择开始与结束日期" },
      ],
      editoptionsall: [],
    };
  },
  created() {
    this.getTeaching();
  },
  filters: {
    showDate: function (value) {
      var moment = require("moment");
      let date = moment(value);
      return date.format("YYYY年MM月DD日");
    },
  },
  watch: {
    "addForm.endtime": function (content) {
      if ((this.addForm.starttime == "") & (this.addForm.endtime != "")) {
        this.$message.error("请先选择开始日期");
        this.addForm.endtime = "";
      } else {
        var moment = require("moment");
        let start = moment(this.addForm.starttime);
        let end = moment(this.addForm.endtime);
        this.options = [];
        while (start < end + 1) {
          const obj = {};
          obj.value = start.format("YYYY-MM-DD");
          obj.label = start.format("YYYY-MM-DD");
          this.options.push(obj);
          this.optionsall.push(obj);
          start = start.add(1, "days");
        }
      }
    },
    "addForm.no_class": function (content) {
      if ((content != "") & (content != undefined)) {
        console.log('content',content);
        let op = JSON.stringify(this.optionsall);
        let op1 = JSON.parse(op);
        console.log('qqqqqqq',op1);
        let op2 = []
        this.options = [];
        op1.forEach(item=>{
          op2.push(item.value)
        })
         console.log('suoyou',content.concat(this.addForm.am_class).concat(this.addForm.pm_class));
        const arr = content.concat(this.addForm.am_class).concat(this.addForm.pm_class)
        const arr2 = op2.filter(v => !arr.find((item) => item == v))
        console.log('arr2',arr2);
        arr2.forEach(item=>{
          const obj={}
          obj.value = item
          obj.label = item
          this.options.push(obj)
        })
      }
    },
    "addForm.am_class": function (content) {
       if ((content != "") & (content != undefined)) {
        let op = JSON.stringify(this.optionsall);
        let op1 = JSON.parse(op);
        let op2 = []
        this.options=[]
        op1.forEach(item=>{
          op2.push(item.value)
        })
        const arr = content.concat(this.addForm.no_class).concat(this.addForm.pm_class)
        const arr2 = op2.filter(v => !arr.find((item) => item == v))
        arr2.forEach(item=>{
          const obj={}
          obj.value = item
          obj.value = item
          this.options.push(obj)
        })
      }
    },
    "addForm.pm_class": function (content) {
       if ((content != "") & (content != undefined)) {
        let op = JSON.stringify(this.optionsall);
        let op1 = JSON.parse(op);
        let op2 = []
        this.options=[]
        op1.forEach(item=>{
          op2.push(item.value)
        })
        const arr = content.concat(this.addForm.am_class).concat(this.addForm.no_class)
        const arr2 = op2.filter(v => !arr.find((item) => item == v))
        
        arr2.forEach(item=>{
          const obj={}
          obj.value = item
          obj.value = item
          this.options.push(obj)
        })
      }
    },
    "editForm.endtime": function (content) {
      if ((this.editForm.starttime == "") & (this.editForm.endtime != "")) {
        this.$message.error("请先选择开始日期");
        this.editForm.endtime = "";
      } else {
        var moment = require("moment");
        let start = moment(this.editForm.starttime);
        let end = moment(this.editForm.endtime);
        this.editoptions = [];
        while (start < end + 1) {
          const obj = {};
          obj.value = start.format("YYYY-MM-DD");
          obj.label = start.format("YYYY-MM-DD");
          this.editoptions.push(obj);
          this.editoptionsall.push(obj);
          start = start.add(1, "days");
        }
      }
    },
    "editForm.no_class": function (content) {
      if ((content != "") & (content != undefined)) {
        let op = JSON.stringify(this.editoptionsall);
        let op1 = JSON.parse(op);
        let op2 = []
        this.editoptions=[]
        op1.forEach(item=>{
          op2.push(item.value)
        })
        const arr = content.concat(this.editForm.am_class).concat(this.editForm.pm_class)
        const arr2 = op2.filter(v => !arr.find((item) => item == v))
        arr2.forEach(item=>{
          const obj={}
          obj.value = item
          obj.value = item
          this.editoptions.push(obj)
        })
      }
    },
    "editForm.am_class": function (content) {
     if ((content != "") & (content != undefined)) {
        let op = JSON.stringify(this.editoptionsall);
        let op1 = JSON.parse(op);
        let op2 = []
        this.editoptions=[]
        op1.forEach(item=>{
          op2.push(item.value)
        })
        const arr = content.concat(this.editForm.no_class).concat(this.editForm.pm_class)
        const arr2 = op2.filter(v => !arr.find((item) => item == v))
        arr2.forEach(item=>{
          const obj={}
          obj.value = item
          obj.value = item
          this.editoptions.push(obj)
        })
      }
    },
    "editForm.pm_class": function (content) {
      if ((content != "") & (content != undefined)) {
        let op = JSON.stringify(this.editoptionsall);
        let op1 = JSON.parse(op);
        let op2 = []
        this.editoptions=[]
        op1.forEach(item=>{
          op2.push(item.value)
        })
        const arr = content.concat(this.editForm.no_class).concat(this.editForm.am_class)
        const arr2 = op2.filter(v => !arr.find((item) => item == v))
        arr2.forEach(item=>{
          const obj={}
          obj.value = item
          obj.value = item
          this.editoptions.push(obj)
        })
      }
    },
  },
  methods: {
    //获取教学周期列表
    async getTeaching() {
      const pagenum = this.queryInfo.pagenum;
      const pagesize = this.queryInfo.pagesize;
      const res = await getTeaching(pagenum, pagesize);
      this.total = res.count;

      res.data.forEach((item) => {
        item.no_class.split('"').forEach((item2) => {
          if (item2.length > 1) {
            // item.no_class = item2.split(",");
            item.no_class = item2;
          }
        });
        item.am_class.split('"').forEach((item2) => {
          if (item2.length > 1) {
            item.am_class = item2;
          }
        });
        item.pm_class.split('"').forEach((item2) => {
          if (item2.length > 1) {
            item.pm_class = item2;
          }
        });
      });
      this.teachinglist = res.data;
    },
    // 监听 pagesize 改变的事件
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize;
      this.getTeaching();
    },
    // 监听 页码值 改变的事件
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage;
      this.getTeaching();
    },

    addTeaching() {
      this.$refs.addFormRef.validate(async (valid) => {
        if (!valid) return;
        // 可以发起添加用户的网络请求
        // this.addForm.no_class = '"' + this.addForm.no_class + '"';
        // this.addForm.am_class = '"' + this.addForm.am_class + '"';
        // this.addForm.pm_class = '"' + this.addForm.pm_class + '"';
        // this.addForm.no_class = String(this.addForm.no_class);
        // this.addForm.am_class = String(this.addForm.am_class);
        // this.addForm.pm_class = String(this.addForm.pm_class);
        const res = await addTeaching(this.addForm);
        (this.addForm = {
          title: "",
          starttime: "",
          endtime: "",
          no_class: "",
          am_class: "",
          pm_class: "",
        }),
          (this.addDialogVisible = false);
        this.getTeaching();
      });
    },

    // 展示编辑的对话框
    async showEditDialog(id) {
      const result = await getTeachingItem(id);
      console.log(result);
      console.log(result.am_class);
      this.editForm = result;
      this.editForm.no_class.split('"').forEach((item) => {
        if (item.length > 1) {
          this.editForm.no_class = item.split(",");
        }
      });
      this.editForm.am_class.split('"').forEach((item) => {
        if (item.length > 1) {
          this.editForm.am_class = item.split(",");
        }
      });
      this.editForm.pm_class.split('"').forEach((item) => {
        if (item.length > 1) {
          this.editForm.pm_class = item.split(",");
        }
      });
      this.editDialogVisible = true;
    },
    // 监听修改教学周期对话框的关闭事件
    editDialogClosed() {
      this.$refs.editFormRef.resetFields();
    },
    // 修改教学周期信息并提交
    editDepartment() {
      this.$refs.editFormRef.validate(async (valid) => {
        if (!valid) return;
        let id = this.editForm.id;
        delete this.editForm.id;
        // 发起修改用户信息的数据请求
        this.editForm.no_class = '"' + this.editForm.no_class + '"';
        this.editForm.am_class = '"' + this.editForm.am_class + '"';
        this.editForm.pm_class = '"' + this.editForm.pm_class + '"';
        const result = await editTeachingItem(id, this.editForm);

        if (result) {
          this.getTeaching();
          // 关闭对话框
          this.editDialogVisible = false;
          // 提示修改成功
          this.$message.success("更新职位信息成功！");
        }
      });
    },
    // 根据Id删除对应的用户信息
    async removeTeachingById(id) {
      // 弹框询问用户是否删除数据
      const confirmResult = await this.$confirm(
        "此操作将永久删除该职位, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => err);
      if (confirmResult !== "confirm") {
        return this.$message.info("已取消删除");
      }
      removeTeaching(id).then((value) => {
        this.$message.success("删除职位成功！");
        this.getTeaching();
      });
    },
  },
};
</script>

<style lang="less" scoped>
</style>
