<template>
  <div>
    <!-- 卡片视图区域 -->
    <el-card>
      <!-- 搜索与添加区域 -->
      <el-row :gutter="10">
        <el-col :span="4">
          <el-select v-model="queryinfo.show_type">
            <el-option
              v-for="item in showTypeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="4">
          <el-select placeholder="请选择学院" v-model="queryinfo.college_id">
            <el-option
              v-for="item in CollegesOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-col>

        <el-col :span="5" v-show="queryinfo.show_type == 1">
          <el-date-picker
            v-model="queryinfo.date"
            value-format="yyyy-MM-dd"
            type="date"
            placeholder="选择日期"
          >
          </el-date-picker>
        </el-col>
        <el-col :span="4" v-show="queryinfo.show_type == 3">
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
        <el-col :span="8" v-show="queryinfo.show_type == 2">
          <el-date-picker
            v-model="queryinfo.dates"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
        </el-col>
        <el-col :span="2">
          <el-button
            type="primary"
            icon="el-icon-search"
            @click="handleSearch()"
            >搜索</el-button
          >
        </el-col>
      </el-row>
      <el-tabs v-model="activeName"
      @tab-click="handleClick" type="border-card">
        <el-tab-pane label="班级" name="class">
          <ClassAttendance
            :showType="currentShowType"
            :tableData="attendanceData.class"
          />
        </el-tab-pane>
        <el-tab-pane label="阶段" name="stage">
          <StageAttendance
            :showType="currentShowType"
            :tableData="attendanceData.stage"
          />
        </el-tab-pane>
        <el-tab-pane label="学院" name="college">
          <CollegeAttendance
            :showType="currentShowType"
            :tableData="attendanceData.college"
          />
        </el-tab-pane>
      </el-tabs>
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
  </div>
</template>

<script>
import { getallcourse } from 'network/api/teachingcycle'
import { getallDepartment } from 'network/api/department'
import {
  getClassAttendances,
} from 'network/api/rollcall'
import ClassAttendance from '@/components/attendance/ClassAttendance'
import CollegeAttendance from '@/components/attendance/CollegeAttendance'
import StageAttendance from '@/components/attendance/StageAttendance'
import moment from 'moment'
export default {
  data() {
    return {
      activeName: 'class',
      showTypeOptions: [
        { value: 1, label: '每日出勤数据汇总' },
        { value: 2, label: '阶段出勤数据汇总' },
        { value: 3, label: '每月出勤数据汇总' },
      ],
      currentShowType: 1,
      queryInfo:{
        pagenum:1,
        pagesize:5
      },
      total:0,
      queryinfo: {
        show_type: 1,
        tc_id: '',
        college_id: '',
        date: '',
        dates: [],
      },
      attendanceData:{
        'class':[],
        'stage':[],
        'college':[]
      },
      classAttendance: [],
      TeachingTimeOptions: [],
      CollegesOptions: [],
      classHour: [],
      classHourInfo: {},
    }
  },
  components: {
    ClassAttendance,
    CollegeAttendance,
    StageAttendance
  },
  created() {
    //获取所有的教学周期列表
    this.getTeachingTimeList()
    //获取所有的学院列
    this.getCollegesList()
  },
  methods: {
    async handleSearch() {
      let { college_id, date, dates, tc_id, show_type } = this.queryinfo
      const queryinfo={college_id,show_type,type:this.activeName,...this.queryInfo}
      if (show_type == 1) {
        if (!date) {
          date = moment().format('YYYY-MM-DD')
        }
        queryinfo.date = date
      } else if (show_type == 2) {
        if (dates.length != 2) {
          this.$message.warning('请选择日期时间段')
          return
        }
        queryinfo.start = dates[0]
        queryinfo.end = dates[1]
        date=dates.join('-->')
      } else {
        if (!tc_id) {
          this.$message.warning('请选择相应的教学周期')
          return
        }
        queryinfo.tc_id = tc_id
      }
      const { count, data } = await getClassAttendances(queryinfo)
      console.log(count,data,123456)
      this.currentShowType = show_type
      this.attendanceData[this.activeName] = []
      this.total=count
      if (count) {
        data.forEach((item) => {
          let attendance =
            ((item.total_attendance_num * 1) / (item.total_studends_num * 1)) *
            100
          item.attendance = attendance.toFixed(2) + '%'
          item.date = date
          this.attendanceData[this.activeName].push(item)
        })
      }
    },
    // 监听 pagesize 改变的事件
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize
      this.handleSearch()
    },
    // 监听 页码值 改变的事件
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage
      this.handleSearch()
    },
    async handleClick(tab){
      this.handleSearch()
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
.content_title {
  text-align: center;
  color: #e6a23c;
}
.el-tabs {
  margin-top: 10px;
}
.el-pagination{
  margin-top: 20px;
}
</style>
