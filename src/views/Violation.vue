<template>
  <div class="showinfo">
    <div v-for="item of tableData" style="width:70%">
    <el-table :data="item" border align="center">
      <el-table-column prop="data" label="日期"> </el-table-column>
      <el-table-column prop="one" label="1"> 
        <template slot-scope="scope">
          <span v-if="scope.row.one==true" class="iconfont icon-huabanfuben"></span>
        </template>
      </el-table-column>
      <el-table-column prop="two" label="2"> 
        <template slot-scope="scope">
          <span v-if="scope.row.two==true" class="iconfont icon-huabanfuben"></span>
        </template>
      </el-table-column>
      <el-table-column prop="three" label="3">
        <template slot-scope="scope">
          <span v-if="scope.row.three==true" class="iconfont icon-huabanfuben"></span>
        </template> </el-table-column>
      <el-table-column prop="four" label="4"> 
        <template slot-scope="scope">
          <span v-if="scope.row.four==true" class="iconfont icon-huabanfuben"></span>
        </template>
      </el-table-column>
      <el-table-column prop="five" label="5"> 
        <template slot-scope="scope">
          <span v-if="scope.row.five==true" class="iconfont icon-huabanfuben"></span>
        </template>
      </el-table-column>
      <el-table-column prop="six" label="6"> 
        <template slot-scope="scope">
          <span v-if="scope.row.six==true" class="iconfont icon-huabanfuben"></span>
        </template>
      </el-table-column>
      <el-table-column prop="seven" label="7">
        <template slot-scope="scope">
          <span v-if="scope.row.seven==true" class="iconfont icon-huabanfuben"></span>
        </template> </el-table-column>
      <el-table-column prop="eight" label="8">
        <template slot-scope="scope">
          <span v-if="scope.row.eight==true" class="iconfont icon-huabanfuben"></span>
        </template> </el-table-column>
      <el-table-column prop="nine" label="9"> 
        <template slot-scope="scope">
          <span v-if="scope.row.nine==true" class="iconfont icon-huabanfuben"></span>
        </template>
      </el-table-column>
      <el-table-column prop="ten" label="10"> 
        <template slot-scope="scope">
          <span v-if="scope.row.ten==true" class="iconfont icon-huabanfuben"></span>
        </template>
      </el-table-column>
      <el-table-column prop="eleven" label="11"> 
        <template slot-scope="scope">
          <span v-if="scope.row.eleven==true" class="iconfont icon-huabanfuben"></span>
        </template>
      </el-table-column>
    </el-table>
    </div>
  </div>
</template>

<script>
import {getAdjuClass} from 'network/api/adminuser'
export default {
  data() {
    return {
      tableData:[
      ]
    }
  },
  created(){
    this.getAdjuClass()
  },
  methods:{
    async getAdjuClass(){
      const res = await getAdjuClass()
      this.tableData=res.msg
      console.log(res.msg);
    },
  },
}
</script>

<style lang='less' scoped>


</style>