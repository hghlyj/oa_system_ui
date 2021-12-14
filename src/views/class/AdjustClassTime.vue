<template>
  <div class="adjustclasstime">
    <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
      <el-tab-pane label="今天" name="today">
        今天
      </el-tab-pane>
      <el-tab-pane label="昨天" name="yesterday ">昨天</el-tab-pane>
      <el-tab-pane label="本周" name="week">本周</el-tab-pane>
      <el-tab-pane label="本月" name="year">
        <el-table :data="tableData0" style="width: 100%"
          ><el-table-column type="index" label="序号"> </el-table-column>
          <el-table-column type="expand">
            <template slot-scope="scope">
              <el-descriptions
                class="margin-top"
                title="详细信息"
                :column="3"
                size=""
                border
              >
                <el-descriptions-item>
                  <template slot="label">
                    <i class="el-icon-user"></i>
                    阶段
                  </template>
                  {{ scope.row.stage }}
                </el-descriptions-item>
                <el-descriptions-item>
                  <template slot="label">
                    <i class="el-icon-mobile-phone"></i>
                    导员
                  </template>
                  {{ scope.row.counsellor }}
                </el-descriptions-item>
                <el-descriptions-item>
                  <template slot="label">
                    <i class="el-icon-location-outline"></i>
                    申请时间
                  </template>
                  {{ scope.row.createtime }}
                </el-descriptions-item>
              </el-descriptions>
            </template>
          </el-table-column>
          <el-table-column prop="department" label="部门"> </el-table-column>
          <!-- <el-table-column prop="stage" label="阶段"> </el-table-column> -->
          <el-table-column prop="name" label="班级"> </el-table-column>
          <el-table-column prop="teacher" label="讲师"> </el-table-column>
          <!-- <el-table-column prop="counsellor" label="辅导员"> </el-table-column> -->
          <el-table-column prop="original_date" label="原课节日期">
          </el-table-column>
          <el-table-column prop="initial" label="原课节"> </el-table-column>
          <el-table-column prop="change_date" label="新课节日期">
          </el-table-column>
          <el-table-column prop="final" label="新课节"> </el-table-column>
          <el-table-column prop="change_type" label="调/代课">
            <template slot-scope="scope">
              <!-- <el-tag :type="!scope.row.change_type?'success':''">调课</el-tag> -->
              <el-tag type="success" v-if="!scope.row.change_type">调课</el-tag>
              <el-tag type="warning" v-else>代课</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="change_teacher" label="代课讲师">
          </el-table-column>
          <!-- <el-table-column prop="createtime" label="申请时间"> -->
          <!-- </el-table-column> -->
          <el-table-column prop="states" label="审核" width="200px">
            <template slot-scope="scope">
              <el-button type="primary" @click="pass(scope.row.id)"
                >通过</el-button
              >
              <el-button type="danger" @click="nopass(scope.row.id)"
                >不通过</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="已通过" name="pass">
        <el-table :data="tableData1" style="width: 100%"
          ><el-table-column type="index" label="序号"> </el-table-column>
          <el-table-column type="expand">
            <template slot-scope="scope">
              <el-descriptions
                class="margin-top"
                title="详细信息"
                :column="3"
                size=""
                border
              >
                <el-descriptions-item>
                  <template slot="label">
                    <i class="el-icon-user"></i>
                    阶段
                  </template>
                  {{ scope.row.stage }}
                </el-descriptions-item>
                <el-descriptions-item>
                  <template slot="label">
                    <i class="el-icon-mobile-phone"></i>
                    导员
                  </template>
                  {{ scope.row.counsellor }}
                </el-descriptions-item>
                <el-descriptions-item>
                  <template slot="label">
                    <i class="el-icon-location-outline"></i>
                    申请时间
                  </template>
                  {{ scope.row.createtime }}
                </el-descriptions-item>
              </el-descriptions>
            </template>
          </el-table-column>
          <el-table-column prop="department" label="部门"> </el-table-column>
          <el-table-column prop="name" label="班级"> </el-table-column>
          <el-table-column prop="teacher" label="讲师"> </el-table-column>
          <el-table-column prop="original_date" label="原课节日期">
          </el-table-column>
          <el-table-column prop="initial" label="原课节"> </el-table-column>
          <el-table-column prop="change_date" label="新课节日期">
          </el-table-column>
          <el-table-column prop="final" label="新课节"> </el-table-column>
          <el-table-column prop="change_type" label="调/代课">
            <template slot-scope="scope">
              <el-tag type="success" v-if="!scope.row.change_type">调课</el-tag>
              <el-tag type="warning" v-else>代课</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="change_teacher" label="代课讲师">
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="未通过" name="nopass">
        <el-table :data="tableData2" style="width: 100%"
          ><el-table-column type="index" label="序号"> </el-table-column>
          <el-table-column type="expand">
            <template slot-scope="scope">
              <el-descriptions
                class="margin-top"
                title="详细信息"
                :column="3"
                size=""
                border
              >
                <el-descriptions-item>
                  <template slot="label">
                    <i class="el-icon-user"></i>
                    阶段
                  </template>
                  {{ scope.row.stage }}
                </el-descriptions-item>
                <el-descriptions-item>
                  <template slot="label">
                    <i class="el-icon-mobile-phone"></i>
                    导员
                  </template>
                  {{ scope.row.counsellor }}
                </el-descriptions-item>
                <el-descriptions-item>
                  <template slot="label">
                    <i class="el-icon-location-outline"></i>
                    申请时间
                  </template>
                  {{ scope.row.createtime }}
                </el-descriptions-item>
              </el-descriptions>
            </template>
          </el-table-column>
          <el-table-column prop="department" label="部门"> </el-table-column>
          <el-table-column prop="name" label="班级"> </el-table-column>
          <el-table-column prop="teacher" label="讲师"> </el-table-column>
          <el-table-column prop="original_date" label="原课节日期">
          </el-table-column>
          <el-table-column prop="initial" label="原课节"> </el-table-column>
          <el-table-column prop="change_date" label="新课节日期">
          </el-table-column>
          <el-table-column prop="final" label="新课节"> </el-table-column>
          <el-table-column prop="change_type" label="调/代课">
            <template slot-scope="scope">
              <el-tag type="success" v-if="!scope.row.change_type">调课</el-tag>
              <el-tag type="warning" v-else>代课</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="change_teacher" label="代课讲师">
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { GetasjustClas, EditadjustState } from "network/api/adjust";
export default {
  props: {},
  data() {
    return {
      activeName: "year",
      tableData: [],
      tableData0: [],
      tableData1: [],
      tableData2: []
    };
  },
  created() {
    this.GetasjustClas();
  },
  methods: {
    handleClick(tab, event) {
      console.log(this.activeName);
      console.log(tab, event);
    },
    formatter(row, column) {
      return row.address;
    },
    async GetasjustClas() {
      const res = await GetasjustClas();
      console.log(typeof(res));
      this.tableData0 = [];
      this.tableData1 = [];
      this.tableData2 = [];
      res.nocontent.forEach(item => {
        item.initial = item.initial.join(",");
        item.final = item.final.join(",");
        this.tableData2.push(item)
      });
      res.content.forEach(item => {
        item.initial = item.initial.join(",");
        item.final = item.final.join(",");
        if (item.state == 0) {
          this.tableData0.push(item);
        }
        if (item.state == 1) {
          this.tableData1.push(item);
        }
      });
    },
    pass(id) {
      this.$confirm("此操作将通过调课申请, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          EditadjustState(id, { state: 1 });
          this.$message({
            type: "success",
            message: "通过成功!"
          });
           this.GetasjustClas()
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消更新"
          });
        });
    },
    nopass(id) {
      this.$confirm("此操作将拒绝调课申请, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          EditadjustState(id, { state: 2 });
          this.$message({
            type: "success",
            message: "拒绝成功!"
          });
           this.GetasjustClas()
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消更新"
          });
        });
    }
  }
};
</script>

<style scoped lang="less"></style>
