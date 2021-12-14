<template>
      
  <div class="organization">
    <div class="item" v-for="item in organizationlist" :key="item.id">
      <p>{{item.content}}</p>
      <div class="content" v-for="item2 in item.childlist" :key="item2.id">
        <p>{{item2.content}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { GetPutIntoEffect } from "network/api/studentscore";
export default {
  props: {},
  data() {
    return {
      organizationlist: [],
    };
  },
  async created() {
    const res = await GetPutIntoEffect(1);
    if (res.code == 200) {
    }
    this.organizationlist = res.list;
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
</style>
