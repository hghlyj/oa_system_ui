<template>
  <div>
    <!-- 卡片视图区域 -->
    <el-card>
      <!-- 搜索与添加区域 -->
      <el-row :gutter="10">
        <el-col :span="4">
          <el-select v-model="queryinfo.tc_id" placeholder="请选择教学周期">
            <el-option
              v-for="item in TeachingTimeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="4">
          <el-select v-model="queryinfo.college_id" placeholder="请选择学院">
            <el-option
              v-for="item in CollegesOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="2">
          <el-button type="primary" icon="el-icon-search" @click="handleSearch()">搜索</el-button>
        </el-col>
      </el-row>
      <!-- 课时列表区域 -->
      <el-table :data="classHour" border style="width: 100%" @expand-change="handleExpand">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-row :gutter="20" v-for="item in classHourInfo[props.row.lecturer_id]" :key="item.class_name">
              <el-col :span="6"
                ><div class="content_title">{{item.college__name}}</div
              ></el-col>
              <el-col :span="6"
                ><div class="content_title">{{item.class_name}}</div
              ></el-col>
              <el-col :span="6"
                ><div class="content_title">{{item.course}}</div
              ></el-col>
              <el-col :span="6"
                ><div class="content_title">{{item.section_num}}</div
              ></el-col>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column label="姓名" prop="lecturer"> </el-table-column>
        <el-table-column label="学院" prop="college__name"> </el-table-column>
        <el-table-column label="教学周期" prop="teaching_time__title">
        </el-table-column>
        <el-table-column label="总课时" prop="section_num"></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { getallcourse } from 'network/api/teachingcycle'
import {  getallDepartment} from 'network/api/department'
import {getClassHours,getClassHourInfo} from 'network/api/rollcall'
export default {
  data() {
    return {
      queryinfo: {
        tc_id: '',
        college_id: '',
      },
      TeachingTimeOptions: [],
      CollegesOptions: [],
      classHour: [],
      classHourInfo: {},
    }
  },
  created() {
    //获取所有的教学周期列表
    this.getTeachingTimeList()
    //获取所有的学院列
    this.getCollegesList()
  },
  methods: {
    // 处理展开行
    async handleExpand(row){
      const result=await getClassHourInfo(row.teaching_time_id,row.lecturer_id)
      console.log(result);
      if(result){
        this.classHourInfo[row.lecturer_id]=result
      }

    },
    async handleSearch(){
      if(this.queryinfo.tc_id=='' || this.queryinfo.college_id==''){
        this.$message.warning('请同时选择学院或教学周期')
        return
      }
        const result=await getClassHours(this.queryinfo)
        if(result){
          this.classHour=result
          for (const item of result) {
            this.$set(this.classHourInfo,item.lecturer_id,[])
          }
        }
    },
    async getTeachingTimeList() {
      let result = await getallcourse()
      if (result) {
        result.forEach((item) => {
          this.TeachingTimeOptions.push({
            value: item.id,
            label: item.title,
          })
        })
      }
    },
    async getCollegesList() {
      let result = await getallDepartment()
      if (result) {
        result.data.forEach((item) => {
          this.CollegesOptions.push({
            value: item.id,
            label: item.name,
          })
        })
      }
    },
  },
}
</script>

<style scoped>
.content_title{
  text-align: center;
  color: #E6A23C;
}
</style>
