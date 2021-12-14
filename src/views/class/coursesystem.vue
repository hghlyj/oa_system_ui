<template>
  <div>
    <!-- 卡片视图区域 -->
    <el-card>
      <!-- 搜索与添加区域 -->
      <el-row :gutter="10">
        <el-col :span="4">
          <el-select
            v-model="queryInfo.department_id"
            clearable
            placeholder="请选择学院"
            @clear="getClassList()"
          >
            <el-option
              v-for="item in collegesOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="2">
          <el-button
            type="primary"
            icon="el-icon-search"
            @click="getClassList()"
            >搜索</el-button
          >
        </el-col>
        <el-col :span="3">
          <el-button type="primary" @click="addDialogVisible = true"
            >添加课程</el-button
          >
        </el-col>
      </el-row>

      <!-- 用户列表区域 -->
      <el-table :data="courseList" border stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="学院" prop="school"></el-table-column>
        <el-table-column label="课程名称" prop="name"></el-table-column>
        <el-table-column label="课程阶段" prop="stage"></el-table-column>
        <el-table-column
          label="所属教研室"
          prop="college_stage"
        ></el-table-column>
        <el-table-column label="版本" prop="version"></el-table-column>
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
              @click="removeRoleById(scope.row.id)"
            ></el-button>
            <el-tooltip
              effect="dark"
              content="排课"
              placement="top"
              :enterable="false"
            >
              <el-button
                type="warning"
                icon="el-icon-setting"
                size="mini"
                @click="showCoursePlan(scope.row.id)"
              ></el-button>
            </el-tooltip>
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

    <!-- 添加课程的对话框 -->
    <el-dialog
      title="添加课程"
      :visible.sync="addDialogVisible"
      width="50%"
      @close="addDialogVisible = false"
    >
      <el-form
        :model="addForm"
        :rules="FormRules"
        ref="addFormRef"
        label-width="70px"
      >
        <el-form-item label="课程名称" prop="name" label-width="85px">
          <el-input v-model="addForm.name"></el-input>
        </el-form-item>
        <el-form-item label="学院" prop="school_id" label-width="85px">
          <el-select
            v-model="addForm.school_id"
            placeholder="请选择学院"
            @change="handleCollegeChanged"
          >
            <el-option
              v-for="item in collegesOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="教研室" prop="college_stage_id" label-width="85px">
          <el-select
            v-model="addForm.college_stage_id"
            placeholder="请选择学院教研室"
          >
            <el-option
              v-for="item in collegeStageOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="课程阶段" prop="stage" label-width="85px">
          <el-input v-model="addForm.stage"></el-input>
        </el-form-item>
        <el-form-item label="课程版本" prop="version" label-width="85px">
          <el-input v-model="addForm.version"></el-input>
        </el-form-item>
        <el-form-item label="排序" prop="sort" label-width="85px">
          <el-input type="number" v-model="addForm.sort"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addCourse">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getallDepartment } from "network/api/department";
import { getCourses, createCourse } from "network/api/course";
import { getCollegeStageByCollegeId } from "network/api/college_stage";
export default {
  data() {
    return {
      addDialogVisible: false,
      collegesOptions: [],
      collegeStageOptions: [],
      queryInfo: {
        department_id: "",
        // 当前的页数
        pagenum: 1,
        // 当前每页显示多少条数据
        pagesize: 5,
      },
      courseList: [],
      total: 0,
      // 添加表单数据
      addForm: {
        name: "",
        school_id: "",
        sort: 0,
        stage: "",
        version: "",
        college_stage_id: "",
      },
      // 添加、修改表单的验证规则对象
      FormRules: {
        name: [
          { required: true, message: "请输入课程名称", trigger: "blur" },
          {
            min: 2,
            max: 10,
            message: "课程名称的长度在2~10个字符之间",
            trigger: "blur",
          },
        ],
        version: [
          { required: true, message: "请输入课程版本", trigger: "blur" },
          {
            min: 3,
            max: 6,
            message: "课程版本的长度在3~6个字符之间",
            trigger: "blur",
          },
        ],
        sort: [
          { required: true, message: "请输入课程排序编号", trigger: "blur" },
        ],
        school_id: [{ required: true, message: "请选择学院", trigger: "blur" }],
        college_stage_id: [
          { required: true, message: "请选择学院阶段", trigger: "blur" },
        ],
      },
    };
  },
  created() {
    this.getCollegesOptions();
    this.getCoursesList();
  },
  methods: {
    //获取所有的学院信息
    async getCollegesOptions() {
      const result = await getallDepartment();
      this.collegesOptions = [];
      if (result) {
        result.data.forEach((item) => {
          this.collegesOptions.push({
            value: item.id,
            label: item.name,
          });
        });
      }
    },
    async getCoursesList() {
      const result = await getCourses(this.queryInfo);
      this.courseList = result.data; //列表中展示的数据内容
      this.total = result.count; //数据总条数
    },
    // 监听 pagesize 改变的事件
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize;
      this.getClassList();
    },
    // 监听 页码值 改变的事件
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage;
      this.getClassList();
    },
    //监听学院下拉框改变事件
    async handleCollegeChanged(value) {
      const result = await getCollegeStageByCollegeId(value);
      this.collegeStageOptions = [];
      if (result) {
        result.forEach((item) => {
          this.collegeStageOptions.push({
            value: item.id,
            label: item.name,
          });
        });
      }
    },
    //添加课程
    addCourse() {
      this.$refs.addFormRef.validate(async (valid) => {
        if (!valid) return;
        // 可以发起添加用户的网络请求
        // console.log(123456,this.addForm)
        if (await createCourse(this.addForm)) {
        //   this.addDialogClosed();
          this.getCoursesList();
          this.$message.success("添加课程成功！");
        }
      });
    },

    // 展示编辑的对话框
    async showEditDialog(id) {
      const result = await getClassItem(id);
      if (result) {
        this.editForm = result;
        this.editForm.level = Boolean(this.editForm.level);
        this.editDialogVisible = true;
      }
    },
    // 修改部门信息并提交
    editDepartment() {
      this.$refs.editFormRef.validate(async (valid) => {
        if (!valid) return;
        let id = this.editForm.id;
        delete this.editForm.id;
        this.editForm.level = Number(this.editForm.level);
        // 发起修改用户信息的数据请求
        const result = await editRoleItem(id, this.editForm);

        if (result) {
          // 关闭对话框
          this.editDialogVisible = false;
          // 刷新数据列表
          this.getDeparList();
          // 提示修改成功
          this.$message.success("更新职位信息成功！");
        }
      });
    },
    // 根据Id删除对应的用户信息
    async removeRoleById(id) {
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

      // 如果用户确认删除，则返回值为字符串 confirm
      // 如果用户取消了删除，则返回值为字符串 cancel
      // console.log(confirmResult)
      if (confirmResult !== "confirm") {
        return this.$message.info("已取消删除");
      }
      removeRole(id).then((value) => {
        this.$message.success("删除职位成功！");
        this.getClassList();
      });
    },
  },
};
</script>

<style lang="less" scoped>
.el-select {
  width: 100%;
}
</style>
