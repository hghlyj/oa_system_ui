<template>
  <div class="callroll">
    <el-table :data="tableData" style="width: 100%">
      <el-table-column type="index" label="序号"> </el-table-column>
      <el-table-column prop="name" label="姓名"> </el-table-column>
      <el-table-column prop="idcardnumber" label="身份证号"> </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-radio-group v-model="studentState[scope.row.idcardnumber]">
            <el-radio :label="1">出勤</el-radio>
            <el-radio :label="2">旷课</el-radio>
            <el-radio :label="3">请假</el-radio>
            <el-radio :label="4">迟到</el-radio>
          </el-radio-group>
        </template>
      </el-table-column>
    </el-table>
    <el-row>
      <el-col :span="3" :offset="21">
        <el-button class="submitbtn" type="primary" @click="rollCall()">
          提交
        </el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getStudents, rollCalltijiao } from "network/api/adjust";
export default {
  props: {},
  data() {
    return {
      tableData: [],
      studentState: {},
      state: 0
    };
  },
  created() {
    this.getStudents(this.$route.params.id);
  },
  methods: {
    async getStudents(id) {
      const { state, students } = await getStudents(id);
      if (!students) return;
      this.tableData = students;
      this.state = state;
      console.log(state,'状态');
      this.tableData.forEach(item => {
        let key = item.idcardnumber;
        if (this.state) {
          this.$set(this.studentState, key, item.state);
        } else {
          this.$set(this.studentState, key, 1);
        }
      });
    },
    async rollCall() {
      const data = { normal: [], leave: [], cut_classes: [], late: [] ,state:1};
      const keys = Object.keys(this.studentState);
      console.log(keys, "keys");
      keys.forEach(id => {
        if (this.studentState[id] == 1) {
          data.normal.push(id);
        }
        if (this.studentState[id] == 2) {
          data.cut_classes.push(id);
        }
        if (this.studentState[id] == 3) {
          data.leave.push(id);
        }
        if (this.studentState[id] == 4) {
          data.late.push(id);
        }
      });
      data.normal = data.normal.join(",");
      data.cut_classes = data.cut_classes.join(",");
      data.leave = data.leave.join(",");
      data.late = data.late.join(",");
      const result = await rollCalltijiao(this.$route.params.id, data);
      if (!result) result;
      this.$message.success("提交点名成功");
    }
  }
};
</script>
<style scoped lang="less"></style>
