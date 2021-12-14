<template>
  <el-row :gutter="15">
    <el-form
      ref="elForm"
      :model="formData"
      :rules="rules"
      size="medium"
      label-width="100px"
    >
      <el-col :span="24">
        <el-form-item label="登录账号" prop="username">
          <el-input
            v-model="formData.username"
            placeholder="请输入登录账号"
            :maxlength="20"
            show-word-limit
            clearable
            prefix-icon="el-icon-user"
            :style="{ width: '100%' }"
          ></el-input>
        </el-form-item>
      </el-col>

      <!-- <el-col :span="24">
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
          <div slot="file" slot-scope="{ file }">
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
          </div>
        </el-upload>
      </el-col> -->

      <el-col :span="24">
        <el-form-item label="登录密码" prop="password">
          <el-input
            v-model="formData.password"
            placeholder="请输入登录密码"
            show-word-limit
            clearable
            prefix-icon="el-icon-lock"
            show-password
            :style="{ width: '100%' }"
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item label="确认密码" prop="repeat">
          <el-input
            v-model="formData.repeat"
            placeholder="请输入确认密码"
            clearable
            show-password
            prefix-icon="el-icon-lock"
            :style="{ width: '100%' }"
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item label="手机号" prop="phone">
          <el-input
            v-model="formData.phone"
            placeholder="请输入手机号"
            :maxlength="11"
            show-word-limit
            clearable
            prefix-icon="el-icon-mobile"
            :style="{ width: '100%' }"
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item label="邮箱" prop="email">
          <el-input
            v-model="formData.email"
            placeholder="请输入邮箱"
            :maxlength="30"
            show-word-limit
            clearable
            prefix-icon="el-icon-s-promotion"
            :style="{ width: '100%' }"
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="姓" prop="first_name">
          <el-input
            v-model="formData.first_name"
            placeholder="姓啥"
            :maxlength="2"
            show-word-limit
            clearable
            :style="{ width: '100%' }"
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="名" prop="last_name">
          <el-input
            v-model="formData.last_name"
            placeholder="啥名"
            :maxlength="3"
            show-word-limit
            clearable
            :style="{ width: '100%' }"
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item label="部门" prop="department">
          <el-select
            v-model="formData.department"
            multiple
            placeholder="请选择部门"
            clearable
            :style="{ width: '100%' }"
          >
            <el-option
              v-for="(item, index) in departmentOptions"
              :key="index"
              :label="item.label"
              :value="item.value"
              :disabled="item.disabled"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item label="职位" prop="role">
          <el-checkbox-group v-model="formData.Role" size="medium">
            <el-checkbox
              v-for="(item, index) in roleOptions"
              :key="index"
              :label="item.value"
              :disabled="item.disabled"
              >{{ item.label }}</el-checkbox
            >
          </el-checkbox-group>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item label="是否启用" prop="is_active" required>
          <el-switch
            v-model="formData.is_active"
            active-text="启用"
            :active-value="1"
            :inactive-value="0"
          >
          </el-switch>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item size="large">
          <el-button type="primary" @click="submitForm">提交</el-button>
          <el-button @click="resetForm">重置</el-button>
        </el-form-item>
      </el-col>
    </el-form>
  </el-row>
</template>
<script>
import { getFilterRoleList } from "network/api/role";
import { addAdminUser } from "network/api/adminuser";
import { eventBus } from "../../main";
import { AdminUserlMixin } from "utils/mixin";
export default {
  mixins: [AdminUserlMixin],
  data() {
    return {
      formData: {
        username: "",
        password: "",
        repeat: "",
        phone: "",
        email: "",
        first_name: "",
        last_name: "",
        department: [],
        Role: [],
        is_active: 1,
      },
      rules: {
        username: [
          {
            required: true,
            message: "请输入登录账号",
            trigger: "blur",
          },
          {
            pattern: /^[a-zA-Z0-9]{4,30}$/,
            message: "账号必须由4~30数字字母构成",
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: "请输入登录密码",
            trigger: "blur",
          },
          {
            pattern: /^.{8,20}$/,
            message: "请输入8~20位任意字符",
            trigger: "blur",
          },
        ],
        repeat: [
          {
            required: true,
            message: "请输入确认密码",
            trigger: "blur",
          },
        ],
        phone: [
          {
            required: true,
            message: "请输入手机号",
            trigger: "blur",
          },
          {
            pattern: /^1(3|4|5|7|8|9)\d{9}$/,
            message: "手机号格式错误",
            trigger: "blur",
          },
        ],
        email: [
          {
            required: true,
            message: "请输入邮箱",
            trigger: "blur",
          },
          {
            pattern: /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/,
            message: "邮箱格式错误",
            trigger: "blur",
          },
        ],
        first_name: [
          {
            required: true,
            message: "姓啥",
            trigger: "blur",
          },
          {
            pattern: /^[\u4e00-\u9fa5]{1,2}$/,
            message: "请输入1~2位中文",
            trigger: "blur",
          },
        ],
        last_name: [
          {
            required: true,
            message: "啥名",
            trigger: "blur",
          },
          {
            pattern: /^[\u4e00-\u9fa5]{1,3}$/,
            message: "请输入1~3位中文",
            trigger: "blur",
          },
        ],
        department: [
          {
            required: true,
            message: "请选择部门",
            trigger: "change",
          },
        ],
        Role: [
          {
            required: true,
            type: "array",
            message: "请至少选择一个职位",
            trigger: "change",
          },
        ],
      },
      userlist: [],
      departmentOptions: [],
    };
  },
  computed: {},
  watch: {
    "formData.department": async function (newval) {
      console.log(newval);
      const roles = await getFilterRoleList("ids", JSON.stringify(newval));
      this.roleOptions = [];
      roles.forEach((item) => {
        this.roleOptions.push({
          label: `${item.role_name}(${item.department})`,
          value: item.id,
        });
      });
    },
  },
  created() {
    this.getDepartmentList();
  },
  mounted() {},
  methods: {
    submitForm() {
      this.$refs["elForm"].validate(async (valid) => {
        if (!valid) return;
        this.formData.name = this.formData.first_name + this.formData.last_name;
        const result = await addAdminUser(this.formData);
        if (result.id) {
          this.$message.success("添加用户成功！");
          eventBus.$emit("edittop", "first");
          this.getUserList();
          this.formData = {
            username: "",
            password: "",
            repeat: "",
            phone: "",
            email: "",
            first_name: "",
            last_name: "",
            department: [],
            Role: [],
            is_active: 1,
          };
        } else {
          this.$message.success("添加用户失败！");
        }
      });
    },
    resetForm() {
      this.$refs["elForm"].resetFields();
    },
  },
};
</script>
<style></style>
