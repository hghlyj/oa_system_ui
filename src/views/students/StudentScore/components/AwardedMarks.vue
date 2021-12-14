<template>
  <div class="app-container">
    <div class="filter-container">
      <el-row :gutter="24">
        <el-col :span="3"
          ><el-input
            v-model="queryInfo.query.content"
            placeholder="请输入内容"
            @keyup.enter.native="GetAwardedMarkss"
            label-width="50px"
          ></el-input
        ></el-col>
        <el-col :span="3"
          ><el-button
            v-waves
            class="filter-item"
            type="primary"
            icon="el-icon-search"
            @click="GetAwardedMarkss"
          >
            搜索
          </el-button></el-col
        >
      </el-row>
      <el-button
        class="filter-item"
        style="margin-left: 10px"
        type="primary"
        icon="el-icon-edit"
        @click="handleCreate"
      >
        添加
      </el-button>
      <el-button
        v-waves
        :loading="downloadLoading"
        class="filter-item"
        type="primary"
        icon="el-icon-download"
        @click="handleDownload"
      >
        导出
      </el-button>
    </div>

    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="AwardedMarkslist"
      border
      fit
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column type="selection" width="55" class-name="#">
      </el-table-column>
      <el-table-column label="加分原因" prop="content"> </el-table-column>
      <el-table-column label="添加时间" prop="create_data" width="180">
        <template slot-scope="scope">
          <div>
            {{ scope.row.create_data | showDate }}
          </div>
        </template></el-table-column
      >
      <el-table-column label="修改时间" prop="update_data" width="180">
        <template slot-scope="scope">
          <div>
            {{ scope.row.update_data | showDate }}
          </div>
        </template></el-table-column
      >
      <el-table-column label="加分" prop="Marks" width="80"></el-table-column>
      <el-table-column
        label="操作"
        align="center"
        width="230"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="{ row }">
          <el-button type="primary" size="mini" @click="handleUpdate(row)">
            修改
          </el-button>
          <el-button
            v-if="row.status != 'deleted'"
            size="mini"
            type="danger"
            @click="handleDelete(row)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页区域 -->
    <el-pagination
      style="margin-top: 20px"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="queryInfo.page"
      :page-sizes="[5, 10, 15]"
      :page-size="queryInfo.page_size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form
        ref="dataForm"
        :rules="rules"
        :model="temp"
        label-position="left"
        label-width="70px"
        style="width: 400px; margin-left: 50px"
      >
        <el-form-item label="加分项" prop="content">
          <el-input v-model="temp.content" />
        </el-form-item>
        <el-form-item label="分数" prop="Marks">
          <el-input v-model="temp.Marks" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false"> 取消 </el-button>
        <el-button
          type="primary"
          @click="dialogStatus === 'create' ? createData() : updateData()"
        >
          确定
        </el-button>
      </div>
    </el-dialog>
    <div class="xiang">详细说明:</div>
    <div class="organization">
      <div class="item" v-for="item in organizationlist" :key="item.id">
        <p>{{ item.content }}</p>
        <div class="content" v-for="item2 in item.childlist" :key="item2.id">
          <p>{{ item2.content }}</p>
        </div>
      </div>
    </div>

    <!-- 回到顶部 -->
    <el-tooltip placement="top" content="tooltip">
      <back-to-top
        :custom-style="myBackToTopStyle"
        :visibility-height="300"
        :back-position="50"
        transition-name="fade"
      />
    </el-tooltip>
  </div>
</template>

<script>
import waves from "@/directive/waves"; // waves directive

import {
  GetPutIntoEffect,
  GetAwardedMarkss,
  CreateAwardedMarkss,
  UpdateAwardedMarkss,
  DeleteAwardedMarkss,
  GetAwardedMarkssOne,
} from "network/api/studentscore";
import BackToTop from "@/components/BackToTop";

