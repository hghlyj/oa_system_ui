<template>
  <div>
    <!-- 卡片视图区域 -->
    <el-card>
      <!-- 搜索与添加区域 -->
      <el-row :gutter="20">
        <div class="search">
          <el-col :span="3">
            <el-input
              placeholder="请输入名称"
              v-model="queryInfo.query.name"
              clearable
              @clear="getClasses"
            ></el-input
          ></el-col>
          <el-col :span="3">
            <el-select
              v-model="queryInfo.query.college"
              placeholder="选择所属学院"
              clearable
            >
              <el-option
                v-for="item in collegeoptions1"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option> </el-select
          ></el-col>
          <!-- <el-col :span="3">
            <el-select
              v-model="queryInfo.query.stage"
              placeholder="选择现处阶段"
            >
              <el-option
                v-for="item in stageoptions1"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-col> -->
          <el-col :span="3">
            <el-input
              placeholder="请输入宿舍号"
              v-model="queryInfo.query.room_number"
              clearable
              @clear="getClasses"
            ></el-input
          ></el-col>
          <!-- 此功能不能使用 -->
          <el-col :span="3">
            <el-input
              placeholder="请输入班级人数"
              v-model="queryInfo.query.sum"
              clearable
              @clear="getClasses"
              disabled
            ></el-input
          ></el-col>
          <el-col :span="1">
            <el-button
              type="primary"
              icon="el-icon-search"
              circle
              @click="getClasses"
            ></el-button>
          </el-col>
          <el-col :span="2">
            <el-button type="danger" @click="clearsearch">重置</el-button>
          </el-col>
        </div>

        <el-col :span="4">
          <el-button type="primary" @click="addClasses1">添加班级</el-button>
        </el-col>
      </el-row>

      <!-- 全选反选按钮 -->
      <div style="margin-top: 20px">
        <el-button @click="alltoggleSelection()">全选,反选</el-button>
        <el-button @click="toggleSelection()">取消选择</el-button>
        <el-button @click="deltoggleSelection()">批量删除</el-button>
      </div>

      <!-- 分页区域 -->
      <el-pagination
        style="margin-top: 20px"
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
    <!-- 用户列表区域 -->
    <el-table
      ref="multipleTable"
      style="margin-top: 40px"
      :data="classlist"
      @selection-change="handleSelectionChange"
      border
      stripe
    >
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column type="index"></el-table-column>
      <el-table-column label="班级名称" prop="name"></el-table-column>
      <el-table-column label="所属学院" prop="college"></el-table-column>
      <!-- <el-table-column label="现处阶段" prop="stage"></el-table-column> -->
      <el-table-column label="教室号" prop="room_number"></el-table-column>
      <el-table-column label="班级人数" prop="number"> </el-table-column>
      <el-table-column label="操作">
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
          <!-- 排课按钮 -->
          <el-button
            type="danger"
            icon="el-icon-share"
            size="mini"
            @click="showcourseDialog(scope.row)"
          ></el-button>
          <!-- 调课按钮 -->
          <el-button
            type="success"
            icon="el-icon-setting"
            circle
            @click="showadjustDialog(scope.row)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 添加班级的对话框 -->
    <el-dialog
      title="添加班级"
      :visible.sync="addDialogVisible"
      width="50%"
      @close="addDialogClosed"
    >
      <!-- 内容主体区域 -->
      <el-form
        :model="addForm"
        :rules="addFormRules"
        ref="addFormRef"
        label-width="100px"
      >
        <el-form-item label="班级" prop="name">
          <el-input v-model="addForm.name"></el-input>
        </el-form-item>
        <el-form-item label="所属学院" prop="college">
          <el-select v-model="addForm.college" placeholder="选择所属学院">
            <el-option
              v-for="item in collegeoptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="现处阶段" prop="stage">
          <el-select v-model="addForm.stage" placeholder="选择现处阶段">
            <el-option
              v-for="item in stageoptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item> -->
      </el-form>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addClasses">确 定</el-button>
      </span>
    </el-dialog>

  

    <!-- 修改班级的对话框 -->
    <el-dialog
      title="修改班级信息"
      :visible.sync="editDialogVisible"
      width="50%"
      @close="editDialogClosed"
    >
      <!-- 内容主体区域 -->
      <el-form
        :model="editForm"
        :rules="editFormRules"
        ref="editFormRef"
        label-width="100px"
      >
        <el-form-item label="班级" prop="name">
          <el-input v-model="editForm.name"></el-input>
        </el-form-item>
        <el-form-item label="所属学院" prop="college">
          <el-select v-model="editForm.college" placeholder="选择所属学院">
            <el-option
              v-for="item in collegeoptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="现处阶段" prop="stage">
          <el-select v-model="editForm.stage" placeholder="选择现处阶段">
            <el-option
              v-for="item in stageoptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item> -->
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editClasses">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 排课对话框 -->
    <el-dialog
      title="班级排课"
      :visible.sync="courseDialogVisible"
      width="40%"
      @close="courseDialogClosed"
    >
      <!-- 内容主体区域 -->
      <el-form
        :model="courseForm"
        :rules="courseFormRules"
        ref="courseFormRef"
        label-width="100px"
      >
        <el-form-item label="教学周期" prop="teaching_time">
          <el-select
            v-model="courseForm.teaching_time"
            placeholder="请选择教学周期"
            style="width: 70%"
          >
            <el-option
              v-for="item in courseoptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="教室号" prop="room_number">
          <el-select
            v-model="courseForm.room_number"
            placeholder="请选择教学周期"
            style="width: 70%"
          >
            <el-option
              v-for="item in roomoptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="讲师" prop="lecturer">
          <el-select
            v-model="courseForm.lecturer"
            placeholder="请选择带班讲师"
            style="width: 70%"
          >
            <el-option
              v-for="item in lectureroptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="导员" prop="counsellor">
          <el-select
            v-model="courseForm.counsellor"
            placeholder="请选择带班导员"
            style="width: 70%"
          >
            <el-option
              v-for="item in counselloroptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="课程名称" prop="course">
          <el-select
            v-model="courseForm.course"
            placeholder="请选择带课程名称"
            style="width: 70%"
          >
            <el-option
              v-for="item in classnameoptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="正课时间" prop="class_time">
          <el-checkbox-group v-model="courseForm.class_time" size="medium">
            <el-checkbox
              v-for="(item, index) in class_timeoptions"
              :key="index"
              :label="item.value"
              >{{ item.label }}</el-checkbox
            >
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="courseDialogVisible = false">取 消</el-button>
        <span v-if="addedit" style="margin: 0 20px">
          <el-button type="primary" @click="addsourseClasses">确 定</el-button>
        </span>
        <span v-else style="margin: 0 20px">
          <el-button type="warning" @click="editsourseClasses">修改</el-button>
          <!-- <el-button type="danger" @click="delesourseClasses(this.courseForm.classid)">删除</el-button> -->
        </span>
      </span>
    </el-dialog>

    <!-- 调课对话框 -->
    <el-dialog
      :title="classname"
      :visible.sync="adjustDialogVisible"
      width="50%"
      @close="adjustDialogClosed"
    >
      <!-- 内容主体区域 -->
      <el-form
        :model="adjustForm"
        :rules="adjustFormRules"
        ref="adjustFormRef"
        label-width="100px"
      >
        <el-form-item label="原上课日期" prop="original_date">
          <el-select
            v-model="adjustForm.original_date"
            placeholder="请选择原上课日期"
            clearable
            :style="{ width: '100%' }"
          >
            <el-option
              v-for="(item, index) in dateOptions"
              :key="index"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="调整后日期" prop="change_date">
          <el-select
            v-model="adjustForm.change_date"
            placeholder="请选择调整后日期"
            clearable
            :style="{ width: '100%' }"
          >
            <el-option
              v-for="(item, index) in changedateOptions"
              :key="index"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="调整类型" prop="change_type">
          <el-radio-group v-model="adjustForm.change_type" size="medium">
            <el-radio
              v-for="(item, index) in typeOptions"
              :key="index"
              :label="item.value"
              :disabled="item.disabled"
              >{{ item.label }}</el-radio
            >
          </el-radio-group>
        </el-form-item>
        <el-form-item
          v-if="adjustForm.change_type"
          label="代课老师"
          prop="change_teacher"
        >
          <el-select
            v-model="adjustForm.change_teacher"
            placeholder="请选择代课老师"
            clearable
            :style="{ width: '100%' }"
          >
            <el-option
              v-for="(item, index) in lectureroptions"
              :key="index"
              :label="item.label"
              :value="item.value"
              :disabled="item.disabled"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          v-if="adjustForm.original_date"
          :label="adjustForm.original_date"
          prop="original_class"
        >
          <span
            v-if="
              this.apn_class.no_class.indexOf(adjustForm.original_date) != -1
            "
            >今天不上课</span
          >
          <el-checkbox-group
            v-model="adjustForm.original_class"
            size="medium"
            v-else
          >
            <el-checkbox
              v-for="(item, index) in ClassSectionOptions"
              :key="index"
              :label="item.value"
              :disabled="item.disabled"
              >{{ item.label }}</el-checkbox
            >
          </el-checkbox-group>
        </el-form-item>
        <el-form-item
          v-if="adjustForm.change_date"
          :label="adjustForm.change_date"
          prop="change_class"
        >
          <span
            v-if="this.apn_class.no_class.indexOf(adjustForm.change_date) != -1"
            >今天不上课</span
          >
          <el-checkbox-group
            v-model="adjustForm.change_class"
            size="medium"
            v-else
          >
            <el-checkbox
              v-for="(item, index) in changeClassSectionOptions"
              :key="index"
              :label="item.value"
              :disabled="item.disabled"
              >{{ item.label }}</el-checkbox
            >
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="adjustDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="adjustClass">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  getClasses,
  addClasses,
  removeClasses,
  getClassesItem,
  editClassesItem,
} from "network/api/classes";

