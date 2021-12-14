<template>
  <div>
    <!-- 卡片视图区域 -->
    <el-card>
      <!-- 搜索与添加区域 -->
      <el-row :gutter="20">
        <el-col :span="4">
          <el-input
            placeholder="请输入性名关键字"
            v-model="queryInfo.query.name"
            clearable
            @clear="getUserList"
          >
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-select
            v-model="queryInfo.query.depar"
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
        </el-col>
        <el-col :span="4">
          <el-select
            v-model="queryInfo.query.roles"
            placeholder="角色:请先选择部门"
            clearable
            :style="{ width: '100%' }"
            :disabled="jsselect"
          >
            <el-option
              v-for="(item, index) in roleOptionss"
              :key="index"
              :label="item.label"
              :value="item.value"
              :disabled="item.disabled"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="4">
          <el-select
            v-model="queryInfo.query.is_active"
            placeholder="请选择状态"
            clearable
            :style="{ width: '100%' }"
          >
            <el-option
              v-for="(item, index) in is_activeOptionss"
              :key="index"
              :label="item.label"
              :value="item.value"
              :disabled="item.disabled"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="1">
          <el-button
            type="primary"
            icon="el-icon-search"
            circle
            @click="getUserList"
          ></el-button>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="addAdminUser">添加教职工</el-button>
        </el-col>
      </el-row>

      <!-- 用户列表区域 -->
      <el-table :data="userlist" border stripe @expand-change="handleExpand">
        <el-table-column type="index"></el-table-column>
        <el-table-column type="expand">
          <template slot-scope="scope">
            <el-row>
              <el-col :span="4">
                <!-- <el-tag closable @close="removeById(scope.row, item1.id)">
                    {{ item1.authName }}
                  </el-tag> -->
                <el-tag closable>
                  {{ scope.row.unfold.zname }}
                </el-tag>
                <i class="el-icon-caret-right"></i>
              </el-col>
              <el-col :span="20">
                <el-row
                  v-for="(item, index) in scope.row.unfold.zdepartmentList"
                  :key="index"
                  :class="['vcenter', index == 0 ? '' : 'bdtop']"
                >
                  <el-col :span="6">
                    <el-tag type="success" closable>
                      {{ item }}
                    </el-tag>
                    <i class="el-icon-caret-right"></i>
                  </el-col>

                  <el-col :span="18">
                    <el-tag
                      type="warning"
                      v-for="(item1, index1) in scope.row.unfold.zroleList[
                        index
                      ]"
                      :key="index1"
                      closable
                      @close="removeById(scope.row, item1.id)"
                    >
                      {{ item1.role_name }}
                    </el-tag>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <!-- <el-table-column label="姓名" prop="username">
          <template slot-scope="scope">
            <div>
              <span>{{ scope.row.first_name }}{{ scope.row.last_name }}</span>
            </div>
          </template>
        </el-table-column> -->
        <el-table-column label="姓名" prop="name"> </el-table-column>
        <el-table-column label="手机号" prop="phone"></el-table-column>
        <el-table-column label="登录账号" prop="username"></el-table-column>
        <el-table-column label="最后登录时间" prop="last_login">
          <template slot-scope="scope">
            <div v-if="typeof scope.row.last_login == 'string'">
              {{ scope.row.last_login | showDate }}
            </div>
            <div v-else>该账号暂未登录</div>
          </template>
        </el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.is_active"
              @change="userStateChanged(scope.row)"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180px">
          <template slot-scope="scope">
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
              @click="removeUserById(scope.row.id)"
            ></el-button>
            <!-- 分配角色按钮 -->
            <el-tooltip
              effect="dark"
              content="分配角色"
              placement="top"
              :enterable="false"
            >
              <el-button
                type="warning"
                icon="el-icon-setting"
                size="mini"
                @click="setRole(scope.row)"
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

    <!-- 修改用户的对话框 -->
    <el-dialog
      title="修改用户"
      :visible.sync="editDialogVisible"
      width="50%"
      @close="editDialogClosed"
    >
      <el-form
        ref="elForm"
        :model="editForm"
        :rules="rules"
        size="medium"
        label-width="100px"
      >
        <el-col :span="24">
          <el-form-item label="登录账号" prop="username">
            <el-input
              v-model="editForm.username"
              placeholder="请输入登录账号"
              :maxlength="20"
              show-word-limit
              clearable
              prefix-icon="el-icon-user"
              :style="{ width: '100%' }"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="手机号" prop="phone">
            <el-input
              v-model="editForm.phone"
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
              v-model="editForm.email"
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
              v-model="editForm.first_name"
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
              v-model="editForm.last_name"
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
              v-model="editForm.department"
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
            <el-checkbox-group v-model="editForm.Role" size="medium">
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
              v-model="editForm.is_active"
              active-text="启用"
              :active-value="1"
              :inactive-value="0"
            >
            </el-switch>
          </el-form-item>
        </el-col>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editUserInfo">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 分配角色的对话框 -->
    <el-dialog
      title="分配角色"
      :visible.sync="setRoleDialogVisible"
      width="50%"
      @close="setRoleDialogClosed"
    >
      <div>
        <p>当前的用户：{{ userInfo.username }}</p>
        <p>当前的角色：{{ userInfo.role_name }}</p>
        <p>
          分配新角色：
          <el-select v-model="selectedRoleId" placeholder="请选择">
            <el-option
              v-for="item in rolesList"
              :key="item.id"
              :label="item.roleName"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="setRoleDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveRoleInfo">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { eventBus } from "../../main";
