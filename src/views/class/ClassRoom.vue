<template>
  <div>
    <!-- 卡片视图区域 -->
    <el-card>
      <!-- 搜索与添加区域 -->
      <el-row :gutter="10">
        <el-col :span="4">
          <el-select
            v-model="queryInfo.query.department"
            clearable
            placeholder="请选择部门"
            @clear="getClassRoom()"
          >
            <el-option
              v-for="item in optionsall"
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
            @click="getClassRoom()"
            >搜索</el-button
          >
        </el-col>
        <el-col :span="3">
          <el-button type="primary" @click="addDialogVisible = true"
            >添加教室</el-button
          >
        </el-col>
      </el-row>

      <!-- 教室列表区域 -->
      <el-table :data="classlist" border stripe>
        <el-table-column label="部门" prop="department"></el-table-column>
        <el-table-column label="教室地址" prop="address"></el-table-column>
        <el-table-column label="教室号" prop="number"></el-table-column>
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
              @click="removeClassById(scope.row.id)"
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

    <!-- 修改教室对话框 -->
    <el-dialog
      title="修改教室"
      :visible.sync="editDialogVisible"
      width="50%"
      @close="editDialogClosed"
    >
      <el-form
        :model="editForm"
        :rules="FormRules"
        ref="editFormRef"
        label-width="70px"
      >
        <el-form-item label="所属部门" prop="department" label-width="85px">
          <el-select
            v-model="editForm.department"
            placeholder="请选择部门"
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
        <el-form-item label="教室地址" prop="address" label-width="85px">
          <el-input v-model="editForm.address"></el-input>
        </el-form-item>
        <el-form-item label="教室号" prop="number" label-width="85px">
          <el-input v-model="editForm.number"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editDepartment">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 添加教室对话框 -->
    <el-dialog
      title="添加教室"
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
        <el-form-item label="所属部门" prop="department" label-width="85px">
          <el-select
            v-model="addForm.department"
            placeholder="请选择部门"
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
        <el-form-item label="教室地址" prop="address" label-width="85px">
          <el-input v-model="addForm.address"></el-input>
        </el-form-item>
        <el-form-item label="教室号" prop="number" label-width="85px">
          <el-input v-model="addForm.number"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addClass">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  getClass,
  addClass,
  removeClass,
  getClassItem,
  editClassItem,
} from "network/api/classes";
import { getAllDepartment } from "network/api/department";
export default {
  data() {
    return {
      optionsall: [{ value: "", label: "全部" }],
      options: [],
      queryInfo: {
        query: {
          department: null,
        },
        // 当前的页数
        pagenum: 1,
        // 当前每页显示多少条数据
        pagesize: 5,
      },
      classlist: [],
      total: 0,

      // 添加表单数据
      addForm: {},
      dutyshow: false,
      editdutyshow: false,
      // 添加、修改表单的验证规则对象
      FormRules: {
        address: [
          { required: true, message: "请输入教室地址", trigger: "blur" },
          {
            min: 2,
            max: 10,
            message: "教室地址的长度在2~10个字符之间",
            trigger: "blur",
          },
        ],
        department: [
          { required: true, message: "请选择部门", trigger: "blur" },
        ],
        number: [
          { required: true, message: "请输入教师号", trigger: "blur" },
          {
            min: 3,
            max: 6,
            message: "教室地址的长度在3~6个字符之间",
            trigger: "blur",
          },
        ],
      },
      // 控制修改部门对话框的显示与隐藏
      editDialogVisible: false,
      addDialogVisible: false,
      // 查询到的信息对象
      editForm: { department: null, address: "", number: "" },
    };
  },
  created() {
    this.getDepartmentList();
    this.getClassRoom();
  },
  methods: {
    async getDepartmentList() {
      const departments = await getAllDepartment();
      if (departments) {
        departments.forEach((item) => {
          this.optionsall.push({
            value: item.id,
            label: item.name,
          });
          this.options.push({
            value: item.id,
            label: item.name,
            labe: item.label,
          });
        });
      }
    },
    async getClassRoom() {
      const result = await getClass(this.queryInfo);
      if (result) {
        this.classlist = result.data; //列表中展示的数据内容
        this.total = result.count; //数据总条数
      }
    },
    // 监听 pagesize 改变的事件
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize;
      this.getClassRoom();
    },
    // 监听 页码值 改变的事件
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage;
      this.getClassRoom();
    },

    addClass() {
      this.$refs.addFormRef.validate(async (valid) => {
        if (!valid) return;
        // 可以发起添加用户的网络请求
        if (await addClass(this.addForm)) {
          this.getClassRoom();
          this.$message.success("添加职位成功！");
          this.addForm = {
            address: "",
            department: null,
            number: "",
          };
          this.addDialogVisible = false;
        }
      });
    },
    departlabel1(name) {
      let pid = null;
      this.options.forEach((item) => {
        if (item.label == name) {
          pid = item.labe;
        }
      });
      if (pid == true) {
        this.editdutyshow = true;
      } else {
        this.editdutyshow = false;
      }
    },

    // 展示编辑的对话框
    async showEditDialog(id) {
      const result = await getClassItem(id);
      if (result) {
        this.editForm = result;
        this.departlabel1(this.editForm.department);
        this.editDialogVisible = true;
      }
    },
    // 监听修改部门对话框的关闭事件
    editDialogClosed() {
      this.$refs.editFormRef.resetFields();
    },

    // 修改部门信息并提交
    editDepartment() {
      this.$refs.editFormRef.validate(async (valid) => {
        if (!valid) return;
        let id = this.editForm.id;
        delete this.editForm.id;
        this.editForm.level = Number(this.editForm.level);
        // 发起修改用户信息的数据请求
        const result = await editClassItem(id, this.editForm);

        if (result) {
          // 关闭对话框
          this.editDialogVisible = false;
          // 刷新数据列表
          this.getClassRoom();
          // 提示修改成功
          this.$message.success("更新班级信息成功！");
        }
      });
    },

    // 根据Id删除对应的用户信息
    async removeClassById(id) {
      // 弹框询问班级是否删除数据
      const confirmResult = await this.$confirm(
        "此操作将永久删除该班级, 是否继续?",
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
      removeClass(id).then((value) => {
        this.$message.success("删除班级成功！");
        this.getClassRoom();
      });
    },
  },
};
</script>

<style lang="less" scoped></style>
