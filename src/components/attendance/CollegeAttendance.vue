<template>
  <el-table :data="tableData" border style="width: 100%">
    <el-table-column prop="college__name" label="学院" > </el-table-column>
    <el-table-column prop="date" v-if="showType!=3" label="日期" > </el-table-column>
    <el-table-column v-if="showType==3" prop="teaching_time__title" label="教学周期" > </el-table-column>
    <el-table-column prop="attendance" width="180px" label="出勤率">
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  data() {
    return {
      
    }
  },
  props: ['showType','tableData'],
}
</script>