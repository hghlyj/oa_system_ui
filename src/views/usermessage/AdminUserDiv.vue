<template>
      
  <div class="adminuserdiv">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="教职工信息" name="first"
        ><AdminUser></AdminUser
      ></el-tab-pane>
      <el-tab-pane label="添加教职工" name="second"
        ><div class="back"><admin-user-form></admin-user-form></div
      ></el-tab-pane>
    </el-tabs>
        
  </div>
</template>

<script>
import { eventBus } from "../../main";
import AdminUser from "views/usermessage/AdminUser";
import AdminUserForm from "views/usermessage/AdminUserForm";
export default {
  data() {
    return {
      activeName: "first",
    };
  },
  created() {
    eventBus.$on("edittop", (val) => {
      this.activeName = val;
    });
  },
  components: {
    AdminUser,
    AdminUserForm,
  },
  methods: {
    handleClick() {
    },
  },
};
</script>

<style scode lang="less">
    .back{
        background-color: #fff;
        padding: 40px;
        padding-right: 50%;
    }
    .adminuserdiv{
      margin: 0 20px;
    }
</style>