import { getallDepartment } from "network/api/department";
import {
  getallcourse,
  gettodaycourse,
  getTeachingItem,
} from "network/api/teachingcycle";
import {
  createCoursePian,
  getClassRoom,
  createClassRoom,
  getcoursesall,
  getcoursepianone,
  editCoursePian,
  delesourseClasses,
} from "network/api/coursepian";
import { getAdminUserjs, getAdminUserfdy } from "network/api/adminuser";
import { addAdjustClass } from "network/api/adjust";
export default {
  name: "departmentlist",
  data() {
    return {
      //添加学生对话框
      addDialogVisible: false,

      // 获取用户列表的参数对象
      queryInfo: {
        query: {
          name: "",
          college: "",
          stage: "",
          room_number: "",
          sum: "",
        },
        // 当前的页数
        pagenum: 1,
        // 当前每页显示多少条数据
        pagesize: 5,
      },
      classlist: [],
      total: 0,
      //排课对话框
      courseDialogVisible: false,
      //教学周期     讲师  导员  课程名   正课时间
      addedit: true,
      courseoptions: [],
      roomoptions: [],
      lectureroptions: [],
      counselloroptions: [],
      classnameoptions: [],
      class_timeoptions: [
        {
          label: "第一节课",
          value: "1",
        },
        {
          label: "第二节课",
          value: "2",
        },
        {
          label: "第三节课",
          value: "3",
        },
        {
          label: "第四节课",
          value: "4",
        },
        {
          label: "第五节课",
          value: "5",
        },
        {
          label: "第六节课",
          value: "6",
        },
        {
          label: "第七节课",
          value: "7",
        },
        {
          label: "第八节课",
          value: "8",
        },
      ],
      courseFormRules: {
        teaching_time: [
          { required: true, message: "请选择教学周期", trigger: "blur" },
        ],
        room_number: [
          { required: true, message: "请输入教室号", trigger: "blur" },
        ],
        lecturer: [
          { required: true, message: "请选择带班讲师", trigger: "blur" },
        ],
        counsellor: [
          { required: true, message: "请选择带班导员", trigger: "blur" },
        ],
        course: [
          { required: true, message: "请选择课程名称", trigger: "blur" },
        ],
        class_time: [
          {
            required: true,
            message: "请选择正课时间",
            trigger: "blur",
          },
        ],
      },
      courseForm: {
        class_time: [],
      },
      //调课信息
      adjustDialogVisible: false,
      adjustForm: {
        original_date: "",
        change_date: "",
        change_type: 0,
        change_teacher: "",
        original_class: [],
        change_class: [],
      },
      dateOptions: [],
      adjustclass_time: [],
      changedateOptions: [],
      typeOptions: [
        {
          label: "调课",
          value: 0,
        },
        {
          label: "代课",
          value: 1,
        },
      ],
      teacherOptions: [],
      ClassSectionOptions: [
        {
          label: "第一节课",
          value: "1",
        },
        {
          label: "第二节课",
          value: "2",
        },
        {
          label: "第三节课",
          value: "3",
        },
        {
          label: "第四节课",
          value: "4",
        },
        {
          label: "第五节课",
          value: "5",
        },
        {
          label: "第六节课",
          value: "6",
        },
        {
          label: "第七节课",
          value: "7",
        },
        {
          label: "第八节课",
          value: "8",
        },
      ],
      changeClassSectionOptions: [
        {
          label: "第一节课",
          value: "1",
        },
        {
          label: "第二节课",
          value: "2",
        },
        {
          label: "第三节课",
          value: "3",
        },
        {
          label: "第四节课",
          value: "4",
        },
        {
          label: "第五节课",
          value: "5",
        },
        {
          label: "第六节课",
          value: "6",
        },
        {
          label: "第七节课",
          value: "7",
        },
        {
          label: "第八节课",
          value: "8",
        },
        {
          label: "第九节课",
          value: "9",
        },
        {
          label: "第十节课",
          value: "10",
        },
        {
          label: "第十一节课",
          value: "11",
        },
      ],
      adjustFormRules: {},
      apn_class: {},
      classname: "",

      // 添加班级的表单数据
      addForm: {
        name: "",
        college: "",
        stage: "",
      },
      //所有学院下拉数据
      collegeoptions: [],
      //多个全部
      collegeoptions1: [],
      //现处阶段下拉数据
      stageoptions: [
        {
          value: "语文",
          label: "语文",
        },
        {
          value: "数学",
          label: "数学",
        },
        {
          value: "英语",
          label: "英语",
        },
        {
          value: "专基",
          label: "专基",
        },
        {
          value: "专业",
          label: "专业",
        },
        {
          value: "专高",
          label: "专高",
        },
        {
          value: "实训",
          label: "实训",
        },
      ],
      //现处阶段下拉数据  多全部
      stageoptions1: [
        {
          value: "",
          label: "全部",
        },
        {
          value: "语文",
          label: "语文",
        },
        {
          value: "数学",
          label: "数学",
        },
        {
          value: "英语",
          label: "英语",
        },
        {
          value: "专基",
          label: "专基",
        },
        {
          value: "专业",
          label: "专业",
        },
        {
          value: "专高",
          label: "专高",
        },
        {
          value: "实训",
          label: "实训",
        },
      ],
      // 添加、修改表单的验证规则对象
      addFormRules: {
        name: [
          { required: true, message: "请输入班级", trigger: "blur" },
          {
            min: 4,
            max: 5,
            message: "姓名的长度在4~5个字符之间",
            trigger: "blur",
          },
        ],
        college: [{ required: true, message: "请输入学院", trigger: "blur" }],
        stage: [{ required: true, message: "请输入阶段", trigger: "blur" }],
      },
      editFormRules: {
        name: [
          { required: true, message: "请输入班级", trigger: "blur" },
          {
            min: 4,
            max: 5,
            message: "姓名的长度在4~5个字符之间",
            trigger: "blur",
          },
        ],
        college: [{ required: true, message: "请输入学院", trigger: "blur" }],
        stage: [{ required: true, message: "请输入阶段", trigger: "blur" }],
      },
      // 控制修改部门对话框的显示与隐藏
      editDialogVisible: false,
      // 修改的班级信息对象
      editForm: {
        name: "",
        college: "",
        stage: "",
        room_number: "",
        sum: "",
      },
      //选中的数组
      multipleSelection: [],
      //该讲师是否代课
    };
  },
  async created() {
    await this.getClasses();
    this.getallDepartment();
    this.getallcourse();
  },
  watch: {
    "courseForm.lecturer": function (val) {
      // 判断讲师是否有班级
      if (val != undefined) {
      }
    },
    "adjustForm.original_date": function (val) {
      if ((val != "") & (val != undefined)) {
        //判断是上午上课   下午上课  还是不上课
        this.ClassSectionOptions = [
          {
            label: "第一节课",
            value: "1",
          },
          {
            label: "第二节课",
            value: "2",
          },
          {
            label: "第三节课",
            value: "3",
          },
          {
            label: "第四节课",
            value: "4",
          },
          {
            label: "第五节课",
            value: "5",
          },
          {
            label: "第六节课",
            value: "6",
          },
          {
            label: "第七节课",
            value: "7",
          },
          {
            label: "第八节课",
            value: "8",
          },
        ];
        this.changeClassSectionOptions = [
          {
            label: "第一节课",
            value: "1",
          },
          {
            label: "第二节课",
            value: "2",
          },
          {
            label: "第三节课",
            value: "3",
          },
          {
            label: "第四节课",
            value: "4",
          },
          {
            label: "第五节课",
            value: "5",
          },
          {
            label: "第六节课",
            value: "6",
          },
          {
            label: "第七节课",
            value: "7",
          },
          {
            label: "第八节课",
            value: "8",
          },
          {
            label: "第九节课",
            value: "9",
          },
          {
            label: "第十节课",
            value: "10",
          },
          {
            label: "第十一节课",
            value: "11",
          },
        ];
        if (this.apn_class.am_class.indexOf(val) != -1) {
          this.ClassSectionOptions = [
            {
              label: "第一节课",
              value: "1",
            },
            {
              label: "第二节课",
              value: "2",
            },
            {
              label: "第三节课",
              value: "3",
            },
            {
              label: "第四节课",
              value: "4",
            },
          ];
          this.changeClassSectionOptions = [
            {
              label: "第一节课",
              value: "1",
            },
            {
              label: "第二节课",
              value: "2",
            },
            {
              label: "第三节课",
              value: "3",
            },
            {
              label: "第四节课",
              value: "4",
            },
          ];
          const class_time_am1 = JSON.stringify(this.adjustclass_time);
          const class_time_am2 = JSON.parse(class_time_am1);
          const class_time_am = class_time_am2.splice(0, 2);
          this.adjustForm.original_class = class_time_am;
          this.ClassSectionOptions.forEach((item) => {
            if (this.adjustclass_time.indexOf(item.value) == -1) {
              item.disabled = true;
            }
          });
        } else if (this.apn_class.pm_class.indexOf(val) != -1) {
          this.ClassSectionOptions = [
            {
              label: "第五节课",
              value: "5",
            },
            {
              label: "第六节课",
              value: "6",
            },
            {
              label: "第七节课",
              value: "7",
            },
            {
              label: "第八节课",
              value: "8",
            },
          ];
          this.changeClassSectionOptions = [
            {
              label: "第五节课",
              value: "5",
            },
            {
              label: "第六节课",
              value: "6",
            },
            {
              label: "第七节课",
              value: "7",
            },
            {
              label: "第八节课",
              value: "8",
            },
          ];
          const class_time_pm1 = JSON.stringify(this.adjustclass_time);
          const class_time_pm2 = JSON.parse(class_time_pm1);
          const class_time_pm = class_time_pm2.splice(2, 2);
          this.adjustForm.original_class = class_time_pm;
          this.ClassSectionOptions.forEach((item) => {
            if (this.adjustclass_time.indexOf(item.value) == -1) {
              item.disabled = true;
            }
          });
        } else {
          this.adjustForm.original_class = this.adjustclass_time;
          this.ClassSectionOptions.forEach((item) => {
            if (this.adjustclass_time.indexOf(item.value) == -1) {
              item.disabled = true;
            }
          });
        }
      }
    },
    "adjustForm.change_date": function (val) {
      if ((val != "") & (val != undefined)) {
        //是否选中原来课节日期
        // if(this.adjustForm.original_date==[]||this.adjustForm.original_date==''||this.adjustForm.original_date==undefined){
        //   this.changeClassSectionOptions=[{value:'请先选原课节日期',label:'请先选原课节日期'}]
        // }
        //判断是上午上课   下午上课  还是不上课
        this.changeClassSectionOptions = [
          {
            label: "第一节课",
            value: "1",
          },
          {
            label: "第二节课",
            value: "2",
          },
          {
            label: "第三节课",
            value: "3",
          },
          {
            label: "第四节课",
            value: "4",
          },
          {
            label: "第五节课",
            value: "5",
          },
          {
            label: "第六节课",
            value: "6",
          },
          {
            label: "第七节课",
            value: "7",
          },
          {
            label: "第八节课",
            value: "8",
          },
          {
            label: "第九节课",
            value: "9",
          },
          {
            label: "第十节课",
            value: "10",
          },
          {
            label: "第十一节课",
            value: "11",
          },
        ];
        if (this.apn_class.am_class.indexOf(val) != -1) {
          this.changeClassSectionOptions = [
            {
              label: "第一节课",
              value: "1",
            },
            {
              label: "第二节课",
              value: "2",
            },
            {
              label: "第三节课",
              value: "3",
            },
            {
              label: "第四节课",
              value: "4",
            },
          ];
        } else if (this.apn_class.pm_class.indexOf(val) != -1) {
          this.changeClassSectionOptions = [
            {
              label: "第五节课",
              value: "5",
            },
            {
              label: "第六节课",
              value: "6",
            },
            {
              label: "第七节课",
              value: "7",
            },
            {
              label: "第八节课",
              value: "8",
            },
          ];
        }
      }
    },
  },
  methods: {
    //获取所有学院
    async getallDepartment() {
      const res = await getallDepartment();
      const content = res.data;
      this.collegeoptions = [];
      this.collegeoptions1 = [];
      content.forEach((item) => {
        if (item.label == "1") {
          let obj = {};
          obj.value = item.name;
          obj.label = item.name;
          this.collegeoptions.push(obj);
          this.collegeoptions1.push(obj);
        }
      });
    },
    //获取班级信息
    async getClasses() {
      const result = await getClasses({
        search: this.queryInfo.query,
        page: this.queryInfo.pagenum,
        page_size: this.queryInfo.pagesize,
      });
      console.log('班级信息',result.data)
      if (result) {
        this.classlist = result.data; //列表中展示的数据内容
        this.total = result.count; //数据总条数
        this.addDialogVisible = false;
      } else {
        return this.$message.error("获取班级列表失败！");
      }
    },
    //获取教学周期信息
    async getallcourse() {
      var moment = require("moment");
      const res = await getallcourse();
      res.forEach((item) => {
        let start = moment(item.starttime);
        let end = moment(item.endtime);
        const starttime = start.format("YYYY年MM月DD日");
        const endtime = end.format("YYYY年MM月DD日");
        let obj = {};
        obj.value = item.id;
        obj.label = starttime + "~~" + endtime;
        this.courseoptions.push(obj);
      });
    },
    //获取教室信息
    async getClassRoom(content) {
      const res = await getClassRoom(content);
      if (res) {
        this.roomoptions = [];
        console.log("kkkkkkkkkk", res);
        res.forEach((item) => {
          const obj = {};
          obj.value = item.id;
          if (item.classname) {
            obj.label = item.number + "(" + item.classname + ")";
          } else {
            obj.label = item.number;
          }

          this.roomoptions.push(obj);
        });
      }
    },
    //获取讲师
    async getAdminUserjs(content) {
      const res = await getAdminUserjs(content);
      this.lectureroptions = [];
      if (res) {
        res.forEach((item) => {
          const obj = {};
          obj.value = item.id;
          obj.label = item.name;
          this.lectureroptions.push(obj);
        });
      } else {
        console.log("获取讲师数据失败");
      }
    },
    //获取辅导员
    async getAdminUserfdy(content) {
      const res = await getAdminUserfdy(content);
      if (res) {
        this.counselloroptions = [];
        res.forEach((item) => {
          const obj = {};
          obj.value = item.id;
          obj.label = item.name;
          this.counselloroptions.push(obj);
        });
      } else {
        console.log("获取辅导员数据失败");
      }
    },
    //获取课程信息
    async getcoursesall(content) {
      const res = await getcoursesall(content);
      if (res) {
        this.classnameoptions = [];
        res.forEach((item) => {
          const obj = {};
          obj.value = item.id;
          obj.label = item.name;
          this.classnameoptions.push(obj);
        });
      }
    },
    //排课对话框
    async showcourseDialog(val) {
      let res = await getcoursepianone();
      let flag = false;
      if (res.length == 0) {
        this.addedit = true;
        this.courseForm = { class_time: [] };
        const college = JSON.stringify(val.college);
        const college1 = JSON.parse(college);
        this.getcoursesall(college1);
        this.getClassRoom(college1);
        this.getAdminUserjs(college1);
        this.getAdminUserfdy(college1);
        this.courseForm.classid = val.id;
      } else {
        res.forEach((item) => {
          if (item.classid == val.id) {
            const college = JSON.stringify(val.college);
            const college1 = JSON.parse(college);
            this.getcoursesall(college1);
            this.getClassRoom(college1);
            this.getAdminUserjs(college1);
            this.getAdminUserfdy(college1);
            flag = true;
            this.addedit = false;
            this.courseForm = item;
            this.courseForm.class_time = this.courseForm.class_time.split(",");
            return false;
          } else {
            if (flag == false) {
              this.addedit = true;
              this.courseForm = { class_time: [] };
              const college = JSON.stringify(val.college);
              const college1 = JSON.parse(college);
              this.getcoursesall(college1);
              this.getClassRoom(college1);
              this.getAdminUserjs(college1);
              this.getAdminUserfdy(college1);
              this.courseForm.classid = val.id;
            }
          }
        });
      }

      this.courseDialogVisible = true;
    },
    // 监听排课对话框的关闭事件
    courseDialogClosed() {
      this.$refs.courseFormRef.resetFields();
    },
    //确认排课
    addsourseClasses() {
      this.$refs.courseFormRef.validate(async (valid) => {
        if (!valid) return;
        // 发起修改用户信息的数据请求
        console.log("排课信息", this.courseForm);
        const createcourse = JSON.stringify(this.courseForm);
        const createcourse1 = JSON.parse(createcourse);
        createcourse1.class_time = String(createcourse1.class_time.sort());
        const result = await createCoursePian(createcourse1);
        if (result) {
          // 关闭对话框
          this.courseDialogVisible = false;
          // 刷新数据列表
          this.getClasses();
          // 提示修改成功
          this.$message.success("班级排课成功");
        }
      });
    },
    //修改排课信息
    async editsourseClasses() {
      const content = JSON.stringify(this.courseForm);
      let content1 = JSON.parse(content);
      content1.class_time = String(content1.class_time);
      const res = await editCoursePian(content1);
      if (res) {
        this.getClassRoom();
        this.courseDialogVisible = false;
      }
    },
    //删除排课信息
    // async delesourseClasses(id){
    //   // console.log(id);
    //   // const res = await delesourseClasses(val.id)
    //   // console.log(res);
    // },
    //获取单条排课信息
    async getTeachingItem(val) {
      this.adjustForm = {
        original_date: "",
        change_date: "",
        change_type: 0,
        change_teacher: "",
        original_class: [],
        change_class: [],
      };
      console.log("val", val);
      this.adjustForm.teacher = val.teacher;
      this.adjustForm.course_plan = val.course_plan;
      const res = await getTeachingItem(val.teaching_time);
      // const res = (await getTeachingItem(val.id)).data;
      console.log('教学周期res',res)
      console.log("sssssssss", this.adjustForm);
      const am_class = res.am_class.split(",");
      const pm_class = res.pm_class.split(",");
      const no_class = res.no_class.split(",");
      this.apn_class.am_class = am_class;
      this.apn_class.pm_class = pm_class;
      this.apn_class.no_class = no_class;
      var moment = require("moment");
      let start = moment(res.starttime);
      let end = moment(res.endtime);
      this.adjustclass_time = val.class_time.split(",");
      this.dateOptions = [];
      while (start < end + 1) {
        const obj = {};
        obj.value = start.format("YYYY-MM-DD");
        obj.label = start.format("YYYY-MM-DD");
        this.dateOptions.push(obj);
        start = start.add(1, "days");
      }
      this.changedateOptions = [];
      let nowtime = moment(moment().format("YYYY-MM-DD"));
      while (nowtime < end + 1) {
        const obj = {};
        obj.value = nowtime.format("YYYY-MM-DD");
        obj.label = nowtime.format("YYYY-MM-DD");
        this.changedateOptions.push(obj);
        nowtime = nowtime.add(1, "days");
      }
    },
    //调课对话框
    async showadjustDialog(val) {
      // console.log(val);
      this.classname = val.name + "班调课";
      this.adjustForm = {};
      const res = await getcoursepianone();
      let flag = false;
      if (res == []) {
        this.$message.error("请先进行排课");
        return false;
      } else {
        res.forEach((item) => {
          if (item.classid == val.id) {
            this.getTeachingItem(val);
            this.getAdminUserjs(val.college);
            flag = true;
            this.adjustDialogVisible = true;
            return false;
          }
        });
        if (flag == false) {
          this.$message.error("请先进行排课");
          return false;
        }
      }
    },
    // 监听排课对话框的关闭事件
    adjustDialogClosed() {
      this.$refs.adjustFormRef.resetFields();
    },
    //确认调课
    async adjustClass() {
      this.$refs.adjustFormRef.validate(async (valid) => {
        if (!valid) return;
        const content = JSON.stringify(this.adjustForm);
        const content1 = JSON.parse(content);
        content1.original_class = this.adjustForm.original_class.sort();
        content1.change_class = this.adjustForm.change_class.sort();
        if (content1.change_type == 0) {
          content1.change_teacher = "";
        }
        const result = await addAdjustClass(content1);
        console.log(result);
        if (result.errors) {
          this.$message.error(result.errors);
        } else {
          this.$message.success("调课成功");
        }
      });
    },
    // 监听添加学生对话框的关闭事件
    addDialogClosed() {
      this.$refs.addFormRef.resetFields();
    },
    //展示添加数据对话框展示
    addClasses1() {
      this.getallDepartment();
      this.addDialogVisible = true;
    },
    // 点击按钮，添加新学生用户
    addClasses() {
      this.$refs.addFormRef.validate(async (valid) => {
        if (!valid) return;
        // 可以发起添加用户的网络请求
        const res = await addClasses(this.addForm);
        if (res) {
          this.$message.success("添加班级成功！");
          // 重新获取用户列表数据
          this.getClasses();
        } else {
          this.$message.error("添加班级失败！");
        }

        // 隐藏添加用户的对话框
        this.addDialogVisible = false;
      });
    },

    // 监听 pagesize 改变的事件
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize;
      this.getClasses();
    },
    // 监听 页码值 改变的事件
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage;
      this.getClasses();
    },
    // 展示编辑学生信息的对话框
    async showEditDialog(id) {
      await this.getallDepartment();
      const result = await getClassesItem(id);
      if (result) {
        this.editForm = result;
        this.editDialogVisible = true;
      }
    },
    // 监听修改学生对话框的关闭事件
    editDialogClosed() {
      this.$refs.editFormRef.resetFields();
    },
    // 修改学生信息并提交
    editClasses() {
      this.$refs.editFormRef.validate(async (valid) => {
        if (!valid) return;
        // 发起修改用户信息的数据请求
        const result = await editClassesItem(this.editForm);

        if (result) {
          // 关闭对话框
          this.editDialogVisible = false;
          // 刷新数据列表
          this.getClasses();
          // 提示修改成功
          this.$message.success("更新班级信息成功！");
        }
      });
    },
    // 根据Id删除对应的用户信息
    async removeClassById(id) {
      // 弹框询问用户是否删除数据
      const confirmResult = await this.$confirm(
        "此操作将永久删除该班级, 是否继续?",
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
      removeClasses(id).then((value) => {
        this.$message.success("删除用户成功！");
        this.getClasses();
      });
    },

    //清空搜索的内容
    clearsearch() {
      this.queryInfo.query = {
        name: "",
        market: "",
        cls: "",
        sex: "",
        dormnumber: "",
      };
    },
    //实现单选全选反选 批量删除
    alltoggleSelection() {
      if (this.classlist) {
        this.classlist.forEach((item) => {
          this.$refs.multipleTable.toggleRowSelection(item);
        });
      }
    },
    //取消选择
    toggleSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    //批量删除
    deltoggleSelection() {},
    //选项框改变触发
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
  },
};
</script>

<style lang="less" scoped></style>