import AdminUserForm from "views/usermessage/AdminUserForm";
import { getFilterRoleList } from "network/api/role";
import {
  removeAdminUser,
  getAdminUserItem,
  editAdminUserItem,
  editAdminUsersItem,
  deleteadminrole,
} from "network/api/adminuser";
import { getFilterDepaList } from "network/api/department";
import { AdminUserlMixin } from "utils/mixin";
export default {
  name: "adminuser",
  mixins: [AdminUserlMixin],
  data() {
    return {
      // 获取用户列表的参数对象  混入
      // queryInfo: {
      //   query: "",
      //   // 当前的页数
      //   pagenum: 1,
      //   // 当前每页显示多少条数据
      //   pagesize: 5,
      // },
      userlist: [],

      // 控制修改用户对话框的显示与隐藏
      editDialogVisible: false,
      // 查询到的用户信息对象
      editForm: {
        username: "",
        password: "",
        repeat: "",
        phone: "",
        email: "",
        first_name: "",
        last_name: "",
        Role: [],
        is_active: true,
      },
      // 修改表单的验证规则对象
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

      departmentOptions: [],
      // 控制分配角色对话框的显示与隐藏  用于角色分配
      setRoleDialogVisible: false,
      // 需要被分配角色的用户信息
      userInfo: {},
      // 所有角色的数据列表  用于角色分配
      rolesList: [],
      roleOptionss: [],
      is_activeOptionss: [
        { value: false, label: "不允许登录" },
        { value: true, label: "允许登录" },
      ],
      jsselect: true,
      // 已选中的角色Id值   用于角色分配
      selectedRoleId: "",
    };
  },
  watch: {
    "editForm.department": async function () {
      if (this.editForm.department != []) {
        const depart = this.editForm.department;
        if (this.editForm.department != undefined) {
          const roles = await getFilterRoleList(
            "ids",
            JSON.stringify(this.editForm.department)
          );
          this.roleOptions = [];
          roles.forEach((item) => {
            this.roleOptions.push({
              label: `${item.role_name}(${item.department})`,
              value: item.id,
            });
          });
        }
      } else {
        console.log("部门为空");
      }
    },
    // "editForm.Role": async function (newval) {
    //   if (
    //     (this.editForm.Role != []) &
    //     (this.editForm.Role != null) &
    //     (newval != undefined)
    //   ) {

    //     const depa = await getFilterDepaList("ids", JSON.stringify(newval));
    //     depa.forEach((item) => {
    //       if (this.editForm.department.indexOf(item.id) == -1) {
    //         this.editForm.department.push(item.id);
    //       }
    //     });
    //   } else {
    //     console.log("角色为空");
    //   }
    // },
  },
  created() {
    this.getUserList();
    this.getDepartmentList();
  },
  filters: {
    showDate: function (value) {
      var moment = require("moment");
      let date = moment(value);
      return date.format("YYYY年MM月DD日 h:mm:ss a");
    },
  },
  components: {
    AdminUserForm,
  },
  methods: {
    //点击添加教职工跳转到添加top
    addAdminUser() {
      eventBus.$emit("edittop", "second");
    },
    // 监听 pagesize 改变的事件
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize;
      this.getUserList();
    },
    // 监听 页码值 改变的事件
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage;
      this.getUserList();
    },
    // 监听 switch 开关状态的改变
    async userStateChanged(userinfo) {
      const content = { id: userinfo.id, is_active: userinfo.is_active };
      const result = await editAdminUserItem(content);
      if (result) {
        this.$message.success("更新用户状态成功！");
      } else {
        this.$message.error("更新用户状态失败！");
      }
    },

    //监听  展开项
    handleExpand(row) {
      // this.userlist.forEach(async (item, index) => {
      //   if(item.unfold){console.log('unfold已经存在');}else{
      //   }
      //   if (item.id == row.id) {
      //     let obj = {};
      //     obj.zname = row.first_name + row.last_name;
      //     const roles = await getFilterRoleList(
      //       "role_ids",
      //       JSON.stringify(row.Role)
      //     );
      //     const departmentList = [];
      //     const roleList = [];
      //     roles.forEach((item2) => {
      //       if (!departmentList.includes(item2.department)) {
      //         departmentList.push(item2.department);
      //         //筛选这个部门的角色信息
      //         let departRole = roles.filter((role) => {
      //           return role.department == item2.department;
      //         });
      //         roleList.push(departRole);
      //       }
      //     });
      //     obj.zroleList = roleList;
      //     obj.zdepartmentList = departmentList;
      //     this.userlist[index].unfold = obj;
      //     console.log(this.userlist[1]);
      //   }
      // });
    },
    //删除一个角色
    async removeById(a, c) {
      const res = await deleteadminrole(a.id, c);
    },

    // 展示编辑用户的对话框
    async showEditDialog(id) {
      const result = await getAdminUserItem(id);
      if (result) {
        this.$message.success("查询用户信息成功！");
        this.editForm = result;
        //获取数据后展示当前角色的部门   下的所有角色
        // const arr = []
        // console.log("3333", this.editForm);
        // const depa = await getFilterDepaList(
        //   "ids",
        //   JSON.stringify(result.Role)
        // );
        // depa.forEach((item) => {
        //   if (arr.indexOf(item.id) == -1) {
        //     arr.push(item.id);
        //   }
        // });
        // this.editForm.department=arr
        this.editDialogVisible = true;
      } else {
        this.$message.error("查询用户信息失败！");
      }
    },
    // 监听修改用户对话框的关闭事件
    editDialogClosed() {
      this.$refs.elForm.resetFields();
    },
    // 修改用户信息并提交
    async editUserInfo() {
      this.$refs.elForm.validate(async (valid) => {
        if (!valid) return;
        // 发起修改用户信息的数据请求
        this.editForm.name = this.editForm.first_name + this.editForm.last_name;
        const res = await editAdminUsersItem(this.editForm);
        if (res) {
          // 关闭对话框
          this.editDialogVisible = false;
          // 刷新数据列表
          this.getUserList();
          // 提示修改成功
          this.$message.success("更新用户信息成功！");
        } else {
          this.$message.error("更新用户信息失败！");
        }
      });
    },

    // 根据Id删除对应的用户信息
    async removeUserById(id) {
      // 弹框询问用户是否删除数据
      const confirmResult = await this.$confirm(
        "此操作将永久删除该用户, 是否继续?",
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

      await removeAdminUser(id);
      this.getUserList();
      return this.$message.success("删除用户成功！");
    },

    // 展示分配角色的对话框
    async setRole(userInfo) {
      this.userInfo = userInfo;

      // 在展示对话框之前，获取所有角色的列表
      const { data: res } = await this.$http.get("roles");
      if (res.meta.status !== 200) {
        return this.$message.error("获取角色列表失败！");
      }

      this.rolesList = res.data;
      this.setRoleDialogVisible = true;
    },
    // 点击按钮，分配角色
    async saveRoleInfo() {
      if (!this.selectedRoleId) {
        return this.$message.error("请选择要分配的角色！");
      }

      const { data: res } = await this.$http.put(
        `users/${this.userInfo.id}/role`,
        {
          rid: this.selectedRoleId,
        }
      );

      if (res.meta.status !== 200) {
        return this.$message.error("更新角色失败！");
      }

      this.$message.success("更新角色成功！");
      this.getUserList();
      this.setRoleDialogVisible = false;
    },
    // 监听分配角色对话框的关闭事件
    setRoleDialogClosed() {
      this.selectedRoleId = "";
      this.userInfo = {};
    },
  },
};
</script>

<style lang="less" scoped>
.bdtop {
  border-top: 1px solid #eee;
}

.bdbottom {
  border-bottom: 1px solid #eee;
}

.vcenter {
  display: flex;
  align-items: center;
}
</style>
