<template>
  <div>
    <!-- 卡片视图区域 -->
    <el-card>
      <!-- 搜索与添加区域 -->
      <el-row :gutter="20">
        <div>
          <el-col :span="3">
            <el-input
              placeholder="请输入姓名"
              v-model="queryInfo.query.name"
              clearable
              @clear="getStudents"
            ></el-input
          ></el-col>
          <el-col :span="3">
            <el-input
              placeholder="请输入市场部"
              v-model="queryInfo.query.market"
              clearable
              @clear="getStudents"
            ></el-input
          ></el-col>
          <el-col :span="3">
            <el-select v-model="queryInfo.query.cls" placeholder="选择班级">
              <el-option
                v-for="item in classoptionsall"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option> </el-select
          ></el-col>
          <el-col :span="3">
            <el-select v-model="queryInfo.query.sex" placeholder="选择性别">
              <el-option
                v-for="item in sexoptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option> </el-select
          ></el-col>
          <el-col :span="3">
            <el-input
              placeholder="请输入宿舍号"
              v-model="queryInfo.query.dormnumber"
              clearable
              @clear="getStudents"
            ></el-input
          ></el-col>
          <el-col :span="1">
            <el-button
              type="primary"
              icon="el-icon-search"
              circle
              @click="getStudents"
            ></el-button>
          </el-col>
          <el-col :span="2">
            <el-button type="danger" @click="clearsearch">重置</el-button>
          </el-col>
        </div>
      </el-row>
      <el-row :gutter="20" style="margin-top: 20px"
        ><div>
          <el-col :span="2">
            <el-button type="primary" @click="addDialogVisible = true"
              >添加学生</el-button
            >
          </el-col>
          <el-col :span="2">
            <el-button type="primary" @click="addDialogVisible1 = true"
              >批量添加</el-button
            >
          </el-col>
        </div></el-row
      >

      <!-- 添加学生用户的对话框 -->
      <el-dialog
        title="添加用户"
        :visible.sync="addDialogVisible"
        width="50%"
        @close="addDialogClosed"
      >
        <!-- 内容主体区域 -->
        <el-form
          :model="addForm"
          :rules="addFormRules"
          ref="addFormRef"
          label-width="70px"
        >
          <el-form-item label="姓名" prop="name">
            <el-input v-model="addForm.name"></el-input>
          </el-form-item>
          <el-form-item label="积分" prop="score">
            <el-input v-model="addForm.score"></el-input>
          </el-form-item>
          <el-form-item label="性别0,1" prop="sex">
            <el-input v-model="addForm.sex"></el-input>
          </el-form-item>
          <el-form-item label="重修次" prop="anewconunt">
            <el-input v-model="addForm.anewconunt"></el-input>
          </el-form-item>
          <el-form-item label="手机号" prop="phone">
            <el-input v-model="addForm.phone"></el-input>
          </el-form-item>
          <el-form-item label="家长手" prop="family_phone">
            <el-input v-model="addForm.family_phone"></el-input>
          </el-form-item>
          <el-form-item label="关系" prop="relations">
            <el-input v-model="addForm.relations"></el-input>
          </el-form-item>
          <el-form-item label="地址" prop="address">
            <el-input v-model="addForm.address"></el-input>
          </el-form-item>
          <el-form-item label="宿舍号" prop="dormnumber">
            <el-input v-model="addForm.dormnumber"></el-input>
          </el-form-item>
          <el-form-item label="床号" prop="bednumber">
            <el-input v-model="addForm.bednumber"></el-input>
          </el-form-item>
          <el-form-item label="市场部" prop="market">
            <el-input v-model="addForm.market"></el-input>
          </el-form-item>
          <el-form-item label="身份证" prop="idcardnumber">
            <el-input v-model="addForm.idcardnumber"></el-input>
          </el-form-item>
          <el-form-item label="班级" prop="cls">
            <el-select v-model="addForm.cls" placeholder="选择班级">
              <el-option
                v-for="item in classoptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <!-- 底部区域 -->
        <span slot="footer" class="dialog-footer">
          <el-button @click="addDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addUser">确 定</el-button>
        </span>
      </el-dialog>

      <!-- 批量添加学生对话框 -->
      <el-dialog
        title="批量导入学生信息"
        :visible.sync="addDialogVisible1"
        width="50%"
        @close="addDialogClosed1"
      >
        <!-- 内容主体区域 -->
        <el-form
          :model="addForm1"
          :rules="addFormRules1"
          ref="addFormRef1"
          label-width="80px"
        >
          <el-form-item label="学院" prop="school">
            <el-select v-model="addForm1.school" placeholder="请选择学院">
              <el-option
                v-for="item in schoolOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="班级" prop="cls">
            <el-select v-model="addForm1.cls" placeholder="请选择班级">
              <el-option
                v-for="item in clsOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="uploaditem" label="Excel文件" prop="excel">
            <el-upload
              class="upload-demo"
              name="stufile"
              drag
              :headers="header"
              :data="addForm1"
              action="http://127.0.0.1:8000/api/students/uploadexcel"
              :auto-upload="false"
              ref="uploadFile"
              :on-success="uploadSuccess"
            >
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">
                将文件拖到此处，或<em>点击上传</em>
              </div>
              <div class="el-upload__tip" slot="tip">
                只能上传jpg/png文件，且不超过500kb
              </div>
            </el-upload>
            <el-link
              href="http://127.0.0.1:8000/api/download_excel_temp"
              target="_blank"
              type="primary"
              icon="el-icon-download"
              >下载excel模板</el-link
            >
          </el-form-item>
        </el-form>
        <!-- 底部区域 -->
        <span slot="footer" class="dialog-footer">
          <el-button @click="addDialogVisible1 = false">取 消</el-button>
          <el-button type="primary" @click="addUser1">确 定</el-button>
        </span>
      </el-dialog>

      <!-- 用户列表区域 -->
      <el-table
        ref="multipleTable"
        style="margin-top: 40px"
        :data="studentlist"
        @selection-change="handleSelectionChange"
        border
        stripe
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="姓名" prop="name"></el-table-column>
        <el-table-column label="积分" prop="score"></el-table-column>
        <el-table-column label="性别" prop="sex">
          <template slot-scope="scope">
            {{ typeof scope.row.sex }}
            <span v-if="scope.row.sex == 0">男</span>
            <span v-if="scope.row.sex == 1">女</span>
          </template>
        </el-table-column>
        <el-table-column label="重修次" prop="anewconunt"></el-table-column>
        <el-table-column label="手机号" prop="phone"></el-table-column>
        <el-table-column
          label="家长手机号"
          prop="family_phone"
        ></el-table-column>
        <el-table-column label="关系" prop="relations"></el-table-column>
        <el-table-column label="学生地址" prop="address"></el-table-column>
        <el-table-column label="宿舍号-床位">
          <template slot-scope="scope">
            {{ scope.row.dormnumber }}-{{ scope.row.bednumber }}
          </template>
        </el-table-column>
        <el-table-column label="市场部" prop="market"></el-table-column>
        <el-table-column label="身份证" prop="idcardnumber"></el-table-column>
        <el-table-column label="班级" prop="cls">
          <template slot-scope="scope"> {{ scope.row.clsname }} </template>
        </el-table-column>
        <el-table-column label="操作" width="180px">
          <template slot-scope="scope">
            <!-- 修改按钮 -->
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              circle
              @click="showEditDialog(scope.row.id)"
            ></el-button>
            <!-- 删除按钮 -->
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              circle
              @click="removeDepartById(scope.row.id)"
            ></el-button>
            <el-button
              type="warning"
              icon="el-icon-s-check"
              size="mini"
              circle
              @click="EditScore(scope.row)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>

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
        :current-page="queryInfo.page"
        :page-sizes="[5, 10, 15]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
    <!-- 修改用户的对话框 -->
    <el-dialog
      title="修改用户"
      :visible.sync="editDialogVisible"
      width="50%"
      @close="editDialogClosed"
    >
      <!-- 内容主体区域 -->
      <el-form
        :model="editForm"
        :rules="addFormRules"
        ref="editFormRef"
        label-width="70px"
      >
        <el-form-item label="姓名" prop="name">
          <el-input v-model="editForm.name"></el-input>
        </el-form-item>
        <el-form-item label="积分" prop="score">
          <el-input v-model="editForm.score"></el-input>
        </el-form-item>
        <el-form-item label="性别0,1" prop="sex">
          <el-input v-model="editForm.sex"></el-input>
        </el-form-item>
        <el-form-item label="重修次" prop="anewconunt">
          <el-input v-model="editForm.anewconunt"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="editForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="家长手" prop="family_phone">
          <el-input v-model="editForm.family_phone"></el-input>
        </el-form-item>
        <el-form-item label="关系" prop="relations">
          <el-input v-model="editForm.relations"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="address">
          <el-input v-model="editForm.address"></el-input>
        </el-form-item>
        <el-form-item label="宿舍号" prop="dormnumber">
          <el-input v-model="editForm.dormnumber"></el-input>
        </el-form-item>
        <el-form-item label="床号" prop="bednumber">
          <el-input v-model="editForm.bednumber"></el-input>
        </el-form-item>
        <el-form-item label="市场部" prop="market">
          <el-input v-model="editForm.market"></el-input>
        </el-form-item>
        <el-form-item label="身份证" prop="idcardnumber">
          <el-input v-model="editForm.idcardnumber"></el-input>
        </el-form-item>
        <el-form-item label="班级" prop="cls">
          <el-select v-model="editForm.cls" placeholder="选择班级">
            <el-option
              v-for="item in classoptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option> </el-select
        ></el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editStudents">确 定</el-button>
      </span>
    </el-dialog>

    <!--综合积分-->
    <el-dialog
      title="学生综合积分增减"
      :visible.sync="StudentScoreDialog"
      width="60%"
      @close="StudentScoreClose"
    >
      <el-descriptions class="margin-top" title="学生信息" :column="3" border>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-user"></i>
            姓名
          </template>
          {{ this.StudentScoreOne.name }}({{ this.StudentScoreOne.sex }})
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-user"></i>
            学院
          </template>
          {{ this.StudentScoreOne.department }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-user"></i>
            综合积分
          </template>
          {{ this.StudentScoreOne.score }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-user"></i>
            班级
          </template>
          {{ this.StudentScoreOne.cls }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-user"></i>
            讲师
          </template>
          {{ this.StudentScoreOne.lecturer }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-user"></i>
            导员
          </template>
          {{ this.StudentScoreOne.counsellor }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-user"></i>
            市场部
          </template>
          {{ this.StudentScoreOne.market }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-user"></i>
            家庭住址
          </template>
          {{ this.StudentScoreOne.address }}
        </el-descriptions-item>
      </el-descriptions>
      <div class="jiajian">
        <el-switch
          v-model="StudentScoreOne.state"
          active-color="#13ce66"
          inactive-color="#ff4949"
          active-text="加分"
          inactive-text="减分"
        >
        </el-switch>
      </div>
      <div>
        <div style="width: 60%; display: inline-block">
          <el-form
            :model="StudentScoreOne"
            :rules="StudentScoreRules"
            ref="StudentScore"
            label-width="140px"
            style="margin-top: 30px"
            >
            <div v-if="this.StudentScoreOne.state == true">
              <el-form-item label="加分项-分数" prop="content">
                <SelectTree
                  :props="props"
                  :options="AwaoptionData"
                  :value="StudentScoreOne.content_id"
                  :clearable="isClearable"
                  :accordion="isAccordion"
                  @getValue="getValue($event)"
                />
              </el-form-item>
            </div>
            <div v-else>
              <el-form-item label="违纪类型" prop="disciplinetype">
                <el-select
                  v-model="StudentScoreOne.disciplinetype"
                  placeholder="请选择违纪类型"
                >
                  <el-option
                    v-for="item in Disciplinetypeselect"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="减分项-分数" prop="content">
                <SelectTree
                  :props="props"
                  :options="SuboptionData"
                  :value="StudentScoreOne.content_id"
                  :clearable="isClearable"
                  :accordion="isAccordion"
                  @getValue="getValue($event)"
                />
              </el-form-item>
            </div>
            <el-form-item label="违纪(获奖)日期" prop="data">
              <el-date-picker
                v-model="StudentScoreOne.data"
                align="right"
                type="date"
                placeholder="选择日期"
                value-format="yyyy-MM-dd"
                :picker-options="pickerOptions"
              >
              </el-date-picker>
            </el-form-item>
            <el-form-item
              label="课节"
              prop="course"
              v-if="StudentScoreOne.state == false"
            >
              <el-radio-group v-model="StudentScoreOne.anp">
                <el-radio-button label="上午"></el-radio-button>
                <el-radio-button label="下午"></el-radio-button>
                <el-radio-button label="晚上"></el-radio-button>
              </el-radio-group>
              <el-select
                v-model="StudentScoreOne.kejie"
                placeholder="请选择课节"
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
          </el-form>
          <span slot="footer" class="dialog-footer" style="padding-left:150px">
            <el-button @click="StudentScoreDialog = false">取 消</el-button>
            <el-button type="primary" @click="addStudentScore">确 定</el-button>
          </span>
        </div>
        <div
          style="
            width: 30%;
            display: inline-block;
            left: 50px;
          "
        >
          <span
            style="
              display: inline-block;
              line-height: 60px;
              height: 60px;
              font-size: 20px;
            "
            >上传图片:</span
          >
          <el-upload
            class="upload-demo"
            ref="upload"
            :headers="headers"
            action="http://127.0.0.1:8000/api/markslists"
            :limit="1"
            :before-upload="beforeAvatarUpload"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :on-success="handsuccess"
            :on-exceed="handexceed"
            accept="jpg"
            :file-list="StudentScoreOne.avatar"
            :auto-upload="false"
            :data="StudentScoreOne"
            list-type="picture-card"
            style="margin-bottom: 20px"
          >
            <i slot="default" class="el-icon-plus"></i>
            <!-- <div slot="file" slot-scope="{ file }">
              <img class="el-upload-list__item-thumbnail" :src="file.url" />
              <span class="el-upload-list__item-actions">
                <span
                  class="el-upload-list__item-preview"
                  @click="handlePreview(file)"
                >
                  <i class="el-icon-zoom-in"></i>
                </span>
                <span
                  class="el-upload-list__item-delete"
                  @click="handleRemove(file)"
                >
                  <i class="el-icon-delete"></i>
                </span>
              </span>
            </div> -->
          </el-upload>
        </div>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="dialogVisibleImg">
      <img width="100%" :src="dialogImageUrl" alt="" />
    </el-dialog>
  </div>
</template>

<script>
import service from 'network/api/request'
import {
  getStudents,
  addStudents,
  removeStudents,
  getStudentsItem,
  editStudentsItem,
  deletestu,
} from "network/api/students";
import { getallClasses, getcollcls } from "network/api/classes";
import { getAllDepartmentColl } from "network/api/department";
import {
  noGetAwardedMarkss,
  noGetSubtractMarks,
  GetDisciplinetypes,
} from "network/api/studentscore";
import { getHeader } from "utils/login";
import upload from "views/students/upload";
import SelectTree from "components/treeSelect.vue";
export default {
  data() {
    // 验证手机号的规则
    var checkMobile = (rule, value, cb) => {
      // 验证手机号的正则表达式
      const regMobile =
        /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;

      if (regMobile.test(value)) {
        return cb();
      }

      cb(new Error("请输入合法的手机号"));
    };
    return {
      //第三方树状组件
      isClearable: true, // 可清空（可选）
      isAccordion: true, // 可收起（可选）
      props: {
        // 配置项（必选）
        value: "id",
        label: "name",
        children: "children",
        // disabled:true
      },
      //学生综合积分管理
      headers: {
        // "Content-Type": "multipart/form-data",
        Authorization: "",
      },
      AwardedMarkslist: [],
      SubtractMarkslist: [],
      SubtractMarkslistall: [],
      Disciplinetypelist: [],
      Disciplinetypeselect: [],
      StudentScoreDialog: false,
      fileList: [],
      StudentScoreOne: {
        students_id: null,
        disciplinetype: null,
        content_id: null,
        name: "",
        sex: "",
        score: "",
        department: "",
        cls: "",
        lecturer: "",
        counsellor: "",
        market: "",
        address: "",
        state: false,
        content: "",
        Marks: null,
        avatar: [],
        data: null,
        anp: null,
        kejie: "",
        course: null,
      },
      StudentScoreRules: {
        // content:[]
      },
      courseoptions: [
        {
          value: "第一节课",
          label: "第一节课",
        },
        {
          value: "第二节课",
          label: "第二节课",
        },
        {
          value: "第三节课",
          label: "第三节课",
        },
        {
          value: "第四节课",
          label: "第四节课",
        },
      ],
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            },
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            },
          },
          {
            text: "前天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 2);
              picker.$emit("pick", date);
            },
          },
        ],
      },
      dialogVisibleImg: false,
      dialogImageUrl: "",
      //选择搜索的方式单搜索（只能根据一个条件搜索）
      classoptions: [],
      classoptionsall: [],
      sexoptions: [
        {
          value: "0",
          label: "男",
        },
        {
          value: 1,
          label: "女",
        },
      ],
      //添加学生对话框
      addDialogVisible: false,
      //批量
      addDialogVisible1: false,
      addForm1: {
        school: null,
        cls: null,
      },
      schoolOptions: [],
      clsOptions: [],
      addFormRules1: {
        school: [{ required: true, message: "请选择学院", trigger: "blur" }],
        cls: [{ required: true, message: "请选择班级", trigger: "blur" }],
      },
      header: null,
      // 获取用户列表的参数对象
      queryInfo: {
        query: {
          name: "",
          market: "",
          cls: "",
          sex: "",
          dormnumber: "",
        },
        // 当前的页数
        page: 1,
        // 当前每页显示多少条数据
        pagesize: 5,
      },
      studentlist: [],
      allstudents: [],
      total: 0,

      // 添加部门的表单数据
      addForm: {
        name: "",
        score: "",
        sex: "",
        anewconunt: "",
        phone: "",
        family_phone: "",
        relations: "",
        address: "",
        dormnumber: "",
        bednumber: "",
        market: "",
        idcardnumber: "",
        cls: "",
      },
      // 添加、修改表单的验证规则对象
      addFormRules: {
        name: [
          { required: true, message: "请输入姓名", trigger: "blur" },
          {
            min: 2,
            max: 5,
            message: "姓名的长度在2~5个字符之间",
            trigger: "blur",
          },
        ],
        sex: [
          { required: true, message: "请输入性别", trigger: "blur" },
          {
            pattern: /^[0,1]{1}$/,
            message: "输入0/1数字",
            trigger: "blur",
          },
        ],
        anewconunt: [
          { required: true, message: "请输入重修次数", trigger: "blur" },
          {
            pattern: /^\d{1}$/,
            message: "你修超过十次吗？",
            trigger: "blur",
          },
        ],
        relations: [
          { required: true, message: "请输入亲自关系", trigger: "blur" },
          {
            min: 2,
            max: 5,
            message: "亲自关系的长度在2~5个字符之间",
            trigger: "blur",
          },
        ],
        address: [
          { required: true, message: "请输入家庭住址", trigger: "blur" },
          {
            min: 5,
            max: 20,
            message: "亲自关系的长度在5~20个字符之间",
            trigger: "blur",
          },
        ],
        dormnumber: [
          { required: true, message: "请输入宿舍号", trigger: "blur" },
          {
            pattern: /^\d{4}$/,
            message: "输入4位数数字",
            trigger: "blur",
          },
        ],
        bednumber: [
          { required: true, message: "请输入床号", trigger: "blur" },
          {
            pattern: /^[1,2,3,4,5,6,7,8]{1}$/,
            message: "输入1~8,1位数数字",
            trigger: "blur",
          },
        ],
        market: [
          { required: true, message: "请输入市场部", trigger: "blur" },
          {
            min: 2,
            max: 6,
            message: "市场部的长度在2~6个字符之间",
            trigger: "blur",
          },
        ],
        idcardnumber: [
          { required: true, message: "请输入身份证号", trigger: "blur" },
        ],
        cls: [{ required: true, message: "请输入选择班级", trigger: "blur" }],
        phone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { validator: checkMobile, trigger: "blur" },
        ],
        family_phone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { validator: checkMobile, trigger: "blur" },
        ],
      },
      // 控制修改部门对话框的显示与隐藏
      editDialogVisible: false,
      // 查询到的部门信息对象
      editForm: {
        name: "",
        score: "",
        sex: null,
        anewconunt: "",
        phone: "",
        family_phone: "",
        relations: "",
        address: "",
        dormnumber: "",
        bednumber: "",
        market: "",
        idcardnumber: "",
        cls: null,
      },
      //选中的数组
      multipleSelection: [],
    };
  },
  async created() {
    //第三方树状组件
    // this.getNodeTree(treeJson);
    // let obj = {};
    // this.list = this.list.reduce((item, next) => {
    //   obj[next.id] ? "" : (obj[next.id] = true && item.push(next));
    //   return item;
    // }, []);

    const token = window.sessionStorage.getItem("token");
    this.headers.Authorization = "Bearer " + token;
    //积分
    this.AwardedMarkslist = [];
    this.SubtractMarkslist = [];

    const AwardedMarkslist = await noGetAwardedMarkss();
    const SubtractMarkslist = await noGetSubtractMarks();
    AwardedMarkslist.forEach((item) => {
      const obj = {};
      obj.id = item.id;
      obj.parentId = 0;
      obj.rank = 1;
      obj.name = item.content + "-" + item.Marks + "分";
      this.AwardedMarkslist.push(obj);
    });
    console.log("www", SubtractMarkslist);
    SubtractMarkslist.forEach((item) => {
      // item.Disciplinetype_id
      const obj = {};
      obj.id = item.id;
      obj.parentId = 0;
      obj.rank = 1;
      obj.disciplinetype_id = item.Disciplinetype_id;
      obj.name = item.content + "-" + item.Marks + "分";
      this.SubtractMarkslist = [
        { id: null, parentId: 0, name: "请先选择违纪类型", rank: 1 },
      ];
      this.SubtractMarkslistall.push(obj);
    });
    //
    await this.getStudents();
    this.allstudents = this.studentlist;
    this.getclassname();
    this.getAllDepartmentColl();
    this.header = getHeader();
    this.GetDisciplinetypes();
  },
  computed: {
    /* 转树形数据 */
    AwaoptionData() {
      let cloneData = JSON.parse(JSON.stringify(this.AwardedMarkslist)); // 对源数据深度克隆
      return cloneData.filter((father) => {
        // 循环所有项，并添加children属性
        let branchArr = cloneData.filter(
          (child) => father.id == child.parentId
        ); // 返回每一项的子级数组
        branchArr.length > 0 ? (father.children = branchArr) : ""; //给父级添加一个children属性，并赋值
        return father.parentId == 0; //返回第一层
      });
    },
    SuboptionData() {
      let cloneData = JSON.parse(JSON.stringify(this.SubtractMarkslist)); // 对源数据深度克隆
      return cloneData.filter((father) => {
        // 循环所有项，并添加children属性
        let branchArr = cloneData.filter(
          (child) => father.id == child.parentId
        ); // 返回每一项的子级数组
        branchArr.length > 0 ? (father.children = branchArr) : ""; //给父级添加一个children属性，并赋值
        return father.parentId == 0; //返回第一层
      });
    },
  },
  watch: {
    "addForm1.school": async function (id) {
      if (id != null) {
        var res = await getcollcls(id);
        res.forEach((item) => {
          const obj = {};
          obj.value = item.id;
          obj.label = item.name;
          this.clsOptions.push(obj);
        });
      }
    },
    "StudentScoreOne.state": function () {
      // this.StudentScoreOne.content_id=null
      this.getValue(null);
      // this.StudentScoreOne.content = "";
      this.StudentScoreOne.disciplinetype = null;
      this.StudentScoreOne.data = null;
      this.StudentScoreOne.anp = "";
      this.StudentScoreOne.kejie = "";
    },
    "StudentScoreOne.disciplinetype": function (val) {
      this.getValue(null);
      this.SubtractMarkslist = [];
      if (!val) {
        // obj.id = item.id;
        // obj.parentId = 0;
        // obj.rank = 1;
        // obj.disciplinetype_id = item.Disciplinetype_id;
        // obj.name = item.content + "-" + item.Marks + "分";
        this.SubtractMarkslist = [
          { id: null, parentId: 0, name: "请先选择违纪类型", rank: 1 },
        ];
      } else {
        const content = JSON.stringify(this.SubtractMarkslistall);
        const content1 = JSON.parse(content);
        content1.forEach((item) => {
          if (item.disciplinetype_id == val) {
            this.SubtractMarkslist.push(item);
          }
        });
      }
    },
  },
  methods: {
    //第三方树状组件
    getValue(value) {
      this.StudentScoreOne.content_id = value;
    },
    // getNodeTree(tree) {
    //   for (var i in tree) {
    //     if (typeof tree[i] == "object") {
    //       this.getNodeTree(tree[i]);
    //     } else {
    //       this.list.push({
    //         id: tree["id"],
    //         parentId: tree["parentId"],
    //         name: tree["goodsTypeName"],
    //       });
    //     }
    //   }
    // },
    //综合积分变动
    EditScore(row) {
      if (!row.clsname) {
        this.$message.error("请分配班级");
        return;
      }
      if (row.coursestate == "暂未排课") {
        this.$message.error("请先为班级排课分配导员/讲师");
        return;
      }
      this.StudentScoreDialog = true;
      // this.StudentScoreOne=row
      this.StudentScoreOne.students_id = row.id;
      this.StudentScoreOne.name = row.name;
      if (row.sex == 1) {
        row.sex = "女";
      } else {
        row.sex = "男";
      }
      this.StudentScoreOne.sex = row.sex;
      this.StudentScoreOne.score = row.score;
      this.StudentScoreOne.cls_id = row.cls_id;
      this.StudentScoreOne.department = row.department;
      this.StudentScoreOne.cls = row.clsname;
      this.StudentScoreOne.lecturer = row.lecturer; //讲师
      this.StudentScoreOne.counsellor = row.counsellor; //导员
      this.StudentScoreOne.market = row.market;
      this.StudentScoreOne.address = row.address;
    },
    addStudentScore() {
      this.$refs.StudentScore.validate(async (valid) => {
        if (!valid) return;
        console.log(121212);
        this.StudentScoreOne.Marks = Number(
          this.StudentScoreOne.content.split("-")[1]
        );
        if (this.StudentScoreOne.state == false) {
          this.SubtractMarkslistall.forEach((item) => {
            if (item.id == this.StudentScoreOne.content_id) {
              this.StudentScoreOne.content = item.name.split("-")[0];
              console.log(this.StudentScoreOne.content);
              let mark = item.name.split("-")[1].split("");
              mark.pop();
              this.StudentScoreOne.Marks = Number(mark.join(""));
            }
          });
        } else {
          this.AwardedMarkslist.forEach((item) => {
            if (item.id == this.StudentScoreOne.content_id) {
              this.StudentScoreOne.content = item.name.split("-")[0];
              let mark = item.name.split("-")[1].split("");
              mark.pop();
              this.StudentScoreOne.Marks = Number(mark.join(""));
            }
          });
        }
        if (this.StudentScoreOne.anp & this.StudentScoreOne.kejie) {
          this.StudentScoreOne.course =
            this.StudentScoreOne.anp + this.StudentScoreOne.kejie;
        }

        delete this.StudentScoreOne.anp;
        delete this.StudentScoreOne.kejie;
        delete this.StudentScoreOne.sex;
        if(this.$refs.upload.uploadFiles.length!=0){
          this.$refs.upload.submit();
        }else{
          service.post('http://127.0.0.1:8000/api/markslists',this.StudentScoreOne)
        }
      });
    },
    StudentScoreClose() {
      this.$refs.StudentScore.resetFields();
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;
      // const isPNG = file.type === "image/png"
      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      } else {
      }
      return isJPG && isLt2M;
    },
    handleRemove(file) {
      this.$refs.upload.clearFiles();
    },
    handlePreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisibleImg = true;
    },
    handsuccess(result) {
      if (result) {
        this.$message.success("添加成功");
        (this.StudentScoreOne = {
          students_id: null,
          name: "",
          sex: "",
          score: "",
          department: "",
          cls: "2105A",
          lecturer: "",
          counsellor: "",
          market: "",
          address: "",
          state: false,
          content: "",
          Marks: null,
          avatar: [],
          data: null,
          anp: null,
          kejie: "",
          course: null,
          coursestate: "",
        }),
          (this.StudentScoreDialog = false);
      } else {
        this.$message.error("添加失败");
      }
    },
    handexceed() {
      this.$message.error("上传文件超出限制(1个)");
    },
    async GetDisciplinetypes() {
      const res = await GetDisciplinetypes();
      res.forEach((item) => {
        const obj = {};
        obj.value = item.id;
        obj.label = item.name;
        this.Disciplinetypeselect.push(obj);
      });
      this.Disciplinetypelist = res;
    },
    /* 
    page:当前页 默认为第一页
    page_size: 每页显示的记录数 默认为5条
    */
    async getStudents(
      $event,
      page = this.queryInfo.page,
      page_size = this.queryInfo.pagesize
    ) {
      const result = await getStudents({
        search: this.queryInfo.query,
        page,
        page_size,
      });
      if (result.code == 200) {
        this.$message.success("获取用户列表成功！");
        this.studentlist = result.data; //列表中展示的数据内容
        this.total = result.count; //数据总条数
      } else {
        return this.$message.error("获取用户列表失败！");
      }
    },
    //获取班级名称列表
    async getclassname() {
      const res = await getallClasses();
      const allclasses = res.data;
      this.classoptionsall = [];
      this.classoptions = [];
      this.classoptionsall.push({ value: "", label: "全部" });
      allclasses.forEach((item) => {
        const obj = {};
        obj.value = item.id;
        obj.label = item.name;
        this.classoptions.push(obj);
        this.classoptionsall.push(obj);
      });
    },
    // 监听添加学生对话框的关闭事件
    addDialogClosed() {
      this.$refs.addFormRef.resetFields();
    },
    // 点击按钮，添加新学生用户
    addUser() {
      this.$refs.addFormRef.validate(async (valid) => {
        if (!valid) return;
        //验证学生身份证是否存在  身份证是唯一的
        this.allstudents.forEach((item) => {
          if (item.idcardnumber == this.addForm.idcardnumber) {
            this.$message.error("用户身份证已存在！");
            return false;
          }
        });
        // 可以发起添加用户的网络请求
        const res = await addStudents(this.addForm);
        if (res) {
          this.$message.success("添加学生成功！");
          // 重新获取学生列表数据
          this.getStudents();
          this.allstudents.push(res);
        } else {
          this.$message.error("添加学生失败！");
        }
        // 隐藏添加学生的对话框
        this.addDialogVisible = false;
      });
    },
    //获取所有部门   （为学院的部门）
    async getAllDepartmentColl() {
      const res = await getAllDepartmentColl();
      res.forEach((item) => {
        const obj = {};
        obj.value = item.id;
        obj.label = item.name;
        this.schoolOptions.push(obj);
      });
    },
    // 批量监听添加学生对话框的关闭事件
    async addDialogClosed1() {
      this.$refs.addFormRef1.resetFields();
      this.getStudents();
    },
    addUser1() {
      this.$refs.addFormRef1.validate(async (valid) => {
        if (!valid) return;

        this.$refs.uploadFile.submit();

        //隐藏批量添加用户的对话框
        this.addDialogVisible1 = false;
        // 重新获取用户列表数据
        this.getStudents();
      });
    },
    uploadSuccess(response, file, fileList) {
      console.log(response, file, fileList);
    },
    download() {
      // downloadTemp();
    },
    // 监听 pagesize 改变的事件
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize;
      this.getStudents();
    },
    // 监听 页码值 改变的事件
    handleCurrentChange(newPage) {
      this.queryInfo.page = newPage;
      this.getStudents();
    },

    // 展示编辑学生信息的对话框
    async showEditDialog(id) {
      const result = await getStudentsItem(id);
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
    editStudents() {
      // console.log(this.allstudents.some((item,)=>{
      //   return item.idcardnumber == this.editForm.idcardnumber;
      // }))
      // return ;
      this.$refs.editFormRef.validate(async (valid) => {
        if (!valid) return;
        //验证用户身份证是否存在  身份证是唯一的
        // this.allstudents.forEach((item) => {
        //   if (item.idcardnumber == this.editForm.idcardnumber) {
        //     this.$message.error("用户身份证已存在！");
        //     return false;
        //   }
        // });
        // 发起修改用户信息的数据请求
        const result = await editStudentsItem(this.editForm);

        if (result) {
          // 关闭对话框
          this.editDialogVisible = false;
          // 刷新数据列表
          this.getStudents();
          // 提示修改成功
          this.$message.success("更新用户信息成功！");
        }
      });
    },
    // 根据Id删除对应的用户信息
    async removeDepartById(id) {
      // 弹框询问用户是否删除数据
      const confirmResult = await this.$confirm(
        "此操作将永久删除该部门, 是否继续?",
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
      removeStudents(id).then((value) => {
        this.$message.success("删除用户成功！");
        this.getStudents();
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
      this.studentlis;
      if (this.studentlist) {
        this.studentlist.forEach((item) => {
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
    deltoggleSelection() {
      const ids = [];
      this.multipleSelection.forEach((item) => {
        ids.push(item.id);
      });
      deletestu(JSON.stringify(ids));
      this.$message.success("批量删除成功");
      this.getStudents();
    },
    //选项框改变触发
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
  },
  components: { upload, SelectTree },
};
</script>

<style lang="less" scoped>
.jiajian {
  width: 200px;
  margin: 0 auto;
  font-size: 30px;
}
</style>
