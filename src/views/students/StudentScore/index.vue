<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :span="24" :xs="24">
        <el-card>
          <el-tabs v-model="activeTab">
            <el-tab-pane label="组织实施" name="OrganiZation">
              <OrganiZation />
            </el-tab-pane>
            <el-tab-pane label="加分管理" name="AwardedMarks">
              <AwardedMarks />
            </el-tab-pane>
            <el-tab-pane label="扣分管理" name="SubtractMarks">
              <SubtractMarks />
            </el-tab-pane>
            <el-tab-pane label="恢复制度" name="Recover">
              <Recover />
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import OrganiZation from "./components/OrganiZation";
import AwardedMarks from "./components/AwardedMarks";
import SubtractMarks from "./components/SubtractMarks";
import Recover from "./components/Recover";

export default {
  name: "Profile",
  components: { OrganiZation,AwardedMarks,SubtractMarks,Recover},
  data() {
    return {
      activeTab: "SubtractMarks",
    };
  },
  computed: {},
  created() {},
  methods: {},
};
</script>
