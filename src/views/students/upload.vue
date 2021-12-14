<template>
  <div>

    <!-- 批量添加用户的对话框 -->
    <el-dialog
      title="批量导入学生信息"
      :visible.sync="addDialogVisible"
      width="50%"
      @close="addDialogClosed"
    >
      <!-- 内容主体区域 -->
      <el-form
        :model="addForm"
        :rules="addFormRules"
        ref="addFormRef"
        label-width="80px"
      >
        <el-form-item label="学院" prop="school">
          <el-select v-model="addForm.school" placeholder="请选择学院">
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
          <el-select v-model="addForm.cls" placeholder="请选择班级">
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
            :data="addForm"
            action="/api/students/uploadexcel"
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
          <el-link href="http://127.0.0.1:8888/api/students/download"
          target="_blank" type="primary" icon="el-icon-download">下载excel模板</el-link>
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        
        <el-button type="primary" @click="addUser">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getStudents, downloadTemp } from 'network/api/students'
import { getHeader } from 'utils/login'
export default {
  data() {
    return {
      schoolOptions: [
        {
          value: 1,
          label: '人工智能',
        },
      ],
      clsOptions: [
        {
          value: 2,
          label: '2106A',
        },
      ],
      header: {},
      studentlist: [],
      total: 0,
      // 控制添加用户对话框的显示与隐藏
      addDialogVisible: true,
      // 添加用户的表单数据
      addForm: {
        school: 1,
        cls: 2,
      },
      // 添加表单的验证规则对象
      addFormRules: {
        school: [{ required: true, message: '请选择学院', trigger: 'blur' }],
        cls: [{ required: true, message: '请选择班级', trigger: 'blur' }],
      },
    }
  },
  created() {
    this.header = getHeader()
    this.getStudentList()
  },
  methods: {
    async getStudentList() {
      const result = await getStudents(this.queryInfo)
      this.studentlist = result.data
      this.total = result.count //数据总条数
    },
    uploadSuccess(response, file, fileList) {
      console.log(response, file, fileList)
    },
    download() {
       downloadTemp()
    },
  },
}
</script>

<style  scoped>
.el-select {
  width: 100%;
}
</style>
