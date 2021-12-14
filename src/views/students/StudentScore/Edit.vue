<template>
  <div class="studentedit">
    <el-tabs v-model="activeName" style="width: 95%; margin: 0 auto">
      <el-tab-pane label="加分处理" name="AwardedMarks">
        <el-row :gutter="24">
          <el-col :span="3"
            ><el-input
              v-model="AwardedqueryInfo.query.name"
              placeholder="请输入姓名"
              @keyup.enter.native="GetAwardedMarksLists"
              label-width="50px"
            ></el-input
          ></el-col>
          <el-col :span="3"
            ><el-input
              v-model="AwardedqueryInfo.query.department"
              placeholder="请输入学院"
              @keyup.enter.native="GetAwardedMarksLists"
              label-width="50px"
            ></el-input
          ></el-col>
          <el-col :span="3"
            ><el-input
              v-model="AwardedqueryInfo.query.cls"
              placeholder="请输入班级"
              @keyup.enter.native="GetAwardedMarksLists"
              label-width="50px"
            ></el-input
          ></el-col>
          <el-col :span="3"
            ><el-input
              v-model="AwardedqueryInfo.query.lecturer"
              placeholder="请输入讲师"
              @keyup.enter.native="GetAwardedMarksLists"
              label-width="50px"
            ></el-input
          ></el-col>
          <el-col :span="3"
            ><el-input
              v-model="AwardedqueryInfo.query.counsellor"
              placeholder="请输入导员"
              @keyup.enter.native="GetAwardedMarksLists"
              label-width="50px"
            ></el-input
          ></el-col>
          <el-col :span="3"
            ><el-input
              v-model="AwardedqueryInfo.query.market"
              placeholder="请输入市场部"
              @keyup.enter.native="GetAwardedMarksLists"
              label-width="50px"
            ></el-input
          ></el-col>
          <el-col :span="3">
            <el-select
              v-model="AwardedqueryInfo.query.status"
              placeholder="请选择状态"
            >
              <el-option
                v-for="item in AwaSelectoptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option> </el-select
          ></el-col>
          <el-col :span="3"
            ><el-button
              class="filter-item"
              type="primary"
              icon="el-icon-search"
              @click="GetAwardedMarksLists"
            >
              搜索
            </el-button></el-col
          >
        </el-row>
        <el-col :span="3"
          ><el-button class="filter-item" type="primary" icon="el-icon-search">
            重置
          </el-button></el-col
        >
        <el-table
          :data="AwardedMarksLists"
          style="margin: 0 auto; margin-top: 30px"
          border
        >
          <el-table-column prop="name" label="姓名" width="100" align="center">
          </el-table-column>
          <el-table-column
            prop="department"
            label="学院"
            width="130"
            align="center"
          >
          </el-table-column>
          <el-table-column prop="cls" label="班级" align="center" width="130">
          </el-table-column>
          <el-table-column
            prop="lecturer"
            label="讲师"
            align="center"
            width="130"
          >
          </el-table-column>
          <el-table-column
            prop="counsellor"
            label="导员"
            align="center"
            width="130"
          >
          </el-table-column>
          <el-table-column
            prop="market"
            label="市场部"
            align="center"
            width="130"
          >
          </el-table-column>
          <el-table-column
            prop="score"
            label="原积分"
            align="center"
            width="130"
          >
          </el-table-column>

          <el-table-column
            prop="content"
            label="内容"
            align="center"
            width="130"
          >
          </el-table-column>
          <el-table-column prop="Marks" label="分数" align="center" width="130">
          </el-table-column>
          <el-table-column
            prop="avatar"
            label="图片"
            align="center"
            width="130"
          >
            <template slot-scope="scope">
              <img :src="scope.row.avatar" alt="" width="50px" />
            </template>
          </el-table-column>
          <el-table-column prop="data" label="时间" align="center" width="130">
          </el-table-column>
          <el-table-column
            prop="score"
            label="原积分"
            align="center"
            width="80"
          >
          </el-table-column>

          <el-table-column
            prop="create_data"
            label="发布时间"
            align="center"
            width="150"
          >
            <template slot-scope="scope">
              {{ scope.row.create_data | showDate }}
            </template>
          </el-table-column>
          <el-table-column
            prop="update_data"
            label="批改时间"
            align="center"
            width="150"
          >
            <template slot-scope="scope">
              {{ scope.row.update_data | showDate }}
            </template>
          </el-table-column>
          <el-table-column
            prop="status"
            label="状态"
            align="center"
            width="100"
          >
            <template slot-scope="scope">
              <span v-if="scope.row.status == 0">待处理</span>
              <span v-if="scope.row.status == 1">通过</span>
              <span v-if="scope.row.status == 2">不通过</span>
            </template>
          </el-table-column>

          <el-table-column
            fixed="right"
            label="操作"
            width="200"
            align="center"
          >
            <template slot-scope="scope">
              <span v-if="scope.row.create_data == scope.row.update_data">
                <el-link type="primary" @click="status1(scope.row)"
                  >通过</el-link
                >
                <el-link type="danger" @click="status2(scope.row)"
                  >不通过</el-link
                >
              </span>
              <span v-else> 审核完毕 </span>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页区域 -->
        <el-pagination
          style="width: 95%; margin: 0 auto; margin-top: 40px"
          @size-change="AwahandleSizeChange"
          @current-change="AwahandleCurrentChange"
          :current-page="AwardedqueryInfo.page"
          :page-sizes="[5, 10, 15]"
          :page-size="AwardedqueryInfo.page_size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="AwardedqueryInfo.total"
        >
        </el-pagination
      ></el-tab-pane>
      <el-tab-pane label="减分处理" name="SubtractMarks">
        <el-row :gutter="24">
          <el-col :span="3"
            ><el-input
              v-model="SubtratqueryInfo.query.name"
              placeholder="请输入姓名"
              @keyup.enter.native="GetSubtratMarksLists"
              label-width="50px"
            ></el-input
          ></el-col>
          <el-col :span="3"
            ><el-input
              v-model="SubtratqueryInfo.query.department"
              placeholder="请输入学院"
              @keyup.enter.native="GetSubtratMarksLists"
              label-width="50px"
            ></el-input
          ></el-col>
          <el-col :span="3"
            ><el-input
              v-model="SubtratqueryInfo.query.cls"
              placeholder="请输入班级"
              @keyup.enter.native="GetSubtratMarksLists"
              label-width="50px"
            ></el-input
          ></el-col>
          <el-col :span="3"
            ><el-input
              v-model="SubtratqueryInfo.query.lecturer"
              placeholder="请输入讲师"
              @keyup.enter.native="GetSubtratMarksLists"
              label-width="50px"
            ></el-input
          ></el-col>
          <el-col :span="3"
            ><el-input
              v-model="SubtratqueryInfo.query.counsellor"
              placeholder="请输入导员"
              @keyup.enter.native="GetSubtratMarksLists"
              label-width="50px"
            ></el-input
          ></el-col>
          <el-col :span="3"
            ><el-input
              v-model="SubtratqueryInfo.query.market"
              placeholder="请输入市场部"
              @keyup.enter.native="GetSubtratMarksLists"
              label-width="50px"
            ></el-input
          ></el-col>
          <el-col :span="3"
            ><el-button
              class="filter-item"
              type="primary"
              icon="el-icon-search"
              @click="GetSubtratMarksLists"
            >
              搜索
            </el-button></el-col
          ><el-col :span="3"
            ><el-button
              class="filter-item"
              type="primary"
              @click="resetInputSub"
            >
              重置
            </el-button></el-col
          >
        </el-row>
        <el-table
          :data="SubtratMarksLists"
          style="margin: 0 auto; margin-top: 30px"
          border
        >
          <el-table-column prop="name" label="姓名" align="center" width="130">
          </el-table-column>
          <el-table-column
            prop="department"
            label="学院"
            align="center"
            width="130"
          >
          </el-table-column>
          <el-table-column prop="cls" label="班级" align="center" width="130">
          </el-table-column>
          <el-table-column
            prop="lecturer"
            label="讲师"
            align="center"
            width="130"
          >
          </el-table-column>
          <el-table-column
            prop="counsellor"
            label="导员"
            align="center"
            width="130"
          >
          </el-table-column>
          <el-table-column
            prop="market"
            label="市场部"
            align="center"
            width="130"
          >
          </el-table-column>
          <el-table-column
            prop="score"
            label="原积分"
            align="center"
            width="130"
          >
          </el-table-column>

          <el-table-column
            prop="disciplinetype"
            label="违纪类型"
            align="center"
            width="130"
          >
          </el-table-column>
          <el-table-column
            prop="content"
            label="内容"
            align="center"
            width="130"
          >
          </el-table-column>
          <el-table-column prop="Marks" label="分数" align="center" width="130">
          </el-table-column>
          <el-table-column
            prop="avatar"
            label="图片"
            align="center"
            width="130"
          >
            <template slot-scope="scope">
              <img :src="scope.row.avatar" alt="" width="50px" />
            </template>
          </el-table-column>
          <el-table-column prop="data" label="时间" align="center" width="130">
          </el-table-column>
          <el-table-column
            prop="course"
            label="课节"
            align="center"
            width="130"
          >
          </el-table-column>
          <el-table-column
            prop="score"
            label="原积分"
            align="center"
            width="130"
          >
          </el-table-column>

          <el-table-column
            prop="create_data"
            label="发布时间"
            align="center"
            width="160"
          >
            <template slot-scope="scope">
              {{ scope.row.create_data | showDate }}
            </template>
          </el-table-column>
          <el-table-column
            prop="update_data"
            label="批改时间"
            align="center"
            width="160"
          >
            <template slot-scope="scope">
              {{ scope.row.update_data | showDate }}
            </template>
          </el-table-column>
          <el-table-column
            prop="status"
            label="状态"
            align="center"
            width="130"
          >
            <template slot-scope="scope">
              <span v-if="scope.row.status == 0">待处理</span>
              <span v-if="scope.row.status == 1">通过</span>
              <span v-if="scope.row.status == 2">不通过</span>
            </template>
          </el-table-column>

          <el-table-column
            fixed="right"
            label="操作"
            align="center"
            width="200"
          >
            <template slot-scope="scope">
              <span v-if="scope.row.create_data == scope.row.update_data">
                <el-link type="primary" @click="status1(scope.row)"
                  >通过</el-link
                >
                <el-link type="danger" @click="status2(scope.row)"
                  >不通过</el-link
                >
              </span>
              <span v-else> 审核完毕 </span>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页区域 -->
        <el-pagination
          style="width: 95%; margin: 0 auto; margin-top: 40px"
          @size-change="SubhandleSizeChange"
          @current-change="SubhandleCurrentChange"
          :current-page="SubtratqueryInfo.page"
          :page-sizes="[5, 10, 15]"
          :page-size="SubtratqueryInfo.page_size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="SubtratqueryInfo.total"
        >
        </el-pagination
      ></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { GetMarksLists, EditMarksLists } from "network/api/studentscore";
