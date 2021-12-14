<template>
  <div class="callroll">
    <el-table :data="tableData" style="width: 100%">
      <el-table-column type="index" label="序号"> </el-table-column>
      <!-- <el-table-column type="expand">
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
      </el-table-column> -->
      <!-- 部门  班级 讲师 导员 课程（阶段）调代课状态 课程日期 原课节 课节 点名状态 点名时间 -->
      <el-table-column prop="department" label="部门"> </el-table-column>
      <el-table-column prop="class_name" label="班级"> </el-table-column>
      <el-table-column prop="lecturer" label="讲师"> </el-table-column>
      <el-table-column prop="counsellor" label="导员"> </el-table-column>
      <el-table-column prop="course" label="课程（阶段）"> </el-table-column>
      <el-table-column prop="type" label="调代课状态">
        <template slot-scope="scope">
          <span v-if="scope.row.type == ''">无调/代课</span>
          <span v-else>{{scope.row.type}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="date" label="课程日期"> </el-table-column>
      <el-table-column prop="original_cs" label="原课节"> </el-table-column>
      <el-table-column prop="cs" label="课节"> </el-table-column>
      <el-table-column prop="state" label="点名状态">
        <template slot-scope="scope">
          <span v-if="scope.row.state == 0">未点名</span>
          <span v-else>已点名</span>
        </template>
      </el-table-column>
      <el-table-column prop="rollcall_time" label="点名时间">
        <template slot-scope="scope">
          <span v-if="scope.row.state == 0">未进行点名</span>
          <span v-else>{{ scope.row.rollcall_time }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="states" label="点名" width="200px">
        <template slot-scope="scope">
          <el-button type="primary" @click="callroll(scope.row)" v-if="scope.row.state==0">点名</el-button>
          <el-button type="primary" v-else>已点名</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getclasssections } from "network/api/adjust";
export default {
  props: {},
  data() {
    return {
      tableData: []
    };
  },
  created() {
    this.GetasjustClas();
  },
  methods: {
    async GetasjustClas() {
      this.tableData = [];
      var res = await getclasssections();
      console.log(res,'qwe');
      if(res=="暂无数据"){
        this.tableData=[]
        this.$message.error('还未进行排课')
        return ; 
      }
      if(res.data =="今天没有课"){
        this.tableData=[]
        return ;
      }
      this.tableData = res;
    },
    callroll(row){
      this.$router.push('/collegexy/CallRolldetails/'+row.id)
    },
  }
};
</script>

<style scoped lang="less"></style>