export default {
  name: "ComplexTable",
  components: { BackToTop },
  directives: { waves },
  data() {
    return {
      tableKey: 0,
      AwardedMarkslist: null,
      organizationlist: [],
      total: 0,
      queryInfo: {
        query: {
          content: "",
        },
        // 当前的页数
        page: 1,
        // 当前每页显示多少条数据
        page_size: 5,
      },
      listLoading: true,
      temp: {
        content: "",
        Marks: "",
      },
      dialogFormVisible: false,
      dialogStatus: "",
      textMap: {
        update: "Edit",
        create: "Create",
      },
      rules: {
        content: [{ required: true, message: "必填", trigger: "blur" }],
        Marks: [{ required: true, message: "必填", trigger: "blur" }],
      },
      downloadLoading: false,
      myBackToTopStyle: {
        right: "50px",
        bottom: "50px",
        width: "40px",
        height: "40px",
        "border-radius": "4px",
        "line-height": "45px", // 请保持与高度一致以垂直居中
        background: "#e7eaf1", // 按钮的背景颜色
      },
    };
  },
  async created() {
    this.GetAwardedMarkss();
    const res = await GetPutIntoEffect(2);
    if (res.code == 200) {
    }
    this.organizationlist = res.list;
  },
  filters: {
    showDate: function (value) {
      var moment = require("moment");
      let date = moment(value);
      return date.format("YYYY-MM-DD  h:mm:ss");
    },
  },
  methods: {
    async GetAwardedMarkss() {
      this.listLoading = true;
      const res = await GetAwardedMarkss(this.queryInfo);
      if (res) {
        this.total = res.count;
        this.AwardedMarkslist = res.data;
        setTimeout(() => {
          this.listLoading = false;
        }, 1 * 1000);
      }
    },
    resetTemp() {
      this.temp = {
        content: "",
        Marks: "",
      };
    },
    handleCreate() {
      this.resetTemp();
      this.dialogStatus = "create";
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].clearValidate();
      });
    },
    createData() {
      this.$refs["dataForm"].validate(async (valid) => {
        if (valid) {
          console.log("数据", this.temp);
          const res = await CreateAwardedMarkss(this.temp);
          if (res) {
            this.GetAwardedMarkss();
            this.dialogFormVisible = false;
            this.$notify({
              title: "Success",
              message: "添加成功",
              type: "success",
            });
          }
        }
      });
    },
    async handleUpdate(row) {
      this.resetTemp();
      const res = await GetAwardedMarkssOne(row.id);
      if (!res) {
        this.$notify({
          title: "error",
          message: "获取单挑数据失败",
          type: "success",
        });
      }
      this.temp = {
        id: row.id,
        content: res.content,
        Marks: res.Marks,
      };
      this.dialogStatus = "update";
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].clearValidate();
      });
    },
    updateData() {
      this.$refs["dataForm"].validate(async (valid) => {
        if (valid) {
          const res = await UpdateAwardedMarkss(this.temp.id, this.temp);
          if (res) {
            this.GetAwardedMarkss();
            this.dialogFormVisible = false;
            this.$notify({
              title: "Success",
              message: "修改数据成功",
              type: "success",
            });
          }
        }
      });
    },
    async handleDelete(row) {
      const res = await DeleteAwardedMarkss(row.id);
      this.GetAwardedMarkss();
      this.$notify({
        title: "Success",
        message: "删除成功",
        type: "success",
      });
    },
    // 监听 pagesize 改变的事件
    handleSizeChange(newSize) {
      console.log(newSize);
      this.queryInfo.pagesize = newSize;
      this.getStudents();
    },
    // 监听 页码值 改变的事件
    handleCurrentChange(newPage) {
      console.log(newPage);
      this.queryInfo.pagenum = newPage;
      this.getStudents();
    },
    handleDownload() {
      this.downloadLoading = true;
      import("@/vendor/Export2Excel").then((excel) => {
        //字段
        const tHeader = ["加分原因", "分数", "添加时间", "修改时间"];
        const filterVal = ["content", "Marks", "create_data", "update_data"];
        const data = this.formatJson(filterVal);
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: "AwardedMarks-list",
        });
        this.downloadLoading = false;
      });
    },
    formatJson(filterVal) {
      return this.AwardedMarkslist.map((v) =>
        filterVal.map((j) => {
          return v[j];
        })
      );
    },
  },
};
</script>

<style scoped lang="scss">
.organization {
  .item {
    line-height: 40px;
    padding-right: 250px;
    border-bottom: 1px solid black;
    .content {
      padding-left: 100px;
    }
  }
}
.xiang {
  margin-top: 20px;
}
.el-timeline {
  margin-top: 40px;
}
</style>