export default {
  props: {},
  data() {
    return {
      activeName: "AwardedMarks",
      AwardedMarksLists: [],
      AwardedqueryInfo: {
        query: {
          state: true,
          name: "",
          department: "",
          cls: "",
          lecturer: "",
          counsellor: "",
          market: "",
          status: null,
        },
        //总条数
        total: 0,
        // 当前的页数
        page: 1,
        // 当前每页显示多少条数据
        page_size: 5,
      },
      AwaSelectoptions: [
        { value: null, label: "请选择" },
        { value: 0, label: "待处理" },
        { value: 1, label: "通过" },
        { value: 2, label: "不通过" },
      ],
      SubtratMarksLists: [],
      SubtratqueryInfo: {
        query: {
          state: false,
          name: "",
          department: "",
          cls: "",
          lecturer: "",
          counsellor: "",
          market: "",
          status: null,
        },
        //总条数
        total: 0,
        // 当前的页数
        page: 1,
        // 当前每页显示多少条数据
        page_size: 5,
      },
      SubSelectoptions: [
        { value: null, label: "请选择" },
        { value: 0, label: "待处理" },
        { value: 1, label: "通过" },
        { value: 2, label: "不通过" },
      ],
    };
  },
  created() {
    this.GetAwardedMarksLists();
    this.GetSubtratMarksLists();
  },
  filters: {
    showDate: function (value) {
      var moment = require("moment");
      let date = moment(value);
      return date.format("YYYY-MM-DD  h:mm:ss");
    },
  },
  methods: {
    async GetAwardedMarksLists() {
      const res = await GetMarksLists(this.AwardedqueryInfo);
      console.log("+++++", res);
      if (res) {
        this.AwardedqueryInfo.total = res.count;
        this.AwardedMarksLists = res.data;
        this.$message.success("获取加分项数据成功");
      } else {
        this.$message.error("获取加分项数据失败");
      }
    },

    async GetSubtratMarksLists() {
      const res = await GetMarksLists(this.SubtratqueryInfo);
      console.log("----", res);
      if (res) {
        this.SubtratqueryInfo.total = res.count;
        this.SubtratMarksLists = res.data;
        this.$message.success("获取减分项数据成功");
      } else {
        this.$message.error("获取减分项数据失败");
      }
    },
    //重置  加分分  搜索内容
    resetInputAwa() {
      this.AwardedqueryInfo.query = {
        state: true,
        name: "",
        department: "",
        cls: "",
        lecturer: "",
        counsellor: "",
        market: "",
      };
    },
    //重置  扣分  搜索内容
    resetInputSub() {
      this.SubtratqueryInfo.query = {
        state: false,
        name: "",
        department: "",
        cls: "",
        lecturer: "",
        counsellor: "",
        market: "",
      };
    },
    //    审核违纪率
    async status1(row) {
      if (row.state) {
        const confirmResult = await this.$confirm(
          "此操作将给该同学加分, 是否继续?",
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
        const res = await EditMarksLists(row.id, { status: 1 });
        if (res) {
          this.$message.success("加分成功！");
          this.GetAwardedMarksLists();
        }
      } else {
        const confirmResult = await this.$confirm(
          "此操作将给该同学扣分, 是否继续?",
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
        const res = await EditMarksLists(row.id, { status: 1 });
        if (res) {
          this.$message.success("扣分成功！");
          this.GetSubtratMarksLists();
        }
      }
    },
    async status2(row) {
      if (row.state) {
        const confirmResult = await this.$confirm(
          "此操作将拒绝给该同学加分, 是否继续?",
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
        const res = await EditMarksLists(row.id, { status: 2 });
        if (res) {
          this.$message.success("拒绝加分成功！");
          this.GetAwardedMarksLists();
        }
      } else {
        const confirmResult = await this.$confirm(
          "此操作将拒绝给该同学扣分, 是否继续?",
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
        const res = await EditMarksLists(row.id, { status: 2 });
        if (res) {
          this.$message.success("拒绝扣分成功！");
          this.GetSubtratMarksLists();
        }
      }
    },
    // 加分  监听 pagesize 改变的事件
    AwahandleSizeChange(newSize) {
      this.AwardedqueryInfo.page_size = newSize;
      this.GetAwardedMarksLists();
    },
    // 加分  监听 页码值 改变的事件
    AwahandleCurrentChange(newPage) {
      this.AwardedqueryInfo.page = newPage;
      this.GetAwardedMarksLists();
    },
    // 减分  监听 pagesize 改变的事件
    SubhandleSizeChange(newSize) {
      this.SubtratqueryInfo.page_size = newSize;
      this.GetSubtratMarksLists();
    },
    // 减分 监听 页码值 改变的事件
    SubhandleCurrentChange(newPage) {
      this.SubtratqueryInfo.page = newPage;
      this.GetSubtratMarksLists();
    },
    pass(id) {
      this.$confirm("此操作将通过调课申请, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          EditadjustState(id, { state: 1 });
          this.$message({
            type: "success",
            message: "通过成功!",
          });
          this.GetasjustClas();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消更新",
          });
        });
    },
    nopass(id) {
      this.$confirm("此操作将拒绝调课申请, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          EditadjustState(id, { state: 2 });
          this.$message({
            type: "success",
            message: "拒绝成功!",
          });
          this.GetasjustClas();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消更新",
          });
        });
    },
  },
};
</script>

<style scoped lang="less"></style>
